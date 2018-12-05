import _ from "lodash";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let balls = []
const gravity = 1; // pixels per second
const friction = 0.8; // how much momentum is lost on bounce
const minRadius = 15;
const maxRadius = 30;
canvas.width = innerWidth;
canvas.height = innerHeight;

// Demo Modes
let enableGravity = false;
let enableBounce = false;
let enableSideMovement = false;
let enableMulti = false;

// Array of possible ball colours
const colours = [
  '#6699CC',
  '#FFF275',
  '#FF8C42',
  '#FF3C38',
  '#A23E48'
]

// Event Listeners
addEventListener('click', event => {
  if (enableMulti) {
    for (let i = 0; i < 5; i++) {
      balls.push(new Ball(colours[i], event.clientX, event.clientY));
    }
  } else {
    balls.push(new Ball(_.sample(colours), event.clientX, event.clientY));
  }
})

addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 49: // 1
      enableGravity = !enableGravity;
      break;
    case 50: // 2
      enableBounce = !enableBounce;
      break;
    case 51: // 3
      enableSideMovement = !enableSideMovement;
      break;
    case 52: // 4
      enableMulti = !enableMulti;
      break;
    case 53: // 5 - enable all
      enableGravity = true;
      enableBounce = true;
      enableSideMovement = true;
      enableMulti = true;
      break;
    case 87: // W
      changeBallsVelocity('dy', -20)
      break;
    case 65: // A
      changeBallsVelocity('dx', -5)
      break;
    case 83: // S
      changeBallsVelocity('dy', 5)
      break;
    case 68: // D
      changeBallsVelocity('dx', 5)
      break;
    default:
      break;
  }
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

class Ball {
  constructor(colour, x, y, dx, dy, radius) {
    this.radius = radius || _.random(minRadius, maxRadius);
    this.x = x || _.random(this.radius, canvas.height);
    this.y = y || _.random(this.radius, canvas.height);
    if (enableSideMovement) {
      this.dx = dx || _.random(-8, 8);
    } else {
      this.dx = 0;
    }
    this.dy = dy || 0;
    this.colour = colour || _.sample(colours);34
  }

  // Draw circle using object properties
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.colour;
    c.fill();
    c.stroke();
    c.closePath();
  }

  // Update position of circle
  update() {
    let skipGravity = false;
    if (enableBounce) {
      // Check for boundary collision
      if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
        this.dx = - this.dx * friction;
      }
      if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius + this.dy < 0) {
        this.dy = - this.dy * friction;
        skipGravity = true;
      }
    }
    if (enableGravity && !skipGravity) {
      // Apply gravity
      this.dy += gravity;
    }
    // Update position
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function init() {
  balls = [];
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  balls.forEach(ball => {
   ball.update();
  });
}

function changeBallsVelocity(direction, amount) {
  for (let i = 0; i < balls.length; i++) {
    balls[i][direction] += amount;
  }
}

init()
animate()