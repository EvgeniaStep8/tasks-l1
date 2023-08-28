// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.
try {
  localStorage.setItem("test", "1");
  localStorage.removeItem("test");

  let maxSize = calculateMaxSize(localStorage);
  console.log("Максимальный объем данных в localStorage: " + maxSize + " байт");
} catch (error) {
  console.log("LocalStorage не поддерживается в этом браузере");
}

function calculateMaxSize(storage) {
  let testKey = "test",
    totalData = "",
    i = 0;

  // Увеличиваем размер данных в localStorage до максимума
  while (true) {
    try {
      localStorage.setItem(testKey, totalData);
      totalData += "a";
      i++;
    } catch (error) {
      // Достигнут максимальный размер данных
      localStorage.removeItem(testKey);
      break;
    }
  }

  return i;
}
