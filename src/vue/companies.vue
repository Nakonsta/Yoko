<template>
    <div class="section section--green section--marketplace">
        <div class="container">
            <div class="companies">
                <div class="companies__search">
                    <search
                            placeholder="Поиск по названию и инн компании"
                            v-model="searchQuery"
                            :canClear="true"
                            @search="getItems"
                    />
                </div>
                <div class="companies__head items__head">
                    <div class="tabs tabs--line">
                        <ul>
                            <li :class="{active: view === 'all'}"><a href="javascript:{}" @click="viewItems('all')">Все компании</a></li>
                            <li :class="{active: view === 'contractor'}"><a href="javascript:{}" @click="viewItems('contractor')">Поставщики</a></li>
                            <li :class="{active: view === 'buyer'}"><a href="javascript:{}" @click="viewItems('buyer')">Заказчики</a></li>
                        </ul>
                    </div>
                    <label class="items__head-checkbox checkbox">
                        <input type="checkbox" v-model="showSmall" @change="getItems">
                        <span class="checkbox__body"></span>
                        <span class="checkbox__text">Малый бизнес</span>
                    </label>
                    <label class="items__head-checkbox checkbox">
                        <input type="checkbox" v-model="showMedium" @change="getItems">
                        <span class="checkbox__body"></span>
                        <span class="checkbox__text">Средний бизнес</span>
                    </label>
                    <label class="items__head-checkbox checkbox">
                        <input type="checkbox" v-model="showLarge" @change="getItems">
                        <span class="checkbox__body"></span>
                        <span class="checkbox__text">Крупный бизнес</span>
                    </label>
                </div>
                <companiesList
                        :items="items"
                        :show-counters="true"
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
                />
            </div>
        </div>
    </div>
</template>

<script>
    import api from './helpers/api';
    import search from "./components/searchText.vue";
    import functions from "@/helpers/functions";
    import companiesList from "./components/companies/list.vue";

    export default {
        name: 'Companies',
        components: {
            search,
            companiesList,
        },
        mixins: [api],
        data: function() {
            return {
                loadingItems: false,
                perPage: 20,
                items: [],
                totalItems: 0,
                page: 1,
                searchQuery: '',
                view: 'all',
                showSmall: true,
                showMedium: true,
                showLarge: true,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalItems / this.perPage)
            },
        },
        watch: {
            view(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.getItems();
                }
            },
        },
        created() {
            this.getItems();
        },
        methods: {
            changePagination(page) {
                this.page = page;
                this.getItems();
            },
            viewItems(view) {
                this.view = view;
            },
            getItems(search = null) {
                this.cancelCompaniesRequest();
                this.loadingItems = true;
                let filter = {};
                window.openLoader();
                // пришли от поиска и с запросом
                if( search && search.length ) {
                    this.page = 1;
                    // filter.name = search;
                    filter.shortNameOrInn = search;
                    this.searchQuery = search;
                    this.view = 'all';
                    this.showSmall = true;
                    this.showMedium = true;
                    this.showLarge = true;
                }
                // чистим поиск
                if( search === false ) {
                    this.page = 1;
                    this.searchQuery = '';
                    this.view = 'all';
                    this.showSmall = true;
                    this.showMedium = true;
                    this.showLarge = true;
                }
                //
                if( this.searchQuery.length ) {
                    filter.shortNameOrInn = this.searchQuery;
                }
                filter.page = this.page;
                if (/*this.view === 'all' || */this.view === 'buyer') {
                    filter.buyer = true;
                }
                if (/*this.view === 'all' || */this.view === 'contractor') {
                    filter.contractor = true;
                }
                filter.businessSize = [];
                if (this.showSmall) {
                    filter.businessSize.push('SMALL');
                }
                if (this.showMedium) {
                    filter.businessSize.push('MEDIUM');
                }
                if (this.showLarge) {
                    filter.businessSize.push('LARGE');
                }
                if (!filter.businessSize.length || filter.businessSize.length === 3 ) {
                    delete filter.businessSize;
                } else {
                    filter.businessSize = filter.businessSize.join(',');
                }
                this.fetchCompanies(filter)
                    .then((response) => {
                        const items = response.data.data.elements;
                        if (!items.length && this.page > 1) {
                            // если ничего не получили и у нас НЕ первая страница - грузим предыдущую
                            this.changePagination(this.page-1);
                            return;
                        }
                        this.totalItems = response.data.data.totalElements;
                        this.perPage = response.data.data.perPage;
                        // получение статистики для полученых компаний
                        const companiesINN = [];
                        items.forEach((item, index) => {
                            // todo пока не делаем т.к. получение статистики для компаний всё равно не работает
                            // if (companiesINN.indexOf(items[index].inn) === -1) companiesINN.push(items[index].inn);
                            // todo убрать тестовые данные
                            item.amounts = [
                                {
                                    value: 1299792458,
                                    currency: 'rub',
                                },
                                {
                                    value: 92458,
                                    currency: 'usd',
                                },
                            ];
                            item.count_procedures = 300; // todo Поле «Количество завершённых процедур» - откуда брать?
                            item.count_products = 6; // todo Поле «Продукция» - откуда брать количество?
                            item.count_balances = 0; // todo Поле «Остатки» - откуда брать количество?
                        });
                        if (companiesINN.length) {
                            this.fetchProceduresCountByCompanies(companiesINN)
                                .then((response) => {
                                    const companies = response.data.data.data;
                                    companies.forEach((company) => {
                                        items.forEach((item) => {
                                            if (parseInt(company.inn) === parseInt(item.inn)) {
                                                item.amouts = company.procedures_prices || [];
                                                item.count_procedures = company.procedures_count || 0;
                                                item.count_products = company.count_products || 0; // todo Поле «Продукция» - откуда брать количество?
                                                item.count_balances = company.count_balances || 0; // todo Поле «Остатки» - откуда брать количество?
                                            }
                                        });
                                    });
                                    this.items = items;
                                    this.loadingItems = false;
                                    window.closeLoader();
                                })
                                .catch((e) => {
                                    console.log(e);
                                    this.items = items;
                                    this.loadingItems = false;
                                    window.closeLoader();
                                });
                        } else {
                            this.items = items;
                            this.loadingItems = false;
                            window.closeLoader();
                        }
                    })
                    .catch((e) => {
                        if (!axios.isCancel(e)) {
                            console.log(e);
                            window.notificationError('Ошибка сервера');
                            this.loadingItems = false;
                            window.closeLoader();
                        }
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/sass/variables/variables";
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";
    @import "../assets/sass/mixins/mq";

    .companies {
        &__search {
            margin: 0 0 rem(40px);
        }
        &__head {
            margin: 0 0 rem(16px);
            .tabs {
                margin: 0 auto rem(24px) 0;
                @include mq($until: desktop) {
                    width: 100%;
                    + .items__head-checkbox {
                        margin-left: 0;
                    }
                }
            }
            .items__head-checkbox {
                @include mq($from: tablet, $until: widescreen) {
                    margin-left: rem(32px);
                    width: auto;
                }
                @include mq($until: tablet) {
                    margin-left: 0;
                }
            }
        }
        .catalog-pagination {
            margin-top: rem(40px);
        }
    }
</style>