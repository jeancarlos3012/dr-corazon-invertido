from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated, TypedDict

# Importaciones de LangGraph y Ollama
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage, BaseMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langchain_ollama import ChatOllama

app = FastAPI(title="Psicologo del Amor API (Local Ollama)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EstadoPsicologo(TypedDict):
    mensajes: Annotated[List[BaseMessage], add_messages]
    nivel_negacion: int
    nivel_enamoramiento: int
    mision_actual: str
    nombre_usuario: str

try:
    llm = ChatOllama(model="llama3", temperature=0.7)
except Exception as e:
    print(f"Error al cargar Ollama: {e}")
    llm = None

def nodo_psicologo(estado: EstadoPsicologo):
    nombre = estado.get("nombre_usuario", "Jean Carlos")
    
    prompt_sistema = f"""Eres "El Doctor Corazón Invertido", un psicólogo virtual irónico.
El paciente se llama {nombre}. Dirígete a él por su nombre de forma directa, sarcástica pero con una empatía oculta.
Tiene un nivel de enamoramiento del {estado.get('nivel_enamoramiento', 50)}% y una negación del {estado.get('nivel_negacion', 50)}%.
Tu objetivo es que admita sus sentimientos. Hazle preguntas abiertas y profundas para que él mismo reflexione y hable.
No uses lenguaje clínico. Respuestas cortas, conversacionales y divertidas."""
    
    mensajes_con_contexto = [SystemMessage(content=prompt_sistema)] + estado["mensajes"]
    
    if llm:
        respuesta = llm.invoke(mensajes_con_contexto)
    else:
        respuesta = AIMessage(content="[Error] Ollama no está respondiendo. Verifica la consola.")
        
    return {"mensajes": [respuesta]}

def nodo_gamificador(estado: EstadoPsicologo):
    mision = f"🎮 MISIÓN PARA {estado.get('nombre_usuario', 'TI').upper()}: No mires su última conexión en todo el día. Si lo haces, pierdes."
    return {"mensajes": [AIMessage(content=mision)], "mision_actual": mision}

def decidir_siguiente_paso(estado: EstadoPsicologo):
    ultimo_mensaje = estado["mensajes"][-1].content.lower()
    if "solo amigos" in ultimo_mensaje or "no me importa" in ultimo_mensaje or "nada que ver" in ultimo_mensaje:
        return "gamificador"
    return "fin"

grafo = StateGraph(EstadoPsicologo)
grafo.add_node("psicologo", nodo_psicologo)
grafo.add_node("gamificador", nodo_gamificador)

grafo.set_entry_point("psicologo")

grafo.add_conditional_edges(
    "psicologo", 
    decidir_siguiente_paso, 
    {"gamificador": "gamificador", "fin": END}
)
grafo.add_edge("gamificador", END)

app_psicologo = grafo.compile()

class ChatRequest(BaseModel):
    mensaje: str
    historial: List[dict] = []
    nivel_negacion: int = 80
    nivel_enamoramiento: int = 90
    nombre_usuario: str = "Jean Carlos"

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    mensajes_historial = []
    for msg in req.historial:
        if msg["rol"] == "usuario":
            mensajes_historial.append(HumanMessage(content=msg["contenido"]))
        else:
            mensajes_historial.append(AIMessage(content=msg["contenido"]))
            
    mensajes_historial.append(HumanMessage(content=req.mensaje))
    
    estado_inicial = {
        "mensajes": mensajes_historial,
        "nivel_negacion": req.nivel_negacion,
        "nivel_enamoramiento": req.nivel_enamoramiento,
        "nombre_usuario": req.nombre_usuario
    }
    
    nuevo_estado = app_psicologo.invoke(estado_inicial)
    respuesta_final = nuevo_estado["mensajes"][-1].content
    
    return {"respuesta": respuesta_final}