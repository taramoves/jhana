let dist;
let petalColor, circleColor;
let control1AXOffset, control1AYOffset, control2AXOffset, control2AYOffset, maxOffsetX, maxOffsetY;
let bordpos, bordsize, bordsizenew, bordupdate;
let sunPosX, sunPosY, sunCol;
let sunColor = [0,1,10,11];
let topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius;
let colWidth, pilCol, colAStart;
let pattern = ["ascending", "ascend-descend"];
let bW=50;
let pW=10;
let pH=200;
let aWTotal, aHTotal, aXStart, aYStart, aHCurrent, aXCurrent, aNo, aHDiff, aWDiff;
let rV;

function setup() {
    createCanvas(600, 800);
    noStroke();
    colorMode(HSL);
    pickStyle();
    background((petalColor+120) % 360, 100, 50);  
    let space = 50;
    rV = random(0,100);
    randomSeed(rV);
    borderTime();
    noStroke();
    sunPosX = random(100,520);
    sunPosY = random(100, 700); 
}

function draw() {
    noStroke();
    background((petalColor+120) % 360, 100, 50);  
    let size = 50; // Size variable to control the overall size of the sun
    Sun(sunPosX, sunPosY, size, sunCol);
    drawEye();
    let space = 50;
    borderTime();
    drawFlowerBorder(space);  
}

function pickStyle(){
    petalColor = random(0, 12)*30; // set petal color
    numberOfPetals = floor(random(6, 8)); // number of petals
    fullFlower = random([0, 1]); // 0 for half flower, 1 for full
    circleColor = random(0, 12)*30;
    sunCol = random(sunColor)*30;
    pilCol= color(petalColor + 90, 100, 50); // Random hue for the pillar

    dist = 20;
    maxOffsetX = dist / 2;
    maxOffsetY = dist / 2;
    control1AXOffset = random(0, maxOffsetX);
    control1AYOffset = random(-maxOffsetY, 0);
    control2AXOffset = random(0, maxOffsetX);
    control2AYOffset = random(0, maxOffsetY);
}

function borderTime(){
    bordsize = 2;
    bordpos = bordsize/2;
    bordupdate = bordsize/2 + bordpos;
    drawCustomBorder(bordsize, petalColor - 90, bordpos);
  
    bordsize = 5;
    bordpos = bordupdate + bordsize/2;
    bordupdate = bordsize/2 + bordpos;
    drawCustomBorder(bordsize, petalColor, bordpos);
    
    bordsize = 2;
    bordpos = bordupdate + bordsize/2;
    bordupdate = bordsize/2 + bordpos;
    drawCustomBorder(bordsize, petalColor - 90, bordpos);
  
    bordsize = 52.5;
    bordpos = bordupdate + bordsize/2;
    bordupdate = bordpos + bordsize/2;
    drawCustomBorder(bordsize, petalColor+90, bordpos);
  
    drawFlowerBorder(50, bordpos);
    
    bordsize = 5;
    bordpos = bordupdate + bordsize/2;
    bordupdate = bordpos + bordsize/2;
    drawCustomBorder(bordsize, petalColor - 90, bordpos);
  
    bordsize = 5;
    bordpos = bordupdate + bordsize/2;
    bordupdate = bordpos + bordsize/2;
    drawCustomBorder(bordsize, petalColor, bordpos);
  
    bordsize = 15;
    bordpos = bordupdate + bordsize/2;
    bordupdate = bordpos + bordsize/2;
    drawCustomBorder(bordsize, petalColor, bordpos);
  
    zigZag(bordpos -2, bordpos-2, width - bordpos * 2 +4, height - bordpos * 2 + 4, 3, 30, petalColor + 150);
  
    bordsize = 5;
    bordpos = bordupdate + bordsize/2;
    bordupdate = bordpos + bordsize/2;
    drawCustomBorder(bordsize, petalColor - 90, bordpos);
}

function drawCustomBorder(bsize, bcol, bpos) {
  strokeWeight(bsize); // Set the stroke width to bsize
  stroke(bcol, 100, 50); // Set the stroke color to bcol
  noFill(); // Ensure the rectangle isn't filled
  
  // Draw the rectangle, adjusting for bsize and bpos to inset properly
  rect(bpos, bpos, width - bpos * 2, height - bpos * 2);
}

