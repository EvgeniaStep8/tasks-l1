// Реализовать функцию конвертации JSON в строку

// Объекты для тестирования функции
const obj = {
  name: "Evgenia",
  age: 26,
};

const objWithObj = {
  name: "Evgenia",
  age: 26,
  brother: {
    name: "Alex",
    age: 19,
  },
};

const objWithArray = {
  name: "Evgenia",
  age: 26,
  tasks: ["Помыть посуду", "Пропылесосить"],
};

const objWithArrayOfObjects = {
  name: "Evgenia",
  age: 26,
  tasks: [
    {
      id: 1,
      name: "Помыть посуду",
    },
    {
      id: 2,
      name: "Пропылесосить",
    },
  ],
};

// Самый простой вариант воспользоваться методом JSON stringify
const jsonToString = (json) => {
  return JSON.stringify(json);
};

// Но наверное вы ожидаете не этого, поэтому 2 вариант функции)) Первый вариант используем как референс для сравнения
const jsonToString1 = (json) => {
  // Если тип json строка, его нужно обернуть двойными кавычками
  if (typeof json === "string") {
    return `"` + json + `"`;
  } else if (json === null) {
    // Если тип json null, возвращаем строку null
    return "null";
  } else if (Array.isArray(json)) {
    // Если тип json массив, проходимя по массиву методом map и для каждого элемента рекурсивно вызываем функцию jsonToString1, чтобы верно преобразовать элементы массива. Получивщийся массив преобразуем к строке через рахделитель ",", добавляем квадратные скобки в начале и конце строки
    return "[" + json.map((item) => jsonToString1(item)).join(",") + "]";
  } else if (typeof json === "object") {
    // Если тип json объект, так как тип null тоже object, исключаем его предыдущим else if, преобразуем объект в  в массив из кортежей ключ - значение, проходимся по массиву методом map + для каждого его элемента-массива также вызываем метод map и для его элементов рекурсивно вызываем функцию jsonToString1. Получивщиеся внутренние массивы  преобразуем к строке через рахделитель  ":", а внещний массив через ",", добавляем круглые  скобки в начале и конце строки
    return (
      "{" +
      Object.entries(json)
        .map((entries) => entries.map((elem) => jsonToString1(elem)).join(":"))
        .join(",") +
      "}"
    );
  }
  // В остальных случаях ыозвращаем json (например, когда json число)
  return json;
};

console.log(jsonToString(obj)); // {"name":"Evgenia","age":26}
console.log(jsonToString1(obj)); // {"name":"Evgenia","age":26}

console.log(jsonToString(objWithObj)); // {"name":"Evgenia","age":26,"brother":{"name":"Alex","age":19}}
console.log(jsonToString1(objWithObj)); // {"name":"Evgenia","age":26,"brother":{"name":"Alex","age":19}}

console.log(jsonToString(objWithArray)); // {"name":"Evgenia","age":26,"tasks":["Помыть посуду","Пропылесосить"]}
console.log(jsonToString1(objWithArray)); // {"name":"Evgenia","age":26,"tasks":["Помыть посуду","Пропылесосить"]}

console.log(jsonToString(objWithArrayOfObjects)); // {"name":"Evgenia","age":26,"tasks":[{"id":1,"name":"Помыть посуду"},{"id":2,"name":"Пропылесосить"}]}
console.log(jsonToString1(objWithArrayOfObjects)); // {"name":"Evgenia","age":26,"tasks":[{"id":1,"name":"Помыть посуду"},{"id":2,"name":"Пропылесосить"}]}
