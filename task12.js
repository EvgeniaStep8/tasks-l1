// Задача на работу с объектами: создайте объект, представляющий собой книгу. Объект должен иметь свойства, такие как: название книги, автор и год издания. Напишите методы для получения и изменения значений свойств книги.

const Book = {
  name: "Элегантность ёжика",
  author: "Мюриель Барбери",
  year: 2006,
  getName: function () {
    return this.name;
  },
  setName: function (name) {
    this.name = name;
  },
  getAuthor: function () {
    return this.author;
  },
  setAuthor: function (author) {
    this.author = author;
  },
  getYear: function () {
    return this.year;
  },
  setYear: function (year) {
    this.year = year;
  },
};

console.log(Book.getName()); // Элегантность ёжика
Book.setName("Незнайка на луне");
console.log(Book.getName()); // Незнайка на луне

console.log(Book.getAuthor()); // Мюриель Барбери
Book.setAuthor("Николай Носов");
console.log(Book.getAuthor()); // Николай Носов

console.log(Book.getYear()); // 2006
Book.setYear(1965);
console.log(Book.getYear()); // 1965
