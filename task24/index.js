// Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

const BASE_URL =
  "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";

  // В infoArray будем записывать массив данных, полученных с сервера
let infoArray = [];
const tableBody = document.querySelector("#table-body");
const buttons = document.querySelector(".buttons");
const selectField = document.querySelector("#select");
const selectReverse = document.querySelector("#reverse-select");

// Функция для получения шаблона для строки таблицы
const getRowTemplate = (templateSelector, rowSelector) => {
  const row = document
    .querySelector(templateSelector)
    .content.querySelector(rowSelector)
    .cloneNode(true);
  return row;
};

// Функция создания строки, получает на вход объект со значениям соответствующим колонке таблицы, возвращает строку
const createRow = ({ fname, lname, tel, address, city, state, zip }) => {
  const row = getRowTemplate("#template", "#raw");

  row.querySelector("#fname").textContent = fname;
  row.querySelector("#lname").textContent = lname;
  row.querySelector("#tel").textContent = tel;
  row.querySelector("#adress").textContent = address;
  row.querySelector("#city").textContent = city;
  row.querySelector("#state").textContent = state;
  row.querySelector("#zip").textContent = zip;

  return row;
};

// Фуекция получает на вход контейнер, объект с данными, добавляет строку в конец таблицы
const addRow = (
  container,
  { fname, lname, tel, address, city, state, zip }
) => {
  const row = createRow({ fname, lname, tel, address, city, state, zip });
  container.append(row);
};

// Функция для отрисовки 50 строк, принимает на вход массив данных, стартовый индекц и контейнер, очищает контейнер и отрисовывает 50 строк с данными из массива от старового индекса 
const renderFiftyRows = (info, start, container) => {
  const renderInfo = info.slice(start, start + 50);

  container.innerHTML = "";

  renderInfo.forEach((item) => {
    addRow(container, item);
  });
};

// Функция примиает на вход текст и создаёт кнопку для пагинации с заданным текстом
const createButton = (text) => {
  const button = document.createElement("button");
  button.textContent = text;
  return button;
};

// Функция добавления кнопки на страницу, принимает контейнер, информацию и номер кнопки, добавляет кнопку в конец контейнера и навешивает на неё слушатель клика
const addButton = (data, num, container) => {
  const button = createButton(num);
  container.append(button);
  button.addEventListener("click", () => {
    handlerButtonClick(data, (num - 1) * 50);
  });
};

// Функция сортировки массива объектов data по полю field по алфавиту, на всякий случай приводим символы к нижнему регистру
const sortByAlphabet = (data, field) => {
  return data.sort((obj1, obj2) =>
    obj1[field].toLowerCase() > obj2[field].toLowerCase() ? 1 : -1
  );
};

// Функция сортировки массива объектов data по полю field по числам
const sortByNum = (data, field) => {
  return data.sort((obj1, obj2) => +obj1[field] - +obj2[field]);
};

// Функция сортировки массива объектов data по полю field по номеру телефона, заменяем все символы кроме чисел "" и сортируем как обычные числа
const sortByTelephone = (data, field) => {
  return data.sort(
    (obj1, obj2) =>
      obj1[field].replace(/[\D]+/g, "") - +obj2[field].replace(/[\D]+/g, "")
  );
};

// Функция сортировки массива объектов data по полю field по адресу, сначала вытаскиваем индекс спомощью parseInt и сортируем по нему, как по числовым значениям, если индексы совпадают сортируем сравнением строк
const sortByAdress = (data, field) => {
  return data.sort((obj1, obj2) => {
    if (parseInt(obj1[field]) !== parseInt(obj2[field])) {
      return parseInt(obj1[field]) - parseInt(obj2[field]);
    } else {
      return obj1[field].toLowerCase() > obj2[field].toLowerCase() ? 1 : -1;
    }
  });
};

// Обработчик клика по кнопке получает на вход массив данных и стратовый индекс и вызывает функцию отрисовки 50 строк с переданными параметрами
const handlerButtonClick = (data, start) => {
  renderFiftyRows(data, start, tableBody);
};

// Функция добавления пагинации, очищаем контейнер с кнопками, проходимся по массиву data, для каждых 50 элементов списка создаём кнопку с порядковым номером
const addPagination = (data, container) => {
  container.innerHTML = "";
  for (let i = 0; i < data.length / 50; i++) {
    addButton(data, i + 1, container);
  }
};

// Функция сортировки по полю, получает на вход массив объектов, в зависимости от выбранного поля для сортировки вызывает различные способы сортировки
const sortBySelectField = (data) => {
  if (
    selectField.value === "fname" ||
    selectField.value === "lname" ||
    selectField.value === "city" ||
    selectField.value === "state"
  ) {
    sortByAlphabet(data, selectField.value);
  } else if (selectField.value === "zip") {
    sortByNum(data, selectField.value);
  } else if (selectField.value === "tel") {
    sortByTelephone(data, selectField.value);
  } else if (selectField.value === "address") {
    sortByAdress(data, selectField.value);
  }
};

// Обработчик клика по селекта по полю, сортирует массив по заданному полю, добавляет пагинацию, отрисовывает первые 50 элементов массива в виде строк
const handleSelectFieldClick = () => {
  sortBySelectField(infoArray);
  if (selectReverse.value = "descending") {
    infoArray.reverse();
  };
  addPagination(infoArray, buttons);
  renderFiftyRows(infoArray, 0, tableBody);
}

// Обработчик клика по селекту сортировки по убыванию / возврастанию, разворачивает массив объектов infoArray, добавляет пагинацию, отрисовывает первые 50 элементов массива в виде строк
const handleSelectReverseClick = () => {
  infoArray.reverse();
  addPagination(infoArray, buttons);
  renderFiftyRows(infoArray, 0, tableBody);
}

// Функция для получения данных с серверв, асинхронно обрабатывает запрос, сортирует полученнный массив данных по алфавиту по полю fnmae, добавляет пагинацию, отрисовывает первые 50 элементов массива в виде строк
async function getData() {
  try {
    const result = await fetch(BASE_URL);
    const data = await result.json();
    sortByAlphabet(data, "fname");
    addPagination(data, buttons);
    renderFiftyRows(data, 0, tableBody);
    infoArray = data;
  } catch {
    console.log("err");
  }
}

// Запрашиваем данные при загрузке страницы
getData();

// Навешиваем слушатели на селекты
selectField.addEventListener("change", handleSelectFieldClick);
selectReverse.addEventListener("change", handleSelectReverseClick);