function drawFlowerBorder(space, bordpos){
    let angles = [0, PI/2, PI, 3*PI/2]; //initial rotation
  
    //top
    for(let i = 0; i <= (width - 2*bordpos)/60; i++){
      initialRotation = angles[1];
      flowerCenterX = width - i*60 - bordpos;
      flowerCenterY = bordpos;
      controlFlower(flowerCenterX, flowerCenterY);         //flower construction
      drawFlower();
      drawCircle(flowerCenterX, flowerCenterY);
    }
  
    //right
    for(let i = 0; i <= (height - 2*bordpos)/60; i++){
      initialRotation = angles[2];
      flowerCenterX = width - bordpos;
      flowerCenterY = height - i*60 - bordpos;
      controlFlower(flowerCenterX, flowerCenterY); //flower construction
      drawFlower();
      drawCircle(flowerCenterX, flowerCenterY);
    }
  
    for(let i = 0; i <= (width - 2*bordpos)/60; i++){
      initialRotation = angles[3];
      flowerCenterX = i*60 + bordpos;
      flowerCenterY = height - bordpos;
      controlFlower(flowerCenterX, flowerCenterY); //flower construction
      drawFlower();
      drawCircle(flowerCenterX, flowerCenterY);
    }
  
    //right
    for(let i = 0; i <= (height - 2*bordpos)/60; i++){
      initialRotation = angles[0];
      flowerCenterX = bordpos; 
      flowerCenterY = i*60 + bordpos;
      controlFlower(flowerCenterX, flowerCenterY); //flower construction
      drawFlower();
      drawCircle(flowerCenterX, flowerCenterY);
    }
}

function controlFlower(centerx,centery){
    p1 = createVector(flowerCenterX, flowerCenterY);
    p2 = createVector(flowerCenterX, flowerCenterY);
    control1A = createVector(p1.x, p1.y);
    control1B = createVector(p1.x, p1.y);
    control2A = createVector(p2.x, p2.y);
    control2B = createVector(p2.x, p2.y);
  
    generateRandomShape(); // Generate the shape of the petal
}

function generateRandomShape() {
    p2.y = p1.y - dist;

    control1A.x = p1.x + control1AXOffset;
    control1A.y = p1.y + control1AYOffset;

    control1B.x = p1.x - control1AXOffset;
    control1B.y = control1A.y;
    
    control2A.x = p2.x + control2AXOffset;
    control2A.y = p2.y + control2AYOffset;

    control2B.x = p2.x - control2AXOffset;
    control2B.y = control2A.y;
}

function drawFlower() {
    let angleIncrement = fullFlower ? TWO_PI / numberOfPetals : PI / numberOfPetals;

    for (let i = 0; i < numberOfPetals; i++) {
        let angle = angleIncrement * i + initialRotation;
        onePetal(angle);
    }
}

function drawCircle(flowerCenterX, flowerCenterY){
  fill(petalColor, 100, 50);
  stroke(petalColor - 90,100,50); // Adding stroke outline
  strokeWeight(2); // Stroke thickness
  ellipse(flowerCenterX, flowerCenterY,7,7);
}

function onePetal(rotationAngle) {
    push();

    translate(flowerCenterX, flowerCenterY);
    rotate(rotationAngle + 5);
    translate(-flowerCenterX, -flowerCenterY);

    fill(petalColor + 150,100,65);
    stroke(petalColor - 90,100,50); // Adding stroke outline
    strokeWeight(2); // Stroke thickness
    beginShape();
    vertex(p1.x, p1.y);
    bezierVertex(control1A.x, control1A.y, control2A.x, control2A.y, p2.x, p2.y);
    bezierVertex(control2B.x, control2B.y, control1B.x, control1B.y, p1.x, p1.y);
    endShape(CLOSE);

    pop();
}

function zigZag(x, y, w, h, amplitude, wavelength, zcol) {
  stroke(zcol, 100, 50);
  strokeWeight(5);
  for (let side = 0; side < 2; side++) {
    let startY = y + side * h;
    for (let i = 0; i <= w; i++) {
      let angle = TWO_PI * (i / wavelength);
      let yOff = sin(angle) * amplitude;
      if (i == 0) {
        beginShape();
        vertex(x, startY + yOff);
      } else {
        vertex(x + i, startY + yOff);
      }
    }
    endShape();
  }
  
  for (let side = 0; side < 2; side++) {
    let startX = x + side * w;
    for (let i = 0; i <= h; i++) {
      let angle = TWO_PI * (i / wavelength);
      let xOff = sin(angle) * amplitude;
      if (i == 0) {
        beginShape();
        vertex(startX + xOff, y);
      } else {
        vertex(startX + xOff, y + i);
      }
    }
    endShape();
  }
}

function drawEye(){
  const eyeWidth = 80; // Width of the eye
  const eyeHeight = 50; // Height of the eye
  const pupilSize = eyeWidth*.4; // Size of the pupil
  const outlineOffset = 20; // Offset for the outer shape

  const eyeX1 = width / 2 - eyeWidth*.8;
  const eyeY = height - 140;
  const eyeX2 = eyeX1 + eyeWidth*1.6;

  drawFullEye(eyeX1, eyeY, eyeWidth, eyeHeight, pupilSize, outlineOffset);
  drawFullEye(eyeX2, eyeY, eyeWidth, eyeHeight, pupilSize, outlineOffset);
}

