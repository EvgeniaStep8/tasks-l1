// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля. Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах. Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

// Функция принимает на вход пароль
const evaluatePasswordComplexity = (password) => {
  // Если пароль равен пустой строке, возвращаем предупреждение
  if (password === "") {
    return "Введите пароль!";
  }
  
  // Если пароль содержит символы недопустимые символы, возвращаем предупреждение
  if (!(/[0-9a-z~\!\?@\#\$%\^&\*_\-\+\(\)\[\]\{\}\>\<\/\\\|"'\.,\:;]/g.test(password))) {
    return "Пароль содержит недопустимые символы"
  };

  // Преобразуем пароль к строке, чтобы корректно работали все методы (если вдруг формат данных будет, например, число)
  password = String(password);
 
  // Константы, равные 1 если пароль соответсвует условию и 0, если не соответсвует. Проверяем длину пароля, наличие латинских букв, цифр, символов в разных регистрах и спецсимволов
  const isDifficultLength = password.length > 8 ? 1 : 0;
  const isPasswordContainsLetter = /[a-z]/g.test(password) ? 1 : 0;
  const isPasswordContainsNum = /\d/.test(password) ? 1 : 0;
  const isPasswordContainsdDifferentRegisters =
    password.toLowerCase() !== password ? 1 : 0;
  const isPasswordContainsSymbols =
    /[~\!\?@\#\$%\^&\*_\-\+\(\)\[\]\{\}\>\<\/\\\|"'\.,\:;]/.test(password)
      ? 1
      : 0;

  // Для оценки сложности пароля складываем все константы сложности, максималная сложность 5
  const difficult = `Оценка сложности пароля ${
    isDifficultLength +
    isPasswordContainsLetter +
    isPasswordContainsNum +
    isPasswordContainsdDifferentRegisters +
    isPasswordContainsSymbols
  }/5`;

  // В порядке увеличения сложности, предлагаем пользователю дополнить пароль, если он хочет сделать его более надёжным.
  if (!isDifficultLength) {
    return `${difficult}, для увеличения надёжности пароля увеличьте количество символов больше 8!`;
  } else if (!isPasswordContainsNum) {
    return `${difficult}, для увеличения надёжности пароль должен содержать хотя бы одну цифру!`;
  } else if (!isPasswordContainsLetter) {
    return `${difficult}, для увеличения надёжности пароль должен содержать хотя бы одну латинускую букву!`;
  } else if (!isPasswordContainsdDifferentRegisters) {
    return `${difficult}, для увеличения надёжности пароль должен содержать строчные и прописные буквы!`;
  } else if (!isPasswordContainsSymbols) {
    return `${difficult}, для увеличения надёжности пароль должен содержать символы: ~!?@#$%^&*_-+()[]{}></\\|"'.,:;!`;
  } else {
    return `${difficult}, очень надёжный пароль!`;
  }
};

// Пример работы функции
console.log(evaluatePasswordComplexity("password")); // Оценка сложности пароля 1/5, для увеличения надёжности пароля увеличьте количество символов больше 8!
console.log(evaluatePasswordComplexity("123456789")); // Оценка сложности пароля 2/5, для увеличения надёжности пароль должен содержать хотя бы одну латинускую букву!
console.log(evaluatePasswordComplexity("passworpassword")); // Оценка сложности пароля 2/5, для увеличения надёжности пароль должен содержать хотя бы одну цифру!
console.log(evaluatePasswordComplexity("password123")); // Оценка сложности пароля 3/5, для увеличения надёжности пароль должен содержать строчные и прописные буквы!
console.log(evaluatePasswordComplexity("Password123")); // Оценка сложности пароля 4/5, для увеличения надёжности пароль должен содержать символы: ~!?@#$%^&*_-+()[]{}></\|"'.,:;!
console.log(evaluatePasswordComplexity("Password123.")); // Оценка сложности пароля 5/5, очень надёжный пароль!

console.log(evaluatePasswordComplexity("")); // Введите пароль!
console.log(evaluatePasswordComplexity("ляляляля")); // Пароль содержит недопустимые символы