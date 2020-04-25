# Duck Hunt
## Board
    https://trello.com/b/EIygTVwM/duck-hunter
## Descripción
Mi primer juego consiste en un escenario fijo en el que van apareciendo patos y debemos cazarlos.

Es para uno o dos jugadores.

En el caso de haber dos jugadores, podremos seleccionar un modo de juego entre cooperativo o competitivo.


## Reglas del juego
Cada pato cazado aumentará los puntos acumulados.

El objetivo es conseguir el mayor numero de puntos en el tiempo predeterminado.

La forma de cazar los patos será colocar a nuestro personaje debajo del pato y utilizar una tecla definida para lanzar una red hacia arriba.

## MVP - User stories
- Elegir cuando empieza el juego.
- La puntuacion  y los comandos tienen que ser visibles.
- El tablero tiene que ser visible. (Fondo, pato, cazador).
- Tiene que haber una tecla para disparar la red.

## Backlog
### Iteracion 1
1. Crear mapa de fondo. //CANVAS
2. Colocar contador de puntuacion //DOM
3. Lanzar un objeto (más adelante será un pato) por la pantalla de fondo. //CANVAS
4. Poner un objeto (personaje) con funciones de movimiento. //CANVAS
5. Crear modo de juego para dos personajes. //DOM & CANVAS

### Iteracion 2
1. Dar movimiento vertical al pato.
2. Delimitar escenario para los cazadores.
3. Sustituir objetos en movimiento por el frame final (pato y cazador).
4. Crear dos estados para la red (llena o vacía).
