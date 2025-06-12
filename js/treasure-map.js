// Funcionalidades adicionales para el mapa del tesoro

class TreasureMapEffects {
    constructor() {
        this.particles = [];
        this.initializeEffects();
    }

    initializeEffects() {
        this.createTreasureParticles();
        this.addKeyboardControls();
        this.addTouchSupport();
        this.initializeFamilyModal();
    }

    initializeFamilyModal() {
        // Crear efectos de corazones flotantes para el modal
        this.createFamilyHearts();
        
        // Agregar eventos para mejorar la experiencia del modal
        const modal = document.getElementById('family-modal');
        if (modal) {
            modal.addEventListener('animationend', this.onModalAnimationEnd.bind(this));
        }
    }

    createFamilyHearts() {
        const modal = document.getElementById('family-modal');
        if (!modal) return;

        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'family-hearts';
        modal.appendChild(heartsContainer);

        // Crear corazones flotantes
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '💖';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 4 + 's';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            heartsContainer.appendChild(heart);
        }
    }

    onModalAnimationEnd(event) {
        // Reiniciar animaciones de corazones cuando terminen
        if (event.target.classList.contains('heart')) {
            event.target.style.left = Math.random() * 100 + '%';
        }
    }

    createTreasureParticles() {
        const treasure = document.querySelector('.treasure');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'treasure-particles';
        treasure.appendChild(particlesContainer);

        // Crear partículas flotantes
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 50 + 'px';
            particle.style.top = Math.random() * 50 + 'px';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    addKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.clickNextCheckpoint();
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        resetGame();
                    }
                    break;
                case 'h':
                case 'H':
                    showHint();
                    break;
                case 'a':
                case 'A':
                    autoPlay();
                    break;
            }
        });
    }

    addTouchSupport() {
        let touchStartX, touchStartY;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Detectar gestos de deslizamiento
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        // Deslizar hacia la derecha - siguiente checkpoint
                        this.clickNextCheckpoint();
                    } else {
                        // Deslizar hacia la izquierda - pista
                        showHint();
                    }
                }
            } else {
                if (Math.abs(deltaY) > 50) {
                    if (deltaY < 0) {
                        // Deslizar hacia arriba - auto play
                        autoPlay();
                    } else {
                        // Deslizar hacia abajo - reiniciar
                        resetGame();
                    }
                }
            }

            touchStartX = null;
            touchStartY = null;
        });
    }

    clickNextCheckpoint() {
        if (game && game.currentCheckpoint <= game.totalCheckpoints) {
            const nextCheckpoint = document.querySelector(`[data-checkpoint="${game.currentCheckpoint}"]`);
            if (nextCheckpoint && !game.isAnimating) {
                nextCheckpoint.click();
            }
        }
    }

    createSoundWave(element) {
        const wave = document.createElement('div');
        wave.className = 'sound-wave';
        
        const rect = element.getBoundingClientRect();
        const container = element.closest('.map-container');
        const containerRect = container.getBoundingClientRect();
        
        wave.style.left = (rect.left - containerRect.left + rect.width/2 - 25) + 'px';
        wave.style.top = (rect.top - containerRect.top + rect.height/2 - 25) + 'px';
        
        container.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 1000);
    }

    addTrail(character) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 107, 107, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
            animation: trailFade 1s ease-out forwards;
        `;
        
        const rect = character.getBoundingClientRect();
        const container = character.closest('.map-container');
        const containerRect = container.getBoundingClientRect();
        
        trail.style.left = (rect.left - containerRect.left + 10) + 'px';
        trail.style.top = (rect.top - containerRect.top + 10) + 'px';
        
        container.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
}

// Funciones de utilidad adicionales
class GameStats {
    constructor() {
        this.startTime = null;
        this.endTime = null;
        this.moves = 0;
        this.hintsUsed = 0;
    }

    startGame() {
        this.startTime = new Date();
        this.moves = 0;
        this.hintsUsed = 0;
    }

    endGame() {
        this.endTime = new Date();
        return this.getStats();
    }

    addMove() {
        this.moves++;
    }

    addHint() {
        this.hintsUsed++;
    }

    getStats() {
        const timeElapsed = this.endTime - this.startTime;
        const minutes = Math.floor(timeElapsed / 60000);
        const seconds = Math.floor((timeElapsed % 60000) / 1000);
        
        return {
            time: `${minutes}:${seconds.toString().padStart(2, '0')}`,
            moves: this.moves,
            hints: this.hintsUsed,
            score: this.calculateScore(timeElapsed)
        };
    }

    calculateScore(timeElapsed) {
        const baseScore = 1000;
        const timePenalty = Math.floor(timeElapsed / 1000) * 2;
        const hintPenalty = this.hintsUsed * 50;
        const movePenalty = Math.max(0, this.moves - 7) * 10;
        
        return Math.max(0, baseScore - timePenalty - hintPenalty - movePenalty);
    }
}

// Mejorar la clase TreasureMap original
const originalTreasureMap = TreasureMap;
TreasureMap = class extends originalTreasureMap {
    constructor() {
        super();
        this.effects = new TreasureMapEffects();
        this.stats = new GameStats();
        this.stats.startGame();
    }

    moveToCheckpoint(checkpointNumber) {
        this.stats.addMove();
        this.effects.addTrail(this.character);
        
        // Llamar al método original
        super.moveToCheckpoint(checkpointNumber);
        
        // Agregar efectos de sonido visual
        const checkpoint = document.querySelector(`[data-checkpoint="${checkpointNumber}"]`);
        this.effects.createSoundWave(checkpoint);
    }

    showHint() {
        this.stats.addHint();
        super.showHint();
    }

    completeGame() {
        const stats = this.stats.endGame();
        
        // Actualizar mensaje de éxito con estadísticas
        const successMessage = document.getElementById('success-message');
        successMessage.innerHTML = `
            <div>🎉 ¡Felicitaciones! 🎉</div>
            <div>¡Has encontrado el tesoro!</div>
            <div style="margin-top: 15px; font-size: 16px;">
                <div>⏱️ Tiempo: ${stats.time}</div>
                <div>👣 Movimientos: ${stats.moves}</div>
                <div>💡 Pistas usadas: ${stats.hints}</div>
                <div>⭐ Puntuación: ${stats.score}</div>
            </div>
            <div style="margin-top: 15px;">
                <button class="btn" onclick="hideSuccess()">Continuar</button>
                <button class="btn" onclick="shareScore()">Compartir</button>
            </div>
        `;
        
        super.completeGame();
    }

    resetGame() {
        super.resetGame();
        this.stats = new GameStats();
        this.stats.startGame();
    }
};

// Funciones adicionales
function shareScore() {
    if (navigator.share && game.stats.endTime) {
        const stats = game.stats.getStats();
        navigator.share({
            title: 'Mapa del Tesoro - Mi Puntuación',
            text: `¡Completé el mapa del tesoro! Tiempo: ${stats.time}, Puntuación: ${stats.score}`,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const stats = game.stats.getStats();
        const text = `¡Completé el mapa del tesoro! Tiempo: ${stats.time}, Puntuación: ${stats.score}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('¡Puntuación copiada al portapapeles!');
            });
        } else {
            alert(`Tu puntuación: ${text}`);
        }
    }
}

