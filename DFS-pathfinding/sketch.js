// https://en.wikipedia.org/wiki/A*_search_algorithm

let cols = 50
let rows = 50
let w, h
let path = []

let grid = new Array(cols)

let openSet = []
let closeSet = []
let start
let end

function setup() {
  console.log('DFS')
  createCanvas(600, 600);
   
  for(let i = 0; i < cols; i ++) {
    grid[i] = new Array(rows)
  }

  for(let i = 0; i < cols; i ++) {
    for(let j = 0; j < rows; j ++) {
        grid[i][j] = new Spot(i, j)
    }
  }

  for(let i = 0; i < cols; i ++) {
    for(let j = 0; j < rows; j ++) {
        grid[i][j].addNeighbors(grid)
    }
  }

  start = grid[0][0]
  end = grid[cols - 1][rows - 1]
  start.wall = false
  end.wall = false
    
  w = width / cols
  h = height / rows

  openSet.push(start)
}

function draw() {

  if (openSet.length > 0) {

    let current = openSet.pop()
    closeSet.push(current)

    if (current === end) {
      console.log('DONE')
      noLoop()
    }

    path = []
    let temp = current
    while(temp) {
      path.push(temp)
      temp = temp.previous
    }

    let neighbors = current.neighbors;
    for (const neighbor of neighbors) {
      if (!closeSet.includes(neighbor) && !openSet.includes(neighbor) &&!neighbor.wall) {
        neighbor.previous = current
        openSet.push(neighbor)
      }
    }

  } else {
    console.log('No Solution')
    noLoop()
  }

  background(255);

  for(let i = 0; i < cols; i ++) {
    for(let j = 0; j < rows; j ++) {
        grid[i][j].show(color(255))
    }
  }

  for (const closeItem of closeSet) {
    closeItem.show(color(255, 0, 0))
  }
  for (const openItem of openSet) {
    openItem.show(color(0, 255, 0))
  }

  noFill()
  beginShape()
  stroke(color(0, 0, 255))
  strokeWeight(w / 2)
  for (const item of path) {
    vertex(item.i * w + (w / 2), item.j * h + (h / 2))
  }
  endShape()
}
