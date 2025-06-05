let equation = [0, "", 0];  // [ firstOperand, operator, secondOperand ]
let state    = 0;           // 0 = building operand1, 1 = building operand2, 2 = just calculated

function buttonClick(content) {
    const display = document.getElementById("lowerDisplay");
    const head = document.getElementById("upperDisplay");
    // 1) If the last action was “=” (state==2) and we now see a digit,
    //    reset everything so we start a brand‑new calculation.
    if (state === 2 && !isNaN(content)) {
        equation = [0, "", 0];
        state = 0;
        display.innerHTML = ""; 
        head.innerHTML = "";
    }

    // 2) If it’s a digit (0–9), append to whichever operand we’re on:
    if (!isNaN(content)) {
        if (state === 0) {
            equation[0] = equation[0]*10 + Number(content);
            display.innerHTML = equation[0];
        } else if (state === 1) {
            equation[2] = equation[2]*10 + Number(content);
            display.innerHTML = equation[2];
        }
        return;
    }
    

    // 3) If it’s one of the four basic operators:
    if (["+", "-", "*", "/"].includes(content)) {
        // If we were already in “typing secondOperand” (state==1)
        // that means the user just chained a second operator (e.g. “5 + 2 +”),
        // so we first compute the pending result:
        if (state === 1) {
            const interim = operate(equation[0], equation[2], equation[1]);
            equation = [interim, content, 0];
            head.innerHTML = `${interim} ${content}`;
            display.innerHTML = "";
            // Stay in state 1, because now we’re ready to type a new secondOperand
            state = 1;
        } 
        // Otherwise, we were typing the firstOperand (state==0):
        else {
            equation[1] = content;
            head.innerHTML = `${equation[0]} ${content}`;
            display.innerHTML = "";
            state = 1; 
        }
        return;
    }

    // 4) If it’s the “=” key:
    if (content === "=") {
        // Only compute if we actually have operator + secondOperand ready
        if (state === 1) {
            const result = operate(equation[0], equation[2], equation[1]);
            head.innerHTML = `${equation[0]} ${equation[1]} ${equation[2]} =`;
            display.innerHTML = result;
            equation = [ result, "", 0 ];
            state = 2;  // mark “just calculated”
        }
        return;
    }

    // 5) (Optional) Handle “Clear” if you have those buttons:
    if (content.toLowerCase() === "clear") {
        equation = [0, "", 0];
        state = 0;
        display.innerHTML = "";
        head.innerHTML = "";
    }

    if(content.toLowerCase() === "delete"){
        if (state === 0) {
            equation[0] = Math.floor(equation[0]/10);
            display.innerHTML = equation[0];
        } else if (state === 1) {
            equation[2] = Math.floor(equation[2]/10);
            display.innerHTML = equation[2];
        }
        return;
    }
}

function operate(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: return a;
    }
}

