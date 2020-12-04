// Признак того что у нас есть javascript
document.documentElement.classList.add('js');

//Полифилы
import './modules/polyfill.js';

//ie-fix
import './modules/ie-fix.js';

//Отрытие/закрытие прелоадера
import './modules/global-loader.js';

import './modules/notifications';

//Отрытие/закрытие мобильного меню
import './modules/mobile-menu.js';

//борачивание в контейнер фрейм ютуба
import './modules/content-frame-fix';

import './modules/popups';

// sliders
import './modules/sliders';
import './modules/slider-info';
import './modules/slider-clients';
import './modules/slider-steps';
import './modules/slider-gallery-about';
import './modules/more';
import './modules/company';

// accordion
import './modules/accordion';

// tabs
import './modules/tabs';

// tooltips
import './modules/hint';

// dropdown
import './modules/dropdown';

/**
 * Полифил для object-fit
 */
objectFitImages($('.js-object-fill'));

/**
 * Полифил для svg
 */
svg4everybody();
