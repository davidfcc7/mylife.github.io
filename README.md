# 🗺️ Mapa del Tesoro Interactivo

Un juego web interactivo donde un personaje debe seguir un camino numerado para llegar al tesoro, similar a un mapa del tesoro clásico.

## 🎮 Características

### Funcionalidades Principales
- **Navegación paso a paso**: El personaje se mueve de punto en punto siguiendo un orden específico
- **Animaciones fluidas**: Transiciones suaves del personaje entre checkpoints
- **Sistema de validación**: Solo permite avanzar al siguiente punto en orden
- **Feedback visual**: Diferentes estados para puntos activos, completados e inactivos
- **Efectos visuales**: Animaciones de pulso, brillo del tesoro, y efectos de partículas

### Controles Interactivos
- **Clic en checkpoints**: Haz clic en los puntos numerados para mover el personaje
- **Botón de Pista**: Resalta el siguiente punto a visitar
- **Modo Auto**: Ejecuta automáticamente toda la secuencia
- **Reiniciar**: Vuelve al estado inicial del juego

### Controles de Teclado
- `Espacio` o `Enter`: Avanzar al siguiente checkpoint
- `H`: Mostrar pista
- `A`: Activar modo automático
- `Ctrl + R`: Reiniciar juego

### Controles Táctiles (Móviles)
- **Deslizar derecha**: Siguiente checkpoint
- **Deslizar izquierda**: Mostrar pista
- **Deslizar arriba**: Modo automático
- **Deslizar abajo**: Reinic
iar

## 🎯 Cómo Jugar

1. **Objetivo**: Guía al aventurero (🏃‍♂️) desde el punto 1 hasta el punto 7 donde está el tesoro (💰)

2. **Reglas**:
   - Debes hacer clic en los puntos numerados en orden secuencial (1, 2, 3, 4, 5, 6, 7)
   - No puedes saltar puntos ni ir hacia atrás
   - El punto activo se resalta en dorado y pulsa
   - Los puntos completados se muestran en verde

3. **Elementos del Mapa**:
   - 🌲🌳 Árboles decorativos
   - ⛰️ Montañas
   - Caminos marrones que conectan los puntos
   - 💰 Tesoro final con efectos brillantes

## 📊 Sistema de Puntuación

El juego incluye un sistema de estadísticas que rastrea:
- ⏱️ **Tiempo total**: Duración desde el inicio hasta completar
- 👣 **Movimientos**: Número total de clics realizados
- 💡 **Pistas usadas**: Cantidad de veces que se solicitó ayuda
- ⭐ **Puntuación**: Calculada basada en tiempo, eficiencia y uso de pistas

### Cálculo de Puntuación
- Puntuación base: 1000 puntos
- Penalización por tiempo: -2 puntos por segundo
- Penalización por pistas: -50 puntos por pista usada
- Penalización por movimientos extra: -10 puntos por movimiento adicional

## 🛠️ Estructura del Proyecto

```
portfolio/
├── views/
│   └── ruta.html          # Archivo principal del juego
├── styles/
│   └── treasure-map.css   # Estilos adicionales y efectos
├── js/
│   └── treasure-map.js    # Funcionalidades avanzadas
└── README.md              # Este archivo
```

## 🎨 Características Técnicas

### Tecnologías Utilizadas
- **HTML5**: Estructura semántica del juego
- **CSS3**: Animaciones, transiciones y diseño responsivo
- **JavaScript ES6+**: Lógica del juego y interactividad
- **Web APIs**: Vibración, compartir contenido, portapapeles

### Características Responsivas
- Diseño adaptable para dispositivos móviles y desktop
- Controles táctiles optimizados para pantallas touch
- Interfaz escalable que se ajusta a diferentes tamaños de pantalla

### Efectos Visuales
- Animaciones CSS para movimiento del personaje
- Efectos de partículas alrededor del tesoro
- Rastro visual del movimiento del personaje
- Ondas de sonido visuales en los checkpoints
- Animaciones de pulso y brillo

## 🚀 Cómo Ejecutar

1. **Opción 1 - Archivo Local**:
   ```bash
   # Simplemente abre el archivo en tu navegador
   open views/ruta.html
   ```

2. **Opción 2 - Servidor Local**:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (si tienes http-server instalado)
   npx http-server
   
   # Luego visita: http://localhost:8000/views/ruta.html
   ```

## 🎮 Funcionalidades Avanzadas

### Sistema de Efectos
- **Partículas flotantes**: Alrededor del tesoro para mayor atractivo visual
- **Rastro del personaje**: Deja una estela temporal al moverse
- **Ondas de sonido**: Efectos visuales que simulan sonidos
- **Vibración háptica**: En dispositivos móviles compatibles

### Compartir Puntuación
- Integración con Web Share API para compartir resultados
- Fallback para copiar al portapapeles en navegadores no compatibles
- Formato de mensaje personalizado con estadísticas

### Accesibilidad
- Controles de teclado completos
- Mensajes informativos claros
- Contrastes de color apropiados
- Soporte para lectores de pantalla

## 🎯 Posibles Mejoras Futuras

- [ ] Múltiples niveles con diferentes mapas
- [ ] Sistema de logros y medallas
- [ ] Sonidos reales en lugar de vibración
- [ ] Modo multijugador
- [ ] Personalización de personajes
- [ ] Guardado de mejores puntuaciones
- [ ] Temas visuales alternativos
- [ ] Integración con redes sociales

## 📱 Compatibilidad

- ✅ Chrome/Chromium (Desktop y móvil)
- ✅ Firefox (Desktop y móvil)
- ✅ Safari (Desktop y móvil)
- ✅ Edge
- ✅ Dispositivos táctiles
- ✅ Teclados físicos

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usar, modificar y distribuir el código.

---

¡Disfruta explorando el mapa del tesoro! 🏴‍☠️✨