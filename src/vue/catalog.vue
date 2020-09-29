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
                Товары
            </div>
        </div>
    </div>
</template>

<script>
    import api from './helpers/api'
    import filterBlock from "./components/filter.vue";

    export default {
        name: 'App',
        components: {
            filterBlock
        },
        mixins: [api],
        data() {
            return {
                url: 'https://d1.aspect.extyl.pro',
                filter: []
            }
        },
        created() {
            this.fetchFilter()
                .then((data) => {
                    console.log(data)
                    this.filter = data.data.data
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        methods: {},
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
        }
    }
</style>
