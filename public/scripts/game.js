let table = document.getElementById("table");

let x = 1;
let y = 1;

draw_character();
set_level();

function remove_character() {
  document.getElementById("face").remove();
}

function draw_character() {
  table.rows[x].cells[y].innerHTML =
    '<img id="face" src="img/face.png" alt="character" />';
}

function redraw_character() {
  remove_character();
  table.rows[x].cells[y].innerHTML =
    '<img id="face" src="img/face.png" alt="character" />';
  setTimeout(check, 100);
}

function check() {
  if (
    x < 1 ||
    y < 1 ||
    x > 8 ||
    y > 8 ||
    table.rows[x].cells[y].style.backgroundColor === "black"
  ) {
    alert("Ты проиграл. Нельзя ходить на черные квадраты!");
    remove_character();
    x = 1;
    y = 1;
    draw_character();
  }

  if (x == 8 && y == 8) {
    alert("Поздравляю. Ты выиграл!");
    remove_character();
    x = 1;
    y = 1;
    draw_character();
    table.rows[8].cells[8].innerHTML = '<img src="img/end.png" alt="end" />';
    set_level();
  }
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function set_level() {
  let first = random(1, 8);
  let second = random(1, 8);

  if (
    (first == 1 && second == 1) ||
    (first == 8 && second == 8) ||
    table.rows[first].cells[second].style.backgroundColor === "black"
  ) {
    return set_level();
  }
  table.rows[first].cells[second].style.backgroundColor = "black";
}

document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowLeft") {
    y--;
    redraw_character();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowRight") {
    y++;
    redraw_character();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowUp") {
    x--;
    redraw_character();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowDown") {
    x++;
    redraw_character();
  }
});

reset.addEventListener("click", () => {
  window.location.reload();
});
