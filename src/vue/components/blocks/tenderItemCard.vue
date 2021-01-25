<template>
    <div class="tender-item__info">
        <div class="tender-item__main">
            <div class="tender-item__left">
                <div class="tender-item__requsites">
                    <div class="tender-item__number">
                        № {{ tenderItemData.id }}
                    </div>
                    <div class="tender-item__type">
                       {{ getTradingFormat(tenderItemData.tender_trading_format) }}: {{ getTradingType(tenderItemData.tender_trading_type) }}
                    </div>
                </div>
                <div class="tender-item__common">
                    <div v-if="company" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Компания
                        </div>
                        <div class="tender-item__row-value">
                            <a :href="'/compregister/'+company.id">{{ company.name }}</a>
                        </div>
                    </div>
                    <div v-if="company.directorFio" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Контактное лицо
                        </div>
                        <div class="tender-item__row-value">
                            <popupCompanyContact
                                    :company="company"
                                    v-if="company"
                            />
                        </div>
                    </div>
                    <div v-if="tenderItemData.purchase_term && tenderItemData.purchase_term.delivery_to" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Доставка
                        </div>
                        <div class="tender-item__row-value">
                            <template v-if="tenderItemData.purchase_term.delivery_to">
                                <popupTenderDelivery
                                        :company="company"
                                        v-if="company"
                                        :tender="tenderItemData"
                                />
                            </template>
                            <template v-else>
                                Не требуется
                            </template>
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
                        {{ getTenderStatusName(tenderItemData) }}
                    </div>
                    <div v-if="tenderItemData" class="tender-item__actions-block">
                        <a href="javascript:{}" title="Распечатать" @click="print"><svg class="sprite-print"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#print"></use></svg></a>
                        <a href="javascript:{}" title="Приложенные файлы" @click="changeActiveTab($event, '#documents')">
                            <svg class="sprite-paperclip"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#paperclip"></use></svg>
                        </a>
                        <a href="javascript:{}" title="Написать продавцу" v-if="$store.getters.userRole === 'contractor'"><svg class="sprite-message"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#message"></use></svg></a>
                        <!-- <a href="javascript:{}" :title="itemMarkExist(tenderItemData, 'favorite') ? 'Удалить из избранного' : 'Добавить в избранное'" v-if="$store.getters.userRole === 'contractor'" @click="updateItemMark(tenderItemData, 'favorite')" :class="{active: itemMarkExist(tenderItemData, 'favorite')}">
                            <svg class="sprite-favorite"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#favorite"></use></svg>
                        </a>
                        <a href="javascript:{}" :title="itemMarkExist(tenderItemData, 'hidden') ? 'Показать' : 'Скрыть'" v-if="$store.state.auth.loggedIn" @click="updateItemMark(tenderItemData, 'hidden')" :class="{active: itemMarkExist(tenderItemData, 'hidden')}">
                            <svg class="sprite-hide"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#hide"></use></svg>
                        </a> -->
                        <a href="javascript:{}" :title="itemMarkExist(tenderItemData, 'hidden') ? 'Показать' : 'Скрыть'" @click="updateItemMark(tenderItemData, 'hidden', itemMarkExist(tenderItemData, 'hidden') ? 'Процедура показана' : 'Процедура скрыта')" v-if="$store.getters.userRole === 'buyer' || $store.getters.userRole === 'contractor'" :class="[{active: itemMarkExist(tenderItemData, 'hidden')}, 'tender-item__actions-link']">
                            <svg class="sprite-hide"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#hide"></use></svg>
                        </a>
                        <a href="javascript:{}" :title="itemMarkExist(tenderItemData, 'favorite') ? 'Удалить из избранного' : 'Добавить в избранное'" @click="updateItemMark(tenderItemData, 'favorite', itemMarkExist(tenderItemData, 'favorite') ? 'Процедура удалена из избранного' : 'Процедура добавлена в избранное')" v-if="$store.getters.userRole === 'contractor'" :class="[{active: itemMarkExist(tenderItemData, 'favorite')}, 'tender-item__actions-link']">
                            <svg class="sprite-favorite"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#favorite"></use></svg>
                        </a>
                    </div>
                </div>
                <div v-if="tenderItemData.purchase_subject && tenderItemData.purchase_subject.start_price" class="tender-item__start-price">
                    <div class="tender-item__start-price-text">
                        Начальная цена:
                    </div>
                    <div class="tender-item__start-price-num">
                        {{ formatPriceWithCurrency(tenderItemData.purchase_subject.start_price, tenderItemData.purchase_currency) }}
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
                    <div v-if="tenderItemData.purchase_term && tenderItemData.purchase_term.procedure_date_to" class="tender-item__date">
                        <div class="tender-item__date-text">
                            Дата окончания:
                        </div>
                        <div class="tender-item__date-day">
                            {{ formatDateNoTime(tenderItemData.purchase_term.procedure_date_to) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tender-item__products">
            <div class="tender-item__products-actions">
                <span @click="isProductsShown = !isProductsShown" :class="[isProductsShown ? '': 'tender-item__products-show--hided', 'tender-item__products-show']">
                    {{isProductsShown ? 'Скрыть позиции' : 'Показать позиции' }}
                </span>
                <a v-if="$store.getters.userRole === 'contractor'" href="#" class="btn btn--bdr tender-item__products-apply">Отправить заявку</a>
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
                    <TenderItemProductCard :item="item" :hide="!isProductsShown ? key >= 3 : false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../helpers/api'
import formatDate from "@/helpers/formatDate"
import functions from "@/helpers/functions";
import Actions from './actions.vue'
import TenderItemProductCard from './tenderItemProductCard.vue'
import popupCompanyContact from "@/components/blocks/popupCompanyContact"
import popupTenderDelivery from "@/components/blocks/popupTenderDelivery"

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
        },
        itemsStatuses: {
            default: [],
            type: Array
        },
    },

    components: {
        Actions,
        TenderItemProductCard,
        popupCompanyContact,
        popupTenderDelivery,
    },

    mixins: [api, formatDate, functions],

    data() {
        return {
            isProductsShown: false,
        }
    },

    methods: {
        print() {
            window.print();
        },
        getTenderStatusName(item) {
            const status = this.itemsStatuses.find(
                (status) => status.id === item.status,
            );
            if (status) {
                return status.name;
            }
            return item.status;
        },
        itemMarkExist(item, mark) {
            return item.marks.find((item) => item.mark_code === mark);
        },
        updateItemMark(item, mark) {
            if( !this.itemMarkExist(item, mark) ) {
                this.addMarketplaceProcedureMark(item.id, mark)
                    .then((response) => {
                        const mark = response.data.data;
                        item.marks.push(mark);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                this.removeMarketplaceProcedureMark(item.id, mark)
                    .then((response) => {
                        const mark = response.data.data;
                        item.marks.forEach((i, index) => {
                            if (i.mark_code === mark) item.marks.splice(index, 1)
                        });
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        updateItemMark(item, mark, msg) {
            if( this.itemMarkExist(item, mark) ) {
                this.removeMarketplaceProcedureMark(item.id, mark)
                    .then((response) => {
                        // const newMark = response.data.data;
                        item.marks.forEach((i, index) => {
                            if (i.mark_code === mark) item.marks.splice(index, 1)
                        });
                        window.notificationSuccess(msg);
                        if (this.$store.getters.userRole === 'contractor' && ((mark === 'hidden' && this.view !== 'favorite') || (mark === 'favorite' && this.view === 'favorite'))) {
                            this.$emit('getItems');
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        window.notificationError('Ошибка сервера');
                    });
            } else {
                this.addMarketplaceProcedureMark(item.id, mark)
                    .then((response) => {
                        const newMark = response.data.data;
                        item.marks.push(newMark);
                        window.notificationSuccess(msg);
                        if (this.$store.getters.userRole === 'contractor' && ((mark === 'hidden' && this.view !== 'favorite') || (mark === 'favorite' && this.view === 'favorite'))) {
                            this.$emit('getItems');
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        window.notificationError('Ошибка сервера');
                    });
            }
        },
        changeActiveTab(evt, tab) {
            evt.preventDefault();
            this.$emit('changeTab', evt, tab, true);
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
            @media print {
                border: 0 !important;
            }
        }
        &__info {
            background-color: #fff;
            border-radius: 6px;
            padding: rem(24px) rem(32px);
            /*width: calc(100% - 315px);*/
            flex-grow: 1;
            @media print {
                margin: 0;
                border-radius: 0;
                padding: 0;
                width: 100%;
            }
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
            color: $colorTextLight;
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
                /*text-decoration: underline;*/
                @media print {
                    text-decoration: none;
                    color: $colorText;
                }
                a {
                    color: $colorTurquoise;
                    @media print {
                        text-decoration: none;
                        color: $colorText;
                    }
                    &:hover {
                        color: $colorTurquoiseHover;
                    }
                }
            }
        }
        &__status {
            font-weight: 700;
            font-size: rem(14px);
            line-height: rem(16px);
            color: $colorTextLight;
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
            color: $colorTextLight;
        }
        &__actions {
            padding-bottom: rem(38px);
            display: flex;
            align-items: center;
            &-block {
                display: flex;
                align-items: center;
                margin-left: 1rem;
                @media print {
                    display: none;
                }
                svg {
                    display: block;
                    width: 20px;
                    height: 20px;
                    margin-left: 1rem;
                }
            }
            &-link {
                svg.sprite-hide,
                svg.sprite-favorite {
                    fill: $colorGray;
                }
                &.active {
                    svg.sprite-hide,
                    svg.sprite-favorite {
                        fill: $colorTurquoise;
                    }

                    &:hover {
                        svg.sprite-hide,
                        svg.sprite-favorite {
                            fill: $colorTurquoiseHover;
                        }
                    }
                }
            }
        }
        &__products {
            &-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: rem(29px);
                @media print {
                    display: none;
                }
            }
            &-show {
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                color: $colorTurquoise;
                position: relative;
                padding-right: rem(18px);
                cursor: pointer;
                min-width: 150px;
                &::after {
                    content: '';
                    position: absolute;
                    display: inline-block;
                    background: url('/assets/img/content/down.png') no-repeat;
                    background-size: contain;
                    width: 8px;
                    height: 5px;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    transition: all .5s ease-out;
                }
                &--hided::after {
                    transform: translateY(-50%) rotate(180deg);
                }
            }
            &-table {
                padding: rem(77px) 0 rem(31px);
                @media print {
                    padding: 0;
                }
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
    @include mq($until: widescreen) {
        .tender-item {
            &__info {
                width: calc(100% - 296px);
            }
            &__requsites {
                flex-direction: column;
            }
            &__row {
                flex-direction: column;
            }
        }
        .table-cell {
            &__title {
                width: 30%;
                padding-right: 0.75rem;
            }
            &__quantity {
                width: 15%;
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
                width: 15%;
            }
        }
    }

    @include mq($until: desktop) {
        .tender-item {
            &__info {
                width: 100%;
            }
        }
    }

    @include mq($until: 575px) {
        .tender-item {
            &__main {
                flex-direction: column;
            }
            &__products {
                &-actions {
                    flex-direction: column-reverse;
                }
                &-apply {
                    width: 100%;
                    margin-bottom: 1rem;
                }
                &-table {
                    padding-top: 2rem;
                }
                &-thead {
                    display: none;
                }
            }
        }
    }
</style>