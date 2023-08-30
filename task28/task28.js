// Создать и добавить элемент с использованием шаблонов: Напишите функцию, которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.

// Для демонстрации работы функции приведены моковые данные для фильмов, которые мы будем вставлять в шаблон
const movies = [
  {
    name: "Застрявший в лифте",
    duration: 10,
    description:
      "Главный герой оказывается запертым в лифте вместе со странным незнакомцем. Постепенно разговор между ними раскрывает неожиданное прошлое и связь между ними, которая меняет их взгляды на жизнь.",
    image: "https://raschetgkh.ru/images/i/lift.jpg?v1",
    id: 1,
  },
  {
    name: "Дождь",
    duration: 15,
    description:
      "Главный герой оказывается запертым в лифте вместе со странным незнакомцем. Постепенно разговор между ними раскрывает неожиданное прошлое и связь между ними, которая меняет их взгляды на жизнь.",
    image:
      "https://cdn.iz.ru/sites/default/files/article-2019-09/IMG_3701%20%281%29.jpg",
    id: 2,
  },
  {
    name: "Бумажный самолетик",
    duration: 8,
    description:
      "Главный герой оказывается запертым в лифте вместе со странным незнакомцем. Постепенно разговор между ними раскрывает неожиданное прошлое и связь между ними, которая меняет их взгляды на жизнь.",
    image:
      "https://s3.wi-fi.ru/cp3o/CpWW8Lhvdzav71Wepxx4rJ8C?response-content-type=image%2Fjpeg",
    id: 3,
  },
];

// Функция createCardAndAddInDom принимает объект с информацией о фильме (деструктуризацей получает пля name, duration, description, image из этого объекта), селектор шаблона template и селектор контейнера, куда будет добавлен фильм
const createCardAndAddInDom = (
  { name, duration, description, image },
  cardTemplateSelector,
  containerSelector
) => {
  // Находим в документе элемент template по селектору, получаем его содержимое через свойство content
  const cardTemplate = document.querySelector(cardTemplateSelector).content;
  // Находим в template карточку и копируем её с помощью cloneNode, заптсываем скопированный элемент в переменную card
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  // Находим по селектору контейнер, куда будем добавлять карточку
  const container = document.querySelector(containerSelector);

  // Находим элементы  в карточке, куда будем вставлять информацию о фильме
  const cardTitle = card.querySelector(".card-title");
  const cardImage = card.querySelector(".image");
  const cardDescription = card.querySelector(".description");
  const cardDuration = card.querySelector(".duration");

  // Записываем информацию о фильме в элементы карточки
  cardTitle.textContent = name;
  cardImage.src = image;
  cardImage.alt = name;
  cardDescription.textContent = description;
  cardDuration.textContent = duration + " мин";

  // Добавляем карточку в конец контейнера методом append
  container.append(card);
};

movies.forEach((movie) => {
  createCardAndAddInDom(movie, "#card-template", ".container");
});
