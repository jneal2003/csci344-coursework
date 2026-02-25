let count = 0;
const counter = document.querySelector("#counter");
const upbtn = document.querySelector("#incrementBtn");
const downbtn = document.querySelector("#decrementBtn");
const resetbtn = document.querySelector("resetBtn");


function increment() {
    count++;
    updateDisplay();
}


function decrement() {
    count--;
    updateDisplay();
}


function reset() {
    count = 0;
    updateDisplay();
}


function updateDisplay() {
    counter.innerHTML = count;
    if (count === 0) {
        counter.style.color = "#666";
    }
    else if (count < 0) {
        counter.style.color = "#f44336";
    }
    else {
        counter.style.color = "#4CAF50";
    }
}

updateDisplay();

