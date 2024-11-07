# E-TA

E-TA (Enhanced Teaching Assistant) provides intelligent responses to student questions by analyzing course materials including lecture slides, transcripts, and Piazza discussions.

## Features

* Question answering using course materials context
* Integration with lecture slides and video content
* Secure Piazza authentication
* QA history tracking
* Web-based interface

## Setup

### Prerequisites

```bash
pip install -r requirements.txt
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

## Usage

1. Log in with Piazza credentials
2. Enter question in input field 
3. View response with:
   * Text explanation
   * Relevant slide
   * Video timestamp link
4. Access history of previous QA pairs

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

### AI Components
* GPT for question answering
* Embedding similarity matching
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
└── data/
    ├── Lectures/           # Course slides
    ├── snapshots/         # Generated images
    └── text_chunks.csv    # Transcripts
```

## Error Handling

* Invalid credentials
* Missing files
* API failures
* Image loading issues

## Security

* Session management
* Protected routes
* Safe file operations
* Environment variables

## License

MIT

## Contact

For questions or support:
- Email: [email]
- GitHub: [repo]
