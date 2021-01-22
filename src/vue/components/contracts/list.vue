<template>
  <div class="contracts__items">
    <div
      v-if="isFirstLoad && !items.length && !loading"
      class="contracts__item contracts__item--empty item item--empty"
    >
      По вашему запросу ничего не найдено
    </div>
    <div
      v-if="!items.length && loading"
      class="contracts__item contracts__item--loading item item--loading"
    >
      <div class="preloader">
        <div class="preloader__preloader">
          <div class="preloader__loader" />
        </div>
      </div>
    </div>
    <template v-if="isFirstLoad && items.length">
      <div
        v-for="item in items"
        :key="item.id"
        class="contracts__item item"
      >
        <div class="contracts__item-head">
          <div class="contracts__item-title">
            <a
              :href="`/personal/contracts/${item.id}`"
            >№{{ item.participation_application.procedure.id }}</a>
          </div>
          <div class="contracts__item-status">
            {{ getStatusName(item) }}
          </div>
          <div class="contracts__item-btns">
            <a
              href="javascript:{}"
              title="Распечатать"
              @click="printPage(`/personal/contracts/${item.id}/`)"
            ><svg class="sprite-print"><use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="\./img/sprite.svg#print"
            /></svg></a>
          </div>
        </div>
        <div class="contracts__item-line">
          <dl class="short">
            <dt>Номер договора</dt>
            <dd>{{ item.id }}</dd>
          </dl>
          <dl class="short">
            <dt>Тип процедуры</dt>
            <dd>
              {{
                // eslint-disable-next-line max-len
                getTradingFormat(item.participation_application.procedure.tender_trading_format)
              }}:
              {{ getTradingType(item.participation_application.procedure.tender_trading_type) }}
            </dd>
          </dl>
          <dl class="long">
            <dt>Заказчик</dt>
            <dd
              v-if="item.participation_application &&
                item.participation_application.procedure &&
                item.participation_application.procedure.company &&
                item.participation_application.procedure.company.name"
            >
              {{ item.participation_application.procedure.company.name }}
            </dd>
          </dl>
        </div>
        <div class="contracts__item-line">
          <dl
            v-if="item.participation_application.procedure.purchase_subject
              && item.participation_application.procedure.purchase_subject.start_price"
          >
            <dt>Начальная цена:</dt>
            <dd class="price">
              {{
                // eslint-disable-next-line max-len
                formatPriceWithCurrency(item.participation_application.procedure.purchase_subject.start_price,
                                        item.participation_application.procedure.purchase_currency)
              }}
            </dd>
          </dl>
          <dl>
            <dt>Цена договора:</dt>
            <dd class="price">
              {{
                // eslint-disable-next-line max-len
                formatPriceWithCurrency(item.price, item.participation_application.procedure.purchase_currency)
              }}
            </dd>
          </dl>
        </div>
        <div class="contracts__item-line">
          <dl>
            <dt>Заключение договора:</dt>
            <dd>
              <template v-if="item.conclusion_date">
                {{ formatDateNoTime(item.conclusion_date) }}
              </template>
              <template v-else>
                &mdash;
              </template>
            </dd>
          </dl>
          <dl>
            <dt>Исполнение договора:</dt>
            <dd>
              <template v-if="item.execution_date">
                {{ formatDateNoTime(item.execution_date) }}
                &mdash;
                {{ formatDateNoTime(calcDate(item.execution_date, 30, 'days')) }}
              </template>
              <template v-else>
                &mdash;
              </template>
            </dd>
          </dl>
          <dl>
            <dt>Дата размещения:</dt>
            <dd>{{ formatDateNoTime(item.created_at) }}</dd>
          </dl>
          <dl>
            <dt>Дата обновления:</dt>
            <dd>{{ formatDateNoTime(item.updated_at) }}</dd>
          </dl>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import functions from '@/helpers/functions';
import formatDate from '@/helpers/formatDate';

export default {
  name: 'ContractsList',
  mixins: [functions, formatDate],
  props: {
    isFirstLoad: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    items: {
      default: () => [],
      type: Array,
    },
    itemsStatuses: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    getStatusName(item) {
      const status = this.itemsStatuses.find(
        (status) => status.id === item.status,
      );
      if (status) {
        return status.name;
      }
      return item.status;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/variables/fluid-variables";
@import "../../../assets/sass/variables/variables";
@import "../../../assets/sass/mixins/fluid-mixin";
@import "../../../assets/sass/mixins/mq";

.contracts {
  &__item {
    &-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-title {
      margin-right: auto;
      font-weight: 500;
      font-size: rem(18px);

      a {
        color: $colorText;

        &:hover {
          color: $colorTurquoiseHover;
        }
      }
    }
    &-status {
      margin-left: auto;
    }
    &-btns {
      display: flex;
      justify-content: flex-start;
      margin-left: rem(24px);
      a {
        display: block;
        width: 20px;
        height: 20px;

        + a {
          margin-left: 12px;
        }

        &:hover {
          svg {
            fill: $colorTurquoiseHover;
          }
        }

        &.active {
          svg.sprite-hide,
          svg.sprite-favorite {
            fill: $colorTurquoise;
          }

          &:hover {
            svg.sprite-hide,
            svg.sprite-favorite {
              fill: $colorTurquoiseHover;
            }
          }
        }

        svg {
          display: block;
          width: 20px;
          height: 20px;
          fill: $colorGray;
          transition: fill $animation;

          &.sprite-print,
          &.sprite-paperclip,
          &.sprite-message {
            fill: $colorTurquoise;
          }
        }
      }
    }
    &-line {
      display: flex;
      flex-wrap: wrap;
      margin: 0 0 0 rem(-24px);
    }
    dl {
      margin: rem(24px) 0 0 rem(24px);
      width: calc(25% - #{rem(24px)});
      font-size: rem(14px);
      line-height: (20/14);

      @include mq($until: widescreen) {
        width: calc(33.33% - #{rem(24px)});
      }
      @include mq($until: tablet) {
        width: calc(50% - #{rem(24px)});
      }
      @include mq($until: 600px) {
        width: calc(100% - #{rem(24px)});
      }

      &.short {
        @include mq($until: 600px) {
          width: calc(50% - #{rem(24px)});
        }
      }

      &.long {
        width: calc(50% - #{rem(24px)});
        @include mq($until: widescreen) {
          width: calc(100% - #{rem(24px)});
        }
      }

      dt {
        color: $colorGray;
      }

      dd {
        margin: rem(3px) 0 0;
        &.price {
          font-size: rem(20px);
          line-height: 1;
        }
      }
    }
  }
}
</style>
