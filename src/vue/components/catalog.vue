<template>
    <div class="catalog">
        <div class="catalog__head">
            <div class="catalog__counter">
                <template v-if="totalProducts !== -1">
                    Найдено <span>{{ totalProducts }}</span>
                </template>
                <template v-else>
                    <span>Загрузка...</span>
                </template>
            </div>
            <span class="catalog__filter-button popup-link" @click="openPopupById('filter-modal')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.701172 13.0771C0.701172 13.3531 0.908173 13.6291 1.25317 13.6291H8.84317C9.05017 14.4571 9.80917 15.0091 10.7062 15.0091C11.6032 15.0091 12.2932 14.3881 12.5692 13.6291H14.9152C15.1912 13.6291 15.4672 13.4221 15.4672 13.1461C15.4672 12.8701 15.2602 12.5941 14.9842 12.5941H12.5002C12.2932 11.7661 11.5342 11.2141 10.6372 11.2141C9.74017 11.2141 9.05017 11.8351 8.77417 12.5941H1.18417C0.977172 12.5251 0.701172 12.8011 0.701172 13.0771ZM0.701172 7.48812C0.701172 7.76412 0.908173 8.04012 1.25317 8.04012H3.59917C3.80617 8.86812 4.56517 9.42012 5.46217 9.42012C6.35917 9.42012 7.04917 8.79912 7.32517 8.04012H14.9152C15.1912 8.04012 15.4672 7.83311 15.4672 7.55711C15.4672 7.28111 15.2602 7.00512 14.9842 7.00512H7.39417C7.18717 6.17712 6.42817 5.62512 5.53117 5.62512C4.63417 5.62512 3.94417 6.24612 3.66817 7.00512H1.32217C0.977172 7.00512 0.701172 7.21212 0.701172 7.48812ZM0.701172 1.8991C0.701172 2.1751 0.908173 2.45113 1.25317 2.45113H8.84317C9.05017 3.27913 9.80917 3.83113 10.7062 3.83113C11.6032 3.83113 12.2932 3.21013 12.5692 2.45113H14.9152C15.1912 2.45113 15.4672 2.24412 15.4672 1.96812C15.4672 1.69212 15.2602 1.41613 14.9842 1.41613H12.5002C12.2932 0.588133 11.5342 0.0361328 10.6372 0.0361328C9.74017 0.0361328 9.05017 0.657133 8.77417 1.41613H1.18417C0.977172 1.41613 0.701172 1.6231 0.701172 1.8991ZM4.56517 7.48812C4.56517 7.00512 4.97917 6.59113 5.46217 6.59113C5.94517 6.59113 6.35917 7.00512 6.35917 7.48812C6.35917 7.97112 5.94517 8.38512 5.46217 8.38512C4.97917 8.38512 4.56517 7.97112 4.56517 7.48812ZM9.80917 13.0771C9.80917 12.5941 10.2232 12.1801 10.7062 12.1801C11.1892 12.1801 11.6032 12.5941 11.6032 13.0771C11.6032 13.5601 11.1892 13.9741 10.7062 13.9741C10.1542 13.9741 9.80917 13.5601 9.80917 13.0771ZM9.80917 1.8991C9.80917 1.4161 10.2232 1.00211 10.7062 1.00211C11.1892 1.00211 11.6032 1.4161 11.6032 1.8991C11.6032 2.3821 11.1892 2.79613 10.7062 2.79613C10.1542 2.79613 9.80917 2.3821 9.80917 1.8991Z" fill="#31ACB8"/>
                </svg>
                <span>
                    Все фильтры
                </span>
            </span>
        </div>
        <div class="catalog__items">
<!--            <template v-if="catalogItem.length">-->
<!--                &lt;!&ndash;                <transition-group name="fade">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <marksCard&ndash;&gt;-->
<!--                &lt;!&ndash;                        v-for="(item) in catalogItem"&ndash;&gt;-->
<!--                &lt;!&ndash;                        :key="item.group.value"&ndash;&gt;-->
<!--                &lt;!&ndash;                        :item="item"&ndash;&gt;-->
<!--                &lt;!&ndash;                        @more="more"&ndash;&gt;-->
<!--                &lt;!&ndash;                    />&ndash;&gt;-->
<!--                &lt;!&ndash;                </transition-group>&ndash;&gt;-->
<!--            </template>-->
            <marksCard
                v-if="isFirstLoad"
                :item="catalogItem"
                :loadingCatalog="loadingCatalog"
                @more="more"
            />
            <div
                v-if="loadingCatalog"
                class="catalog__loader"
                :class="{
                    'catalog__loader--absolute': isFirstLoad
                }"
            >
                <div class="preloader">
                    <div class="preloader__preloader">
                        <div class="preloader__loader"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import functions from "../helpers/functions";
    import marksCard from "./blocks/marksCard.vue";

    export default {
        name: 'CatalogBlock',
        components: {
            marksCard
        },
        props: {
            catalogItem: {
                default: () => [],
                type: Array
            },
            totalProducts: {
                default: 0,
                type: Number
            },
            isFirstLoad: {
                default: false,
                type: Boolean
            },
            loadingCatalog: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                showQuantityProduct: 20,
                page: 1,
            }
        },
        methods: {
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
            more(typeMark) {
                this.$emit('moreTypeMark', typeMark)
            },
            openPopupById(id) {
                window.openPopupById(id)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/sass/variables/variables";
    @import "../../assets/sass/variables/fluid-variables";
    @import "../../assets/sass/mixins/fluid-mixin";

    .catalog {
        &__items {
            position: relative;
        }
        &__loader {
            position: relative;
            height: 400px;
            animation: blur 1s linear forwards;
            &--absolute {
                position: absolute;
                z-index: 2;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 100%;
                width: 100%;
                padding: 10px;
                box-sizing: content-box;
                .preloader {
                    background-color: transparent;
                }
                .preloader__loader {
                    position: static;
                }
                .preloader__preloader {
                    align-items: center;
                    justify-content: center;
                }
            }
        }
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
    @keyframes blur {
        0%   {
            backdrop-filter: blur(0px);
        }
        100% {
            backdrop-filter: blur(2px);
        }
    }
</style>
