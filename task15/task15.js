// Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.

const quoteText = document.querySelector(".qoute");
const button = document.querySelector(".button");

async function getKanyeQuotes() {
  try {
    // в response ждём ответ от сервера
    const response = await fetch(`https://api.kanye.rest`);
    // в data записываем responce преобразованный в объект
    const data = await response.json();
    // в quote записываем свойство по ключу quote
    const quote = await data.quote;
    // присваиваем элементу quoteText текст цитаты quote
    quoteText.textContent = quote;
    return quote;
  } catch (err) {
    console.error("Ошибка", err);
  }
}

// демонстрация функции
getKanyeQuotes();

// Нажимая на кнопку ещё можно получить другие цитаты
button.addEventListener("click", getKanyeQuotes);