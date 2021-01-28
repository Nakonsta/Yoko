<template>
  <table
    v-if="procedure && procedure.purchase_subject && procedure.purchase_subject.lots_number"
    class="lots"
  >
    <tbody
      v-for="(lot, index) in procedure.purchase_subject.lot_amounts"
      :key="index"
      class="lots__item"
    >
      <tr>
        <td
          :colspan="columns.length"
          class="lots__item-title"
        >
          Лот&nbsp;{{ index + 1 }}&nbsp;&nbsp;&nbsp;&nbsp; {{ formatPriceWithCurrency(lot, procedure.purchase_currency) }}
        </td>
      </tr>
      <tr class="lots__item-head">
        <template
          v-for="(column, field) in columns"
        >
          <th
            :key="field"
            class="lots__item-column"
            :class="`lots__item-column--${field}`"
          >
            {{ columns[field] }}
          </th>
        </template>
      </tr>
      <tr
        v-for="(product, key) in getLotProducts(index + 1)"
        :key="key"
        class="lots__item-product"
      >
        <template
          v-for="(column, field) in columns"
        >
          <td
            :key="field"
            class="lots__item-column"
            :class="`lots__item-column--${field}`"
            :data-name="columns[field]"
          >
            <template v-if="field === 'price_for_one' || field === 'amount_per_position'">
              {{ formatPriceWithCurrency(product[field], product.currency) }}
            </template>
            <template v-else-if="field === 'currency'">
              {{ getCurrency(product[field]).name }}
            </template>
            <template v-else-if="field === 'measure'">
              {{ getMeasure(product[field]) }}
            </template>
            <template v-else-if="field === 'vat'">
              {{ product[field] }}%
            </template>
            <template v-else-if="field === 'availability_of_analogues'">
              {{ product[field] ? 'Да' : 'Нет' }}
            </template>
            <template v-else>
              {{ product[field] }}
            </template>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
import api from '@/helpers/api';
import formatDate from '@/helpers/formatDate';
import functions from '@/helpers/functions';

export default {
  name: 'ProcedureLots',
  components: {
  },
  mixins: [api, formatDate, functions],
  props: {
    procedure: {
      default: null,
      type: Object,
      required: true,
    },
    columns: {
      default: {
        name: 'Наименование',
        quantity: 'Длина',
        measure: 'Единица',
        currency: 'Валюта',
        price_for_one: 'Стоимость за единицу',
        vat: 'НДС',
        amount_per_position: 'Сумма за позицию',
        availability_of_analogues: 'Аналог',
      },
      type: Object,
    },
  },
  data() { return {}; },
  created() {},
  methods: {
    getLotProducts(lotNumber) {
      return this.procedure.purchase_subject.products.filter((product) => product.lot == lotNumber) || [];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/sass/variables/variables";
@import "../../../assets/sass/variables/fluid-variables";
@import "../../../assets/sass/mixins/fluid-mixin";
@import "../../../assets/sass/mixins/mq";
.lots {
  font-weight: 500;
  font-size: rem(14px);
  width: 100%;
  @include mq($until: tablet) {
    display: block;
    caption,
    thead,
    tbody,
    tr,
    th,
    td,
    tfoot {
      display: block;
      width: 100%;
    }
  }
  &__item {
    & + & {
      .lots__item-title {
        padding-top: rem(24px);
      }
    }
    &-title {
      display: flex;
      font-weight: 700;
      font-size: rem(20px);
      padding-bottom: 1rem;
    }
    &-head {
      text-align: left;
      color: $colorGray;
      @include mq($until: tablet) {
        display: none !important;
      }
      th + th {
        padding-left: rem(24px);
      }
    }
    &-product {
      & + & {
        td {
          border-top: 1px solid $colorBdr;
        }
      }
      td {
        padding: rem(24px) 0;
        + td {
          padding-left: rem(24px);
        }
        @include mq($until: tablet) {
          padding: rem(8px) 0 rem(8px) rem(155px);
          position: relative;
          &::before {
            content: attr(data-name);
            width: rem(150px);
            position: absolute;
            top: rem(8px);
            left: 0;
            font-size: rem(14px);
            font-weight: 500;
            color: $colorGray;
          }
        }
        @media print {
          padding: rem(5px) 0;
        }
      }
    }
  }
}
</style>
