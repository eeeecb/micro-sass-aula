# test_openai.py
from openai import OpenAI
from config import Config
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = OpenAI(api_key=Config.OPENAI_API_KEY)

logger.debug(f"api key: {Config.OPENAI_API_KEY[:5]}...")

try:
    response = client.chat.completions.create(
        model="gpt-4",  # Tente primeiro com gpt-3.5-turbo
        messages=[
                    {"role": "system", "content": """
                    Você é um assistente virtual de uma instituição de ensino.
                    Você deve fornecer informações sobre cursos, matrículas, 
                    horários de aula e políticas da escola.
                    """},
                    {"role": "user", "content": "Olá, teste de API."}
                ],
    )
    print("Resposta:", response.choices[0].message.content)
except Exception as e:
    print("Erro:", str(e))