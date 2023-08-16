// Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице и выполняет определенные действия с этими данными, например, отправляет их на сервер или отображает всплывающее окно с результатами.

const form = document.forms.form;

const handleSubmit = (evt) => {
  evt.preventDefault();
  const formValues = {};
  form.querySelectorAll(".input").forEach((input) => {
    formValues[input.name] = input.value;
  });
};

form.addEventListener("submit", handleSubmit);

// Добавить отправку на сервер
