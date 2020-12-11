<template>
  <ul class="accreditations__list">
    <accreditations-list-item
      v-for="accreditation in items"
      :key="accreditation.id"
      :accreditation="accreditation"
    ></accreditations-list-item>
  </ul>
</template>
<script>
import AccreditationsListItem from "./AccreditationsListItem.vue";

export default {
  name: "accreditations-list",
  components: {
    AccreditationsListItem,
  },
  props: {
    items: {
      type: [Array, Object],
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";
@import "../../../../assets/sass/mixins/mq";

.accreditations {
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
