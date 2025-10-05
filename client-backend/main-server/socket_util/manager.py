import asyncio
from asyncio import (DatagramProtocol, DatagramTransport, Future, Queue,
                     TimeoutError, gather, get_running_loop, wait_for)
from json import dumps, loads
from socket import AF_INET, SOCK_STREAM, socket

from xxhash import xxh64_intdigest

BUFFER_SIZE = 4096
SERVER_PORT = 12000
SERVER_NAME = "172.20.10.11"
CLIENT_PORT = 13000  # port this peer listens on


class SocketManager:

    def __init__(self):
        pass

    async def get_notes(self, statement: str) -> list:
        """
        input: statement
        output: list of notes related to statement
        """

        server_socket = socket(AF_INET, SOCK_STREAM)
        server_socket.connect((SERVER_NAME, SERVER_PORT))
        server_socket.send(
            dumps({"type": "get_ips", "statement": statement}).encode("UTF-8")
        )
        ips = loads(server_socket.recv(BUFFER_SIZE).decode("UTF-8"))
        print("ips", ips)
        server_socket.close()
        if ips:
            print("ips found")
            notes = await parallel_peer_requests(ips, 15)

        all_notes = []
        for peer_notes in notes:
            if isinstance(peer_notes, list):
                all_notes.extend(peer_notes)
        print("all notes", all_notes)

        new_notes = []
        for note in all_notes:
            new_notes += note["notes"]
        print("new notes", new_notes)

        return new_notes

    def add_statement_to_central(statement: str) -> None:
        server_socket = socket(AF_INET, SOCK_STREAM)
        server_socket.connect((SERVER_NAME, SERVER_PORT))
        server_socket.send(
            dumps({"type": "add_note", "statement": statement}).encode("UTF-8")
        )
        assert server_socket.recv(BUFFER_SIZE).decode("UTF-8") == "OK"
        print("statement added")
        server_socket.close()


class PeerMessenger(DatagramProtocol):
    """Sends a UDP message and waits for the response."""

    def __init__(self, message: str, future: Future):
        self.message = message
        self.future = future
        self.transport: DatagramTransport | None = None

    def connection_made(self, transport: DatagramTransport):
        self.transport = transport
        self.transport.sendto(self.message.encode("UTF-8"))

    def datagram_received(self, data, addr):
        if not self.future.done():
            self.future.set_result(loads(data.decode("UTF-8")))
        if self.transport:
            self.transport.close()


async def peer_request(ip: str, ids: list[str], timeout: float) -> list | None:
    """Send a peer request and wait for response."""
    loop = get_running_loop()
    future = loop.create_future()
    message = dumps({"type": "peer_request", "ids": ids})
    print("message", message)
    transport, _ = await loop.create_datagram_endpoint(
        lambda: PeerMessenger(message, future), remote_addr=(ip, CLIENT_PORT)
    )

    try:
        return await wait_for(future, timeout)
    except TimeoutError:
        print("timeout")
        return None
    finally:
        transport.close()


async def parallel_peer_requests(server_response: dict, timeout: float):
    print("server_response", server_response)
    coroutines = [
        peer_request(ip, ids, timeout)
        for ip, ids in server_response.get("ip_hash_mappings", {}).items()
    ]
    return await gather(*coroutines, return_exceptions=True)
