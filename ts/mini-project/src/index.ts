const btn = document.getElementById("btn");

// typescript thinks this might be null so one approoach is to use optional chaining

// optional chaining , only run if its not null
btn?.addEventListener("click", function () {
  console.log("Clicked");
});

// another approach is typescript's non null assertion operator

const img = document.getElementById("img")!; // guarantted to be non null , only use it if its guarantted to be non null
