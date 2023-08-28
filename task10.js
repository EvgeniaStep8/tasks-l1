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

  if (/^"[^"]*"$/.test(string)) {
    return string.replaceAll(`"`, "");
  } else if (!Number.isNaN(+string)) {
    return +string;
  } else if (string === "null") {
    return null;
  } else if (string.startsWith("[") && string.endsWith("]")) {
    string = string.slice(1, -1);
    const res = [];
    const arr = string.split(",");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].startsWith(`{`) || arr[i].startsWith(`[`)) {
        let start = i;
        while (!(arr[i].endsWith("}") || arr[i].endsWith("]"))) {
          i++;
        }
        let newArr = arr.slice(start, i + 1);
        res.push(stringToJson1(newArr.join(",")));
      } else {
        res.push(stringToJson1(arr[i]));
      }
    }
    return res;
  } else if (string.startsWith("{") && string.endsWith("}")) {
    const res = {};
    const arr = string.slice(1, -1);
    return res;
  } else {
    return "Проверьте формат исходных данных";
  }
};

console.log(stringToJson(jsonString));
console.log(stringToJson1(jsonString));
