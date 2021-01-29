<template>
  <procedureLots
    :procedure="tenderItemData"
    :columns="{
      name: 'Наименование',
      quantity: 'Длина',
      measure: 'Единица',
      amount_per_position: 'Сумма за позицию',
      vat: 'НДС',
      availability_of_analogues: 'Аналог',
    }"
  />
</template>

<script>
import procedureLots from '@/components/marketplace/lots';

export default {
  name: 'TenderItemLotsTab',

  components: {
    procedureLots,
  },

  mixins: [],

  props: {
    tenderItemData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
