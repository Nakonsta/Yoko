<template>
  <div>
    <ValidationObserver ref="form" tag="div" mode="eager">
      <form class="procedure__main" @submit.prevent="(evt) => evt.preventDefault()" slot-scope="{ valid }">
        <div class="procedure-new container-item">
          <router-link class="link link-icon" to="/personal/procedures/">
            <svg class="sprite-return"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#return"></use></svg>
            <b>Вернуться в список процедур</b>
          </router-link>
          <accreditations-title v-if="!isPreview" :title="title" />
          <accreditations-title v-if="isPreview" title="Предпросмотр" />
        </div>
        <div v-if="!isPreview" class="flexBlock">
          <app-basic-information
            :selected-data="selectedData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :true-false-select="trueFalseSelect"
            :is-created-procedure="isCreatedProcedure"
            :get-eis="getEisInfo"
            :clear-tender-trading-type="clearTenderTradingType"
          ></app-basic-information>
          <app-purchase-subject
              :selected-data="selectedData"
              :mark-import="markImport"
              :fields-data="fieldsData"
              :procedure-id-data="procedureIdData"
              :is-created-procedure="isCreatedProcedure"
              :counter-to-ten-select="counterToTenSelect"
              :remove-position="removePosition"
              :count-total-price="countTotalPrice"
              :create-new-position-fieldset="createNewPositionFieldset"
              :change-lots-count="changeLotsCount"
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
              :is-created-procedure="isCreatedProcedure"
          ></app-terms-of-purchase>
          <app-security-and-guarantees
              :selected-data="selectedData"
              :fields-data="fieldsData"
              :procedure-id-data="procedureIdData"
              :is-created-procedure="isCreatedProcedure"
              :remove-block="removeBlock"
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
              :procedure-id-data="procedureIdData"
              :is-created-procedure="isCreatedProcedure"
              :remove-block="removeBlock"
          ></app-payment-and-delivery>
          <app-additional-information
              :selected-data="selectedData"
              :is-created-procedure="isCreatedProcedure"
              :fields-data="fieldsData"
              :procedure-id-data="procedureIdData"
              :remove-block="removeBlock"
          ></app-additional-information>
          <app-documentation
              :selected-data="selectedData"
              :is-not-files="isNotFiles"
              :is-created-procedure="isCreatedProcedure"
              :fields-data="fieldsData"
              :set-files="setFiles"
              :procedure-id-data="procedureIdData"
              :remove-block="removeBlock"
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
        </div>
        <app-preview
            v-if="isPreview"
            :data="selectedData"
            :calculated-data="procedureIdData"
            :fields-data="fieldsData"
            :procedure-id-data="procedureIdData"
            :validation="validation"
            :publish="publish"
            :uncheck-preview="uncheckPreview"
        ></app-preview>
      </form>
    </ValidationObserver>
    <div id="send-procedure" class="popup popup--alt">
      <div class="popup__body">
        <div class="popup__content">
          <a href="javascript:{}" class="popup__close" @click="closeModal('#send-procedure')"><svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg></a>
          <div class="popup__title">Процедура направлена на согласование оператором</div>
          <div class="popup__content-container">
            <router-link to="/personal/procedures" class="btn">Перейти к процедуре</router-link>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade-loader">
      <local-preloader v-if="isLoading"/>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/helpers/api'
