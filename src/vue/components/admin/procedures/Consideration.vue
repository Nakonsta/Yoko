<template>
  <div
    v-if="
      selectedData.tender_trading_type &&
      (procedureIdData.procedureType == 'Supplier' ||
        procedureIdData.procedureType === 'Contest')
    "
    class="container-item"
  >
    <h3 class="procedure__main-title">Рассмотрение заявки и подведение итогов</h3>
    <div class="row">
      <div class="col col-xl-4 col-sm-6 col-xs-12">
        <date-time
            mode="dateTime"
            v-model="selectedData.application_submit_date_time"
            label="Дата и время окончания подачи заявки на конкурс"
            placeholder="Выберите крайнюю дату"
            :disabled="isCreatedProcedure"
            :min-date="new Date(procedureIdData.setMin2WeeksDates.publication_date)"
            :rules="{required: true, minMaxDateCheck: procedureIdData.setMin2WeeksDates.publication_date}"
        ></date-time>
      </div>
      <div class="col col-xl-8 col-sm-6 col-xs-12">
        <text-input
            v-model="selectedData.commission"
            label="Конкурсная комиссия"
            :disabled="isCreatedProcedure"
            placeholder="Введите конкурсную комиссию"
        ></text-input>
      </div>
      <div class="col col-xl-4 col-sm-6 col-xs-12">
        <date-time
            mode="dateTime"
            v-model="selectedData.application_opening_date_time"
            label="Дата и время получения конкурсной документации"
            placeholder="Выберите крайнюю дату"
            :disabled="isCreatedProcedure"
            :min-date="new Date(procedureIdData.setMinDates.application_submit_date_time)"
            :rules="{required: true, minMaxDateCheck: procedureIdData.setMinDates.application_submit_date_time}"
        ></date-time>
      </div>
      <div class="col col-xl-8 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Введите  адрес"
            v-model="selectedData.place_of_receipt"
            :options="suggestions.place_of_receipt"
            label="Место получения конкурсной документации"
            :searchable="true"
            :disabled="isCreatedProcedure"
            :loading="loadingPlaceSearch.place_of_receipt"
            :search="value => searchPlace(value, 'place_of_receipt')"
            no-result="Адрес не найден"
        ></select-input>
      </div>
      <div class="col col-xl-4 col-sm-6 col-xs-12">
        <date-time
            mode="dateTime"
            v-model="selectedData.application_date_time"
            label="Дата и время рассмотрения заявок"
            placeholder="Выберите крайнюю дату"
            :disabled="isCreatedProcedure"
            :min-date="new Date(procedureIdData.setMinDates.application_opening_date_time)"
            :rules="{required: true, minMaxDateCheck: procedureIdData.setMinDates.application_opening_date_time}"
        ></date-time>
      </div>
      <div class="col col-xl-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            v-model="selectedData.reviewForm"
            :options="fieldsData.reviewForm"
            label="Форма рассмотрения заявок"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="selectedData.reviewForm && selectedData.reviewForm.id === 'analog'"
          class="col col-xl-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Введите  адрес"
            v-model="selectedData.place_of_consideration"
            :options="suggestions.place_of_consideration"
            label="Место рассмотрения заявок"
            :searchable="true"
            :disabled="isCreatedProcedure"
            :loading="loadingPlaceSearch.place_of_consideration"
            :search="value => searchPlace(value, 'place_of_consideration')"
            no-result="Адрес не найден"
        ></select-input>
      </div>
      <div
          v-if="selectedData.reviewForm && selectedData.reviewForm.id === 'electronic'"
          class="col col-xl-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.absolutTrade"
            label="Абсолют трейд"
            :disabled="true"
        ></text-input>
      </div>
      <div class="col col-xl-4 col-sm-6 col-xs-12">
        <date-time
            mode="dateTime"
            v-model="selectedData.application_date_time_summing_up"
            label="Дата и время подведения итогов"
            placeholder="Выберите крайнюю дату"
            :disabled="isCreatedProcedure"
            :min-date="new Date(procedureIdData.setMinDates.application_date_time)"
            :rules="{required: true, minMaxDateCheck: procedureIdData.setMinDates.application_date_time}"
        ></date-time>
      </div>
      <div class="col col-xl-8 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Введите  адрес"
            v-model="selectedData.place_of_consideration_total"
            :options="suggestions.place_of_consideration_total"
            label="Место подведения итогов"
            :searchable="true"
            :disabled="isCreatedProcedure"
            :loading="loadingPlaceSearch.place_of_consideration_total"
            :search="value => searchPlace(value, 'place_of_consideration_total')"
            no-result="Адрес не найден"
        ></select-input>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/components/../helpers/api'
  import TextInput from '@/components/forms/Input.vue'
  import SelectInput from '@/components/forms/Select.vue'
  import DateTime from '@/components/forms/DateTime.vue'

  export default {
    name: 'Consideration',
    components: {
      TextInput,
      SelectInput,
      DateTime,
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
      procedureIdData: {
        default: null,
        type: Object,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
    },
    data() {
      return {
        loadingPlaceSearch: {
          place_of_receipt: false,
          place_of_consideration: false,
          place_of_consideration_total: false,
        },
        suggestions: {
          place_of_receipt: [],
          place_of_consideration: [],
          place_of_consideration_total: [],
        },
      }
    },
    methods: {
      searchPlace(value, type) {
        this.getSearchPlace(value, type)
      },
      parseData(arr) {
        return arr.map((item) => {
          return {
            id: item.value,
            name: item.value,
          }
        })
      },
      getSearchPlace(string, type) {
        clearInterval(this.searchCounter)
        this.loadingPlaceSearch[type] = true
        if (string && string.length > 1) {
          this.searchCounter = setTimeout(() => {
            this.fetchDaData(string)
              .then(({data}) => {
                this.suggestions[type] = this.parseData(data.suggestions)
                this.loadingPlaceSearch[type] = false
              })
              .catch((e) => {
                console.log(e)
                this.loadingPlaceSearch[type] = false
              })
          }, 1000)
        } else {
          this.loadingPlaceSearch[type] = false
        }
      },
    },
  }
</script>

<style></style>
