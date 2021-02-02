<template>
    <div class="tender-item__winner">
        <div class="tender-item__tabs">
            <div class="tabs tabs--line" v-if="tenderItemData.purchase_subject && tenderItemData.purchase_subject.lot_amounts && tenderItemData.purchase_subject.lot_amounts.length > 0">
                <ul v-if="tenderItemData.purchase_subject.lot_amounts.length === 1" class="js-more__items">
                    <li
                        class="active"
                    >
                        <a>Все заявки</a>
                    </li>
                </ul>
                <ul v-else class="js-more__items js-more__items--pointer">
                    <li
                        :class="[{'active': actualTab === 'all'}]"
                    >
                        <a @click="getApplicationsList()">Все заявки</a>
                    </li>
                    <li
                        v-for="(item, i) in tenderItemData.purchase_subject.lot_amounts"
                        :key="i"
                        :class="[{'active': actualTab === i+1}]"
                    >
                        <a @click="getParticipantsByLot(i+1)">
                            Лот {{ i+1 }}
                        </a>
                    </li>
                </ul>
            </div>
            <div v-if="!isLoading" class="winner-choice">
                <div class="winner-choice-all">
                    <div v-if="participants.length" class="winner-choice-all__items">
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
                                    <div v-show="participant.subject && participant.subject.lots_number">
                                        <div class="winner-choice__item-title">Лоты</div>
                                        <div class="winner-choice__item-value">
                                            <template v-if="typeof(participant.subject.lots_number) == 'number'">
                                                {{ participant.subject.lots_number }}
                                            </template>
                                            <template v-if="typeof(participant.subject.lots_number) == 'array'">
                                                {{ participant.subject.lots_number.length }}
                                            </template>
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
                    <div v-else class="winner-choice-all__items">
                        Заявок пока нет
                    </div>
                </div>
            </div>
        </div>
        <paginate
            v-if="totalPages"
            :page-count="totalPages"
            :click-handler="changePagination"
            prev-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            next-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            :prev-class="'catalog-pagination__prev'"
            :next-class="'catalog-pagination__next'"
            :container-class="'catalog-pagination'"
            :page-class="'catalog-pagination__item'"
            :value="page"
        />
    </div>
</template>

<script>
import formatDate from '@/helpers/formatDate.js'
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
    },

    mixins: [formatDate, functions],

    data() {
        return {
            perPage: 9,
            page: 1,
            currentFilter: {},
            participants: [],
            totalParticipants: 0,
            actualTab: 'all',
            isLoading: true,
            visibleRebiddingBtn: false
        }
    },

    computed: {
        totalPages() {
            return Math.ceil(this.totalParticipants / this.perPage)
        },
    },

    created() {
        this.getApplicationsList();
        this.showInitialRedibbingBtn();
    },

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
        changePagination(page) {
            this.page = page;
            this.getApplicationsList();
        },
        getApplicationsList() {
            this.fetchProcedureApplicationsList(this.tenderItemData.id, this.currentFilter, this.page)
                .then((data) => {
                    const items = data.data.data.items;
                    const companiesINN = [];
                    items.forEach((item, index) => {
                        items[index].company = null;
                        if (companiesINN.indexOf(items[index].inn) === -1) companiesINN.push(items[index].inn);
                    });
                    if (companiesINN.length) {
                        this.fetchCompaniesByINN(companiesINN)
                            .then((response) => {
                                const companies = response.data.data.elements;
                                companies.forEach((company) => {
                                    items.forEach((item) => {
                                        if (parseInt(company.inn) === parseInt(item.inn)) {
                                            item.company = company;
                                        }
                                    });
                                });
                            })
                            .catch((e) => {
                                console.log(e)
                            });
                    }
                    this.participants = items;
                    this.totalParticipants = data.data.data.total;
                    this.actualTab = 'all';
                    this.$emit('changeLotTab', 'all');
                    this.isLoading = false;
                    this.toggleRedibbingBtn(false);
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getParticipantsByLot(lot) {
            this.fetchProcedureApplicationsListByLot(lot, this.tenderItemData.id, this.currentFilter, this.page)
                .then((data) => {
                    this.isLoading = true;
                    const items = data.data.data.items;
                    const companiesINN = [];
                    items.forEach((item, index) => {
                        items[index].company = null;
                        if (companiesINN.indexOf(items[index].inn) === -1) companiesINN.push(items[index].inn);
                    });
                    if (companiesINN.length) {
                        this.fetchCompaniesByINN(companiesINN)
                            .then((response) => {
                                const companies = response.data.data.elements;
                                companies.forEach((company) => {
                                    items.forEach((item) => {
                                        if (parseInt(company.inn) === parseInt(item.inn)) {
                                            item.company = company;
                                        }
                                    });
                                });
                            })
                            .catch((e) => {
                                console.log(e)
                            });
                    }
                    this.participants = items;
                    this.totalParticipants = data.data.data.total;
                    this.actualTab = lot;
                    this.$emit('changeLotTab', lot);
                    this.isLoading = false;
                    this.toggleRedibbingBtn(true);
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        showInitialRedibbingBtn() {
            if (this.tenderItemData.purchase_subject.lot_amounts.length === 1) {
                this.visibleRebiddingBtn = true;
                this.$emit('visibleRebiddingBtn', true);
                return false;
            }
        },
        toggleRedibbingBtn(flag) {
            this.$emit('visibleRebiddingBtn', flag);
            return false;
        }
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
        .js-more__items {
            &--pointer {
                cursor: pointer;
            }
        }
    }
</style>