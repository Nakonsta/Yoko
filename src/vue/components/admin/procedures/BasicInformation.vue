<template>
  <div class="container-item">
    <h3 class="procedure__main-title">Основная информация</h3>
    <div class="row">
      <div class="col col-lg-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            v-model="selectedData.companyName"
            label="Компания"
            :options="fieldsData.companies"
            :disabled="isCreatedProcedure || fieldsData.companies.length === 1"
        ></select-input>
      </div>
    </div>
    <div class="row">
      <div class="col col-lg-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            :rules="{ required: true, selectsValidation: true }"
            v-model="selectedData.tender_trading_format"
            label="Формат торгов"
            :options="fieldsData.tenderTradingFormat"
            :disabled="isCreatedProcedure"
            :select="clearTenderTradingType"
        ></select-input>
      </div>
      <div class="col col-lg-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            :rules="{ required: true, selectsValidation: true }"
            v-model="selectedData.tender_trading_type"
            label="Тип торговой процедуры"
            :options="procedureIdData.biddingType"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div v-if="
          !selectedData.tender_trading_type
        "
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <div class="field-group">
          <text-input
              v-model="selectedData.tender_eis_id"
              label="Выгрузить из ЕИС"
              placeholder="Выберите номер"
              :disabled="isCreatedProcedure"
              :rules="{ required: true, numeric: true }"
          ></text-input>
          <button
              class="btn"
              :disabled="!selectedData.tender_eis_id"
              @click="getEis"
          >
            Выгрузить
          </button>
        </div>
      </div>
      <div
          v-if="
            selectedData.tender_trading_type &&
            selectedData.tender_trading_type.id &&
            procedureIdData.procedureType !== 'Query' &&
            procedureIdData.procedureType !== 'Offers' &&
            procedureIdData.procedureType !== 'Commercial'
          "
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            v-model="selectedData.tender_available"
            label="Доступность"
            :options="
              procedureIdData.procedureType === 'FromSupplier'
                ? fieldsData.tenderAvailablePur
                : procedureIdData.procedureType === 'Auction' || procedureIdData.procedureType === 'Contest'
                ? fieldsData.tenderAvailableAuc
                : fieldsData.tenderAvailable
            "
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            procedureIdData.procedureType === 'Query' ||
            procedureIdData.procedureType === 'Offers' ||
            procedureIdData.procedureType === 'Commercial'
          "
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            v-model="selectedData.stages_of_the_procurement_procedure"
            label="Этапы процедуры закупки"
            :options="fieldsData.stagesProcedure"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            procedureIdData.procedureType === 'Query' ||
            procedureIdData.procedureType === 'Offers' ||
            procedureIdData.procedureType === 'Commercial' ||
            procedureIdData.procedureType === 'Contest'
          "
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            v-model="selectedData.alternative_applications"
            label="Альтернативные заявки"
            :options="fieldsData.alternativeApplications"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            procedureIdData.procedureType === 'Query' ||
            procedureIdData.procedureType === 'Offers' ||
            procedureIdData.procedureType === 'Commercial'
          "
          class="col col-lg-4 col-sm-6 col-xs-12 field__container"
      >
        <checkbox-input
            class-name="mt3"
            name="overbidding_is_possible"
            content="Вы допускаете торги по конкурсу"
            :disabled="isCreatedProcedure"
            v-model="selectedData.overbidding_is_possible"
            :label="[{label: 'Возможна переторжка'}]"
        ></checkbox-input>
      </div>
      <div v-if="
          selectedData.tender_trading_type &&
          selectedData.tender_trading_type.id
        "
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <date-time
            v-model="selectedData.publication_date"
            label="Дата публикации"
            placeholder="Выберите дату"
            :disabled="isCreatedProcedure"
            :min-date="new Date(today)"
            :rules="{required: true, minMaxDateCheck: today}"
        ></date-time>
      </div>
      <div
          v-if="procedureIdData.procedureType === 'FromSupplier'"
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            v-model="selectedData.alternative_applications"
            label="Альтернативные заявки"
            :options="fieldsData.alternativeApplications"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            procedureIdData.procedureType === 'Contest' ||
            procedureIdData.procedureType === 'FromSupplier'
          "
          class="col col-lg-4 col-sm-6 col-xs-12 field__container"
      >
        <checkbox-input
            class-name="mt3"
            name="tender_framework_contract"
            :disabled="isCreatedProcedure"
            v-model="selectedData.tender_framework_contract"
            :label="[{label: 'Конкурс на заключение рамочного договора'}]"
        ></checkbox-input>
      </div>
      <div
          v-if="procedureIdData.procedureType === 'Contest'"
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <radio-input
            :rules="{required: true}"
            title="Допускается ли толеранс?"
            name="tender_tolerance"
            :disabled="isCreatedProcedure"
            v-model="selectedData.tender_tolerance"
            :label="[
              {name: 'Да', id: '1'},
              {name: 'Нет', id: '0'}
            ]"
        ></radio-input>
      </div>
      <div
          v-if="
              procedureIdData.procedureType === 'Query' ||
              procedureIdData.procedureType === 'Offers' ||
              procedureIdData.procedureType === 'Commercial' ||
              procedureIdData.procedureType === 'FromSupplier' ||
              procedureIdData.procedureType === 'Contest'
          "
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            v-model="selectedData.currency"
            label="Валюта закупки"
            :options="fieldsData.purchase_currency"
            :disabled="procedureIdData.procedureType !== 'Commercial' || isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            procedureIdData.procedureType === 'Query' ||
            procedureIdData.procedureType === 'Offers' ||
            procedureIdData.procedureType === 'Commercial' ||
            procedureIdData.procedureType === 'FromSupplier' ||
            procedureIdData.procedureType === 'Contest'
          "
          class="col col-lg-4 col-sm-6 col-xs-12 field__container"
      >
        <checkbox-input
            class-name="mt3"
            name="confidential_price"
            :disabled="isCreatedProcedure"
            v-model="selectedData.confidential_price"
            :label="[{label: 'Цены конфиденциальны'}]"
        ></checkbox-input>
      </div>
      <div
          v-if="
            procedureIdData.procedureType === 'Auction' ||
            procedureIdData.procedureType === 'Supplier'
          "
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            v-model="selectedData.alternative_applications"
            label="Альтернативные заявки"
            :options="fieldsData.alternativeApplications"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            procedureIdData.procedureType === 'Auction' ||
            procedureIdData.procedureType === 'Supplier'
          "
          class="col col-lg-4 col-sm-6 col-xs-12 field__container"
      >
        <checkbox-input
            class-name="mt3"
            name="hide_member_names"
            :disabled="isCreatedProcedure"
            v-model="selectedData.hide_member_names"
            :label="[{label: 'Скрыть названия участников'}]"
        ></checkbox-input>
      </div>
      <div
          v-if="
            selectedData.tender_trading_type &&
            selectedData.tender_trading_type.id &&
            procedureIdData.procedureType !== 'Contest'
          "
          class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <radio-input
            :rules="{required: true}"
            title="Допускается ли толеранс?"
            name="tender_tolerance"
            :disabled="isCreatedProcedure"
            v-model="selectedData.tender_tolerance"
            :label="[
              {name: 'Да', id: '1'},
              {name: 'Нет', id: '0'}
            ]"
        ></radio-input>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TextInput from '@/components/forms/Input.vue'
import SelectInput from '@/components/forms/Select.vue'
import CheckboxInput from '@/components/forms/Checkbox.vue'
import RadioInput from '@/components/forms/Radio.vue'
import DateTime from '@/components/forms/DateTime.vue'


export default {
  name: 'BasicInformation',
  components: {
    TextInput,
    DateTime,
    RadioInput,
    SelectInput,
    CheckboxInput,
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
    getEis: {
      default: () => {},
      type: Function,
    },
    clearTenderTradingType: {
      default: () => {},
      type: Function,
    },
  },
  data() {
    return {
      today: moment().format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped></style>
