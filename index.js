const findCell = (row, column) =>
  cells.find((c) => c.row === row && c.column === column);

const addNeighbors = (cell) => {
  cell.addNeighbor(findCell(cell.row - 1, cell.column - 1));
  cell.addNeighbor(findCell(cell.row - 1, cell.column));
  cell.addNeighbor(findCell(cell.row - 1, cell.column + 1));
  cell.addNeighbor(findCell(cell.row, cell.column - 1));
  cell.addNeighbor(findCell(cell.row, cell.column + 1));
  cell.addNeighbor(findCell(cell.row + 1, cell.column - 1));
  cell.addNeighbor(findCell(cell.row + 1, cell.column));
  cell.addNeighbor(findCell(cell.row + 1, cell.column + 1));
};

const rows = 15;
const columns = 15;
const cellSize = 50;
let bombsCount = 10;

const width = columns * cellSize;
const height = rows * cellSize;

const cells = [];

const board = document.getElementById("board");
board.style.width = `${width + 2}px`;
board.style.height = `${height + 2}px`;

for (let i = 0; i < rows; i++)
  for (let j = 0; j < columns; j++) cells.push(new Cell(i, j));

while (bombsCount > 0) {
  const bombIndex = Math.floor(Math.random() * 15 * 15);

  const row = Math.floor(bombIndex / columns);
  const column = bombIndex % columns;
  const cell = cells.find((c) => c.row === row && c.column === column);

  if (cell.bomb) continue;

  cell.bomb = true;
  bombsCount--;
}

for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  addNeighbors(cell);

  const div = document.createElement("div");
  div.classList.add("cell");
  div.style.width = `${cellSize}px`;
  div.style.height = `${cellSize}px`;

  div.onclick = () => cellClick(cell);
  board.append(div);

  cell.div = div;
}

const cellClick = (cell) => {
  cell.show();
};
