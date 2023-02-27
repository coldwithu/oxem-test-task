const screenWidth = window.screen.width;
const logo = document.querySelector('.header__logo');
const burger = document.querySelector('.header__burger');

const headerBar = document.querySelector('.header');
const sliderView = document.querySelector('.slider');

window.addEventListener('scroll', () => {
    if((screenWidth < 768)){
        if(sliderView.getBoundingClientRect().bottom < 71){
            headerBar.style.background = '#FFFFFF';
            logo.src = 'assets/img/logoMobileWhite.svg'
            burger.src = 'assets/img/burger.svg';
        }else{
            headerBar.style.background = 'black';
            logo.src = 'assets/img/logoMobile.svg'
            burger.src = 'assets/img/burgerWhite.svg';
        }
    }

})
if(screenWidth < 768){
    logo.src = 'assets/img/logoMobile.svg';
    burger.src = 'assets/img/burgerWhite.svg';
    headerBar.style.background = 'black';
}
