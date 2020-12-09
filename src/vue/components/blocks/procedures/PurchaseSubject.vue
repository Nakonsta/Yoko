<template>
  <div v-if="selectedData.tender_trading_type" class="container-item">
    <h3 class="procedure__main-title">Предмет закупки</h3>
    <div class="row middle-xs">
      <div class="col col-xs-12">
        <textarea-input
            v-model="selectedData.item_description"
            label="Описание предмета закупки"
            placeholder="Введите информацию о предмете закупки"
        ></textarea-input>
      </div>
      <div v-if="!selectedData.purchase_positional" class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.count_lots"
            label="Количество лотов"
            :options="counterToTenSelect"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div v-if="selectedData.count_lots === 0" class="col col-md-4 col-sm-6 col-xs-12">
        <checkbox-input
            class-name=""
            name="purchase_positional"
            v-model="selectedData.purchase_positional"
            :label="[{label: 'Попозиционная закупка'}]"
        ></checkbox-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.analog_products"
            label="Товары-аналоги"
            :options="fieldsData.goodsAnalogs"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
    </div>
    <app-position-type
      :selected-data="selectedData"
      :fields-data="fieldsData"
      :procedure-id-data="procedureIdData"
      :remove-position="removePosition"
      :is-created-procedure="isCreatedProcedure"
      :count-total-price="countTotalPrice"
    ></app-position-type>
    <a href="javascript:{}" class="link-icon" @click="createNewPositionFieldset">
      <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
      Добавить позицию
    </a>
    <div v-if="selectedData.count_lots.id !== 0" class="row">
      <div v-for="index in selectedData.count_lots.id" :key="index" class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            :disabled="true"
            v-model="procedureIdData.totalCount[index - 1]"
            :label="'Сумма лота ' + index"
        ></text-input>
      </div>
    </div>
    <div class="row">
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            :disabled="true"
            v-model="procedureIdData.baseCount"
            label="Начальная цена"
        ></text-input>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from '../../forms/Input.vue'
  import SelectInput from '../../forms/Select.vue'
  import CheckboxInput from '../../forms/Checkbox.vue'
  import TextareaInput from '../../forms/Textarea.vue'
  import PositionType from './PositionType.vue'

  export default {
    name: 'PurchaseSubject',
    components: {
      TextInput,
      SelectInput,
      CheckboxInput,
      TextareaInput,
      appPositionType: PositionType,
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
      removePosition: {
        default: () => {},
        type: Function,
      },
      counterToTenSelect: {
        default: null,
        type: Array,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
      countTotalPrice: {
        default: () => {},
        type: Function,
      },
      selectsValidation: {
        default: () => {},
        type: Function,
      },
      createNewPositionFieldset: {
        default: () => {},
        type: Function,
      },
      textValidation: {
        default: () => {},
        type: Function,
      },
      numValidation: {
        default: null,
        type: Array,
      },
    },
    data() {
      return {
        numDecValidation: [
          (v) =>
            /^\d{1,9}(\.\d{1,2})?$/.test(v) ||
            'Вводите только цифровые значения',
        ],
      }
    },
  }
</script>

<style scoped>
</style>
