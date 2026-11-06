// Variables Globales
let nombreUsuario = "";
let puntajeEnamoramiento = 0;
let puntajeNegacion = 0;
let preguntaActual = 0;
let historialChat = [];

// Base de datos de 15 preguntas estructuradas
const preguntas = [
    {
        texto: "¿Cuándo fue la última vez que revisaste su última conexión o historias?",
        opciones: [
            { texto: "Hace menos de una hora.", enamoramiento: 3, negacion: 0 },
            { texto: "Ayer o hace unos días, me da igual.", enamoramiento: 0, negacion: 3 },
            { texto: "No lo hago, pero espero que me escriba.", enamoramiento: 2, negacion: 2 }
        ]
    },
    {
        texto: "Escuchas una canción romántica aleatoria. ¿En quién piensas?",
        opciones: [
            { texto: "En esa persona, inevitablemente.", enamoramiento: 3, negacion: 0 },
            { texto: "En nadie, solo disfruto la música.", enamoramiento: 0, negacion: 2 },
            { texto: "En esa persona, pero me obligo a pensar en otra cosa.", enamoramiento: 3, negacion: 3 }
        ]
    },
    {
        texto: "Si te cancela un plan a última hora, tú...",
        opciones: [
            { texto: "Hago otro plan, no dependo de nadie.", enamoramiento: 0, negacion: 2 },
            { texto: "Me molesto mucho y me arruina el día.", enamoramiento: 3, negacion: 0 },
            { texto: "Le digo que no importa, pero por dentro me duele.", enamoramiento: 3, negacion: 2 }
        ]
    },
    {
        texto: "¿Cuántas capturas de pantalla de sus chats tienes en tu galería?",
        opciones: [
            { texto: "Ninguna, qué psicópata.", enamoramiento: 0, negacion: 1 },
            { texto: "Una o dos, de cosas graciosas.", enamoramiento: 1, negacion: 1 },
            { texto: "Varias... para leerlas cuando me ignora.", enamoramiento: 3, negacion: 0 }
        ]
    },
    {
        texto: "Tus amigos te preguntan por esa persona. ¿Qué respondes?",
        opciones: [
            { texto: "'Solo somos amigos, no pasa nada'.", enamoramiento: 2, negacion: 3 },
            { texto: "'Ahí va, estamos viendo qué pasa'.", enamoramiento: 2, negacion: 1 },
            { texto: "'No me importa lo que haga de su vida'.", enamoramiento: 1, negacion: 3 }
        ]
    },
    {
        texto: "Te escribe un 'Hola' seco. ¿Cuánto tardas en responder?",
        opciones: [
            { texto: "Al instante, ya estaba con el celular.", enamoramiento: 3, negacion: 0 },
            { texto: "Espero a propósito un rato para no verme desesperado/a.", enamoramiento: 3, negacion: 3 },
            { texto: "Cuando me desocupe, sin apuro.", enamoramiento: 0, negacion: 1 }
        ]
    },
    {
        texto: "¿Te has imaginado escenarios ficticios con esta persona antes de dormir?",
        opciones: [
            { texto: "Sí, todos los días.", enamoramiento: 3, negacion: 0 },
            { texto: "Alguna vez, pero fue accidente cerebral.", enamoramiento: 1, negacion: 2 },
            { texto: "Nunca, yo duermo.", enamoramiento: 0, negacion: 1 }
        ]
    },
    {
        texto: "Si sube una foto con alguien más abrazados, ¿qué sientes?",
        opciones: [
            { texto: "Celos automáticos.", enamoramiento: 3, negacion: 0 },
            { texto: "Me da igual, no somos nada.", enamoramiento: 0, negacion: 3 },
            { texto: "Un vacío en el estómago, pero finjo que no vi nada.", enamoramiento: 3, negacion: 3 }
        ]
    },
    {
        texto: "¿Has buscado su signo zodiacal para ver si son compatibles?",
        opciones: [
            { texto: "Sí, y según TikTok nos vamos a casar.", enamoramiento: 3, negacion: 0 },
            { texto: "No creo en esas cosas.", enamoramiento: 0, negacion: 1 },
            { texto: "Lo vi por curiosidad, nada más.", enamoramiento: 2, negacion: 2 }
        ]
    },
    {
        texto: "Escribes un mensaje largo explicando tus sentimientos y...",
        opciones: [
            { texto: "Lo envío de una.", enamoramiento: 3, negacion: 0 },
            { texto: "Lo borro antes de enviarlo porque qué vergüenza.", enamoramiento: 3, negacion: 3 },
            { texto: "Yo no escribo testamentos.", enamoramiento: 0, negacion: 2 }
        ]
    },
    {
        texto: "¿Qué nombre le tienes puesto en WhatsApp?",
        opciones: [
            { texto: "Su nombre y apellido, bien frío.", enamoramiento: 0, negacion: 3 },
            { texto: "Su nombre con un emoji tierno.", enamoramiento: 3, negacion: 0 },
            { texto: "Un apodo interno que solo nosotros entendemos.", enamoramiento: 2, negacion: 1 }
        ]
    },
    {
        texto: "Ves un meme gracioso en redes. ¿Tu primer instinto es...?",
        opciones: [
            { texto: "Enviárselo inmediatamente.", enamoramiento: 3, negacion: 0 },
            { texto: "Enviarlo a mi grupo de amigos.", enamoramiento: 0, negacion: 1 },
            { texto: "Pensar en enviárselo, pero mejor no para no molestar.", enamoramiento: 2, negacion: 2 }
        ]
    },
    {
        texto: "Del 1 al 10, ¿cuánto te arreglas si sabes que te lo vas a cruzar?",
        opciones: [
            { texto: "Un 10, tiene que ver de lo que se pierde.", enamoramiento: 3, negacion: 1 },
            { texto: "Igual que siempre, no me importa.", enamoramiento: 0, negacion: 2 },
            { texto: "Un poco más de lo normal, por si acaso.", enamoramiento: 2, negacion: 1 }
        ]
    },
    {
        texto: "¿Has releído conversaciones antiguas entre ustedes?",
        opciones: [
            { texto: "Sí, cuando lo extraño.", enamoramiento: 3, negacion: 0 },
            { texto: "Borro los chats para no dejar evidencia.", enamoramiento: 2, negacion: 3 },
            { texto: "No, el pasado pisado.", enamoramiento: 0, negacion: 1 }
        ]
    },
    {
        texto: "Sé honesto/a, ¿estás haciendo este test por esa persona?",
        opciones: [
            { texto: "Sí, me atrapaste.", enamoramiento: 3, negacion: 0 },
            { texto: "No, solo estaba aburrido/a.", enamoramiento: 0, negacion: 3 },
            { texto: "Tal vez, pero no se lo digas a nadie.", enamoramiento: 2, negacion: 2 }
        ]
    }
];

