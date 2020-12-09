<template>
  <div class="accreditations__sort" @click="changeSortType">
    <img src="/src/assets/img/svg-templates/sort.svg" alt="" />
  </div>
</template>
<script>
export default {
  name: "accreditations-sort",
  data() {
    return {
      orderDir: "DESC",
    };
  },
  methods: {
    changeSortType() {
      this.orderDir = this.orderDir === "DESC" ? "ASC" : "DESC";

      this.$emit("on-sort", this.orderDir);
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
  &__sort {
    width: 20px;
    height: 20px;
    margin-right: rem(25px);
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      filter: brightness(0.85);
    }
  }
}
</style>
