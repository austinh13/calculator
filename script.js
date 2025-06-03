const solution = new Array();
var equation = [0,0,0,0];
var counter = 0;
equation.push(0);

function buttonClick(content){
    var display = document.getElementById("lowerDisplay")
    var head = document.getElementById("upperDisplay");
    if((content >= 0) && (content <= 9)){
        equation[counter] = equation[counter] * 10 + Number(content);
        display.innerHTML = equation[counter];
    }
    else { // Operator or equal
        counter++;
        if(counter == 1){
            equation[counter] = content;
            head.innerHTML = equation[0] + " " + content;
            display.innerHTML = "";
            counter++;
        }
        else if(counter == 3){
            var num = operate(equation[0],equation[2],equation[1])
            equation[0] = num;
            equation[1] = content;
            equation[2] = 0;
            head.innerHTML = equation[0] + " " + content;
            display.innerHTML = "";
            counter = 2;
        }  
    }
}

function operate(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: return b;
    }
}