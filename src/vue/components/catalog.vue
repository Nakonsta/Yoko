<template>
    <div class="catalog">
        <div class="catalog__counter">
            Найдено 6528
        </div>
        <div class="catalog__items">
            <div
                v-for="(item, index) in catalogItem"
                class="catalog__item"
            >
                <div class="catalog__item-head">
                    <span class="catalog__item-name">
                        {{ item.value }}
                    </span>
                    <span class="catalog__item-counter">
                        {{ item.total }} марка
                    </span>
                </div>
                <div class="catalog__item-body">
                    <a :href="product.url"
                      v-for="product in item.showFlag ? item.items : item.items.slice(0, 5)"
                      class="catalog__product"
                    >
                        {{ product.title }}
                    </a>
                </div>
                <div class="catalog__more">
                    <span
                        v-if="item.showFlag"
                        @click="toggleBlock(catalogItem, index)"
                    >
                        Скрыть
                    </span>
                    <span
                        v-else
                        @click="toggleBlock(catalogItem, index)"
                    >
                        Показать все
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CatalogBlock',
        props: {
            catalogItem: {
                default: () => [],
                type: Array
            }
        },
        data() {
            return {
                hideElements: []
            }
        },
        methods: {
            toggleBlock(arr, index) {
                arr[index].showFlag = !arr[index].showFlag
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/sass/variables/variables";
    @import "../../assets/sass/variables/fluid-variables";
    @import "../../assets/sass/mixins/fluid-mixin";

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
    }
</style>
