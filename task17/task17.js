// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение. Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
const key = "e3ff582f50c0e45b54bcb545150a8c15d523de71";

const form = document.forms.geocoding;
const latInput = document.querySelector("#lat");
const lonInput = document.querySelector("#lon");
const selectList = document.querySelector(".select");

const addOption = (address) => {
  const template = document.querySelector("#template").content;
  const option = template.querySelector(".option").cloneNode(true);

  option.querySelector(".option-text").textContent = address;
  
  selectList.append(option);
}

const renderSelectList = (result) => {
  selectList.innerHTML = "";
  const addresses = result.suggestions;
  addresses.forEach((address) => {
    addOption(address.value);
  })
}

const getAddress = (lat, lon) => {
  const query = {
    lat: lat,
    lon: lon,
    count: 10,
    radius_meters: 500,
  };

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + key,
    },
    body: JSON.stringify(query),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => renderSelectList(result))
    .catch((error) => console.log("error", error));
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  getAddress(+latInput.value, +lonInput.value);
}

form.addEventListener("submit", handleFormSubmit);
