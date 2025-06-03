const solution = new Array();
var equation = new Array();
var counter = 0;
equation.push(0);

function buttonClick(content){
    var display = document.getElementById("lowerDisplay")
    if((content >= 0) && (content <= 9)){
        equation[counter] = equation[counter] * 10 + Number(content);
        display.innerHTML = equation[counter];
    }
    else{

    }
}