function drawFullEye(x, y, eyeWidth, eyeHeight, pupilSize, outlineOffset) {
  drawEyeShape(x, y, eyeWidth, eyeHeight, true, true, 0);

  let pupilOffsetX = map(mouseX, 0, width, -eyeWidth / 2 + pupilSize / 2, eyeWidth / 2 - pupilSize / 2, true);
  let pupilOffsetY = map(mouseY, 0, height, -eyeHeight / 2 + pupilSize / 2, eyeHeight / 2 - pupilSize / 2, true);

  const pupilX = constrain(x + pupilOffsetX, x - eyeWidth / 2 + pupilSize / 2, x + eyeWidth / 2 - pupilSize / 2);
  const pupilY = constrain(y + pupilOffsetY, y - eyeHeight / 2 + pupilSize / 2, y + eyeHeight / 2 - pupilSize / 2);

  fill(0); // Pupil color
  noStroke();
  ellipse(pupilX, pupilY, pupilSize, pupilSize);

  drawEyeShape(x, y, eyeWidth + outlineOffset, eyeHeight + outlineOffset, false, true, 50);
}

function drawEyeShape(x, y, width, height, fillWhite, strokeBlack, strokeColor) {
  const startX = x - width / 2;
  const endX = x + width / 2;
  const controlOffsetX = width / 4;
  const startY = y;
  const controlYTop = y - height / 2;
  const controlYBottom = y + height / 2;

  if (fillWhite) {
    fill(255); // White fill for the inner eyeShape
  } else {
    noFill(); // No fill for eyeShape2
  }

  if (strokeBlack) {
    stroke(petalColor+120, 100, strokeColor); // Stroke color based on the argument
    strokeWeight(10); // Stroke weight
  }

  beginShape();
  vertex(startX, startY);
  bezierVertex(startX + controlOffsetX, controlYTop, endX - controlOffsetX, controlYTop, endX, startY);
  bezierVertex(endX - controlOffsetX, controlYBottom, startX + controlOffsetX, controlYBottom, startX, startY);
  endShape();
}

function Sun(sunX, sunY, size, sunColor) {
  let sunRadius = size;
  let scale = size / 50; // Scale based on the base size (50)
  
  let maxOffset = 5; // Maximum offset for the sun's outer circle
  let offsetX = map(mouseX, 0, width, -maxOffset, maxOffset, true);
  let offsetY = map(mouseY, 0, height, -maxOffset, maxOffset, true);
  
  let adjustedSunX = sunX + offsetX;
  let adjustedSunY = sunY + offsetY;
  
  drawRays(adjustedSunX, adjustedSunY, sunRadius - 10 * scale, 8, 5 * scale, 6, 50 * scale, 5 * scale, color(sunColor, 100, 50), radians(25));
  drawRays(adjustedSunX, adjustedSunY, sunRadius - 12 * scale, 8, 5 * scale, 6, 30 * scale, scale/2, color(sunColor + 30, 100, 50), radians(25));
  drawRays(adjustedSunX, adjustedSunY, sunRadius + 3 * scale, 8, 4 * scale, 6, 50 * scale, 5 * scale, color(sunColor, 100, 50), radians(45));
  drawRays(adjustedSunX, adjustedSunY, sunRadius, 8, 4 * scale, 6, 20 * scale, scale/2, color(sunColor + 30, 100, 50), radians(45));
  
  for (let i = 0; i < 6; i++) { 
    let thisRadius = sunRadius - i * 4 * scale;
    let thisOffsetX = offsetX * (i + 2) / 5;
    let thisOffsetY = offsetY * (i + 2) / 5;
    drawCenterCircle(adjustedSunX + thisOffsetX, adjustedSunY + thisOffsetY, thisRadius, color(sunColor - i * 5, 100, 50));
  }
}

function drawCenterCircle(x, y, radius, fillColor) {
  fill(fillColor);
  noStroke();
  circle(x, y, radius * 2); // Draw circle with specified radius
}

function drawRays(x, y, radius, numRays, amplitude, waveFrequency, startThickness, endThickness, rayColor, rayRotation) {
  stroke(rayColor);
  for (let i = 0; i < numRays; i++) {
    let angle = TWO_PI / numRays * i + rayRotation;
    push();
    translate(x, y);
    rotate(angle);
    drawSquigglyRay(radius, amplitude/2, waveFrequency/2, startThickness, endThickness/5);
    pop();
  }
}

function drawSquigglyRay(radius, amplitude, waveFrequency, startThickness, endThickness) {
  let endY = radius + 70; // Extend the ray outward from the sun's edge
  let startY = 0;
  for (let i = startY; i < endY; i += 1) {
    let wave = sin(frameCount * 0.1 + i * 0.1 * waveFrequency) * amplitude;
    let angle = map(i, startY, endY, 0, waveFrequency * PI);
    let x = wave/2;
    let y = i;
    let nextY = i + 1;
    let nextWave = sin(frameCount * 0.1 + nextY * 0.1 * waveFrequency) * amplitude;
    let nextX = nextWave/2;
    let thisStrokeWeight = lerp(startThickness, endThickness, (i - startY) / (endY - startY));
    strokeWeight(thisStrokeWeight);
    line(x, y, nextX, nextY);
  }
}
