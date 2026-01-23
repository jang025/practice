//! The keyword THIS (what does it refer to)
//? Global objects and this

// when you call a function on nothing ,
// you are actually calling it on the global object

// In browser , its the window object
// In node, its the global object

// the value of the keyword (this) depends on
// the object that a method is called upon

//? The value of the keyword this is determined when the code runs

//* the value this is the left side of the dot

function whatIsThis() {
  console.log("The value of this is ", this);
}

whatIsThis(); // the value of this  is global object

const obj = {
  color: "purple",
  age: 2,
  whatIsThis: whatIsThis,
};

obj.whatIsThis();
