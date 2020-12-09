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
      <div class="col col-md-8 col-sm-6 col-xs-12">
        <text-input
            v-model="selectedData.commission"
            label="Конкурсная комиссия"
            placeholder="Введите конкурсную комиссию"
            :disabled="isCreatedProcedure"
        ></text-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <v-date-picker v-model="selectedData.application_submit_date_time" mode="dateTime" is24hr>
          <template v-slot="{ inputValue, inputEvents }">
            <input
                class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                :value="inputValue"
                v-on="inputEvents"
            />
          </template>
        </v-date-picker>
      </div>
    </div>
    <div class="col col-md-8 col-sm-6 col-xs-12">
      <select-input
          :is-single="true"
          :close="true"
          placeholder="Введите  адрес"
          v-model="selectedData.place_of_receipt"
          :options="suggestions.place_of_receipt"
          label="Место получения конкурсной документации"
          :searchable="true"
          :loading="loadingPlaceSearch.place_of_receipt"
          :search="searchPlaceReceipt"
          no-result="Адрес не найден"
      ></select-input>
    </div>
<!--    <v-row class="procedure__main-selects mt-5 mb-10">-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <app-date-time-input-->
<!--          label="Дата и время окончания подачи заявки на конкурс"-->
<!--          set-ref="application_submit_date_time_menu"-->
<!--          :model-menu="selectedData.application_submit_date_time_menu"-->
<!--          :model-date-value="selectedData.application_submit_date"-->
<!--          :model-time-value="selectedData.application_submit_time"-->
<!--          :model-date-time-value="selectedData.application_submit_date_time"-->
<!--          :text-validation="textValidation"-->
<!--          :min-date-validation="minDateValidation"-->
<!--          :set-min="procedureIdData.setMinWeekDates.publication_date"-->
<!--          @refDate-changed="selectedData.application_submit_date = $event"-->
<!--          @refTime-changed="selectedData.application_submit_time = $event"-->
<!--          @refDT-changed="selectedData.application_submit_date_time = $event"-->
<!--        ></app-date-time-input>-->
<!--      </v-col>-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <app-date-time-input-->
<!--          label="Дата и время получения конкурсной документации"-->
<!--          set-ref="application_opening_menu"-->
<!--          :model-menu="selectedData.application_opening_menu"-->
<!--          :model-date-value="selectedData.application_opening_date"-->
<!--          :model-time-value="selectedData.application_opening_time"-->
<!--          :model-date-time-value="selectedData.application_opening_date_time"-->
<!--          :text-validation="textValidation"-->
<!--          :min-date-validation="minDateValidation"-->
<!--          :set-min="procedureIdData.setMinDates.application_submit_date"-->
<!--          @refDate-changed="selectedData.application_opening_date = $event"-->
<!--          @refTime-changed="selectedData.application_opening_time = $event"-->
<!--          @refDT-changed="selectedData.application_opening_date_time = $event"-->
<!--        ></app-date-time-input>-->
<!--      </v-col>-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <v-autocomplete-->
<!--          key="searchPlaceReceipt"-->
<!--          v-model="selectedData.place_of_receipt"-->
<!--          :items="suggestions.place_of_receipt"-->
<!--          class="my-4"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          label="Место получения конкурсной документации"-->
<!--          :rules="[textValidation]"-->
<!--          :loading="loadingPlaceSearch.place_of_receipt"-->
<!--          cache-items-->
<!--          hide-details-->
<!--          no-filter-->
<!--          :no-data-text="-->
<!--            loadingPlaceSearch.place_of_receipt-->
<!--              ? 'Поиск адреса'-->
<!--              : 'адрес не найден'-->
<!--          "-->
<!--          :search-input.sync="searchPlaceReceipt"-->
<!--          required-->
<!--        >-->
<!--        </v-autocomplete>-->
<!--      </v-col>-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <app-date-time-input-->
<!--          label="Дата и время рассмотрения заявок"-->
<!--          set-ref="application_date_time_menu"-->
<!--          :model-menu="selectedData.application_date_time_menu"-->
<!--          :model-date-value="selectedData.application_date"-->
<!--          :model-time-value="selectedData.application_time"-->
<!--          :model-date-time-value="selectedData.application_date_time"-->
<!--          :text-validation="textValidation"-->
<!--          :min-date-validation="minDateValidation"-->
<!--          :set-min="procedureIdData.setMinDates.application_opening_date"-->
<!--          @refDate-changed="selectedData.application_date = $event"-->
<!--          @refTime-changed="selectedData.application_time = $event"-->
<!--          @refDT-changed="selectedData.application_date_time = $event"-->
<!--        ></app-date-time-input>-->
<!--      </v-col>-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <v-select-->
<!--          v-model="selectedData.reviewForm"-->
<!--          class="my-4"-->
<!--          label="Форма рассмотрения заявок"-->
<!--          :items="fieldsData.reviewForm"-->
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
<!--        v-if="selectedData.reviewForm === 'analog'"-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-autocomplete-->
<!--          key="searchPlaceConsideration"-->
<!--          v-model="selectedData.place_of_consideration"-->
<!--          :items="suggestions.place_of_consideration"-->
<!--          class="my-4"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          cache-items-->
<!--          no-filter-->
<!--          label="Место рассмотрения заявок"-->
<!--          :rules="[textValidation]"-->
<!--          :loading="loadingPlaceSearch.place_of_consideration"-->
<!--          :no-data-text="-->
<!--            loadingPlaceSearch.place_of_consideration-->
<!--              ? 'Поиск адреса'-->
<!--              : 'адрес не найден'-->
<!--          "-->
<!--          :search-input.sync="searchPlaceConsideration"-->
<!--          required-->
<!--        >-->
<!--        </v-autocomplete>-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        v-if="selectedData.reviewForm === 'electronic'"-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="4"-->
<!--      >-->
<!--        <v-text-field-->
<!--          v-model="selectedData.absolutTrade"-->
<!--          class="my-4"-->
<!--          label="Абсолют трейд"-->
<!--          :rules="[textValidation]"-->
<!--          disabled-->
<!--        ></v-text-field>-->
<!--      </v-col>-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <app-date-time-input-->
<!--          label="Дата и время подведения итогов"-->
<!--          set-ref="application_date_time_summing_up_menu"-->
<!--          :model-menu="selectedData.application_date_time_summing_up_menu"-->
<!--          :model-date-value="selectedData.application_date_summing_up"-->
<!--          :model-time-value="selectedData.application_time_summing_up"-->
<!--          :model-date-time-value="selectedData.application_date_time_summing_up"-->
<!--          :text-validation="textValidation"-->
<!--          :min-date-validation="minDateValidation"-->
<!--          :set-min="procedureIdData.setMinDates.application_date"-->
<!--          @refDate-changed="selectedData.application_date_summing_up = $event"-->
<!--          @refTime-changed="selectedData.application_time_summing_up = $event"-->
<!--          @refDT-changed="-->
<!--            selectedData.application_date_time_summing_up = $event-->
<!--          "-->
<!--        ></app-date-time-input>-->
<!--      </v-col>-->
<!--      <v-col cols="12" sm="6" md="4">-->
<!--        <v-autocomplete-->
<!--          key="searchPlaceTotal"-->
<!--          v-model="selectedData.place_of_consideration_total"-->
<!--          :items="suggestions.place_of_consideration_total"-->
<!--          class="my-4"-->
<!--          item-text="name"-->
<!--          item-value="id"-->
<!--          hide-details-->
<!--          cache-items-->
<!--          no-filter-->
<!--          label="Место подведения итогов"-->
<!--          :rules="[textValidation]"-->
<!--          :loading="loadingPlaceSearch.place_of_consideration_total"-->
<!--          :no-data-text="-->
<!--            loadingPlaceSearch.place_of_consideration_total-->
<!--              ? 'Поиск адреса'-->
<!--              : 'адрес не найден'-->
<!--          "-->
<!--          :search-input.sync="searchPlaceTotal"-->
<!--          required-->
<!--        >-->
<!--        </v-autocomplete>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </div>
</template>

