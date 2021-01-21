<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <div class="hide-block" @click="">
      <tooltip class-main="tooltip tooltip--right" content="Скрыть блок"></tooltip>
    </div>
    <h3 class="procedure__main-title">Предмет закупки</h3>
    <div class="row field__container">
      <div class="col mb1">
        <a href="/content/template-procedure.xlsx" class="btn btn--bdr" :disabled="isCreatedProcedure">
          Скачать шаблон
        </a>
      </div>
      <div class="col mb1">
        <button class="btn fileType">
          <input type="file" accept=".xls, .xlsx" class="btn" @change="importProcedure" :disabled="isCreatedProcedure">
          Загрузить шаблон
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col col-xs-12">
        <textarea-input
            :maxlength=1000
            v-model="selectedData.item_description"
            label="Описание предмета закупки"
            :rules="{required: true, max: 1000 }"
            :disabled="isCreatedProcedure"
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
            :select="changeLotsCount"
        ></select-input>
      </div>
      <div v-if="selectedData.count_lots && selectedData.count_lots.id === 0" class="col col-md-4 col-sm-6 col-xs-12">
        <checkbox-input
            class-name="mt3"
            name="purchase_positional"
            :disabled="isCreatedProcedure"
            v-model="selectedData.purchase_positional"
            :label="[{label: 'Попозиционная закупка'}]"
        ></checkbox-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
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
      <svg class="sprite-field-add">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use>
      </svg>
      Добавить позицию
    </a>
    <div v-if="selectedData.count_lots && selectedData.count_lots.id !== 0" class="row">
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
import TextInput from '@/components/forms/Input.vue'
import SelectInput from '@/components/forms/Select.vue'
import CheckboxInput from '@/components/forms/Checkbox.vue'
import TextareaInput from '@/components/forms/Textarea.vue'
import PositionType from './PositionType.vue'
import Tooltip from "@/components/tooltip"
import parsers from "@/helpers/parsers";
import api from '@/helpers/api'
import XLSX from 'xlsx/xlsx';

export default {
  name: 'PurchaseSubject',
  components: {
    Tooltip,
    TextInput,
    SelectInput,
    CheckboxInput,
    TextareaInput,
    appPositionType: PositionType,
  },
  mixins: [api, parsers],
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
      default: () => {
      },
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
      default: () => {
      },
      type: Function,
    },
    changeLotsCount: {
      default: () => {
      },
      type: Function,
    },
    selectsValidation: {
      default: () => {
      },
      type: Function,
    },
    createNewPositionFieldset: {
      default: () => {
      },
      type: Function,
    },
    textValidation: {
      default: () => {
      },
      type: Function,
    },
    numValidation: {
      default: null,
      type: Array,
    },
  },
  data() {
    return {
      metatypes: [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ],
      numDecValidation: [
        (v) =>
            /^\d{1,9}(\.\d{1,2})?$/.test(v) ||
            'Вводите только цифровые значения',
      ],
    }
  },
  methods: {
    importProcedure(evt) {
      const getFile = evt.target.files[0];
      if (!this.metatypes.length || this.metatypes.indexOf(getFile.type) !== -1) {
        this.checkFile(getFile)
      } else {
        window.notificationError(
          'Вы пытаетесь загрузить файл неверного формата. Разрешенные форматы xls, xlsx'
        )
      }
    },
    checkFile(file) {
      window.openLoader();
      const reader = new FileReader();
      FileReader.onerror = () => {
        window.notificationError('Ошибка импорта из файла');
        window.closeLoader();
      };
      reader.onload = (e) => {
        let count = 0;
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, {header: 1}); // get array
        data.splice(0, 1);
        const result = data.filter(e => e.length);
        if (result.length < 2) {
          window.closeLoader();
          return;
        }
        const fields = [
          'type', 'category_okpd', 'names', 'quantity', 'measures', 'price_for_one', 'vats', 'addLot'
        ];
        console.log(fields);
        if (result.length) {
          this.selectedData.positions = [];
          const getLot = [];
          result.map((item) => {
            getLot.push(item[7])
          });
          getLot.sort((a, b) => a - b)
          const max = getLot[getLot.length - 1]
          const lots = this.counterToTenSelect.find(x => x.id === max);
          this.selectedData.count_lots = lots;
          for (let i = 1; i < this.selectedData.count_lots.id + 1; i++) {
            this.procedureIdData.lotsCounter.push({id: i, name: i})
          }
          result.map((item, index) => {
            const vat = this.fieldsData.positionVAT.find(x => x.id === Number(item[6] * 100))
            const type = this.fieldsData.positionType.find(x => x.name === item[0])
            const lot = this.procedureIdData.lotsCounter.find(x => x.id === item[7])
            this.selectedData.positions.push({
              id: index,
              names: null,
              code: null,
              type,
              category_okpd: null,
              measures: null,
              marksize_id: null,
              addLot: lot,
              quantity: item[3] || 0,
              price_for_one: item[5] || 0,
              vats: vat,
              total_price: item[5] * item[3],
              loader: false,
              loaderName: false,
            })
            if (item[1]) {
              this.searchProceduresOKPD2(item[1].replace(/[^.0-9]/gim,''))
                  .then((response) => {
                    const result = response.data.data;
                    this.fieldsData.OKPD2 = this.parseOKPD2(result)
                    const category_okpd = this.fieldsData.OKPD2.find(x => x.name.indexOf(item[1]) === -1)
                    const measure = category_okpd.code.startsWith('27.32')
                        ? this.fieldsData.positionLongUnits.find(x => x.name === item[4])
                        : this.fieldsData.positionUnits.find(x => x.name === item[4])
                    this.selectedData.positions[index].category_okpd = category_okpd
                    this.selectedData.positions[index].code = category_okpd.code
                    this.selectedData.positions[index].measures = measure
                  })
                  .catch(() => {
                    count++;
                    if (result.length === count) {
                      window.closeLoader();
                    }
                  })
            } else {
              count++;
              if (result.length === count) {
                window.closeLoader();
              }
            }
            if (item[2]) {
              this.fetchCatalogMarksize(item[2])
                  .then((res) => {
                    this.fieldsData.markSize[index] = this.parseMarkSize(res.data.data)
                    const name = this.fieldsData.markSize[index].find(x => x.name === item[2])
                    this.selectedData.positions[index].names = name
                    this.selectedData.positions[index].marksize_id = name.id
                    count++
                    if (result.length === count) {
                      window.closeLoader();
                    }
                  })
                  .catch(() => {
                    count++;
                    if (result.length === count) {
                      window.closeLoader();
                    }
                  })
            } else {
              count++;
              if (result.length === count) {
                window.closeLoader();
              }
            }
          })
        }
      };
      reader.readAsBinaryString(file);
    }
  }
}
</script>

<style lang="scss">
  .fileType {
    position: relative;
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 9;
    }
  }
</style>