// Transiciones de pantalla
function cambiarPantalla(pantallaId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(pantallaId).classList.add('active');
}

function handleNameEnter(event) {
    if (event.key === "Enter") iniciarTest();
}

function iniciarTest() {
    const input = document.getElementById("input-nombre").value.trim();
    if (input === "") {
        alert("Por favor, ingresa tu nombre para continuar.");
        return;
    }
    nombreUsuario = input;
    cambiarPantalla('screen-test');
    mostrarPregunta();
}

function mostrarPregunta() {
    if (preguntaActual >= preguntas.length) {
        finalizarTest();
        return;
    }

    const p = preguntas[preguntaActual];
    document.getElementById("question-text").innerText = p.texto;
    document.getElementById("progress-text").innerText = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
    document.getElementById("progress-bar").style.width = `${((preguntaActual) / preguntas.length) * 100}%`;

    const contenedor = document.getElementById("options-container");
    contenedor.innerHTML = "";

    p.opciones.forEach(opc => {
        const btn = document.createElement("button");
        btn.className = "btn-option";
        btn.innerText = opc.texto;
        btn.onclick = () => procesarRespuesta(opc.enamoramiento, opc.negacion);
        contenedor.appendChild(btn);
    });
}

function procesarRespuesta(puntosEnam, puntosNeg) {
    puntajeEnamoramiento += puntosEnam;
    puntajeNegacion += puntosNeg;
    preguntaActual++;
    mostrarPregunta();
}

