<template>
    <div class="tender-item">
        <div class="tender-item__top">
            <TenderItemCard 
                v-if="!isLoading"
                :tenderItemData="tenderItemData"
                :company="company"
                :itemsStatuses="itemsStatuses"
                @changeTab = "changeTab"
            />
            <TenderItemMenu
                v-if="!isLoading && $store.state.auth.loggedIn && $store.state.auth.user.id === tenderItemData.user_id"
                :tenderItemData="tenderItemData"
                :activeTab="activeTab"
                @changeTab = "changeTab"
                :tabs="tabs"
                :company="company"
                :buyerMenu="buyerMenu"
            />
        </div>
        <div class="tender-item__tabs">
            <TenderItemTabs 
                v-if="!isLoading"
                :tenderItemData="tenderItemData"
                :company="company"
                :activeTab="activeTab"
                @changeTab = "changeTab"
                :tabs="tabs"
                ref="tabs"
            />
        </div>
        <transition name="fade-loader">
            <div
                v-if="isLoading"
                class="card__loader card__loader--absolute"
            >
                <div class="preloader">
                    <div class="preloader__preloader">
                        <div class="preloader__loader"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import api from './helpers/api'
import functions from "@/helpers/functions";
import TenderItemCard from './components/blocks/tenderItemCard.vue'
import TenderItemMenu from './components/blocks/tenderItemMenu.vue'
import TenderItemTabs from './components/blocks/tenderItemTabs.vue'
import { initMore } from '../assets/js/main/modules/more.js'

