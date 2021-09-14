
class Bird {
  constructor(x, y) {
    this.acceleration = createVector(0, 0)
    this.velocity = createVector(random(-1, 1), random(-1, 1))
    this.position = createVector(x, y)
    this.r = 3.0
    this.maxSpeed = 3     // Maximum speed
    this.maxForce = 0.05  // Maximum steering force
  }

  run(birds) {
    this.flock(birds)   // accumulate a new acceleration each time based on three rules
    this.update()       // update location
    this.borders()
    this.render()
  }

  applyForce = (force) => {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force)
  }

  flock = (birds) => {
    let separation = this.separate(birds)      // checks for nearby birds and steers away
    let alignment = this.align(birds)          // for every nearby bird in the system, calculate the average velocity
    let cohesion = this.cohesion(birds)        // For the average location (i.e. center) of all nearby birds, calculate steering vector towards that location

    // Arbitrarily weight these forces
    separation.mult(1.5)
    alignment.mult(1.0)
    cohesion.mult(1.0)

    this.applyForce(separation)
    this.applyForce(alignment)
    this.applyForce(cohesion)
  }

  update = () => {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)      // Reset acceleration to 0 each cycle
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek = (target) => {
    let desired = p5.Vector.sub(target, this.position)  // A vector pointing from the location to the target
    desired.normalize()                                 // Normalize desired and scale to maximum speed
    desired.mult(this.maxSpeed)
    let steer = p5.Vector.sub(desired, this.velocity)   // Steering = Desired minus Velocity
    steer.limit(this.maxForce)
    return steer
  }

  render = () => {
    let theta = this.velocity.heading() + radians(90)      // rotated in the direction of velocity
    fill(127)
    stroke(200)
    push()
    translate(this.position.x, this.position.y)
    rotate(theta)
    beginShape()
    vertex(0, -this.r * 2)
    vertex(-this.r, this.r * 2)
    vertex(this.r, this.r * 2)
    endShape(CLOSE)
    pop()
  }

  borders = () => {
    if (this.position.x < -this.r)  this.position.x = width + this.r
    if (this.position.y < -this.r)  this.position.y = height + this.r
    if (this.position.x > width + this.r) this.position.x = -this.r
    if (this.position.y > height + this.r) this.position.y = -this.r
  }

  separate = (birds) => {
    let distance = 25.0
    let steer = createVector(0, 0)
    let count = 0
    for (const bird of birds) {
      let d = p5.Vector.dist(this.position, bird.position)
      if (d > 0 && d < distance) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, bird.position)
        diff.normalize()
        diff.div(d)      // Weight by distance
        steer.add(diff)
        count ++
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count)
    }
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);      // does it need to sub v i here 
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align = (birds) => {
    let scope = 50;
    let sum = createVector(0,0);
    let count = 0;
    for (let i = 0; i < birds.length; i++) {
      let d = p5.Vector.dist(this.position,birds[i].position);
      if ((d > 0) && (d < scope)) {
        sum.add(birds[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion = (birds) => {
    let scope = 50
    let sum = createVector(0, 0)
    let count = 0
    for (const bird of birds) {
      let d = p5.Vector.dist(this.position, bird.position)
      if (d > 0 && d < scope) {
        sum.add(bird.position)
        count ++
      }
    }
    if (count > 0) {
      sum.div(count)
      return this.seek(sum)
    } else {
      return createVector(0, 0)
    }
  }

  print() {
    console.log(`(${this.x}, ${this.y})`)
  }
}