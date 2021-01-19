<template>
  <div
      class="container-item"
      :class="{hideIt: procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.payment_info}"
      v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id"
  >
    <div
        class="function-btn"
        :class="{active: fieldsData.hideBlock.payment_info}"
        v-if="procedureIdData.procedureType === 'Commercial'"
        @click="removeBlock('payment_info')"
    >
      <tooltip content="Скрыть блок" icon="\./img/sprite.svg#cancel" />
    </div>
    <h3 class="procedure__main-title">Условия оплаты и поставки</h3>
    <div class="row">
      <div class="col col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <checkbox-input
            name="application_prepayment"
            :disabled="isCreatedProcedure"
            v-model="selectedData.application_prepayment"
            :label="[{label: 'Предоплата'}]"
        ></checkbox-input>
      </div>
      <div class="col col-xl-10 col-lg-9 col-md-8 col-sm-6 col-xs-12">
        <text-input
            validationName="информация об оплате"
            :disabled="isCreatedProcedure"
            :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.payment_info)}"
            v-model="selectedData.application_payment_info"
            placeholder="Введите информацию об оплате"
        ></text-input>
      </div>
      <div class="col col-xs-12">
        <checkbox-input
            name="application_letter_of_credit"
            :disabled="isCreatedProcedure"
            v-model="selectedData.application_letter_of_credit"
            :label="[{label: 'Возможен аккредитив'}]"
        ></checkbox-input>
      </div>
      <div class="col col-xs-12">
        <textarea-input
            :maxlength=1000
            v-model="selectedData.application_delivery_conditions"
            label="Условия поставки"
            :disabled="isCreatedProcedure"
            :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.payment_info), max: 1000}"
            placeholder="Введите  дополнительную информацио об исполнительном договоре"
        ></textarea-input>
      </div>
      <div class="col col-md-6 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Введите адрес"
            v-model="selectedData.applications_delivery_address"
            :options="suggestions"
            label="Место поставки"
            :searchable="true"
            :loading="loadingPlaceSearch"
            :search="searchPlace"
            :disabled="isCreatedProcedure"
            :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.payment_info)}"
            no-result="Адрес не найден"
        ></select-input>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/helpers/api'
  import Tooltip from "@/components/tooltip"
  import TextInput from '@/components/forms/Input'
  import SelectInput from '@/components/forms/Select'
  import CheckboxInput from '@/components/forms/Checkbox'
  import TextareaInput from "@/components/forms/Textarea"

  export default {
    name: 'PaymentAndDelivery',
    components: {
      Tooltip,
      TextareaInput,
      TextInput,
      SelectInput,
      CheckboxInput,
    },
    mixins: [api],
    props: {
      selectedData: {
        default: null,
        type: Object,
      },
      fieldsData: {
        default: null,
        type: Object,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
      procedureIdData: {
        default: null,
        type: Object,
      },
      removeBlock: {
        default: () => {},
        type: Function,
      },
    },
    data() {
      return {
        loadingPlaceSearch: false,
        suggestions: [],
      }
    },
    methods: {
      searchPlace(value) {
        this.getSearchPlace(value)
      },
      parseData(arr) {
        return arr.map((item) => {
          return {
            id: item.value,
            name: item.value,
          }
        })
      },
      getSearchPlace(string) {
        clearInterval(this.searchCounter)
        this.loadingPlaceSearch = true
        if (string && string.length > 3) {
          this.searchCounter = setTimeout(() => {
            this.fetchDaData(string)
              .then(({data}) => {
                this.suggestions = this.parseData(data.suggestions)
                this.loadingPlaceSearch = false
              })
              .catch((e) => {
                console.log(e)
                this.loadingPlaceSearch = false
              })
          }, 1000)
        } else {
          this.loadingPlaceSearch = false
        }
      },
    },
  }
</script>

<style scoped></style>
