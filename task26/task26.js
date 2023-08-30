// Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента, и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).

const elem = document.querySelector(".element");

// Функция traversalDOM принимает на вход ДОМ узел
const traversalDOM = (node) => {
  // Через childNodes олучаем список узлов потомков заданного узла, циклом обходим эти узлы (если они не текстовые и не комментарии) и выводим для них название тэга через nodeName, для каждого узла запускаем функцию traversalDOM 
  for (let i = 0; i < node.childNodes.length; i++) {
    if (
      node.childNodes[i].nodeName !== "#text" &&
      node.childNodes[i].nodeName !== "#comment"
    ) {
      console.log(node.childNodes[i].nodeName);
      traversalDOM(node.childNodes[i]);
    }
  }
};

// Для демонстрации работы функции на странице зайдите в "Инструменты разработчика" и во вкладке консоль можно найти название тегов, находящихчся в переданном элементе
traversalDOM(elem);
