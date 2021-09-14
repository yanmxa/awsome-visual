// http://www.red3d.com/cwr/boids/

let flock
function setup() {
  createCanvas(windowWidth, windowHeight);
  flock = new Flock();
  // Add an initial set of birds into the system
  for (let i = 0; i < 100; i++) {
    let b = new Bird(width / 2,height / 2);
    flock.addBird(b);
  }
}

function draw() {
  background(0, 255);
  flock.run()
}


function mouseDragged() {
  flock.addBird(new Bird(mouseX, mouseY));
}