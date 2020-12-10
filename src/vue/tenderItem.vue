<template>
    <div class="tender-item">
        <div class="tender-item__top">
            <TenderItemCard v-if="!isLoading" :tenderItemData="tenderItemData" :company="company" />
            <TenderItemMenu v-if="!isLoading" :activeTab="activeTab" @changeTab = "changeTab" />            
        </div>
        <div class="tender-item__tabs">
            <TenderItemTabs 
                v-if="!isLoading"
                :tenderItemData="tenderItemData"
                :company="company"
                :activeTab="activeTab"
                @changeTab = "changeTab"
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
import functions from './helpers/functions'
import TenderItemCard from './components/blocks/tenderItemCard.vue'
import TenderItemMenu from './components/blocks/tenderItemMenu.vue'
import TenderItemTabs from './components/blocks/tenderItemTabs.vue'

export default {
    name: 'TenderItem',

    components: {
        TenderItemCard,
        TenderItemMenu,
        TenderItemTabs
    },

    mixins: [api],

    data() {
        return {
            tenderItemId: '',
            isLoading: true,
            activeTab: 'main-info',
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
                id: null,
                inn: null,
                kpp: null,
                name: null,
                shortName: null,
            }
        }
    },

    created() {
        this.getTenderItemId()
        this.getTenderItemMainData(this.tenderItemId)
    },

    methods: {
        getTenderItemId() {
            this.tenderItemId = document.querySelector('#tender-item').getAttribute('data-id')
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
            // this.fetchCompanyById(this.tenderItemData.company_id)
            this.fetchCompanyById(1)
                .then((response) => {
                    this.company = response.data.data;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        changeTab(tab) {
            this.activeTab = tab;
        }
    }
}
</script>

<style lang="scss" scoped>
    .tender-item {
        position: relative;
        &__top {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
    }
</style>