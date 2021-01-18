<template>
    <div class="companies__items">
        <template v-if="!items.length">
            <div class="companies__item companies__item--empty">
                По вашему запросу ничего не найдено
            </div>
        </template>
        <template v-else>
            <div class="companies__item" v-for="(item, index) in items" :key="item.inn">
                <div class="companies__item-head">
                    <div class="companies__item-logo" :class="{'companies__item-logo--empty': !item.logo}">
                        <img :src="item.logo" :alt="item.name" v-if="item.logo"/>
                    </div>
                    <ul class="companies__item-rating">
                        <li title="Индекс активности">
                            <svg class="sprite-time"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#time"></use></svg>
                            {{ item.activityIndex || 0 }}
                        </li>
                        <li title="Внутренний рейтинг">
                            <svg class="sprite-time"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#time"></use></svg>
                            {{ item.innerRating || 0 }}
                        </li>
                        <li title="Надежность компании">
                            <svg class="sprite-fav"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#fav"></use></svg>
                            {{ item.rating || 0 }}
                        </li>
                    </ul>
                </div>
                <div class="companies__item-title">
                    <a :href="'/compregister/'+item.id" :target="linkTarget || null">{{ item.name }}</a>
                </div>
                <dl v-if="showCounters && item.buyer">
                    <dt>Сумма закупок:</dt>
                    <dd>
                        <template v-for="(amount, index) in item.amounts">
                            <span class="nowrap">{{ formatPriceWithCurrency(amount.value || 0, amount.currency, true) }}</span>{{ index < item.amounts.length-1 ? ', ' : ''}}
                        </template>
                    </dd>
                </dl>
                <dl v-if="showCounters && item.buyer">
                    <dt>Процедур:</dt>
                    <dd>{{ item.count_procedures || 0 }}</dd>
                </dl>
                <dl v-if="showCounters && item.contractor">
                    <dt>Продукция:</dt>
                    <dd>{{ item.count_products || 0 }}</dd>
                </dl>
                <dl v-if="showCounters && item.contractor">
                    <dt>Остатки:</dt>
                    <dd>{{ item.count_balances || 0 }}</dd>
                </dl>
                <ul class="companies__item-tags" v-if="item.tags && item.tags.length">
                    <li v-for="(tag, index) in item.tags" :key="index">{{ tag }}</li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
    import functions from "@/helpers/functions";
    export default {
        name: 'companiesList',
        mixins: [functions],
        props: {
            items: {
                default: () => [],
                type: Array
            },
            linkTarget: {
                default: '',
                type: String
            },
            showCounters: {
                default: false,
                type: Boolean
            },
        },
        watch: {
            items(newValue) {
                return newValue.map((item) => {
                    item.tags = [];
                    if (item.buyer) {
                        item.tags.push("Покупатель");
                    }
                    if (item.contractor) {
                        item.tags.push("Поставщик");
                    }
                    if (item.businessSize && item.businessSize.value) {
                        item.tags.push(item.businessSize.value);
                    }
                    item.logo = item.logo || '';  // todo логотип
                    return item;
                });
            }
        },
        data: function() {
            return {};
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .companies {
        &__items {
            display: flex;
            flex-wrap: wrap;
            margin: -32px 0 0 -32px;
        }
        &__item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 32px 0 0 32px;
            border-radius: rem(6px);
            padding: rem(24px);
            width: calc(25% - 32px);
            background: $colorWhite;
            @include mq($until: widescreen) {
                width: calc(33.33% - 32px);
            }
            @include mq($until: desktop) {
                width: calc(50% - 32px);
            }
            @include mq($until: 600px) {
                width: calc(100% - 32px);
            }
            &--empty {
                width: calc(100% - 32px);
                font-weight: normal;
            }
            &-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0 0 rem(24px);
            }
            &-logo {
                margin-right: rem(24px);
                width: rem(52px);
                height: rem(52px);
                font-size: 0;
                text-align: center;
                &--empty {
                    background: $colorLight;
                }
                &::before,
                img {
                    display: inline-block;
                    vertical-align: middle;
                }
                &::before {
                    content: '';
                    width: 0;
                    height: 100%;
                }
            }
            &-rating {
                display: flex;
                list-style-type: none;
                margin: 0;
                padding: 0;
                font-weight: 500;
                font-size: rem(14px);
                line-height: rem(14px);
                li {
                    сursor: help;
                    + li {
                        margin-left: rem(14px);
                    }
                }
                svg {
                    display: inline-block;
                    vertical-align: bottom;
                    margin-right: rem(4px);
                    width: rem(14px);
                    height: rem(14px);
                }
            }
            &-title {
                margin: 0 0 auto;
                font: $fontGilroy;
                font-size: rem(24px);
                line-height: (34/24);
                + dl {
                    margin-top: rem(24px) !important;
                }
                a {
                    color: $colorText;
                    &:hover {
                        color: $colorTurquoiseHover;
                    }
                }
            }
            &-tags {
                list-style-type: none;
                display: flex;
                flex-wrap: wrap;
                margin: rem(16px) 0 0 rem(-8px);
                padding: 0;
                li {
                    margin: rem(8px) 0 0 rem(8px);
                    border: 1px solid $colorBdr;
                    border-radius: rem(4px);
                    padding: rem(3px) rem(11px);
                    font-weight: 500;
                    font-size: rem(12px);
                    line-height: (19/12);
                    color: $colorGray;
                }
            }
            dl {
                margin: rem(4px) 0 0;
                font-weight: 500;
                font-size: rem(16px);
                line-height: (26/16);
                dt {
                    display: inline;
                    color: $colorGray;
                }
                dd {
                    display: inline;
                    margin: 0;
                    color: $colorTurquoise;
                }
            }
        }
    }
</style>