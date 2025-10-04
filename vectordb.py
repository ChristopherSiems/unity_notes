import hashlib
import os

from dotenv import load_dotenv
from google import genai
from qdrant_client import QdrantClient
from qdrant_client.http.models import (Distance, FieldCondition, Filter,
                                       MatchValue, PointStruct, VectorParams)

load_dotenv()  # Load environment variables from .env file

# Initialize the Gemini client
api_key = os.getenv("GEMINI_API_KEY")

genai_client = genai.Client(api_key=api_key)

# Initialize Qdrant client (connecting to local server)
qdrant_client = QdrantClient(host="localhost", port=6333)

# Collection name
COLLECTION_NAME = "ip_comments"


def get_embedding(text):
    """
    Convert text to vector embedding using Gemini API.

    Args:
        text: String to embed

    Returns:
        List of floats representing the embedding vector
    """
    response = genai_client.models.embed_content(
        model="text-embedding-004", contents=text
    )
    return list(response.embeddings[0].values)


def text_to_id(text):
    """
    Generate a consistent integer ID from text using hash.
    Same text will always produce the same ID.

    Args:
        text: The text to hash

    Returns:
        Integer ID
    """
    # Create hash of text and convert to integer
    hash_object = hashlib.md5(text.encode())
    # Take first 8 bytes and convert to int (stays within reasonable range)
    return int(hash_object.hexdigest()[:16], 16)


def setup_collection():
    """
    Create or recreate the Qdrant collection with proper configuration.
    Gemini text-embedding-004 produces 768-dimensional vectors.
    """
    # Delete collection if it exists
    try:
        qdrant_client.delete_collection(collection_name=COLLECTION_NAME)
    except:
        pass

    # Create new collection
    qdrant_client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=768, distance=Distance.COSINE),
    )
    print(f"Collection '{COLLECTION_NAME}' created successfully")


def add_text_with_ip(text, ip_address):
    """
    Add a text entry with its associated IP address to the vector database.
    If the text already exists, the IP address is added to the existing list.

    Args:
        text: The text content to store
        ip_address: The IP address associated with this text
    """
    # Generate consistent ID based on text
    point_id = text_to_id(text)

    # Check if this text already exists
    try:
        existing_point = qdrant_client.retrieve(
            collection_name=COLLECTION_NAME, ids=[point_id]
        )

        if existing_point:
            # Text exists - get current IP list and add new IP
            current_ips = existing_point[0].payload.get("ip_addresses", [])

            # Only add IP if it's not already in the list
            if ip_address not in current_ips:
                current_ips.append(ip_address)

                # Update the existing point with new IP list
                qdrant_client.set_payload(
                    collection_name=COLLECTION_NAME,
                    payload={"ip_addresses": current_ips},
                    points=[point_id],
                )
                print(f"Added IP {ip_address} to existing text: '{text}'")
                print(f"  Total IPs for this text: {len(current_ips)}")
            else:
                print(f"IP {ip_address} already exists for text: '{text}'")
            return
    except:
        pass  # Point doesn't exist, create new one

    # Text doesn't exist - create new entry
    vector = get_embedding(text)

    qdrant_client.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            PointStruct(
                id=point_id,
                vector=vector,
                payload={"text": text, "ip_addresses": [
                    ip_address]},  # Store as list
            )
        ],
    )
    print(f"Created new entry: '{text}' with IP {ip_address}")


def view_all_data():
    """
    Display all entries currently stored in the collection.
    Shows all IP addresses associated with each text.
    """
    # Get collection info
    collection_info = qdrant_client.get_collection(COLLECTION_NAME)
    print(f"Collection: {COLLECTION_NAME}")
    print(f"Total points: {collection_info.points_count}")
    print(f"Vector size: {collection_info.config.params.vectors.size}")
    print("\n" + "=" * 50)

    # Scroll through all points
    points = qdrant_client.scroll(
        collection_name=COLLECTION_NAME,
        limit=100,
        with_payload=True,
        with_vectors=False,
    )[0]

    print(f"Stored Entries:\n")
    for point in points:
        ip_list = point.payload.get("ip_addresses", [])
        print(f"ID: {point.id}")
        print(f"  Text: {point.payload.get('text')}")
        print(f"  IP Addresses ({len(ip_list)}): {', '.join(ip_list)}")
        print()


def search_similar_texts(query_text, score_threshold=0.7):
    """
    Search for texts similar to the query and return their IP addresses.
    Only returns results with similarity score above the threshold.

    Args:
        query_text: The search query string
        score_threshold: Minimum similarity score (0-1). Default 0.7.

    Returns:
        List of search results with text, IP addresses, and similarity score
    """
    # Get embedding for search query
    query_vector = get_embedding(query_text)

    # Search in Qdrant with score filtering
    hits = qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=100,
        score_threshold=score_threshold,
    )

    # Format and return results
    results = []
    for hit in hits:
        results.append(
            {
                "id": hit.id,
                "score": hit.score,
                "text": hit.payload.get("text"),
                "ip_addresses": hit.payload.get("ip_addresses", []),
            }
        )

    return results


# Example usage
if __name__ == "__main__":
    # Step 1: Setup collection
    setup_collection()

    # Step 2: Add sample data - notice "the earth is flat" appears twice with different IPs

    add_text_with_ip("the earth is flat", "192.168.1.100")
    add_text_with_ip("the earth is round", "10.0.0.45")
    add_text_with_ip("our planet is spherical", "172.16.0.200")
    # Same text, different IP
    add_text_with_ip("the earth is flat", "203.0.113.50")
    add_text_with_ip("pizza is delicious", "192.168.1.100")
    # Same text again!
    add_text_with_ip("the earth is flat", "198.51.100.75")
    add_text_with_ip("the moon orbits earth", "10.0.0.87")
    # Duplicate IP - won't add
    add_text_with_ip("the earth is flat", "192.168.1.100")

    # print("VIEWING ALL STORED DATA")
    # view_all_data()

    # print("SEARCHING FOR SIMILAR TEXTS (Score >= 0.7)")

    # Step 3: Search for similar texts
    query = "the earth is actually flat"
    print(f"Query: '{query}'\n")

    results = search_similar_texts(query, score_threshold=0.7)

    # Step 4: Display results
    if results:
        for i, result in enumerate(results, 1):
            print(f"Result {i}:")
            print(f"  Text: {result['text']}")
            print(
                f"  IP Addresses ({len(result['ip_addresses'])}): {', '.join(result['ip_addresses'])}"
            )
            print(f"  Similarity Score: {result['score']:.4f}")
            print()

        # Extract all unique IP addresses from results
        all_ips = []
        for r in results:
            all_ips.extend(r["ip_addresses"])
        unique_ips = list(set(all_ips))

        print(f"All unique IP addresses from similar texts: {unique_ips}")
    else:
        print("No results found with similarity score >= 0.7")
