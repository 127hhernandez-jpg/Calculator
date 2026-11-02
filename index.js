console.log('Happy developing ✨')
const stored = sessionStorage.getItem("stored");

let equations;

if (stored) {
    equations = JSON.parse(stored);
} else {
    equations = [];
    sessionStorage.setItem("stored", JSON.stringify(equations));
}

let historyIndex = equations.length;
function addInput(value) {
    input.value += value;
    calculate();
    input.focus();
}
function calculate() {
    try {
        if (input.value != "") {
            let result = eval(input.value);

            if (Number.isFinite(result)) {
                answer.innerHTML = result;
                return true;
            } else {
                answer.innerHTML = "Error";
                return false;
            }
        } else {
            answer.innerHTML = "";
            return false;
        }
    } catch (error) {
        answer.innerHTML = "Error";
        return false;
    }
}
function saveEquation() {
    if (calculate() === true) {
        equations.push(input.value);

        sessionStorage.setItem("stored", JSON.stringify(equations));

        historyIndex = equations.length;
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
    addInput("**");
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

input.addEventListener("input", function() {
    calculate();
});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        saveEquation();
    }
});

document.getElementById("up").addEventListener("click", function() {
    if (historyIndex > 0) {
        historyIndex--;
        input.value = equations[historyIndex];
        calculate();
    }
});

document.getElementById("down").addEventListener("click", function() {
    if (historyIndex < equations.length - 1) {
        historyIndex++;
        input.value = equations[historyIndex];
        calculate();
    } else {
        historyIndex = equations.length;
        input.value = "";
        answer.innerHTML = "";
    }
});
