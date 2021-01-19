import { createPopper } from '@popperjs/core';

let tooltip = null,
    popperInstance = null;

document.body.addEventListener('mouseenter', function(e) {
    if( !e.target.classList.contains('hint') && !e.target.classList.contains('js-hint') ) return;
    console.log(e.target);
    let el = e.target,
        id = el.getAttribute('href') || el.getAttribute('data-tooltip') || '';
    id = id.indexOf('#') === 0 ? id.substr(1) : id;
    if( !id.length ) return;
    tooltip = document.getElementById(id);
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

    el.addEventListener('mouseleave', (e) => {
        if (tooltip) {
            tooltip.removeAttribute('data-show');
            tooltip = null;
        }
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
    }, {once : true});
}, true);

// document.querySelectorAll('.hint').forEach((el) => {
//     el.addEventListener('mouseenter', (e) => {
//         tooltip = document.getElementById(el.getAttribute('href').substr(1));
//         if( ! tooltip ) return;
//         tooltip.setAttribute('data-show', '');
//         popperInstance = createPopper(el, tooltip, {
//             placement: 'top',
//             strategy: 'fixed',
//             modifiers: [
//                 {
//                     name: 'offset',
//                     options: {
//                         offset: [4, 4],
//                     },
//                 },
//             ],
//         });
//     });
//
//     el.addEventListener('mouseleave', (e) => {
//         if (tooltip) {
//             tooltip.removeAttribute('data-show');
//             tooltip = null;
//         }
//         if (popperInstance) {
//             popperInstance.destroy();
//             popperInstance = null;
//         }
//     });
// });