document.addEventListener('click', (e) => {
    let el = e.target;
    if( e.target.tagName !== 'A' || ! e.target.closest('.js-tabs') ) return;
    e.preventDefault();
    e.target.closest('.js-tabs').querySelectorAll('a').forEach((link) => {
        let tab = document.getElementById(link.getAttribute('href').slice(1));
        if( el === link ) {
            if( tab ) tab.style.display = '';
            link.closest('li').classList.add('active');
        } else {
            if( tab ) tab.style.display = 'none';
            link.closest('li').classList.remove('active');
        }
    })
});

// инициализация при загрузке
document.querySelectorAll('.js-tabs').forEach((tabs) => {
    let link = tabs.querySelector('li.active a') || tabs.querySelector('li:nth-child(1) a');
    if (link) {
        link.click();
    }
});