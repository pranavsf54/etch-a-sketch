const gridContainer = document.getElementById("gridContainer");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById("rainbowBtn");
const resetBtn = document.getElementById("resetBtn");

let rainbowMode = false;

rainbowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  rainbowMode = !rainbowMode;
  rainbowBtn.textContent = rainbowMode ? "Normal" : "Rainbow";
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetGrid();
});

let mouseDown = false;
document.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.addEventListener("mouseup", () => {
  mouseDown = false;
});

function makeGrids(e) {
  // Prevent form submission from reloading page
  e.preventDefault();
  gridContainer.innerHTML = "";

  let gridNum = parseInt(document.getElementById("gridNum").value);
  if (isNaN(gridNum) || gridNum < 1) return;

  gridContainer.style.setProperty("--grid-num", gridNum);

  let totalCells = gridNum * gridNum;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("gridItem");
    // Start off as white
    cell.style.backgroundColor = "white";
    cell.style.filter = "brightness(1)";
    // Darkness value: 0 means no darkening yet.
    cell.setAttribute("data-darkness", 0);
    // No drawn-on color yet.
    cell.setAttribute("data-original", "");

    // Paint on click or drag
    cell.addEventListener("mousedown", () => paintCell(cell));
    cell.addEventListener("mouseenter", () => {
      if (mouseDown) paintCell(cell);
    });
    gridContainer.appendChild(cell);
  }
}

function paintCell(cell) {
  if (rainbowMode) {
    // Rainbow mode: assign a random color and reset darkness.
    const randomColor = getRandomColor();
    cell.style.backgroundColor = randomColor;
    cell.style.filter = "brightness(1)";
    cell.setAttribute("data-darkness", 0);
    cell.setAttribute("data-original", randomColor);
  } else {
    // Normal mode: if the cell hasn't been painted or the picker color changed,
    // set it to the current color and reset darkening.
    let original = cell.getAttribute("data-original");
    if (!original || original !== colorPicker.value) {
      cell.setAttribute("data-original", colorPicker.value);
      cell.style.backgroundColor = colorPicker.value;
      cell.setAttribute("data-darkness", 0);
      cell.style.filter = "brightness(1)";
      original = colorPicker.value;
    }
    // Increase darkening in steps (max 10 steps).
    let darkness = Number(cell.getAttribute("data-darkness"));
    if (darkness < 10) {
      darkness++;
      cell.setAttribute("data-darkness", darkness);
      // Decrease brightness by 10% per step.
      let brightness = 1 - darkness * 0.1;
      cell.style.filter = `brightness(${brightness})`;
    }
  }
}

function resetGrid() {
  // Reset all cells to white.
  const cells = document.querySelectorAll(".gridItem");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
    cell.style.filter = "brightness(1)";
    cell.setAttribute("data-darkness", 0);
    cell.setAttribute("data-original", "");
  });
}

function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

// Create default 16x16 grid when the page loads.
document.addEventListener("DOMContentLoaded", () => {
  makeGrids({ preventDefault: () => {} });
});
