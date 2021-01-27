<template>
  <div class="application-product">
    <div
      v-for="header in headers"
      :key="header.value"
      class="application-product__field"
    >
      <div
        v-if="header.value !== 'country'"
        class="application-product__text"
      >
        <div
          v-if="isPriceEdit && header.value === 'price_for_one'"
          class="application-product__input"
        >
          <input
            ref="input"
            type="number"
            :value="product[header.value].replace(' ', '')"
            min="1"
            @blur="changePrice"
          >
        </div>
        <span
          v-else
          :class="{ 'price-span': header.value === 'price_for_one' }"
          @click="header.value === 'price_for_one' ? startEdit() : null"
        >
          {{ showField(header.value) }}
        </span>
        <div
          v-if="!disabled && header.value === 'name' && canReplace"
          class="application-product__replace"
          @click="$emit('on-select-replace')"
        >
          <svg>
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="\./img/sprite.svg#replace"
            />
          </svg>
        </div>
        <!-- <application-tooltip
            v-if="header.value === 'price_for_one' || header.value === 'amount_per_position'">
        </application-tooltip> -->
      </div>
      <application-country-select
        v-else
        :key="product.country.name"
        :disabled="disabled"
        :countries="countries"
        :default-value="product.country"
        @on-select="$emit('on-country-change', $event)"
      />
    </div>
  </div>
</template>
<script>
import ApplicationCountrySelect from './ApplicationCountrySelect.vue';
// import ApplicationTooltip from '../ApplicationTooltip';

export default {
  name: 'ApplicationProduct',
  components: {
    // ApplicationTooltip,
    ApplicationCountrySelect,
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
    canReplace: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isPriceEdit: false,
    };
  },
  computed: {
    showField() {
      return (value) => {
        switch (value) {
          case 'measure':
            return this.measure;
          case 'currency':
            return this.currencyType.text;
          case 'vat':
            return `${this.product[value]}%`;
          case 'price_for_one':
            return `${this.numberWithSpaces(this.product[value].replace('.00', ''))} ${
              this.currencyType.symbol
            }`;
          case 'amount_per_position':
            return `${this.numberWithSpaces(this.product[value].replace('.00', ''))} ${
              this.currencyType.symbol
            }`;
          default:
            return this.product[value];
        }
      };
    },
    currencyType() {
      switch (this.product.currency) {
        case 'rub':
          return { text: 'Рубль', symbol: '₽' };
        case 'eur':
          return { text: 'Евро', symbol: '€' };
        case 'usd':
          return { text: 'Доллар', symbol: '$' };
        default:
          return { text: 'Рубль', symbol: '₽' };
      }
    },
    measure() {
      if (this.product.measure === 'km') {
        return 'км';
      } if (this.product.measure === 'm') {
        return 'м';
      }
      return this.product.measure;
    },
  },
  methods: {
    numberWithSpaces(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    startEdit() {
      this.isPriceEdit = true;
      setTimeout(() => {
        this.$refs.input[0].focus();
      }, 1);
    },
    changePrice(event) {
      this.isPriceEdit = false;
      this.$emit('on-price-change', event.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-product {
    display: table-row-group;

    &__field {
        display: table-cell;
        padding: rem(25px) 0;
        border-bottom: 1px solid $colorBdr;
    }

    &__text {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        padding-right: rem(12px);

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: $colorTextLight;
        white-space: nowrap;

        .application-tooltip {
            margin-left: auto;
        }

        .price-span {
            padding: 4px;
            cursor: pointer;
            transition: 0.3s;
            border-radius: 8px;

            &:hover {
                background-color: lighten($colorGray, 30%);
            }
        }
    }

    &__input {
        width: auto;

        input {
            display: block;
            padding: 6px;
            width: auto;
            padding: 0;
            margin: 0;
            border: 1px solid $colorBdr;
            border-radius: 4px;
            outline: none;
        }
    }

    &__replace {
        width: 20px;
        height: 20px;
        margin-left: auto;
        cursor: pointer;

        svg {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
