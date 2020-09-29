<template>
    <div class="catalog">
        <div class="catalog__search">
            Поиск
        </div>
        <div class="catalog__flex">
            <div class="catalog__filter">
                Фильтер
            </div>
            <div class="catalog__body">
                Товары
            </div>
        </div>
    </div>
</template>
<script>
    import api from './helpers/api'

    export default {
        name: 'App',
        data() {
            return {
                url: 'https://d1.aspect.extyl.pro',
            }
        },
        created() {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .catalog {
        &__flex {
            display: flex
        }
    }
</style>
