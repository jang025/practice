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
}

const mySquare = new Square(5, 5);

console.log(mySquare.getArea()); // 25
