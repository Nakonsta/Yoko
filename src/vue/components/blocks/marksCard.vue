<template>
    <div
        class="mark-catalog__item"
    >
        <div class="mark-catalog__item-head">
            <span class="mark-catalog__item-name">
                Каталог
            </span>
        </div>
        <div
            class="mark-catalog__item-body"
            :class="{
                'mark-catalog__item-body--load': loadingCatalog
            }"
        >
            <template v-if="item.length">
                <a
                    v-for="product in item"
                    :href="product.url"
                    :key="product.title"
                    class="mark-catalog__product"
                >
                    {{ product.title }}
                </a>
            </template>
            <div class="mark-catalog__not-mark" v-else>
                Подходящих товаров не найдено
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MarksCard',
        props: {
            item: {
                default: () => [],
                type: Array
            },
            loadingCatalog: {
                default: false,
                type: Boolean
            }
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";

    .mark-catalog {
        &__item {
            background: #FFFFFF;
            border-radius: rem(6px);
            padding: rem(24px);
            margin-top: rem(24px);
        }
        &__item-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__item-name {
            font-weight: 500;
            font-size: rem(18px);
            line-height: 160%;
        }
        &__counter {
            font-weight: 500;
            font-size: rem(14px);
            line-height: 160%;
            color: #9B9B9A;
            span {
                color: $colorTurquoise
            }
        }
        &__item-counter {
            font-weight: 500;
            font-size: rem(14px);
            line-height: 160%;
            color: #9B9B9A;
        }
        &__item-body {
            transition: 1s opacity, 1s transform;
            display: flex;
            flex-wrap: wrap;
            margin: 0 rem(-8px);
            margin-top: rem(24px);
            transform: translateY(0px);
            opacity: 1;
            &--load {
                transform: translateY(rem(5px));
                opacity: .2;
            }
        }
        &__more {
            font-weight: 500;
            font-size: rem(14px);
            line-height: 160%;
            color: $colorTurquoise;
            span {
                cursor: pointer;
            }
        }
        &__product {
            transition: .3s background-color, .3s color, .3s border-color;
            height: rem(38px);
            padding: 0 rem(16px);
            border: 1px solid #CDCDCC;
            border-radius: rem(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            margin: 0 rem(8px);
            background-color: transparent;
            margin-bottom: rem(16px);
            color: $colorText;
            &:hover {
                background-color: $colorTurquoise;
                border-color: $colorTurquoise;
                color: #fff;
            }
        }
        &__not-mark {
            margin: 0 rem(8px);
        }
        &__head {
            display: flex;
            justify-content: space-between;
        }
        &__filter-button {
            display: none;
            align-items: center;
            cursor: pointer;
            @media(max-width: 768px) {
                display: flex;
            }
            span {
                transition: .3s color;
                margin-left: rem(12px);
                font-weight: bold;
                font-size: rem(16px);
                line-height: 140%;
                color: $colorTurquoise;
            }
            path {
                transition: .3s fill
            }
            &:hover {
                span {
                    color: $colorTurquoiseHover
                }
                path {
                    fill: $colorTurquoiseHover
                }
            }
        }
    }
</style>
