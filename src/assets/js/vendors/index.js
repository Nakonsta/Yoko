import * as jquery from 'jquery';
global.$ = global.jQuery = jquery;

import Toastify from 'toastify-js';
window.Toastify = Toastify

import "core-js";

import Cookies from 'js-cookie'
window.Cookies = Cookies

import axios from 'axios';
global.axios = axios;

import Vue from 'vue/dist/vue.esm';
global.Vue = Vue;

import "./modules/glightbox-ie11";

const  lightbox  =  GLightbox ( {
    touchNavigation : true,
    loop : true,
    autoplayVideos : true,
    plyr: {
        config: {
            ratio: '16:9', // or '4:3'
            muted: false,
            hideControls: true,
            youtube: {
                noCookie: true,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3
            },
            vimeo: {
                byline: false,
                portrait: false,
                title: false,
                speed: true,
                transparent: false
            }
        }
    }
} ) ;


//owl-carousel, через import не работает. см. - https://github.com/OwlCarousel2/OwlCarousel2/issues/2206
// window.fn = require('./modules/owl.carousel.min');
import './modules/magnific-popup';
import './modules/jquery.formstyler.min';
import './modules/jquery.inputmask.min';
import './modules/jquery.validate.min';
import './modules/jquery.validate.additional-methods.min';
import './modules/tooltipster.bundle.min.js';
import './modules/jquery.scrollbar.min.js';

import GLightbox from 'glightbox';
global.GLightbox = GLightbox;

import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);
global.Swiper = Swiper;

import webkitLineClamp from 'webkit-line-clamp';
global.webkitLineClamp = webkitLineClamp;
import svg4everybody from 'svg4everybody';
global.svg4everybody = svg4everybody;
import objectFitImages from 'object-fit-images';
global.objectFitImages = objectFitImages;




