class TreasureMap {
    constructor() {
        this.currentCheckpoint = 1;
        this.totalCheckpoints = 7;
        this.character = document.getElementById('character');
        this.checkpoints = document.querySelectorAll('.checkpoint');
        this.progressText = document.getElementById('progress-text');
        this.isAnimating = false;
        
        this.checkpointPositions = [
            { top: 70, left: 50 },   // Inicio
            { top: 70, left: 150 },  // Checkpoint 2
            { top: 70, left: 250 },  // Checkpoint 3
            { top: 70, left: 350 }, // Checkpoint 4
            { top: 70, left: 450 }, // Checkpoint 5
            { top: 70, left: 550 }, // Checkpoint 6
            { top: 70, left: 650 }  // Checkpoint 7 (Tesoro)
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.checkpoints.forEach(checkpoint => {
            checkpoint.addEventListener('click', (e) => {
                this.handleCheckpointClick(e.target);
            });
        });

        // this.updateProgress();
        this.playSound('start');
    }

    handleCheckpointClick(checkpoint) {
        if (this.isAnimating) return;

        const checkpointNumber = parseInt(checkpoint.dataset.checkpoint);
        
        if (checkpointNumber === this.currentCheckpoint) {
            this.moveToCheckpoint(checkpointNumber);
        } else if (checkpointNumber < this.currentCheckpoint) {
            this.showMessage('¡Ya has pasado por ese punto!', 'info');
        } else {
            this.showMessage('¡Debes seguir el orden correcto!', 'warning');
            this.shakeCheckpoint(checkpoint);
        }
    }

    moveToCheckpoint(checkpointNumber) {
        this.isAnimating = true;
        const position = this.checkpointPositions[checkpointNumber - 1];
        
        // Manejar botones según el checkpoint
        this.hideAllButtons();
        
        if (checkpointNumber === 1) {
            // No mostrar ningún botón al salir del punto 1
        } else if (checkpointNumber === 2) {
            this.showChildhoodButton();
        } else if (checkpointNumber === 3) {
            this.showYouthButton();
        } else if (checkpointNumber === 4) {
            this.showUniversityButton();
        } else if (checkpointNumber === 5) {
            this.showWebDesignButton();
        } else if (checkpointNumber === 6) {
            this.showProgrammingButton();
        } else if (checkpointNumber === 7) {
            this.showTechButton();
        }
        
        // Animar el personaje
        this.character.style.top = position.top + 'px';
        this.character.style.left = position.left + 'px';

        // Actualizar estados de checkpoints
        this.updateCheckpointStates(checkpointNumber);

        setTimeout(() => {
            this.currentCheckpoint++;
            // this.updateProgress();
            this.isAnimating = false;

            if (checkpointNumber === this.totalCheckpoints) {
                this.completeGame();
            } else {
                this.playSound('step');
            }
        }, 800);
    }

    updateCheckpointStates(completedCheckpoint) {
        this.checkpoints.forEach((checkpoint, index) => {
            const checkpointNum = index + 1;
            
            if (checkpointNum < completedCheckpoint) {
                checkpoint.className = 'checkpoint completed';
            } else if (checkpointNum === completedCheckpoint) {
                checkpoint.className = 'checkpoint completed';
            } else if (checkpointNum === this.currentCheckpoint + 1) {
                checkpoint.className = 'checkpoint active';
            } else {
                checkpoint.className = 'checkpoint inactive';
            }
        });
    }

    // updateProgress() {
    //     const completed = this.currentCheckpoint - 1;
    //     this.progressText.textContent = `Progreso: ${completed}/${this.totalCheckpoints} puntos completados`;
    // }

    completeGame() {
        this.playSound('success');
        
        // Hacer el tesoro clickeable
        const treasure = document.getElementById('treasure');
        treasure.onclick = () => openTreasureModal();
        
        setTimeout(() => {
            document.getElementById('success-message').style.display = 'block';
        }, 500);
    }

    resetGame() {
        this.currentCheckpoint = 1;
        this.isAnimating = false;
        
        // Resetear posición del personaje
        this.character.style.top = '70px';
        this.character.style.left = '50px';

        // Resetear checkpoints
        this.checkpoints.forEach((checkpoint, index) => {
            if (index === 0) {
                checkpoint.className = 'checkpoint active';
            } else {
                checkpoint.className = 'checkpoint inactive';
            }
        });

        // Mostrar solo el botón de familia y ocultar todos los demás
        this.hideAllButtons();
        this.showFamilyButton();

        // Ocultar mensaje de éxito
        document.getElementById('success-message').style.display = 'none';

        // this.updateProgress();
        this.playSound('start');
    }

    shakeCheckpoint(checkpoint) {
        checkpoint.style.animation = 'none';
        setTimeout(() => {
            checkpoint.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
    }

    // showHint() {
    //     const nextCheckpoint = this.currentCheckpoint;
    //     if (nextCheckpoint <= this.totalCheckpoints) {
    //         const hintCheckpoint = document.querySelector(`[data-checkpoint="${nextCheckpoint}"]`);
    //         hintCheckpoint.style.animation = 'pulse 0.5s ease-in-out 3';
    //         this.showMessage(`¡El siguiente punto es el número ${nextCheckpoint}!`, 'info');
    //     }
    // }

    // autoPlay() {
    //     if (this.isAnimating) return;
        
    //     const autoButton = document.getElementById('auto-btn');
    //     autoButton.disabled = true;
    //     autoButton.textContent = '⏳ Ejecutando...';

    //     this.autoPlayStep();
    // }

    // autoPlayStep() {
    //     if (this.currentCheckpoint <= this.totalCheckpoints && !this.isAnimating) {
    //         const currentCheckpointElement = document.querySelector(`[data-checkpoint="${this.currentCheckpoint}"]`);
    //         this.handleCheckpointClick(currentCheckpointElement);
            
    //         setTimeout(() => {
    //             if (this.currentCheckpoint <= this.totalCheckpoints) {
    //                 this.autoPlayStep();
    //             } else {
    //                 const autoButton = document.getElementById('auto-btn');
    //                 autoButton.disabled = false;
    //                 autoButton.textContent = '▶️ Auto';
    //             }
    //         }, 1200);
    //     } else {
    //         const autoButton = document.getElementById('auto-btn');
    //         autoButton.disabled = false;
    //         autoButton.textContent = '▶️ Auto';
    //     }
    // }

    showMessage(message, type) {
        // Crear elemento de mensaje temporal
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideDown 0.3s ease-out;
            background: ${type === 'warning' ? '#FF6B6B' : type === 'info' ? '#4ECDC4' : '#32CD32'};
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 2000);
    }

    playSound(type) {
        // Simulación de sonidos con vibración en dispositivos móviles
        if (navigator.vibrate) {
            switch(type) {
                case 'step':
                    navigator.vibrate(100);
                    break;
                case 'success':
                    navigator.vibrate([100, 50, 100, 50, 200]);
                    break;
                case 'start':
                    navigator.vibrate(50);
                    break;
            }
        }
    }
    
    hideAllButtons() {
        const buttons = [
            'family-btn', 'childhood-btn', 'youth-btn', 
            'university-btn', 'webdesign-btn', 'programming-btn', 'tech-btn'
        ];
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) btn.style.display = 'none';
        });
    }

    showFamilyButton() {
        const familyBtn = document.getElementById('family-btn');
        if (familyBtn) {
            familyBtn.style.display = 'flex';
        }
    }
    
    hideFamilyButton() {
        const familyBtn = document.getElementById('family-btn');
        if (familyBtn) {
            familyBtn.style.display = 'none';
        }
    }

    showChildhoodButton() {
        const childhoodBtn = document.getElementById('childhood-btn');
        if (childhoodBtn) {
            childhoodBtn.style.display = 'flex';
        }
    }

    hideChildhoodButton() {
        const childhoodBtn = document.getElementById('childhood-btn');
        if (childhoodBtn) {
            childhoodBtn.style.display = 'none';
        }
    }

    showYouthButton() {
        const youthBtn = document.getElementById('youth-btn');
        if (youthBtn) {
            youthBtn.style.display = 'flex';
        }
    }

    hideYouthButton() {
        const youthBtn = document.getElementById('youth-btn');
        if (youthBtn) {
            youthBtn.style.display = 'none';
        }
    }

    showUniversityButton() {
        const universityBtn = document.getElementById('university-btn');
        if (universityBtn) {
            universityBtn.style.display = 'flex';
        }
    }

    showWebDesignButton() {
        const webdesignBtn = document.getElementById('webdesign-btn');
        if (webdesignBtn) {
            webdesignBtn.style.display = 'flex';
        }
    }

    showProgrammingButton() {
        const programmingBtn = document.getElementById('programming-btn');
        if (programmingBtn) {
            programmingBtn.style.display = 'flex';
        }
    }

    showTechButton() {
        const techBtn = document.getElementById('tech-btn');
        if (techBtn) {
            techBtn.style.display = 'flex';
        }
    }
}

