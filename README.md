# Unity Notes

Unity Notes is a decentralized peer-to-peer platform-agnostic community notes system.

##Posting Notes
![Writing a note.](https://github.com/ChristopherSiems/unity_notes/raw/main/unityNotes3.jpg)

![Posted community context.](https://github.com/ChristopherSiems/unity_notes/raw/main/unityNotes4.jpg)

##Getting Context
![Searching for context.](https://github.com/ChristopherSiems/unity_notes/raw/main/unityNotes5.jpg)

![Returned community context.](https://github.com/ChristopherSiems/unity_notes/raw/main/unityNotes6.jpg)

## Why

The internet is full of misinformation and bias on platforms run by large and powerful companies and people. Our fellow users can be used as sources for context for much of this information, but the entities that run the platforms may not always support truth discovery. We are all passionate about freedom of communication and knowledge transparency.  With media consolidation and misinformation on the rise, we wanted to build a system which brings control over knowledge transfer back to communities. Unity Notes builds a community notes system in a decentralized platform-agnostic manner, allowing users to create censorshipless notes for content on any web platform.

## How it Works

When a user finds a statement online that they can add more context to, all they need to do is highlight it and use the Chrome extension to add a note. This note is saved locally in a SQLite database, but the statement the note is left on is sent to a server where it is mapped into a Qdrant vector database using Gemini embeddings along with instructions on how to contact the user who left the note.

When a user finds a statement online that they would like more context to, all they need to do is highlight it and use the Chrome extension to request context. The server will be contacted and the Qdrant database will be searched for semantically similar statements to the highlighted statement. The users who left comments on semantically similar statements will have their contact info gathered by the server and sent back to the original client. The client will then reach out to the peers themselves and request the notes. Upon receiving notes from peers, a Gemini based agent is used to summarize the notes to provide context to the original query.

![Context Query Map](https://github.com/ChristopherSiems/unity_notes/raw/main/unityNotes1.jpg)

![Note Creation Diagram](https://github.com/ChristopherSiems/unity_notes/raw/main/unityNotes2.jpg)


## How we built it

Tech Stack:

- Python backend
- JavaScript, HTML, CSS frontend
- Qdrant vector database
- SQLite
- SQLalchemy
- Gemini API

## What's next for Unity Notes

- Adding more agentic customization such as aggregation customization and webpage parsing
- Context requirements for adding notes,
- Scalability features such as weighing notes for prioritized summarization
- Browser PDF reader compatibility