function finalizarTest() {
    // Calculamos el porcentaje sobre el máximo posible (45 puntos máximo en enamoramiento/negacion)
    const porcEnamoramiento = Math.min(Math.round((puntajeEnamoramiento / 45) * 100), 100);
    const porcNegacion = Math.min(Math.round((puntajeNegacion / 45) * 100), 100);

    // Guardar variables globales para la API
    window.nivel_enamoramiento = porcEnamoramiento;
    window.nivel_negacion = porcNegacion;

    document.getElementById("diagnostic-results").innerText = 
        `Negación: ${porcNegacion}% | Enamoramiento: ${porcEnamoramiento}%`;

    // Crear el primer mensaje dinámico del chat
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    
    const div = document.createElement("div");
    div.className = "bot";
    div.innerText = `Hola ${nombreUsuario}. He analizado tus resultados (Enamoramiento: ${porcEnamoramiento}%, Negación: ${porcNegacion}%). Eres un caso clínico fascinante. Cuéntame con total sinceridad, ¿qué excusa te estás contando a ti mismo hoy para evitar aceptar lo que sientes?`;
    chatBox.appendChild(div);

    // Guardar en el historial oculto para la IA
    historialChat.push({ rol: "asistente", contenido: div.innerText });

    cambiarPantalla('screen-chat');
}

// Lógica del Chat
function handleChatEnter(event) {
    if (event.key === "Enter") enviarMensaje();
}

async function enviarMensaje() {
    const input = document.getElementById("user-input");
    const mensaje = input.value.trim();
    const chatBox = document.getElementById("chat-box");

    if (mensaje === "") return;

    // Mostrar mensaje del usuario
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.innerText = mensaje;
    chatBox.appendChild(userDiv);
    
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mensaje: mensaje,
                historial: historialChat,
                nivel_negacion: window.nivel_negacion,
                nivel_enamoramiento: window.nivel_enamoramiento,
                nombre_usuario: nombreUsuario
            })
        });

        const data = await response.json();

        // Mostrar respuesta de la IA
        const botDiv = document.createElement("div");
        botDiv.className = "bot";
        botDiv.innerText = data.respuesta;
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        historialChat.push({ rol: "usuario", contenido: mensaje });
        historialChat.push({ rol: "asistente", contenido: data.respuesta });

    } catch (error) {
        console.error("Error conectando al backend:", error);
        const errorDiv = document.createElement("div");
        errorDiv.className = "bot";
        errorDiv.innerText = "El Dr. Corazón está desconectado. Revisa tu terminal de Python.";
        errorDiv.style.color = "red";
        chatBox.appendChild(errorDiv);
    }
}

// Descargar Sesión
function descargarChat() {
    let mensajesHTML = document.querySelectorAll('.user, .bot'); 
    let textoPlano = `--- Diagnóstico del Dr. Corazón Invertido para ${nombreUsuario} ---\n`;
    textoPlano += `Nivel de Enamoramiento: ${window.nivel_enamoramiento}%\n`;
    textoPlano += `Nivel de Negación: ${window.nivel_negacion}%\n\n`;
    
    mensajesHTML.forEach(msg => {
        let remitente = msg.classList.contains('user') ? `${nombreUsuario}: ` : 'Dr. Corazón: ';
        textoPlano += remitente + msg.innerText + "\n\n";
    });

    let blob = new Blob([textoPlano], { type: "text/plain;charset=utf-8" });
    let enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `Sesion_Psicologia_${nombreUsuario.replace(/\s+/g, '_')}.txt`;
    enlace.click();
}