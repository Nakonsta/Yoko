<template>
    <div class="application-search">
        <svg @click="showInput">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#search"></use>
        </svg>

        <input
            type="text"
            ref="input"
            placeholder="Поиск"
            :value="search"
            @input="handleSearch($event.target.value)"
            @blur="hideInput"
            :class="['application-search__input', { 'application-search__input--show': show }]"
        />
    </div>
</template>
<script>
export default {
    name: 'application-search',
    data() {
        return {
            search: '',
            show: false
        }
    },
    methods: {
        handleSearch(value) {
            this.search = value

            this.$emit('on-search', this.search)
        },
        showInput() {
            this.show = true
            this.$refs.input.focus()
        },
        hideInput() {
            if (!this.search) {
                this.show = false
            }
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
    flex: 1;
    position: relative;
	min-width: 80px;

    @media screen and (max-width: 701px) {
        width: 100%;
        margin-top: rem(20px);
        margin-left: 0;
    }

    svg {
        position: absolute;
        left: 0;
        bottom: 5px;

        width: 22px;
        height: 22px;
        fill: $colorTurquoise;
        cursor: pointer;
    }

    &__input {
        width: 0;
        outline: none;
        border: none;
        padding: 0;
        padding-bottom: rem(5px);
        border-bottom: 1px solid $colorTurquoise;
        background-color: transparent;
        transition: 0.3s;
        opacity: 0;

        font-family: Roboto;
        font-size: rem(16px);
        color: $colorText;

        &::placeholder {
            font-family: Roboto;
            font-size: rem(14px);
            color: $colorGray;
        }

        &--show {
            width: 100%;
            padding: 0 rem(5px) rem(5px) rem(25px);
            opacity: 1;
        }
    }
}
</style>
