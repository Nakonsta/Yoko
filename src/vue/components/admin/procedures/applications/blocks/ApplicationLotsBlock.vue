<template>
  <div class="application__section">
    <application-title
      v-if="isAuction"
      title="1 часть заявки"
      font-size="20px"
      margin="0 0 16px"
    />
    <!-- <application-checkbox
            v-if="isAuction"
            style="margin-bottom: 24px;"
            :value="application.agreement"
            label='Согласие участника закупки на "поставку товара"'
            @click="$emit('on-check-agreement', $event)"
        ></application-checkbox> -->
    <application-title
      title="Сведения о лоте"
      subtitle
    />
    <div class="divider" />
    <div class="application-lots__text">
      Конкретные показатели товара:
    </div>
    <application-lots
      :lots="lots"
      :is-auction="isAuction"
      :can-replace="procedure.purchase_subject.products_analogues"
      :disabled="disabled"
      :errors="errors"
      @on-check="$emit('on-check-lot')"
    />
    <div class="application-lots__amounts">
      <div class="application-lots__amount">
        Общая стоимость без НДС:
        <span>{{ amount | numberWithSpaces }} {{ currencyType.symbol }}</span>
      </div>
      <div class="application-lots__amount">
        Общая стоимость с НДС:
        <span>{{ amountWithVat | numberWithSpaces }} {{ currencyType.symbol }}</span>
      </div>
    </div>

    <div
      v-if="!requestPrice"
      class="application__section-row"
    >
      <div class="application__section-title">
        Дополнительная информация:
      </div>
      <application-file-uploader
        label="Прикрепить документ"
        :file-name="lotsFile.name"
        :file-url="lotsFile.url"
        :disabled="disabled"
        @uploaded="$emit('on-upload', $event)"
        @remove="$emit('on-upload', {})"
      />
    </div>
    <div
      v-if="!requestPrice"
      class="divider"
    />
  </div>
</template>
<script>
import ApplicationTitle from '../ApplicationTitle.vue';
import ApplicationFileUploader from '../details/ApplicationFileUploader.vue';
import ApplicationCheckbox from '../ApplicationCheckbox.vue';
import ApplicationLots from '../details/ApplicationLots.vue';

export default {
  name: 'ApplicationLotsBlock',
  components: {
    ApplicationCheckbox,
    ApplicationFileUploader,
    ApplicationTitle,
    ApplicationLots,
  },
  filters: {
    numberWithSpaces(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
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
    isAuction: {
      type: Boolean,
    },
    requestPrice: {
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
  computed: {
    amount() {
      return parseFloat(
        this.lots.reduce((amount, lot) => {
          if (lot.checked) {
            return amount + parseFloat(lot.amount);
          }
          return amount;
        }, 0),
      )
        .toFixed(2)
        .replace('.00', '');
    },
    amountWithVat() {
      return parseFloat(
        this.lots.reduce((amountWithVat, lot) => {
          if (lot.checked) {
            return amountWithVat + parseFloat(lot.amountWithVat);
          }
          return amountWithVat;
        }, 0),
      )
        .toFixed(2)
        .replace('.00', '');
    },
    lotsFile() {
      return this.application.documents.lots?.[0] ?? {};
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application__section-row {
    margin-top: 32px;
}

.application-lots {
    &__text {
        margin-bottom: 20px;
        font-family: Roboto;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
    }

    &__amounts {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        margin-top: rem(32px);
    }

    &__amount {
        font-family: Roboto;
        font-size: rem(14px);
        color: $colorTextLight;

        margin-bottom: rem(16px);

        &:last-child {
            margin-bottom: 0;
        }

        span {
            font-weight: bold;
            font-size: rem(20px);
        }
    }
}
</style>
