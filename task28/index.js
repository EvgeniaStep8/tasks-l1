// Создать и добавить элемент с использованием шаблонов: Напишите функцию, которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.

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

const createCardAndAddInDom = (
  { name, duration, description, image },
  cardTemplateSelector,
  containerSelector
) => {
  const cardTemplate = document.querySelector(cardTemplateSelector).content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const container = document.querySelector(containerSelector);
  const cardTitle = card.querySelector(".card-title");
  const cardImage = card.querySelector(".image");
  const cardDescription = card.querySelector(".description");
  const cardDuration = card.querySelector(".duration");

  cardTitle.textContent = name;
  cardImage.src = image;
  cardImage.alt = name;
  cardDescription.textContent = description;
  cardDuration.textContent = duration + " мин";

  container.append(card);
};

movies.forEach((movie) => {
  createCardAndAddInDom(movie, "#card-template", ".container");
});
