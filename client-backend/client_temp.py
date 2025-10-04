from json import dumps
from socket import AF_INET, SOCK_STREAM, socket

BUFFER_SIZE = 4096
SERVER_PORT = 12000
SERVER_NAME = "localhost"

if __name__ == "__main__":
    socket = socket(AF_INET, SOCK_STREAM)
    socket.connect((SERVER_NAME, SERVER_PORT))

    request_type = input("add or get: ")
    socket.send(
        dumps({"type": request_type, "statement": input("input: ")}).encode("UTF-8")
    )

    match request_type:
        case "get":
            print(socket.recv(BUFFER_SIZE).decode("UTF-8"))

    socket.close()
