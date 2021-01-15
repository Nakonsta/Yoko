<template>
  <li class="products__list-item product item">
    <div class="product__info">
      <div class="product__row">
        <router-link class="product__title" :to="`positions/${position.id}`">
          Заявка №{{ position.id }}
        </router-link>
        <div class="product__status" :class="'product__status--'+position.status.id">{{ position.status.value }}</div>
      </div>
      <div class="product__row">
        <div class="product__date">
          от
          <time>{{ formatDate(position.created_at) }}</time>
        </div>
      </div>
      <div class="product__row" v-if="position.company">
        <div class="product__company">{{ position.company.name }}</div>
      </div>      
    </div>
  </li>
</template>
<script>
import formatDate from '../../../helpers/formatDate.js'

export default {
  name: 'catalog-list-item',
  props: {
    position: {
      type: Object,
      required: true
    }
  },
  mixins: [formatDate]
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.product {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  padding: rem(20px) rem(16px);
  @media(min-width: 560px){
    padding: rem(20px) rem(32px);
  }

  &__info {
    width: 100%;
  }

  &__title {
    font-family: Roboto;
    font-weight: 500;
    font-size: rem(16px);
    color: $colorTextLight;
    margin-right: rem(30px);
    &:hover {
      color: $colorTurquoise;
    }
  }

  &__date {
    font-family: Roboto;
    font-weight: 400;
    margin-right: rem(30px);
    font-size: rem(14px);
    color: $colorGray;
  }
  &__status{
    font-weight: 500;
    font-size: rem(16px);
    &--new{
      color: $colorTurquoise;      
    }
    &--approved{
      color: $colorTextLight;
    }
    &--rejected{
      color: $colorCrimson;
    }
  }
  &__document {
    color: $colorTurquoise;
    font-weight: 400;
    font-size: rem(14px);
  }
  
  &__company {
    color: $colorTurquoise;
    font-weight: 500;
    font-size: rem(14px);
    margin-right: rem(30px);
  }

  &__row{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    margin: rem(8px) 0;
  }

  &__svg{
    fill: $colorTurquoise;
    color: $colorTurquoise;
  }
}
</style>
