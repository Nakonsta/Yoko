<template>
    <div class="catalog">
        <div class="catalog__search">
            <search placeholder="Найти кабель" />
        </div>
        <div class="catalog__flex">
            <div ref="filterContainer" class="catalog__filter">
                <filterList
                    :loading="loadingFilter"
                    :filter="filter"
                    :currentFilter="currentFilter"
                    :filterContainer="this.$refs.filterContainer"
                    @changeFilter="changeFilter"
                />
            </div>
            <div class="catalog__body">
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
    import api from './helpers/api'
    import filterList from "./components/blocks/filter.vue";
    import catalogList from "./components/catalog/list.vue";
    import search from "./components/searchSelect.vue";

    export default {
        name: 'App',
        components: {
            filterList,
            catalogList,
            search,
        },
        mixins: [api],
        data() {
            return {
                isFirstLoad: false,
                loadingFilter: true,
                loadingItems: true,
                currentFilter: {},
                filter: [],
                items: [],
                totalItems: 0,
                weightFilter: [],
                perPage: 100,
                page: 1,
                tMark: 4,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalItems / this.perPage)
            },
        },
        created() {
            this.getFilterData()
        },
        methods: {
            pagination(page) {
                this.page = page
                this.cancelCatalogRequest()
                this.getCatalogData(this.currentFilter)
            },
            changeFilter() {
                this.page = 1
                this.totalProducts = -1
                this.cancelCatalogRequest()
                this.getCatalogData(this.currentFilter, true)
            },
            getFilterData() {
                this.totalProducts = -1
                this.fetchFilter()
                    .then((responsive) => {
                        this.setFilterData(responsive.data.data)
                        this.getCatalogData(null, true)
                        this.loadingFilter = false
                    })
                    .catch((e) => {
                        console.log(e)
                        this.loadingFilter = false
                    })
            },
            getCatalogData(filterValues = null) {
                this.loadingItems = true

                this.fetchCatalog(filterValues, this.page)
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
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";
    @import "../assets/sass/mixins/mq";

    .news-list__more {
        margin-top: rem(24px);
    }

    .catalog {
        &__flex {
            display: flex;
            margin-top: rem(64px);
        }
        &__filter {
            width: rem(276px);
            flex: none;
            transform: translateY(rem(-15px));
            @include mq($until: tablet) {
                display: none;
            }
        }
        &__body {
            width: 100%;
            position: relative;
        }
    }
</style>
