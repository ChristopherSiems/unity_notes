from json import loads
from socket import AF_INET, SOCK_STREAM, socket

from xxhash import xxh128_intdigest

BUFFER_SIZE = 4096
SERVER_PORT = 12000

if __name__ == "__main__":

    socket = socket(AF_INET, SOCK_STREAM)
    socket.bind(("", SERVER_PORT))
    socket.listen(1)

    table = {}

    print("server ready")
    while True:
        connection, addr = socket.accept()
        payload = loads(connection.recv(BUFFER_SIZE).decode("UTF-8"))

        match payload["type"]:
            case "add":
                print("add")
                table[xxh128_intdigest(payload["statement"])] = addr[0]

            case "get":
                print("get")
                connection.send(
                    table[xxh128_intdigest(
                        payload["statement"])].encode("UTF-8")
                )

        connection.close()
