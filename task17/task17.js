// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение. Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

// Для обратного геокодинга пользовалась апи сервиса ДаДата
const url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
const key = "e3ff582f50c0e45b54bcb545150a8c15d523de71";

const form = document.forms.geocoding;
const latInput = document.querySelector("#lat");
const lonInput = document.querySelector("#lon");
const selectList = document.querySelector(".select");

// Функция добавляет новое поле выбора с адресом в конец выпадающего списка
const addOption = (address) => {
  const template = document.querySelector("#template").content;
  const option = template.querySelector(".option").cloneNode(true);

  option.querySelector(".option-text").textContent = address;
  
  selectList.append(option);
}

// Функция отрисовки выпадающего списка, очищает выпадающий список и отрисовывает 10 адресов полученных с сервера в выпадающем списке
const renderSelectList = (result) => {
  selectList.innerHTML = "";
  const addresses = result.suggestions;
  if (addresses.length === 0) {
    alert("К сожалению, наш сервис ещё не умеет находит адреса на таких широтах :((");
  }
  addresses.forEach((address) => {
    addOption(address.value);
  })
}

// Функция получения адреса по широте и долготе, запрашивает данные с сервера и вызывает функцию отрисовки выпадающего списка
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

// Функция дебоунсинга и защиты от троттлинга, функция запроса адреса будет вызывать не чаще чем раз за 3000 мс с задрежкой в 500мс
const debouncingAndTrottlingProtect = () => {
  const delayTrottling = 3000;
  const delayDebounce = 500;
  let lastCallTime = 0;
  let timer;
  return () => {
    const now = Date.now();
    if (now - lastCallTime > delayTrottling) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        getAddress(+latInput.value, +lonInput.value);
      }, delayDebounce);
      lastCallTime = now;
    }
  }
}

const get = debouncingAndTrottlingProtect();

// Обработчик сабмита формы, отменяет стандартное поведение формы (обновление страницы) и вызывает функцию getAddress с данными из инпутов формы
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  get();
}

form.addEventListener("submit", handleFormSubmit);
