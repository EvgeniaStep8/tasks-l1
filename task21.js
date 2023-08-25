// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).

let i = 0;

const reverseFunction = () => {
  i++;
  reverseFunction();
};

const reverseFunctionWithNumber = () => {
  let a = 10;
  i++;
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
