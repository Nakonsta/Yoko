<template>
    <div class="products">
        <productsFilter
                @changeFilter="changeFilter"
                @resetFilter="resetFilter"
        />
        <productsList
                :items="items"
                :loading="loadingItems"
        />
        <paginate
                v-if="totalPages"
                :page-count="totalPages"
                :click-handler="changePagination"
                prev-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                next-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                :prev-class="'catalog-pagination__prev'"
                :next-class="'catalog-pagination__next'"
                :container-class="'catalog-pagination'"
                :page-class="'catalog-pagination__item'"
                :value="page"
        >
        </paginate>
    </div>
</template>

<script>
import api from '@/helpers/api'
import functions from '@/helpers/functions'
import productsFilter from '@/components/products/filter'
import productsList from '@/components/products/list'

export default {
    name: 'companyProducts',

    components: {
        productsFilter,
        productsList
    },

    mixins: [api, functions],

    data() {
        return {
            loadingItems: false,
            perPage: 8,
            items: [],
            totalItems: 0,
            page: 1,
            companyId: null,
            currentFilter: {
                q: null,
                company: null,
                quantity: {
                    from: null,
                    to: null,
                },
                price: {
                    from: null,
                    to: null,
                }
            },
        }
    },

    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage)
        },
    },

    created() {
        this.fillUserData();
        this.getItems();
    },

    methods: {
        changePagination(page) {
            this.page = page;
            this.getItems();
        },
        fillUserData() {
            this.companyId = document.querySelector('.section--company').getAttribute('data-id');
        },
        getItems() {
            this.cancelCompanyRequest();
            this.loadingItems = true;
            const companyInfo = {
                company_id: this.companyId,
                page: this.page,
                filter: this.currentFilter
            };
            const fData = this.objectToFormData(companyInfo);
            this.fetchCompany(fData)
                .then((response) => {
                    this.items = response.data.data.items;
                    this.totalItems = response.data.data.total;
                    this.loadingItems = false;
                })
                .catch((e) => {
                    if (!axios.isCancel(e)) {
                        console.log(e);
                        window.notificationError('Ошибка сервера');
                        this.loadingItems = false;
                    }
                });
        },
        changeFilter(filtersData) {
            this.page = 1;
            this.currentFilter.q = (filtersData.cable ? filtersData.cable.title.toString() : null) || null;
            this.currentFilter.company = (filtersData.company ? filtersData.company.id : null) || null;
            this.currentFilter.quantity.from = filtersData.metresFrom || null;
            this.currentFilter.quantity.to = filtersData.metresTo || null;
            this.currentFilter.price.from = filtersData.priceFrom || null;
            this.currentFilter.price.to = filtersData.priceTo || null;
            this.getItems();
        },
        resetFilter() {
            this.page = 1;
            this.currentFilter = {
                q: null,
                company: null,
                quantity: {
                    from: null,
                    to: null,
                },
                price: {
                    from: null,
                    to: null,
                }
            };
            this.getItems();
        },
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/sass/variables/variables";
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";
    @import "../assets/sass/mixins/mq";
</style>