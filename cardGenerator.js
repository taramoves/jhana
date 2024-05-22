let canvas;

//this is my p5.js file

function setup() {
    canvas = createCanvas(400, 600);
    canvas.parent('card-display');
    background(255); // White background for the card
}

function draw() {
    // Add your card generation logic here
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Your Card", width / 2, height / 2);
}
