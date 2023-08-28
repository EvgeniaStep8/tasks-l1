// Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

const BASE_URL =
  "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";

const infoArray = [];
const tableBody = document.querySelector("#table-body");
const buttons = document.querySelector(".buttons");
const select = document.querySelector("#select");

const getRowTemplate = (templateSelector, rowSelector) => {
  const row = document
    .querySelector(templateSelector)
    .content.querySelector(rowSelector)
    .cloneNode(true);
  return row;
};

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

const addRow = (
  container,
  { fname, lname, tel, address, city, state, zip }
) => {
  const row = createRow({ fname, lname, tel, address, city, state, zip });
  container.append(row);
};

const renderFiftyRows = (info, start, container) => {
  const renderInfo = info.slice(start, start + 50);

  container.innerHTML = "";

  renderInfo.forEach((item) => {
    addRow(container, item);
  });
};

const createButton = (text) => {
  const button = document.createElement("button");
  button.textContent = text;
  return button;
};

const addButton = (data, num, container) => {
  const button = createButton(num);
  container.append(button);
  button.addEventListener("click", () => {
    handlerButtonClick(data, (num - 1) * 50);
  });
};

const sortByAlphabet = (data, field) => {
  return data.sort((obj1, obj2) =>
    obj1[field].toLowerCase() > obj2[field].toLowerCase() ? 1 : -1
  );
};

const sortByNum = (data, field) => {
  return data.sort((obj1, obj2) => +obj1[field] - +obj2[field]);
};

const sortByTelephone = (data, field) => {
  return data.sort(
    (obj1, obj2) =>
      obj1[field].replace(/[\D]+/g, "") - +obj2[field].replace(/[\D]+/g, "")
  );
};

const sortByAdress = (data, field) => {
  return data.sort((obj1, obj2) => {
    if (parseInt(obj1[field]) !== parseInt(obj2[field])) {
      return parseInt(obj1[field]) - parseInt(obj2[field]);
    } else {
      obj1[field].toLowerCase() > obj2[field].toLowerCase() ? 1 : -1;
    }
  });
};

const handlerButtonClick = (data, start) => {
  renderFiftyRows(data, start, tableBody);
};

const addPagination = (data) => {
  for (let i = 0; i < data.length / 50; i++) {
    addButton(data, i + 1, buttons);
  }
};

const clearButtons = () => {
  buttons.innerHTML = "";
};

const handleSelectClick = (data) => {
  if (
    select.value === "fname" ||
    select.value === "lname" ||
    select.value === "city" ||
    select.value === "state"
  ) {
    clearButtons();
    sortByAlphabet(data, select.value);
    addPagination(data);
    renderFiftyRows(data, 0, tableBody);
  } else if (select.value === "zip") {
    clearButtons();
    sortByNum(data, select.value);
    addPagination(data);
    renderFiftyRows(data, 0, tableBody);
  } else if (select.value === "tel") {
    clearButtons();
    sortByTelephone(data, select.value);
    addPagination(data);
    renderFiftyRows(data, 0, tableBody);
  } else if (select.value === "address") {
    clearButtons();
    sortByAdress(data, select.value);
    addPagination(data);
    renderFiftyRows(data, 0, tableBody);
  }
};

async function getData() {
  try {
    const result = await fetch(BASE_URL);
    const data = await result.json();
    sortByAlphabet(data, "fname");
    addPagination(data);
    renderFiftyRows(data, 0, tableBody);
    select.addEventListener("input", () => {
      handleSelectClick(data);
    });
  } catch {
    console.log("err");
  }
}

getData();