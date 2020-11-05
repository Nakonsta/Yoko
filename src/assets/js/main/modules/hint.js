import { createPopper } from '@popperjs/core';

let tooltip = null,
    popperInstance = null;

document.querySelectorAll('.hint').forEach((el) => {
    el.addEventListener('mouseenter', (e) => {
        tooltip = document.getElementById(el.getAttribute('href').substr(1));
        if( ! tooltip ) return;
        tooltip.setAttribute('data-show', '');
        popperInstance = createPopper(el, tooltip, {
            placement: 'top',
            strategy: 'fixed',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [4, 4],
                    },
                },
            ],
        });
    });

    el.addEventListener('mouseleave', (e) => {
        if (tooltip) {
            tooltip.removeAttribute('data-show');
            tooltip = null;
        }
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
    });
});