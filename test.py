import asyncio
from asyncio import DatagramProtocol, get_running_loop
from json import dumps, loads

CLIENT_PORT = 13000  # port your listener is listening on
SERVER_IP = "127.0.0.1"  # localhost for testing


class TestClient(DatagramProtocol):
    def __init__(self, message, future):
        self.message = message
        self.future = future

    def connection_made(self, transport):
        self.transport = transport
        # send message to the listener
        self.transport.sendto(self.message.encode("UTF-8"))

    def datagram_received(self, data, addr):
        # store received response
        self.future.set_result(loads(data.decode("UTF-8")))
        self.transport.close()


async def send_test_message(ids):
    loop = get_running_loop()
    future = loop.create_future()

    message = dumps({"ids": ids})
    transport, _ = await loop.create_datagram_endpoint(
        lambda: TestClient(message, future),
        remote_addr=(SERVER_IP, CLIENT_PORT),
    )

    try:
        # wait for a response (or timeout)
        response = await asyncio.wait_for(future, timeout=5)
        print("Listener responded with:", response)
    except asyncio.TimeoutError:
        print("No response from listener (timeout)")
    finally:
        transport.close()


if __name__ == "__main__":
    asyncio.run(send_test_message([1, 2, 3]))
