//Stufe 2 - mittel

// Get the canvas element and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Initialize variables
const square = {
   x: 40,
   y: 40,
   size: 20,
};

const img = new Image();
img.src = "resource/images/snake-body.png";

function drawImage() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(img, square.x, square.y, square.size, square.size);
}

addEventListener("keydown", function (event) {
   if (event.key === "ArrowRight") {
      square.x += 10;
      if (square.x > canvas.width - square.size) {
         square.x = canvas.width - square.size;
      }
   } else if (event.key === "ArrowLeft") {
      square.x -= 10;
      if (square.x < 0) {
         square.x = 0;
      }
   }
});

function gameLoop() {
   drawImage();
}

setInterval(gameLoop, 1000 / 120);
