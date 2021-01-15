<template>
    <div class="catalog">
        <div class="catalog__flex">
            <div ref="filterContainer" class="catalog__filter">
                <filterList
                        :key="filterKey"
                        :loading="loadingFilter"
                        :filter="filter"
                        :currentFilter="currentFilter"
                        :filterContainer="this.$refs.filterContainer"
                        @changeFilter="changeFilter"
                />
            </div>
            <div class="catalog__body">
                <companiesTabs
                        :companies="companies"
                        :value="currentCompany"
                        @change="changeCompany"
                />
                <div class="catalog__search">
                    <search
                            placeholder="Найти кабель"
                            :canClear="true"
                            :loading="searchLoading"
                            :opened="searchOpened"
                            @search="getItems"
                            :dropdown="true"
                            @autocomplete="getAutocomplete"
                            :items="searchItems"
                    />
                </div>
                <catalogList
                        :isFirstLoad="isFirstLoad"
                        :loadingItems="loadingItems"
                        :catalog-item="items"
                        :totalProducts="totalItems"
                />
                <paginate
                        v-if="isFirstLoad && totalPages"
                        :page-count="totalPages"
                        :click-handler="pagination"
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
        </div>
    </div>
</template>

<script>
    import api from '../../../helpers/api'
    import companiesTabs from "@/components/blocks/companiesTabs";
    import filterList from "../../../components/blocks/filter.vue";
    import catalogList from "../../../components/catalog/list.vue";
    import search from "../../../components/searchText.vue";

    export default {
        name: 'App',
        components: {
            companiesTabs,
            filterList,
            catalogList,
            search,
        },
        mixins: [api],
        data() {
            return {
                searchQuery: '',
                isFirstLoad: false,
                loadingFilter: true,
                loadingItems: true,
                currentFilter: {},
                currentCompany: {},
                filter: [],
                filterKey: 0,
                items: [],
                totalItems: 0,
                weightFilter: [],
                perPage: 100,
                page: 1,
                searchCounter: null,
                searchLoading: false,
                searchOpened: false,
                searchItems: [],
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
                        companies = this.$store.getters.companyContractor;
                        break;
                }
                // обновляем фильтр - ставим нужную компанию
                if( companies.length ) {
                    this.currentCompany = companies[0];
                }
                return companies;
            },
        },
        created() {
            this.$emit('fullMode');
            let companies = this.companies; // run companies computed
            this.getFilterData();
        },
        methods: {
            pagination(page) {
                this.page = page
                this.cancelCatalogRequest()
                this.getItems()
            },
            changeCompany(company) {
                this.page = 1;
                this.currentFilter = {};
                this.currentCompany = company;
                this.getItems();
            },
            changeFilter() {
                this.page = 1
                this.totalProducts = -1
                this.cancelCatalogRequest()
                this.getItems()
            },
            getFilterData() {
                this.totalProducts = -1
                this.fetchFilter()
                    .then((responsive) => {
                        this.setFilterData(responsive.data.data)
                        this.getItems()
                        this.loadingFilter = false
                    })
                    .catch((e) => {
                        console.log(e)
                        this.loadingFilter = false
                    })
            },
            getItems(search = null) {
                this.loadingItems = true;
                this.searchOpened = false;
                if( search && search.length ) {
                    // чистим фильтр
                    this.page = 1;
                    this.currentFilter = {};
                    // перерисовываем фильтр
                    this.filterKey++;
                }
                // чистим поиск
                if( search === false ) {
                    // чистим фильтр
                    this.page = 1;
                    this.currentFilter = {};
                    // перерисовываем фильтр
                    this.filterKey++;
                }
                let filter = {
                    filter: this.currentFilter,
                };
                if( search && search.length ) {
                    filter.q = search;
                }
                if( this.companies.length && this.currentCompany) {
                    // this.currentFilter.company_inn = this.currentCompany.inn; // todo replace company id to inn
                    filter.company_id = this.currentCompany.id;
                }
                this.fetchCatalog(filter, this.page)
                    .then((data) => {
                        let total = data.data.data.total
                        let catalogItem = data.data.data.items
                        this.clearCatalog()
                        this.isFirstLoad = true
                        this.setCatalogData(catalogItem)
                        this.setTotalCounterProducts(total)
                        this.loadingItems = false
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            getAutocomplete(string) {
                clearInterval(this.searchCounter);
                this.searchOpened = false;
                this.searchLoading = false;
                if (string) {
                    this.searchCounter = setTimeout(() => {
                        this.searchLoading = true;
                        this.searchItems = [];
                        this.fetchListSearchCatalog(string, this.currentCompany ? this.currentCompany.id : 0)
                            .then((data) => {
                                this.searchItems = data.data.data;
                                this.searchOpened = true;
                                this.searchLoading = false;
                            })
                            .catch((e) => {
                                console.log(e);
                                this.searchLoading = false;
                            })
                    }, 1000);
                } else {
                    this.searchItems = [];
                }
            },
            setFilterData(data) {
                function parseObjToArr(obj) {
                    const arr = [];
                    for (const key in obj) {
                        arr.push({
                            id: obj[key],
                            name: obj[key],
                        });
                    }
                    return arr;
                }
                for( const block in data) {
                    data[block].type = 'checkbox';
                    data[block].values = parseObjToArr(data[block].values);
                }
                this.filter = data;
            },
            clearCatalog() {
                this.items = []
            },
            setCatalogData(data) {
                this.items = data
            },
            setTotalCounterProducts(total) {
                this.totalItems = total
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../../assets/sass/variables/fluid-variables";
    @import "../../../../assets/sass/mixins/fluid-mixin";
    @import "../../../../assets/sass/mixins/mq";

    .news-list__more {
        margin-top: rem(24px);
    }

    .catalog {
        &__flex {
            display: flex;
        }
        &__search {
            margin-bottom: rem(64px);
        }
        &__filter {
            width: rem(348px);
            flex: none;
            @include mq($until: tablet) {
                display: none;
            }
            .test-container.fullMode & {
                padding-top: rem(86px);
            }
        }
        &__body {
            width: calc(100% - #{rem(348px)});
            position: relative;
            @include mq($until: desktop) {
                width: 100%;
            }
        }
    }
</style>
