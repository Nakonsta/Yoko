<template>
    <div class="tender-item__info">
        <div class="tender-item__main">
            <div class="tender-item__left">
                <div class="tender-item__requsites">
                    <div class="tender-item__number">
                        № {{ tenderItemData.id }}
                    </div>
                    <div class="tender-item__type">
                       {{ TENDER_TRADING_FORMATS_AND_TYPES[tenderItemData.tender_trading_format] }} {{ TENDER_TRADING_FORMATS_AND_TYPES[tenderItemData.tender_trading_type] }}
                    </div>
                </div>
                <div class="tender-item__common">
                    <div v-if="tenderItemData.company_id" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Компания
                        </div>
                        <div class="tender-item__row-value">
                            {{ company.name }}
                        </div>
                    </div>
                    <div v-if="tenderItemData.contact_id" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Контактное лицо
                        </div>
                        <div class="tender-item__row-value">
                            {{ tenderItemData.contact_id }}
                        </div>
                    </div>
                    <div v-if="tenderItemData.delivery_terms" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Доставка
                        </div>
                        <div class="tender-item__row-value">
                            {{ tenderItemData.delivery_terms ? 'Требуется' : 'Не требуется' }}
                        </div>
                    </div>
                    <div v-if="tenderItemData.purchase_subject && tenderItemData.purchase_subject.description" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Объект закупки
                        </div>
                        <div class="tender-item__row-value">
                            {{ tenderItemData.purchase_subject.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="tender-item__right">
                <div class="tender-item__actions">
                    <div class="tender-item__status">
                        {{ tenderItemData.status }}
                    </div>
                    <Actions />
                </div>
                <div v-if="tenderItemData.purchase_subject && tenderItemData.purchase_subject.start_price" class="tender-item__start-price">
                    <div class="tender-item__start-price-text">
                        Начальная цена:
                    </div>
                    <div class="tender-item__start-price-num">
                        {{ tenderItemData.purchase_subject.start_price }} &#8381;
                    </div>
                </div>
                <div class="tender-item__dates">
                    <div v-if="tenderItemData.publication_date" class="tender-item__date">
                        <div class="tender-item__date-text">
                            Дата размещения:
                        </div>
                        <div class="tender-item__date-day">
                            {{ formatDateNoTime(tenderItemData.publication_date) }}
                        </div>
                    </div>
                    <div v-if="tenderItemData.purchase_term && tenderItemData.purchase_term.application_end_date" class="tender-item__date">
                        <div class="tender-item__date-text">
                            Дата окончания:
                        </div>
                        <div class="tender-item__date-day">
                            {{ formatDateNoTime(tenderItemData.purchase_term.application_end_date) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tender-item__products">
            <div class="tender-item__products-actions">
                <a href="#" class="tender-item__products-show">{{isProductsShown ? 'Скрыть позиции' : 'Показать позиции' }}</a>
                <a href="#" class="btn btn--bdr tender-item__products-apply">Отправить заявку</a>
            </div>
            <div v-if="tenderItemData.purchase_subject && tenderItemData.purchase_subject.products" class="tender-item__products-table">
                <div v-if="tenderItemData.purchase_subject.products.length" class="tender-item__products-thead company-products__thead">
                    <div class="table-cell__title">
                        Наименование позиции
                    </div>
                    <div class="table-cell__quantity">
                        Длина
                    </div>
                    <div class="table-cell__measure">
                        Единица
                    </div>
                    <div class="table-cell__sum">
                        Сумма за позицию
                    </div>
                    <div class="table-cell__vat">
                        НДС
                    </div>
                    <div class="table-cell__analogues">
                        Аналог
                    </div>
                </div>
                <div v-for="(item, key) in tenderItemData.purchase_subject.products" :key="key">
                    <TenderItemProductCard :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Actions from './actions.vue'
import TenderItemProductCard from './tenderItemProductCard.vue'

export default {
    name: 'TenderItemCard',

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        },
        company: {
            type: Object,
            required: true,
        }
    },

    components: {
        Actions,
        TenderItemProductCard,
    },
    
    data() {
        return {
            TENDER_TRADING_FORMATS_AND_TYPES: {
                trading_223: 'Торги по 223-ФЗ',
                commercial_trading: 'Коммерческие торги',
                contest: 'Конкурс',
                request_prices_or_offers: 'Запрос цен / запрос предложений',
                auction: 'Аукцион',
                request_prices: 'Запрос цен',
                purchase_from_supplier: 'Закупка у единственного поставщика',
            },
            isProductsShown: false,
        }
    },

    created() {
    },

    methods: {
        formatDateNoTime(string) {
            var d = new Date(string),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [day, month, year].join('.');
        },
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-item {
        &__main {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: rem(32px);
            border-bottom: 1px solid $colorGray3;
        }
        &__info {
            background-color: #fff;
            border-radius: 6px;
            padding: rem(24px) rem(32px);
            width: calc(100% - 315px);
            margin-right: 32px;
        }
        &__requsites {
            display: flex;
            font-weight: 500;
            font-size: rem(18px);
            line-height: rem(27px);
            padding-bottom: rem(32px);
        }
        &__number {
            padding-right: rem(24px);
            color: $lightcolorText;
        }
        &__type {
            color: $colorGray;
        }
        &__row {
            display: flex;
            align-items: flex-start;
            font-weight: 500;
            font-size: rem(14px);
            line-height: rem(20px);
            padding-bottom: rem(12px);
            &-name {
                width: rem(138px);
                flex-shrink: 0;
                color: $colorGray;
                padding-right: rem(24px);
            }
            &-value {
                color: $colorTurquoise;
                text-decoration: underline;
            }
        }
        &__status {
            font-weight: 700;
            font-size: rem(14px);
            line-height: rem(16px);
            color: $lightcolorText;
        }
        &__dates {
            display: flex;
        }
        &__date {
            &:first-child {
                margin-right: rem(29px);
            }
        }
        &__start-price-text,
        &__date-text {
            font-weight: 500;
            font-size: rem(14px);
            line-height: rem(20px);
            padding-bottom: rem(3px);
            color: $colorGray;
        }
        &__start-price-num {
            font-weight: 500;
            font-size: rem(20px);
            line-height: rem(27px);
            padding-bottom: rem(20px);
        }
        &__date-day {
            font-weight: 500;
            font-size: rem(14px);
            line-height: rem(20px);
            color: $lightcolorText;
        }
        &__actions {
            padding-bottom: rem(38px);
        }
        &__products {
            &-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: rem(29px);
            }
            &-show {
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                color: $colorTurquoise;
                position: relative;
                padding-right: rem(18px);
                &::after {
                    content: '';
                    position: absolute;
                    display: inline-block;
                    background: url('../src/assets/img/content/down.png') no-repeat;
                    background-size: contain;
                    width: 8px;
                    height: 5px;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
            &-table {
                padding: rem(77px) 0 rem(31px);
            }
            &-thead {
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                color: $colorGray;

            }
        }
    }
    .company-products__thead {
        display: flex;
    }
    .table-cell {
        &__title {
            width: 20%;
        }
        &__quantity {
            width: 20%;
        }
        &__measure {
            width: 20%;
        }
        &__sum {
            width: 20%;
        }
        &__vat {
            width: 20%;
        }
        &__analogues {
            width: 20%;
        }
    }
</style>