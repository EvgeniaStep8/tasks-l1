// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N

const MathX = {
  fibonachi: function (n) {
    let prev = 1;
    let cur = 1;

    if (n === 1) {
      return prev;
    }

    for (let i = 2; i < n; i++) {
      let newCur = prev + cur;
      [prev, cur] = [cur, newCur];
    }

    return cur;
  },

  fibonachiAll: function (n) {
    const res = [1, 1];
    if (n === 1) {
      return 1;
    }

    for (let i = 2; i < n; i++) {
      res.push(res[i - 1] + res[i - 2]);
    }

    return res.join(", ");
  },

  checkSimpleNum: function (num) {
    if (num === 1) {
      return false;
    }
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  },

  simpleNum: function (n) {
    let count = 0;
    let cur = 2;
    let res;

    while (count !== n) {
      if (this.checkSimpleNum(cur)) {
        res = cur;
        count++;
      }
      cur++;
    }
    return res;
  },

  simpleAllNum: function (n) {
    let count = 0;
    let cur = 2;
    let res = [];

    while (count !== n) {
      if (this.checkSimpleNum(cur)) {
        res.push(cur);
        count++;
      }
      cur++;
    }
    return res.join(", ");
  },
};

console.log(MathX.fibonachi(7)); // 13
console.log(MathX.fibonachiAll(7)); // 1, 1, 2, 3, 5, 8, 13
console.log(MathX.simpleNum(5)); // 11
console.log(MathX.simpleAllNum(5)); // 2, 3, 5, 7, 11
