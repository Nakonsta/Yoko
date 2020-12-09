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
        <button class="btn" @click="validation(true)">
          Опубликовать процедуру
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
// import { get } from 'lodash'
import moment from 'moment'
// import validation from '../../../plugins/mixins/validation'
// import notifications from '../../../plugins/mixins/notifications'
import api from '../../../../helpers/api'
import functions from '../../../../helpers/functions'
// import parsers from '../../../plugins/mixins/parsers'
// import localPreloader from '../../../components/preloader/local-preloader'
import BasicInformation from '../../../blocks/procedures/BasicInformation.vue'
import PurchaseSubject from '../../../blocks/procedures/PurchaseSubject.vue'
import Consideration from '../../../blocks/procedures/Consideration.vue'
// import TermsOfPurchase from '../../../components/procedures/blocks/TermsOfPurchase'
// import SecurityAndGuarantees from '../../../components/procedures/blocks/SecurityAndGuarantees'
// import PaymentAndDelivery from '../../../components/procedures/blocks/PaymentAndDelivery'
// import AdditionalInformation from '../../../components/procedures/blocks/AdditionalInformation'
// import Documentation from '../../../components/procedures/blocks/Documentation'
// import ContactInformation from '../../../components/procedures/blocks/ContactInformation'
// import AdditionalFields from '../../../components/procedures/blocks/AdditionalFields'
// import ControlElements from '../../../components/procedures/blocks/ControlElements'

