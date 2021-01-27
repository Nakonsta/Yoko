<template>
  <div
    v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id"
    class="container-item"
    :class="{hideIt: procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security}"
  >
    <div
      v-if="procedureIdData.procedureType === 'Commercial'"
      class="function-btn"
      :class="{active: fieldsData.hideBlock.application_security}"
      @click="removeBlock('application_security')"
    >
      <tooltip
        class-main="tooltip tooltip--right"
        content="Скрыть блок"
        icon="\./img/sprite.svg#cancel"
      />
    </div>
    <h3 class="procedure__main-title">
      Обеспечение и гарантии
    </h3>
    <checkbox-input
      v-model="selectedData.application_security_of_the_contract"
      name="application_security_of_the_contract"
      :label="[{label: 'Требуется обеспечение договора'}]"
      :change="securityChecked"
    />
    <div
      v-if="selectedData.application_security_of_the_contract"
      class="row"
    >
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
          v-model="selectedData.security.calculate_the_amount_of_collateral"
          :is-single="true"
          :close="true"
          placeholder=""
          label="Считать размер обеспечения в"
          :options="fieldsData.amountOfCollateral"
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          :disabled="isCreatedProcedure"
        />
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
          placeholder="Введите процент"
          :disabled="isCreatedProcedure"
          :rules="{
            numeric: true,
            max_value: 100 ,
            required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security),
          }"
          :input="countPercent('security')"
        />
      </div>
      <div
        v-if="
          selectedData.security.calculate_the_amount_of_collateral &&
            selectedData.security.calculate_the_amount_of_collateral.id === 'percent'
        "
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
          v-model="selectedData.security.collateral_amount_percents"
          :disabled="true"
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          label="Сумма обеспечения"
          :inputmask="$priceInputmask"
        />
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
          :maxlength="16"
          label="Сумма обеспечения"
          :disabled="isCreatedProcedure"
          placeholder="Введите сумму"
          :inputmask="$priceInputmask"
          :rules="{
            required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security),
          }"
        />
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
          v-model="selectedData.currency.name"
          :disabled="true"
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          label="Валюта"
        />
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
          v-model="selectedData.security.blocking_period_days"
          :is-single="true"
          :close="true"
          placeholder=""
          label="Срок блокировки, дней"
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          :options="fieldsData.blockingPeriodDays"
          :disabled="isCreatedProcedure"
        />
      </div>
    </div>
    <checkbox-input
      v-model="selectedData.application_security_required"
      name="application_security_required"
      :disabled="isCreatedProcedure"
      :label="[{label: 'Требуется обеспечение заявки'}]"
      :change="securityChecked"
    />
    <div
      v-if="selectedData.application_security_required"
      class="row"
    >
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
          v-model="selectedData.request.calculate_the_amount_of_collateral"
          :is-single="true"
          :close="true"
          placeholder=""
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          label="Считать размер обеспечения в"
          :options="fieldsData.amountOfCollateral"
          :disabled="isCreatedProcedure"
        />
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
          placeholder="Введите процент"
          :disabled="isCreatedProcedure"
          :rules="{
            numeric: true,
            max_value: 100,
            required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security),
          }"
          :input="countPercent('request')"
        />
      </div>
      <div
        v-if="
          selectedData.request.calculate_the_amount_of_collateral &&
            selectedData.request.calculate_the_amount_of_collateral.id === 'percent'
        "
        class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
          v-model="selectedData.request.collateral_amount_percents"
          :disabled="true"
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          label="Сумма обеспечения"
          :inputmask="$priceInputmask"
        />
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
          :maxlength="16"
          label="Сумма обеспечения"
          :disabled="isCreatedProcedure"
          placeholder="Введите сумму"
          :inputmask="$priceInputmask"
          :rules="{
            required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security),
          }"
        />
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
          v-model="selectedData.currency.name"
          :disabled="true"
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          label="Валюта"
        />
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
          v-model="selectedData.request.blocking_period_days"
          :is-single="true"
          :close="true"
          placeholder=""
          label="Срок блокировки, дней"
          :rules="{required: !(procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.application_security)}"
          :options="fieldsData.blockingPeriodDays"
          :disabled="isCreatedProcedure"
        />
      </div>
    </div>
    <div v-if="procedureIdData.procedureType === 'Auction'">
      <radio-input
        v-model="selectedData.securing_the_application"
        :rules="{
          required:
            !(procedureIdData.procedureType === 'Commercial'
              && fieldsData.hideBlock.application_security)
            && (!!selectedData.application_security_of_the_contract
              || !!selectedData.application_security_required)
        }"
        :disabled="
          isCreatedProcedure ||
            !selectedData.application_security_of_the_contract &&
            !selectedData.application_security_required
        "
        title="Обеспечение заявки, внесенное победителем аукциона"
        name="securing_the_application"
        :label="fieldsData.securingTheApplication"
      />
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/tooltip';
import TextInput from '@/components/forms/Input';
import TextareaInput from '@/components/forms/Textarea';
import CheckboxInput from '@/components/forms/Checkbox';
import SelectInput from '@/components/forms/Select';
import RadioInput from '@/components/forms/Radio';

export default {
  name: 'SecurityAndGuarantees',
  components: {
    Tooltip,
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
    removeBlock: {
      default: () => {},
      type: Function,
    },
    countPercent: {
      default: () => {},
      type: Function,
    },
  },
  methods: {
    securityChecked() {
      this.selectedData.application_bank_guarantee = 0;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
