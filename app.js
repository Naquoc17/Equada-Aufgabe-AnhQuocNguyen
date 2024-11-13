//Stufe 3 - schwer

// Get the canvas element and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Initialize variables
const size = 20;
const basketSquare = {
   x: canvas.width / 2,
   y: canvas.height - 80,
   size: size,
};
let fallingApples = [];
let score = 0;
let lives = 3;

// Load images of basket and apple
const basketImg = new Image();
basketImg.src = "resource/images/basket.png";
const appleImg = new Image();
appleImg.src = "resource/images/apple.png";

// Cache DOM elements for updating score and lives
const livesDisplay = document.querySelector(".lives");
const scoreDisplay = document.querySelector(".score");

function drawBasket() {
   ctx.drawImage(
      basketImg,
      basketSquare.x,
      basketSquare.y,
      basketSquare.size,
      basketSquare.size
   );
}

// Update the lives and score on the display
function updateLivesDisplay() {
   const livesDisplay = "❤️".repeat(lives);
   document.querySelector(".lives").textContent = livesDisplay;
}
function updateScoreDisplay() {
   document.querySelector(".score").textContent = `Score: ${score}`;
}

// Create falling apples
function spawnFallingApples() {
   if (fallingApples.length < 3) {
      const x = Math.random() * (canvas.width - size);
      fallingApples.push({
         x: x,
         y: 0,
         size: size,
         speed: 0.1 + Math.random() * 0.05,
      });
   }
}

// Draw falling apples
function drawFallingApples() {
   for (const apple of fallingApples) {
      ctx.drawImage(appleImg, apple.x, apple.y, apple.size, apple.size);
   }
}

// Configure the movement of the falling apples
function moveFallingApples() {
   for (let i = 0; i < fallingApples.length; i++) {
      const apple = fallingApples[i];
      apple.y += apple.speed;

      if (
         apple.x < basketSquare.x + basketSquare.size &&
         apple.x + apple.size > basketSquare.x &&
         apple.y < basketSquare.y + basketSquare.size &&
         apple.y + apple.size > basketSquare.y
      ) {
         fallingApples.splice(i, 1);
         score++;
         updateScoreDisplay();
         continue;
      }

      if (apple.y > canvas.height) {
         fallingApples.splice(i, 1);
         lives--;
         updateLivesDisplay();

         if (lives <= 0) {
            if (confirm("Game Over! Do you want to restart?")) {
               resetGame();
            }
            return;
         }
      }
   }
}

// Configure the movement of the basket
addEventListener("keydown", function (event) {
   if (event.key === "ArrowRight") {
      basketSquare.x += 10;
      if (basketSquare.x > canvas.width - basketSquare.size) {
         basketSquare.x = canvas.width - basketSquare.size;
      }
   } else if (event.key === "ArrowLeft") {
      basketSquare.x -= 10;
      if (basketSquare.x < 0) {
         basketSquare.x = 0;
      }
   }
});

// Configure the main game
function gameLoop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   drawBasket();
   drawFallingApples();
   moveFallingApples();
   setInterval(gameLoop, 1000 / 120);
}

function startGame() {
   setInterval(spawnFallingApples, 1000);
   gameLoop();
}

function resetGame() {
   lives = 3;
   score = 0;
   fallingApples = [];
   updateLivesDisplay();
   updateScoreDisplay();
   startGame();
}

// Start the game
startGame();
