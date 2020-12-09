<template>
  <div v-if="selectedData.tender_trading_type">
    <v-row>
      <v-col>
        <div class="procedure__main-title text-h5">Сроки закупки</div>
      </v-col>
    </v-row>
    <v-row class="procedure__main-selects mt-5 mb-10">
      <v-col
        v-if="
          procedureIdData.procedureType === 'Query' ||
          procedureIdData.procedureType === 'Commercial' ||
          procedureIdData.procedureType === 'Auction'
        "
        cols="12"
        sm="6"
        md="4"
      >
        <app-date-input
          :label="
            procedureIdData.procedureType === 'Query' ||
            procedureIdData.procedureType === 'Commercial'
              ? 'Дата окончания подачи заявок'
              : 'Дата начала процедуры'
          "
          set-ref="application_terms_of_contract_menu"
          :model-menu="selectedData.application_terms_of_contract_menu"
          :model-value="selectedData.application_terms_of_contract"
          :text-validation="textValidation"
          :min-date-validation="minDateValidationNew"
          :set-min="procedureIdData.setMinDates.publication_date"
          @ref-changed="selectedData.application_terms_of_contract = $event"
        ></app-date-input>
      </v-col>
      <v-col
        v-if="
          procedureIdData.procedureType === 'Contest' ||
          procedureIdData.procedureType === 'Supplier'
        "
        cols="12"
        sm="6"
        md="4"
      >
        <app-date-input
          :range="true"
          label="Сроки заключения договора"
          set-ref="application_terms_of_contract_menu"
          :model-menu="selectedData.application_terms_of_contract_menu"
          :model-value="selectedData.application_terms_of_contract"
          :text-validation="textValidation"
          :range-validation="rangeValidation"
          :min-date-validation="minDateValidation"
          :set-min="
            procedureIdData.setMinDates.application_date_time_summing_up
          "
          @ref-changed="selectedData.application_terms_of_contract = $event"
        ></app-date-input>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <app-date-input
          :range="
            procedureIdData.procedureType === 'Contest' ||
            procedureIdData.procedureType === 'Query' ||
            procedureIdData.procedureType === 'Suppliers'
              ? true
              : false
          "
          :label="
            procedureIdData.procedureType === 'Contest' ||
            procedureIdData.procedureType === 'Suppliers'
              ? 'Сроки поставки товара'
              : procedureIdData.procedureType === 'Auction'
              ? 'Дата окончания процедуры'
              : 'Дата вскрытия заявок'
          "
          set-ref="application_delivery_time_menu"
          :model-menu="selectedData.application_delivery_time_menu"
          :model-value="selectedData.application_delivery_time"
          :text-validation="textValidation"
          :range-validation="rangeValidation"
          :min-date-validation="minDateValidation"
          :set-min="procedureIdData.setMinDates.application_terms_of_contract"
          @ref-changed="selectedData.application_delivery_time = $event"
        ></app-date-input>
      </v-col>
      <v-col
        v-if="procedureIdData.procedureType === 'Auction'"
        cols="12"
        sm="6"
        md="4"
      >
        <v-checkbox
          v-model="selectedData.consideration_of_auction_bids"
          label="Рассмотрение аукционных заявок до начала процедуры"
          :true-value="1"
          :false-value="0"
          hide-details
          class="my-4"
        ></v-checkbox>
      </v-col>
      <v-col
        v-if="procedureIdData.procedureType === 'Auction'"
        cols="12"
        sm="6"
        md="4"
      >
        <v-text-field
          v-model="selectedData.application_comment"
          class="my-4"
          label="Комментарий"
          placeholder="Введите комментарий"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import moment from 'moment'
  import dateInput from '~/components/procedures/inputs/dateInput'

  export default {
    name: 'TermsOfPurchase',
    components: {
      appDateInput: dateInput,
    },
    props: {
      selectedData: {
        default: null,
        type: Object,
      },
      procedureIdData: {
        default: null,
        type: Object,
      },
      minDateValidation: {
        default: () => {},
        type: Function,
      },
      minDateValidationNew: {
        default: () => {},
        type: Function,
      },
      textValidation: {
        default: () => {},
        type: Function,
      },
      rangeValidation: {
        default: () => {},
        type: Function,
      },
    },
    methods: {
      isAfterToday(val) {
        return moment(val).isSameOrAfter(new Date(), 'day')
      },
    },
  }
</script>

<style scoped></style>
