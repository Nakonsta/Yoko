<template>
    <ul class="products__list">
        <catalog-list-item
            v-for="item in items"
            :key="item.id"
            :position="item"            
        ></catalog-list-item>
    </ul>
</template>
<script>
import CatalogListItem from './CatalogListItem.vue'

export default {
  name: 'catalogs-list',
  components: {
    CatalogListItem
  },
  props: {
    items: {
      type: Array,
      required: true
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.products {
    &__list {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        list-style: none;
        margin: 0;
        margin-top: rem(20px);
        padding: 0;
    }
}
</style>
