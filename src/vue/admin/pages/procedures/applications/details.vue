<template>
    <div :class="['application', { 'application--with-tabs': tabs.length && !loading }]">
        <application-tabs
            v-if="tabs.length && !loading"
            class="application__tabs"
            :tabs="tabs"
            @on-change="currentTabIndex = $event"
        ></application-tabs>
        <div v-if="loading" class="preloader">
            <div class="preloader__preloader">
                <div class="preloader__loader"></div>
            </div>
        </div>
        <div v-if="currentTabIndex === 0 && !loading" class="application__content">
            <application-title title="Заявка на участие в торговой процедуре" margin="0 0 32px"></application-title>
            <application-purchase-block
                :procedure="procedure"
                :currency-type="currencyType"
                :trading-type="tradingType.text"
            ></application-purchase-block>
            <application-security-block
                :procedure="procedure"
                :application="application"
                :currency-type="currencyType"
                @on-upload="application.documents.security = [$event]"
                :disabled="viewType.isView"
            ></application-security-block>

            <application-lots-block
                :procedure="procedure"
                :application="application"
                :is-auction="viewType.isAuction"
                :lots="lots"
                :currency-type="currencyType"
                @on-upload="application.documents.lots = [$event]"
                @on-check-agreement="application.agreement = $event"
                @on-check-lot="errors.lots = false"
                :disabled="viewType.isView"
                :errors="errors.lots"
            ></application-lots-block>
            <application-title
                v-if="viewType.isAuction"
                title="2 часть заявки"
                font-size="20px"
                margin="0 0 16px"
            ></application-title>
            <application-company-block
                :procedure="procedure"
                :application="application"
                @on-company-select="onCompanySelect"
                :disabled="viewType.isView"
                :errors="errors.company"
            ></application-company-block>
            <application-additional-block
                :procedure="procedure"
                :application="application"
                @on-upload="application.documents.additional_documents = $event"
                @on-input="application.description = $event"
                :disabled="viewType.isView"
            ></application-additional-block>

            <!-- <application-checkbox
                :value="viewType.isAuction ? application.autoBot : application.agreement"
                :label="tradingType.checkboxLabel"
                @click="viewType.isAuction ? (application.autoBot = $event) : (application.agreement = $event)"
            ></application-checkbox> -->
            <div v-if="viewType.isCreate || viewType.isDraft" class="application__buttons">
                <button class="application__button" @click="createApplication">
                    Подписать и отправить
                </button>
                <button class="application__button application__button--second" @click="createApplicationDraft">
                    Сохранить черновик
                </button>
            </div>
            <div v-if="viewType.chooseWinner" class="application__buttons">
                <button class="application__button" @click="chooseWinnerApplication">
                    Выбрать победителем
                </button>
                <button class="application__button application__button--second" @click="rejectApplication">
                    Отклонить
                </button>
            </div>
        </div>

        <application-request-price
            v-if="currentTabIndex === 2"
            :procedure="procedure"
            :application="application"
            :is-auction="viewType.isAuction"
            :lots="lots"
            :currency-type="currencyType"
        ></application-request-price>
    </div>
</template>
<script>
import api from '@/helpers/api'
import functions from '@/helpers/functions'

import ApplicationTitle from '../../../../components/admin/procedures/applications/ApplicationTitle.vue'
import ApplicationCheckbox from '../../../../components/admin/procedures/applications/ApplicationCheckbox.vue'
import ApplicationTooltip from '../../../../components/admin/procedures/applications/ApplicationTooltip.vue'
import ApplicationPurchaseBlock from '../../../../components/admin/procedures/applications/blocks/ApplicationPurchaseBlock.vue'
import ApplicationSecurityBlock from '../../../../components/admin/procedures/applications/blocks/ApplicationSecurityBlock.vue'
import ApplicationLotsBlock from '../../../../components/admin/procedures/applications/blocks/ApplicationLotsBlock.vue'
import ApplicationCompanyBlock from '../../../../components/admin/procedures/applications/blocks/ApplicationCompanyBlock.vue'
import ApplicationAdditionalBlock from '../../../../components/admin/procedures/applications/blocks/ApplicationAdditionalBlock.vue'
import ApplicationTabs from '../../../../components/admin/procedures/applications/ApplicationTabs.vue'
import ApplicationRequestPrice from '../../../../components/admin/procedures/applications/ApplicationRequestPrice.vue'

