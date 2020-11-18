<template>
  <div class="quotes__latest">
    <template v-if="!loadingLatestQuotes">
      <div class="quotes__spot text-right">
        <span>{{ latestQuote.date }}</span>
        {{ latestQuote[currency] }}
        <i :class="latestQuote[`${currency}_diff`]" class="difference">
          <i :class="latestQuote[`${currency}_diff`] === 'inc' ? 'icon-up-open' : 'icon-down-open'"></i>
          {{ latestQuote[`${currency}_diff`] === 'inc' ? '+' : '-' }} {{ latestQuote[`${currency}_percent`] }}%
        </i>
      </div>
      <ul class="quotes__list">
        <li class="quotes__list-title">За последние 10 дней</li>
        <li
          v-for="(quote, index) in latestQuotes.slice(0, 10)"
          :class="index === 0 && 'quotes__list-last'"
          :key="index"
        >
          <span>{{ quote.date }}</span>
          <span>{{ quote[currency] }}</span>
          <i class="difference" :class="quote[`${currency}_diff`]">
            {{ quote[`${currency}_diff`] === 'inc' ? '+' : '-' }} {{ quote[`${currency}_percent`] }}%
          </i>
        </li>
      </ul>
    </template>
    <div v-if="loadingLatestQuotes" class="quotes__loader">
      <div class="filter__loader">
        <div class="preloader">
          <div class="preloader__preloader">
            <div class="preloader__loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotesList',
  props: {
    loadingLatestQuotes: {
      default: false,
      type: Boolean
    },
    latestQuotes: {
      default: null,
      type: Array
    },
    latestQuote: {
      default: null,
      type: Object
    },
    currency: {
      default: '',
      type: String
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/variables/fluid-variables";
  @import "../../assets/sass/variables/variables";
  @import "../../assets/sass/mixins/fluid-mixin";

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .quotes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .difference {
      font-style: normal;
      color: $colorGray;
      font-size: rem(13px);
      font-weight: 400;
      min-width: rem(32px);
      text-align: right;

      &.inc {
        color: $colorTurquoise;
      }

      &.dec {
        color: $colorCrimson;
      }

      &.not {
        opacity: 0;
      }
    }

    &__list {
      border: 1px solid $colorTurquoise;
      padding: rem(24px) rem(18px);
      border-radius: 6px;
      font-size: rem(14px);

      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: rem(24px);
        &:last-child {
          margin-bottom: 0;
        }
      }

      &-title {
        color: $colorGray;
        font-weight: 500;
        margin-bottom: 1.5rem;
      }

      &-last {
        font-weight: 500;
      }
    }

    &__loader {
      height: 400px;
      position: relative;
    }

    &__spot {
      margin-bottom: 2rem;
      font-size: rem(24px);
      font-weight: 700;

      span {
        font-style: normal;
        color: $colorGray;
        font-size: rem(14px);
        font-weight: 400;
        display: block;
      }
    }

    &__latest {
      width: 20rem;
      @media(max-width: 768px) {
        width: 100%;
        max-width: 22rem;
        margin-left: auto;
      }

      .quotes__spot {
        text-align: right;
        margin-bottom: 2rem;
      }
    }
  }
</style>
