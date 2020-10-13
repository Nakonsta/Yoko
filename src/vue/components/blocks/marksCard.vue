<template>
    <div
        class="catalog__item"
    >
        <div class="catalog__item-head">
            <span class="catalog__item-name">
                {{ item.group.value }}
            </span>
            <span class="catalog__item-counter">
                {{ item.total }} {{ getNameOfNum(item.total) }}
            </span>
        </div>
        <div class="catalog__item-body">
            <template v-if="item.items.length">
                <transition-group name="fade" style="display: flex; flex-wrap: wrap">
                    <a
                        v-for="product in item.items"
                       :href="product.url"
                       :key="product.title"
                       class="catalog__product"
                    >
                        {{ product.title }}
                    </a>
                </transition-group>
            </template>
            <div class="catalog__not-mark" v-else>
                Нет марок
            </div>
        </div>
        <div
            v-if="item.page < totalPages(item.total)"
            class="catalog__more"
        >
            <span
                @click="more(item)"
            >
                Загрузить еще
            </span>
        </div>
    </div>
</template>

<script>
    import functions from "../../helpers/functions";

    export default {
        name: 'MarksCard',
        props: {
            item: {
                default: () => {},
                type: Object
            },
        },
        data() {
            return {
                showQuantityProduct: 20,
            }
        },
        methods: {
            more(item) {
                console.log(item)
                item.page += 1
                this.$emit('more', item)
            },
            totalPages(total) {
                return Math.ceil(total / this.showQuantityProduct)
            },
            getNameOfNum(number) {
                let list = [
                    'марка',
                    'марок',
                    'марок',
                ]

                return functions.declOfNum(number, list)
            },
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";

    .catalog {
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
            display: flex;
            flex-wrap: wrap;
            margin: 0 rem(-8px);
            margin-top: rem(24px);
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
