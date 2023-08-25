// Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.

class Shape {
  getPerimetr() {}

  getArea() {}
}

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
console.log(round.getPerimetr());
console.log(round.getArea());

const rectangle = new Rectangle(5, 10);
console.log(rectangle.getPerimetr());
console.log(rectangle.getArea());

const triangle = new Triangle(3, 4, 5);
console.log(triangle.getPerimetr());
console.log(triangle.getArea());
