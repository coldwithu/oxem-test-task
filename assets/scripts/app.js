const header = document.querySelector('.header');
const overlay = document.querySelector('.dark');
const popup = document.querySelector('.popup');
const buttons = document.querySelectorAll('button');
const closeBtn = document.querySelector('.popup__close-bth');
const submitBtn = document.getElementById('submit');
const telInput = document.getElementById('tel');
const errors = document.querySelectorAll('.input-error')
const nameInput = document.getElementById('name');
let nameIsCorrect = false, telIsCorrect = false;

const costVal = document.getElementById('keyboard-input-cost');
const initialVal = document.getElementById('keyboard-input-initial');
const periodVal = document.getElementById('keyboard-input-period');
const totalVal = document.querySelector('#total');
const monthlyVal = document.querySelector('#monthly');

const burgerMenu = document.querySelector('.burger__menu');
const burgerClose = document.querySelector('.burger__menu-wrapper img');


window.onscroll = () => {
    let scroll = window.scrollY;
    if(scroll >= 3){
        header.classList.add('shadow');
    }else if(scroll === 0){
        header.classList.remove('shadow');
    }
}
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        showPopup();
        burgerMenu.classList.remove('active');

    });
})
submitBtn.addEventListener('click',async (e) => {
    e.preventDefault();
    await sendData("https://jsonplaceholder.typicode.com/posts",setData());
    hidePopup();
    clearInputs();
})

const setData = () => {
    return {
        tel: telInput.value,
        name: nameInput.value,
        cost: costVal.value,
        initial: initialVal.value,
        period: periodVal.value,
        total: totalVal.value,
        monthly: monthlyVal.value,
    };
}
const sendData = async (url, data) =>{
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }
    return await response.json();
}

closeBtn.addEventListener('click', () => {
    hidePopup();
    clearInputs();
})
const showPopup = () => {
    popup.style.height = '80vh';
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
}
const hidePopup = () => {
    popup.style.height = '0';
    overlay.style.display = 'none';
    overlay.style.opacity = '0';
    submitBtn.setAttribute('disabled', 'disabled');
}
const clearInputs = () => {
    telInput.value = '';
    nameInput.value = '';
    telInput.classList.remove('error');
    nameInput.classList.remove('error');
    errors[0].style.display = "none";
    errors[1].style.display = "none";
}

burger.addEventListener('click', () => {
    showBurger();
})
burgerClose.addEventListener('click', (e) => {
    e.preventDefault();
    hideBurger();
})

const showBurger = () => {
    burgerMenu.classList.add('active');
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
}
const hideBurger = () => {
    burgerMenu.classList.remove('active');
    overlay.style.display = 'none';
    overlay.style.opacity = '0';
}


telInput.addEventListener('change', () => {
    checkTel();
    setSubmitBtn();
})
nameInput.addEventListener('change', () => {
    checkName();
    setSubmitBtn();
})

function setSubmitBtn(){
    if(nameIsCorrect && telIsCorrect){
        submitBtn.removeAttribute('disabled');
    }
}

function checkTel(){
    if(telInput.value.length < 17){
        errors[0].style.display = "block";
        telInput.classList.add('error');
    }else{
        errors[0].style.display = "none";
        telInput.classList.remove('error');
        telIsCorrect = true;
    }
}
function checkName(){
    let pattern = /^[A-ZА-Я][a-zа-я]*$/;
    if((nameInput.value === 0) || (pattern.test(nameInput.value) === false)){
        errors[1].style.display = "block";
        nameInput.classList.add('error');

    }else{
        errors[1].style.display =  "none";
        nameInput.classList.remove('error');
        nameIsCorrect = true;
    }
}

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });

});