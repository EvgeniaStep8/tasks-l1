// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например: 112 сообщения, 12 сообщений, 1 сообщение. Функцию надо упаковать в модуль.

const inclineWord = (num, imPad, rodPad, rodPadMn) => {
  if ((num > 10 && num < 20) || num % 10 > 4) {
    return `${num} ${rodPadMn}`;
  } else if (num % 10 === 1) {
    return `${num} ${imPad}`;
  } else {
    return `${num} ${rodPad}`;
  }
};

console.log(inclineWord(25, "дом", "дома", "домов")); // 25 домов
console.log(inclineWord(438, "дом", "дома", "домов")); // 438 домов
console.log(inclineWord(11, "дом", "дома", "домов")); // 11 домов
console.log(inclineWord(1, "дом", "дома", "домов")); // 1 дом
console.log(inclineWord(24, "дом", "дома", "домов")); // 24 дома
console.log(inclineWord(212, "дом", "дома", "домов")); // ?

//Упаковать в модуль!
