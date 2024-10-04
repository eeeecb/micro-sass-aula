# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from openai.types.chat import ChatCompletion
from openai import OpenAIError  # Use esta importação para erros
import logging
from config import Config
from database import save_conversation

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Inicializar cliente OpenAI
client = OpenAI(api_key=Config.OPENAI_API_KEY)
logger.debug(f"api key: {Config.OPENAI_API_KEY[:5]}...")


@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data["message"]
        user_id = data.get("user_id")

        logger.debug(f"Mensagem recebida: {user_message}")

        try:
            # Processar com GPT-4
            logger.debug("Iniciando chamada para OpenAI")
            response: ChatCompletion = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": """
                        Você é um coordenador de uma instituição de ensino.
                        Você deve fornecer informações sobre cursos, matrículas, 
                        horários de aula e políticas da escola.
                        """,
                    },
                    {"role": "user", "content": user_message},
                ],
                max_tokens=150,
                temperature=0.7,
            )

            ai_response = response.choices[0].message.content
            logger.debug(f"Resposta recebida da OpenAI: {ai_response}")

            try:
                save_conversation(user_message, ai_response, user_id)
            except Exception as db_error:
                logger.error(f"Erro ao salvar no banco de dados: {str(db_error)}")

            return jsonify({"response": ai_response})

        except OpenAIError as api_error:
            logger.error(f"Erro da OpenAI: {str(api_error)}")
            return jsonify({"error": "Erro ao processar com a IA"}), 500

    except Exception as e:
        logger.error(f"Erro geral: {str(e)}")
        return jsonify({"error": "Erro interno do servidor"}), 500


if __name__ == "__main__":
    app.run(debug=True)
