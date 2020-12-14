<template>
  <div>
    <ValidationObserver ref="form" tag="div" mode="eager">
      <form class="procedure__main" @submit.prevent="(evt) => evt.preventDefault()" slot-scope="{ valid }">
        <app-basic-information
            :selected-data="selectedData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :true-false-select="trueFalseSelect"
            :is-created-procedure="isCreatedProcedure"
            :clear-tender-trading-type="clearTenderTradingType"
        ></app-basic-information>
        <app-purchase-subject
            :selected-data="selectedData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :is-created-procedure="isCreatedProcedure"
            :counter-to-ten-select="counterToTenSelect"
            :remove-position="removePosition"
            :count-total-price="countTotalPrice"
            :create-new-position-fieldset="createNewPositionFieldset"
        ></app-purchase-subject>
        <app-consideration
            :selected-data="selectedData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :is-created-procedure="isCreatedProcedure"
        ></app-consideration>
        <app-terms-of-purchase
            :selected-data="selectedData"
            :procedure-id-data="procedureIdData"
        ></app-terms-of-purchase>
        <app-security-and-guarantees
            :selected-data="selectedData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :is-created-procedure="isCreatedProcedure"
        ></app-security-and-guarantees>
        <app-invitation-to-participate
            :selected-data="selectedData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :is-created-procedure="isCreatedProcedure"
        ></app-invitation-to-participate>
        <app-payment-and-delivery
            :selected-data="selectedData"
            :fields-data="fieldsData"
        ></app-payment-and-delivery>
        <app-additional-information
            :selected-data="selectedData"
        ></app-additional-information>
        <app-documentation
            :selected-data="selectedData"
            :is-not-files="isNotFiles"
            :is-created-procedure="isCreatedProcedure"
            :fields-data="fieldsData"
            :set-files="setFiles"
        ></app-documentation>
        <app-contact-information
            :selected-data="selectedData"
            :is-created-procedure="isCreatedProcedure"
            :fields-data="fieldsData"
        ></app-contact-information>
        <app-additional-fields
            :selected-data="selectedData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :is-created-procedure="isCreatedProcedure"
            :create-new-fieldset="createNewFieldset"
            :remove-field="removeField"
            :save-field="saveField"
            :validation="validation"
        ></app-additional-fields>
      </form>
    </ValidationObserver>
    <transition name="fade-loader">
      <local-preloader v-if="isLoading"/>
    </transition>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import api from '../../../../helpers/api'
import functions from '../../../../helpers/functions'
// import parsers from '../../../plugins/mixins/parsers'
import localPreloader from '../../../../components/preloader'
import BasicInformation from '../../../../components/admin/procedures/BasicInformation'
import PurchaseSubject from '../../../../components/admin/procedures/PurchaseSubject'
import Consideration from '../../../../components/admin/procedures/Consideration'
import TermsOfPurchase from '../../../../components/admin/procedures/TermsOfPurchase'
import SecurityAndGuarantees from '../../../../components/admin/procedures/SecurityAndGuarantees'
import PaymentAndDelivery from '../../../../components/admin/procedures/PaymentAndDelivery'
import AdditionalInformation from '../../../../components/admin/procedures/AdditionalInformation'
import Documentation from '../../../../components/admin/procedures/Documentation'
import ContactInformation from '../../../../components/admin/procedures/ContactInformation'
import InvitationToParticipate from '../../../../components/admin/procedures/InvitationToParticipate'
import AdditionalFields from '../../../../components/admin/procedures/AdditionalFields'

