export default class Colonie {
  constructor() {
    this.ants = [];
  }

  addAnt(ant) {
    this.ants.push(ant);
  }

  removeAnt(ant) {
    const index = this.ants.indexOf(ant);
    if (index > -1) {
      this.ants.splice(index, 1);
    }
  }

  getAnts() {
    return this.ants;
  }
}
