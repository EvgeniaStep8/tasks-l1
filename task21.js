// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).

let i = 0;

const reverseFunction = () => {
  i++;
  reverseFunction();
};

const reverseFunctionWithNumber = () => {
  i++;
  let a = 1;
  reverseFunctionWithNumber();
};

try {
  reverseFunctionWithNumber();
} catch {
  console.log(i);
}

// number = 8 байт

// Chrome
// reverseFunction - 13950 раз
// reverseFunctionWithNumber - 12555 раз

// 13950x = 12555(x + 8)
// 1395x = 100440
// x = 72 байт => 1003752 байт ~ 1 МБайт

// Проверка
// 2 number 1003752 = n(72 + 16)
// 11406

// Firefox
// reverseFunction - раз
// reverseFunctionWithNumber -  раз

//
//
//

// Opera
// reverseFunction - 13950 раз
// reverseFunctionWithNumber - 12555 раз

// 13950x = 12555(x + 8)
// 1395x = 100440
// x = 72 байт => 1003752 байт ~ 1 МБайт

// Safari
// reverseFunction - 45631 раз
// reverseFunctionWithNumber - 39927 раз

// 45631x = 39927(x + 8)
// 5704x = 319416
// x = 56 байт => 2555336 байт ~ 2,5 МБайт
