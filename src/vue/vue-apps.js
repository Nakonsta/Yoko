import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

import InfiniteLoading from 'vue-infinite-loading'
Vue.component('InfiniteLoading', InfiniteLoading)

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

import Catalog from './catalog.vue'

const catalogBlock = document.querySelector('#catalog');

if (catalogBlock) {
    let app = new Vue({
        el: catalogBlock,
        render: function(h) { return h(Catalog); }
    })
}
