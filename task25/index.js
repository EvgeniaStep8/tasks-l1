// Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

const createElementAndAddStyles = (containerSelector) => {
  const container = document.querySelector(containerSelector);
  const div = document.createElement("div");

  div.style.width = "200px";
  div.style.height = "200px";
  div.style.background = "red";

  container.append(div);
};

createElementAndAddStyles(".container");
