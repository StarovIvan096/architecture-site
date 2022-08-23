'use strict';
// const dataProcessing = ()=> {
    class Validator{
        constructor({selector, pattern = {}, method}){
            this.form = document.querySelector(selector);
            this.selector = selector;
            this.pattern = pattern;
            this.method = method; 
            this.elementForm = [...this.form.elements].filter((item)=> {
                return item.tagName.toLowerCase() !== 'button' && item.type !== 'button' && item.id !== 'text-message';
            });
            this.error = new Set();
        }

        init(){
            
            this.setPattern();
            this.elementForm.forEach((elem)=> {
                elem.addEventListener('change', this.checkIt.bind(this));
            });
            this.form.addEventListener('submit', (event)=> {
                this.elementForm.forEach((elem)=> {
                    this.checkIt({target: elem});
                });
                if(this.error.size){
                    event.preventDefault();
                }
            });
        }

        isValid(elem){
            const validatorMethod = {
                notEmpty(elem){
                    if(elem.value.trim() === ''){
                        return false;
                    }
                    return true;
                },

                pattern(elem, pattern){
                    // console.log(pattern);
                    return pattern.test(elem.value);
                }
            };

            const method = this.method[elem.id];
            if(method){
                return method.every((item)=> {
                    return validatorMethod[item[0]](elem, this.pattern[item[1]]);
                });
            }

            return true;
        }

        checkIt(event){
            
            const target = event.target;
            if(this.isValid(target)){
                
                this.showSuccess(target);
                this.error.delete(target);
            } else {
                this.showError(target);
                this.error.add(target);
            }
        }

        showError(elem){
            elem.classList.add('error');
        }

        showSuccess(elem){
            elem.classList.remove('error');
        }

        setPattern(){
            if(!this.pattern.name){
                this.pattern.name =  /[A-Za-zА-Яа-я]/;
            }
            if(!this.pattern.number){
                this.pattern.number =  /^\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/;
            }
            if(!this.pattern.email){
                this.pattern.email =  /\w*\@\w*\.[a-z]{2,3}$/;
            }
        }
    }
// };

// export default dataProcessing;