<template>
    <div class="catalog">
        <div class="catalog__search">
            Поиск
        </div>
        <div class="catalog__flex">
            <div class="catalog__filter">
                <filterBlock
                    :filter="filter"
                />
            </div>
            <div class="catalog__body">
                <catalogBlock
                    :catalog-item="catalog"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import api from './helpers/api'
    import filterBlock from "./components/filter.vue";
    import catalogBlock from "./components/catalog.vue";

    export default {
        name: 'App',
        components: {
            filterBlock,
            catalogBlock,
        },
        mixins: [api],
        data() {
            return {
                url: 'https://d1.aspect.extyl.pro',
                filter: [],
                catalog: []
            }
        },
        created() {
            this.fetchFilter()
                .then((data) => {
                    let arr = data.data.data
                    this.filter = data.data.data
                })
                .catch((e) => {
                    console.log(e)
                })

            this.fetchCatalog()
                .then((data) => {
                    this.getCatalogData(data)
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        methods: {
            getCatalogData(data) {
                let arr = data.data.data
                this.catalog = this.addShowFlag(arr)
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
            display: flex
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
