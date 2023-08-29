// Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.

// Так как для разных фигур нет универсального метода для расчёта площади и периметра, создам базовый класс с пуствми методами getPerimetr и getArea
class Shape {
  getPerimetr() {}

  getArea() {}
}

// Подласс для круга Round принимает в конструктор радиус и по формулам расчитывает площадь и периметр
class Round extends Shape {
  constructor(radius) {
    super();
    this._radius = radius;
  }

  getPerimetr() {
    return 2 * Math.PI * this._radius;
  }

  getArea() {
    return Math.PI * this._radius ** 2;
  }
}

// Подласс для прямоугольника Rectangle принимает в конструктор высоту и ширину и по формулам расчитывает площадь и периметр
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this._width = width;
    this._height = height;
  }

  getPerimetr() {
    return this._height * 2 + this._height * 2;
  }

  getArea() {
    return this._height * this._width;
  }
}

// Подласс для тругольника Triangle принимает в конструктор 3 его стороны и по формулам расчитывает площадь и периметр
class Triangle extends Shape {
  constructor(a, b, c) {
    super();
    this._a = a;
    this._b = b;
    this._c = c;
  }

  getPerimetr() {
    return this._a + this._b + this._c;
  }

  getArea() {
    this._halfPerimetr = this.getPerimetr() / 2;
    return Math.sqrt(
      this._halfPerimetr *
        (this._halfPerimetr - this._a) *
        (this._halfPerimetr - this._b) *
        (this._halfPerimetr - this._c)
    );
  }
}

const round = new Round(5);
console.log(round.getPerimetr()); //31.41592653589793
console.log(round.getArea()); // 78.53981633974483

const rectangle = new Rectangle(5, 10);
console.log(rectangle.getPerimetr()); //40
console.log(rectangle.getArea()); // 50

const triangle = new Triangle(3, 4, 5);
console.log(triangle.getPerimetr()); //12
console.log(triangle.getArea()); //6
