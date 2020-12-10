<template>
  <div v-if="selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Обеспечение и гарантии</h3>
    <div class="row">
      <div class="col col-xs-12">
        <textarea-input
            v-model="selectedData.application_security_of_the_contract"
            label="Обеспечение договора"
            placeholder="Введите  дополнительную информацио об исполнительном договоре"
        ></textarea-input>
      </div>
      <div class="col col-xs-12">
        <checkbox-input
            name="application_security_required"
            v-model="selectedData.application_security_required"
            :label="[{label: 'Требуется обеспечение заявки'}]"
            :change="securityChecked"
        ></checkbox-input>
      </div>
      <div v-if="selectedData.application_security_required" class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.calculate_the_amount_of_collateral"
            label="Считать размер обеспечения в"
            :options="fieldsData.amountOfCollateral"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            selectedData.application_security_required &&
            selectedData.calculate_the_amount_of_collateral &&
            selectedData.calculate_the_amount_of_collateral.id === 'percent'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.percentage_of_the_starting_price"
            label="Процент от начальной цены"
            placeholder="Введите число"
            :rules="{ required: true, numeric: true, max: 12 }"
            :input="countCollateralAmount"
        ></text-input>
      </div>
      <div
          v-if="
            selectedData.application_security_required &&
            selectedData.calculate_the_amount_of_collateral &&
            selectedData.calculate_the_amount_of_collateral.id === 'percent'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            :disabled="true"
            v-model="selectedData.collateral_amount_percents"
            label="Сумма обеспечения"
        ></text-input>
      </div>
      <div
          v-if="
            selectedData.application_security_required &&
            selectedData.calculate_the_amount_of_collateral &&
            selectedData.calculate_the_amount_of_collateral.id === 'money'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.collateral_amount"
            label="Сумма обеспечения"
            placeholder="Введите число"
            :rules="{ required: true, numeric: true, max: 12 }"
        ></text-input>
      </div>
      <div
          v-if="selectedData.application_security_required"
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            :disabled="true"
            v-model="selectedData.currency.name"
            label="Валюта"
        ></text-input>
      </div>
      <div
          v-if="selectedData.application_security_required"
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.blocking_period_days"
            label="Срок блокировки, дней"
            :options="fieldsData.blockingPeriodDays"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div class="col col-xs-12">
        <checkbox-input
            name="application_bank_guarantee"
            v-model="selectedData.application_bank_guarantee"
            :label="[{label: 'Банковская гарантия'}]"
            :disabled="selectedData.application_security_required === 0"
        ></checkbox-input>
      </div>
      <div v-if="procedureIdData.procedureType === 'Auction'" class="col col-xs-12">
        <radio-input
            title="Обеспечение заявки, внесенное победителем аукциона"
            name="securing_the_application"
            v-model="selectedData.securing_the_application"
            :label="fieldsData.securingTheApplication"
        ></radio-input>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '../../forms/Input.vue'
import TextareaInput from '../../forms/Textarea.vue'
import CheckboxInput from '../../forms/Checkbox.vue'
import SelectInput from '../../forms/Select.vue'
import Radio from "../../forms/Radio";

  export default {
    name: 'SecurityAndGuarantees',
    components: {
      Radio,
      TextInput,
      TextareaInput,
      CheckboxInput,
      SelectInput,
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
      fieldsData: {
        default: null,
        type: Object,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
    },
    methods: {
      securityChecked() {
        this.selectedData.application_bank_guarantee = 0
      },
      countCollateralAmount() {
        this.selectedData.collateral_amount_percents =
            this.selectedData.percentage_of_the_starting_price *
            this.procedureIdData.baseCount
      }
    }
  }
</script>

<style scoped></style>
