<template>
  <div id="marksize-mark filter">
    <div class="row filter-header">
      <div class="col col-md-4 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            v-model="dataForm.quantity"
            label="Количество жил, шт"
            placeholder="Выберите из списка"
            :options="veinsCountList"
        ></select-input>
      </div>
      <div class="col col-md-4 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            v-model="dataForm.section"
            label="Сечение, мм²"
            placeholder="Выберите из списка"
            :options="sectionList"
        ></select-input>
      </div>
      <div class="col col-md-4 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            v-model="dataForm.voltage"
            label="Напряжение, кВ"
            placeholder="Выберите из списка"
            :options="voltageList"
        ></select-input>
      </div>
      <div class="col col-xs-12">
        <a href="#" class="link link--success" @click="changeFilter">Применить</a>
        <a href="#" class="link link--info" @click="resetFilter">Сбросить</a>
      </div>
    </div>
    <div class="mark-catalog__item-body filter-body">
      <div v-for="item in items" :key="item.id" class="mark-catalog__product">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import SelectInput from '../../forms/Select.vue'

export default {
  name: "MarkSizeMark",
  components: {
    SelectInput
  },
  data: () => ({
    dataForm: {
      quantity: null,
      section: null,
      voltage: null
    },
    items: [],
    veinsCountList: [],
    sectionList: [],
    voltageList: []
  }),
  props: {
    lists: {
      default: null,
      type: Object,
    },
    root: {
      default: null,
      type: Object,
    }
  },
  watch: {
    root() {
      this.initSelectorsValues();
    }
  },
  mounted() {
    this.initSelectorsValues();
  },
  methods: {
    changeFilter(evt) {
      evt.preventDefault();
      if (this.dataForm.quantity) {
        this.items = this.root.markoSize.filter((item) => item.property_veins_count &&
          item.property_veins_count.includes(this.dataForm.quantity.name));
      }
      if (this.dataForm.section) {
        this.items = this.root.markoSize.filter((item) => item.property_section &&
          item.property_section.includes(this.dataForm.section.name));
      }
      if (this.dataForm.voltage) {
        this.items = this.root.markoSize.filter((item) => item.property_voltage &&
          item.property_voltage.includes(this.dataForm.voltage.name));
      }
    },
    resetFilter(evt) {
      evt.preventDefault()
      this.dataForm = {
        quantity: null,
        section: null,
        voltage: null,
      }
      this.items = this.root.markoSize;
    },
    initSelectorsValues() {
      if (!this.root || !this.root.markoSize) return;
      this.items = this.root.markoSize;
      let veinsCounts = [];
      let sections = [];
      let voltages = [];
      this.root.markoSize.map((item, idx) => {
        if (item.property_veins_count) {
          veinsCounts = item.property_veins_count.map((item) => {
            return {
              id: idx,
              name: item
            }
          });
        }
        this.veinsCountList = veinsCounts;

        if (item.property_section) {
          sections = item.property_section.map((item) => {
            return {
              id: idx,
              name: item
            }
          })
        }
        this.sectionList = sections;

        if (item.property_voltage) {
          voltages = item.property_voltage.map((item) => {
            return {
              id: idx,
              name: item
            }
          })
        }
      });
      this.voltageList = voltages;
    }
  }
}
</script>

<style scoped></style>