export default {
    name: 'MarketplaceItem',

    components: {
        TenderItemCard,
        TenderItemMenu,
        TenderItemTabs,
    },

    mixins: [api, functions],

    data() {
        return {
            tenderItemId: '',
            isLoading: true,
            activeTab: 'info',
            tenderItemData: {
                addition_information: null,
                additional_fields: [],
                alternative_applications: null,
                amount_security: null,
                analog_products: null,
                application_consideration_date: null,
                application_consideration_form: null,
                application_consideration_place: null,
                application_finish_date: null,
                application_opening: null,
                application_security: null,
                application_summing_up_date: null,
                application_summing_up_place: null,
                bank_guarantee: null,
                blocking_period: null,
                calc_amount_of_collateral: null,
                company_id: null,
                competition_commission: null,
                connect_autobot: null,
                consideration_of_bids: null,
                contact_id: null,
                contract_security: null,
                created_at: null,
                delivery_address: null,
                delivery_terms: null,
                documentation_receipt_date: null,
                documentation_receipt_place: null,
                documents: [],
                hide_participants_names: null,
                id: null,
                lot_amounts: null,
                lots_number: null,
                many_stages_of_procurement: null,
                marks: [],
                payment_info: null,
                percent_of_init_price: null,
                positional_purchase: null,
                possible_letter_of_credit: null,
                prepayment: null,
                prices_are_confidential: false,
                procedure_date_from: null,
                procedure_date_to: null,
                procurement_subject_description: null,
                products: [],
                products_analogues: null,
                publication_allowed: null,
                publication_date: null,
                purchase_currency: null,
                rebidding: null,
                securing_application: null,
                start_price: null,
                status: null,
                tender_available: true,
                tender_framework_contract: false,
                tender_tolerance: null,
                tender_trading_format: null,
                tender_trading_type: null,
                terms_delivery_from: null,
                terms_delivery_to: null,
                terms_tender_from: null,
                terms_tender_to: null,
                timing_comment: null,
                updated_at: null,
                user_id: null,
            },
            company: {
                activityIndex: null,
                address: null,
                businessSize: null,
                buyer: null,
                childes: [],
                contractor: null,
                country: null,
                createdAt: null,
                declaration: null,
                directorFio: null,
                email: null,
                id: null,
                inn: null,
                innerRating: null,
                kpp: null,
                legalAddress: null,
                legalCountry: null,
                legalPostcode: null,
                legalType: null,
                mailingAddress: null,
                mailingCountry: null,
                mailingPostcode: null,
                name: null,
                ogrn: null,
                okpd2: null,
                okved: null,
                owner: null,
                phone: null,
                postcode: null,
                rating: null,
                regCountry: null,
                rnp: null,
                shortName: null,
                updatedAt: null,
                website: null,
            },
            itemsStatuses: [],
            buyerMenu: [
                {action: 'edit', name: 'Редактировать'},
                {action: 'attach-protocols', name: 'Прикрепить протоколы'},
                {action: 'winner', name: 'Выбор победителя'}
            ]
        }
    },

    created() {
        this.getTenderItemId()
        this.getTenderItemMainData(this.tenderItemId)
        this.checkUrlHash()
        this.getMarketplaceProceduresFilter()
    },

    mounted() {
        initMore();
    },

    computed: {
        tabs: function () {
            let result = [];
            result.push({
                name: "Общая информация",
                url: "#info"
            });
            result.push({
                name: "Заказчик",
                url: "#client"
            });
            if (this.tenderItemData.tender_trading_format === 'trading_223') {
                result.push({
                    name: "Список лотов",
                    url: "#lots"
                });
            }
            result.push({
                name: "Документы",
                url: "#documents"
            });
            if (this.tenderItemData.tender_trading_format === 'trading_223') {
                result.push({
                    name: "Разъяснения",
                    url: "#chat"
                });
                result.push({
                    name: "Протоколы",
                    url: "#protocols"
                });
            }
            result.push({
                name: "Журнал событий",
                url: "#logs"
            });
            return result;
        }
    },

    watch: {
        tabs(newValue) {
            this.$nextTick(() => {
                initMore();
                let tabs = this.$refs['tabs'].$refs['tabs'],
                    hash = window.location.hash.substr(1),
                    link = tabs.querySelector('li a[href="#'+hash+'"]') || tabs.querySelector('li.active a') || tabs.querySelector('li:nth-child(1) a');
                if (link) {
                    link.click();
                }
            });
        }
    },

    methods: {
        getTenderItemId() {
            this.tenderItemId = document.querySelector('#marketplace-item').getAttribute('data-id')
            return false
        },
        fillTenderItemData(data) {
            this.tenderItemData = data
        },
        getTenderItemMainData(id) {
            this.fetchTenderItem(id)
                .then((response) => {
                    this.fillTenderItemData(response.data.data)
                    this.isLoading = false
                    this.getCompanyData()
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getCompanyData() {
            this.fetchCompanyByInn(this.tenderItemData.inn)
                .then((response) => {
                    this.company = response.data.data;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        changeTab(evt, hash, scroll = false) {
            evt.preventDefault();
            this.activeTab = hash;
            hash = hash.replace('#', '');
            const el = document.getElementById(hash),
                tabs = this.$refs['tabs'].$refs['tabs'];
            if (el) {
                if (el.style.display === 'none') {
                    // если таб закрыт - открываем
                    let link = tabs.querySelector('li a[href="#' + hash + '"]');
                    if (link) {
                        if (scroll || window.innerWidth <= 767) {
                            // если надо - крутим к табу
                            this.scrollTo(tabs);
                        }
                        link.click();
                        this.setWindowHash(hash);
                    }
                }
            }
            return false;
        },
        checkUrlHash() {
            if (window.location.hash) {
                const hash = window.location.hash.substring(1);
                if (this.tenderItemData.tender_trading_format === 'trading_223' &&
                    (hash === 'main-info' ||
                    hash === 'client' ||
                    hash === 'lots' ||
                    hash === 'documents' ||
                    hash === 'protocols' ||
                    hash === 'logs' ||
                    hash === 'chat')
                ) {
                    this.activeTab = hash
                } else if (this.tenderItemData.tender_trading_format !== 'trading_223' &&
                    (hash === 'main-info' ||
                    hash === 'client' ||
                    hash === 'documents' ||
                    hash === 'logs')
                ) {
                    this.activeTab = hash
                }
            }
            return false
        },
        parseObjToArr(obj) {
            const arr = [];
            for (const key in obj) {
                arr.push({
                    id: key,
                    name: obj[key],
                });
            }
            return arr;
        },
        getMarketplaceProceduresFilter() {
            this.fetchMarketplaceProceduresFilter()
                .then((response) => {
                    let filterData = response.data.data.procedures;
                    console.log(filterData);
                    this.itemsStatuses = this.parseObjToArr(filterData.values.status);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/sass/variables/variables";
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";
    @import "../assets/sass/mixins/mq";

    .tender-item {
        position: relative;
        &__top {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
    }

    @include mq($until: desktop) {
        .tender-item {
            &__top {
                flex-direction: column-reverse;
            }
        }
    }
</style>