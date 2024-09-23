const screen = document.getElementById("screen");
let currentInput = "";
let previousInput = "";
let operator = "";

const clear = () => {
    currentInput = "";
    previousInput = "";
    operator = "";
    screen.value = "";
};

const appendNumber = (num) => {
    currentInput += num;
    screen.value = currentInput;
};

const chooseOperator = (op) => {
    if (currentInput === "") return;
    if (previousInput !== "") calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = "";
};

const calculate = () => {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            result = prev / curr;
            break;
        default:
            return;
    }
    currentInput = result;
    operator = "";
    previousInput = "";
    screen.value = result;
};

// Event Listeners
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        if (value === undefined) return;

        if (!isNaN(value) || value === ".") {
            appendNumber(value);
        } else if (value === "C") {
            clear();
        } else if (value === "=") {
            calculate();
        } else {
            chooseOperator(value);
        }
    });
});

document.getElementById("clear").addEventListener("click", clear);
document.getElementById("equal").addEventListener("click", calculate);
