# 💔 Psicólogo del Amor - Versión Gemini

Esta es la aplicación completa con el agente inteligente "Doctor Corazón Invertido", potenciado por Google Gemini usando LangGraph.

## 📂 Estructura
- `/backend`: Lógica de la IA y servidor API. (Contiene el `main.py` configurado con `langchain-google-genai`).
- `/frontend`: Interfaz de usuario (Test de deslizar y Chat).
- `/database`: Script de MySQL para crear las tablas.

## 🚀 Cómo iniciar el proyecto

### PASO 1: Configurar la IA (Backend)
1. Abre tu terminal (Git Bash, CMD, o la terminal de VS Code) y entra a la carpeta `backend`.
2. Instala las librerías necesarias ejecutando:
   ```bash
   pip install -r requirements.txt
   ```
3. Renombra el archivo `.env.example` dejándolo solo como `.env`.
4. Abre el `.env` y coloca tu API Key de Google (Gemini) donde dice `tu_clave_de_gemini_aqui`.
5. Enciende el servidor con:
   ```bash
   uvicorn main:app --reload
   ```
   Verás que el servidor arranca en `http://localhost:8000`.

### PASO 2: Abrir la Aplicación (Frontend)
1. Navega a la carpeta `frontend`.
2. Haz doble clic en el archivo `index.html` para que se abra en Google Chrome o tu navegador favorito.
3. ¡Eso es todo! Haz el test y empieza a chatear.

### PASO 3: Base de Datos (Para producción - Opcional)
Si quieres guardar los datos a futuro, usa el archivo `schema.sql` en la carpeta `database` y ejecútalo en tu gestor de MySQL Workbench.