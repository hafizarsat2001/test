const wordDatabase = {
  easy: [
    { word: "cat", hint: "Small pet", category: "Animal", pronunciation: "kat" },
    { word: "sun", hint: "Bright in the sky", category: "Nature", pronunciation: "sun" },
    { word: "dog", hint: "Barks", category: "Animal", pronunciation: "dog" },
    { word: "hat", hint: "Worn on head", category: "Clothing", pronunciation: "hat" },
    { word: "pen", hint: "Used for writing", category: "Object", pronunciation: "pen" },
    { word: "cup", hint: "Holds drinks", category: "Object", pronunciation: "kup" },
    { word: "bus", hint: "Public transport", category: "Vehicle", pronunciation: "bus" },
    { word: "run", hint: "Fast movement", category: "Action", pronunciation: "run" },
    { word: "box", hint: "Square container", category: "Object", pronunciation: "boks" },
    { word: "jam", hint: "Fruit spread", category: "Food", pronunciation: "jam" },
    { word: "fan", hint: "Cools air", category: "Object", pronunciation: "fan" },
    { word: "zip", hint: "Opens clothes", category: "Object", pronunciation: "zip" },
    { word: "bed", hint: "Sleep here", category: "Furniture", pronunciation: "bed" },
    { word: "bat", hint: "Used in cricket", category: "Sport", pronunciation: "bat" },
    { word: "map", hint: "Shows directions", category: "Tool", pronunciation: "map" }
  ],
 medium: [
  { word: "orange", hint: "Fruit and color", category: "Food", pronunciation: "or-inj" },
  { word: "pencil", hint: "Used to draw", category: "Object", pronunciation: "pen-sil" },
  { word: "planet", hint: "Orbits a star", category: "Space", pronunciation: "plan-it" },
  { word: "window", hint: "Let's light in", category: "Object", pronunciation: "win-doe" },
  { word: "forest", hint: "Lots of trees", category: "Nature", pronunciation: "for-ist" },
  { word: "circle", hint: "Round shape", category: "Math", pronunciation: "sir-kul" },
  { word: "bridge", hint: "Crosses water", category: "Structure", pronunciation: "brij" },
  { word: "guitar", hint: "String instrument", category: "Music", pronunciation: "gi-tar" },
  { word: "bottle", hint: "Holds liquids", category: "Object", pronunciation: "bot-l" },
  { word: "market", hint: "Place to buy", category: "Place", pronunciation: "mar-kit" },
  { word: "castle", hint: "Old fortress", category: "Building", pronunciation: "kas-ul" },
  { word: "monkey", hint: "Climbs trees", category: "Animal", pronunciation: "mun-kee" },
  { word: "rocket", hint: "Space vehicle", category: "Space", pronunciation: "rok-it" },
  { word: "butter", hint: "Used in cooking", category: "Food", pronunciation: "but-er" },
  { word: "camera", hint: "Takes photos", category: "Object", pronunciation: "kam-er-uh" },
  { word: "button", hint: "Fastens clothes", category: "Clothing", pronunciation: "but-n" },
  { word: "doctor", hint: "Helps sick people", category: "Profession", pronunciation: "dok-ter" },
  { word: "family", hint: "Your relatives", category: "People", pronunciation: "fam-uh-lee" },
  { word: "garden", hint: "Plants grow here", category: "Nature", pronunciation: "gar-dun" },
  { word: "helmet", hint: "Protects your head", category: "Safety", pronunciation: "hel-met" }
],

hard: [
  { word: "elephant", hint: "Large animal", category: "Animal", pronunciation: "el-uh-fuhnt" },
  { word: "mountain", hint: "Very tall landform", category: "Nature", pronunciation: "mown-tin" },
  { word: "building", hint: "Structure with rooms", category: "Architecture", pronunciation: "bil-ding" },
  { word: "calendar", hint: "Tracks dates", category: "Tool", pronunciation: "kal-en-der" },
  { word: "computer", hint: "Electronic device", category: "Technology", pronunciation: "kom-pyoo-ter" },
  { word: "airplane", hint: "Flies in the sky", category: "Vehicle", pronunciation: "air-plane" },
  { word: "elephant", hint: "Large animal", category: "Animal", pronunciation: "el-uh-fuhnt" },
  { word: "building", hint: "Structure with rooms", category: "Architecture", pronunciation: "bil-ding" },
  { word: "calendar", hint: "Tracks dates", category: "Tool", pronunciation: "kal-en-der" },
  { word: "dinosaur", hint: "Extinct reptile", category: "Animal", pronunciation: "dye-no-sor" },
  { word: "language", hint: "Means of communication", category: "Concept", pronunciation: "lang-gwidj" },
  { word: "umbrella", hint: "Protects from rain", category: "Object", pronunciation: "um-brel-uh" },
  { word: "hospital", hint: "Where sick people go", category: "Place", pronunciation: "hos-pi-tul" },
  { word: "elephant", hint: "Large animal", category: "Animal", pronunciation: "el-uh-fuhnt" },
  { word: "notebook", hint: "For writing notes", category: "Object", pronunciation: "note-book" },
  { word: "sunshine", hint: "Light from the sun", category: "Nature", pronunciation: "sun-shine" },
  { word: "butterfly", hint: "Colorful insect", category: "Animal", pronunciation: "but-er-fly" },
  { word: "sandwich", hint: "Two slices of bread", category: "Food", pronunciation: "sand-wich" },
  { word: "telephone", hint: "Used to call", category: "Technology", pronunciation: "tel-uh-fohn" },
  { word: "pineapple", hint: "Tropical fruit", category: "Food", pronunciation: "pine-ap-uhl" },
  { word: "fireplace", hint: "Keeps you warm", category: "Home", pronunciation: "fire-plays" },
  { word: "backpack", hint: "Carries books", category: "Object", pronunciation: "back-pack" },
  { word: "birthday", hint: "Annual celebration", category: "Event", pronunciation: "birth-day" },
  { word: "mountain", hint: "Very tall landform", category: "Nature", pronunciation: "mown-tin" },
  { word: "strawberry", hint: "Red fruit", category: "Food", pronunciation: "straw-ber-ee" }
]
};

