'use strict';
const changeTheme = ()=> {
    const body = document.querySelector('body'),
        toggle = document.querySelector('.change-theme');

    toggle.addEventListener('click', ()=> {
        body.classList.toggle('light');
        body.classList.toggle('dark');
    });
};
export default changeTheme;