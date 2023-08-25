// Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.

async function getKanyeQuotes() {
  try {
    const response = await fetch(`https://api.kanye.rest`);
    const data = await response.json();
    const quote = await data.quote;
    return quote;
  } catch (err) {
    console.error("Ошибка", err);
  }
}
