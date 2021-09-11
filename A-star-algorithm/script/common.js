function removeFromArray(array, item) {
  for (let i = array.length; i >= 0; i --) {
    if (array[i] == item) {
      array.splice(i, 1)
    }
  }
}

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j)
  // return abs(a.i - b.i) + abs(a.j - b.j)
}
