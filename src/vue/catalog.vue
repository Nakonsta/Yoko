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
            }
        },
        created() {
            this.getFilterData()
        },
        methods: {
            changeFilter() {
                this.getCatalogData(this.currentFilter)
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
                        this.getCatalogData()
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            getCatalogData(filterValues = null) {
                const weightFilter = this.getWeightFilter()
                this.clearCatalog()

                weightFilter.values.forEach((value) => {
                    const group = this.getGroup(weightFilter.id, value)

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
            },
            setFilterData(data) {
                this.filter = data
            },
            clearCatalog() {
                this.catalog = []
            },
            setCatalogData(data) {
                if (data.items.length) {
                    this.catalog.push(data)
                }
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
