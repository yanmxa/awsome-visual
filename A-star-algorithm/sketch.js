// https://en.wikipedia.org/wiki/A*_search_algorithm

let cols = 80
let rows = 80
let w, h
let path = []

let grid = new Array(cols)

let openSet = []
let closeSet = []
let start
let end

function setup() {
  console.log('A*')
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

    let winner = 0;
    for (let i = 0; i < openSet.length; i ++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i
      }
    }

    let current = openSet[winner]

    if (current === end) {
      return
    }

    removeFromArray(openSet, current)
    closeSet.push(current)

    let neighbors = current.neighbors;
    for (const neighbor of neighbors) {
      if (!closeSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1
        let newPath = false
        if (openSet.includes(neighbor)) {
          // update openSet min g
          if (tempG < neighbor.g) {
            neighbor.g = tempG
            newPath = true
          }
        } else {
          neighbor.g = tempG
          openSet.push(neighbor)
          newPath = true
        }
  
        if (newPath) {
          neighbor.h = heuristic(neighbor, end)
          neighbor.f = neighbor.g + neighbor.h
          neighbor.previous = current

          // find path
          path = []
          let temp = current
          path.push(temp)
          while (temp.previous) {
            path.push(temp.previous)
            temp = temp.previous
          }
        }
      }

    }

  } else {
    // no solution
    console.log('No Solution')
    noLoop()
    // find path
  }

  background(255);

  for(let i = 0; i < cols; i ++) {
    for(let j = 0; j < rows; j ++) {
        grid[i][j].show(color(255))
    }
  }

  for (const c of closeSet) {
    c.show(color(255, 0, 0))
  }
  for (const o of openSet) {
    o.show(color(0, 255, 0))
  }

  // for (const item of path) {
  //   item.show(color(0, 0, 255))
  // }

  noFill()
  beginShape()
  stroke(color(0, 0, 255))
  strokeWeight(w / 2)
  for (const item of path) {
    vertex(item.i * w + (w / 2), item.j * h + (h / 2))
  }
  endShape()
}
