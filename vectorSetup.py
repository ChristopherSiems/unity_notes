"""
setup.py - Run this once to initialize the Qdrant collection
Usage: python setup.py
"""

from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams

# Configuration
QDRANT_HOST = "localhost"
QDRANT_PORT = 6333
COLLECTION_NAME = "ip_comments"
VECTOR_SIZE = 768  # Gemini text-embedding-004 dimension

def setup_collection():
    """
    Create the Qdrant collection with proper configuration.
    If collection already exists, it will be deleted and recreated.
    """
    # Connect to Qdrant
    client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
    
    print(f"Connecting to Qdrant at {QDRANT_HOST}:{QDRANT_PORT}...")
    
    # Delete collection if it exists
    try:
        client.delete_collection(collection_name=COLLECTION_NAME)
        print(f"Deleted existing collection '{COLLECTION_NAME}'")
    except:
        print(f"No existing collection found")
    
    # Create new collection
    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(
            size=VECTOR_SIZE,
            distance=Distance.COSINE  # Use cosine similarity
        ),
    )
    
    print(f"✓ Collection '{COLLECTION_NAME}' created successfully")
    print(f"✓ Vector size: {VECTOR_SIZE}")
    print(f"✓ Distance metric: COSINE")
    print("\nSetup complete! You can now run the main application.")


if __name__ == "__main__":
    print("="*60)
    print("QDRANT DATABASE SETUP")
    print("="*60 + "\n")
    
    try:
        setup_collection()
    except Exception as e:
        print(f"\n❌ Error during setup: {e}")
        print("\nMake sure Qdrant is running:")
        print("  Docker: docker run -p 6333:6333 qdrant/qdrant")
        print("  Local: qdrant server")