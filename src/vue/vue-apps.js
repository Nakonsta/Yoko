import store from './store/index'

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

import InfiniteLoading from 'vue-infinite-loading'
Vue.component('InfiniteLoading', InfiniteLoading)

import Datepicker from 'vuejs-datepicker';
Vue.component('datepicker', Datepicker)

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

// труЪ маска, а не вот это вот всё...
import Inputmask from 'inputmask'
Inputmask.extendDefinitions({
    'x': {
        "validator": "[1-9]"
    },
});
Vue.directive('inputmask', {
    bind: function(el, binding) {
        Inputmask(binding.value).mask(el);
    }
});

import VCalendar from 'v-calendar'
Vue.use(VCalendar)

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

// Детальная страница марки
import markDetails from './mark-details.vue'
const descriptionMarkBlock = document.querySelector('#mark-details');
if (descriptionMarkBlock) {
    let appMark = new Vue({
        el: descriptionMarkBlock,
        store: store,
        render: function(h) { return h(markDetails); }
    })
}

// Регистрация
import Registration from './registration.vue'
const registrationBlock = document.querySelector('#registration');
if (registrationBlock) {
    let appRegistration = new Vue({
        el: registrationBlock,
        store: store,
        render: function(h) { return h(Registration); }
    })
}

// Котировки
import Quotes from './quotes.vue'
const quotesBlock = document.querySelector('#quotes');
if (quotesBlock) {
    let appQuotes = new Vue({
        el: quotesBlock,
        store: store,
        render: function(h) { return h(Quotes); }
    })
}

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

// Форма изменения пароля для востановления
import ForgotRestore from './forgot-restore.vue';
const forgotRestoreBlock = document.querySelector('#forgotRestore');
if (forgotRestoreBlock) {
    let forgotRestoreApp = new Vue({
        el: forgotRestoreBlock,
        store: store,
        render: function(h) { return h(ForgotRestore)}
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

// Продукция компании
import Products from './components/blocks/products.vue'
const products = document.querySelector('#products-info');
if (products) {
    let productsBlock = new Vue({
        el: products,
        store: store,
        render: function(h) { return h(Products); }
    })
}

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

// Проверка компании
import CompanyReports from './company-reports.vue'
const CompanyReportsBlock = document.querySelector('#company-reports');
if (CompanyReportsBlock) {
    let appCompanyReports = new Vue({
        el: CompanyReportsBlock,
        store: store,
        render: function(h) { return h(CompanyReports); }
    })
}

// Торговая площадка - Процедуры
import Marketplace from './marketplace.vue';
const marketplaceBlock = document.querySelector('#marketplace-procedures');
if (marketplaceBlock) {
    let marketplaceProceduresApp = new Vue({
        el: marketplaceBlock,
        store: store,
        render: function(h) { return h(Marketplace)}
    })
}

// Форма обратной связи
import MarketplaceItem from './marketplace-item.vue'
const tenderItem = document.querySelector('#marketplace-item');
if (tenderItem) {
    let tenderItemBlock = new Vue({
        el: tenderItem,
        store: store,
        render: function(h) { return h(MarketplaceItem); }
    })
}

// Личный кабинет
import Personal from './admin/personal.vue'
import personalRouter from './admin/router/index'
const personalItem = document.querySelector('#personal');
if (personalItem) {
    let tenderItemBlock = new Vue({
        el: personalItem,
        store: store,
        router: personalRouter,
        render: function(h) { return h(Personal); }
    })
}
