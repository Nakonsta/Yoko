<template>
  <div class="application-lots">
    <application-lot
      v-for="lot in lots"
      :key="lot.amountWithVat"
      :lot="lot"
      :is-auction="isAuction"
      :can-replace="canReplace"
      :countries="countries"
      :disabled="disabled"
      :errors="errors"
      @on-change="
        lot.checked = $event;
        $emit('on-check');
      "
      @on-country-change="changeCountry($event, lot)"
      @on-replace="replaceProduct($event, lot)"
    />
  </div>
</template>
<script>
/* eslint-disable no-param-reassign */
import api from '@/helpers/api';

import ApplicationLot from './ApplicationLot.vue';

export default {
  name: 'ApplicationLots',
  components: {
    ApplicationLot,
  },
  mixins: [api],
  props: {
    lots: {
      type: [Object, Array],
      required: true,
    },
    isAuction: {
      type: Boolean,
      required: true,
    },
    canReplace: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    errors: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      countries: [],
    };
  },
  created() {
    this.getCountries();
  },
  methods: {
    changeCountry(value, lot) {
      lot.country = value;
      lot.products.forEach((product) => {
        this.$set(product, 'country', value);
      });
    },
    replaceProduct(value, lot) {
      console.log(value);
      lot.products = lot.products.map((product) => {
        if (product.id === value.id) {
          product = value;
        }

        return product;
      });

      lot.amount = parseFloat(
        lot.products.reduce((amount, product) => (
          // eslint-disable-next-line max-len
          amount + parseFloat(parseInt(product.quantity ?? 0, 10) * parseFloat(product.price_for_one ?? 0, 10), 10)
        ), 0),
        10,
      )
        .toFixed(2)
        .replace('.00', '');

      lot.amountWithVat = parseFloat(
        // eslint-disable-next-line max-len
        lot.products.reduce((amountWithVat, product) => amountWithVat + parseFloat(product.amount_per_position, 10), 0),
        10,
      )
        .toFixed(2)
        .replace('.00', '');
    },
    getCountries() {
      this.fetchCountries().then(({ data }) => {
        this.countries = data.data;

        if (typeof this.lots?.[0]?.products?.[0]?.country === 'string') {
          this.lots.forEach((lot) => {
            lot.products.map((product) => {
              product.country = this.countries.filter(
                (country) => country.code === product.country
                  || JSON.stringify(country) === JSON.stringify(product.country),
              )[0];

              return product;
            });
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.application-lots {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
}
</style>
