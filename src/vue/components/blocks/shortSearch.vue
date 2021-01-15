<template>
    <div class="shortsearch" :class="{ active: isActive}">
        <input
                type="text"
                placeholder="Поиск"
                :value="search"
                @input="handleSearch($event.target.value)"
                class="shortsearch__input"
                ref="input"
        />
        <a href="javascript:{}" class="shortsearch__btn" @click="toggleSearch">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#search"></use>
            </svg>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'catalog-search',
        data() {
            return {
                search: '',
                isActive: false
            }
        },
        methods: {
            handleSearch(value) {
                this.search = value
                this.$emit('on-search', this.search)
            },
            toggleSearch(value) {
                this.isActive = !this.isActive
                if (this.isActive) {
                    this.$refs.input.focus();
                }
            },
        }
    }
</script>



<style lang="scss" scoped>
    @import '../../../assets/sass/variables/variables';
    @import '../../../assets/sass/variables/fluid-variables';
    @import '../../../assets/sass/mixins/fluid-mixin';
    @import '../../../assets/sass/mixins/mq';

    .shortsearch {
        width: rem(30px);
        height: rem(22px);
        position: relative;

        &.active {
            z-index: 3;
        }

        &__input {
            display: none;
            outline: none;
            border: none;
            border-bottom: 1px solid $colorTurquoise;
            padding: rem(5px) rem(30px) rem(5px) rem(5px);
            width: rem(375px);
            font-weight: normal;
            font-size: rem(14px);
            line-height: $lineHeight;
            font-family: $fontFamily;
            color: $colorText;
            background-color: $colorWhite;
            box-shadow: 0 0 10px $colorBdr;
            position: absolute;
            top: rem(-6px);
            right: 0;
            bottom: rem(-6px);

            &::placeholder {
                color: $colorGray;
            }

            .shortsearch.active & {
                display: block;
            }
        }

        &__btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: rem(25px);
            position: absolute;
            top: rem(-6px);
            right: 0;
            bottom: rem(-6px);

            &:hover {
                svg {
                    fill: $colorTurquoiseHover;
                }
            }

            svg {
                display: block;
                width: rem(22px);
                height: rem(22px);
                fill: $colorTurquoise;
            }
        }
    }
</style>
