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
                    // this.fillTenderItemData(response.data.data)
                    this.fillTenderItemData(
                        {
                            "id": 10,
                            "user_id": 19,
                            "status": "planned",
                            "tender_trading_format": "trading_223",
                            "tender_trading_type": "request_offers",
                            "tender_available": false,
                            "prices_are_confidential": true,
                            "analog_products": true,
                            "tender_framework_contract": true,
                            "alternative_applications": true,
                            "many_stages_of_procurement": false,
                            "rebidding": true,
                            "tender_tolerance": true,
                            "addition_information": "Some addition information",
                            "contact_id": 44,
                            "company_id": 2,
                            "publication_date": '2020-08-26 00:00:00',
                            "purchase_currency": "rub",
                            "hide_participants_names": true,
                            "purchase_subject": {
                            "description": "Какое-то описание",
                            "lots_number": 3,
                            "positional_purchase": true,
                            "products_analogues": true,
                            "lot_amounts": {
                                "1": 3000,
                                "2": 1000,
                                "3": 1000
                            },
                            "start_price": 5000,
                            "products": [
                                {
                                "id": 1,
                                "quantity": 44.5,
                                "price_for_one": 2,
                                "vat": 10,
                                "availability_of_analogues": true,
                                "name": "кабеля",
                                "is_product": true,
                                "category_okpd2": "27.32.1",
                                "lot": 2,
                                "measure": "m",
                                "marksize_id": "m"
                                }
                            ]
                            },
                            "summarizing": {
                            "competition_commission": "Комиссия ...",
                            "documentation_receipt_date": '2020-08-26 09:00:00',
                            "documentation_receipt_place": "Адрес такой-то",
                            "application_consideration_date": '2020-08-26 00:00:00',
                            "application_consideration_form": "analog",
                            "application_consideration_place": "Ещё адрес",
                            "summing_up_date": '2020-08-26 00:00:00',
                            "summing_up_place": "И ещё один адрес"
                            },
                            "purchase_term": {
                            "contract_conclusion_from": '2020-08-26 00:00:00',
                            "contract_conclusion_to": '2020-08-26 00:00:00',
                            "delivery_from": '2020-08-26 00:00:00',
                            "delivery_to": '2020-08-26 00:00:00',
                            "opening_from": '2020-08-26 00:00:00',
                            "opening_to": '2020-08-26 00:00:00',
                            "application_end_date": '2020-08-26 00:00:00',
                            "procedure_date_from": '2020-08-26 00:00:00',
                            "procedure_date_to": '2020-08-26 00:00:00',
                            "consideration_of_bids": true,
                            "comment": "Some comment"
                            },
                            "payment_and_delivery": {
                            "prepayment": false,
                            "payment_info": "Какая-то информация",
                            "possible_letter_of_credit": false,
                            "delivery_terms": "Some delivery terms",
                            "delivery_address": "Some delivery address"
                            },
                            "guarantee": {
                            "contract_collateral": {
                                "calc_amount": "percent",
                                "percent_of_init_price": 50,
                                "amount": 1000,
                                "blocking_period": 30
                            },
                            "application_collateral": {
                                "calc_amount": "percent",
                                "percent_of_init_price": 50,
                                "amount": 1000,
                                "blocking_period": 30
                            },
                            "application_ensuring": "transfer_to_organizer_account"
                            },
                            "participate_invitation": {
                            "companies": [
                                2
                            ],
                            "emails": [
                                "user@example.com"
                            ]
                            },
                            "documents": [
                            {
                                "id": 9,
                                "file": {
                                "name": "some_file.txt",
                                "url": "http://localhost:10180/storage/procedure/19/some_file.txt"
                                }
                            },
                            {
                                "id": 10,
                                "file": {
                                "name": "some_file1.txt",
                                "url": "http://localhost:10180/storage/procedure/19/some_file.txt"
                                }
                            },
                            {
                                "id": 11,
                                "file": {
                                "name": "some_file2.txt",
                                "url": "http://localhost:10180/storage/procedure/19/some_file.txt"
                                }
                            }
                            ],
                            "marks": [
                            {
                                "id": 9,
                                "user_id": 10,
                                "mark_code": "work"
                            }
                            ],
                            "additional_fields": [
                            {
                                "id": 9,
                                "type": "type",
                                "name": "Какое-то поле",
                                "value": "Какое-то значение",
                                "description": "Какое-то описание"
                            }
                            ]
                        }
                    )
                    this.isLoading = false
                    this.getCompanyData()
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getCompanyData() {
            this.fetchCompanyById(this.tenderItemData.company_id)
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