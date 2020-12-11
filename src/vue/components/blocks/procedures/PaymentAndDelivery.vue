<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Условия оплаты и поставки</h3>
    <div class="row">
      <div class="col col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <checkbox-input
            class-name="mt1"
            name="application_prepayment"
            v-model="selectedData.application_prepayment"
            :label="[{label: 'Предоплата'}]"
        ></checkbox-input>
      </div>
      <div class="col col-xl-10 col-lg-9 col-md-4 col-sm-6 col-xs-12">
        <text-input
            content="Вы допускаете торги по конкурсу"
            v-model="selectedData.application_payment_info"
            placeholder="Введите  информацию об оплате"
        ></text-input>
      </div>
      <div class="col col-xs-12">
        <checkbox-input
            content="Вы допускаете торги по конкурсу"
            name="application_letter_of_credit"
            v-model="selectedData.application_letter_of_credit"
            :label="[{label: 'Возможен аккредитив'}]"
        ></checkbox-input>
      </div>
      <div class="col col-xs-12">
        <textarea-input
            v-model="selectedData.application_delivery_conditions"
            label="Условия поставки"
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
            no-result="Адрес не найден"
        ></select-input>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../helpers/api'
  import TextInput from '../../forms/Input.vue'
  import SelectInput from '../../forms/Select.vue'
  import CheckboxInput from '../../forms/Checkbox.vue'
  import TextareaInput from "../../forms/Textarea";

  export default {
    name: 'PaymentAndDelivery',
    components: {
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
