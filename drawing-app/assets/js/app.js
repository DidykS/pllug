const colors = document.querySelectorAll('.drawing__colors--color');
const canvas = document.querySelector('#canvas');
const btn = document.querySelector('.btn');
const rect = document.querySelector('.btn-rect');

let penSize = 10;
let shape = 'line';
let isDrawing;
let x;
let y;

const context = canvas.getContext('2d');
context.fillStyle = 'black';
context.strokeStyle = context.fillStyle;

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
  isDrawing = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (shape === 'line') {
    draw(e.offsetX, e.offsetY);
  } else if (shape === 'circle') {
    deawCircle(x, y);
  } else if (shape === 'square') {
    drawSquare(x, y);
  } else if (shape === 'rect') {
    drawRect(x, y);
  }
});

btn.addEventListener('click', clearSpace);

// functions:
// draw function
function draw(offsetX, offsetY) {
  if (isDrawing) {
    context.beginPath();
    context.arc(offsetX, offsetY, penSize, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    drawLine(x, y, offsetX, offsetY);
  }

  x = offsetX;
  y = offsetY;
}

// draw line function
function drawLine(offsetX1, offsetY1, offsetX2, offsetY2) {
  context.beginPath();
  context.moveTo(offsetX1, offsetY1);
  context.lineTo(offsetX2, offsetY2);
  context.strokeStyle = context.fillStyle;
  context.lineWidth = penSize * 2;
  context.stroke();
}

// draw circle
function deawCircle(offsetX, offsetY) {
  context.beginPath();
  context.arc(offsetX, offsetY, penSize, 0, Math.PI * 2);
  context.closePath();
  context.strokeStyle = context.fillStyle;
  context.fill();
}

// draw square
function drawSquare(offsetX, offsetY) {
  context.fillRect(offsetX, offsetY, penSize, penSize);
  context.strokeStyle = context.fillStyle;
  context.lineWidth = penSize * 2;
}

// draw rectangle
function drawRect(offsetX, offsetY) {
  context.fillRect(offsetX, offsetY, penSize * 2, penSize);
  context.strokeStyle = context.fillStyle;
}

// clear space function
function clearSpace() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// select color function
function selectColor(elem) {
  colors.forEach((item) => {
    item.classList.remove('active');
  });

  context.fillStyle = elem.getAttribute('data-color');
  elem.classList.add('active');
}

// pen size function
function setSize(value) {
  penSize = value;
}

// set color function
function setColor(elem) {
  colors.forEach((item) => {
    item.classList.remove('active');
  });

  context.fillStyle = elem.value;
}

// select shape
function selectShape(elem) {
  shape = elem.getAttribute('data-shape');
}
