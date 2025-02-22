function makeGrids(e) {
  // Prevent from submission from reloading page
  e.preventDefault();

  const gridContainer = document.getElementById("gridContainer");
  // Clear previous grid
  gridContainer.innerHTML = "";

  let gridNum = parseInt(document.getElementById("gridNum").value);
  if (isNaN(gridNum) || gridNum < 1) return;

  gridContainer.style.setProperty("--grid-num", gridNum);

  let totalCells = gridNum * gridNum;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("gridItem");
    // Set darkness to 0
    cell.setAttribute("data-darkness", 0)
    gridContainer.appendChild(cell);
  }
}
