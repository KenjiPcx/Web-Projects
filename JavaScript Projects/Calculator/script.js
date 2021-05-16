document.write("<h1>Calculator</h1>");

document.write("<input type='text' id='theDisplay'> <br>")
var numbers = ["AC", "<-", "%", "7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "()"]
var op = ["/", "x", "-", "+", "="]
for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] == "AC") {
        document.write("<button onclick='clearDisplay()'>" + numbers[i] + "</button>")
    }
    else if (numbers[i] == "<-") {
        document.write("<button onclick='backspace()'>" + numbers[i] + "</button>")
    }
    else if (numbers[i] == "%") {
        document.write("<button onclick='percentage()'>" + numbers[i] + "</button>")
    }
    else if (numbers[i] == ".") {
        document.write("<button onclick='updateDisplay(\"" + numbers[i] + "\")'>" + numbers[i] + "</button>")
    }
    else {
        document.write("<button onclick='updateDisplay(" + numbers[i] + ")'>" + numbers[i] + "</button>")
    }
    if (i % 3 == 2) {
        var curOp = op.shift()
        document.write("<button onclick='doCalc(\"" + curOp + "\")'>" + curOp + "</button>")
        document.write("<br>")
    }
}
document.write("<input type='text' id='preValue' value='0'> <br>")
document.write("<input type='text' id='preOp' value='+'> <br>")

function updateDisplay(num) {
    curval = document.getElementById("theDisplay").value;
    curval += num;
    document.getElementById("theDisplay").value = curval;
}

function doCalc(op) {
    preValue = Number(document.getElementById("preValue").value);
    preOp = document.getElementById("preOp").value;
    curValue = Number(document.getElementById("theDisplay").value);

    if (preOp == "+") {
        newValue = preValue + curValue;
    }
    if (preOp == "-") {
        newValue = preValue - curValue;
    }
    if (preOp == "x") {
        newValue = preValue * curValue;
    }
    if (preOp == "/") {
        newValue = preValue / curValue;
    }
    document.getElementById("theDisplay").value = "";
    document.getElementById("preOp").value = op;
    document.getElementById("preValue").value = newValue;

    if (op == "=") {
        document.getElementById("theDisplay").value = newValue;
    }
}

function clearDisplay() {
    document.getElementById("theDisplay").value = "";
    document.getElementById("preOp").value = "+";
    document.getElementById("preValue").value = 0;
}

function backspace() {
    oldValue = document.getElementById("theDisplay").value;
    newValue = oldValue.slice(0, oldValue.length - 1);
    document.getElementById("theDisplay").value = newValue;
}

function percentage() {
    oldValue = document.getElementById("theDisplay").value;
    newValue = oldValue / 100;
    document.getElementById("theDisplay").value = newValue;
}