<template>
    <div class="catalog">
        <div class="catalog__search">
            <search />
        </div>
        <div class="catalog__flex">
            <div ref="filterContainer" class="catalog__filter">
                <filterBlock
                    :filter="filter"
                    :currentFilter="currentFilter"
                    :filterContainer="this.$refs.filterContainer"
                    @changeFilter="changeFilter"
                />
            </div>
            <div class="catalog__body">
                <catalogBlock
                    :catalog-item="catalog"
                    :totalProducts="totalProducts"

                />
<!--                <InfiniteLoading-->
<!--                    v-if="catalog.length"-->
<!--                    @infinite="infiniteHandler"-->
<!--                >-->
<!--                </InfiniteLoading>-->
                <div
                    v-if="catalog.length && page < totalPages"
                    class="news-list__more"
                    @click="more"
                >
                    Загрузить ещё
                </div>
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
            infiniteHandler(infiniteState) {
                console.log(111)
                infiniteState.complete();
            },
            more() {
                this.page += 1
                this.getCatalogData(this.currentFilter)
            },
            changeFilter() {
                this.getCatalogData(this.currentFilter, true)
            },
            getWeightFilter() {
                let weightFilter = null

                for (const currentFilterKey in this.currentFilter) {
                    this.filter.forEach((item, index) => {
                        if (item.id === currentFilterKey) {
                            if (index < this.filter.length - 1) {
                                weightFilter = this.filter[index + 1]
                            } else {
                                weightFilter = this.filter[index]
                            }
                        }
                    })
                }

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
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            getCatalogData(filterValues = null, clearCatalog) {
                this.weightFilter = this.getWeightFilter()

                if (clearCatalog) {
                    this.clearCatalog()
                }

                this.fetchTotalCatalog(filterValues)
                    .then((data) => {
                        const total = data.data.data.total

                        this.setTotalCounterProducts(total)

                        this.pageWeightFilter.forEach((value) => {
                            const group = this.getGroup(this.weightFilter.id, value)

                            this.fetchCatalog(group, filterValues)
                                .then((data) => {
                                    let catalogItem = data.data.data

                                    catalogItem.group = group

                                    this.setCatalogData(catalogItem)
                                })
                                .catch((e) => {
                                    console.log(e)
                                })
                        })
                    })
                    .catch((e) => {
                        console.log(e)
                    })

            },
            setFilterData(data) {
                this.filter = data
            },
            clearCatalog() {
                this.page = 1
                this.catalog = []
            },
            setCatalogData(data) {
                // if (data.items.length) {
                //     this.catalog.push(data)
                // }
                this.catalog.push(data)
            },
            setTotalCounterProducts(total) {
                this.totalProducts = total
            },
            addShowFlag(arr) {
                arr.forEach((item, index) => {
                    arr[index].showFlag = false
                })

                return arr
            }
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
        }
    }
</style>