import parsers from '@/helpers/parsers'
import functions from '@/helpers/functions'
import formatDate from '@/helpers/formatDate'
import localPreloader from '@/components/preloader'
import BasicInformation from '@/components/admin/procedures/BasicInformation'
import PurchaseSubject from '@/components/admin/procedures/PurchaseSubject'
import Consideration from '@/components/admin/procedures/Consideration'
import TermsOfPurchase from '@/components/admin/procedures/TermsOfPurchase'
import SecurityAndGuarantees from '@/components/admin/procedures/SecurityAndGuarantees'
import PaymentAndDelivery from '@/components/admin/procedures/PaymentAndDelivery'
import AdditionalInformation from '@/components/admin/procedures/AdditionalInformation'
import Documentation from '@/components/admin/procedures/Documentation'
import ContactInformation from '@/components/admin/procedures/ContactInformation'
import InvitationToParticipate from '@/components/admin/procedures/InvitationToParticipate'
import AdditionalFields from '@/components/admin/procedures/AdditionalFields'
import AccreditationsTitle from '@/components/admin/accreditations/AccreditationsTitle'
import Preview from '@/components/admin/procedures/Preview'

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
    AccreditationsTitle: AccreditationsTitle,
    appPreview: Preview,
  },
  mixins: [api, functions, parsers, formatDate],
  data() {
    return {
      markImport: null,
      fieldsData: {
        hideBlock: {
          payment_info: false,
          documentation: false,
          additional_info: false,
          application_security: false,
        },
        markSize: [],
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
        tenderAvailableContest: [
          {id: 1, name: 'Открытый конкурс'},
          {id: 0, name: 'Закрытый конкурс'},
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
        baseCount: 0,
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
        application_submit_date_time_begin: null,
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
        positions: [],
        fields: [],
        file: [],
      },
      isNotFiles: false,
      isPreview: false,
      scrollToErrorInstance: null,
      isCreatedProcedure: false,
      isLoading: true,
      title: 'Создать процедуру',
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
      const update = ''
      const totalCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const biddingType = []
      const setMinDates = {}
      const setSameDates = {}
      const setMinFiveDates = {}
      const setMinSevenDates = {}
      const setMin2WeeksDates = {}
      const lotsCounter = []
      const positionType = []
      let procedureType = ''
      let tenderArray = this.fieldsData.tenderAvailable
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
        tenderArray = this.fieldsData.tenderAvailableContest
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
        tenderArray = this.fieldsData.tenderAvailableAuc
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
        tenderArray = this.fieldsData.tenderAvailablePur
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

      // console.log(this.selectedData.positions)
      this.selectedData.positions.map((item, index) => {
        const productID = this.get(item.type, 'id')
        if (
            productID === 1 && item.code && item.code !== null && item.code.startsWith('27.32')
        ) {
          positionType[index] = {name: 'PositionLength'}
          item.vats = { id: 20, name: "20%" }
        } else if (
            productID === 1 &&
            item.code && item.code !== null && !item.code.startsWith('27.32')
        ) {
          positionType[index] = {name: 'PositionCount'}
        } else if (productID === 0) {
          positionType[index] = {name: 'PositionService'}
        }

        baseCount += item.total_price && parseFloat(item.total_price)
        let count = 0
        if (this.selectedData.count_lots) {
          for (let i = 1; i <= this.selectedData.count_lots.id; i++) {
            if (item.addLot && item.addLot.id === i) {
              totalCount[count] += item.total_price && parseFloat(item.total_price)
              totalCount[count] = Number(totalCount[count]).toFixed(2)
              // totalCount[count] = totalCount[count] && parseFloat(totalCount[count]).toFixed(2)
            }
            count++
          }
        }
      })
      baseCount = !isNaN(baseCount) ? baseCount.toFixed(2) : baseCount

      if (this.selectedData.count_lots) {
        for (let i = 1; i < this.selectedData.count_lots.id + 1; i++) {
          lotsCounter.push({id: i, name: i})
        }
      }

      const datesArray = [
        'publication_date',
        'application_submit_date_time',
        'application_opening_date_time',
        'application_date_time',
        'application_end_date',
        'application_date_time_summing_up',
        'application_terms_of_contract',
      ]

      datesArray.map((item) => {
        if (this.selectedData[item]) {
          const days15 = this.addWeekdays(this.selectedData[item].end || this.selectedData[item], 15)
          const days7 = this.addWeekdays(this.selectedData[item].end || this.selectedData[item], 7)
          const days5 = this.addWeekdays(this.selectedData[item].end || this.selectedData[item], 5)
          const days1 = this.addWeekdays(this.selectedData[item].end || this.selectedData[item], 1)
          setSameDates[item] = moment(this.selectedData[item].end || this.selectedData[item]).format('YYYY-MM-DD')
          setMinDates[item] = days1.format('YYYY-MM-DD')
          setMin2WeeksDates[item] = days15.format('YYYY-MM-DD')
          setMinFiveDates[item] = days5.format('YYYY-MM-DD')
          setMinSevenDates[item] = days7.format('YYYY-MM-DD')
        }
      })

      if(this.selectedData.publication_date || procedureType) {
        const days15 = this.addWeekdays(this.selectedData.publication_date, 15)
        const days7 = this.addWeekdays(this.selectedData.publication_date, 7)
        const days5 = this.addWeekdays(this.selectedData.publication_date, 5)
        switch (procedureType) {
          case "Auction":
            this.selectedData.application_delivery_time = days15._d
            break;
          case "FromSupplier":
          case "Contest":
            this.selectedData.application_submit_date_time = days15._d
            break;
          case "Query":
            this.selectedData.application_end_date = days5._d
            break;
          case "Offers":
            this.selectedData.application_end_date = days7._d
            break;
          default:
            this.selectedData.application_submit_date_time = days15._d
        }
      }

      return {
        update,
        totalCount,
        lotsCounter,
        tenderArray,
        baseCount,
        biddingType,
        positionType,
        procedureType,
        setMinDates,
        setSameDates,
        setMinFiveDates,
        setMinSevenDates,
        setMin2WeeksDates,
        productionStartDate,
      }
    },
  },
  watch: {
    markImport: function (file) {
      this.importFile(file);
    },
  },
  created() {
    this.$emit('fullMode')
    this.getFieldsData()
    const id = this.$route.params.id
    if(id !== 'new') {
      this.getProcedureItemMainData(id)
      this.title = id && `Редактировать процедуру №${id}`
    } else {
      this.selectedData.positions = [
        {
          names: '',
          code: null,
          type: null,
          category_okpd: null,
          measures: null,
          marksize_id: null,
          addLot: null,
          quantity: null,
          price_for_one: null,
          vats: null,
          total_price: null,
          loader: false,
          loaderName: false,
        },
      ]
    }
  },
  mounted() {
    const fromState = this.$store.state.auth.user
    if (fromState) {
      this.fieldsData.companies = this.$store.getters.companyBuyer
      if(this.fieldsData.companies.length === 1) {
        this.selectedData.companyName = this.fieldsData.companies[0]
      }
    }
  },
  methods: {
    getEisInfo() {
      window.openLoader()
      this.fetchEISProcedure(this.selectedData.tender_eis_id)
        .then(({data}) => {
          const result = data.data;
          this.selectedData.tender_trading_format = { "id": "trading_223", "name": "Торги по 223-ФЗ" }
          let setTradingType;
          switch (result.placingWay) {
            case 'Запрос предложений в электронной форме, участниками которого могут являться только субъекты малого и среднего предпринимательства':
              setTradingType = {id: "request_offers", name: "Запрос предложений"}
              break;
            case 'Электронный аукцион':
            case 'Аукцион в электронной форме, участниками которого могут являться только субъекты малого и среднего предпринимательства':
            case 'Открытый аукцион':
              setTradingType = {id: "auction", name: "Аукцион"}
              break;
            case 'Закупка у единственного поставщика (подрядчика, исполнителя)':
              setTradingType = {id: "purchase_from_supplier", name: "Закупка у единственного поставщика"}
              break;
            case 'Конкурс в электронной форме, участниками которого могут являться только субъекты малого и среднего предпринимательства':
            case 'Открытый конкурс':
              setTradingType = {id: "contest", name: "Конкурс"}
              break;
            default:
              setTradingType = {id: "request_prices", name: "Запрос цен"}
          }
          this.selectedData.tender_trading_type = setTradingType
          this.selectedData.item_description = result.purchaseObjectInfo
          // TODO: даты спарсить позже
          // this.selectedData.publication_date = moment(result.docPublishDate, 'DD.MM.YYYY')._d
          // this.selectedData.application_submit_date_time = moment(result.submissionCloseDateTime, 'DD.MM.YYYY')._d
          // this.selectedData.application_date_time_summing_up = moment(result.summingupTime, 'DD.MM.YYYY')._d
          // this.selectedData.application_date_time = moment(result.examinationDateTime, 'DD.MM.YYYY')._d
          // this.selectedData.application_delivery_time = moment(result.envelopeOpeningTime, 'DD.MM.YYYY')._d

          const positions = this.get(result, 'lots.lot.customers.customer.purchaseObjects.purchaseObject')
          const lotNumber = this.get(result, 'lots.lot.lotNumber')
          const lots = this.counterToTenSelect.find(x => x.id === parseInt(lotNumber));
          this.selectedData.count_lots = lots;
          for (let i = 1; i < this.selectedData.count_lots.id + 1; i++) {
            this.procedureIdData.lotsCounter.push({id: i, name: i})
          }
          const lot = this.procedureIdData.lotsCounter.find(x => x.id === parseInt(lotNumber))
          this.selectedData.positions = []
          if(positions.OKPD2) {
            this.searchProceduresOKPD2(positions.OKPD2)
              .then((response) => {
                const result = response.data.data;
                this.fieldsData.OKPD2 = this.parseOKPD2(result)
                const category_okpd = this.fieldsData.OKPD2.find(x => x.code === positions.OKPD2)
                this.selectedData.positions.push({
                  names: null,
                  code: this.get(category_okpd, 'code'),
                  type: {id: 1, name: 'Товар'},
                  category_okpd: category_okpd,
                  measures: null,
                  marksize_id: null,
                  addLot: lot,
                  quantity: positions.quantity || 0,
                  price_for_one: 0,
                  vats: null,
                  total_price: 0,
                  loader: false,
                  loaderName: false,
                })
                window.closeLoader();
              })
              .catch(() => {
                window.closeLoader();
              })
          } else {
            this.selectedData.positions.push({
              names: null,
              code: null,
              type: {id: 1, name: 'Товар'},
              category_okpd: null,
              measures: null,
              marksize_id: null,
              addLot: lot,
              quantity: positions.quantity || 0,
              price_for_one: 0,
              vats: null,
              total_price: 0,
              loader: false,
              loaderName: false,
            })
            window.closeLoader();
          }
        })
        .catch(() => {
          window.closeLoader()
        })
    },
    closeModal(popupId) {
      closePopupById(popupId);
    },
    removeBlock(key) {
      this.fieldsData.hideBlock[key] = !this.fieldsData.hideBlock[key]
    },
    changeLotsCount(event) {
      if(event.id === 0) {
        this.selectedData.positions.map((item) => {
          item.addLot = null
        })
      }
    },
    uncheckPreview() {
      this.isPreview = false
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    getProcedureItemMainData(id) {
      this.fetchTenderItem(id)
        .then(({data}) => {
          const positions = data.data.purchase_subject.products
          positions.map((item, index) => {
            if(item) {
              this.searchProceduresOKPD2(item.category_okpd2)
                .then((response) => {
                  this.fieldsData.OKPD2 = this.parseOKPD2(response.data.data)
                  if(item.name) {
                    this.fetchCatalogMarksize(item.name, response.data.data[index].id)
                      .then((res) => {
                        this.fieldsData.markSize[index] = this.parseMarkSize(res.data.data)
                        this.parseData(data.data)
                        this.isLoading = false
                        if(data.data.status === 'planned') {
                          this.isCreatedProcedure = true
                          this.title = `Смотреть процедуру №${this.selectedData.id}`
                        }
                      })
                      .catch(() => {
                        this.isLoading = false
                      })
                  } else {
                    this.parseData(data.data)
                    this.isLoading = false
                  }
                })
                .catch(() => {
                  this.isLoading = false
                })
            } else {
              this.parseData(data.data)
              this.isLoading = false
            }
          })
        })
        .catch((e) => {
          console.log(e)
          this.isLoading = false
        })
    },
    parseData(data) {
      const count_lots = this.counterToTenSelect.find(x => x.id === data.purchase_subject.lots_number)
      const tender_trading_format =
          this.fieldsData.tenderTradingFormat.find(x => x.id === data.tender_trading_format)
      const alternative_applications =
          this.fieldsData.alternativeApplications.find(x => x.id === this.parseBoolToNumber(data.alternative_applications))
      const analog_products =
          this.fieldsData.goodsAnalogs.find(x => x.id === this.parseBoolToNumber(data.purchase_subject.products_analogues))
      const tender_available =
          this.fieldsData.tenderAvailable.find(x => x.id === this.parseBoolToNumber(data.tender_available))
      const stages_of_the_procurement_procedure =
          this.fieldsData.stagesProcedure.find(x => x.id === this.parseBoolToNumber(data.many_stages_of_procurement))
      const tender_trading_type = this.fieldsData.tenderTradingType.find(x => x.id === data.tender_trading_type)
      const currency = this.fieldsData.purchase_currency.find(x => x.id === data.purchase_currency)
      const calculate_the_amount_of_collateral =
          data.guarantee && this.fieldsData.amountOfCollateral.find(x => x.id === data.guarantee.contract_collateral.calc_amount)
      const blocking_period_days =
          data.guarantee && this.fieldsData.blockingPeriodDays.find(x => x.id === parseInt(data.guarantee.contract_collateral.blocking_period))
      const calculate_the_amount_of_collateralA =
          data.guarantee && this.fieldsData.amountOfCollateral.find(x => x.id === data.guarantee.application_collateral.calc_amount)
      const blocking_period_daysA =
          data.guarantee && this.fieldsData.blockingPeriodDays.find(x => x.id === parseInt(data.guarantee.application_collateral.blocking_period))
      this.selectedData = {
        ...this.selectedData,
        currency,
        count_lots,
        analog_products,
        tender_trading_format,
        tender_trading_type,
        alternative_applications,
        stages_of_the_procurement_procedure,
        tender_available,
        id: data.id,
        securing_the_application: this.get(data, 'guarantee.application_ensuring'),
        item_description: this.get(data, 'purchase_subject.description'),
        addition_information: data.addition_information,
        purchase_positional: this.parseBoolToNumber(this.get(data, 'purchase_subject.positional_purchase')),
        publication_date: data.publication_date,
        tender_tolerance: this.parseBoolToNumber(data.tender_tolerance),
        hide_member_names: this.parseBoolToNumber(data.hide_participants_names),
        application_end_date: this.get(data, 'purchase_term.application_end_date'),
        file: data.documents || [],
        application_prepayment: this.parseBoolToNumber(this.get(data, 'payment_and_delivery.prepayment')),
        application_payment_info: this.get(data, 'payment_and_delivery.payment_info'),
        application_letter_of_credit: this.parseBoolToNumber(this.get(data, 'payment_and_delivery.possible_letter_of_credit')),
        application_delivery_conditions: this.get(data, 'payment_and_delivery.delivery_terms'),
        applications_delivery_address: {
          id: this.get(data, 'payment_and_delivery.delivery_address'),
          name: this.get(data, 'payment_and_delivery.delivery_address'),
        },
        confidential_price: this.parseBoolToNumber(data.prices_are_confidential),
        tender_framework_contract: this.parseBoolToNumber(data.tender_framework_contract),
        overbidding_is_possible: this.parseBoolToNumber(data.rebidding),
        application_terms_of_contract: this.get(data, 'purchase_term.procedure_date_from'),
        application_delivery_time: this.get(data, 'purchase_term.procedure_date_to'),
        consideration_of_auction_bids: this.parseBoolToNumber(this.get(data, 'purchase_term.consideration_of_bids')),
        comment: this.get(data, 'purchase_term.comment'),
        application_submit_date_time: this.get(data, 'purchase_term.application_end_date'),
        application_security_of_the_contract: this.parseBoolToNumber(!!this.get(data, 'guarantee.contract_collateral.amount')),
        application_security_required: this.parseBoolToNumber(!!this.get(data, 'guarantee.application_collateral.amount')),
        security: {
          blocking_period_days,
          calculate_the_amount_of_collateral,
          collateral_amount: this.get(data, 'guarantee.contract_collateral.amount'),
          collateral_amount_percents: this.get(data, 'guarantee.contract_collateral.amount'),
          percentage_of_the_starting_price: this.get(data, 'guarantee.contract_collateral.percent_of_init_price'),
        },
        request: {
          blocking_period_days: blocking_period_daysA,
          calculate_the_amount_of_collateral: calculate_the_amount_of_collateralA,
          collateral_amount: this.get(data, 'guarantee.application_collateral.amount'),
          collateral_amount_percents: this.get(data, 'guarantee.application_collateral.amount'),
          percentage_of_the_starting_price: this.get(data, 'guarantee.application_collateral.percent_of_init_price'),
        },
      }

      this.selectedData.positions = []
      if (data.purchase_subject.products.length) {
        data.purchase_subject.products.map((item, index) => {
          const vat = this.fieldsData.positionVAT.find(x => x.id === Number(item.vat))
          const name = this.fieldsData.markSize[index].find(x => x.name === item.name)
          const is_product = this.fieldsData.positionType.find(x => x.id === this.parseBoolToNumber(item.is_product))
          const category_okpd = this.fieldsData.OKPD2.find(x => x.code === item.category_okpd2)
          const lot = this.procedureIdData.lotsCounter.find(x => x.id === item.lot)
          const measure = category_okpd.code.startsWith('27.32')
              ? this.fieldsData.positionLongUnits.find(x => x.id === item.measure)
              : this.fieldsData.positionUnits.find(x => x.id === item.measure)
          this.selectedData.positions.push({
            id: item.id,
            names: name,
            code: category_okpd.code,
            type: is_product,
            category_okpd: category_okpd,
            measures: measure,
            marksize_id: name.id,
            addLot: lot,
            quantity: item.quantity,
            price_for_one: item.price_for_one,
            vats: vat,
            total_price: data.purchase_subject.lot_amounts[index],
            loader: false,
            loaderName: false,
          })
        })
      }

      if (data.additional_fields.length) {
        const tempPosition = JSON.parse(JSON.stringify(data.additional_fields));
        tempPosition.map((item) => {
          const type = this.fieldsData.fieldType.find(x => x.id === item.type)
          this.selectedData.fields.push(item)
          this.selectedData.fields.forEach(item => {
            item.types = type;
            item.isSave = true;
          })
        })
      }

      if (data.participate_invitation) {
        this.selectedData = {
          ...this.selectedData,
          invitedCompanies: this.get(data, 'participate_invitation.companies'),
          invitedEmails: this.get(data, 'participate_invitation.emails'),
        }
      }

      const reviewForm = this.fieldsData.reviewForm.find(
          x => x.id === this.get(data, 'summarizings.application_consideration_form'),
      )

      if (data.summarizings) {
        this.selectedData = {
          ...this.selectedData,
          reviewForm,
          commission: this.get(data, 'summarizings.competition_commission'),
          application_submit_date_time_begin: this.get(data, 'summarizings.application_start_date'),
          application_opening_date_time: this.get(data, 'summarizings.documentation_receipt_date'),
          place_of_receipt: {
            id: this.get(data, 'summarizings.documentation_receipt_place'),
            name: this.get(data, 'summarizings.documentation_receipt_place'),
          },
          application_date_time: this.get(data, 'summarizings.application_consideration_date'),
          application_date_time_summing_up: this.get(data, 'summarizings.summing_up_date'),
          place_of_consideration_total: {
            id: this.get(data, 'summarizings.summing_up_place'),
            name: this.get(data, 'summarizings.summing_up_place'),
          },
          place_of_consideration: {
            id: this.get(data, 'summarizings.application_consideration_place'),
            name: this.get(data, 'summarizings.application_consideration_place'),
          },
        }
      }

      if (this.get(data, 'purchase_term.opening_from')) {
        this.selectedData = {
          ...this.selectedData,
          application_delivery_time: {
            start: this.get(data, 'purchase_term.opening_from'),
            end: this.get(data, 'purchase_term.opening_to'),
          }
        }
      }
      if (this.get(data, 'purchase_term.contract_conclusion_from')) {
        this.selectedData = {
          ...this.selectedData,
          application_terms_of_contract: {
            start: this.get(data, 'purchase_term.contract_conclusion_from'),
            end: this.get(data, 'purchase_term.contract_conclusion_to'),
          },
          application_delivery_time: {
            start: this.get(data, 'purchase_term.delivery_from'),
            end: this.get(data, 'purchase_term.delivery_to'),
          }
        }
      }
    },
    countTotalPrice(index) {
      if (
          this.procedureIdData.positionType[index] &&
          this.procedureIdData.positionType[index].name === 'PositionService'
      ) {
        this.selectedData.positions[index].quantity = 1
      }
      const getSum = this.selectedData.positions[index].quantity * this.selectedData.positions[index].price_for_one
      this.selectedData.positions[index].total_price = !isNaN(getSum) ? getSum.toFixed(2) : '0.00'
    },
    scrollToError() {
      const slide = document.querySelector('.error')
      if(slide) {
        const top = window.scrollY + slide.getBoundingClientRect().y
        window.scrollTo({
          top: top - 60,
          behavior: "smooth"
        });
      }
    },
    getFieldsData() {
      const id = this.$route.params.id
      this.fetchSettingsProcedures()
          .then((response) => {
            this.fieldsData.validationLength = response.data.data
            if(id === 'new') {
              this.isLoading = false
            }
          })
          .catch((e) => {
            console.log(e)
            if(id === 'new') {
              this.isLoading = false
            }
          })
      this.getDate()
          .then((response) => {
            console.log(response)
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedures', 'tender_trading_format')
          .then((response) => {
            this.fieldsData.tenderTradingFormat = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedures', 'tender_trading_type')
          .then((response) => {
            this.fieldsData.tenderTradingType = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedures', 'currency')
          .then((response) => {
            this.fieldsData.purchase_currency = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedure_summarizings', 'consideration_form')
          .then((response) => {
            this.fieldsData.reviewForm = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedure_summarizings', 'default_consideration_place')
          .then((response) => {
            this.fieldsData.selectedData = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('purchase_subject_products', 'measures')
          .then((response) => {
            this.fieldsData.positionLongUnits = response.data.data.splice(0, 2)
            this.fieldsData.positionUnits = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('purchase_subject_products', 'vat')
          .then((response) => {
            this.fieldsData.positionVAT = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      // this.fetchProceduresPropertyList('purchase_subject_products', 'main_okpd2')
      //     .then((response) => {
      //       // this.fieldsData.reviewForm = response.data.data
      //     })
      //     .catch((e) => {
      //       console.log(e)
      //     })
      this.fetchCompaniesByInn(this.$store.state.auth.user.companies[0].inn)
          .then((response) => {
            const result = response.data.data
            this.fieldsData.contacts_list = result
            if(result.length === 1) {
              this.selectedData.contact_full_name = result[0]
              this.selectedData.contact_phone = result[0].phone
              this.selectedData.contact_email = result[0].email
            }
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
      this.fetchProceduresPropertyList('procedure_guarantees', 'calc_amount')
          .then((response) => {
            this.fieldsData.amountOfCollateral = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedure_guarantees', 'blocking_period')
          .then((response) => {
            this.fieldsData.blockingPeriodDays = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedure_guarantees', 'application_ensuring')
          .then((response) => {
            this.fieldsData.securingTheApplication = response.data.data
          })
          .catch((e) => {
            console.log(e)
          })
      this.fetchProceduresPropertyList('procedure_additional_fields', 'type')
          .then((response) => {
            this.fieldsData.fieldType = response.data.data
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
        names: '',
        type: null,
        code: null,
        category_okpd: null,
        addLot: null,
        quantity: null,
        measures: null,
        marksize_id: null,
        price_for_one: null,
        vats: null,
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
        types: null,
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
      if (
          this.procedureIdData.procedureType === 'Commercial'
            ? !this.fieldsData.hideBlock.documentation
            : Array.isArray(this.selectedData.file)
              ? !this.selectedData.file.length
              : !this.selectedData.file
      ) {
        this.isNotFiles = true
        return false
      }
      return true
    },
    publish(toPublish) {
      if(toPublish) {
        this.sendNewProcedureData(true)
      } else {
        // TODO: апи для отправки на модерацию
        this.sendNewProcedureData(true)
      }
    },
    validation(toPublish) {
      this.filesValidate()
      if(toPublish) {
        this.$refs.form.validate().then((res) => {
          if (res && this.filesValidate()) {
            this.isPreview = true
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          } else {
            clearInterval(this.scrollToErrorInstance)
            this.scrollToErrorInstance = setTimeout(() => {
              this.scrollToError()
            }, 500)
          }
        })
      } else {
        this.sendNewProcedureData(toPublish)
      }
    },
    setFiles(files) {
      this.selectedData.file = files
      this.isNotFiles = !this.filesValidate()
    },
    sendNewProcedureData(toPublish) {
      const formData = {
        status: toPublish ? 'planned': 'draft',
        tender_trading_format: this.get(this.selectedData, 'tender_trading_format.id'),
        tender_trading_type: this.get(this.selectedData, 'tender_trading_type.id'),
        analog_products: this.get(this.selectedData, 'analog_products.id'),
        alternative_applications: this.get(this.selectedData, 'alternative_applications.id'),
        tender_tolerance: this.selectedData.tender_tolerance,
        addition_information: this.selectedData.addition_information,
        contact_id: this.get(this.selectedData, 'contact_full_name.id'),
        inn: this.get(this.selectedData, 'companyName.inn'),
        publication_date: this.parseDate(this.selectedData.publication_date),
        purchase_currency: this.get(this.selectedData, 'currency.id'),
        publication_allowed: Number(toPublish),
        documents: [],
        old_documents: [],
        purchase_subject: {
          description: this.selectedData.item_description,
          lots_number: this.get(this.selectedData, 'count_lots.id'),
          positional_purchase: this.selectedData.purchase_positional,
          products_analogues: this.get(this.selectedData, 'analog_products.id'),
          start_price: this.procedureIdData.baseCount,
          products: [],
          lot_amounts: [],
        },
        purchase_term: {
          application_end_date: this.parseDate(this.selectedData.application_end_date),
        },
        payment_and_delivery: {
          prepayment: this.selectedData.application_prepayment,
          payment_info: this.selectedData.application_payment_info,
          possible_letter_of_credit: this.selectedData.application_letter_of_credit,
          delivery_terms: this.selectedData.application_delivery_conditions,
          delivery_address: this.get(this.selectedData, 'applications_delivery_address.id'),
        },
        additional_fields: [],
      }

      if (this.selectedData.file && this.selectedData.file[0] && this.selectedData.file[0].size) {
        formData.documents = this.selectedData.file
      }
      if (this.selectedData.file && this.selectedData.file.length) {
        this.selectedData.file.map((item) => {
          formData.old_documents.push(item.id)
        })
      }
      if (
          this.procedureIdData.procedureType !== 'Query' &&
          this.procedureIdData.procedureType !== 'Commercial'
      ) {
        formData.tender_available = this.get(this.selectedData, 'tender_available.id')
      }
      if (
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Offers' ||
          this.procedureIdData.procedureType === 'Commercial' ||
          this.procedureIdData.procedureType === 'FromSupplier' ||
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
          this.procedureIdData.procedureType === 'Offers' ||
          this.procedureIdData.procedureType === 'Commercial'
      ) {
        formData.many_stages_of_procurement = this.get(this.selectedData, 'stages_of_the_procurement_procedure.id')
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
          application_end_date: this.parseDate(this.selectedData.application_end_date),
          procedure_date_from: this.parseDate(this.selectedData.application_end_date),
          procedure_date_to: this.parseDate(this.selectedData.application_delivery_time),
          consideration_of_bids: this.selectedData.consideration_of_auction_bids,
          comment: this.selectedData.application_comment,
        }
        formData.guarantee = {
          ...formData.guarantee,
          application_ensuring: this.selectedData.securing_the_application
        }
      }
      if (
          this.procedureIdData.procedureType === 'FromSupplier' ||
          this.procedureIdData.procedureType === 'Contest' ||
          this.procedureIdData.procedureType === 'Supplier'
      ) {
        formData.purchase_term = {
          ...formData.purchase_term,
          application_end_date: this.parseDate(this.selectedData.application_submit_date_time),
          contract_conclusion_from: this.parseDate(this.get(this.selectedData, 'application_terms_of_contract.start')),
          contract_conclusion_to: this.parseDate(this.get(this.selectedData, 'application_terms_of_contract.end')),
          delivery_from: this.parseDate(this.get(this.selectedData, 'application_delivery_time.start')),
          delivery_to: this.parseDate(this.get(this.selectedData, 'application_delivery_time.end')),
        };
      }
      if (
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Offers' ||
          this.procedureIdData.procedureType === 'Commercial'
      ) {
        formData.purchase_term = {
          ...formData.purchase_term,
          opening_from: this.parseDate(this.get(this.selectedData, 'application_delivery_time.start')),
          opening_to: this.parseDate(this.get(this.selectedData, 'application_delivery_time.end')),
        };
      }
      if (this.selectedData.positions[0].type && this.selectedData.positions.length) {
        const tempPosition = JSON.parse(JSON.stringify(this.selectedData.positions));
        tempPosition.map((item, index) => {
          formData.purchase_subject.products.push(item)
          formData.purchase_subject.products.forEach(item => {
            item.vat = item.vats && item.vats.id;
            item.measure = item.measures && item.measures.id;
            item.lot = item.addLot && item.addLot.id;
            item.name = item.names && item.names.name;
            item.is_product = item.type && item.type.id;
            item.category_okpd2 = item.category_okpd && item.category_okpd.code;
          })
          if (item.total_price !== 0) {
            formData.purchase_subject.lot_amounts[index] = item.total_price
          }
        })
      }
      if (
          this.procedureIdData.procedureType === 'FromSupplier' ||
          this.procedureIdData.procedureType === 'Supplier' ||
          this.procedureIdData.procedureType === 'Contest'
      ) {
        formData.summarizing = {
          competition_commission: this.selectedData.commission,
          application_start_date: this.parseDate(this.selectedData.application_submit_date_time_begin),
          documentation_receipt_date: this.parseDate(this.selectedData.application_opening_date_time),
          documentation_receipt_place: this.get(this.selectedData, 'place_of_receipt.id'),
          application_consideration_date: this.parseDate(this.selectedData.application_date_time),
          application_consideration_form: this.get(this.selectedData, 'reviewForm.id'),
          summing_up_date: this.parseDate(this.selectedData.application_date_time_summing_up),
          summing_up_place: this.get(this.selectedData, 'place_of_consideration_total.id'),
        }
        if (this.selectedData.reviewForm && this.selectedData.reviewForm.id === 'analog') {
          formData.summarizing = {
            ...formData.summarizing,
            application_consideration_place: this.get(this.selectedData, 'place_of_consideration.id'),
          }
        }
      }
      if (this.selectedData.application_security_of_the_contract) {
        formData.guarantee = {
          ...formData.guarantee,
          contract_collateral: {
            calc_amount: this.get(this.selectedData.security, 'calculate_the_amount_of_collateral.id'),
            blocking_period: this.get(this.selectedData.security, 'blocking_period_days.id'),
          }
        }
        if (this.selectedData.security.calculate_the_amount_of_collateral.id === 'percent') {
          formData.guarantee.contract_collateral = {
            ...formData.guarantee.contract_collateral,
            amount: this.selectedData.security.collateral_amount_percents,
            percent_of_init_price: this.selectedData.security.percentage_of_the_starting_price,
          }
        }
        if (this.selectedData.security.calculate_the_amount_of_collateral.id === 'monetary_expression') {
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
            calc_amount: this.get(this.selectedData.request, 'calculate_the_amount_of_collateral.id'),
            blocking_period: this.get(this.selectedData.request, 'blocking_period_days.id'),
          }
        }
        if (this.selectedData.request.calculate_the_amount_of_collateral.id === 'percent') {
          formData.guarantee.application_collateral = {
            ...formData.guarantee.application_collateral,
            amount: this.selectedData.request.collateral_amount_percents,
            percent_of_init_price: this.selectedData.request.percentage_of_the_starting_price,
          }
        }
        if (this.selectedData.request.calculate_the_amount_of_collateral.id === 'monetary_expression') {
          formData.guarantee.application_collateral = {
            ...formData.guarantee.application_collateral,
            amount: this.selectedData.request.collateral_amount,
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
        const tempFields = JSON.parse(JSON.stringify(this.selectedData.fields));
        tempFields.map((item) => {
          if (item.isSave) {
            formData.additional_fields.push(item)

            formData.additional_fields.forEach(item => {
              item.type = item.types.id;
            })
          }
        })
      }

      if (this.fieldsData.hideBlock.payment_info) {
        formData.payment_and_delivery = {}
      }
      if (this.fieldsData.hideBlock.documentation) {
        formData.file = {}
      }
      if (this.fieldsData.hideBlock.additional_info) {
        formData.addition_information = ''
      }
      if (this.fieldsData.hideBlock.application_security) {
        formData.guarantee = {}
      }

      const formDataObj = this.objectToFormData(formData)
      window.openLoader()
      this.sendProcedure(formDataObj, this.selectedData.id)
          .then(() => {
            if (toPublish) {
              openPopupById('#send-procedure');
            } else {
              window.notificationSuccess('Новая процедура добавлена в черновик')
            }
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

<style scoped lang="scss">
.flexBlock {
  display: flex;
  flex-direction: column;
  .hideIt {
    order: 10;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      background: rgba(white, 0.5);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
    }
  }
}
.procedure-new {
  margin-bottom: 20px;
}
.link-icon {
  svg {
    width: 4px;
    height: 8px;
    margin-right: 12px;
  }
}
</style>
