from json import dumps, loads
from socket import AF_INET, SOCK_STREAM, socket

from vectordb import add_text_with_ip, search_similar_texts

BUFFER_SIZE = 4096
SERVER_PORT = 12000

if __name__ == "__main__":

    socket = socket(AF_INET, SOCK_STREAM)
    socket.bind(("", SERVER_PORT))
    socket.listen(1)

    print("server ready")
    while True:
        connection, addr = socket.accept()
        payload = loads(connection.recv(BUFFER_SIZE).decode("UTF-8"))
        statement = payload["statement"]

        match payload["type"]:
            case "add_note":
                print("add", payload)
                add_text_with_ip(statement, addr[0])
                connection.send("OK".encode("UTF-8"))

            case "get_ips":
                print("get", payload)

                entries = search_similar_texts(statement)
                ip_mappings = {}
                for entry in entries:
                    id = entry["id"]
                    for ip in entry["ip_list"]:
                        if ip not in ip_mappings:
                            ip_mappings[ip] = []
                        ip_mappings[ip].append(id)
                print(ip_mappings)

                connection.send(
                    dumps(
                        {"type": "ips_response", "ip_hash_mappings": ip_mappings}
                    ).encode("UTF-8")
                )

        connection.close()
