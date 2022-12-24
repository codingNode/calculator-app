const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstNum = 0;
let operatorValue = ''
let awaitingNextValue = false;


function sendNumValue(num)
{
    if(awaitingNextValue)
    {
        calcDisplay.textContent = num;
        awaitingNextValue = false;
    }
    else
    {
        let display = calcDisplay.textContent
         calcDisplay.textContent = display ==='0' ? num : display + num;
    }
    
}

function addDecimal()
{
    if(awaitingNextValue) return;
    if(!calcDisplay.textContent.includes('.'))
    {
        calcDisplay.textContent = `${calcDisplay.textContent}.`
    }
}

const calculation=
{
    '/' : (firstNum,secondNum)=> firstNum/secondNum,
    '*' : (firstNum,secondNum)=> firstNum*secondNum,
    '+' : (firstNum,secondNum)=> firstNum+secondNum,
    '-' : (firstNum,secondNum)=> firstNum-secondNum,
}

function useOperator(op)
{
    if(operatorValue && awaitingNextValue) 
    {   
        operatorValue = op;
        return;
    }
    const currentValue = Number(calcDisplay.textContent);
    if(!firstNum)
    {
        firstNum = currentValue;
    }
    else
    {
        
        const calc=calculation[operatorValue](firstNum,currentValue);
        calcDisplay.textContent = calc;
        firstNum = calc;
      
    }
    awaitingNextValue = true;
    operatorValue = op;
    
}   

inputBtns.forEach((btn)=>{
    
    if(btn.classList.length === 0 )
    {
        btn.addEventListener('click',()=>sendNumValue(btn.value));
    }
    else if(btn.classList.contains('operator'))
    {
        btn.addEventListener('click',()=>useOperator(btn.value));
    }
    else if(btn.classList.contains('decimal'))
    {
        btn.addEventListener('click', ()=> addDecimal());
    }
    
    
})


function resetAll()
{
    firstNum = 0;
    operatorValue = ''
    awaitingNextValue = false;
    calcDisplay.textContent = '0'
}

clearBtn.addEventListener('click', resetAll)