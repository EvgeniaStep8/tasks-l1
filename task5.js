// Разработайте функцию преобразования JSON в связный список. На входе функция должна получать JSON, содержащий список объектов, на выходе объект, представляющий из себя односвязный список

// Односвязный список - это структура данных, состоящая из элементов одного типа, связанных между собой последовательно посредством указателей. Каждый элемент списка имеет указатель на следующий элемент. Последний элемент списка указывает на NULL.

const people = [
  { name: "John", job: "Developer" },
  { name: "Sarah", job: "Designer" },
  { name: "Tom", job: "Manager" },
  { name: "Emily", job: "Engineer" },
  { name: "Mike", job: "Marketer" },
];

const jsonToSinglyList = (arr) => {
  if (!Array.isArray(arr)) {
    return "На входе функция должна получать JSON, содержащий список объектов!";
  }
  const res = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (i !== arr.length - 1) {
      arr[i].next = arr[i + 1];
    } else {
      arr[i].next = null;
    }
  }
  return JSON.stringify(res);
};

console.log(jsonToSinglyList(people));
