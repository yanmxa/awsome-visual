class Spot {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = []
    this.previous = undefined
    this.wall = false
    // (random(1) < 0.1) && (this.wall = true)
    if (random(1) < 0.4) {
      this.wall = true
    }
  }
  show = function(color) {
    fill(color)
    this.wall && fill(0)
    noStroke()
    // rect(this.i * w, this.j *  h, w, h);
    ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 1.8, h / 1.8 )
  }

  addNeighbors = function(grid) {
    this.j > 0 && this.neighbors.push(grid[this.i][this.j - 1])
    this.i < (cols - 1) && this.j > 0 && this.neighbors.push(grid[this.i + 1][this.j - 1])
    this.i < (cols - 1) && this.neighbors.push(grid[this.i + 1][this.j])
    this.i < (cols - 1) && this.j < (rows - 1) && this.neighbors.push(grid[this.i + 1][this.j + 1])
    this.j < (rows - 1) && this.neighbors.push(grid[this.i][this.j + 1])
    this.i > 0 && this.j > 0 && this.neighbors.push(grid[this.i - 1][this.j - 1])
    this.i > 0 && this.neighbors.push(grid[this.i - 1][this.j])
    this.i > 0 && this.j < (rows - 1) && this.neighbors.push(grid[this.i - 1][this.j + 1])
  }
}