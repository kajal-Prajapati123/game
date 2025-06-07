const questions = [
    ["Which god is known as Gouri Nandan?", "Agni", "Indra", "Hanuman", "Ganesh", 4],
    ["Which city is known as the pink city of India?", "Bangalore", "Mysore", "Jaipur", "Kochi", 3],
    ["How many major religions in India?", "6", "7", "8", "9", 1],
    ["When was the national Hindi Diwas celebrated?", "13 Sep", "14 Sep", "14 July", "15 August", 2],
    ["Where is India Gate located?", "Agra", "Punjab", "Mumbai", "New Delhi", 4],
    ["Who is the developer of Python?", "Guido van Rossum", "V.Shreyash", "Russui Jain", "Einstein", 1]
];

const levels = [1000, 2000, 3000, 5000, 10000, 20000, 40000];
let currentQuestionIndex = 0;
let money = 0;
let gameStarted = false;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options-container');
const currentPrize = document.getElementById('current-prize');
const startButton = document.getElementById('start-game');
const exitButton = document.getElementById('exit-game');
const prizeList = document.getElementById('prize-list');

// Initialize the game
function initGame() {
    startButton.addEventListener('click', startGame);
    exitButton.addEventListener('click', exitGame);
    updatePrizeLadder();
}

// Start the game
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        currentQuestionIndex = 0;
        money = 0;
        updatePrizeLadder();
        displayQuestion();
        startButton.textContent = 'Next Question';
    } else {
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    }
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question[0];
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add new options
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = question[i];
        button.dataset.index = i;
        button.addEventListener('click', () => checkAnswer(i));
        optionsContainer.appendChild(button);
    }
    
    // Update current prize
    currentPrize.textContent = levels[currentQuestionIndex];
    
    // Highlight current prize in ladder
    updatePrizeLadder();
}

// Check answer
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const correctAnswer = question[5];
    
    if (selectedIndex === correctAnswer) {
        money = levels[currentQuestionIndex];
        alert(`Correct answer! You won ₹${money}`);
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                displayQuestion();
            }, 1000);
        } else {
            endGame();
        }
    } else {
        alert('Wrong answer! Game Over');
        endGame();
    }
}

// Update prize ladder
function updatePrizeLadder() {
    const listItems = prizeList.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('active');
    }
    
    if (currentQuestionIndex < listItems.length) {
        listItems[listItems.length - 1 - currentQuestionIndex].classList.add('active');
    }
}

// End game
function endGame() {
    gameStarted = false;
    startButton.textContent = 'Start Game';
    questionText.textContent = `Game Over! You won ₹${money}`;
    optionsContainer.innerHTML = '';
    currentPrize.textContent = money;
}

// Exit game
function exitGame() {
    if (confirm('Are you sure you want to exit?')) {
        endGame();
    }
}

// Initialize the game when the page loads
window.addEventListener('load', initGame); 