export default {
  name: 'ProcedureId',
  components: {
    localPreloader,
    appBasicInformation: BasicInformation,
    appPurchaseSubject: PurchaseSubject,
    appConsideration: Consideration,
    appTermsOfPurchase: TermsOfPurchase,
    appSecurityAndGuarantees: SecurityAndGuarantees,
    appPaymentAndDelivery: PaymentAndDelivery,
    appAdditionalInformation: AdditionalInformation,
    appDocumentation: Documentation,
    appContactInformation: ContactInformation,
    appInvitationToParticipate: InvitationToParticipate,
    appAdditionalFields: AdditionalFields,
  },
  mixins: [api, functions],
  data() {
    return {
      fieldsData: {
        tenderTradingFormat: [],
        tenderTradingType: [],
        tenderAvailable: [
          {id: 1, name: 'Открытый'},
          {id: 0, name: 'Закрытый'},
        ],
        tenderAvailableAuc: [
          {id: 1, name: 'Открытый аукцион'},
          {id: 0, name: 'Закрытый аукцион'},
        ],
        tenderAvailablePur: [
          {id: 1, name: 'Открытая закупка'},
          {id: 0, name: 'Закрытая закупка'},
        ],
        stagesProcedure: [
          {id: 1, name: 'Одноэтапная процедура'},
          {id: 0, name: 'Многоэтапная процедура'},
        ],
        alternativeApplications: [
          {id: 1, name: 'Возможны альтернативные заявки'},
          {id: 0, name: 'Невозможны альтернативные заявки'},
        ],
        goodsAnalogs: [
          {id: 1, name: 'допускаются'},
          {id: 0, name: 'не допускаются'},
        ],
        positionType: [
          {id: 1, name: 'Товар'},
          // { id: 0, name: 'Услуга' },
        ],
        positionLongUnits: [
          {id: 'm', name: 'Метры'},
          {id: 'km', name: 'Километры'},
        ],
        positionUnits: [
          {id: 'item', name: 'Штуки'},
          {id: 'unit', name: 'Единицы'},
        ],
        positionVAT: [
          {id: 0, name: '0%'},
          {id: 10, name: '10%'},
          {id: 20, name: '20%'},
        ],
        OKPD: [
          {id: 'products', name: 'Кабельно-проводниковая продукция'},
          {id: 'none', name: 'Не кабельно-проводниковая продукция'},
        ],
        fieldType: [
          {id: 'text', name: 'Текст'},
          {id: 'number', name: 'Число'},
          {id: 'date', name: 'Дата'},
        ],
        reviewForm: [
          {id: 'electronic', name: 'электронная'},
          {id: 'analog', name: 'аналоговая'},
        ],
        purchase_currency: [
          {id: 'rub', name: 'руб.'},
          {id: 'usd', name: 'usd'},
          {id: 'eur', name: 'eur'},
        ],
        validationLength: null,
        blockingPeriodDays: [],
        securingTheApplication: [],
        contacts_list: [],
        applicationDocumentationSection: [],
        titleOfTheDocument: [],
        addToLot: [],
        OKPD2: [],
        purchaseMethod: [],
        productPurchasePlanNum: [],
        amountOfCollateral: [],
        companies: [],
      },
      selectedData: {
        reviewForm: null,
        companyName: null,
        absolutTrade: 'Абсолют трейд',
        tender_trading_format: null,
        tender_trading_type: null,
        tender_framework_contract: 0,
        confidential_price: 0,
        hide_member_names: 0,
        connect_an_autobot_for_trading: 0,
        application_documentation_checked: 0,
        tender_eis_id: null,
        tender_available: null,
        alternative_applications: null,
        stages_of_the_procurement_procedure: null,
        overbidding_is_possible: 0,
        item_description: null,
        category_okpd2_id: [],
        invitedCompanies: [],
        invitedEmails: [],
        tender_tolerance: null,
        security: {
          calculate_the_amount_of_collateral: null,
          percentage_of_the_starting_price: null,
          collateral_amount_percents: null,
          collateral_amount: null,
          blocking_period_days: null,
        },
        request: {
          calculate_the_amount_of_collateral: null,
          percentage_of_the_starting_price: null,
          collateral_amount_percents: null,
          collateral_amount: null,
          blocking_period_days: null,
        },
        calculate_the_amount_of_collateral: null,
        collateral_amount: null,
        collateral_amount_percents: null,
        percentage_of_the_starting_price: null,
        commission: null,
        application_security_required: 0,
        application_prepayment: 0,
        consideration_of_auction_bids: 0,
        application_letter_of_credit: 0,
        application_comment: null,
        application_delivery_conditions: null,
        application_security_of_the_contract: 0,
        applications_delivery_address: null,
        application_payment_info: null,
        application_bank_guarantee: 0,
        application_documentation_section: 0,
        application_title_of_the_document: 0,
        place_of_receipt: null,
        place_of_consideration: null,
        place_of_consideration_total: null,
        currency: {id: 'rub', name: 'руб.'},
        application_submit_date_time_menu: null,
        application_submit_date_time: null,
        application_submit_date: null,
        application_submit_time: '00:00:00',
        application_opening_menu: null,
        application_opening_date_time: null,
        application_opening_date: null,
        application_opening_time: '00:00:00',
        application_date_time_menu: null,
        application_date_time: null,
        application_date: null,
        application_time: '00:00:00',
        application_date_time_summing_up_menu: null,
        application_date_time_summing_up: null,
        application_date_summing_up: null,
        application_time_summing_up: '00:00:00',
        application_terms_of_contract_menu: null,
        application_terms_of_contract: null,
        application_delivery_time_menu: null,
        application_delivery_time: null,
        addition_information: null,
        contact_full_name: this.$store.state.auth.user,
        contact_phone: '',
        contact_email: null,
        count_lots: {id: 0, name: '0'},
        analog_products: null,
        purchase_positional: null,
        publication_date_menu: null,
        publication_date: null,
        publication_date_old: null,
        blocking_period_days: null,
        securing_the_application: null,
        bank_guarantee: null,
        customer_id: null,
        ruble_price: null,
        positions: [
          {
            name: '1',
            code: null,
            is_product: null,
            category_okpd2: null,
            marksize_id: null,
            lot: null,
            quantity: null,
            pos_length_default: '1',
            measure: null,
            price_for_one: null,
            vat: null,
            total_price: null,
            loader: false,
            loaderName: false,
          },
        ],
        fields: [],
        file: [],
      },
      isNotFiles: false,
      scrollToErrorInstance: null,
      isCreatedProcedure: false,
      isLoading: true,
      searchOKPD2: '',
      searchOKPD2Counter: null,
      trueFalseSelect: [
        {id: 1, name: 'Да'},
        {id: 0, name: 'Нет'},
      ],
      counterToTenSelect: [
        {id: 0, name: '0'},
        {id: 1, name: '1'},
        {id: 2, name: '2'},
        {id: 3, name: '3'},
        {id: 4, name: '4'},
        {id: 5, name: '5'},
        {id: 6, name: '6'},
        {id: 7, name: '7'},
        {id: 8, name: '8'},
        {id: 9, name: '9'},
        {id: 10, name: '10'},
      ],
    }
  },
  computed: {
    procedureIdData() {
      let baseCount = 0
      const totalCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const biddingType = []
      const setMinDates = {}
      const setMinFiveDates = {}
      const setMinSevenDates = {}
      const setMin2WeeksDates = {}
      const lotsCounter = []
      const positionType = []
      let procedureType = ''
      if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_format.id === 'trading_223'
      ) {
        this.fieldsData.tenderTradingType.forEach((item) => {
          switch (item.id) {
            case 'contest':
              biddingType.push(item)
              break
            case 'request_prices':
              biddingType.push(item)
              break
            case 'request_offers':
              biddingType.push(item)
              break
            case 'auction':
              biddingType.push(item)
              break
            case 'purchase_from_supplier':
              biddingType.push(item)
              break
            default:
              break
          }
        })
      } else if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_format.id === 'commercial_trading'
      ) {
        this.fieldsData.tenderTradingType.forEach((item) => {
          switch (item.id) {
            case 'request_prices':
              biddingType.push(item)
              break
            case 'request_offers':
              biddingType.push(item)
              break
            default:
              break
          }
        })
      }
      if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_type &&
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'contest'
      ) {
        procedureType = 'Contest'
      } else if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_type &&
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'request_prices'
      ) {
        procedureType = 'Query'
      }else if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_type &&
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'request_offers'
      ) {
        procedureType = 'Offers'
      } else if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_type &&
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'auction'
      ) {
        procedureType = 'Auction'
      } else if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_type &&
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'supplier_purchase'
      ) {
        procedureType = 'Supplier'
      } else if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_type &&
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'purchase_from_supplier'
      ) {
        procedureType = 'FromSupplier'
      } else if (
          this.selectedData.tender_trading_format &&
          this.selectedData.tender_trading_type &&
          this.selectedData.tender_trading_format.id === 'commercial_trading' &&
          this.selectedData.tender_trading_type.id
      ) {
        procedureType = 'Commercial'
      }
      const productionStartDate = new Date(2020, 10, 15)
          .toISOString()
          .slice(0, 10)

      this.selectedData.positions.map((item, index) => {
        const productID = this.get(item.is_product, 'id')
        if (
            productID === 1 && item.code !== null && item.code.startsWith('27.32')
        ) {
          positionType[index] = {name: 'PositionLength'}
          item.vat = { id: 20, name: "20%" }
        } else if (
            productID === 1 &&
            item.code !== null && !item.code.startsWith('27.32')
        ) {
          positionType[index] = {name: 'PositionCount'}
        } else if (productID === 0) {
          positionType[index] = {name: 'PositionService'}
        }


        baseCount += item.total_price && parseFloat(item.total_price)
        let count = 0
        if (this.selectedData.count_lots) {
          for (let i = 1; i <= this.selectedData.count_lots.id; i++) {
            if (item.lot && item.lot.id === i) {
              totalCount[count] +=
                  item.total_price && parseFloat(item.total_price)
              totalCount[count] = totalCount[count].toFixed(2)
            }
            count++
          }
        }
      })
      baseCount = !isNaN(baseCount) ? baseCount.toFixed(2) : baseCount

      for (let i = 1; i < this.selectedData.count_lots.id + 1; i++) {
        lotsCounter.push({id: i, name: i})
      }

      const datesArray = [
        'publication_date',
        'application_submit_date_time',
        'application_opening_date_time',
        'application_date_time',
        'application_date_time_summing_up',
        'application_terms_of_contract',
      ]

      datesArray.map((item) => {
        if (this.selectedData[item]) {
          setMinDates[item] = moment(this.selectedData[item].end || this.selectedData[item])
              .add(1, 'day')
              .format('YYYY-MM-DD')
          setMin2WeeksDates[item] = moment(this.selectedData[item].end || this.selectedData[item])
              .add(16, 'days')
              .format('YYYY-MM-DD')
          setMinFiveDates[item] = moment(this.selectedData[item].end || this.selectedData[item])
              .add(6, 'days')
              .format('YYYY-MM-DD')
          setMinSevenDates[item] = moment(this.selectedData[item].end || this.selectedData[item])
              .add(8, 'days')
              .format('YYYY-MM-DD')
        }
      })

      return {
        totalCount,
        lotsCounter,
        baseCount,
        biddingType,
        positionType,
        procedureType,
        setMinDates,
        setMinFiveDates,
        setMinSevenDates,
        setMin2WeeksDates,
        productionStartDate,
      }
    },
  },
  created() {
    this.$emit('fullMode')
    this.getFieldsData()
  },
  mounted() {
    const fromState = this.$store.state.auth.user
    if (fromState) {
      this.fieldsData.companies = fromState.companies
      this.selectedData.contact_phone = fromState.phone
      this.selectedData.contact_email = fromState.email
      if(this.fieldsData.companies.length === 1) {
        this.selectedData.companyName = this.fieldsData.companies[0]
      }
    }
  },
  methods: {
    countTotalPrice() {
      this.selectedData.positions.map((item, index) => {
        if (
            this.procedureIdData.positionType[index] &&
            this.procedureIdData.positionType[index].name === 'PositionService'
        ) {
          item.quantity = 1
        }
        const getSum = item.quantity * item.price_for_one
        item.total_price = !isNaN(getSum) ? getSum.toFixed(2) : '0.00'
      })
    },
    scrollToError() {
      const slide = document.querySelector('.error')
      console.log(slide)
      if(slide) {
        const top = window.scrollY + slide.getBoundingClientRect().y
        window.scrollTo({
          top: top - 60,
          behavior: "smooth"
        });
      }
    },
    parseOKPD2(arr) {
      return arr.map((item) => {
        return {
          code: item.code,
          id: item.id,
          name: `${item.code} ${item.name}`,
        }
      })
    },
    getFieldsData() {
      this.fetchSettingsProcedures()
          .then((response) => {
            this.fieldsData.validationLength = response.data.data
            this.isLoading = false
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('tender_trading_format')
          .then((response) => {
            this.fieldsData.tenderTradingFormat = response.data.data
            this.isLoading = false
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('tender_trading_type')
          .then((response) => {
            this.fieldsData.tenderTradingType = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchUsersFromCompany(this.$store.state.auth.user.id)
          .then((response) => {
            this.fieldsData.contacts_list = response.data.data
            this.selectedData.contact_full_name = response.data.data[0]
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('securing_application')
          .then((response) => {
            this.fieldsData.securingTheApplication = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresOKPD2('okpd')
          .then((response) => {
            this.fieldsData.OKPD2 = this.parseOKPD2(response.data.data.items)
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('calc_amount_of_collateral')
          .then((response) => {
            this.fieldsData.amountOfCollateral = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('blocking_period')
          .then((response) => {
            this.fieldsData.blockingPeriodDays = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
    },
    clearTenderTradingType() {
      this.selectedData.tender_trading_type = null
    },
    createNewPositionFieldset() {
      const newPosition = {
        name: '1',
        is_product: null,
        code: null,
        category_okpd2: null,
        lot: null,
        quantity: null,
        pos_length_default: '1',
        measure: null,
        marksize_id: null,
        price_for_one: null,
        vat: null,
        total_price: null,
        loader: false,
        loaderName: false,
      }
      if (
          this.selectedData.positions.length <
          this.fieldsData.validationLength.products_max
      ) {
        this.selectedData.positions.push(newPosition)
      }
    },
    createNewFieldset() {
      const newField = {
        type: null,
        name: null,
        value: null,
        isSave: false,
        description: null,
      }
      if (
          this.selectedData.fields.length <
          this.fieldsData.validationLength.lots_number_max
      ) {
        this.selectedData.fields.push(newField)
      }
    },
    removeField(id) {
      this.selectedData.fields.splice(id, 1)
    },
    removePosition(id) {
      this.selectedData.positions.splice(id, 1)
    },
    saveField(id) {
      this.selectedData.fields[id].isSave = true
    },
    filesValidate() {
      if (!this.selectedData.file) {
        this.isNotFiles = true
        return false
      }
      return true
    },
    validation(toPublish) {
      this.filesValidate()
      this.$refs.form.validate().then((res) => {
        if (res && this.filesValidate()) {
          this.sendNewProcedureData(toPublish)
        } else {
          clearInterval(this.scrollToErrorInstance)
          this.scrollToErrorInstance = setTimeout(() => {
            this.scrollToError()
          }, 500)
        }
      })
    },
    setFiles(files) {
      this.selectedData.file = files
      this.isNotFiles = !this.filesValidate()
    },
    sendNewProcedureData(toPublish) {
      const formData = {
        // user: this.$store.state.auth.user.id,
        // user_id: this.$store.state.auth.user.id,
        tender_trading_format: this.selectedData.tender_trading_format.id,
        tender_trading_type: this.selectedData.tender_trading_type.id,
        analog_products: this.selectedData.analog_products.id,
        alternative_applications: this.selectedData.alternative_applications.id,
        tender_tolerance: this.selectedData.tender_tolerance,
        addition_information: this.selectedData.addition_information,
        contact_id: this.selectedData.contact_full_name.id,
        inn: this.selectedData.companyName.id,
        publication_date: this.selectedData.publication_date + ' 00:00:00',
        purchase_currency: this.selectedData.currency.id,
        publication_allowed: Number(toPublish),
        documents: this.selectedData.file,
        purchase_subject: {
          description: this.selectedData.item_description,
          lots_number: this.selectedData.count_lots.id,
          positional_purchase: this.selectedData.purchase_positional,
          products_analogues: this.selectedData.analog_products.id,
          start_price: this.procedureIdData.baseCount,
          products: [],
          lot_amounts: [],
        },
        payment_and_delivery: {
          prepayment: this.selectedData.application_prepayment,
          payment_info: this.selectedData.application_payment_info,
          possible_letter_of_credit: this.selectedData.application_letter_of_credit,
          delivery_terms: this.selectedData.application_delivery_conditions,
          delivery_address: this.selectedData.applications_delivery_address.id,
        },
        additional_fields: [],
      }
      if (
          this.procedureIdData.procedureType !== 'Query' &&
          this.procedureIdData.procedureType !== 'Commercial'
      ) {
        formData.tender_available = this.selectedData.tender_available.id
      }
      if (
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Commercial' ||
          this.procedureIdData.procedureType === 'Contest'
      ) {
        formData.prices_are_confidential = this.selectedData.confidential_price
      }
      if (
          this.procedureIdData.procedureType === 'Contest' ||
          this.procedureIdData.procedureType === 'FromSupplier'
      ) {
        formData.tender_framework_contract = this.selectedData.tender_framework_contract
      }
      if (
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Commercial'
      ) {
        formData.many_stages_of_procurement = this.selectedData.stages_of_the_procurement_procedure
        formData.rebidding = this.selectedData.overbidding_is_possible
      }
      if (
          this.procedureIdData.procedureType === 'Auction' ||
          this.procedureIdData.procedureType === 'Supplier'
      ) {
        formData.hide_participants_names = this.selectedData.hide_member_names
      }
      if (this.procedureIdData.procedureType === 'Auction') {
        formData.purchase_term = {
          procedure_date_from: this.selectedData.application_terms_of_contract + ' 00:00:00',
          procedure_date_to: this.selectedData.application_delivery_time + ' 00:00:00',
          consideration_of_bids: this.selectedData.consideration_of_auction_bids,
          comment: this.selectedData.application_comment,
        }
        formData.guarantee = {
          ...formData.guarantee,
          application_ensuring: this.selectedData.securing_the_application.id
        }
      }
      if (
          this.procedureIdData.procedureType === 'Contest' ||
          this.procedureIdData.procedureType === 'Supplier'
      ) {
        formData.purchase_term = {
          ...formData.purchase_term,
          contract_conclusion_from: this.selectedData.application_terms_of_contract.start + ' 00:00:00',
          contract_conclusion_to: this.selectedData.application_terms_of_contract.end + ' 00:00:00',
          delivery_from: this.selectedData.application_delivery_time.start + ' 00:00:00',
          delivery_to: this.selectedData.application_delivery_time.end + ' 00:00:00',
        };
      }
      if (
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Offers' ||
          this.procedureIdData.procedureType === 'Commercial'
      ) {
        formData.purchase_term = {
          ...formData.purchase_term,
          opening_from: this.selectedData.application_delivery_time.start + ' 00:00:00',
          opening_to: this.selectedData.application_delivery_time.end + ' 00:00:00',
          application_end_date: this.selectedData.application_terms_of_contract + ' 00:00:00',
        };
      }
      if (this.selectedData.positions.length) {
        this.selectedData.positions.map((item, index) => {
          formData.purchase_subject.products.push(item)
          formData.purchase_subject.products.forEach(item => {
            item.vat = item.vat.id;
            item.measure = item.measure.id;
            item.lot = item.lot && item.lot.id;
            item.name = item.name.id;
            item.is_product = item.is_product.id;
            item.category_okpd2 = item.category_okpd2.code;
          })
          if (item.total_price !== 0) {
            formData.purchase_subject.lot_amounts[index] = item.total_price
          }
        })
      }
      if (
          this.procedureIdData.procedureType === 'Supplier' ||
          this.procedureIdData.procedureType === 'Contest'
      ) {
        formData.summarizing = {
          competition_commission: this.selectedData.commission,
          documentation_receipt_date: this.selectedData.application_opening_date_time,
          documentation_receipt_place: this.selectedData.place_of_receipt.id,
          application_consideration_date: this.selectedData.application_date_time,
          application_consideration_form: this.selectedData.reviewForm.id,
          summing_up_date: this.selectedData.application_date_time_summing_up,
          summing_up_place: this.selectedData.place_of_consideration_total.id,
        }
        if (this.selectedData.reviewForm.id === 'analog') {
          formData.summarizing = {
            ...formData.summarizing,
            application_consideration_place: this.selectedData.place_of_consideration.id,
          }
        }
      }
      if (this.selectedData.application_security_of_the_contract) {
        formData.guarantee = {
          ...formData.guarantee,
          contract_collateral: {
            calc_amount: this.selectedData.security.calculate_the_amount_of_collateral.id,
            blocking_period: this.selectedData.security.blocking_period_days.id,
          }
        }
        if (this.selectedData.security.calculate_the_amount_of_collateral.id === 'percent') {
          formData.guarantee.contract_collateral = {
            ...formData.guarantee.contract_collateral,
            amount: this.selectedData.security.collateral_amount_percents,
            percent_of_init_price: this.selectedData.security.percentage_of_the_starting_price,
          }
        }
        if (this.selectedData.security.calculate_the_amount_of_collateral.id === 'money') {
          formData.guarantee.contract_collateral = {
            ...formData.guarantee.contract_collateral,
            amount: this.selectedData.security.collateral_amount,
          }
        }
      }
      if (this.selectedData.application_security_required) {
        formData.guarantee = {
          ...formData.guarantee,
          application_collateral: {
            calc_amount: this.selectedData.security.calculate_the_amount_of_collateral.id,
            blocking_period: this.selectedData.security.blocking_period_days.id,
          }
        }
        if (this.selectedData.security.calculate_the_amount_of_collateral.id === 'percent') {
          formData.guarantee.application_collateral = {
            ...formData.guarantee.application_collateral,
            amount: this.selectedData.security.collateral_amount_percents,
            percent_of_init_price: this.selectedData.security.percentage_of_the_starting_price,
          }
        }
        if (this.selectedData.security.calculate_the_amount_of_collateral.id === 'money') {
          formData.guarantee.application_collateral = {
            ...formData.guarantee.application_collateral,
            amount: this.selectedData.security.collateral_amount,
          }
        }
      }
      if(this.selectedData.invitedCompanies.length) {
        formData.participate_invitation = {
          ...formData.participate_invitation,
          companies: this.selectedData.invitedCompanies
        }
      }
      if(this.selectedData.invitedEmails.length) {
        formData.participate_invitation = {
          ...formData.participate_invitation,
          emails: this.selectedData.invitedEmails
        }
      }
      if (this.selectedData.fields.length) {
        this.selectedData.fields.map((item) => {
          if (item.isSave) {
            formData.additional_fields.push(item)

            formData.additional_fields.forEach(item => {
              item.type = item.type.id;
            })
          }
        })
      }
      console.log(formData)

      const formDataObj = this.objectToFormData(formData)
      window.openLoader()
      this.sendProcedure(formDataObj)
          .then(() => {
            if (toPublish) {
              window.notificationSuccess('Создана новая процедура')
            } else {
              window.notificationSuccess('Новая процедура добавлена в черновик')
            }
            this.$router.replace('/procedures')
            window.closeLoader()
          })
          .catch((response) => {
            console.log(response.message)
            switch (response.message) {
              case 'Validation error':
                window.notificationError(
                    'Вы пытаетесь загрузить файлы неверного формата. Разрешенные форматы pdf, jpeg.',
                )
                break
              default:
                window.notificationError(
                    'Ошибка сервера. Попробуйте повторить позднее.',
                )
            }
            window.closeLoader()
          })
    },
  },
}
</script>

