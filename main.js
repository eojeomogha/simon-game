// Constants
const cpu = []; // CPU's turn
const player = []; // Player's turn
const colors = ['color1', 'color2', 'color3', 'color4']; // everything in array
const sequenceLength = 5; // How long the game will run
const difficultyLevels = {
  easy: 1000,
  medium: 500,
  hard: 250
}; // Wanted to do a nav bar where people could select difficulty. Will update later

// Variables
let currentScore = 0;
let highestScore = 0;
let isGameStarted = false;
let isMuted = false;
let turn = 0; 
let difficulty = 'easy';
const currentScoreValue = document.getElementById('current-score-value');
const highestScoreValue = document.getElementById('highest-score-value');
const errorMessage = document.getElementById('error-message');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const muteButton = document.getElementById('mute-button');

// The game begins here. Once someone clicks start game, prevent user from clicking start game again.
function startGame() {
  resetGame(); // Only way to restart a game. Definition below this
  isGameStarted = true;
  startButton.disabled = true;
  resetButton.disabled = false;
  muteButton.disabled = false;  
  generateNextColor();
}

// When game is restarted, everything resets to 0, start button is re-enabled and player score (& highest score (if > player score. If not, player score = 0)) is updated accordingly.
function resetGame() {
  cpu.length = 0;
  player.length = 0;
  currentScore = 0;
  updateScore();
  updateHighestScore();
  isGameStarted = false;
  showError('');
  stopPlayerTurn();
  startButton.disabled = false;
}

// When the game begins, CPU plays by flashing a color & playing an audio at a speed that's dictated by the difficulty level set. Furthermore, after CPU plays, player's turn begins.
function gameBegins() {
  let turn = 0;
  const interval = setInterval(() => {
    const color = cpu[turn];
    flashColor(color);
    turn++;
    
    if (turn >= cpu.length) {
      clearInterval(interval);
      player.length = 0;
      startPlayerTurn();
    }
  }, difficultyLevels[difficulty]);
}

// This function is meant to flash the provided randomColor & play audio
function flashColor(color) {
  const element = document.querySelector(`.color.${color}`);
   element.classList.add('black-bg');
  
  if (!isMuted) {
    const audio = new Audio(getSoundUrl(color));
    audio.play();
  }
  setTimeout(() => {
    element.classList.remove('black-bg');
  }, 1000);
}

// This function is for audio cue assignment for each color.
function getSoundUrl(color) {
  switch (color) {
    case 'color1':
      return 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
    case 'color2':
      return 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
    case 'color3':
      return 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
    case 'color4':
      return 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
    default:
      return '';
  }
}

// Now that CPU's done playing, this signifies the beginning of player's turn
function startPlayerTurn() {
  document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', handleColorClick);
  });
}

// For when the player's turn ends, preventing them from inputting any other colors during CPU's new turn.
function stopPlayerTurn() {
  document.querySelectorAll('.color').forEach(color => {
    color.removeEventListener('click', handleColorClick);
  });
}

// When player clicks a color, there should be something storing their input
function handleColorClick() {
  const color = this.classList[1];
  
  if (isGameStarted) {
    flashColor(color);
    handlePlayerInput(color);
  }
}

// After player clicks, this inputs their response into the initially empty player array. Furthermore, it needs to match what CPU played to continue or else end altogether.
function handlePlayerInput(colorClicked) {
  player.push(colorClicked);
  let matchCPU = false;
  
  // If inputs + number of inputs (i.e. how many colors are depicted) match, move forward.
  if (player[player.length - 1] === cpu[player.length - 1]) {
    matchCPU = true;   
    if (player.length < cpu.length) {
      return;
    }
  }
  
  // Moving forward entails increasing current score by 1, updating the score altogether and generating the next sequence unless player failed, at which game ends.
  if (matchCPU) {
    currentScore++;
    updateScore();
    generateNextColor();
  } else {
    endGame();
  }
}

function updateScore() {
  currentScoreValue.textContent = currentScore;
}

// If player gets the right color in the array, next step is to randomize what the next color might be.
function generateNextColor() {
  setTimeout(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    cpu.push(randomColor);
    gameBegins();
  }, 1000);
}

// When game ends, it's either because player failed or succeeded. Win/Lose all buttons besides start should be disabled, only giving the player the option to start (circumventing the need for a retry button). Furthermore, highest score should be updated.
function endGame() {
  isGameStarted = false;
  startButton.disabled = false;
  resetButton.disabled = true;
  muteButton.disabled = true;
  updateHighestScore();

function updateHighestScore() {
  if (currentScore > highestScore) {
    highestScore = currentScore;
    highestScoreValue.textContent = highestScore;
  }
}

function setDifficulty(level) {
  difficulty = level;
}

function toggleMute() {
  isMuted = !isMuted;
  muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
}

function showError(message) {
  errorMessage.textContent = message;
}

function showSuccessMessage(message) {
  errorMessage.textContent = message;
}


// Event listeners
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
muteButton.addEventListener('click', toggleMute);
