// Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию для элемента на веб-странице, например, плавное изменение его положения или размера.

const element = document.querySelector(".element");

const addAnimationToDomElement = (element) => {
  let shift = 0;
  setInterval(() => {
    if (shift < 1000) {
      shift += 1;
      element.style["margin-left"] = `${shift}px`;
    }
  }, 16);
};

addAnimationToDomElement(element);
