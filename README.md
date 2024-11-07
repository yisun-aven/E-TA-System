# E-TA

E-TA (Enhanced Teaching Assistant) provides intelligent responses to student questions by analyzing course materials including lecture slides, transcripts, and Piazza discussions.

## Features

* Question answering using course materials context
* Integration with lecture slides and video content
* Secure Piazza authentication
* QA history tracking
* Web-based interface
* Embeddings-based similarity search with FAISS
* Vector store optimization

## Technology Stack

### AI and ML
* OpenAI GPT for question answering
* Text embeddings for similarity matching:
  - Course content embeddings (OpenAI)
  - Question-answer embeddings
  - Slide content embeddings
  - Video transcript embeddings
* FAISS (Facebook AI Similarity Search):
  - Efficient similarity search
  - Scalable vector storage
  - Fast nearest neighbor lookup
  - IndexFlatL2 for exact search

### Vector Storage System
* FAISS for efficient vector storage and retrieval
* Components:
  - Transcript vector store (FAISS)
  - Slide embeddings store (FAISS)
  - Piazza content vectors (FAISS)
* Key features:
  - Merge capability between vector stores
  - Load/save functionality
  - Batch vector addition
  - Fast similarity search

### Backend
* Python/Flask
* Langchain for embeddings management
* FAISS for vector similarity search
* PyMuPDF for PDF processing

### Frontend
* React
* Session management
* Local storage for history

## Setup

### Prerequisites

```bash
pip install -r requirements.txt
```

Required packages:
```python
faiss-cpu==1.7.4
langchain
openai
```

Frontend:
```bash
cd frontend
npm install
```

### Environment Variables

Create `.env`:
```
OPENAI_API_KEY=<your-key>
```

### Running

Start backend:
```bash
python app.py
```

Start frontend:
```bash
cd frontend
npm start
```

## Vector Store Implementation

### FAISS Integration
```python
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

# Initialize embeddings
embeddings = OpenAIEmbeddings()

# Create and save vector store
vectorstore = FAISS.from_texts(texts, embeddings)
vectorstore.save_local("faiss_index")

# Load existing vector store
loaded_vectorstore = FAISS.load_local("faiss_index", embeddings)

# Merge vector stores
vectorstore.merge_from(another_vectorstore)
```

### Vector Store Types

1. Transcript Store:
```python
# Store lecture transcript embeddings
text_chunks_vectorstore = FAISS.load_local(
    "text_chunks_faiss_index", 
    embeddings,
    allow_dangerous_deserialization=True
)
```

2. Piazza Store:
```python
# Store Piazza Q&A embeddings
piazza_vectorstore = FAISS.get_vectorstore(piazza_text_chunks)
```

3. Combined Store:
```python
# Merge vectors for comprehensive search
vectorstore.merge_from(piazza_vectorstore)
```

## Architecture

### Frontend
* React-based SPA
* Real-time QA interface
* Session management
* Response history

### Backend 
* Flask REST API
* Piazza integration
* File serving
* Session handling
* FAISS vector store management

### AI Components
* GPT for question answering
* FAISS for vector similarity search:
  - Pre-computed embeddings
  - Fast nearest neighbor search
  - Vector store merging
* PDF slide processing
* Video timestamp mapping

## Directory Structure

```
.
├── backend/
│   ├── app.py                # Flask app
│   ├── main.py              # Core logic
│   ├── chatbot_text_only.py # Text processing
│   ├── slides_snapshot.py   # PDF handling
│   ├── video_timestamps.py  # Video timing
│   └── piazza_conn.py       # Piazza auth
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── Login.js
│   │   └── CollapsibleQAItem.js
│   └── package.json
├── vector_stores/
│   ├── text_chunks_faiss_index/  # Transcript vectors
│   ├── piazza_faiss_index/       # Piazza vectors
│   └── slide_embeddings.json     # Cached embeddings
└── data/
    ├── Lectures/           # Course slides
    ├── snapshots/         # Generated images
    └── text_chunks.csv    # Transcripts
```

## Vector Store Optimization

### Pre-computation
* Slide content vectors are pre-computed and stored in FAISS
* Text chunks from transcripts are vectorized
* Piazza Q&A content is embedded
* All vectors are stored in FAISS indexes

### Runtime Processing
* New questions are embedded for similarity search
* FAISS performs efficient nearest neighbor search
* Multiple vector stores are queried and merged

### Performance Benefits
* Fast similarity search with FAISS
* Efficient vector storage and retrieval
* Scalable to large document collections
* Reduced memory usage
* Quick response times

## Error Handling

* Invalid credentials
* Missing files
* API failures
* Image loading issues
* Vector store operations
* FAISS index errors

## Security

* Session management
* Protected routes
* Safe file operations
* Environment variables
* Secure vector store handling

## License

MIT

## Contact

For questions or support:
- Email: [email]
- GitHub: [repo]

## Performance Notes

* FAISS provides efficient similarity search
* Vector stores enable fast content matching
* Pre-computation and caching improve response time
* Merged vector stores for comprehensive search
