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
            :options="lists.quantity"
        ></select-input>
      </div>
      <div class="col col-md-4 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            v-model="dataForm.section"
            label="Сечение, мм²"
            placeholder="Выберите из списка"
            :options="lists.section"
        ></select-input>
      </div>
      <div class="col col-md-4 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            v-model="dataForm.voltage"
            label="Напряжение, кВ"
            placeholder="Выберите из списка"
            :options="lists.voltage"
        ></select-input>
      </div>
      <div class="col col-xs-12">
        <a href="#" class="link link--success">Применить</a>
        <a href="#" class="link link--info">Сбросить</a>
      </div>
    </div>
    <div class="mark-catalog__item-body filter-body">
      <div v-for="item in root.markoSize" :key="item.id" class="mark-catalog__product">
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
  props: {
    lists: {
      default: null,
      type: Object,
    },
    dataForm: {
      default: null,
      type: Object,
    },
    root: {
      default: null,
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>
