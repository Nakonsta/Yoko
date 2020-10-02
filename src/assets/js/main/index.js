//Полифилы
import './modules/polyfill.js'

//ie-fix
import './modules/ie-fix.js'

//Отрытие/закрытие мобильного меню
import './modules/mobile-menu.js'

//борачивание в сонтейнер фрейм ютуба
import './modules/content-frame-fix'

import './modules/popups'

// sliders
import './modules/slider-advantages';
import './modules/slider-gallery-about'
import './modules/more-button-menu'
/**
 * Полифил для object-fit
 */
objectFitImages($('.js-object-fill'));


/**
 * Полифил для svg
 */
svg4everybody();
