from json import dumps, loads
from socket import AF_INET, SOCK_STREAM, socket

BUFFER_SIZE = 4096
SERVER_PORT = 12000
SERVER_NAME = "localhost"


def add_note(statement: str) -> None:
    server_socket = socket(AF_INET, SOCK_STREAM)
    server_socket.connect((SERVER_NAME, SERVER_PORT))
    server_socket.send(
        dumps({"type": "add_note", "statement": statement}).encode("UTF-8")
    )
    assert server_socket.recv(BUFFER_SIZE).decode("UTF-8") == "OK"
    server_socket.close()


def get_ips(statement: str):
    server_socket = socket(AF_INET, SOCK_STREAM)
    server_socket.connect((SERVER_NAME, SERVER_PORT))
    server_socket.send(
        dumps({"type": "get_ips", "statement": statement}).encode("UTF-8")
    )
    ips = loads(server_socket.recv(BUFFER_SIZE).decode("UTF-8"))
    server_socket.close()
    return ips
