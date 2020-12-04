document.addEventListener('click', function(e) {
    if( e.target.classList.contains('dropdown__value') ) {
        // переключаем выпадашку
        e.preventDefault();
        if( ! e.target.parentNode.classList.contains('opened') ) {
            document.querySelectorAll('.dropdown.opened').forEach((item) => {
                item.classList.remove('opened');
            });
            e.target.parentNode.classList.add('opened');
        } else {
            e.target.parentNode.classList.remove('opened');
        }
    } else if( e.target.closest('.dropdown__list') ) {
        // при выборе в выпадашке - прямем её
        e.preventDefault();
        e.target.closest('.dropdown').classList.remove('opened');
    } else {
        document.querySelectorAll('.dropdown.opened').forEach((item) => {
            item.classList.remove('opened');
        });
    }
});