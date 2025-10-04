from json import dumps
from socket import AF_INET, SOCK_STREAM, socket

BUFFER_SIZE = 4096
SERVER_PORT = 12000
SERVER_NAME = "localhost"

if __name__ == "__main__":
    socket = socket(AF_INET, SOCK_STREAM)
    socket.connect((SERVER_NAME, SERVER_PORT))

    request_type = input("add_note or get_ips: ")
    socket.send(
        dumps({"type": request_type, "statement": input(
            "statement: ")}).encode("UTF-8")
    )

    if request_type == "get_ips":
        print(socket.recv(BUFFER_SIZE).decode("UTF-8"))

    socket.close()
