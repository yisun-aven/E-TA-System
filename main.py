import piazza_conn
import piazza_answer
import chatbot_text_only
import slides_snapshot
import os
import dropbox
import re
import video_timestamps
from dropbox.exceptions import ApiError
import time

def process_question_from_web(question, email, password):
    print("Test")
    # Step 1: Connect to piazza and retrieve all data posts
    p = piazza_conn.create_piazza_object()
    piazza_conn.login_to_piazza(p, email, password)

    # Example Network ID
    network_id = "ltov6kuqfcn74l"
    course = piazza_conn.get_course_network(p, network_id)

    print("Test")

    # 2. Step 2: Embedding and pass to GPT
    # transcript text
    text_chunks = chatbot_text_only.load_text_chunks('text_chunks.csv')

    # piazza text
    piazza_text_chunks = chatbot_text_only.make_piazza_text_chunks("piazza_data/piazza_answered_or_instru_notes.csv")

    # get the transcript texts vectors and create answered text on piazza to vectors
    vectorstore = chatbot_text_only.get_text_chunks_vectorstore()
    piazza_vectorstore = chatbot_text_only.get_vectorstore(piazza_text_chunks)

    # coombine the vectors
    vectorstore.merge_from(piazza_vectorstore)
    conversation_chain = chatbot_text_only.get_conversation_chain(vectorstore)

    # 3. Answer all unanswered questions with snapshots
    # slides pdf folder
    slides_pdf_folder = "Lectures/slides"
    pdf_paths = [os.path.join(slides_pdf_folder, f) for f in os.listdir(slides_pdf_folder) if f.endswith('.pdf')]

    print(question)
    # 1. Answer
    bot_response = \
        f"{chatbot_text_only.handle_userinput(question, conversation_chain)}"
    print(bot_response)
    if "sorry" in bot_response.lower():
        return {
            'answer': bot_response,
            'snapshot': None,
            'url': None
        }
    
    # 2. Snapshot
    # Find the most relevant slide for the current question's answer
    if not os.path.exists("slide_embeddings.json"):
        print("Not exists")
        slides_snapshot.precompute_slide_embeddings(pdf_paths)
    most_relevant_snapshot_path = slides_snapshot.process_answers(pdf_paths, [bot_response])
    snapshot_filename = os.path.basename(most_relevant_snapshot_path)
    # Construct a URL for the image
    snapshot_url = f"http://127.0.0.1:5000/snapshots/{snapshot_filename}"

    # 3. Video Timestamps & link
    # Find the most relevant index chunk for the current question's answer in the lecture video
    lecture_index,  lecture_text, lecture_number = video_timestamps.process_answers("text_chunks_with_embedding.csv", [bot_response])
    
    youtube_link, timestamp = video_timestamps.find_time_stamps(lecture_number, lecture_text)

    # # 4. Combine the bot's response with the snapshot information and video link
    final_response = {
        'answer': bot_response,
        'snapshot': snapshot_url,
        'url': youtube_link
    }

    return final_response
