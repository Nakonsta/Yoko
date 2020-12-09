<template>
  <div>
    <div
      v-for="(position, key) in selectedData.positions"
      :key="key"
      class="new-positions-fields"
    >
      <div class="row">
        <div class="col col-md-4 col-sm-6 col-xs-12">
          <select-input
              :is-single="true"
              :close="true"
              placeholder=""
              v-model="position.is_product"
              label="Тип позиции"
              :options="fieldsData.positionType"
              :disabled="isCreatedProcedure"
              :select="countTotalPrice"
          ></select-input>
        </div>
        <div v-if="position.is_product && position.is_product.id === 1" class="col col-md-4 col-sm-6 col-xs-12">
          <select-input
              :is-single="true"
              :close="true"
              placeholder=""
              v-model="position.category_okpd2"
              :options="fieldsData.OKPD2"
              label="Раздел ОКПД2"
              :searchable="true"
              :loading="position.loader"
              :search="(event) => searchOKPD2(event, key)"
              :select="(event) => updateCode(event, key)"
              no-result="ОКПД-2 не найдены"
          ></select-input>
        </div>
        <div v-if="selectedData.count_lots.id !== 0" class="col col-md-4 col-sm-6 col-xs-12">
          <select-input
              :is-single="true"
              :close="true"
              placeholder=""
              v-model="position.lot"
              :options="procedureIdData.lotsCounter"
              label="Добавить в лот"
          ></select-input>
        </div>
      </div>
      <div class="row">
        <div v-if="
            position.is_product && (
              (position.is_product.id === 1 && position.category_okpd2) ||
              position.is_product.id === 0
            )
          "
          class="col col-md-4 col-sm-6 col-xs-12"
        >
          <select-input
              :is-single="true"
              :close="true"
              placeholder="Поиск"
              v-model="position.name"
              :options="markSize"
              label="Наименование позиции"
              :searchable="true"
              :loading="position.loaderName"
              :search="(event) => fetchCatalogMark(event, key)"
              :select="(event) => updateRegion(event, key)"
              no-result="Позиции не найдены"
          ></select-input>
        </div>
        <div v-if="procedureIdData.positionType[key]" class="col col-md-4 col-sm-6 col-xs-12">
          <text-input
              v-model="position.quantity"
              :rules="{ required: true, numeric: true }"
              :label="
                procedureIdData.positionType[key] &&
                procedureIdData.positionType[key].name !== 'PositionCount'
                  ? 'Длина'
                  : 'Количество'
              "
              :input="countTotalPrice"
          ></text-input>
        </div>
        <div v-if="
            procedureIdData.positionType[key] &&
            procedureIdData.positionType[key].name !== 'PositionService'
          "
          class="col col-md-4 col-sm-6 col-xs-12"
        >
          <select-input
              :is-single="true"
              :close="true"
              placeholder=""
              v-model="position.measure"
              label="Единица"
              :options="
                procedureIdData.positionType[key] &&
                procedureIdData.positionType[key].name === 'PositionLength'
                  ? fieldsData.positionLongUnits
                  : fieldsData.positionUnits
              "
              :disabled="isCreatedProcedure"
          ></select-input>
        </div>
        <div v-if="procedureIdData.positionType[key]" class="col col-md-4 col-sm-6 col-xs-12">
          <text-input
              :disabled="true"
              v-model="selectedData.currency.name"
              label="Валюта"
          ></text-input>
        </div>
        <div v-if="procedureIdData.positionType[key]" class="col col-md-4 col-sm-6 col-xs-12">
          <text-input
              v-model="position.price_for_one"
              :rules="{ required: true, numeric: true, max: 12 }"
              label="Стоимость за единицу"
              :input="countTotalPrice"
          ></text-input>
        </div>
        <div v-if="procedureIdData.positionType[key]" class="col col-md-4 col-sm-6 col-xs-12">
          <select-input
              :is-single="true"
              :close="true"
              placeholder=""
              v-model="position.vat"
              label="НДС"
              :options="fieldsData.positionVAT"
              :disabled="isCreatedProcedure"
          ></select-input>
        </div>
        <div v-if="procedureIdData.positionType[key]" class="col col-md-4 col-sm-6 col-xs-12">
          <text-input
              :disabled="true"
              v-model="position.total_price"
              label="Сумма за позицию"
          ></text-input>
        </div>
        <div v-if="key !== 0" class="col col-xs-12">
          <div class="remove-btn" @click="removePosition(key)">
            <svg class="sprite-cancel"><use xmlns\:xlink="http://www.w3.org/1999/xlink" xlink\:href="\./img/sprite.svg#cancel"></use></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../helpers/api'
  import TextInput from '../../forms/Input.vue'
  import SelectInput from '../../forms/Select.vue'
  import CheckboxInput from '../../forms/Checkbox.vue'
  import TextareaInput from '../../forms/Textarea.vue'

  export default {
    name: 'PositionType',
    components: {
      TextInput,
      SelectInput,
      CheckboxInput,
      TextareaInput,
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
      removePosition: {
        default: () => {},
        type: Function,
      },
      countTotalPrice: {
        default: () => {},
        type: Function,
      },
      selectsValidation: {
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
        markSize: [],
        numValidation: [
          (v) =>
            /^\d{1,12}$/.test(v) || 'Вводите максимум 12 цифровых значений',
        ],
        numDecValidation: [
          (v) =>
            /^\d{1,9}(\.\d{1,2})?$/.test(v) ||
            'Вводите максимум 12 цифровых значений с точкой',
        ],
      }
    },
    methods: {
      searchOKPD2(value, key) {
        this.getSearchListOKPD2(value, key)
      },
      fetchCatalogMark(value, key) {
        this.fetchCatalog(value, key)
      },
      updateRegion(event, key) {
        console.log(event, key)
        if (this.selectedData.positions) {
          this.selectedData.positions[
            key
          ].marksize_id = this.selectedData.positions[key].name
        }
      },
      updateCode(event, key) {
        if (this.selectedData.positions) {
          this.selectedData.positions[key].code = event.code
        }
      },
      parseOKPD2(arr) {
        return arr.map((item) => {
          return {
            code: item.code,
            id: item.id,
            name: `${item.code} ${item.name}`,
          }
        })
      },
      parseMarksize(arr) {
        return arr.map((item) => {
          return {
            id: item.id,
            name: item.title,
          }
        })
      },
      getSearchListOKPD2(string, key) {
        clearInterval(this.searchOKPD2Counter)
        this.selectedData.positions[key].loader = true
        if (string && string.length > 2) {
          this.searchOKPD2Counter = setTimeout(() => {
            this.searchProceduresOKPD2(string)
              .then(({data}) => {
                this.fieldsData.OKPD2 = this.parseOKPD2(data.data)
                this.selectedData.positions[key].loader = false
              })
              .catch((e) => {
                console.log(e)
                this.selectedData.positions[key].loader = false
              })
          }, 1000)
        } else {
          this.selectedData.positions[key].loader = false
        }
      },
      fetchCatalog(string, key) {
        clearInterval(this.searchCatalog)
        this.selectedData.positions[key].loaderName = true
        if (string && string.length > 2) {
          this.searchCatalog = setTimeout(() => {
            this.fetchCatalogMarksize(
              string,
              this.selectedData.positions[key].category_okpd2.id,
            )
              .then(({data}) => {
                this.markSize = this.parseMarksize(data.data)
                this.selectedData.positions[key].loaderName = false
              })
              .catch((e) => {
                console.log(e)
                this.selectedData.positions[key].loaderName = false
              })
          }, 1000)
        } else {
          this.selectedData.positions[key].loaderName = false
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .new-positions-fields {
    position: relative;
    background: #F4F4F4;
    border-radius: 6px;
    padding: 24px 24px 0;
    margin-bottom: 20px;
  }

  .remove-btn {
    position: absolute;
    top: 10px;
    right: 0;
  }
</style>
