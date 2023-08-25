// Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.

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

const outer = (arr) => {
  const res = [];
  return () => {
    arr.forEach((func) => {
      res.push(func());
    });
    return res;
  };
};

const inner = outer(arrayOfFunction);

console.log(inner());
