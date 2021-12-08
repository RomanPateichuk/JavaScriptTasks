ymaps.ready(init);

function init() {
  ymaps.geolocation
    .get({
      provider: "auto",
      autoReverseGeocode: true,
    })
    .then((result) => {
      let city = result.geoObjects.get(0).properties.get("metaDataProperty")
        .GeocoderMetaData.Address.Components[3].name;
      getWeather(city);
    })
    .catch(function () {
      console.log("geolocation error");
    });
}

input_city.addEventListener("change", () => {
  search_city.addEventListener("click", () => {
    city = input_city.value;
    getWeather(city);
  });
});

input_city.addEventListener("click", () => {
  if (input_city.value) {
    input_city.value = "";
  }
});

function getWeather(city) {
  let apiKey = "c7d7a0df641e35ef245f92a68ac64178";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

  axios
    .get(url)
    .then((res) => {
      document.querySelector(".city").innerHTML = res.data.name;
      document.querySelector(".temp_c").innerHTML = res.data.main.temp;
      document.querySelector(".temp_f").innerHTML = (
        (Number(res.data.main.temp) * 9) / 5 +
        32
      ).toFixed(2);
      document.querySelector(".humidity").innerHTML = res.data.main.humidity;
      document.querySelector(".wind").innerHTML = res.data.wind.speed;
      document.querySelector(
        "#icon"
      ).innerHTML = `<img class="img-fluid" src="https://openweathermap.org/img/wn/${res.data.weather[0]["icon"]}@2x.png"/>`;
    })
    .catch(function () {
      console.log("weather api error");
    });
}

btn_c.addEventListener("click", () => {
  btn_f.style.border = "none";
  btn_c.style.border = "2px solid red";
  block_f.style.display = "none";
  block_c.style.display = "block";
});
btn_f.addEventListener("click", () => {
  btn_f.style.border = "2px solid red";
  btn_c.style.border = "none";
  block_f.style.display = "block";
  block_c.style.display = "none";
});
