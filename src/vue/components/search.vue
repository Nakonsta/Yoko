<template>
    <div class="search">
        <div class="search__icon">

        </div>
        <div class="search__input">
            <multiselect
                    v-model="value"
                    :options="options"
                    @search-change="() => {}"
            >
                <template v-slot:beforeList>
                    <div>dwadwad</div>
                </template>
            </multiselect>
        </div>
        <div class="search__button">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                value: '',
                options: [
                    'sss'
                ]
            }
        }
    }
</script>

<style lang="scss">
    .search {
        display: flex;
    }
</style>
