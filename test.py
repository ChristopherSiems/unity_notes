import asyncio
from asyncio import Future, TimeoutError, gather, get_running_loop, wait_for
from json import dumps, loads

from client1 import CLIENT_PORT, PeerMessenger

LISTENER_IP = "127.0.0.1"  # where your PeerListener is running


async def send_peer_request(ids, timeout=5):
    loop = get_running_loop()
    future = loop.create_future()
    message = dumps({"ids": ids})

    transport, _ = await loop.create_datagram_endpoint(
        lambda: PeerMessenger(message, future), remote_addr=(LISTENER_IP, CLIENT_PORT)
    )

    try:
        response = await wait_for(future, timeout)
        print(f"PeerListener responded: {response}")
    except TimeoutError:
        print("No response from PeerListener (timeout)")
    finally:
        transport.close()


async def main():
    # Single test request
    await send_peer_request(["9233935394484883589"])


if __name__ == "__main__":
    asyncio.run(main())