export default {
  name: 'ProcedureId',
  components: {
    // localPreloader,
    appBasicInformation: BasicInformation,
    appPurchaseSubject: PurchaseSubject,
    appConsideration: Consideration,
    // appTermsOfPurchase: TermsOfPurchase,
    // appSecurityAndGuarantees: SecurityAndGuarantees,
    // appPaymentAndDelivery: PaymentAndDelivery,
    // appAdditionalInformation: AdditionalInformation,
    // appDocumentation: Documentation,
    // appContactInformation: ContactInformation,
    // appAdditionalFields: AdditionalFields,
    // appControlElements: ControlElements,
  },
  mixins: [api, functions],
  data() {
    return {
      fieldsData: {
        tenderTradingFormat: [],
        tenderTradingType: [],
        tenderAvailable: [
          { id: 1, name: 'Открытый' },
          { id: 0, name: 'Закрытый' },
        ],
        tenderAvailableAuc: [
          { id: 1, name: 'Открытый аукцион' },
          { id: 0, name: 'Закрытый аукцион' },
        ],
        tenderAvailablePur: [
          { id: 1, name: 'Открытая закупка' },
          { id: 0, name: 'Закрытая закупка' },
        ],
        stagesProcedure: [
          { id: 1, name: 'Одноэтапная процедура' },
          { id: 0, name: 'Многоэтапная процедура' },
        ],
        alternativeApplications: [
          { id: 1, name: 'Возможны альтернативные заявки' },
          { id: 0, name: 'Невозможны альтернативные заявки' },
        ],
        goodsAnalogs: [
          { id: 1, name: 'допускаются' },
          { id: 0, name: 'не допускаются' },
        ],
        positionType: [
          { id: 1, name: 'Товар' },
          // { id: 0, name: 'Услуга' },
        ],
        positionLongUnits: [
          { id: 'm', name: 'Метры' },
          { id: 'km', name: 'Километры' },
        ],
        positionUnits: [
          { id: 'item', name: 'Штуки' },
          { id: 'unit', name: 'Единицы' },
        ],
        positionVAT: [
          { id: 0, name: '0%' },
          { id: 10, name: '10%' },
          { id: 20, name: '20%' },
        ],
        OKPD: [
          { id: 'products', name: 'Кабельно-проводниковая продукция' },
          { id: 'none', name: 'Не кабельно-проводниковая продукция' },
        ],
        fieldType: [
          { id: 'text', name: 'Текст' },
          { id: 'number', name: 'Число' },
          { id: 'date', name: 'Дата' },
        ],
        reviewForm: [
          { id: 'electronic', name: 'электронная' },
          { id: 'analog', name: 'аналоговая' },
        ],
        purchase_currency: [
          { id: 'rub', name: 'руб.' },
          { id: 'usd', name: 'usd' },
          { id: 'eur', name: 'eur' },
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
      },
      selectedData: {
        reviewForm: null,
        companyName: null,
        absolutTrade: 'Абсолют трейд',
        tender_trading_format: {},
        tender_trading_type: {},
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
        tender_tolerance: null,
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
        application_security_of_the_contract: null,
        applications_delivery_address: null,
        application_payment_info: null,
        application_bank_guarantee: 0,
        application_documentation_section: 0,
        application_title_of_the_document: 0,
        place_of_receipt: null,
        place_of_consideration: null,
        place_of_consideration_total: null,
        currency: { id: 'rub', name: 'руб.' },
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
        contact_full_name: null,
        contact_phone: '',
        contact_email: null,
        count_lots: { id: 0, name: '0' },
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
        { id: 1, name: 'Да' },
        { id: 0, name: 'Нет' },
      ],
      counterToTenSelect: [
        { id: 0, name: '0' },
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' },
        { id: 9, name: '9' },
        { id: 10, name: '10' },
      ],
      numValidation: [
        (v) => /^\d+$/.test(v) || 'Вводите только цифровые значения',
      ],
    }
  },
  computed: {
    procedureIdData() {
      let baseCount = 0
      const totalCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const biddingType = []
      const setMinDates = {}
      const setMinWeekDates = {}
      const lotsCounter = []
      const positionType = []
      let procedureType = 'Contest'
      if (this.selectedData.tender_trading_format.id === 'trading_223') {
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
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'contest'
      ) {
        procedureType = 'Contest'
      } else if (
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          (this.selectedData.tender_trading_type.id === 'request_prices' ||
              this.selectedData.tender_trading_type.id === 'request_offers')
      ) {
        procedureType = 'Query'
      } else if (
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'auction'
      ) {
        procedureType = 'Auction'
      } else if (
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'supplier_purchase'
      ) {
        procedureType = 'Supplier'
      } else if (
          this.selectedData.tender_trading_format.id === 'trading_223' &&
          this.selectedData.tender_trading_type.id === 'purchase_from_supplier'
      ) {
        procedureType = 'FromSupplier'
      } else if (
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
          positionType[index] = { name: 'PositionLength' }
        } else if (
            productID === 1 &&
            item.code !== null && !item.code.startsWith('27.32')
        ) {
          positionType[index] = { name: 'PositionCount' }
        } else if (productID=== 0) {
          positionType[index] = { name: 'PositionService' }
        }


        baseCount += item.total_price && parseFloat(item.total_price)
        let count = 0
        for (let i = 1; i <= this.selectedData.count_lots.id; i++) {
          if (item.lot && item.lot.id === i) {
            totalCount[count] +=
                item.total_price && parseFloat(item.total_price)
            totalCount[count] = totalCount[count].toFixed(2)
          }
          count++
        }
      })
      baseCount = !isNaN(baseCount) ? baseCount.toFixed(2) : baseCount

      for (let i = 1; i < this.selectedData.count_lots.id + 1; i++) {
        lotsCounter.push({ id: i, name: i })
      }

      const datesArray = [
        'publication_date',
        'application_submit_date',
        'application_opening_date',
        'application_date',
        'application_date_time_summing_up',
        'application_terms_of_contract',
      ]

      datesArray.map((item) => {
        if (this.selectedData[item]) {
          if (Array.isArray(this.selectedData[item])) {
            setMinDates[item] = moment(this.selectedData[item][1])
                .add(1, 'day')
                .format('YYYY-MM-DD')
          } else {
            setMinDates[item] = moment(this.selectedData[item])
                .add(1, 'day')
                .format('YYYY-MM-DD')
            setMinWeekDates[item] = moment(this.selectedData[item])
                .add(8, 'days')
                .format('YYYY-MM-DD')
          }
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
        setMinWeekDates,
        productionStartDate,
      }
    },
  },
  created() {
    this.getFieldsData()
  },
  mounted() {
    const fromState = this.$store.state.auth.user
    if (fromState) {
      this.selectedData.contact_phone = fromState.phone
      this.selectedData.contact_email = fromState.email
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
    async scrollToError() {
      // Todo: заменить чем-то оболее умным этот скролл к ошибкам
      const slide = document.querySelector('.error--text')
          ? document.querySelector('.error--text')
          : document.querySelector('.form--error')
      const count = 100
      const top = window.scrollY + slide.getBoundingClientRect().y
      let startTop = window.scrollY
      const delta = (top - window.scrollY) / 100
      for (let i = 0; i < 100; i++) {
        await new Promise((resolve) => {
          window.setTimeout(function () {
            resolve()
          }, 1000 / count)
        })
        window.scrollTo(0, (startTop += delta) - 100)
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
      console.log(this.$store.state.auth.user.id)
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
      this.selectedData.tender_trading_type = {}
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
        value_date: null,
        isSave: false,
        description: null,
        field_content_menu: null,
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
    changeTypeOfValue(id) {
      this.selectedData.fields[id].value = null
    },
    removePosition(id) {
      this.selectedData.positions.splice(id, 1)
    },
    saveField(id, ref) {
      const fieldForValidation = [
        ref.type[id],
        ref.name[id],
        ref.description[id],
      ]
      const isValid = []
      if (this.selectedData.fields[id].type === 'date') {
        fieldForValidation.push(ref.value[id])
      } else if (this.selectedData.fields[id].type) {
        fieldForValidation.push(ref.value[id])
      }
      fieldForValidation.map((item) => {
        isValid.push(item.validate())
        if (!item.validate()) {
          item.focus()
          item.blur()
        }
      })
      if (isValid.every((x) => x)) this.selectedData.fields[id].isSave = true
    },
    filesValidate() {
      if (!this.selectedData.file.length) {
        this.isNotFiles = true
        return false
      }
      return true
    },
    validation(toPublish) {
      this.filesValidate()
      this.$refs.form.validate().then((res) => {
        if(res && this.filesValidate()) {
          this.sendNewProcedureData(toPublish)
        } else {
          // Todo: заменить чем-то оболее умным этот скролл к ошибкам
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
        // contact_id: this.storeUserId,
        // company_id: this.storeCompanies[0].id,
        tender_trading_format: this.selectedData.tender_trading_format,
        tender_trading_type: this.selectedData.tender_trading_type,
        publication_date: this.selectedData.publication_date + ' 00:00:00',
        purchase_currency: this.selectedData.currency,
        documents: this.selectedData.file,
        publication_allowed: Number(toPublish),
        products: [],
        additional_fields: [],
        lot_amounts: {},
        addition_information: this.selectedData.addition_information,
        tender_tolerance: this.selectedData.tender_tolerance,
        prepayment: this.selectedData.application_prepayment,
        payment_info: this.selectedData.application_payment_info,
        possible_letter_of_credit: this.selectedData
            .application_letter_of_credit,
        delivery_terms: this.selectedData.application_delivery_conditions,
        delivery_address: this.selectedData.applications_delivery_address,
        procurement_subject_description: this.selectedData.item_description,
        lots_number: this.selectedData.count_lots,
        positional_purchase: this.selectedData.purchase_positional,
        products_analogues: this.selectedData.analog_products,
        contract_security: this.selectedData
            .application_security_of_the_contract,
        application_security: this.selectedData.application_security_required,
        bank_guarantee: this.selectedData.application_bank_guarantee,
        alternative_applications: this.selectedData.alternative_applications,
        start_price: this.procedureIdData.baseCount,
      }
      if (this.selectedData.application_documentation_checked) {
        formData.application_documentation_section = this.selectedData.application_documentation_section
        formData.application_title_of_the_document = this.selectedData.application_title_of_the_document
      }
      if (this.selectedData.application_security_required) {
        formData.blocking_period = this.selectedData.blocking_period_days
        formData.calc_amount_of_collateral = this.selectedData.calculate_the_amount_of_collateral
        if (
            this.selectedData.calculate_the_amount_of_collateral === 'percent'
        ) {
          formData.amount_security = this.selectedData.collateral_amount_percents
          formData.percent_of_init_price = this.selectedData.percentage_of_the_starting_price
        }
        if (
            this.selectedData.calculate_the_amount_of_collateral === 'money'
        ) {
          formData.amount_security = this.selectedData.collateral_amount
        }
      }
      if (this.selectedData.positions.length) {
        this.selectedData.positions.map((item, index) => {
          formData.products.push(item)
          if (item.total_price !== 0) {
            formData.lot_amounts[index] = item.total_price
          }
        })
      }
      if (this.selectedData.fields.length) {
        this.selectedData.fields.map((item) => {
          if (item.isSave) {
            formData.additional_fields.push(item)
          }
        })
      }
      if (
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Commercial'
      ) {
        formData.application_finish_date =
            this.selectedData.application_terms_of_contract + ' 00:00:00'
        formData.application_opening = `${this.selectedData.application_delivery_time[0]} - ${this.selectedData.application_delivery_time[1]}`
        formData.many_stages_of_procurement = this.selectedData.stages_of_the_procurement_procedure
        formData.rebidding = this.selectedData.overbidding_is_possible
      }
      if (
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Commercial' ||
          this.procedureIdData.procedureType === 'Contest'
      ) {
        formData.prices_are_confidential = this.selectedData.confidential_price
      }
      if (
          this.procedureIdData.procedureType === 'Auction' ||
          this.procedureIdData.procedureType === 'Supplier'
      ) {
        formData.connect_autobot = this.selectedData.connect_an_autobot_for_trading
        formData.hide_participants_names = this.selectedData.hide_member_names
      }
      if (
          this.procedureIdData.procedureType === 'Supplier' ||
          this.procedureIdData.procedureType === 'Contest'
      ) {
        formData.terms_tender_from =
            this.selectedData.application_terms_of_contract[0] + ' 00:00:00'
        formData.terms_tender_to =
            this.selectedData.application_terms_of_contract[1] + ' 00:00:00'
        formData.terms_delivery_from =
            this.selectedData.application_delivery_time[0] + ' 00:00:00'
        formData.terms_delivery_to =
            this.selectedData.application_delivery_time[1] + ' 00:00:00'
        formData.application_finish_date = this.selectedData.application_submit_date_time
        formData.application_summing_up_date = this.selectedData.application_date_time_summing_up
        formData.competition_commission = this.selectedData.commission
        formData.documentation_receipt_place = this.selectedData.place_of_receipt
        formData.documentation_receipt_date = this.selectedData.application_opening_date_time
        formData.application_consideration_date = this.selectedData.application_date_time
        formData.application_consideration_form = this.selectedData.reviewForm
        formData.application_consideration_place = this.selectedData.place_of_consideration
        formData.application_summing_up_place = this.selectedData.place_of_consideration_total
      }
      if (
          this.procedureIdData.procedureType === 'Contest' ||
          this.procedureIdData.procedureType === 'FromSupplier'
      ) {
        formData.tender_framework_contract = this.selectedData.tender_framework_contract
      }
      if (
          this.procedureIdData.procedureType !== 'Query' &&
          this.procedureIdData.procedureType !== 'Commercial'
      ) {
        formData.tender_available = this.selectedData.tender_available
      }
      if (this.procedureIdData.procedureType === 'Auction') {
        formData.procedure_date_from = this.selectedData.application_terms_of_contract
        formData.procedure_date_to = this.selectedData.application_delivery_time
        formData.consideration_of_bids = this.selectedData.consideration_of_auction_bids
        formData.timing_comment = this.selectedData.application_comment
        formData.securing_application = this.selectedData.securing_the_application
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

<style></style>
