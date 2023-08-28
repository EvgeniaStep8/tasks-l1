// Задача о коллекции функций: у вас есть массив функций, напишите код, который вызовет каждую функцию в этом массиве и выведет их порядковый номер. Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку.

const func1 = () => {
  console.log("Я функция 1");
};

const func2 = () => {
  console.log("Я функция 2");
};
const func3 = () => {
  console.log("Я функция 3");
};

const arr = [func1, func2, func3];

const doArrayOfFunction = (arr) => {
  arr.forEach((func, i) => {
    console.log(i + 1);
    func();
  });
};

doArrayOfFunction(arr);