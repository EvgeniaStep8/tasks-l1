// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

let step = "";

for (let i = 0; i < 10; i++) {
  step += "a";
}

console.log(step.length);

let testData = "";

function getLocalStorageSize() {
  localStorage.clear();

  try {
    while (true) {
      localStorage.setItem("test", testData);
      testData += step;
    }
  } catch (err) {
    console.log(err);
    console.log(testData.length);
  }
}

getLocalStorageSize();

// 5242880 байт = 5,2 Мбайт
