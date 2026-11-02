console.log('Happy developing ✨')
const input = document.getElementById("input");
const answer = document.getElementById("answer");
let historyList = JSON.parse(localStorage.getItem("calculatorHistory"));

if (historyList === null) {
    historyList = [];
}

let historyIndex = historyList.length;

function addInput(value) {

    let start = input.selectionStart;
    let end = input.selectionEnd;

    input.value = input.value.substring(0, start) +
        value +
        input.value.substring(end);
    input.focus();
    input.setSelectionRange(start + value.length, start + value.length);
    historyIndex = historyList.length;
    calculate();
}
function calculate() {
    let equation = input.value;
    if (equation === "") {
        answer.innerHTML = "";
        return null;
    }
    for (let i = 0; i < equation.length; i++) {
        if (equation.charAt(i) === "^") {
            equation = equation.substring(0, i) +
                "**" +
                equation.substring(i + 1);
            i++;
        }
    }
    let allowed = "0123456789+-*/%.() ";
    for (let i = 0; i < equation.length; i++) {
        if (allowed.indexOf(equation.charAt(i)) === -1) {
            answer.innerHTML = "";
            return null;
        }
    }
    try {
        let result = Function("return (" + equation + ")")();
        if (!Number.isFinite(result)) {
            answer.innerHTML = "";
            return null;
        }
        answer.innerHTML = result;
        return result;
        catch {

        }
    }
}
function saveEquation() {

    let equation = input.value;
    let result = calculate();

    if (equation === "" || result === null) {
        return;
    }

    historyList.push({
        equation: equation,
        answer: result
    });

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(historyList)
    );

    historyIndex = historyList.length;
}
function clearAll() {

    input.value = "";
    answer.innerHTML = "";

    historyIndex = historyList.length;
}
function deleteLast() {

    let start = input.selectionStart;
    let end = input.selectionEnd;

    if (start === end && start > 0) {

        input.value = input.value.substring(0, start - 1) +
            input.value.substring(end);

        input.setSelectionRange(start - 1, start - 1);

    } else if (start !== end) {

        input.value = input.value.substring(0, start) +
            input.value.substring(end);

        input.setSelectionRange(start, start);
    }

    calculate();
}

function previousEquation() {

    if (historyIndex > 0) {

        historyIndex--;

        input.value = historyList[historyIndex].equation;

        answer.innerHTML = historyList[historyIndex].answer;
    }
}


function nextEquation() {

    if (historyIndex < historyList.length - 1) {

        historyIndex++;

        input.value = historyList[historyIndex].equation;

        answer.innerHTML = historyList[historyIndex].answer;

    } else {

        historyIndex = historyList.length;

        input.value = "";
        answer.innerHTML = "";
    }
}

document.getElementById("zero").addEventListener("click", function() {
    addInput("0");
});

document.getElementById("one").addEventListener("click", function() {
    addInput("1");
});

document.getElementById("two").addEventListener("click", function() {
    addInput("2");
});

document.getElementById("three").addEventListener("click", function() {
    addInput("3");
});

document.getElementById("four").addEventListener("click", function() {
    addInput("4");
});

document.getElementById("five").addEventListener("click", function() {
    addInput("5");
});

document.getElementById("six").addEventListener("click", function() {
    addInput("6");
});

document.getElementById("seven").addEventListener("click", function() {
    addInput("7");
});

document.getElementById("eight").addEventListener("click", function() {
    addInput("8");
});

document.getElementById("nine").addEventListener("click", function() {
    addInput("9");
});

document.getElementById("decimal").addEventListener("click", function() {
    addInput(".");
});

document.getElementById("plus").addEventListener("click", function() {
    addInput("+");
});

document.getElementById("subtract").addEventListener("click", function() {
    addInput("-");
});

document.getElementById("multiply").addEventListener("click", function() {
    addInput("*");
});

document.getElementById("divide").addEventListener("click", function() {
    addInput("/");
});

document.getElementById("power").addEventListener("click", function() {
    addInput("^");
});

document.getElementById("mod").addEventListener("click", function() {
    addInput("%");
});

document.getElementById("open").addEventListener("click", function() {
    addInput("(");
});

document.getElementById("close").addEventListener("click", function() {
    addInput(")");
});

document.getElementById("enter").addEventListener("click", function() {
    saveEquation();
});

document.getElementById("up").addEventListener("click", function() {
    previousEquation();
});

document.getElementById("down").addEventListener("click", function() {
    nextEquation();
});

document.addEventListener("keydown", function(event) {

    if (event.key === "Enter" || event.key === "=") {

        event.preventDefault();
        saveEquation();
    }

    if (event.key === "ArrowUp") {

        event.preventDefault();
        previousEquation();
    }

    if (event.key === "ArrowDown") {

        event.preventDefault();
        nextEquation();
    }

    if (event.key === "Escape" || event.key === "Delete") {

        event.preventDefault();
        clearAll();
    }

    if (event.key === "Backspace") {

        if (document.activeElement !== input) {

            event.preventDefault();
            deleteLast();
        }
    }
});
input.addEventListener("input", function() {

    historyIndex = historyList.length;

    calculate();
});