let currentWord = null;
let currentDifficulty = null;
let score = 0;
let correctCount = 0;
let gameState = "start";

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const difficultyLabel = document.getElementById("difficulty-label");
const categorySpan = document.getElementById("category");
const hintSpan = document.getElementById("hint");
const resultDiv = document.getElementById("result");
const scoreSpan = document.getElementById("score");
const userInput = document.getElementById("userInput");
const spellForm = document.getElementById("spellForm");
const gameOverScreen = document.createElement("div");

gameOverScreen.classList.add("hidden");
document.body.appendChild(gameOverScreen);

function startGame(difficulty) {
  currentDifficulty = difficulty;
  score = 0;
  correctCount = 0;
  gameState = "playing";
  scoreSpan.textContent = score;
  difficultyLabel.textContent = difficulty.toUpperCase();
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameOverScreen.classList.add("hidden");
  nextWord();
}

function nextWord() {
  const wordList = wordDatabase[currentDifficulty];
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  categorySpan.textContent = currentWord.category;
  hintSpan.textContent = currentWord.hint;
  resultDiv.textContent = "";
  userInput.value = "";
  userInput.focus();
}

function playWord() {
  if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser does not support speech synthesis.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(currentWord.pronunciation || currentWord.word);
  speechSynthesis.speak(utterance);
}

spellForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const guess = userInput.value.trim().toLowerCase();
  if (guess === currentWord.word.toLowerCase()) {
    resultDiv.textContent = "✅ Correct!";
    resultDiv.style.color = "green";
    updateScore();
    correctCount++;
    if (correctCount >= 5) {
      moveToNextLevel();
    }
  } else {
    resultDiv.textContent = `❌ Incorrect. It was "${currentWord.word}".`;
    resultDiv.style.color = "red";
  }
});

function updateScore() {
  const points = currentDifficulty === "easy" ? 5 : currentDifficulty === "medium" ? 10 : 15;
  score += points;
  scoreSpan.textContent = score;
}

function moveToNextLevel() {
  if (currentDifficulty === "easy") {
    alert("Level up! Moving to Medium.");
    startGame("medium");
  } else if (currentDifficulty === "medium") {
    alert("Level up! Moving to Hard.");
    startGame("hard");
  } else {
    endGame();
  }
}

function endGame() {
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  gameOverScreen.innerHTML = `
    <div class="container">
      <h2>🎉 Game Over!</h2>
      <p>Your final score is: <strong>${score}</strong></p>
      <button onclick="restartGame()">Play Again</button>
    </div>
  `;
  gameState = "finished";
}

function restartGame() {
  gameOverScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
