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
                    :catalog-item="catalog"
                    :totalProducts="totalProducts"
                    @moreTypeMark="moreTypeMark"
                />
<!--                <InfiniteLoading-->
<!--                    v-if="catalog.length"-->
<!--                    @infinite="infiniteHandler"-->
<!--                >-->
<!--                </InfiniteLoading>-->
                <div
                    v-if="loadingCatalog"
                    class="catalog__loader"
                    :class="{
                        'catalog__loader--absolute': catalog.length
                    }"
                >
                    <div class="preloader">
                        <div class="preloader__preloader">
                            <div class="preloader__loader"></div>
                        </div>
                    </div>
                </div>
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
                this.fetchCatalog(typeMark.group, this.currentFilter, typeMark.page)
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
            more() {
                this.page += 1
                this.getCatalogData(this.currentFilter)
            },
            changeFilter() {
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
            getCatalogData(filterValues = null, clearCatalog) {
                this.weightFilter = this.getWeightFilter()

                if (clearCatalog) {
                    this.clearCatalog()
                }

                this.loadingCatalog = true

                this.pageWeightFilter.forEach((value) => {
                    const group = this.getGroup(this.weightFilter.id, value)

                    this.fetchTotalCatalog(group, filterValues)
                        .then((data) => {
                            const total = data.data.data.total

                            this.setTotalCounterProducts(total)
                        })
                        .catch((e) => {
                            console.log(e)
                        })

                    this.fetchCatalog(group, filterValues)
                        .then((data) => {
                            let catalogItem = data.data.data

                            catalogItem.group = group

                            this.setCatalogData(catalogItem)

                            this.loadingCatalog = false
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                })
            },
            setFilterData(data) {
                this.filter = data
            },
            clearCatalog() {
                this.page = 1
                this.catalog = []
                this.totalProducts = -1
            },
            setCatalogData(data) {
                data.page = 1
                this.catalog.push(data)
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
        &__loader {
            position: relative;
            height: 400px;
            animation: blur 1.5s linear forwards;
            &--absolute {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                height: 100%;
                width: 100%;
                z-index: 2;
                padding: 10px;
                box-sizing: content-box;
                .preloader {
                    background-color: transparent;
                }
                .preloader__loader {
                    position: sticky;
                    top: 0;
                }
                .preloader__preloader {
                    align-items: flex-start;
                    padding-top: 200px;
                }
            }
        }
    }

    @keyframes blur {
        0%   {
            backdrop-filter: blur(0px);
        }
        100% {
            backdrop-filter: blur(5px);
        }
    }
</style>
