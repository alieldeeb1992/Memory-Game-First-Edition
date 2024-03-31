//Catch  Our Elements
//Catch welcome Layer
let welcomeEl = document.querySelector(".welcome-layer");
//Catch the Name
let myName = document.querySelector(".name-span");
//Catch Tries
let myTries = document.querySelector(".tries-span");
//Catch Welcome Button
let welcomeBtn = document.querySelector(".welcome-layer button");
//catch the game container
let blocks = document.querySelector(".game-container");
let duration = 1000;
//Welcome Layer Function
welcomeBtn.onclick = function () {
  let enterYourName = prompt("Please Enter Your Name");
  if (enterYourName === null || enterYourName === "") {
    myName.innerHTML = "Unknown";
  } else {
    myName.innerHTML = enterYourName;
  }
  welcomeEl.remove();
};
//Make An Array From My Blocks
let BlocksArray = Array.from(blocks.children);
//Make An Array From The Keys Of Blocks Array
let blocksKeys = Array.from(BlocksArray.keys());
//shuffle the block keys
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * i);
    [[array[randomIndex]], [array[i]]] = [[array[i]], [array[randomIndex]]];
  }
}
shuffle(blocksKeys);
//use shuffle function to shuffle elements by using ordering style
BlocksArray.forEach((block, index) => {
  block.style.order = blocksKeys[index];
  flipped(block);
});

//flipped cards and conditions
function flipped(element) {
  element.onclick = function () {
    //add flipped class to the element to flip
    element.classList.add("flipped");
    //filter flipped elements to make them only two
    let flippedOnes = BlocksArray.filter((element) =>
      element.classList.contains("flipped")
    );

    if (flippedOnes.length === 2) {
      blocks.classList.add("prevent-clicking");
      //if two elements are mached add class match which has the same style as flipped class
      // and remove flipped to keep flipped just Two
      function flipAgainOrNot(elementOne, elementTwo) {
        if (elementOne.dataset.animal === elementTwo.dataset.animal) {
          elementOne.classList.add("matched");
          elementTwo.classList.add("matched");
          elementOne.classList.remove("flipped");
          elementTwo.classList.remove("flipped");
          //after every two flips prevent to flip any cards
          blocks.classList.remove("prevent-clicking");
        } else {
          setTimeout(() => {
            elementOne.classList.remove("flipped");
            elementTwo.classList.remove("flipped");
            //after every two flips prevent to flip any cards
            blocks.classList.remove("prevent-clicking");
            //increase Tries by One every time we have a wrong try
            myTries.innerHTML = parseInt(myTries.innerHTML) + 1;
          }, duration);
        }
      }
      //apply the function to the two elements of the flipped ones Array
      flipAgainOrNot(flippedOnes[0], flippedOnes[1]);
    }
  };
}
