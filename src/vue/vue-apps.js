import store from './store/index'

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

import InfiniteLoading from 'vue-infinite-loading'
Vue.component('InfiniteLoading', InfiniteLoading)

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

// validate
import {configure, setInteractionMode, ValidationObserver, ValidationProvider, extend, localize} from 'vee-validate'
import customRules from './helpers/custom-rules'
import ru from 'vee-validate/dist/locale/ru.json';
import * as rules from 'vee-validate/dist/rules';
setInteractionMode('eager');
// install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
for (const key in customRules) {
    extend(key, customRules[key])
}
localize('ru', ru);
// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
// Classes
configure({
    classes: {
        valid: 'valid',
        invalid: 'error',
        events: 'input',
    }
});

// Каталог
import Catalog from './catalog.vue'
const catalogBlock = document.querySelector('#catalog');
if (catalogBlock) {
    let appCatalog = new Vue({
        el: catalogBlock,
        store: store,
        render: function(h) { return h(Catalog); }
    })
}

// Форма авторизции
import Singin from './singin.vue'
const singinBlock = document.querySelector('#singin .popup__content-container');
if (singinBlock) {
    let singinApp = new Vue({
        el: singinBlock,
        store: store,
        render: function(h) { return h(Singin)}
    })
}

// Форма востановления пароля
import Forgot from './forgot.vue'
const forgotBlock = document.querySelector('#forgot .popup__content-container');
if (forgotBlock) {
    let forgotApp = new Vue({
        el: forgotBlock,
        store: store,
        render: function(h) { return h(Forgot)}
    })
}

// Форма на странице Заказчикам / Поставщикам
import Feedback from './feedback.vue'
const feedback = document.querySelector('#feedback');
if (feedback) {
    let appFeedback = new Vue({
        el: feedback,
        store: store,
        render: function(h) { return h(Feedback); }
    })
}

// Форма обратной связи
import Support from './support.vue'
const support = document.querySelector('#support');
if (support) {
    let supportBlock = new Vue({
        el: support,
        store: store,
        render: function(h) { return h(Support); }
    })
}

// Информация об авторизованном пользователе в хедере десктоп и кнопки вход и регистрация
import HeaderLoginStatus from './headerLoginStatus.vue'
const headerLoginStatus = document.querySelectorAll('.header-login-status');
headerLoginStatus.forEach((el) => {
    new Vue({
        el: el,
        store: store,
        render: function(h) { return h(HeaderLoginStatus); }
    })
})
// if (headerLoginStatus) {
//     let headerLoginStatusBlock = new Vue({
//         el: headerLoginStatus,
//         store: store,
//         render: function(h) { return h(HeaderLoginStatus); }
//     })
// }

// Структура компании
import Structure from './components/blocks/structure.vue'
const structure = document.querySelector('#structure');
if (structure) {
    let structureBlock = new Vue({
        el: structure,
        // store: store,
        render: function(h) { return h(Structure); }
    })
}