// Inicializar el juego
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new TreasureMap();
});

// Funciones globales para los botones
function resetGame() {
    game.resetGame();
}

// function showHint() {
//     game.showHint();
// }

// function autoPlay() {
//     game.autoPlay();
// }

// function hideSuccess() {
//     document.getElementById('success-message').style.display = 'none';
// }

// Funciones para el modal de familia
function openFamilyModal() {
    document.getElementById('family-modal').style.display = 'flex';
    // Agregar efecto de sonido/vibración
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

function closeFamilyModal() {
    document.getElementById('family-modal').style.display = 'none';
}

// Funciones para el modal de infancia
function openChildhoodModal() {
    document.getElementById('childhood-modal').style.display = 'flex';
    // Agregar efecto de sonido/vibración
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

function closeChildhoodModal() {
    document.getElementById('childhood-modal').style.display = 'none';
}

// Función para mostrar detalles de la infancia
function showChildhoodDetails(itemType) {
    const details = {
        child: {
            title: "🧒 El Niño Interior",
            description: "Esa parte de nosotros que nunca deja de soñar, explorar y ver el mundo con ojos de asombro. La infancia es donde nacen nuestros primeros sueños y se forjan nuestros valores más profundos.",
            traits: ["Curioso", "Imaginativo", "Espontáneo", "Alegre", "Inocente"]
        },
        school: {
            title: "🏫 El Colegio",
            description: "Más que un lugar de aprendizaje, fue el escenario de mis primeras amistades, descubrimientos y desafíos. Donde aprendí no solo matemáticas y ciencias, sino también sobre la vida, la amistad y el trabajo en equipo.",
            traits: ["Aprendizaje", "Amistad", "Disciplina", "Crecimiento", "Descubrimiento"]
        },
        soccer: {
            title: "⚽ Fútbol",
            description: "Mi primera gran pasión deportiva. En cada partido aprendí sobre el trabajo en equipo, la perseverancia y la alegría de compartir victorias y derrotas con amigos. El fútbol me enseñó que ganar y perder son parte de la vida.",
            traits: ["Pasión", "Trabajo en equipo", "Perseverancia", "Diversión", "Competencia sana"]
        },
        bicycle: {
            title: "🚲 Mi Bicicleta",
            description: "Símbolo de libertad e independencia. Con ella exploré mi barrio, viví aventuras increíbles y sentí por primera vez la sensación de volar. Cada paseo era una nueva aventura esperando ser descubierta.",
            traits: ["Libertad", "Aventura", "Independencia", "Exploración", "Diversión"]
        }
    };
    
    const detail = details[itemType];
    if (detail) {
        // Crear un modal personalizado más bonito que alert
        showCustomAlert(detail.title, detail.description, detail.traits);
    }
}

// Función para mostrar un alert personalizado
function showCustomAlert(title, description, traits) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 3000;
        max-width: 500px;
        width: 90%;
        border: 3px solid #4169E1;
    `;
    
    alertDiv.innerHTML = `
        <h3 style="color: #4169E1; margin-bottom: 15px; text-align: center;">${title}</h3>
        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">${description}</p>
        <div style="margin-bottom: 20px;">
            <strong style="color: #4169E1;">Características:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                ${traits.map(trait => `<span style="background: #E6F3FF; color: #4169E1; padding: 5px 10px; border-radius: 15px; font-size: 12px;">${trait}</span>`).join('')}
            </div>
        </div>
        <button onclick="this.parentElement.remove()" style="background: #4169E1; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; width: 100%;">Cerrar</button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-cerrar después de 10 segundos
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 10000);
}

