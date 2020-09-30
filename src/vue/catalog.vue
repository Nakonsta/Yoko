<template>
    <div class="catalog">
        <div class="catalog__search">
            <search />
        </div>
        <div class="catalog__flex">
            <div class="catalog__filter">
                <filterBlock
                    :filter="filter"
                    @changeFilter="getCatalogData"
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
                url: 'https://d1.aspect.extyl.pro',
                filter: [],
                catalog: [],
                totalProducts: 0,
            }
        },
        created() {
            this.getFilterData()
            this.getCatalogData()
        },
        methods: {
            getFilterData() {
                this.fetchFilter()
                    .then((data) => {
                        this.setFilterData(data.data.data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            getCatalogData(filterValues = null) {
                this.fetchCatalog(filterValues)
                    .then((data) => {
                        this.setCatalogData(data.data.data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            },
            setFilterData(data) {
                this.filter = data
            },
            setCatalogData(data) {
                this.catalog = this.addShowFlag(data)
                this.setTotalCounterProducts(this.catalog)
            },
            setTotalCounterProducts(arr) {
                let total = 0
                arr.forEach((item) => {
                    total = total + item.total
                })

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
        }
        &__body {
            width: 100%;
        }
    }
</style>
