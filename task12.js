// Задача на работу с объектами: создайте объект, представляющий собой книгу. Объект должен иметь свойства, такие как: название книги, автор и год издания. Напишите методы для получения и изменения значений свойств книги.

const Book = {
  // название книги
  name: "Элегантность ёжика",
  //автор книги
  author: "Мюриель Барбери",
  // год издания книги
  year: 2006,

  // метод для получения названия книги
  getName: function () {
    return this.name;
  },

  // метод для изменения названия книги
  setName: function (name) {
    this.name = name;
  },

  // метод для получения автора книги
  getAuthor: function () {
    return this.author;
  },

  // метод для изменения автора книги
  setAuthor: function (author) {
    this.author = author;
  },

  // метод для получения года издания книги
  getYear: function () {
    return this.year;
  },

  // метод для измениния года издания книги
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
