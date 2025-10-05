import asyncio
from asyncio import (DatagramProtocol, DatagramTransport, Future, Queue,
                     TimeoutError, gather, get_running_loop, wait_for)
from json import dumps, loads
from socket import AF_INET, SOCK_STREAM, socket

from aiohttp import ClientSession

BUFFER_SIZE = 4096
CLIENT_PORT = 13000  # port this peer listens on
SERVER_PORT = 12000
SERVER_NAME = "localhost"


class PeerListener(DatagramProtocol):
    """Long-running UDP listener that fetches notes and sends responses."""

    def __init__(self, session: ClientSession, queue: Queue):
        self.transport: DatagramTransport | None = None
        self.session = session
        self.queue = queue

    def connection_made(self, transport: DatagramTransport):
        self.transport = transport
        print(
            f"PeerListener started on {transport.get_extra_info('sockname')}")

    def datagram_received(self, data, addr):
        # Schedule processing without blocking
        asyncio.create_task(self.handle_message(data, addr))

    async def handle_message(self, data, addr):
        try:
            message = loads(data.decode("UTF-8"))
            ids = message.get("ids", [])
            notes = []
            print("message", message)

            for note_id in ids:
                try:
                    async with self.session.get(
                        f"http://localhost:5000/api/note/{note_id}"
                    ) as resp:
                        notes.append(await resp.json())
                    print("notes", notes)
                except Exception as e:
                    notes.append({"id": note_id, "error": str(e)})

            # Send back response to peer
            if self.transport:
                self.transport.sendto(dumps(notes).encode("UTF-8"), addr)

            # Also put the result on the queue for internal processing
            await self.queue.put((addr, notes))

        except Exception as e:
            print(f"Error handling message from {addr}: {e}")


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

    transport, _ = await loop.create_datagram_endpoint(
        lambda: PeerMessenger(message, future), remote_addr=(ip, CLIENT_PORT)
    )

    try:
        return await wait_for(future, timeout)
    except TimeoutError:
        return None
    finally:
        transport.close()


async def parallel_peer_requests(server_response: dict, timeout: float):
    coroutines = [
        peer_request(ip, ids, timeout)
        for ip, ids in server_response.get("ips", {}).items()
    ]
    return await gather(*coroutines, return_exceptions=True)


async def main():
    """Start the listener and process incoming messages indefinitely."""
    queue = asyncio.Queue()

    async with ClientSession() as session:
        loop = get_running_loop()
        transport, _ = await loop.create_datagram_endpoint(
            lambda: PeerListener(session, queue), local_addr=("0.0.0.0", CLIENT_PORT)
        )

        print("Listener running...")

        try:
            while True:
                addr, notes = await queue.get()
                print(f"Received notes from {addr}: {notes}")
        finally:
            transport.close()


if __name__ == "__main__":
    asyncio.run(main())
