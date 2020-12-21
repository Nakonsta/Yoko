<template>
    <div class="accreditations__search">
        <input
            type="text"
            placeholder="Поиск"
            :value="search"
            @input="handleSearch($event.target.value)"
            class="accreditations__search-input"
        />

        <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#search"></use>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'accreditations-search',
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
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.accreditations__search {
    flex: 1;
    position: relative;

    svg {
        position: absolute;
        right: 0;
        bottom: 5px;

        width: 22px;
        height: 22px;
        fill: $colorTurquoise;
    }
}

.accreditations__search-input {
    width: 100%;
    outline: none;
    border: none;
    padding: rem(5px) rem(25px) rem(5px) 0;
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
</style>
