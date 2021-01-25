<template>
  <div class="application-request-price">
    <application-title
      title="Новый запрос цен. Обновите стоимость позиций."
      margin="0 0 32px"
    />
    <application-lots-block
      :procedure="procedure"
      :application="application"
      :lots="localLots"
      :currency-type="currencyType"
      :request-price="true"
      :disabled="editable"
      :errors="errors"
      @on-check-lot="errors = false"
    />
    <div class="application-request-price__buttons">
      <button
        class="application-request-price__button"
        @click="sendNewPrice"
      >
        Сохранить и отправить
      </button>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-param-reassign */
import api from '@/helpers/api';
import functions from '@/helpers/functions';

import ApplicationLotsBlock from './blocks/ApplicationLotsBlock.vue';
import ApplicationTitle from './ApplicationTitle.vue';

export default {
  name: 'ApplicationRequestPrice',
  components: { ApplicationTitle, ApplicationLotsBlock },
  mixins: [api, functions],
  props: {
    application: {
      type: Object,
      required: true,
    },
    procedure: {
      type: Object,
      required: true,
    },
    currencyType: {
      type: Object,
      required: true,
    },
    lots: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
    editable: {
      type: Boolean,
    },
  },
  data() {
    return {
      localLots: [],
      errors: false,
    };
  },
  computed: {
    applicationId() {
      return this?.$route?.params?.appid ?? this?.application?.id ?? '';
    },
  },
  created() {
    if (this.lots.length) {
      this.localLots = this.lots.slice();
    }
  },
  methods: {
    sendNewPrice() {
      const data = this.createProductsObject();

      if (!data) {
        return;
      }

      if (this.applicationId) {
        window.openLoader();
        this.sendProcedureApplicationNewPrice(this.applicationId, data)
          .then(() => {
            window.notificationSuccess('Новые цены успешно отправленны');
          })
          .catch(() => {
            window.notificationError('Ошибка');
          })
          .finally(() => window.closeLoader());
      } else {
        window.notificationError('Внутренняя ошибка сайта');
      }
    },
    createProductsObject() {
      const products = [];
      this.localLots.forEach((lot) => {
        if (lot.checked) {
          lot.products.forEach((product) => {
            product.product_id = product.id;
            product.country = product?.country?.code ?? 'RU';
            product.currency = this.procedure.purchase_currency;

            products.push(product);
          });
        }
      });

      if (this.validate(products)) {
        return this.objectToFormData(products);
      }
      return null;
    },
    validate(products) {
      let hasErrors = false;
      this.errors = false;

      if (!products.length) {
        hasErrors = true;
        this.errors = true;
      }

      return !hasErrors;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/../assets/sass/variables/variables";
@import "@/../assets/sass/variables/fluid-variables";
@import "@/../assets/sass/mixins/fluid-mixin";
@import "@/../assets/sass/mixins/mq";

.application-request-price {
  background-color: #fff;
  padding: rem(48px);
  padding-top: 0;

  @include mq($until: desktop) {
    padding: 0 rem(16px) rem(40px);
  }

  .application__section {
    margin-bottom: 0;
  }

  &__buttons {
    padding-top: rem(56px);
  }

  &__button {
    width: 100%;
    max-width: 278px;
    margin-right: rem(16px);
    margin-bottom: rem(16px);
    padding: rem(13px) 0;
    background-color: $colorTurquoise;
    border-radius: 6px;
    border: 1px solid $colorTurquoise;
    transition: 0.3s;

    font-family: Roboto;
    font-weight: 500;
    font-size: rem(14px);
    color: #ffffff;

    @include mq($until: mobileLandscape) {
      margin-right: 0;
    }

    &:active,
    &:hover {
      background-color: lighten($color: $colorTurquoise, $amount: 5%);
    }

    &:disabled {
      border: 1px solid $colorGray;
      background-color: transparent;
      color: $colorGray;

      &:hover {
        background-color: lighten($color: $colorGray, $amount: 25%);
      }
    }

    &--second {
      margin: 0;
      background-color: transparent;
      color: $colorTurquoise;
      border: 1px solid $colorTurquoise;

      &:hover,
      &:active {
        background-color: transparent;
      }
    }
  }
}
</style>
