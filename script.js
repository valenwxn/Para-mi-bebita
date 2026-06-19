/**
 * Game Controller - Regalo para Mi Bebé
 */

// Configuración
const CONFIG = {
    buttonShrinkStep: 0.15,
    minButtonSize: 0.1,
    moveButtonRange: {
        x: window.innerWidth - 200,
        y: window.innerHeight - 100
    }
};

// Estado del juego
let gameState = {
    denyButtonSize: 1,
    acceptedProposal: false
};

/**
 * Cambiar escena del juego
 * @param {string} id - ID de la escena
 */
function showScene(id) {
    // Remover clase active de todas las escenas
    document.querySelectorAll(".scene").forEach(scene => {
        scene.classList.remove("active");
    });

    // Agregar clase active a la nueva escena
    const newScene = document.getElementById(id);
    if (newScene) {
        newScene.classList.add("active");
        
        // Reset del botón de negar cuando volvemos al menú o a la cita
        if (id === 'menu' || id === 'date') {
            resetDenyButton();
        }
    }
}

/**
 * Reducir tamaño del botón "Denegar"
 */
function shrinkButton() {
    gameState.denyButtonSize -= CONFIG.buttonShrinkStep;

    const denyBtn = document.getElementById("denyBtn");
    if (gameState.denyButtonSize <= CONFIG.minButtonSize) {
        gameState.denyButtonSize = CONFIG.minButtonSize;
        if (denyBtn) denyBtn.style.display = 'none'; // Desaparece por completo si insiste
    } else {
        if (denyBtn) {
            denyBtn.style.transform = `scale(${gameState.denyButtonSize})`;
        }
    }
}

/**
 * Resetear botón de negar
 */
function resetDenyButton() {
    gameState.denyButtonSize = 1;
    const denyBtn = document.getElementById("denyBtn");
    if (denyBtn) {
        denyBtn.style.style.display = 'inline-block';
        denyBtn.style.transform = `scale(1)`;
    }
}

/**
 * Aceptar propuesta
 */
function acceptProposal() {
    gameState.acceptedProposal = true;
    showScene("accepted");
    
    // Efecto de confeti masivo
    createConfetti();
}

/**
 * Mover botón "escape" aleatoriamente
 */
function moveButton() {
    const btn = document.getElementById("runawayBtn");
    if (!btn) return;

    // Forzar fixed para evitar que dependa de contenedores relativos y se desplace correctamente
    btn.style.position = "fixed";

    // Generar posición aleatoria segura evitando los extremos absolutos de la pantalla
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 40);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 40);

    // Aplicar posición con transición suave
    btn.style.transition = "all 0.2s ease-out";
    btn.style.left = Math.max(20, x) + "px";
    btn.style.top = Math.max(20, y) + "px";
}

/**
 * Crear efecto de confeti
 */
function createConfetti() {
    const confettiPieces = ['❤️', '💕', '💖', '💗', '✨', '🌹'];
    
    // Subimos la cantidad a 50 para que sea una ráfaga verdaderamente festiva
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = -(Math.random() * 60 + 20) + 'px'; // Caída con desfase de tiempo natural
        confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);

        // Animar caída
        let yPos = parseInt(confetti.style.top);
        const speed = Math.random() * 3 + 3;
        const xDrift = Math.random() * 4 - 2;

        const fall = setInterval(() => {
            yPos += speed;
            confetti.style.top = yPos + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + xDrift) + 'px';
            confetti.style.opacity = Math.max(0, 1 - yPos / window.innerHeight);

            if (yPos > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 30);
    }
}

/**
 * Inicialización
 */
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar escena inicial
    showScene('menu');
    
    // Actualizar rango de movimiento del botón en resize
    window.addEventListener('resize', () => {
        CONFIG.moveButtonRange.x = window.innerWidth - 200;
        CONFIG.moveButtonRange.y = window.innerHeight - 100;
    });
});