<script>
  import moment from 'moment'
  import api from '../../../helpers/api'
  import TextInput from '../../forms/Input.vue'
  import SelectInput from '../../forms/Select.vue'
  // import { FunctionalCalendar } from "vue-functional-calendar";
  // import dateTimeInput from '~/components/procedures/inputs/dateTimeInput'

  export default {
    name: 'Consideration',
    components: {
      TextInput,
      SelectInput,
      // FunctionalCalendar,
      // appDateTimeInput: dateTimeInput,
    },
    mixins: [api],
    props: {
      selectedData: {
        default: null,
        type: Object,
      },
      selectsValidation: {
        default: () => {},
        type: Function,
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
      minDateValidation: {
        default: () => {},
        type: Function,
      },
      textValidation: {
        default: () => {},
        type: Function,
      },
    },
    data() {
      return {
        loadingPlaceSearch: {
          place_of_receipt: false,
          place_of_consideration: false,
          place_of_consideration_total: false,
        },
        activeTab: 0,
        setMinSubmitDate: null,
        suggestions: {
          place_of_receipt: [],
          place_of_consideration: [],
          place_of_consideration_total: [],
        },
      }
    },
    watch: {
      searchPlaceReceipt(value) {
        this.getSearchPlace(value, 'place_of_receipt')
      },
      searchPlaceConsideration(value) {
        this.getSearchPlace(value, 'place_of_consideration')
      },
      searchPlaceTotal(value) {
        this.getSearchPlace(value, 'place_of_consideration_total')
      },
    },
    methods: {
      searchPlaceReceipt(value) {
        this.getSearchPlace(value, 'place_of_receipt')
      },
      showTimePicker() {
        this.activeTab = 1
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
              .then((response) => {
                this.suggestions[type] = this.parseData(response.suggestions)
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
      isAfterToday(val) {
        return moment(val).isSameOrAfter(new Date(), 'day')
      },
    },
  }
</script>

<style></style>
