// Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента, и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).

const elem = document.querySelector(".element");

const traversalDOM = (node) => {
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

traversalDOM(elem);
