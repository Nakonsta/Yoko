import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

import InfiniteLoading from 'vue-infinite-loading'
Vue.component('InfiniteLoading', InfiniteLoading)

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

// validate
import {configure, setInteractionMode, ValidationObserver, ValidationProvider, extend, localize} from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru.json';
import * as rules from 'vee-validate/dist/rules';
setInteractionMode('eager');
// install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
localize('ru', ru);
// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
// Classes
configure({
    classes: {
        valid: 'valid',
        invalid: 'error',
    }
});

// Каталог
import Catalog from './catalog.vue'
const catalogBlock = document.querySelector('#catalog');
if (catalogBlock) {
    let appCatalog = new Vue({
        el: catalogBlock,
        render: function(h) { return h(Catalog); }
    })
}

// Форма авторизции
import Singin from './singin.vue'
const singinBlock = document.querySelector('#singin .popup__content-container');
if (singinBlock) {
    let singinApp = new Vue({
        el: singinBlock,
        render: function(h) { return h(Singin)}
    })
}

// Форма востановления пароля
import Forgot from './forgot.vue'
const forgotBlock = document.querySelector('#forgot .popup__content-container');
if (forgotBlock) {
    let forgotApp = new Vue({
        el: forgotBlock,
        render: function(h) { return h(Forgot)}
    })
}

// Форма на странице Заказчикам
import CustomersForm from './customers.vue'
const customersForm = document.querySelector('#customers-form');
if (customersForm) {
    let appCustomersForm = new Vue({
        el: customersForm,
        render: function(h) { return h(CustomersForm); }
    })
}
