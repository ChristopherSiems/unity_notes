from xxhash import xxh64_intdigest
from json import dumps, loads
from socket import AF_INET, SOCK_STREAM, socket

BUFFER_SIZE = 4096
SERVER_PORT = 12000
SERVER_NAME = "172.20.10.11"
class SocketManager: 

    def __init__(self): 
        pass 

    def get_notes(self, statement:str) -> list: 
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
        server_socket.close()
        return ips
    
    def add_statement_to_central(statement:str) -> None: 
        server_socket = socket(AF_INET, SOCK_STREAM)
        server_socket.connect((SERVER_NAME, SERVER_PORT))
        server_socket.send(
            dumps({"type": "add_note", "statement": statement}).encode("UTF-8")
        )
        assert server_socket.recv(BUFFER_SIZE).decode("UTF-8") == "OK"
        print('statement added')
        server_socket.close()