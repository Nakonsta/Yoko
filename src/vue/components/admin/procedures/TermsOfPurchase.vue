<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Сроки закупки</h3>
    <div class="row">
      <div
        v-if="
          procedureIdData.procedureType === 'Query' ||
          procedureIdData.procedureType === 'Offers' ||
          procedureIdData.procedureType === 'Commercial' ||
          procedureIdData.procedureType === 'Auction'
        "
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-time
            v-model="selectedData.application_terms_of_contract"
            :label="
              procedureIdData.procedureType === 'Query' ||
              procedureIdData.procedureType === 'Offers' ||
              procedureIdData.procedureType === 'Commercial'
                ? 'Дата окончания подачи заявок'
                : 'Дата начала процедуры'
            "
            placeholder="Выберите крайнюю дату"
            :min-date="
              procedureIdData.procedureType === 'Query'
                ? new Date(procedureIdData.setMinFiveDates.publication_date)
                : procedureIdData.procedureType === 'Offers'
                 ? new Date(procedureIdData.setMinSevenDates.publication_date)
                 : new Date(procedureIdData.setMinDates.publication_date)
            "
            :rules="{
                   required: true,
                   minMaxDateCheck:
                    procedureIdData.procedureType === 'Query'
                      ? procedureIdData.setMinFiveDates.publication_date
                      : procedureIdData.procedureType === 'Offers'
                        ? procedureIdData.setMinSevenDates.publication_date
                        : procedureIdData.setMinDates.publication_date
            }"
        ></date-time>
      </div>
      <div
        v-if="
          procedureIdData.procedureType === 'Contest' ||
          procedureIdData.procedureType === 'Supplier'
        "
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-range
            v-model="selectedData.application_terms_of_contract"
            label="Сроки заключения договора"
            placeholder="Выберите период"
            :min-date="new Date(procedureIdData.setMinDates.application_date_time_summing_up)"
            :rules="{required: true, minMaxDateCheck: procedureIdData.setMinDates.application_date_time_summing_up}"
        ></date-range>
      </div>
      <div
        v-if="
          procedureIdData.procedureType === 'Contest' ||
          procedureIdData.procedureType === 'Query' ||
          procedureIdData.procedureType === 'Offers' ||
          procedureIdData.procedureType === 'Commercial' ||
          procedureIdData.procedureType === 'Supplier'
        "
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-range
            v-model="selectedData.application_delivery_time"
            :label="
              procedureIdData.procedureType === 'Contest' ||
              procedureIdData.procedureType === 'Suppliers'
                ? 'Сроки поставки товара'
                : 'Дата вскрытия заявок'
            "
            placeholder="Выберите период"
            :min-date="new Date(procedureIdData.setMinDates.application_terms_of_contract)"
            :rules="{
              required: true,
              minMaxDateCheck: procedureIdData.setMinDates.application_terms_of_contract
            }"
        ></date-range>
      </div>
      <div
        v-if="procedureIdData.procedureType === 'Auction'"
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-time
            v-model="selectedData.application_delivery_time"
            label="Дата окончания процедуры"
            placeholder="Выберите крайнюю дату"
            :min-date="new Date(procedureIdData.setMin2WeeksDates.application_terms_of_contract)"
            :rules="{
              required: true,
              minMaxDateCheck: procedureIdData.setMin2WeeksDates.application_terms_of_contract
            }"
        ></date-time>
      </div>
      <div
        v-if="procedureIdData.procedureType === 'Auction'"
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <checkbox-input
            class-name=""
            name="consideration_of_auction_bids"
            v-model="selectedData.consideration_of_auction_bids"
            :label="[{label: 'Рассмотрение аукционных заявок до начала процедуры'}]"
        ></checkbox-input>
      </div>
      <div
        v-if="procedureIdData.procedureType === 'Auction'"
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.application_comment"
            label="Комментарий"
            placeholder="Введите комментарий"
        ></text-input>
      </div>
    </div>
  </div>
</template>

<script>
  import DateTime from '../../forms/DateTime.vue'
  import TextInput from '../../forms/Input.vue'
  import CheckboxInput from '../../forms/Checkbox.vue'
  import DateRange from '../../forms/DateRange.vue'

  export default {
    name: 'TermsOfPurchase',
    components: {
      DateTime,
      TextInput,
      DateRange,
      CheckboxInput,
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
    },
    data() {
      return {
        range: {
          start: new Date(2020, 0, 6),
          end: new Date(2020, 0, 23),
        },
        setLabel: {
          first: '',
          second: ''
        },
        setRule: {
          first: '',
          second: ''
        },
        setMinDate: {
          first: '',
          second: ''
        },
      }
    },
    mounted() {
      if(
          this.procedureIdData.procedureType === 'Query' ||
          this.procedureIdData.procedureType === 'Offers' ||
          this.procedureIdData.procedureType === 'Commercial'
      ) {
        this.setLabel.first = 'Дата окончания подачи заявок'
      } else {
        this.setLabel.first = 'Дата начала процедуры'
      }
      if (this.procedureIdData.procedureType === 'Query') {
        this.setRule.first = this.procedureIdData.setMinFiveDates.publication_date
        this.setMinDate.first = new Date(this.procedureIdData.setMinFiveDates.publication_date)
      } else if (this.procedureIdData.procedureType === 'Offers') {
        this.setRule.first = this.procedureIdData.setMinSevenDates.publication_date
        this.setMinDate.first = new Date(this.procedureIdData.setMinSevenDates.publication_date)
      } else {
        this.setRule.first = this.procedureIdData.setMinDates.publication_date
        this.setMinDate.first = new Date(this.procedureIdData.setMinDates.publication_date)
      }

      if (
          this.procedureIdData.procedureType === 'Contest' ||
          this.procedureIdData.procedureType === 'Suppliers'
      ) {
        this.setLabel.second = 'Сроки поставки товара'
      } else if (this.procedureIdData.procedureType === 'Auction') {
        this.setLabel.second = 'Дата окончания процедуры'
        this.setRule.first = this.procedureIdData.setMin2WeeksDates.publication_date
        this.setMinDate.first = new Date(this.procedureIdData.setMin2WeeksDates.publication_date)
      } else {
        this.setLabel.second = 'Дата вскрытия заявок'
        this.setRule.first = this.procedureIdData.setMinDates.publication_date
        this.setMinDate.first = new Date(this.procedureIdData.setMinDates.publication_date)
      }
    }
  }
</script>

<style scoped></style>
