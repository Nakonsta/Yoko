//Полифилы
import './modules/polyfill.js'

//Отрытие/закрытие мобильного меню
import './modules/mobile-menu.js'

import './modules/news-detail-frame-fix'

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
