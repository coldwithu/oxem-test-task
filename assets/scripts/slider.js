const circle = document.querySelector('.progress-ring');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

const slides = document.querySelectorAll('.slide');
const images = document.querySelectorAll('.slider__image');
const dots = document.querySelectorAll('.slider__dots-dot');
const leftControl = document.querySelector('.left-control');
const rightControl = document.querySelector('.right-control');

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function slider(activeSlide = 0){
    let currentPercent = 0;
    setInterval(setTime, 100);
    setActiveClasses();

    leftControl.addEventListener('click', () => {
        clearActiveClasses();
        if(activeSlide === 0){
            activeSlide = images.length - 1;
        }else {
            activeSlide--;
        }
        setActiveClasses();
        currentPercent = 0;
    })

    rightControl.addEventListener('click', () => {
        clearActiveClasses();
        if(activeSlide === images.length - 1){
            activeSlide = 0;
        }else {
            activeSlide++;
        }
        setActiveClasses();
        currentPercent = 0;
    })

    function setProgress(percent){
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = `${offset}`;
    }

    function setTime() {
        if(currentPercent === 100){
            clearActiveClasses();
            if(activeSlide === images.length-1){
                activeSlide = 0;
            }
            else{
                activeSlide++;
            }
            setActiveClasses();
            setProgress(0);
            currentPercent = 0;
        } else {
            currentPercent++;
            setProgress(currentPercent);
        }
    }

    function setActiveClasses(){
        slides[activeSlide].classList.add('active');
        images[activeSlide].classList.add('active');
        dots[activeSlide].classList.add('active');
    }

    function clearActiveClasses(){
        images.forEach((slide) => {
            slide.classList.remove('active');
        })
        dots.forEach((dot) => {
            dot.classList.remove('active');
        })
        slides.forEach((slide) => {
            slide.classList.remove('active');
        })
    }
}

slider();

