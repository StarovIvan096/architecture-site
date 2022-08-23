'use strict';

const doubleslider = ()=> {

    document.addEventListener('DOMContentLoaded', ()=> {

        const body = document.querySelector('body'),
            blockSlider = document.querySelector('.block-slider'),
            act = document.querySelectorAll('.style-project'),
            imageProject = document.querySelector('.image-project'),
            slideImage = document.querySelectorAll('.slide-image'),
            wrapModalImg = document.querySelector('.wrap-modal-img'),
            wrapActiveElement =document.querySelector('.wrap-active-element img'),
            closeModal = document.querySelector('.close-modal'),
            arrClientWidth = [],
            imgClientWidth = [];

            const iterateArrayImg = ()=>{
                slideImage.forEach((item) => {
                    imgClientWidth.push(item.clientWidth);
                });   
            };
            iterateArrayImg();

        const sendIndexElem = (elem = 1)=> {
            const sizeWindow = window.screen.width;
            let scrollWidth = 0;
            
            for(let i = 0; i < elem; i++){
                scrollWidth += (imgClientWidth[i] + 100);
            }
            let widthActivElem = slideImage[elem].clientWidth;
            widthActivElem = (sizeWindow - widthActivElem) / 2;

            let total = widthActivElem - scrollWidth;
            imageProject.style.transform = `translateX(${total}px)`;
            
        };
        sendIndexElem();

        const removeClassActive = ()=> {
            act.forEach((elem)=> {
                elem.classList.remove('active');
            });
        };

        const addClassActive = (item)=> {
            item.classList.add('active');
        };

        const shiftSlide = (step)=> {
            blockSlider.style.transform = `translateX(${step}px)`;
        };

        const culcShift = (size , w)=> {
            const sizeWindow = window.screen.width;
            let moving = (sizeWindow - w) / 2;
            
            moving = moving - size;
            shiftSlide(moving);
        };

        const iterateArray = (index, w)=> {
            let shearSize = index * 45;
            for(let i = 0; i <= index - 1; i++){
                shearSize += arrClientWidth[i];
            }
            culcShift(shearSize, w, index);
        };

        act.forEach((item, index)=> {
            arrClientWidth.push(item.clientWidth);

            item.addEventListener('click', (event)=> {
                const target = event.target;

                removeClassActive();
                addClassActive(target);
                iterateArray(index, target.clientWidth);
                sendIndexElem(index);
            });
        });


        // #########    1 АКТИВНЫЙ ЭЛЕМЕНТ И ЕГО ЖЕ ВЫРАВНИВАНИЕ ПО ЦЕНТРУ    ##############two
        const twoActiveElem = ()=> {
            act[1].classList.add('active');
            const sizeWindow = window.screen.width;
            const shearSize = act[0].clientWidth + 45;
            const moving = (sizeWindow - act[1].clientWidth) / 2;
            const total = moving - (shearSize);
            blockSlider.style.transform = `translateX(${total}px)`;
        };
        twoActiveElem();



        const modalImg = ()=> {
            slideImage.forEach((item)=> {
                item.addEventListener('click', (event)=> {
                    console.log(event.target.src);
                    wrapActiveElement.src = event.target.src;
                    wrapModalImg.style.display = 'block';    
                    body.style.overflow = 'hidden';
                    setTimeout(()=> {closeModal.style.display = 'block'}, 1900);
                });
            });
        };
        modalImg();
        closeModal.addEventListener('click', ()=> {
            closeModal.style.display = 'none';
            wrapModalImg.style.display = 'none';   
            body.style.overflow = 'auto';
        });
    });
};

export default doubleslider;