export default {
    components: {
        ApplicationAdditionalBlock,
        ApplicationCompanyBlock,
        ApplicationLotsBlock,
        ApplicationSecurityBlock,
        ApplicationPurchaseBlock,
        ApplicationTooltip,
        ApplicationCheckbox,
        ApplicationTitle,
        ApplicationRequestPrice,
        ApplicationTabs
    },
    mixins: [api, functions],
    filters: {
        numberWithSpaces(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }
    },
    data() {
        return {
            procedure: {
                company: {},
                selectedCompany: {},
                tender_trading_type: ''
            },
            application: {
                accepted: 1,
                tender_trading_type: '',
                inn: '',
                description: '',
                documents: {
                    security: {},
                    additional_documents: [],
                    lots: []
                },
                status: '',
                products: [],
                autoBot: false,
                agreement: false
            },
            loading: true,
            lots: [],
            errors: {
                company: false,
                lots: false
            },
            currentTabIndex: 0
        }
    },
    computed: {
        procedureId() {
            return this.$route.params.id
        },
        applicationId() {
            return this.$route.params.appid
        },
        viewType() {
            return {
                isCreate: this.applicationId === 'new',
                isAuction: this.procedure.tender_trading_type == 'auction',
                isDraft: this.application.status === 'draft',
                isView: this.application.status !== 'draft' && this.applicationId !== 'new',
                chooseWinner: this.application.status === 'submitted' && this.$store.state.auth.role === 'buyer',
                winnerProcessing:
                    this.application.status === 'winner_processing' && this.$store.state.auth.role === 'contractor'
            }
        },
        tabs() {
            const tabs = []
            if (this.viewType.winnerProcessing) {
                if (this.procedure?.rebidding_info?.declared_rebidding_type === 'rebidding') {
                    tabs.push({ index: 1, name: 'Переторжка' })
                }

                if (this.procedure?.rebidding_info?.declared_rebidding_type === 'price_request') {
                    tabs.push({ index: 2, name: 'Запрос цен' })
                }

                if (this.viewType.isAuction) {
                    tabs.push({ index: 3, name: 'Аукцион' })
                }

                if (tabs.length) {
                    tabs.unshift({ index: 0, name: 'Заявка' })
                }
            }

            return tabs
        },
        tradingType() {
            switch (this.procedure.tender_trading_type) {
                case 'request_prices':
                    return {
                        text: 'Запрос цен',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                case 'auction':
                    return {
                        text: 'Аукцион',
                        checkboxLabel: 'Подключить автобота'
                    }
                    break
                case 'request_offers':
                    return {
                        text: 'Запрос предложений',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                case 'contest':
                    return {
                        text: 'Конкурс',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                case 'purchase_from_supplier':
                    return {
                        text: 'Закупка у единственного поставщика',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                default:
                    return {
                        text: 'Коммерческая закупка',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
            }
        },
        currencyType() {
            switch (this.procedure.purchase_currency) {
                case 'rub':
                    return { text: 'Рубль', symbol: '₽' }
                    break
                case 'eur':
                    return { text: 'Евро', symbol: '€' }
                    break
                case 'usd':
                    return { text: 'Доллар', symbol: '$' }
                    break
                default:
                    return { text: 'Рубль', symbol: '₽' }
                    break
            }
        }
    },
    watch: {
        $route(to, from) {
            this.init()
        }
    },
    methods: {
        getProcedureDetails() {
            return this.fetchTenderItem(this.procedureId).then(({ data }) => {
                this.procedure = Object.assign(this.procedure, data.data)
                this.createLots()

                return this.fetchCompanyByInn(this.procedure.inn).then(({ data }) => {
                    this.procedure.company = data.data
                })
            })
        },
        getApplication() {
            return this.fetchProcedureApplication(this.applicationId).then(({ data }) => {
                this.procedure = Object.assign(this.procedure, data.data.procedure)

                this.application = Object.assign(this.application, data.data)
                delete this.application.procedure

                this.createLots()

                if (data?.data?.documents?.length ?? false) {
                    this.application.documents.forEach((document, i) => {
                        if (this.application.documents[document.properties.group]) {
                            this.application.documents[document.properties.group].push(document)
                        } else {
                            this.application.documents[document.properties.group] = [document]
                        }

                        delete this.application.documents[i]
                    })
                }

                return this.fetchCompanyByInn(this.procedure.inn).then(({ data }) => {
                    this.procedure.company = data.data
                })
            })
        },
        createApplicationDraft() {
            const data = this.createApplicationObject()

            if (!data) {
                return
            }

            window.openLoader()
            this.sendProcedureApplicationDraft(this.procedureId, data)
                .then(({ data }) => {
                    window.notificationSuccess('Черновик успешно сохранен')
                    this.$router.push(`/personal/procedures/${this.procedureId}/applications/${data.data.id}`)
                })
                .finally(() => window.closeLoader())
        },
        createApplication() {
            const data = this.createApplicationObject()

            if (!data) {
                return
            }

            window.openLoader()
            if (this.viewType.isCreate) {
                this.sendProcedureApplicationDraft(this.procedureId, data).then(({ data }) => {
                    this.sendProcedureApplicationStatus(data.data.id, 'submitted')
                        .then(() => {
                            window.notificationSuccess('Заявка успешно отправлена')
                            this.$router.push(`/personal/procedures/${this.procedureId}/applications/${data.data.id}`)
                        })
                        .finally(() => window.closeLoader())
                })
            } else {
                this.sendProcedureApplicationStatus(this.applicationId, 'submitted')
                    .then(() => {
                        window.notificationSuccess('Заявка успешно отправлена')
                        this.init()
                    })
                    .finally(() => window.closeLoader())
            }
        },
        rejectApplication() {
            this.sendProcedureApplicationStatus(this.applicationId, 'rejected')
                .then(() => {
                    window.notificationSuccess('Заявка успешно отклонена')
                    this.init()
                })
                .finally(() => window.closeLoader())
        },
        chooseWinnerApplication() {
            this.sendProcedureApplicationStatus(this.applicationId, 'winner_chosen')
                .then(() => {
                    window.notificationSuccess('Победитель успешно выбран')
                    this.init()
                })
                .finally(() => window.closeLoader())
        },
        createApplicationObject() {
            const applicationCopy = Object.assign({}, this.application)

            applicationCopy.products = []
            this.lots.forEach(lot => {
                if (lot.checked) {
                    lot.products.forEach(product => {
                        product.product_id = product.id
                        product.country = product?.country?.code ?? 'RU'
                        product.currency = this.procedure.purchase_currency

                        applicationCopy.products.push(product)
                    })
                }
            })

            Object.entries(applicationCopy.documents).forEach(value => {
                if (value[1].length) {
                    value[1].forEach((document, i) => {
                        if (document.id) {
                            if (applicationCopy.documents[`${value[0]}_old`]) {
                                applicationCopy.documents[`${value[0]}_old`].push(document.id)
                            } else {
                                applicationCopy.documents[`${value[0]}_old`] = [document.id]
                            }

                            applicationCopy.documents[value[0]] = applicationCopy.documents[value[0]].filter(
                                element => element.id !== document.id
                            )
                        }
                    })
                }
            })

            applicationCopy.inn = this.procedure.selectedCompany.inn
            applicationCopy.tender_trading_type = this.procedure.tender_trading_type

            if (applicationCopy.description.trim() === '') {
                delete applicationCopy.description
            }

            if (this.validateApplication(applicationCopy)) {
                return this.objectToFormData(applicationCopy)
            } else {
                return null
            }
        },
        validateApplication(app) {
            let hasErrors = false

            this.errors = {
                company: false,
                lots: false
            }

            if (!app.inn) {
                hasErrors = true
                this.errors.company = true
            }

            if (!app.products.length) {
                hasErrors = true
                this.errors.lots = true
            }

            if (hasErrors) {
                const top = window.scrollY / 2
                window.scrollTo({
                    top,
                    behavior: 'smooth'
                })

                return false
            } else {
                return true
            }
        },
        createLots() {
            let lots = []
            this.procedure.purchase_subject.lot_amounts.forEach((amount, i) => {
                const lot = {
                    name: `Лот ${i + 1}`,
                    id: i + 1,
                    checked: false,
                    amount: Number(amount).toFixed(2),
                    amountWithVat: 0,
                    currency: this.currencyType,
                    country: {
                        code: 'RU',
                        flag:
                            'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAa0lEQVR42u3QwQkAMAgAMfdf2hYc4yIc6NPM7k659PMAAAAAAAAAAAAAAFy1AQAAAAAAAAAAAAAAAIC/zF2VAAAAAAAAAAAAAAAAAODqCQAAAAAAAAAAAAAAAAAAgGwAAAAAAAAAAAAAAER72yqN3ef7lPIAAAAASUVORK5CYII=',
                        id: 131,
                        name: 'Россия',
                        name_en: 'Russia',
                        phone_code: 7
                    },
                    products: []
                }

                if (!this.viewType.isCreate) {
                    this.application.subject.products.forEach(product => {
                        if (
                            product.purchase_product.lot == i + 1 ||
                            (this.procedure.purchase_subject.lot_amounts.length === 1 &&
                                product.purchase_product.lot === null)
                        ) {
                            product.product_id = product.id
                            product.amount_per_position = parseFloat(
                                parseInt(product.quantity ?? 0, 10) *
                                    parseFloat(product.price_for_one ?? 0, 10) *
                                    (1 + parseInt(product.vat ?? 0, 10) / 100)
                            ).toFixed(2)

                            lot.products.push(product)
                            lot.checked = true
                        }
                    })
                } else {
                    this.procedure.purchase_subject.products.forEach(product => {
                        if (
                            product.lot == i + 1 ||
                            (this.procedure.purchase_subject.lot_amounts.length === 1 && product.lot === null)
                        ) {
                            product.product_id = product.id
                            product.country = lot.country

                            product.amount_per_position = parseFloat(
                                parseInt(product.quantity ?? 0, 10) *
                                    parseFloat(product.price_for_one ?? 0, 10) *
                                    (1 + parseInt(product.vat ?? 0, 10) / 100)
                            ).toFixed(2)

                            lot.products.push(product)
                        }
                    })
                }

                lot.amountWithVat = parseFloat(
                    lot.products.reduce((price, product) => {
                        return price + parseFloat(product.amount_per_position)
                    }, 0)
                ).toFixed(2)

                if (lot.products.length) {
                    lots.push(lot)
                }
            })

            this.procedure.purchase_subject.start_price = parseFloat(
                lots.reduce((amount, lot) => {
                    return amount + parseFloat(lot.amountWithVat, 10)
                }, 0),
                10
            )
                .toFixed(2)
                .replace('.00', '')

            this.lots = lots.slice()
        },
        onCompanySelect(value) {
            this.procedure.selectedCompany = value
            this.errors.company = false
        },
        init() {
            if (this.viewType.isCreate) {
                this.loading = true
                this.getProcedureDetails().finally(() => (this.loading = false))
            } else {
                this.loading = true
                this.getApplication().finally(() => (this.loading = false))
            }
        }
    },
    created() {
        this.init()
    }
}
</script>
<style lang="scss">
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.application {
    background-color: #fff;
    min-height: 300px;

    * {
        outline: none;

        &::-webkit-scrollbar {
            background-color: transparent;
            border-radius: 0;
            height: 4px;
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: $colorTurquoise;
            width: 4px;
            height: 4px;
            border-radius: 4px;
        }
    }

    &--with-tabs {
        position: relative;

        margin-top: rem(106px);

        @include mq($until: desktop) {
            margin-top: rem(212px);
        }
    }

    &--with-tabs &__content {
        padding-top: 0;

        @include mq($until: desktop) {
            padding: 0 rem(16px) rem(40px);
        }
    }

    &__tabs {
        position: absolute;
        top: -72px;
        left: 0;

        @include mq($until: desktop) {
            top: -87px;
        }
    }

    &__content {
        width: 100%;
        padding: rem(40px);
        border-radius: 6px;

        @include mq($until: desktop) {
            padding: rem(80px) rem(16px) rem(40px);
        }
    }

    &__section {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        position: relative;

        margin-bottom: rem(48px);
    }

    &__section-row {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        width: 100%;
        margin-bottom: rem(24px);

        @include mq($from: tablet) {
            align-items: center;
            flex-flow: row wrap;
        }
    }

    &__section-title {
        margin-right: rem(69px);
        width: 220px;
        min-width: 220px;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: $colorTextLight;
        white-space: nowrap;

        @include mq($until: tablet) {
            margin-right: rem(8px);
        }
    }

    &__section-text {
        margin-right: auto;

        font-family: Roboto;
        font-size: rem(14px);
        color: $colorTextLight;
    }

    &__section-link {
        outline: none;
        border: none;
        background-color: transparent;
        margin-right: auto;
        padding: 0;

        font-family: Roboto;
        font-size: rem(14px);
        text-decoration-line: underline;
        color: $colorTurquoise;
    }

    &__buttons {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        margin-top: rem(56px);

        @include mq($until: mobileLandscape) {
            justify-content: center;
        }
    }

    &__button {
        width: 100%;
        max-width: 278px;
        margin-right: rem(16px);
        margin-bottom: rem(16px);
        padding: rem(13px) 0;
        background-color: $colorTurquoise;
        border-radius: 6px;
        border: 1px solid $colorTurquoise;
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #ffffff;

        @include mq($until: mobileLandscape) {
            margin-right: 0;
        }

        &:active,
        &:hover {
            background-color: lighten($color: $colorTurquoise, $amount: 5%);
        }

        &:disabled {
            border: 1px solid $colorGray;
            background-color: transparent;
            color: $colorGray;

            &:hover {
                background-color: lighten($color: $colorGray, $amount: 25%);
            }
        }

        &--second {
            margin: 0;
            background-color: #f4f4f4;
            color: $colorTurquoise;

            &:active,
            &:hover {
                background-color: lighten($color: #f4f4f4, $amount: 1%);
            }
        }
    }
}

.divider {
    width: 100%;
    height: 1px;
    background-color: $colorBdr;
    margin: rem(12px) 0 rem(20px);

    &--no-margin {
        margin: 0;
    }
}
</style>
