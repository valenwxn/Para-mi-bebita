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
        
        // Reset del botón de negar cuando volvemos al menú
        if (id === 'menu') {
            resetDenyButton();
        }
    }
}

/**
 * Reducir tamaño del botón "Denegar"
 */
function shrinkButton() {
    gameState.denyButtonSize -= CONFIG.buttonShrinkStep;

    if (gameState.denyButtonSize < CONFIG.minButtonSize) {
        gameState.denyButtonSize = CONFIG.minButtonSize;
    }

    const denyBtn = document.getElementById("denyBtn");
    denyBtn.style.transform = `scale(${gameState.denyButtonSize})`;
}

/**
 * Resetear botón de negar
 */
function resetDenyButton() {
    gameState.denyButtonSize = 1;
    const denyBtn = document.getElementById("denyBtn");
    if (denyBtn) {
        denyBtn.style.transform = `scale(1)`;
    }
}

/**
 * Aceptar propuesta
 */
function acceptProposal() {
    gameState.acceptedProposal = true;
    showScene("accepted");
    
    // Efecto de confeti
    createConfetti();
}

/**
 * Mover botón "escape" aleatoriamente
 */
function moveButton() {
    const btn = document.getElementById("runawayBtn");
    
    if (!btn) return;

    // Generar posición aleatoria
    const x = Math.random() * CONFIG.moveButtonRange.x;
    const y = Math.random() * CONFIG.moveButtonRange.y;

    // Aplicar posición con transición suave
    btn.style.transition = "all 0.3s ease-out";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

/**
 * Crear efecto de confeti
 */
function createConfetti() {
    const confettiPieces = ['❤️', '💕', '💖', '💗', '✨', '🌹'];
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);

        // Animar caída
        let yPos = -20;
        const speed = Math.random() * 3 + 2;
        const xDrift = Math.random() * 4 - 2;

        const fall = setInterval(() => {
            yPos += speed;
            confetti.style.top = yPos + 'px';
            confetti.style.left = (parseInt(confetti.style.left) + xDrift) + 'px';
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
