const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// Knight properties
const knight = {
  x: 100,
  y: 300,
  width: 50,
  height: 50,
  color: 'blue',
  speed: 0,
  jumping: false,
  action: 'idle',
};

// Update knight state
function updateKnight() {
  // Handle actions
  switch (knight.action) {
    case 'walk':
      knight.color = 'green';
      knight.x += 5; // Move right
      break;
    case 'jump':
      knight.color = 'orange';
      break;
    case 'attack':
      knight.color = 'red';
      break;
    default:
      knight.color = 'blue'; // Idle state
  }
}

// Draw the knight
function drawKnight() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the knight as a rectangle
  ctx.fillStyle = knight.color;
  ctx.fillRect(knight.x, knight.y, knight.width, knight.height);
}

// Apply gravity for jumping
function applyGravity() {
  if (knight.jumping) {
    knight.y += knight.speed;
    knight.speed += 0.8; // Gravity

    if (knight.y >= 300) { // Ground level
      knight.y = 300;
      knight.jumping = false;
      knight.action = 'idle';
    }
  }
}

// Handle keyboard input
window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowUp' && !knight.jumping) {
    knight.jumping = true;
    knight.speed = -15; // Jump strength
    knight.action = 'jump';
  }
  if (e.code === 'ArrowRight') {
    knight.action = 'walk';
  }
  if (e.code === 'Space') {
    knight.action = 'attack';
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowRight' || e.code === 'Space') {
    knight.action = 'idle';
  }
});

// Game loop
function gameLoop() {
  applyGravity();
  updateKnight();
  drawKnight();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
