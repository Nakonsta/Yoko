let hash = window.location.hash.substr(1);

document.addEventListener('click', (e) => {
    let el = e.target;
    if( el.tagName !== 'A' || ! el.closest('.js-tabs') ) return;
    e.preventDefault();
    hash = el.getAttribute('href').substr(1);
    el.closest('.js-tabs').querySelectorAll('a').forEach((link) => {
        let tab = document.getElementById(link.getAttribute('href').substr(1));
        if( el === link ) {
            if( tab ) tab.style.display = '';
            link.closest('li').classList.add('active');
        } else {
            if( tab ) tab.style.display = 'none';
            link.closest('li').classList.remove('active');
        }
        // инициализируем изменение окна для пересчёта слайдеров, иерархии и всего прочего
        let resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(resizeEvent);
    });
    if( e.isTrusted ) {
        // ставим хеш ТОЛЬКО при реальном клике
        if (history.pushState) {
            window.history.pushState(null, null, '#' + hash);
        } else {
            window.location.hash = '#' + hash;
        }
    }
});

// инициализация при загрузке
document.querySelectorAll('.js-tabs').forEach((tabs) => {
    let link = tabs.querySelector('li a[href="#'+hash+'"]') || tabs.querySelector('li.active a') || tabs.querySelector('li:nth-child(1) a');
    if (link) {
        link.click();
    }
});

document.addEventListener('click', (e) => {
    let el = e.target;
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw > 767 || el.tagName !== 'A' || !el.closest('li.active')) return;
    e.preventDefault();
    el.closest('.js-tabs').classList.toggle('hover');
});