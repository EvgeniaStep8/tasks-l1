// Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию для элемента на веб-странице, например, плавное изменение его положения или размера.

// Находим паравоз, которому будем добавлять анимацию
const train = document.querySelector(".train");

// Функция добавления элементу анимацию, которая принимает на вход элемент, который нужно проанимировать
const addAnimationToDomElement = (element) => {
  // Задаём начальное смещение 0
  let shift = 0;
  // Через setInterval будем каждые 16мс вызывать функцию, которая будет измещать смещение на 1 и добавлять элементу стиль margin-left равный смещению в px, пока смещение не достигнет 1000
  setInterval(() => {
    if (shift < 1000) {
      shift += 1;
      element.style["margin-left"] = `${shift}px`;
    }
  }, 16);
};

// Навесим слушатель на элемент паравоза, который будет срабатывать при клике на паровоз и вызывать функцию для анимации элемента
train.addEventListener("click", () => {
  addAnimationToDomElement(train);
})
