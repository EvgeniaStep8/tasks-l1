// Реализовать функцию конвертации JSON в строку

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

// Но наверное вы ожидаете не этого, поэтому 2 вариант функции))
const jsonToString1 = (json) => {
  // Проверяем является ли переданное значение объектом
  if (typeof json !== "object" || json === null) {
    return "На вход необходимо передать объект, проверьте правильность входных данных!";
  }
  // Преобразуем объект в массив из масиивов ключ - значение
  const res = Object.entries(json)
    // Проходимся по массиву и каждому подмассиву методом map, и если его элемент строка добавляем кавычки
    .map((entries) =>
      entries.map((elem) => {
        if (typeof elem === "string") {
          return `"` + elem + `"`;
        } else if (Array.isArray(elem)) {
          return "[" + elem.join(",") + "]";
        } else if (typeof elem === "object" && elem !== null) {
          return jsonToString1(elem);
        } else if (elem === null) {
          return "null";
        }
        return elem;
      })
    )
    // Объединяем массивы ключ значение в строку через разделитель : методом join
    .map((entries) => entries.join(":"))
    // Объединяем массив в строку через разделитель , методом join
    .join(",");
  // Возвращаем получившуюся строку обёрнутую в {}
  return "{" + res + "}";
};

console.log(jsonToString(obj)); // {"name":"Evgenia","age":26}
console.log(jsonToString1(obj)); // {"name":"Evgenia","age":26}

console.log(jsonToString(objWithObj)); // {"name":"Evgenia","age":26,"brother":{"name":"Alex","age":19}}
console.log(jsonToString1(objWithObj)); // {"name":"Evgenia","age":26,"brother":{"name":"Alex","age":19}}

console.log(jsonToString(objWithArray)); // {"name":"Evgenia","age":26,"tasks":[1,2,3,4]}
console.log(jsonToString1(objWithArray)); // {"name":"Evgenia","age":26,"tasks":[1,2,3,4]}

console.log(jsonToString(objWithArrayOfObjects)); // {"name":"Evgenia","age":26,"tasks":[{"id":1,"name":"Помыть посуду"},{"id":2,"name":"Пропылесосить"}]}
console.log(jsonToString1(objWithArrayOfObjects)); // {"name":"Evgenia","age":26,"tasks":[{"id":1,"name":"Помыть посуду"},{"id":2,"name":"Пропылесосить"}]}
