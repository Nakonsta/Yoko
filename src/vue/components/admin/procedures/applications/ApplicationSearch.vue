<template>
    <div class="application-search">
        <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#search"></use>
        </svg>

        <input
            type="text"
            placeholder="Поиск"
            :value="search"
            @input="handleSearch($event.target.value)"
            class="application-search__input"
        />
    </div>
</template>
<script>
export default {
    name: 'application-search',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        handleSearch(value) {
            this.search = value

            this.$emit('on-search', this.search)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-search {
    position: relative;

    @media screen and (max-width: 701px) {
        width: 100%;
        margin-top: rem(20px);
    }

    svg {
        position: absolute;
        left: 0;
        bottom: 5px;

        width: 22px;
        height: 22px;
        fill: $colorTurquoise;
    }

    &__input {
        width: 100%;
        outline: none;
        border: none;
        padding: 0 rem(5px) rem(5px) rem(25px);
        border-bottom: 1px solid $colorTurquoise;
        background-color: transparent;

        font-family: Roboto;
        font-size: 16px;
        color: $colorText;

        &::placeholder {
            font-family: Roboto;
            font-size: 14px;
            color: $colorGray;
        }
    }
}
</style>
