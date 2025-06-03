const solution = new Array();
function buttonClick(content){
    solution.push(content);
    for(let i = 0; i < solution.length;i++)
    {
        console.log(solution[i]);
    }
}