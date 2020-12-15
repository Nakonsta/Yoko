<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Обеспечение и гарантии</h3>
    <checkbox-input
        name="application_security_of_the_contract"
        v-model="selectedData.application_security_of_the_contract"
        :label="[{label: 'Требуется обеспечение договора'}]"
        :change="securityChecked"
    ></checkbox-input>
    <div v-if="selectedData.application_security_of_the_contract" class="row">
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.security.calculate_the_amount_of_collateral"
            label="Считать размер обеспечения в"
            :options="fieldsData.amountOfCollateral"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            selectedData.security.calculate_the_amount_of_collateral &&
            selectedData.security.calculate_the_amount_of_collateral.id === 'percent'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.security.percentage_of_the_starting_price"
            label="Процент от начальной цены"
            placeholder="Введите число"
            :rules="{ required: true, numeric: true, max: 3 }"
            :input="() => countCollateralAmount('security')"
        ></text-input>
      </div>
      <div
          v-if="
            selectedData.security.calculate_the_amount_of_collateral &&
            selectedData.security.calculate_the_amount_of_collateral.id === 'percent'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            :disabled="true"
            v-model="selectedData.security.collateral_amount_percents"
            label="Сумма обеспечения"
        ></text-input>
      </div>
      <div
          v-if="
            selectedData.security.calculate_the_amount_of_collateral &&
            selectedData.security.calculate_the_amount_of_collateral.id === 'monetary_expression'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.security.collateral_amount"
            label="Сумма обеспечения"
            placeholder="Введите число"
            :rules="{ required: true, regex: /^\d{1,9}(\.\d{1,2})?$/ }"
        ></text-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            :disabled="true"
            v-model="selectedData.currency.name"
            label="Валюта"
        ></text-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.security.blocking_period_days"
            label="Срок блокировки, дней"
            :options="fieldsData.blockingPeriodDays"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
    </div>
    <checkbox-input
        name="application_security_required"
        v-model="selectedData.application_security_required"
        :label="[{label: 'Требуется обеспечение заявки'}]"
        :change="securityChecked"
    ></checkbox-input>
    <div v-if="selectedData.application_security_required" class="row">
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.request.calculate_the_amount_of_collateral"
            label="Считать размер обеспечения в"
            :options="fieldsData.amountOfCollateral"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div
          v-if="
            selectedData.request.calculate_the_amount_of_collateral &&
            selectedData.request.calculate_the_amount_of_collateral.id === 'percent'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.request.percentage_of_the_starting_price"
            label="Процент от начальной цены"
            placeholder="Введите число"
            :rules="{ required: true, numeric: true, max: 3 }"
            :input="() => countCollateralAmount('request')"
        ></text-input>
      </div>
      <div
          v-if="
            selectedData.request.calculate_the_amount_of_collateral &&
            selectedData.request.calculate_the_amount_of_collateral.id === 'percent'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            :disabled="true"
            v-model="selectedData.request.collateral_amount_percents"
            label="Сумма обеспечения"
        ></text-input>
      </div>
      <div
          v-if="
            selectedData.request.calculate_the_amount_of_collateral &&
            selectedData.request.calculate_the_amount_of_collateral.id === 'monetary_expression'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.request.collateral_amount"
            label="Сумма обеспечения"
            placeholder="Введите число"
            :rules="{ required: true, regex: /^\d{1,9}(\.\d{1,2})?$/ }"
        ></text-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            :disabled="true"
            v-model="selectedData.currency.name"
            label="Валюта"
        ></text-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.request.blocking_period_days"
            label="Срок блокировки, дней"
            :options="fieldsData.blockingPeriodDays"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
    </div>
    <div v-if="procedureIdData.procedureType === 'Auction'">
      <radio-input
          title="Обеспечение заявки, внесенное победителем аукциона"
          name="securing_the_application"
          v-model="selectedData.securing_the_application"
          :label="fieldsData.securingTheApplication"
      ></radio-input>
    </div>
  </div>
</template>

<script>
import TextInput from '../../forms/Input'
import TextareaInput from '../../forms/Textarea'
import CheckboxInput from '../../forms/Checkbox'
import SelectInput from '../../forms/Select'
import RadioInput from "../../forms/Radio";

  export default {
    name: 'SecurityAndGuarantees',
    components: {
      RadioInput,
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
      countCollateralAmount(type) {
        this.selectedData[type].collateral_amount_percents =
            this.selectedData[type].percentage_of_the_starting_price *
            this.procedureIdData.baseCount
      }
    }
  }
</script>

<style scoped></style>
