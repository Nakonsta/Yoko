import * as jquery from 'jquery';
global.$ = global.jQuery = jquery;

import "core-js";

//owl-carousel, через import не работает. см. - https://github.com/OwlCarousel2/OwlCarousel2/issues/2206
window.fn = require('./modules/owl.carousel.min');
import './modules/magnific-popup';
import './modules/jquery.formstyler.min';
import './modules/jquery.inputmask.min';
import './modules/jquery.validate.min';
import './modules/jquery.validate.additional-methods.min';
import './modules/tooltipster.bundle.min.js';
import './modules/jquery.scrollbar.min.js';
import './modules/slick.min.js';
import webkitLineClamp from 'webkit-line-clamp';
global.webkitLineClamp = webkitLineClamp;
import svg4everybody from 'svg4everybody';
global.svg4everybody = svg4everybody;
import objectFitImages from 'object-fit-images';
global.objectFitImages = objectFitImages;



