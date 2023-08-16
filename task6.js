// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. Напишите код, который сортирует этот массив по возрастанию возраста, а при равных возрастах сортирует по алфавиту по полю name.

//  Функция sortObjectArrayByField принимает на вход массив объектов (arr), основное поле объуетов для сортировки (field1) и дополнительное поле для сортировки (field2) при равенстве по основному полю.

const sortObjectArrayByField = (arr, field1, field2) => {
  // Проверяем является ли arr массивом
  if (!Array.isArray(arr)) {
    return "Необходимо ввести массив объектов!";
  }
  if (arr.length === 0) {
    return "Невозможно отсортировать пустой массив!";
  }
  // Проходимся по массиву, проверяем являются ли его элементы объектами
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "object") {
      return "Элементы массива не являются объектами, проверьте правильность ввода!";
    } else {
      // Проверяем существуют ли у объекта заданные поля
      if (!arr[i][field1] || !arr[i][field2]) {
        return "У объектов массива нет заданных полей, проверьте правильность ввода!";
      }
    }
  }
  // Используем метод для сортировки sort
  return arr.sort((obj1, obj2) => {
    // Проверяем равенство значений объектов по основному полю, если они не равны, сравниваем по первому полю, если равны, по второму
    if (obj1[field1] !== obj2[field1]) {
      return obj1[field1] > obj2[field1] ? 1 : -1;
    } else {
      return obj1[field2] > obj2[field2] ? 1 : -1;
    }
  });
};

const objArray = [
  {
    name: "John",
    age: 25,
  },
  {
    name: "Ann",
    age: 28,
  },
  {
    name: "Rick",
    age: 17,
  },
  {
    name: "Tom",
    age: 25,
  },
  {
    name: "Rose",
    age: 21,
  },
];

const objArray2 = [
  {
    name: "John",
    age: 25,
  },
  {
    nam: "Ann",
    age: 28,
  },
  {
    name: "Rick",
    age: 17,
  },
  {
    name: "Tom",
    age: 25,
  },
  {
    name: "Rose",
    ag: 21,
  },
];

console.log(sortObjectArrayByField(objArray, "age", "name")); //[{ name: 'Rick', age: 17 }, { name: 'Rose', age: 21 }, { name: 'John', age: 25 }, { name: 'Tom', age: 25 }, { name: 'Ann', age: 28 } ]
console.log(sortObjectArrayByField([], "age", "name")); // Невозможно отсортировать пустой массив!
console.log(sortObjectArrayByField({ name: "John", age: 23 }, "age", "name")); // Необходимо ввести массив объектов!
console.log(sortObjectArrayByField([2, 6, 7])); // Элементы массива не являются объектами, проверьте правильность ввода!
console.log(sortObjectArrayByField(objArray2, "age", "name")); //У объектов массива нет заданных полей, проверьте правильность ввода!
