//https://css-tricks.com/container-adapting-tabs-with-more-button/
export function initTabs() {
    document.querySelectorAll('.js-more').forEach((container) => {
        const primary = container.querySelector('.js-more__items');
        const primaryItems = container.querySelectorAll('.js-more__item:not(.-more)');
        primary.classList.add('js-more--initialize');

        // insert "more" button and duplicate the list if need
        let moreLi = primary.querySelector('li.js-more__btn');
        if (!moreLi) {
            moreLi = document.createElement('li');
            moreLi.classList.add('js-more__btn');
        }
        let moreBtn = moreLi.querySelector('button');
        if (!moreBtn) {
            moreBtn = document.createElement('button');
            moreBtn.classList.add('js-more__more');
            moreBtn.setAttribute('type', 'button');
            moreBtn.setAttribute('aria-haspopup', 'true');
            moreBtn.setAttribute('aria-expanded', 'false');
            moreBtn.innerHTML = '<span>Еще...</span>';
            moreLi.appendChild(moreBtn);
        }
        let secondary = moreLi.querySelector('ul.js-more__secondary');
        if (!secondary) {
            secondary = document.createElement('ul');
            secondary.classList.add('js-more__secondary');
            secondary.innerHTML = primary.innerHTML;
            if (secondary.querySelector('.js-more__btn')) secondary.querySelector('.js-more__btn').remove();
            moreLi.appendChild(secondary);
        }
        primary.appendChild(moreLi);

        const secondaryItems = secondary.querySelectorAll('.js-more__item');
        const allItems = container.querySelectorAll('li');
        moreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.toggle('show-secondary');
            moreBtn.setAttribute('aria-expanded', container.classList.contains('show-secondary') ? 'true' : 'false');
        });

        function doAdapt() {
            allItems.forEach((item) => {
                item.classList.remove('hidden');
            });
            let stopWidth = $(moreLi).outerWidth();
            let hiddenItems = [];
            const primaryWidth = $(primary).outerWidth();
            primaryItems.forEach((item, i) => {
                if (primaryWidth >= stopWidth + $(item).width()) {
                    stopWidth += $(item).outerWidth();
                } else {
                    item.classList.add('hidden');
                    hiddenItems.push(i)
                }
            });
            if (!hiddenItems.length) {
                moreLi.classList.add('hidden');
                container.classList.remove('show-secondary');
                moreBtn.setAttribute('aria-expanded', 'false');
            } else {
                secondaryItems.forEach((item, i) => {
                    if (!hiddenItems.includes(i)) {
                        item.classList.add('hidden');
                    }
                });
            }
        }

        doAdapt(); // adapt immediately on load
        window.addEventListener('resize', doAdapt); // adapt on window resize

        document.addEventListener('click', (e) => {
            let el = e.target;
            while (el) {
                if (el === secondary || el === moreBtn) {
                    return;
                }
                el = el.parentNode;
            }
            container.classList.remove('show-secondary');
            moreBtn.setAttribute('aria-expanded', 'false');
        });

    });
}

initTabs();
