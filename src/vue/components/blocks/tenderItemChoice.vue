<template>
    <div class="tender-item__winner">
        <div class="tender-item__tabs">
            <div class="tabs tabs--line js-tabs js-more" v-if="tenderItemData.purchase_subject && tenderItemData.purchase_subject.lot_amounts && tenderItemData.purchase_subject.lot_amounts.length > 0">
                <ul v-if="tenderItemData.purchase_subject.lot_amounts.length === 1" class="js-more__items">
                    <li
                        class="js-more__item active"
                    >
                        <a href="#">Все заявки</a>
                    </li>
                </ul>
                <ul v-else class="js-more__items">
                    <li
                        class="js-more__item active"
                    >
                        <a href="#">Все заявки</a>
                    </li>
                    <li
                        v-for="(item, i) in tenderItemData.purchase_subject.lot_amounts"
                        :key="i"
                        class="js-more__item"
                    >
                        <a href="#">Лот {{ i+1 }}</a>
                    </li>
                </ul>
            </div>
            <div class="winner-choice">
                <div class="winner-choice-all">
                    <div class="winner-choice-all__items">
                        <div 
                            v-for="participant in participants"
                            :key="participant.id"
                            class="winner-choice__item"
                        >
                            <div class="winner-choice__item-inner">
                                <div class="winner-choice__item-block winner-choice__item-num">
                                    <div v-if="participant.id">
                                        <div class="winner-choice__item-title">№</div>
                                        <div class="winner-choice__item-value">{{ participant.id }}</div>
                                    </div>
                                </div>
                                <div class="winner-choice__item-block winner-choice__item-name">
                                    <div v-if="participant.company && participant.company.name">
                                        <div class="winner-choice__item-title">Участник</div>
                                        <div class="winner-choice__item-value">{{ participant.company.name }}</div>
                                    </div>
                                </div>
                                <div class="winner-choice__item-block winner-choice__item-date">
                                    <div v-show="participant.subject && participant.subject.created_at">
                                        <div class="winner-choice__item-title">Дата и время подачи</div>
                                        <div class="winner-choice__item-value">{{ formatDate(participant.subject.created_at) }}</div>
                                    </div>
                                </div>
                                <div class="winner-choice__item-block winner-choice__item-lots">
                                    <div v-show="participant.procedure && participant.procedure.purchase_subject && participant.procedure.purchase_subject.lot_amounts.length">
                                        <div class="winner-choice__item-title">Лоты</div>
                                        <div class="winner-choice__item-value">
                                            {{ participant.procedure.purchase_subject.lot_amounts.length }} 
                                             из 
                                            {{ tenderItemData.purchase_subject.lot_amounts.length }}
                                        </div>
                                    </div>
                                </div>
                                <div class="winner-choice__item-block winner-choice__item-price">
                                    <div v-show="participant.subject && participant.subject.start_price && participant.procedure && participant.procedure.purchase_currency">
                                        <div class="winner-choice__item-title">Предложенная цена</div>
                                        <div class="winner-choice__item-value">
                                            {{ formatPriceWithCurrency(participant.subject.start_price, participant.procedure.purchase_currency) }}
                                        </div>
                                    </div>
                                </div>
                                <div v-show="participant.status" class="winner-choice__item-block winner-choice__item-status">
                                    <div class="winner-choice__item-title">{{ getTenderStatusName(participant) }}</div>
                                    <div class="winner-choice__item-value">
                                        <a href="#" class="winner-choice__item-link">Подробнее</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import functions from '@/helpers/functions.js'
export default {
    name: 'TenderItemChoice',

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        },
        itemsStatuses: {
            type: Array,
            default: () => [],
        },
        participants: {
            type: Array,
            default: () => [],
            required: true,
        },
    },

    mixins: [functions],

    methods: {
        getTenderStatusName(item) {
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
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-item {
        &__winner {
            padding: 1.71429rem 2.28571rem;
            width: calc(100% - 315px);
            margin-right: 32px;
        }
    }
    .winner-choice {
        padding: 2rem;
        background-color: #fff;
        &__item {
            padding: 1.5rem;
            border: 1px solid $colorBdr;
            margin-bottom: 1.375rem;
            &-inner {
                display: flex;
            }
            &-num {
                width: 10%;
            }
            &-name {
                width: 30%;
            }
            &-date {
                width: 15%;
            }
            &-lots {
                width: 10%;
            }
            &-price {
                width: 20%;
            }
            &-status {
                width: 15%;
            }
            &-title {
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: $colorGray;
                padding-bottom: 0.75rem;
            }
        }
    }
</style>