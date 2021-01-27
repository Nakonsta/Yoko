<template>
  <div :class="classes">
    <div class="application-lot__header">
      <application-checkbox
        :value="lot.checked"
        :disabled="disabled"
        :has-error="errors"
        @click="$emit('on-change', $event)"
      />
      <div
        :class="[
          'application-lot__title',
          {
            'application-lot__title--error': errors,
            'application-lot__title--disabled': !lot.checked
          }
        ]"
        @click="toggleOpened"
      >
        <span>{{ lot.name }}</span>
        <span
          class="application-lot__amount"
        >
          {{ lot.amountWithVat.replace('.00', '') | numberWithSpaces }} {{ lot.currency.symbol }}
        </span>
        <svg>
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="/img/sprite.svg#arrow-bottom"
          />
        </svg>
      </div>
    </div>
    <div class="application-lot__content">
      <div class="application-lot__country">
        <span>Страна происхождения Лота</span>
        <application-country-select
          :countries="countries"
          :disabled="disabled"
          @on-select="$emit('on-country-change', $event)"
        />
      </div>
      <application-products
        :products="lot.products"
        :is-auction="isAuction"
        :can-replace="canReplace"
        :countries="countries"
        :disabled="disabled"
        @on-replace="$emit('on-replace', $event)"
      />
    </div>
  </div>
</template>
<script>
import ApplicationCheckbox from '../ApplicationCheckbox.vue';
import ApplicationProducts from './ApplicationProducts.vue';
import ApplicationCountrySelect from './ApplicationCountrySelect.vue';

export default {
  name: 'ApplicationLot',
  components: {
    ApplicationCountrySelect,
    ApplicationCheckbox,
    ApplicationProducts,
  },
  filters: {
    numberWithSpaces(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
  props: {
    lot: {
      type: Object,
      required: true,
    },
    isAuction: {
      type: Boolean,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
    canReplace: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    classes() {
      return ['application-lot', { 'application-lot--opened': this.isOpened }];
    },
  },
  methods: {
    toggleOpened() {
      this.isOpened = !this.isOpened;

      const element = this.$el.children[1];
      const sectionHeight = element.scrollHeight;

      if (this.isOpened) {
        element.style.overflow = 'auto';
        requestAnimationFrame(() => {
          element.style.height = `${sectionHeight}px`;
        });
      } else {
        element.style.overflow = null;
        requestAnimationFrame(() => {
          element.style.height = `${0}px`;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-lot {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    margin-bottom: rem(32px);

    &:last-child {
        margin-bottom: 0;
    }

    &--opened &__header {
        margin-bottom: rem(25px);

        svg {
            transform: rotate(0deg);
        }
    }

    &__header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
        max-width: 320px;
        transition: 0.3s;

        .application-checkbox {
            margin: 0;
        }
    }

    &__title {
        display: flex;
        align-items: center;
        width: 100%;

        cursor: pointer;
        span {
            margin-right: auto;
            transition: 0.3s;

            font-family: Roboto;
            font-weight: 700;
            font-size: rem(18px);
            color: $colorTextLight;
            white-space: nowrap;
        }

        svg {
            width: 20px;
            height: 20px;
            transform: rotate(-90deg);
            transition: 0.3s;
        }

        &--disabled {
            span {
                color: $colorGray;
            }
        }

        &--error {
            span {
                color: $colorRed;
            }
        }
    }

    &__amount {
        flex: 1;
        margin: 0 rem(24px);
    }

    &__content {
        height: 0;
        width: 100%;
        transition: height 0.3s;
        overflow: hidden;
    }

    &__country {
        margin-bottom: rem(32px);

        span {
            font-family: Roboto;
            font-weight: 500;
            font-size: rem(14px);
            color: $colorGray;
            white-space: nowrap;
        }
    }
}
</style>
