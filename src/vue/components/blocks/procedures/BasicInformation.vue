<template>
  <div class="procedure-new">
    <h3 class="procedure__main-title">Основная информация</h3>
    <div class="row">
      <div class="col col-lg-4 col-md-6 col-xs-12">
        <text-input
            v-model="selectedData.companyName"
            label="Компания"
            :disabled="isCreatedProcedure"
        ></text-input>
      </div>
    </div>
    <div class="row">
      <div class="col col-lg-4 col-md-6 col-xs-12">
        <select-input
            :close="true"
            v-model="selectedData.tender_trading_format"
            label="Формат торгов"
            :options="fieldsData.tenderTradingFormat"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
    </div>
<!--    <v-row class="procedure__main-selects mt-5 mb-10">-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <v-select-->
<!--          v-model="selectedData.tender_trading_format"-->
<!--          class="mb-5"-->
<!--          label="Формат торгов"-->
<!--          :items="fieldsData.tenderTradingFormat"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          required-->
<!--          @change="clearTenderTradingType"-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col v-if="selectedData.tender_trading_format" cols="12" sm="6" md="4">-->
<!--        <v-select-->
<!--          v-model="selectedData.tender_trading_type"-->
<!--          class="mb-5"-->
<!--          label="Тип торговой процедуры"-->
<!--          :items="procedureIdData.biddingType"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          selectedData.tender_trading_type &&-->
<!--          procedureIdData.procedureType !== 'Query' &&-->
<!--          procedureIdData.procedureType !== 'Commercial'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.tender_available"-->
<!--          class="mb-5"-->
<!--          label="Доступность"-->
<!--          :items="-->
<!--            procedureIdData.procedureType === 'FromSupplier'-->
<!--              ? fieldsData.tenderAvailablePur-->
<!--              : procedureIdData.procedureType === 'Auction'-->
<!--              ? fieldsData.tenderAvailableAuc-->
<!--              : fieldsData.tenderAvailable-->
<!--          "-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Query' ||-->
<!--          procedureIdData.procedureType === 'Commercial'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.stages_of_the_procurement_procedure"-->
<!--          label="Этапы процедуры закупки"-->
<!--          :items="fieldsData.stagesProcedure"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Query' ||-->
<!--          procedureIdData.procedureType === 'Commercial' ||-->
<!--          procedureIdData.procedureType === 'Contest'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.alternative_applications"-->
<!--          class="my-4"-->
<!--          label="Альтернативные заявки"-->
<!--          :items="fieldsData.alternativeApplications"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Query' ||-->
<!--          procedureIdData.procedureType === 'Commercial'-->
<!--        "-->
<!--        cols="4"-->
<!--      >-->
<!--        <v-checkbox-->
<!--          v-model="selectedData.overbidding_is_possible"-->
<!--          label="Возможна переторжка"-->
<!--          :true-value="1"-->
<!--          :false-value="0"-->
<!--          hide-details-->
<!--          class="my-4"-->
<!--        ></v-checkbox>-->
<!--      </v-col>-->
<!--      <v-col v-if="selectedData.tender_trading_type" cols="12" sm="6" md="4">-->
<!--        <app-date-input-->
<!--          label="Дата публикации"-->
<!--          set-ref="publication_date_menu"-->
<!--          :model-menu="selectedData.publication_date_menu"-->
<!--          :model-value="selectedData.publication_date"-->
<!--          :text-validation="textValidation"-->
<!--          :min-date-validation="minDateValidation"-->
<!--          @ref-changed="selectedData.publication_date = $event"-->
<!--        ></app-date-input>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="procedureIdData.procedureType === 'FromSupplier'"-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.alternative_applications"-->
<!--          class="my-4"-->
<!--          label="Альтернативные заявки"-->
<!--          :items="fieldsData.alternativeApplications"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Contest' ||-->
<!--          procedureIdData.procedureType === 'FromSupplier'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-checkbox-->
<!--          v-model="selectedData.tender_framework_contract"-->
<!--          label="Конкурс на заключение рамочного договора"-->
<!--          :true-value="1"-->
<!--          :false-value="0"-->
<!--          hide-details-->
<!--          class="my-4"-->
<!--        ></v-checkbox>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="procedureIdData.procedureType === 'Contest'"-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.tender_tolerance"-->
<!--          class="my-4"-->
<!--          label="Допускается ли толеранс"-->
<!--          :items="trueFalseSelect"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Query' ||-->
<!--          procedureIdData.procedureType === 'Commercial' ||-->
<!--          procedureIdData.procedureType === 'FromSupplier' ||-->
<!--          procedureIdData.procedureType === 'Contest'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.currency"-->
<!--          class="my-4"-->
<!--          label="Валюта закупки"-->
<!--          :items="fieldsData.purchase_currency"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="procedureIdData.procedureType !== 'Commercial'"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Query' ||-->
<!--          procedureIdData.procedureType === 'Commercial' ||-->
<!--          procedureIdData.procedureType === 'FromSupplier' ||-->
<!--          procedureIdData.procedureType === 'Contest'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-checkbox-->
<!--          v-model="selectedData.confidential_price"-->
<!--          label="Цены конфиденциальны"-->
<!--          :true-value="1"-->
<!--          :false-value="0"-->
<!--          hide-details-->
<!--          class="my-4"-->
<!--        ></v-checkbox>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Auction' ||-->
<!--          procedureIdData.procedureType === 'Supplier'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.alternative_applications"-->
<!--          class="my-4"-->
<!--          label="Альтернативные заявки"-->
<!--          :items="fieldsData.alternativeApplications"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Auction' ||-->
<!--          procedureIdData.procedureType === 'Supplier'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-checkbox-->
<!--          v-model="selectedData.hide_member_names"-->
<!--          label="Скрыть названия участников"-->
<!--          :true-value="1"-->
<!--          :false-value="0"-->
<!--          hide-details-->
<!--          class="my-4"-->
<!--        ></v-checkbox>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          procedureIdData.procedureType === 'Auction' ||-->
<!--          procedureIdData.procedureType === 'Supplier'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-checkbox-->
<!--          v-model="selectedData.connect_an_autobot_for_trading"-->
<!--          label="Подключить автобота для торгов"-->
<!--          hide-details-->
<!--          :true-value="1"-->
<!--          :false-value="0"-->
<!--          class="my-4"-->
<!--        ></v-checkbox>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="-->
<!--          selectedData.tender_trading_type &&-->
<!--          procedureIdData.procedureType !== 'Contest'-->
<!--        "-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-select-->
<!--          v-model="selectedData.tender_tolerance"-->
<!--          class="my-4"-->
<!--          label="Допускается ли толеранс"-->
<!--          :items="trueFalseSelect"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          :disabled="isCreatedProcedure"-->
<!--          :rules="[selectsValidation]"-->
<!--          required-->
<!--        >-->
<!--        </v-select>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </div>
</template>

<script>
  import moment from 'moment'
  import TextInput from '../../forms/Input.vue'
  import SelectInput from '../../forms/Select.vue'
  // import dateInput from '~/components/procedures/inputs/dateInput'

  export default {
    name: 'BasicInformation',
    components: {
      TextInput,
      SelectInput,
      // appDateInput: dateInput,
    },
    props: {
      selectedData: {
        default: null,
        type: Object,
      },
      fieldsData: {
        default: null,
        type: Object,
      },
      procedureIdData: {
        default: null,
        type: Object,
      },
      trueFalseSelect: {
        default: null,
        type: Array,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
      selectsValidation: {
        default: () => {},
        type: Function,
      },
      textValidation: {
        default: () => {},
        type: Function,
      },
      clearTenderTradingType: {
        default: () => {},
        type: Function,
      },
      minDateValidation: {
        default: () => {},
        type: Function,
      },
      numValidation: {
        default: null,
        type: Array,
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
