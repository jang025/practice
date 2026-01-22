//! Getters and Setters
/*
Javascript provides special methods, termed "getters" and "setters", which allow you to define 
the ways to retrieve or change 
the values of object properties 

*/

//? The _ doesnt mean anything to javascript , it's a way in the past to indicate to other developers to not change this

class Circle {
  static allowedColors = new Set(["red", "green", "blue"]);
  constructor(radius, color) {
    this._radius = radius;
    if (Circle.allowedColors.has(color)) {
      this._color = color;
    } else {
      throw new Error("That color is not allowed");
    }
  }
  //! Getter for the diameter ( act like a property but have function logic behind it) (allows you to retrieve the value of an object property)
  get diameter() {
    return this._radius * 2;
  }

  get radius() {
    return this._radius;
  }

  get color() {
    return this._color;
  }

  //! Setter for the radius (allows you to set the value of an object's property)
  set radius(value) {
    if (value < 0) {
      throw new Error("Radius cannot be negative");
    } else {
      this._radius = value;
    }
  }

  set color(newColor) {
    if (Circle.allowedColors.has(newColor)) {
      this._color = newColor;
    } else {
      throw new Error("That color is not allowed");
    }
  }
}

// const myCircle = new Circle(5);
// console.log(myCircle.diameter); // 10

// myCircle.radius = 10;
// console.log(myCircle._radius); // 10
// console.log(myCircle.diameter); // 20

const colorCircle = new Circle(10, "red");
colorCircle.color = "green";
console.log(colorCircle);
