export default class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.occupiedCells = new Set();
  }

  isCellOccupied(x, y) {
    return this.occupiedCells.has(`${x},${y}`);
  }

  occupyCell(x, y) {
    this.occupiedCells.add(`${x},${y}`);
  }

  vacateCell(x, y) {
    this.occupiedCells.delete(`${x},${y}`);
  }
}
