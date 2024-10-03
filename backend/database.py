import psycopg2
from config import Config

def get_db_connection():
    return psycopg2.connect(**Config.DB_CONFIG)

def save_conversation(user_message, bot_response, user_id=None):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO conversations 
                (user_message, bot_response, timestamp, user_id) 
                VALUES (%s, %s, CURRENT_TIMESTAMP, %s)
                """,
                (user_message, bot_response, user_id)
            )
        conn.commit()