// Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

// Функция createElementAndAddStyles принимает на вход селектор контейнера, куда будет добавляться элемент
const createElementAndAddStyles = (containerSelector) => {
  // Ищем на странице контейнер по переданному селектору
  const container = document.querySelector(containerSelector);

  // Через createElement создаём элемент div
  const div = document.createElement("div");

  // Через style добавляем элементу ширину, высоту и цвета
  div.style.width = "200px";
  div.style.height = "200px";
  div.style.background = "red";

  // С помощью метода append добавляем элемент в конце контейнера
  container.append(div);
};

createElementAndAddStyles(".container");
