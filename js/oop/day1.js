//! properties that don't exist evaluate to undefined

//! All keys get stringified

//! value in objects can be any data type , even a function

//! Class (class are a blueprint of functionality) (upper camelcase)
class Triangle {
  getArea() {
    return (this.a * this.b) / 2;
  }
  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
}

//! instantiation of a class (javascript object)
let myTri = new Triangle();
myTri.a = 3;
myTri.b = 4;
console.log(myTri.getArea()); // 6
console.log(myTri.getHypotenuse()); // 5

console.log(typeof Triangle); // function
console.log(myTri instanceof Triangle); // true

//! constructors (adding properties to class)
//! constructor is auto called whenever we make a new instance of a class
class Square {
  constructor(a, b) {
    if (!Number.isFinite(a) || a <= 0) {
      throw new Error(`Invalid a: ${a}`);
    }
    if (!Number.isFinite(b) || b <= 0) {
      throw new Error(`Invalid b: ${b}`);
    }
    this.a = a;
    this.b = b;
  }
  getArea() {
    return this.a * this.b;
  }

  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }

  result() {
    return `The square with side A of ${this.a} and side B of ${
      this.b
    } with an area of ${this.getArea()}`;
  }
}

const mySquare = new Square(5, 5);

console.log(mySquare.getArea()); // 25
console.log(mySquare.result());

//! Instance Methods Functions places in a CLASS are called instance methods

//! Inheritance basics
// inherit functionality from the parent class
// sub class inherits from super class
// child class inherits from parent class
class ShySquare extends Square {
  describe() {
    return "Runs and Hides";
  }
}

const shySquare = new ShySquare(2, 2);
console.log(shySquare.getArea()); // 4
console.log(shySquare.describe());

//! The super keyword (used when we want to add new properties to our child class / sub class)
//! super calls the parent constructor
class ColorSquare extends Square {
  constructor(a, b, color) {
    super(a, b);
    this.color = color;
  }
}

class ColorMoodSquare extends ColorSquare {
  constructor(a, b, color, mood) {
    super(a, b, color);
    this.mood = mood;
  }
}
const myColorMoodSquare = new ColorMoodSquare(1, 2, "red", "happy");
console.log(myColorMoodSquare);

//! Static Properties (usually called class attributes or class properties)
//todo Static methods (usually called class methods as well )
// Individual pieces of data are on the class and not on instances of the class
//! we usually put constants or data that are common across all instances of the class
class Cat {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  static species = "felix cactus";
  static meow() {
    return "Meow Meow Meow";
  }
}

console.log(Cat.species); // felix cactus
console.log(Cat.meow()); // Meow Meow Meow
