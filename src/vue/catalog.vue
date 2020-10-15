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
                    @moreTypeMark="moreTypeMark"
                />
<!--                <InfiniteLoading-->
<!--                    v-if="catalog.length"-->
<!--                    @infinite="infiniteHandler"-->
<!--                >-->
<!--                </InfiniteLoading>-->
<!--                <div-->
<!--                    v-if="loadingCatalog"-->
<!--                    class="catalog__loader"-->
<!--                    :class="{-->
<!--                        'catalog__loader&#45;&#45;absolute': isFirstLoad-->
<!--                    }"-->
<!--                >-->
<!--                    <div class="preloader">-->
<!--                        <div class="preloader__preloader">-->
<!--                            <div class="preloader__loader"></div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="isFirstLoad"-->
<!--                    class="news-list__more"-->
<!--                    @click="more"-->
<!--                >-->
<!--                    Загрузить ещё-->
<!--                </div>-->
                <paginate
                    v-if="isFirstLoad"
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
                return Math.ceil(this.weightFilter.values.length / this.tMark)
            },
            pageWeightFilter() {
                const index = (this.page - 1) * this.tMark
                return this.weightFilter.values.slice(index, index + this.tMark)
            },
        },
        created() {
            this.getFilterData()
        },
        methods: {
            moreTypeMark(typeMark) {
                this.fetchCatalog(this.currentFilter, typeMark.page)
                    .then((response) => {
                        const markItems = response.data.data.items
                        markItems.forEach((item) => {
                            typeMark.items.push(item)
                        })
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            infiniteHandler(infiniteState) {
                console.log(111)
                infiniteState.complete();
            },
            pagination(page) {
                this.page = page
                this.cancelCatalogRequest()
                this.getCatalogData(this.currentFilter)
            },
            more() {
                this.page += 1
                this.cancelCatalogRequest()
                this.getCatalogData(this.currentFilter)
            },
            changeFilter() {
                this.page = 1
                this.cancelCatalogRequest()
                this.getCatalogData(this.currentFilter, true)
            },
            getWeightFilter() {
                let weightFilter = null

                this.filter.forEach((item, index) => {
                    for (const currentFilterKey in this.currentFilter) {
                        if (item.id === currentFilterKey) {
                            if (index < this.filter.length - 1) {
                                weightFilter = this.filter[index + 1]
                            } else {
                                weightFilter = JSON.parse(JSON.stringify(this.filter[index]))
                                weightFilter.values = this.currentFilter[currentFilterKey]
                            }
                        }
                    }
                })

                return weightFilter ? weightFilter : this.filter[0]
            },
            getGroup(property, value) {
                return {
                    property: property,
                    value: value,
                }
            },
            getFilterData() {
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
                this.weightFilter = this.getWeightFilter()

                this.loadingCatalog = true
                this.totalProducts = -1

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

                // this.pageWeightFilter.forEach((value) => {
                //     const group = this.getGroup(this.weightFilter.id, value)
                //
                //     this.fetchTotalCatalog(group, filterValues)
                //         .then((data) => {
                //             const total = data.data.data.total
                //
                //             this.setTotalCounterProducts(total)
                //         })
                //         .catch((e) => {
                //             console.log(e)
                //         })
                //
                //     this.fetchCatalog(group, filterValues)
                //         .then((data) => {
                //             let catalogItem = data.data.data
                //
                //             catalogItem.group = group
                //
                //             this.setCatalogData(catalogItem)
                //
                //             this.loadingCatalog = false
                //         })
                //         .catch((e) => {
                //             console.log(e)
                //         })
                // })
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
