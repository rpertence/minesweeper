class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.bomb = false;
    this.neighbors = [];
    this.revealed = false;
    this.hasFlag = false;
  }

  get neighborCount() {
    return this.neighbors.filter((i) => i.bomb).length;
  }

  addNeighbor = (neighbor) => {
    if (neighbor) this.neighbors.push(neighbor);
  };

  show = () => {
    if (!this.revealed) {
      this.revealed = true;

      this.div.style.backgroundColor = this.bomb
        ? "rgb(253 208 208)"
        : "rgb(239, 239, 239)";

      const nc = this.neighborCount;

      if (!this.bomb) this.div.innerText = nc === 0 ? "" : nc;

      if (nc === 0) {
        for (let i = 0; i < this.neighbors.length; i++)
          this.neighbors[i].show();
      }
    }
  };

  setFlag = () => {
    if (!this.revealed) {
      this.div.style.backgroundColor = this.hasFlag
        ? "#c1c1c1"
        : "rgb(202 202 255)";
      this.hasFlag = !this.hasFlag;
    }
  };

  clear = () => {
    console.log("clear");

    if (this.revealed) {
      const bombNeighbors = this.neighbors.filter((i) => i.bomb);
      const allBombsFlageds = bombNeighbors.every((i) => i.hasFlag);

      if (allBombsFlageds) {
        this.neighbors.forEach((i) => !i.bomb && i.show());
      }
    }
  };
}
