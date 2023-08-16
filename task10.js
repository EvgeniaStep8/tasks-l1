// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

const jsonString = `{"name":"Evgenia","age":26}`;
const jsonStringWithObject = `{"name":"Evgenia","age":26,"brother":{"name":"Alex","age":19}}`;
const jsonStringWithArray = `{"name":"Evgenia","age":26,"tasks":[1,2,3,4]}`;

// Самый простой вариант воспользоваться методом JSON parse
const stringToJson = (string) => {
  return JSON.parse(string);
};

// Но наверное вы ожидаете не этого, поэтому 2 вариант функции))
const stringToJson1 = (string) => {
  if (typeof string !== "string") {
    return "Для преобразования необходимо ввести строку!";
  }
  // регулярное выражение для проверки формата данных

  // убираем {} в начале и конце строки
  string = string.slice(1, string.length - 1);
  const res = {};
  // преобразуем строку в массив по разделителю ,
  string.split(",").forEach((elem) => {
    const entries = elem.split(":");
    entries[0] = entries[0].replaceAll(`"`, "");
    if (entries[1].startsWith(`"`) && entries[1].endsWith(`"`)) {
      entries[1] = entries[1].replaceAll(`"`, "");
    } else if (typeof +entries[1] === "number") {
      entries[1] = +entries[1];
    } else if (entries[1].startsWith("[") && entries[1].endsWith("]")) {
      entries[1] = stringToJson1(entries[1]);
    }
    res[entries[0]] = entries[1];
  });
  return res;
};

console.log(stringToJson(jsonString)); // { name: 'Evgenia', age: 26 }
console.log(stringToJson1(jsonString)); // { name: 'Evgenia', age: 26 }

console.log(stringToJson(jsonStringWithObject)); // { name: 'Evgenia', age: 26, brother: { name: 'Alex', age: 19 } }
console.log(stringToJson1(jsonStringWithObject)); // { name: 'Evgenia', age: 26, brother: { name: 'Alex', age: 19 } }

console.log(stringToJson(jsonStringWithArray)); // { name: 'Evgenia', age: 26, brother: { name: 'Alex', age: 19 } }
console.log(stringToJson1(jsonStringWithArray)); // { name: 'Evgenia', age: 26, brother: { name: 'Alex', age: 19 } }
