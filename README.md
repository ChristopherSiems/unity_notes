# Unity Notes

Unity Notes is a decentralized peer-to-peer platform-agnostic community notes system.

## Why

The internet is full of misinformation and bias on platforms run by large and powerful companies and people. Our fellow users can be used as sources for context for much of this information, but the entities that run the platforms may not always support truth discovery. Unity Notes builds a community notes system in a decentralized platform-agnostic manner, allowing users to create censorshipless notes for content on any web platform.

## How it Works

When a user finds a statement online that they can add more context to, all they need to do is highlight it and use the Chrome extension to add a note. This note is saved locally in a SQLite database, but the statement the note is left on is sent to a server where it is mapped into a Qdrant vector database using Gemini embeddings along with instructions on how to contact the user who left the note.

When a user finds a statement online that they would like more context to, all they need to do is highlight it and use the Chrome extension to request context. The server will be contacted and the Qdrant database will be searched for semantically similar statements to the highlighted statement. The users who left comments on semantically similar statements will have their contact info gathered by the server and sent back to the original client. The client will then reach out to the peers themselves and request the notes. Upon receiving notes from peers, a Gemini based agent is used to summarize the notes to provide context to the original query.
