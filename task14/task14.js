// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, который разрешается с данными об изображении, когда оно загружено. Когда говорится "промис разрешается с данными об изображении", это означает, что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.

function loadImage(imageUrl) {
  // возвращаем промис, который если изображение загрузится, разрешится с функцией resolve с аргументом image, а если изображение не загрузится (image.onerror), вызовет функцию reject с аргументом в виде ошибке
  return new Promise((resolve, reject) => {
    // создаём элемент image, в котором будем отображаь картинку
    const image = document.createElement("img");
    
    // присваиваем src изображению url переданную в функцию
    image.src = imageUrl;
    image.alt = "Медведь";

    image.onload = resolve(image);
    image.onerror = reject("Упс, что-то пошло не так...");
  });
}

// вызывем функцию, если промис возвращет изображение, добавляем его на страницу методом append, если нет выводим в консоль ошибку
loadImage(
  "https://bipbap.ru/wp-content/uploads/2017/08/04.-risunki-dlya-srisovki-legkie-dlya-devochek.jpg"
)
  .then((image) => document.body.append(image))
  .catch((err) => console.error(err));
