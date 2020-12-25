<template>
    <div class="marketplace">
        <router-link class="btn marketplace__add" to="/personal/procedures/new" v-if="this.$store.getters.userRole === 'buyer'">Создать процедуру</router-link>
        <div class="marketplace__flex">
            <div class="marketplace__filter" ref="filterContainer">
                <filterList
                        :key="filterKey"
                        :mobileWidth=1023
                        :loading="loadingFilter"
                        :filter="filter"
                        :currentFilter="currentFilter"
                        :filterContainer="this.$refs.filterContainer"
                        :full="true"
                        @changeFilter="changeFilter"
                        @searchCompanies="searchCompanies"
                />
            </div>
            <div class="marketplace__body">
                <router-link to="/personal/procedures/new" class="btn" v-if="this.$store.getters.userRole === 'buyer'">Создать новую процедуру</router-link>
                <div class="tabs tabs--line" v-if="companies.length">
                    <ul>
                        <li v-for="company in companies" :key="company.id" :class="{active: company.inn === currentCompany.inn}"><a href="javascript:{}" @click="changeCompany($event, company)">{{ company.name }}</a></li>
                    </ul>
                </div>
                <div class="marketplace__search">
                    <search
                            placeholder="Номер или название торговой процедуры"
                            v-model="searchQuery"
                            :canClear="true"
                            @search="getItems"
                    />
                </div>
                <marketplaceList
                        :itemsTypes="itemsTypes"
                        :itemsFormats="itemsFormats"
                        :itemsStatuses="itemsStatuses"
                        :isFirstLoad="isFirstLoad"
                        :loading="loadingItems"
                        :items="items"
                        :totalItems="totalItems"
                        :currentFilter="currentFilter"
                        :currentOrder="currentOrder"
                        @changeFilter="changeFilter"
                        @getItems="getItems"
                />
                <paginate
                        v-if="isFirstLoad && totalPages"
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
    import api from '../../../helpers/api';
    import search from "../../../components/searchText.vue";
    import filterList from "../../../components/blocks/filter.vue";
    import marketplaceList from "../../../components/marketplace/list.vue";
    import formatDate from '../../../helpers/formatDate';

    export default {
        name: 'Procedures',
        components: {
            search,
            filterList,
            marketplaceList,
        },
        mixins: [api, formatDate],
        props: {
            type: {
                default: 'list',
                type: String,
            }
        },
        data: function() {
            return {
                searchQuery: '',
                isFirstLoad: false,
                loadingFilter: true,
                loadingItems: true,
                currentFilter: {},
                currentOrder: {
                    by: 'publication_date',
                    direction: 'ASC',
                },
                itemsTypes: [],
                itemsFormats: [],
                itemsStatuses: [],
                filter: [],
                filterKey: 0,
                perPage: 10,
                items: [],
                totalItems: 0,
                page: 1,
                currentCompany: null,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalItems / this.perPage)
            },
            companies() {
                // список компаний пользователя
                let companies = [];
                switch( this.$store.getters.userRole ) {
                    case 'buyer':
                        companies = this.$store.getters.companyBuyer;
                        break;
                    case 'contractor':
                        if (this.type === 'applications') {
                            companies = this.$store.getters.companyContractor;
                        }
                        break;
                }
                // обновляем фильтр - ставим нужную компанию
                if( companies.length ) {
                    this.currentCompany = companies[0];
                    this.currentFilter.inn = [this.currentCompany.inn];
                }
                return companies;
            },
        },
        watch: {
            $route(to, from) {
                this.init();
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.$emit('fullMode');
                let companies = this.companies; // run companies computed
                let params = new URLSearchParams(window.location.search.substring(1));
                this.searchQuery = params.get('q') || '';
                if( this.searchQuery.length ) {
                    // если в урле есть запрос для поиска - ставим его
                    this.currentFilter.q = this.searchQuery;
                }
                function parseObjToArr(obj) {
                    const arr = [];
                    for (const key in obj) {
                        arr.push({
                            id: key,
                            name: obj[key],
                        });
                    }
                    return arr;
                }
                this.filter = [];
                this.fetchMarketplaceProceduresFilter()
                    .then((response) => {
                        let filterData = response.data.data.procedures;
                        this.filter.push({
                            id: 'tender_trading_type',
                            value: 'Тип процедуры',
                            type: 'checkbox',
                            values: parseObjToArr(filterData.values.tender_trading_type),
                        });
                        this.filter.push({
                            id: 'publication_date',
                            value: 'Дата размещения',
                            type: 'period',
                            values: '',
                        });
                        if (this.type !== 'drafts') {
                            // не выводим в фильтр статусы для черновиков
                            this.filter.push({
                                id: 'status',
                                value: 'Статус',
                                type: 'checkbox',
                                values: parseObjToArr(filterData.values.status),
                            });
                        }
                        this.filter.push({
                            id: 'tender_trading_format',
                            value: 'Формат',
                            type: 'checkbox',
                            values: parseObjToArr(filterData.values.tender_trading_format),
                        });
                        this.itemsTypes = parseObjToArr(filterData.values.tender_trading_type);
                        this.itemsFormats = parseObjToArr(filterData.values.tender_trading_format);
                        this.itemsStatuses = parseObjToArr(filterData.values.status);
                        this.loadingFilter = false;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.loadingFilter = false;
                    });
                if (!this.companies.length) {
                    // если у нас список процедур ДЛЯ компаний - не добавляем в фильтр компании и регион ибо не имеет смысла
                    this.fetchRegions()
                        .then((response) => {
                            this.filter.push({
                                type: 'select',
                                id: 'region_id',
                                value: 'Регион',
                                placeholder: 'Выбрать регион',
                                values: response.data.data,
                                currentValues: [],
                            });
                        })
                        .catch((e) => {
                            console.log(e)
                        });
                    this.filter.push({
                        type: 'search',
                        id: 'company_id',
                        value: 'Компания',
                        placeholder: 'Выбрать компанию',
                        values: [],
                        currentValues: [],
                        search: 'searchCompanies',
                        loading: false,
                    });
                }
                this.getItems();
            },
            changePagination(page) {
                this.page = page;
                this.getItems();
            },
            changeCompany(evt, company) {
                evt.preventDefault();
                this.page = 1;
                this.currentFilter = {};
                this.currentCompany = company;
                this.currentFilter.inn = [this.currentCompany.inn];
                this.getItems();
            },
            changeFilter() {
                this.page = 1;
                this.getItems();
            },
            parseFilter() {
                const newFilter = {};
                for (const keyC in this.currentFilter) {
                    if (!Array.isArray(this.currentFilter[keyC])) {
                        newFilter[keyC] = this.currentFilter[keyC];
                    } else {
                        for (const key in this.currentFilter[keyC]) {
                            if (
                                Array.isArray(this.currentFilter[keyC][key])
                                    ? this.currentFilter[keyC][key].length
                                    : this.currentFilter[keyC][key]
                            ) {
                                if (newFilter[keyC]) {
                                    newFilter[keyC][key] = this.currentFilter[keyC][key];
                                } else {
                                    // newFilter[keyC] = {};
                                    // newFilter[keyC][key] = this.currentFilter[keyC][key];
                                    newFilter[keyC] = [];
                                    newFilter[keyC].push(this.currentFilter[keyC][key]);
                                }
                            }
                        }
                    }
                }
                // Форматирование дат
                if (newFilter.publication_date_from) {
                    newFilter.publication_date_from = this.formatDateForFilter(
                        newFilter.publication_date_from,
                    );
                }
                if (newFilter.publication_date_to) {
                    newFilter.publication_date_to = this.formatDateForFilter(
                        newFilter.publication_date_to,
                    );
                }
                return newFilter;
            },
            getItems(search = null) {
                this.cancelMarketplaceProceduresRequest();
                this.loadingItems = true;
                this.items = [];
                // пришли от поиска и с запросом
                if( search && search.length ) {
                    // чистим фильтр
                    this.page = 1;
                    let showing = this.currentFilter.showing || 'all';
                    this.currentFilter = {};
                    this.currentFilter.showing = showing;
                    if( this.companies.length ) {
                        this.currentFilter.inn = [this.currentCompany.inn];
                    }
                    this.currentFilter.q = search;
                    // перерисовываем фильтр
                    this.filterKey++;
                }
                // чистим поиск
                if( search === false ) {
                    // чистим фильтр
                    this.page = 1;
                    let showing = this.currentFilter.showing || 'all';
                    this.currentFilter = {};
                    this.currentFilter.showing = showing;
                    if( this.companies.length ) {
                        this.currentFilter.inn = [this.currentCompany.inn];
                    }
                    // перерисовываем фильтр
                    this.filterKey++;
                }
                let filter = {
                    draft: this.$store.getters.userRole === 'buyer' && this.type === 'drafts',
                    has_applications: this.$store.getters.userRole === 'contractor' && this.type === 'applications',
                    filter: this.parseFilter(),
                    order: this.currentOrder,
                };
                this.fetchMarketplaceProcedures(filter, this.page)
                    .then((data) => {
                        this.isFirstLoad = true;
                        const items = data.data.data.items;
                        if (!items.length && this.page > 1) {
                            // если ничего не получили и у нас НЕ первая страница - грузим предыдущую
                            this.changePagination(this.page-1);
                            return;
                        }
                        const companiesINN = [];
                        this.totalItems = data.data.data.total;
                        /* TODO: переделать запрос детальной информации о компании через новый роут (Отправка массива id компаний)
                            Сделать чтобы названия компаний добавлялись реактивно к уже выведенному списку компаний
                         */
                        items.forEach((item, index) => {
                            items[index].company = null;
                            if (companiesINN.indexOf(items[index].inn) === -1) companiesINN.push(items[index].inn);
                        });
                        if (companiesINN.length) {
                            this.fetchCompaniesByINN(companiesINN)
                                .then((response) => {
                                    const companies = response.data.data.elements;
                                    companies.forEach((company) => {
                                        items.forEach((item) => {
                                            if (parseInt(company.inn) === parseInt(item.inn)) {
                                                item.company = company;
                                            }
                                        });
                                    });
                                })
                                .catch((e) => {
                                    console.log(e)
                                });
                        }
                        items.forEach((item, index) => {
                            items[index].isExpanded = false;
                        });
                        this.items = items;
                        this.loadingItems = false;
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            searchCompanies(index, q) {
                clearInterval(this.searchCompanyCounter);
                if (q) {
                    this.cancelCompaniesRequest();
                    this.searchCompanyCounter = setTimeout(() => {
                        this.filter[index].loading = true;
                        this.fetchCompaniesByName(q)
                            .then((response) => {
                                this.filter[index].loading = false;
                                this.filter[index].values = response.data.data.elements;
                            })
                            .catch((e) => {
                                console.log(e);
                                this.filter[index].loading = false;
                                this.filter[index].values = [];
                            });
                    }, 1000);
                } else {
                    this.filter[index].values = [];
                }
            },
        }
    }
</script>

<style lang="scss">
    @import "../../../../assets/sass/variables/variables";
    @import "../../../../assets/sass/variables/fluid-variables";
    @import "../../../../assets/sass/mixins/fluid-mixin";
    @import "../../../../assets/sass/mixins/mq";

    .marketplace {
        padding: 0 !important;
        background: transparent !important;
        &__add {
            display: none;
            margin: 0 0 rem(24px);
            width: 100%;
            //@include mq($from: tablet) {
            //    display: none;
            //}
        }
        &__search {
            margin: 0 0 rem(64px);
        }
        &__flex {
            display: flex;
            justify-content: space-between;
        }
        &__filter {
            width: 348px;
            @include mq($until: desktop) {
                display: none;
            }
            .test-container.fullMode & {
                padding-top: rem(86px);
            }
        }
        &__body {
            width: calc(100% -  348px);
            @include mq($until: desktop) {
                width: 100%;
            }
            > .btn {
                margin: 0 0 rem(40px);
                @include mq($until: desktop) {
                    float: right;
                }
                @include mq($until: tablet) {
                    float: none;
                    display: block;
                }
            }
            > .tabs {
                @include mq($until: desktop) {
                    clear: both;
                }
            }
        }
    }
</style>
