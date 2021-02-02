<template>
  <div
    v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id"
    class="container-item"
  >
    <h3 class="procedure__main-title">
      Сроки закупки
    </h3>
    <div class="row">
      <div
        v-if="
          procedureIdData.procedureType === 'Query' ||
            procedureIdData.procedureType === 'Offers' ||
            procedureIdData.procedureType === 'Commercial' ||
            procedureIdData.procedureType === 'Auction'
        "
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <date-time
          v-model="selectedData.application_end_date"
          :label="
            procedureIdData.procedureType === 'Query' ||
              procedureIdData.procedureType === 'Offers' ||
              procedureIdData.procedureType === 'Commercial'
              ? 'Дата окончания подачи заявок'
              : 'Дата начала процедуры'
          "
          placeholder="Выберите крайнюю дату"
          :disabled="isCreatedProcedure"
          :min-date="
            procedureIdData.procedureType === 'Query'
              ? addOneDay(procedureIdData.setMinFiveDates.publication_date)
              : procedureIdData.procedureType === 'Offers'
                ? addOneDay(procedureIdData.setMinSevenDates.publication_date)
                : addOneDay(procedureIdData.setSameDates.publication_date)
          "
          :rules="{
            required: true,
            minMaxDateCheck:
              procedureIdData.procedureType === 'Query'
                ? addOneDay(procedureIdData.setMinFiveDates.publication_date, true)
                : procedureIdData.procedureType === 'Offers'
                  ? addOneDay(procedureIdData.setMinSevenDates.publication_date, true)
                  : addOneDay(procedureIdData.setSameDates.publication_date, true)
          }"
        />
      </div>
      <div
        v-if="
          procedureIdData.procedureType === 'FromSupplier' ||
            procedureIdData.procedureType === 'Contest' ||
            procedureIdData.procedureType === 'Supplier'
        "
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <date-range
          v-model="selectedData.application_terms_of_contract"
          label="Сроки заключения договора"
          :disabled="isCreatedProcedure"
          placeholder="Выберите период"
          :min-date="
            new Date(procedureIdData.setMinDates.application_date_time_summing_up || new Date())
          "
          :rules="{
            required: true,
            theSameDate: true,
            minMaxDateCheck: procedureIdData.setMinDates.application_date_time_summing_up,
          }"
        />
      </div>
      <div
        v-if="procedureIdData.procedureType !== 'Auction'"
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <date-range
          v-model="selectedData.application_delivery_time"
          :label="
            procedureIdData.procedureType === 'Contest' ||
              procedureIdData.procedureType === 'Suppliers'
              ? 'Сроки поставки товара'
              : 'Дата вскрытия заявок'
          "
          :disabled="isCreatedProcedure"
          placeholder="Выберите период"
          :min-date="
            procedureIdData.procedureType === 'FromSupplier' ||
              procedureIdData.procedureType === 'Contest' ||
              procedureIdData.procedureType === 'Suppliers'
              ? new Date(procedureIdData.setMinDates.application_terms_of_contract)
              : new Date(procedureIdData.setMinDates.application_end_date)
          "
          :rules="{
            required: true,
            theSameDate: true,
            minMaxDateCheck:
              procedureIdData.procedureType === 'Contest' ||
              procedureIdData.procedureType === 'Suppliers'
                ? procedureIdData.setMinDates.application_terms_of_contract
                : procedureIdData.setMinDates.application_end_date,
          }"
        />
      </div>
      <div
        v-if="procedureIdData.procedureType === 'Auction'"
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <date-time
          v-model="selectedData.application_delivery_time"
          label="Дата окончания процедуры"
          placeholder="Выберите крайнюю дату"
          :disabled="isCreatedProcedure"
          :min-date="new Date(procedureIdData.setMin2WeeksDates.publication_date)"
          :rules="{
            required: true,
            minMaxDateCheck: procedureIdData.setMin2WeeksDates.publication_date
          }"
        />
      </div>
      <div
        v-if="procedureIdData.procedureType === 'Auction'"
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <checkbox-input
          v-model="selectedData.consideration_of_auction_bids"
          class-name="mt3"
          :disabled="isCreatedProcedure"
          name="consideration_of_auction_bids"
          :label="[{label: 'Рассмотрение аукционных заявок до начала процедуры'}]"
        />
      </div>
      <div
        v-if="procedureIdData.procedureType === 'Auction'"
        class="col col-lg-4 col-sm-6 col-xs-12"
      >
        <text-input
          v-model="selectedData.application_comment"
          label="Комментарий"
          :disabled="isCreatedProcedure"
          placeholder="Введите комментарий"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from '@/components/forms/DateTime.vue';
import TextInput from '@/components/forms/Input.vue';
import CheckboxInput from '@/components/forms/Checkbox.vue';
import DateRange from '@/components/forms/DateRange.vue';
import moment from 'moment';

export default {
  name: 'TermsOfPurchase',
  components: {
    DateTime,
    TextInput,
    DateRange,
    CheckboxInput,
  },
  props: {
    isCreatedProcedure: {
      default: false,
      type: Boolean,
    },
    selectedData: {
      default: null,
      type: Object,
    },
    procedureIdData: {
      default: null,
      type: Object,
    },
  },
  methods: {
    addOneDay(textDate, returnText = false) {
      const date = new Date(textDate);
      const addDays = 1;

      date.setDate(date.getDate() + addDays);

      if (returnText) {
        return moment(date).format('YYYY-MM-DD');
      }

      return date;
    },
  },
};
</script>

<style scoped></style>
