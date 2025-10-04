from asyncio import (DatagramProtocol, DatagramTransport, Future, TimeoutError,
                     gather, get_running_loop, wait_for)
from json import dumps, loads
from socket import AF_INET, SOCK_STREAM, socket

from

BUFFER_SIZE = 4096
CLIENT_PORT = 13000
SERVER_PORT = 12000
SERVER_NAME = "localhost"


class PeerListener(DatagramProtocol):
    def connection_made(self, transport: DatagramTransport):
        self.transport = transport

    def datagram_received(self, data, addr):


class PeerMessenger(DatagramProtocol):
    def __init__(self, message: str, on_response: Future):
        self.message = message
        self.on_response = on_response

    def connection_made(self, transport: DatagramTransport):
        self.transport = transport
        self.transport.sendto(dumps(self.message).encode("UTF-8"))

    def datagram_received(self, data, addr):
        self.on_response.set_result(loads(data.decode("UTF-8")))


async def peer_request(ip: str, ids: list[int], timeout: float) -> str | None:
    loop = get_running_loop()
    future = loop.create_future()
    transport, _ = await loop.create_datagram_endpoint(
        lambda: PeerMessenger(str({"type": "peer_request", "ids": ids}), future), remote_addr=(ip, CLIENT_PORT)
    )

    try:
        return await wait_for(future, timeout)
    except TimeoutError:
        return None
    finally:
        transport.close()


async def parallel_peer_requests(server_response, timeout: float):
    coroutines = []
    for ip, ids in server_response["ips"].items():
        coroutines.append(peer_request(ip, ids, timeout))

    return await gather(*coroutines)


def add_note(statement: str) -> None:
    server_socket = socket(AF_INET, SOCK_STREAM)
    server_socket.connect((SERVER_NAME, SERVER_PORT))
    server_socket.send(
        dumps({"type": "add_note", "statement": statement}).encode("UTF-8")
    )
    assert server_socket.recv(BUFFER_SIZE).decode("UTF-8") == "OK"
    server_socket.close()


def get_ips(statement: str) -> dict[str, str | dict[str, list[int]]]:
    server_socket = socket(AF_INET, SOCK_STREAM)
    server_socket.connect((SERVER_NAME, SERVER_PORT))
    server_socket.send(
        dumps({"type": "get_ips", "statement": statement}).encode("UTF-8")
    )
    ips = loads(server_socket.recv(BUFFER_SIZE).decode("UTF-8"))
    server_socket.close()
    return ips
