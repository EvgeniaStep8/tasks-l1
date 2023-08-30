// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение. Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
const KEY = "e3ff582f50c0e45b54bcb545150a8c15d523de71";

const query = {
  lat: 55,
  lon: 56,
  count: 10,
  radius_meters: 100,
};

const options = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Token " + KEY,
  },
  body: JSON.stringify(query),
};

fetch(url, options)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
