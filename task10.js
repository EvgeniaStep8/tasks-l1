// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

const jsonString = `{"name":"Evgenia","age":26}`;
const jsonStringWithObject = `{"name":"Evgenia","age":26,"brother":{"name":"Alex","age":19}}`;
const jsonStringWithArray = `{"name":"Evgenia","age":26,"tasks":[1,2,3,4]}`;
const jsonStringWithArrayOfObjects = `{"name":"Evgenia","age":26,"tasks":[{"id":1,"name":"Помыть посуду"},{"id":2,"name":"Пропылесосить"}]}`;

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
        while (!((arr[start].startsWith("{") && arr[i].endsWith("}")) || (arr[start].startsWith("[") && arr[i].endsWith("]")))) {
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
    string = string.slice(1, -1);
    for (let i = 0; i < string.length; i++) {
      if (string[i] === `"`) {
        let start = i;
        i++
        while (string[i] !== `"`) {
          i++;
          if (i === string.length - 1) {
            return "Нерверный формат исходных данных"
          }
        }
        i++;
        if (string[i] === ":") {
          let key = stringToJson1(string.slice(start, i));
          i++;
          if (string[i] === `{` || string[i] === "[") {
            start = i;
            while (!((string[start] === "{" && string[i] === "}") || (string[start] === "[" && string[i] === "]"))) {
              i++;
              if (i === string.length -1) {
                break;
              }
            }
          } else {
            start = i;
            while (string[i] !== ",") {
              i++;
              if (i === string.length -1) {
                break;
              }
            }
          }
          if (i === string.length - 1) {
            res[key] = stringToJson1(string.slice(start, i + 1));
          } else {
            res[key] = stringToJson1(string.slice(start, i));
          }
        } else {
          return "Нерверный формат исходных данных"
        }
    } else {
        return "Нерверный формат исходных данных"
      }
    }
    return res;
  } else {
    return "Нерверный формат исходных данных";
  }
};

console.log(stringToJson(jsonString));
console.log(stringToJson1(jsonString));

console.log(stringToJson(jsonStringWithArray));
console.log(stringToJson1(jsonStringWithArray));

console.log(stringToJson(jsonStringWithObject));
console.log(stringToJson1(jsonStringWithObject));

console.log(stringToJson(jsonStringWithArrayOfObjects));
console.log(stringToJson1(jsonStringWithArrayOfObjects));