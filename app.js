// ¡Buena suerte!

// Generar número aleatorio entre 1 y 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Contador de intentos (10 máximo)
let remainingGuesses = 10;

// Referencias a elementos del DOM
const guessField = document.getElementById('guessField');
const guessSubmit = document.getElementById('subt');
const previousGuessesDisplay = document.getElementById('previous-guesses');
const remainingGuessesDisplay = document.getElementById('remaining-guesses');
const messageDisplay = document.getElementById('message');

// Inicializar intentos restantes
remainingGuessesDisplay.textContent = remainingGuesses;

function checkGuess(event) {
    event.preventDefault();
    const userGuess = Number(guessField.value);

    // Validación
    if (userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = 'Por favor, ingresa un número entre 1 y 100';
        return;
    }

    // Mostrar intentos anteriores
    if (previousGuessesDisplay.textContent === '') {
        previousGuessesDisplay.textContent = userGuess;
    } else {
        previousGuessesDisplay.textContent += `, ${userGuess}`;
    }

    // Comparar con el número aleatorio
    if (userGuess === randomNumber) {
        // Ganó
        messageDisplay.textContent = '¡Felicidades! ¡Adivinaste el número!';
        messageDisplay.style.color = 'green';
        gameOver();
    } else {
        // Disminuir intentos
        remainingGuesses--;
        remainingGuessesDisplay.textContent = remainingGuesses;

        // Dar pista
        if (userGuess < randomNumber) {
            messageDisplay.textContent = 'El número es mayor';
        } else {
            messageDisplay.textContent = 'El número es menor';
        }
        messageDisplay.style.color = 'red';

        // Verificar si se acabaron los intentos
        if (remainingGuesses === 0) {
            messageDisplay.textContent = `¡Se acabaron los intentos! El número era ${randomNumber}`;
            gameOver();
        }
    }

    // Limpiar campo
    guessField.value = '';
    guessField.focus();
}

function gameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
}

// Event listener
document.querySelector('.form').addEventListener('submit', checkGuess);
