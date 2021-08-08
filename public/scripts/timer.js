let countdown_timer = document.getElementById("countdown_timer");
let btns = document.querySelectorAll(".buttons input");
let title = document.querySelector("p");
let text_inputs = document.querySelectorAll(".text_button input");
let work_time = null;
let timer;
let pause = false;

let audio = new Audio("/audio/10576.mp3");
function start() {
  show();
  work_time--;
}

function show() {
  let hours = Math.floor(work_time / 3600);
  let minutes = Math.floor(work_time / 60 - hours * 60);
  let second = work_time % 60;

  if (work_time <= 0) {
    audio.play();
    switch (title.innerHTML) {
      case "Rest":
        title.innerHTML = "Work";
        work_time = work.value * 60;
        stop();
        timer = setInterval(start, 1000);
        break;
      case "Work":
        title.innerHTML = "Rest";
        work_time = rest.value * 60;
        stop();
        timer = setInterval(start, 1000);
        break;
    }
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (second < 10) {
    second = "0" + second;
  }
  countdown_timer.innerHTML = `${hours}:${minutes}:${second}`;
}

function clean() {
  for (let btn of btns) {
    btn.disabled = false;
  }
}

function stop() {
  clearInterval(timer);
}

text_button.addEventListener("click", (event) => {
  event.target.value = "";
});
timer_start.addEventListener("click", () => {
  clean();
  timer_start.disabled = true;
  if (pause === false) {
    work_time = work.value * 60;
    timer = setInterval(start, 1000);
  } else if (pause === true) {
    pause = false;
    let time = countdown_timer.innerHTML.split(":").map((element) => {
      return Number(element);
    });
    work_time = time[0] * 60 * 60 + time[1] * 60 + time[2];
    timer = setInterval(start, 1000);
  }
});

timer_stop.addEventListener("click", () => {
  pause = true;
  stop();
  clean();
  timer_stop.disabled = true;
});

timer_reset.addEventListener("click", () => {
  clean();
  title.innerHTML = "Work";
  text_inputs[0].value = "";
  text_inputs[1].value = "";
  countdown_timer.innerHTML = `00:00:00`;
  stop();
});
