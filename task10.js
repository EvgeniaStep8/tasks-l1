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
  // Если тип переданного параметра не строка, возвращаем предупреждение
  if (typeof string !== "string") {
    return "Для преобразования необходимо ввести строку!";
  }
  
  // Далее проверяем какой тип данных лежит в строке
  // Если начинается и заканчивается кавычками " и не  содержит кавычек, значит json это строка, возвращаем строку без кавычек
  if (/^"[^"]*"$/.test(string)) {
    return string.replaceAll(`"`, "");
  // проверка на число, если преобразованная в число строка не является NaN, то она число, преобразуем через унарный плюс строку в число и возвращаем его
  } else if (!Number.isNaN(+string)) {
    return +string;
  // если строка равна "null", возвращаем null
  } else if (string === "null") {
    return null;
  // Если строка начинается и заканчивается квадратной скобкой, это может быть массив
  } else if (string.startsWith("[") && string.endsWith("]")) {
    // убираем квадратные скобки в начале и конце строки
    string = string.slice(1, -1);
    // записываем в константу res пустой массив, сюда будем добавлять элементы массива
    const res = [];
    // Преобразуем строку в массив по разделителю , методом split
    const arr = string.split(",");
    // Проходимся по каждому элементу массива, может быть такое, что внутри массива будет массив или объект, делаем для этого дополнительную проверку
    for (let i = 0; i < arr.length; i++) {
      // если элемент массива начинается к квадратной или фигурной скобки, записываеем индекс элемента в переменную старт, проходимся дальше по массиву, пока не найдём закрывающую строку, если массив закончится, возвращем предупреждение
      if (arr[i].startsWith(`{`) || arr[i].startsWith(`[`)) {
        let start = i;
        while (!((arr[start].startsWith("{") && arr[i].endsWith("}")) || (arr[start].startsWith("[") && arr[i].endsWith("]")))) {
          i++;
          if (i === string.length) {
            return "Нерверный формат исходных данных"
          }
        }
        // берём часть масиива от начала до конца скобок, преобразуем в строку методом join через разделитель ",", рекурсивно вызываем функцию stringToJson1 для этой строки, результат этой функции записваем в массив res
        res.push(stringToJson1(arr.slice(start, i + 1).join(",")));
      } else {
        // в случае если в начале нет фигурных скобок, рекурсивно вызываем функцию stringToJson1 для элемента массива, результат также добавляем в конец res
        res.push(stringToJson1(arr[i]));
      }
    }
    // возвращаем получившийся массив
    return res;
  } else if (string.startsWith("{") && string.endsWith("}")) {
    // если строка начинается и заканчивается фигурными скобками, это может быть объект
    // объявляем переменную res, куда будем записывать наш объект
    const res = {};
    // убираем фигурные скобки в начале и конце строки
    string = string.slice(1, -1);
    // проходимся циклом for по строке
    for (let i = 0; i < string.length; i++) {
      // Сначала будем искать ключ, он обязаетльно должен начинаться с ", если нет возвращаем предупреждение
      if (string[i] === `"`) {
        // записываем в переменную start индукс первой кавычки
        let start = i;
        // после чего проходимся дальше по символам в строке, пока не найдём вторую кавычку или не дойдём до конца строки
        i++
        while (string[i] !== `"`) {
          i++;
          // если дошли до конца строки возвращаем предупреждение
          if (i === string.length - 1) {
            return "Нерверный формат исходных данных"
          }
        }
        // если нашли закрывающую кавычку переходим на следующий элемент, он должен быть :, если нет возвращаем предупреждение
        i++;
        if (string[i] === ":") {
          // рекурсивно вызываем функцию stringToJson1 для строки от переменной start до :, не включая :, записываем в переменную key результат возвращённыйи функцией
          let key = stringToJson1(string.slice(start, i));
          // идём дальше по строке, проверяем является ли значение по ключу объектом или массивом
          i++;
          // если значение начинается с { или [ записываем индекс в переменную staert, проходимся по строке дальше, пока не найдём закрывающуюся скобку, если строка заканчивается возращаем предупреждение
          start = i;
          if (string[i] === `{` || string[i] === "[") {
            while (!((string[start] === "{" && string[i] === "}") || (string[start] === "[" && string[i] === "]"))) {
              i++;
              if (i === string.length) {
                return "Нерверный формат исходных данных"
              }
            }
          } else {
            // в обратном случае ищем конец строки или запятую
            while (string[i] !== ",") {
              i++;
              if (i === string.length - 1) {
                break;
              }
            }
          }
          // если i соответсвует концу строки, обрезаем строку от индекса start до конца строки, в обратном случае до i, для результата рекурсивно вызываем функцию stringToJson1 и добавлем результат вызова функции в объект res по ключу key
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

console.log(stringToJson(jsonString)); //{ name: 'Evgenia', age: 26 }
console.log(stringToJson1(jsonString));  //{ name: 'Evgenia', age: 26 }

console.log(stringToJson(jsonStringWithArray)); // { name: 'Evgenia', age: 26, tasks: [ 1, 2, 3, 4 ] }
console.log(stringToJson1(jsonStringWithArray)); // { name: 'Evgenia', age: 26, tasks: [ 1, 2, 3, 4 ] }

console.log(stringToJson(jsonStringWithObject)); // { name: 'Evgenia', age: 26, brother: { name: 'Alex', age: 19 } }
console.log(stringToJson1(jsonStringWithObject)); // { name: 'Evgenia', age: 26, brother: { name: 'Alex', age: 19 } }

console.log(stringToJson(jsonStringWithArrayOfObjects)); // { name: 'Evgenia', age: 26,tasks: [ { id: 1, name: 'Помыть посуду' }, { id: 2, name: 'Пропылесосить' } }
console.log(stringToJson1(jsonStringWithArrayOfObjects)); // { name: 'Evgenia', age: 26,tasks: [ { id: 1, name: 'Помыть посуду' }, { id: 2, name: 'Пропылесосить' } }