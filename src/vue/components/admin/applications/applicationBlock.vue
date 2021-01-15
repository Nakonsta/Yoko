<template>
    <div class="application__item item">
        <div class="application__item-head">
            <div class="application__item-title">№{{item.id}}</div>
            <div class="application__item-type">{{ getTenderTradingFormatName(item)}}: {{ getTenderTradingTypeName(item) }}</div>
            <div class="application__item-status">{{ getStatusName(item) }}</div>
        </div>
        <div class="application__item-body">
            <div class="application__item-info">
                <dl>
                    <dt>Компания</dt>
                    <dd><a :href="'/companies/'+item.procedure.company.inn"  target="blank" v-if="item.procedure.company">{{ item.procedure.company.name }}</a></dd>
                </dl>
            </div>
            <div class="application__item-option" v-if="item.procedure.rebidding && false">
                <span>Переторжка</span>
                <!-- todo переторжка -->
            </div>
            <div class="application__item-option" v-if="item.procedure.purchase_term.procedure_date_to">
                <span>Дата окончания:</span>
                {{ formatDateNoTime(item.procedure.purchase_term.procedure_date_to) }}
            </div>
            <div class="application__item-price">
                <span>Начальная цена:</span>
                <template v-if="item.subject.start_price">
                    {{ formatPriceWithCurrency(item.subject.start_price, item.procedure.purchase_currency) }}
                </template>
                <template v-if="!item.subject.start_price">
                    Без указания цены
                </template>
            </div>
        </div>
        <div class="application__item-info">
            <dl>
                <dt>Объект закупки</dt>
                <dd>{{item.procedure.purchase_subject.description}}</dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import formatDate from "@/helpers/formatDate";
    import functions from "@/helpers/functions";

    export default {
        name: 'applicationBlock',
        mixins: [formatDate, functions],
        props: ['item'],
        data: function() {
            return {
                itemsFormats: [],
                itemsStatuses: [
                    {
                        id: 'submitted',
                        name: 'Отправлена',
                    },
                    {
                        id: 'winner_processing',
                        name: 'Определение победителя',
                    },
                    {
                        id: 'winner_chosen',
                        name: 'Победитель определен',
                    },
                    {
                        id: 'canceled',
                        name: 'Закрытая',
                    },
                    {
                        id: 'draft',
                        name: 'Черновик',
                    },
                ],
            }
        },
        methods: {
            getTenderTradingTypeName(item) {
                const type = this.getTradingType(item.procedure.tender_trading_type);
                if (type) {
                    return type.name;
                }
                return item.procedure.tender_trading_type;
            },
            getTenderTradingFormatName(item) {
                const type = this.getTradingFormat(item.procedure.tender_trading_format);
                if (type) {
                    return type.name;
                }
                return item.procedure.tender_trading_format;
            },
            getStatusName(item) {
                const status = this.itemsStatuses.find(
                    (status) => status.id === item.status,
                );
                if (status) {
                    return status.name;
                }
                return item.status;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../../assets/sass/variables/variables';
    @import '../../../../assets/sass/variables/fluid-variables';
    @import '../../../../assets/sass/mixins/fluid-mixin';
    @import '../../../../assets/sass/mixins/mq';

    .application__item {
        padding: rem(24px);
        background: $colorWhite;
        position: relative;
        @include mq($from: tablet){
            max-width: 100%;
        }
        &-head {
            display: flex;
            justify-content: space-between;
            margin: 0 0 rem(24px);
        }
        &-title{
            font-weight: 500;
            font-size: rem(18px);
            color: $colorText;
            @include mq($from: tablet){
                margin-right: rem(24px);
            }
        }
        &-type {
            margin-right: auto;
            color: $colorGray;
            font-size: rem(18px);
        }
        &-status {
            font-weight: 700;
            font-size: rem(14px);
            color: $colorText;
            @include mq($from: tablet){
                margin: 0;
            }
        }
        &-body {
            display: flex;
            justify-content: space-between;
        }

        &-info {
            .application__item-body & {
                margin-right: auto;
            }
            .application__item-body ~ & {
                margin-top: rem(24px);
            }
            dl {
                /*display: flex;*/
                /*justify-content: flex-start;*/
                margin: 0;
                font-weight: 500;

                + dl {
                    margin-top: rem(12px);
                }

                @include mq($until: widescreen) {
                    display: block;
                }

                dt {
                    display: block;
                    color: $colorGray;
                    margin: 0 0 rem(3px);
                    font-size: rem(14px);
                    line-height: (20/14);
                }

                dd {
                    margin: 0;

                    a {
                        color: $colorTurquoise;

                        &:hover {
                            color: $colorTurquoiseHover;
                        }
                    }
                }
            }
        }

        &-price,
        &-option {
            margin-left: rem(56px);
            span {
                display: block;
                color: $colorGray;
                margin: 0 0 rem(3px);
                font-size: rem(14px);
                line-height: (20/14);
            }
        }

        &-price {
            min-width: rem(120px);
            font-size: rem(20px);
            line-height: (27/20);
            white-space: nowrap;
        }

        &-option {
            width: calc(120px);
            font-size: rem(14px);
            line-height: (20/14);
        }
    }
</style>