// Funciones para el modal de juventud
function openYouthModal() {
    document.getElementById('youth-modal').style.display = 'flex';
    // Agregar efecto de sonido/vibración
    if (navigator.vibrate) {
        navigator.vibrate([150, 50, 150]);
    }
}

function closeYouthModal() {
    document.getElementById('youth-modal').style.display = 'none';
}

// Funciones para el modal de universidad
function openUniversityModal() {
    document.getElementById('university-modal').style.display = 'flex';
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
}

function closeUniversityModal() {
    document.getElementById('university-modal').style.display = 'none';
}

// Funciones para el modal de diseño web
function openWebDesignModal() {
    document.getElementById('webdesign-modal').style.display = 'flex';
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
}

function closeWebDesignModal() {
    document.getElementById('webdesign-modal').style.display = 'none';
}

// Funciones para el modal de programación
function openProgrammingModal() {
    document.getElementById('programming-modal').style.display = 'flex';
    if (navigator.vibrate) {
        navigator.vibrate([150, 75, 150, 75, 150]);
    }
}

function closeProgrammingModal() {
    document.getElementById('programming-modal').style.display = 'none';
}

// Funciones para el modal de tecnología
function openTechModal() {
    document.getElementById('tech-modal').style.display = 'flex';
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100, 50, 200]);
    }
}

function closeTechModal() {
    document.getElementById('tech-modal').style.display = 'none';
}

// Funciones para el modal del tesoro
function openTreasureModal() {
    document.getElementById('treasure-modal').style.display = 'flex';
    if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300, 100, 300]);
    }
}

// function closeTreasureModal() {
//     document.getElementById('treasure-modal').style.display = 'none';
// }

// Cerrar modales al hacer clic fuera de ellos
document.addEventListener('click', function(event) {
    const modals = [
        'family-modal', 'childhood-modal', 'youth-modal', 
        'university-modal', 'webdesign-modal', 'programming-modal', 
        'tech-modal', 'treasure-modal'
    ];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Cerrar modales con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = [
            'family-modal', 'childhood-modal', 'youth-modal', 
            'university-modal', 'webdesign-modal', 'programming-modal', 
            'tech-modal', 'treasure-modal'
        ];
        
        modals.forEach(modalId => {
            document.getElementById(modalId).style.display = 'none';
        });
    }
});

// Agregar animaciones CSS adicionales
const additionalStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);