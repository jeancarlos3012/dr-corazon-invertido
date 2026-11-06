# 💔 Dr. Corazón Invertido - IA Psicológica Local

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-black)
![LangGraph](https://img.shields.io/badge/LangGraph-State_Agents-orange)
![HTML5/CSS3/JS](https://img.shields.io/badge/Frontend-Vanilla-E34F26?logo=html5)

Aplicación web impulsada por IA local (Ollama/Llama 3) y LangGraph que actúa como un psicólogo conversacional irónico para diagnosticar la negación romántica. Todo el procesamiento se realiza de forma **100% local, privada y gratuita**, sin depender de APIs de pago.

## 🚀 Características Principales

- **Test Diagnóstico Interactivo:** Un cuestionario dinámico de 15 preguntas que evalúa los niveles de "Enamoramiento" y "Negación" del usuario de manera cuantitativa.
- **IA con Personalidad (Dr. Corazón Invertido):** Un agente conversacional configurado con psicología inversa, sarcasmo y empatía oculta, que llama al usuario por su nombre.
- **Flujo de Trabajo Condicional (LangGraph):** El backend utiliza grafos de estado. Si el usuario insiste demasiado en su negación (ej. usando frases como "solo amigos" o "no me importa"), la IA enruta la conversación hacia un nodo "gamificador" que le asigna misiones y retos conductuales.
- **100% Local y Privado:** Usa `langchain-ollama` para conectarse a un modelo Llama 3 ejecutado en la propia máquina del usuario.
- **Exportación de Sesiones:** Permite al usuario descargar un reporte de su terapia en formato `.txt` incluyendo sus puntajes iniciales y todo el historial de chat.

## 🛠️ Tecnologías Utilizadas

- **Backend:** Python, FastAPI, Uvicorn, Pydantic.
- **IA & Orquestación:** LangChain, LangGraph, Ollama (Llama 3).
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla).

## 📂 Estructura del Proyecto

```text
📦 langgraph-ai-psychologist
 ┣ 📂 backend
 ┃ ┣ 📜 main.py               # Lógica principal, LangGraph, y servidor FastAPI
 ┃ ┗ 📜 requirements.txt      # Dependencias de Python
 ┣ 📂 frontend
 ┃ ┣ 📜 index.html            # Interfaz de usuario (Bienvenida, Test, Chat)
 ┃ ┣ 📜 style.css             # Estilos de la aplicación
 ┃ ┗ 📜 app.js                # Lógica del frontend, test y peticiones fetch
 ┣ 📜 .gitignore              # Archivos ignorados (entornos virtuales, claves)
 ┗ 📜 README.md
