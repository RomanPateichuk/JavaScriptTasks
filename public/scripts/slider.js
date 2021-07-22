function httpGet(theUrl) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

document.getElementById("gallery").innerHTML = httpGet(
  "http://localhost:3000/var_HTML"
);

document.getElementById("dots_wrapper").innerHTML = httpGet(
  "http://localhost:3000/var_DOTS"
);

let images = document.querySelectorAll("ul> li img");
let dots = document.querySelectorAll('input[type="radio"]');
let list = gallery.querySelector("ul");
let listElems = gallery.querySelectorAll("li");
let i = 0;

function clean_dots() {
  for (dot of dots) {
    dot.checked = false;
  }
}

function clean_borders_img() {
  for (img of images) {
    img.style.border = "none";
  }
}

function prev() {
  if (i > 0) {
    i--;
    clean_borders_img();
    dots[i].checked = true;
    images[i].style.border = "4px solid red";
    images[i].scrollIntoView({
      behavior: "smooth",
    });
  }
}

function next() {
  if (images.length - 1 > i) {
    i++;
    clean_borders_img();
    dots[i].checked = true;
    images[i].style.border = "4px solid red";
    images[i].scrollIntoView({
      behavior: "smooth",
    });
  }
}

slider.addEventListener("click", (event) => {
  if (event.target.getAttribute("class") == "arrow prev") {
    clean_dots();
    prev();
  } else if (event.target.getAttribute("class") == "arrow next") {
    clean_dots();
    next();
  }
});

for (dot of dots) {
  dot.addEventListener("focus", (event) => {
    clean_borders_img();
    let num_dot = Number(event.target.getAttribute("id"));
    images[num_dot - 1].style.border = "4px solid red";
    images[num_dot - 1].scrollIntoView({
      behavior: "smooth",
    });
    i = num_dot - 1;
  });

  dot.addEventListener("blur", (event) => {
    images[Number(event.target.getAttribute("id")) - 1].style.border = "none";
  });
}
