// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, который разрешается с данными об изображении, когда оно загружено. Когда говорится "промис разрешается с данными об изображении", это означает, что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.

function loadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");

    image.src = imageUrl;

    image.onload = resolve(image);
    image.onerror = reject(new Error("Упс, что-то пошло не так..."));
  });
}

loadImage(
  "https://bipbap.ru/wp-content/uploads/2017/08/04.-risunki-dlya-srisovki-legkie-dlya-devochek.jpg"
)
  .then((image) => document.body.append(image))
  .catch((err) => console.error(err.message));