// Funciones adicionales para el modal de familia
function openFamilyModalWithEffects() {
    const modal = document.getElementById('family-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modal.style.display = 'flex';
    
    // Agregar efectos de entrada
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
    
    // Vibración para dispositivos móviles
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // Animar iconos de familia
    setTimeout(() => {
        const memberIcons = modal.querySelectorAll('.member-icon');
        memberIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'bounceIn 0.6s ease-out';
            }, index * 200);
        });
    }, 300);
}

function closeFamilyModalWithEffects() {
    const modal = document.getElementById('family-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 300);
}

// Función para crear efectos de partículas en el modal
function createModalParticles() {
    const modal = document.getElementById('family-modal');
    if (!modal || modal.style.display === 'none') return;
    
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #FF69B4;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: modalParticle 2s ease-out forwards;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    
    modal.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Función para mostrar información adicional de cada miembro de la familia
function showMemberDetails(memberType) {
    const details = {
        baby: {
            title: "👶 El Bebé de la Familia",
            description: "El más pequeño y adorable miembro de la familia. Cada día trae nuevas sonrisas y momentos especiales.",
            traits: ["Curioso", "Alegre", "Tierno", "Aventurero"]
        },
        dad: {
            title: "👨 Papá",
            description: "El pilar fuerte de la familia, siempre dispuesto a proteger y guiar a sus seres queridos.",
            traits: ["Protector", "Sabio", "Trabajador", "Cariñoso"]
        },
        mom: {
            title: "👩 Mamá",
            description: "El corazón de la familia, quien llena el hogar de amor, cuidado y calidez.",
            traits: ["Amorosa", "Paciente", "Fuerte", "Comprensiva"]
        },
        daughter: {
            title: "👧 Hija",
            description: "Llena de sueños y creatividad, siempre lista para explorar el mundo con curiosidad.",
            traits: ["Creativa", "Inteligente", "Soñadora", "Valiente"]
        },
        son: {
            title: "👦 Hijo",
            description: "Un pequeño aventurero lleno de energía y ganas de descubrir todo lo que le rodea.",
            traits: ["Energético", "Curioso", "Divertido", "Leal"]
        }
    };
    
    const detail = details[memberType];
    if (detail) {
        alert(`${detail.title}\n\n${detail.description}\n\nCaracterísticas: ${detail.traits.join(', ')}`);
    }
}

// Agregar estilos para las nuevas animaciones
const trailStyles = `
    @keyframes trailFade {
        0% {
            opacity: 0.6;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes modalParticle {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-200px) scale(0);
        }
    }
`;

const trailStyleSheet = document.createElement('style');
trailStyleSheet.textContent = trailStyles;
document.head.appendChild(trailStyleSheet);

// Instrucciones de teclado
document.addEventListener('DOMContentLoaded', () => {
    const instructions = document.querySelector('.instructions p');
    instructions.innerHTML += '<br><small>💡 <strong>Controles:</strong> Espacio/Enter = Siguiente, H = Pista, A = Auto, Ctrl+R = Reiniciar</small>';
    
    // Crear partículas del modal cada cierto tiempo cuando esté abierto
    setInterval(() => {
        const modal = document.getElementById('family-modal');
        if (modal && modal.style.display === 'flex') {
            createModalParticles();
        }
    }, 1000);
});