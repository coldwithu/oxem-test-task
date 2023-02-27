const keyboardInputCost = document.getElementById('keyboard-input-cost');
const rangeInputCost = document.getElementById('range-input-cost');
const cost = document.querySelector('#cost .progress .fill');
const keyboardInputInitial = document.getElementById('keyboard-input-initial');
const rangeInputInitial = document.getElementById('range-input-initial');
const initial = document.querySelector('#initial .progress .fill');
const percent = document.querySelector('.percent');
const keyboardInputPeriod = document.getElementById('keyboard-input-period');
const rangeInputPeriod = document.getElementById('range-input-period');
const period = document.querySelector('#period .progress .fill');
const total = document.querySelector('#total');
const monthly = document.querySelector('#monthly');

function calculator(){
    init();
    onCostChange();
    onInitialChange();
    onPeriodChange();
    totalCount();
}
function init(){
    keyboardInputCost.value = 3300000;
    rangeInputCost.value = keyboardInputCost.value;
    cost.style.width  = `${(rangeInputCost.value - 1000000) / 5000000 * 100}%`;

    keyboardInputInitial.value = 420000;
    rangeInputInitial.value = keyboardInputInitial.value / keyboardInputCost.value * 100;
    initial.style.width  = `${(rangeInputInitial.value - 10) / 50 * 100}%`;

    keyboardInputPeriod.value = 45;
    rangeInputPeriod.value = keyboardInputPeriod.value;
    period.style.width  = `${rangeInputPeriod.value / 60 * 100}%`;
}

function onCostChange(){
    keyboardInputCost.addEventListener('change', () => {
        if(keyboardInputCost.value <= 1000000){
            keyboardInputCost.value = 1000000;
        }else if(keyboardInputCost.value > 6000000){
            keyboardInputCost.value = 6000000;
        }
        rangeInputCost.value = keyboardInputCost.value;
        cost.style.width = `${(rangeInputCost.value - 1000000) / 5000000 * 100}%`;

        keyboardInputInitial.value = Math.round(rangeInputCost.value * rangeInputInitial.value / 100);
        totalCount();
    })
    rangeInputCost.addEventListener('input', () => {
        keyboardInputCost.value = rangeInputCost.value;
        cost.style.width = `${(rangeInputCost.value - 1000000) / 5000000 * 100}%`

        keyboardInputInitial.value = Math.round(rangeInputCost.value * rangeInputInitial.value / 100);
        totalCount()
    })
}

function onInitialChange(){
    keyboardInputInitial.addEventListener('change', () => {
        if(keyboardInputInitial.value <= keyboardInputCost.value / 10){
            keyboardInputInitial.value = keyboardInputCost.value / 10;
        }else if(keyboardInputInitial.value > keyboardInputCost.value * 0.6){
            keyboardInputInitial.value = keyboardInputCost.value * 0.6;
        }

        rangeInputInitial.value = Math.round(keyboardInputInitial.value / keyboardInputCost.value * 100);
        initial.style.width = `${(rangeInputInitial.value - 10) / 50 * 100}%`;
        percent.innerHTML = `${rangeInputInitial.value}%`;
        totalCount();
    })
    rangeInputInitial.addEventListener('input', () => {
        keyboardInputInitial.value = Math.round(rangeInputInitial.value / 100 * keyboardInputCost.value);
        initial.style.width = `${(rangeInputInitial.value - 10) / 50 * 100}%`;
        percent.innerHTML = `${rangeInputInitial.value}%`;
        totalCount()
    })
}

function onPeriodChange(){
    keyboardInputPeriod.addEventListener('change', () => {
        if(keyboardInputPeriod.value <= 1){
            keyboardInputPeriod.value = 1;
        }else if(keyboardInputPeriod.value > 60){
            keyboardInputPeriod.value = 60;
        }

        rangeInputPeriod.value = keyboardInputPeriod.value;
        period.style.width = `${(keyboardInputPeriod.value) / 60 * 100}%`;
        percent.innerHTML = `${rangeInputInitial.value}%`;
        totalCount();
    })
    rangeInputPeriod.addEventListener('input', () => {
        keyboardInputPeriod.value = rangeInputPeriod.value;
        period.style.width = `${(keyboardInputPeriod.value) / 60 * 100}%`;
        percent.innerHTML = `${rangeInputInitial.value}%`;
        totalCount();
    })
}

function totalCount(){
    let rate = 0.13 / 12;
    let remains = (keyboardInputCost.value - keyboardInputInitial.value);
    let monthlyPayment = (remains) / (keyboardInputPeriod.value) + remains * rate;
    total.innerHTML = `${Math.round(monthlyPayment * keyboardInputPeriod.value)} <span>₽</span>`;
    monthly.innerHTML=`${Math.round(monthlyPayment)} <span>₽</span>`;
}

function addFocus(){
    keyboardInputCost.onfocus = () => {
        document.querySelector('#cost-wrapper').classList.add('focus-input');
    }
    keyboardInputCost.onblur = () => {
        document.querySelector('#cost-wrapper').classList.remove('focus-input');
    }
    keyboardInputInitial.onfocus = () => {
        document.querySelector('#initial-wrapper').classList.add('focus-input');
    }
    keyboardInputInitial.onblur = () => {
        document.querySelector('#initial-wrapper').classList.remove('focus-input');
    }
    keyboardInputPeriod.onfocus = () => {
        document.querySelector('#period-wrapper').classList.add('focus-input');
    }
    keyboardInputPeriod.onblur = () => {
        document.querySelector('#period-wrapper').classList.remove('focus-input');
    }
}
addFocus();
calculator();