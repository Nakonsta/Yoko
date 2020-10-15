<template>
    <div class="catalog">
        <div class="catalog__search">
            <search />
        </div>
        <div class="catalog__flex">
            <div ref="filterContainer" class="catalog__filter">
                <filterBlock
                    :loading="loadingFilter"
                    :filter="filter"
                    :currentFilter="currentFilter"
                    :filterContainer="this.$refs.filterContainer"
                    @changeFilter="changeFilter"
                />
            </div>
            <div class="catalog__body">
                <catalogBlock
                    :isFirstLoad="isFirstLoad"
                    :loadingCatalog="loadingCatalog"
                    :catalog-item="catalog"
                    :totalProducts="totalProducts"
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
    import filterBlock from "./components/filter.vue";
    import catalogBlock from "./components/catalog.vue";
    import search from "./components/search.vue";

    export default {
        name: 'App',
        components: {
            filterBlock,
            catalogBlock,
            search,
        },
        mixins: [api],
        data() {
            return {
                isFirstLoad: false,
                loadingFilter: true,
                loadingCatalog: true,
                currentFilter: {},
                filter: [],
                catalog: [],
                totalProducts: 0,
                weightFilter: [],
                page: 1,
                tMark: 4,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalProducts / 100)
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
                    .then((data) => {
                        this.setFilterData(data.data.data)
                        this.getCatalogData(null, true)
                        this.loadingFilter = false
                    })
                    .catch((e) => {
                        console.log(e)
                        this.loadingFilter = false
                    })
            },
            getCatalogData(filterValues = null) {
                this.loadingCatalog = true

                this.fetchCatalog(filterValues, this.page)
                    .then((data) => {
                        let total = data.data.data.total
                        let catalogItem = data.data.data.items

                        this.clearCatalog()

                        this.isFirstLoad = true

                        this.setCatalogData(catalogItem)
                        this.setTotalCounterProducts(total)

                        this.loadingCatalog = false
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            setFilterData(data) {
                this.filter = data
            },
            clearCatalog() {
                this.catalog = []
            },
            setCatalogData(data) {
                this.catalog = data
            },
            setTotalCounterProducts(total) {
                this.totalProducts = total
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";

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
            @media(max-width: 768px) {
                display: none;
            }
        }
        &__body {
            width: 100%;
            position: relative;
        }
    }
</style>
