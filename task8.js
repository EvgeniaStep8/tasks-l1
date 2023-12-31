// Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.

// Функции и массив из этих функций для тестирования задачи
const func1 = () => {
  return 1;
};

const func2 = () => {
  return 2;
};

const func3 = () => {
  return 3;
};

const arrayOfFunction = [func1, func2, func3];

// outer внешняя функция, которая имеет константу массив res и возвращает функцию, у которой будет доступ к переменной res за счёт замыкания
const outer = (arr) => {
  const res = [];
  return () => {
    // Проходимся по каждому элементу массива arr и вызываем каждую функцию в массиве и записываеам результат выполнения в массив res
    arr.forEach((func) => {
      res.push(func());
    });
    // Возвращаем res
    return res;
  };
};

// Записываем в переменную inner функцию, которую возвращаеь функция outer
const inner = outer(arrayOfFunction);

console.log(inner()); // [1, 2, 3]
