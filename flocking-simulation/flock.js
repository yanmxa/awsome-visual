
class Flock {
  birds = []

  run = () => {
    console.log(this.birds.length)
    for (const bird of this.birds) {
      bird.run(this.birds)
    }
  }

  addBird = (bird) => {
    this.birds.push(bird)
  }
}

