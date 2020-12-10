document.querySelectorAll('.js-search').forEach((form)=>{
    let input = form.querySelector('input[type="text"]'),
        minLength = parseInt(input.getAttribute('data-minlength')) || 1;
        inputClean = form.querySelector('a');
    form.addEventListener('submit', (e) => {
        if( input.value.length < minLength ) {
            e.preventDefault();
            input.focus();
        }
    });
    input.addEventListener('input', (e) => {
        if( input.value.length ) {
            inputClean.style.display = 'block';
        } else {
            inputClean.style.display = 'none';
        }
    });
    inputClean.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        inputClean.style.display = 'none';
    });
});