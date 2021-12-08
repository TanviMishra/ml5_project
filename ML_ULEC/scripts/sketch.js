// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Canvas Image Classification using DoodleNet
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with DoodleNet.
let classifier;

let request;

// A variable to hold the canvas image we want to classify
let canvas, ctx;

// Two variable to hold the label and confidence of the result
let label;
let confidence;
let button;
const width = 600;
const height = 400;

let pX = null;
let pY = null;
let x = null;
let y = null;

let bgCol="#2e2e2e";
let mouseDown = false;

setup();
async function setup() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");

  classifier = await ml5.imageClassifier("DoodleNet", onModelReady);
  // Create a canvas with 280 x 280 px

  canvas.addEventListener("mousemove", onMouseUpdate);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);

  // Create a clear canvas button
  button = document.querySelector("#clearBtn");

  button.addEventListener("click", clearCanvas);
  // Create 'label' and 'confidence' div to hold results
  label = document.querySelector("#label");
  confidence = document.querySelector("#confidence");

  requestAnimationFrame(draw);
}

function onModelReady() {
  console.log("ready!");
}

function clearCanvas() {
  ctx.fillStyle = bgCol;
  ctx.fillRect(0, 0, width, height);
}

function draw() {
  request = requestAnimationFrame(draw);

  if (pX == null || pY == null) {
    ctx.beginPath();
    ctx.fillStyle = bgCol;
    ctx.fillRect(0, 0, width, height);

    pX = x;
    pY = y;
  }

  ctx.lineWidth = 5;
  ctx.strokeStyle = "#999999";
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseDown === true) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(x, y);
    ctx.lineTo(pX, pY);
    ctx.stroke();
  }

  pX = x;
  pY = y;
}

function onMouseDown(e) {
  mouseDown = true;
}

function onMouseUp(e) {
  mouseDown = false;
  classifyCanvas();
}

function onMouseUpdate(e) {
  const pos = getMousePos(canvas, e);
  x = pos.x;
  y = pos.y;
}

function getMousePos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // Show the first label and confidence
  label.textContent = `maybe its a ${results[0].label}`;
  confidence.textContent = `but also I'm like ${results[0].confidence.toFixed(4)}% sure`;
}

function myFunction(results) {
  text = document.querySelector("#page2");
  text.style.opacity="1";
  button = document.querySelector("#page1");
  button.style.opacity="0";
}

function colorSelected (element) {
  document.canvas.style.background = element.value
}