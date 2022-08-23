
 'use strict';
const sendForm = ()=> {
        
        const form = document.querySelector('.form') ,
            textName = document.getElementById('text-name'),
            textMessage = document.getElementById('text-message'),
            wrapModalWindowForm = document.querySelector('.wrap-modal-window-form');


        const banKeypress = ()=> {
            const helper = {
                checks: {
                    onlyCyrillic: function(str){
                        return /[а-яё\s\B]/i.test(str);
                    },
                    messageBlock: function(str){
                        return /[а-яё\s\.\,]/ig.test(str);
                    }
                }
            };

            textName.addEventListener('keydown', (event)=> {
                if(!helper.checks.onlyCyrillic(event.key)){
                    return event.preventDefault();
                }
            });

            textMessage.addEventListener('keydown', (event)=> {
                if(!helper.checks.messageBlock(event.key)){
                    return event.preventDefault();
                }
            });
        };
        banKeypress();

        
        const numberCheck = ()=> {
            
            function maskPhone(selector, masked = '+7 (___) ___-__-__') {
                const elems = document.querySelectorAll(selector);

                function mask(event) {
                    const keyCode = event.keyCode;
                    const template = masked,
                        def = template.replace(/\D/g, ""),
                        val = this.value.replace(/\D/g, "");
                    let i = 0,
                        newValue = template.replace(/[_\d]/g, function (a) {
                            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                        });
                    i = newValue.indexOf("_");
                    if (i != -1) {
                        newValue = newValue.slice(0, i);
                    }
                    let reg = template.substr(0, this.value.length).replace(/_+/g,
                        function (a) {
                            return "\\d{1," + a.length + "}";
                        }).replace(/[+()]/g, "\\$&");
                    reg = new RegExp("^" + reg + "$");
                    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                        this.value = newValue;
                    }
                    if (event.type == "blur" && this.value.length < 5) {
                        this.value = "";
                    }

                }

                for (const elem of elems) {
                    elem.addEventListener("input", mask);
                    elem.addEventListener("focus", mask);
                    elem.addEventListener("blur", mask);
                }
                
            }
            maskPhone('input[id="text-number"]');

        };

        numberCheck();

        const dataPreparation = (form)=> {

            const valid = new Validator({
                selector: `${form.classList}`,
                pattern: /^\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/,
                method: {
                    'text-name':[
                        ['notEmpty'],
                        ['pattern', 'name']
                    ],
                    'email':[
                        ['notEmpty'],
                        ['pattern', 'email']
                    ],
                    'text-number':[
                        ['notEmpty'],
                        ['pattern', 'number']
                    ],
                    'text-message':[
                        ['notEmpty'],
                        ['pattern', 'message']
                    ]
                } 
            });
            valid.init();

            const showModal = ()=>{
                wrapModalWindowForm.classList.remove('modal-visibility');
            };

            form.addEventListener('submit', (event)=> {
                event.preventDefault();
                if(valid.error.size > 0){
                    return event.preventDefault();
                }

                const formData = new FormData(form);
                const body = {};

                formData.forEach((elem, key)=> {
                    body[key] = elem;
                });
                
                postData(body)
                .then((response)=> {
                    wrapModalWindowForm.classList.add('modal-visibility');
                    if(response.status !== 200){
                        throw new Error(`status not defined: ${response.status}`);
                    }
                    setTimeout(showModal, 2000);
                })
                .catch((error)=> {
                    console.error(error);
                })
                .finally(()=> {
                    
                    form.querySelectorAll('input').forEach((item)=> {
                        item.value = '';
                    });
                });
            });

        };

        dataPreparation(form);

        const postData = (body)=> {
            
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };
};
export default sendForm;
