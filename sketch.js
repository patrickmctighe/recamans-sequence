let shape1;
let shape2;
let shape3;
let shape4;

let zoom;
let opacity1;
let opacity2;
let opacity3;

let rotationSpeed;
let spacing;
let strokeW;
let frameR;

let zoomSlider = document.getElementById('zoomSlider');
let opacity1Slider = document.getElementById('opacity1Slider');
let opacity2Slider = document.getElementById('opacity2Slider');
let opacity3Slider = document.getElementById('opacity3Slider');
let rotationSlider = document.getElementById('rotationSlider');
let spacingSlider = document.getElementById('spacingSlider');
let strokeSlider = document.getElementById('strokeSlider');
let frameRateSlider = document.getElementById('frameRateSlider');
let shape1Select = document.getElementById('shape1');
let shape2Select = document.getElementById('shape2');
let shape3Select = document.getElementById('shape3');
let shape4Select = document.getElementById('shape4');

let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];
let biggest = 0;
let currentDirection = 0;
let currentPosition;

document.querySelector(".open").addEventListener("click", function () {
  document.querySelector(".slidersContainer").style.display = "flex";
  document.querySelector(".open").style.display = "none";
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".slidersContainer").style.display = "none";
  document.querySelector(".open").style.display = "flex";
});

document.getElementById("resetButton").addEventListener("click", function () {
  background(255);
  setup();
});

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  draw();
  console.log("resized");
}

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }
  show() {
    zoom = parseFloat(zoomSlider.value);
    opacity1 = parseFloat(opacity1Slider.value);
    opacity2 = parseFloat(opacity2Slider.value);
    opacity3 = parseFloat(opacity3Slider.value);
    rotationSpeed = parseFloat(rotationSlider.value);
    spacing = parseFloat(spacingSlider.value);
    strokeW = parseFloat(strokeSlider.value);
    shape1 = shape1Select.value;
    shape2 = shape2Select.value;
    shape3 = shape3Select.value;
    shape4 = shape4Select.value;
    frameR = parseFloat(frameRateSlider.value);

    let diameter = abs(this.end - this.start);
    let x = (this.end + this.start) / 4.5;
    let y = (this.end - this.start) * 4.5;
    noFill();
    strokeWeight(strokeW);

    // Define primary colors
    let primaryColors = [
      color(255, 0, 0, opacity1),   // Red
      color(0, 255, 0, opacity2),   // Green
      color(0, 0, 255, opacity3)    // Blue
    ];

    // Add animation effect: rotation
    let angle = frameCount * (rotationSpeed / 10);
    rotate(angle);

    // Draw shapes with primary colors and spacing
    for (let i = 0; i < 10; i++) {
      let size = diameter * (i + 1) * 0.1;
      let alpha = 255 - i * 20;
      let colorIndex = i % primaryColors.length;
      stroke(primaryColors[colorIndex]);

      if (shape1 !== "none") {
        if (shape1 === "circle") {
          circle(x + i * spacing, 0, size, size);
        } else if (shape1 === "rect") {
          rect(x + i * spacing, 0, size, size);
        } else if (shape1 === "triangle") {
          triangle(x + i * spacing, 0, size, size);
        } else if (shape1 === "ellipse") {
          ellipse(x + i * spacing, 0, size, size / 2);
        }
      }

      if (shape2 !== "none") {
        if (shape2 === "circle") {
          circle(-x - i * spacing, 0, size, size);
        } else if (shape2 === "rect") {
          rect(-x - i * spacing, 0, size, size);
        } else if (shape2 === "triangle") {
          triangle(-x - i * spacing, 0, size, size);
        } else if (shape2 === "ellipse") {
          ellipse(x + i * spacing, 0, size, size / 2);
        }
      }

      if (shape3 !== "none") {
        if (shape3 === "circle") {
          circle(0, y + i * spacing, size, size);
        } else if (shape3 === "rect") {
          rect(0, y + i * spacing, size, size);
        } else if (shape3 === "triangle") {
          triangle(0, y + i * spacing, size, size);
        } else if (shape3 === "ellipse") {
          ellipse(x + i * spacing, 0, size, size / 2);
        }
      }

      if (shape4 !== "none") {
        if (shape4 === "circle") {
          circle(0, -y - i * spacing, size, size);
        } else if (shape4 === "rect") {
          rect(0, -y - i * spacing, size, size);
        } else if (shape4 === "triangle") {
          triangle(0, -y - i * spacing, size, size);
        } else if (shape4 === "ellipse") {
          ellipse(x + i * spacing, 0, size, size / 2);
        }
      }
    }
  }
}

function step() {
  zoom = zoomSlider.value;
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);

  let a = new Arc(index, next, count % 2);
  arcs.push(a);

  index = next;
  count++;
}

function draw() {
  step();
  translate(width / 2, height / 2);
  scale(width / (zoom * biggest));
  background(0);
  for (let a of arcs) {
    a.show();
  }
}

function setup() {
  numbers = [true];
  count = 1;
  sequence = [];
  index = 0;
  arcs = [];
  biggest = 0;
  currentDirection = 0;
  frameR = frameRateSlider.value;
  createCanvas(windowWidth, windowHeight);
  frameRate(frameR);
  console.log("frameRate: " + frameR);
  background(0);
  currentPosition = createVector(0, 0);
  numbers[index] = true;
  sequence.push(index);
  for (let i = 0; i < 10; i++) {
    step();
  }
}

function step() {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);

  let direction = count % 6;

  let a = new Arc(index, next, count % 4, direction, currentPosition);
  arcs.push(a);

  index = next;

  if (index > biggest) {
    biggest = index;
  }
  count++;
}