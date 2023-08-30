// Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице и выполняет определенные действия с этими данными, например, отправляет их на сервер или отображает всплывающее окно с результатами.

// При отправке формы будет открываться модальное окно с отправленными данным, находим на страницу нужную нам форму, модалку и кнопку для закрытия модалки
const form = document.forms.form;
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".close");

// Обработчик события submit формы
const handleSubmit = (evt) => {
  // Отменяем дефолтное поведение при сабмите, чтобы страница не обновлялась
  evt.preventDefault();
  // находим все элементы инпутов в форме, для каждого инпута по его имени ищем в документе элемент для его хранения по id, c помощью textContent записываем туда значение value инпута
  form.querySelectorAll(".input").forEach((input) => {
    document.querySelector(`#${input.name}`).textContent = input.value;
  });
  // открываем модалку, в ней уже будет информация из формы
  popup.classList.add("open-popup");
};

// Навешиваем слушатель на сабмит формы, при срабатывание события будет вызываться функция handleSubmit
form.addEventListener("submit", handleSubmit);

// На кнопку закрытия попапа навешиваем слушатель на клик, при срабатывании которого удаляем класс open-popup
closeButton.addEventListener("click", () => {
  popup.classList.remove("open-popup");
});


