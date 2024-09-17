
# Piazza Automated Answering System

This project automates the process of answering student questions posted on Piazza using AI-driven responses and integrates additional resources such as lecture slide snapshots and video timestamps. The system leverages natural language processing, embeddings, and external tools like Dropbox for storing snapshots and YouTube for sharing video timestamps.

## Overview

### Key Components:
1. **Piazza Connection and Data Retrieval**:
   - Connects to the Piazza API using provided credentials.
   - Retrieves all posts (answered and unanswered) from a course.

2. **AI-Driven Answers**:
   - Uses GPT-based models to generate responses for unanswered questions.
   - Text data (lecture transcripts and Piazza answers) is processed and embedded into vectors for similarity search and response generation.

3. **Slide Snapshot Integration**:
   - Matches answers with relevant slides from lecture PDFs.
   - Uploads the most relevant slide snapshot to Dropbox and generates a shareable link for inclusion in the response.

4. **Video Timestamp Integration**:
   - Finds relevant timestamps from lecture videos based on the answer content.
   - Provides YouTube links with precise timestamps for students to review the video material.

## Main Files

1. **`piazza_conn.py`**: Handles the connection to Piazza, login, and data extraction.
2. **`piazza_answer.py`**: Contains functions for posting responses back to Piazza.
3. **`chatbot_text_only.py`**: Manages text processing, embeddings, and the GPT-based conversation chain to generate answers.
4. **`slides_snapshot.py`**: Handles the extraction of slide images from PDFs and uploads them to Dropbox.
5. **`video_timestamps.py`**: Processes lecture transcripts to find and match video timestamps for answers.
6. **`main.py`**: The main script that orchestrates the process: retrieving posts, generating answers, and responding with snapshots and video links.

## System Workflow

1. **Login to Piazza**: 
   - User provides their Piazza email and password.
   - The system logs into Piazza and fetches course posts.

2. **Retrieve Unanswered Questions**:
   - The system filters out unanswered questions and prepares them for AI-driven response generation.

3. **Generate Responses**:
   - GPT models generate responses based on available text chunks (lecture transcripts and previous Piazza answers).

4. **Find Relevant Resources**:
   - The system identifies relevant slides from PDFs and timestamps from lecture videos to support the generated answers.

5. **Respond on Piazza**:
   - The system posts the AI-generated response along with a Dropbox link to the slide snapshot and a YouTube link to the relevant lecture video timestamp.

## Dependencies

- **Python Libraries**: `Piazza-API`, `dropbox`, `PyPDF2`, `openai`, `re`, `os`, `time`
- **External Services**:
  - **Dropbox**: For storing slide snapshots and generating shareable links.
  - **YouTube**: For timestamping lecture videos.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/piazza-answering-system.git
   cd piazza-answering-system
   ```

2. Install required libraries:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up Dropbox access token and YouTube API (optional).

4. Run the main script:
   ```bash
   python main.py
   ```

5. Follow the prompts to log in to Piazza and let the system process the unanswered questions.

## Future Improvements

- Add more advanced natural language processing features.
- Enhance integration with more external resources (e.g., additional media platforms).
- Improve error handling and logging for more robust system behavior.
