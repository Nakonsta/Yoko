<template>
  <div class="accreditation-details__empty">
    <accreditations-title
      title="Такой заявки не существует"
    ></accreditations-title>
  </div>
</template>
<script>
import AccreditationsTitle from "../AccreditationsTitle.vue";
export default {
  name: "accreditation-details-empty",
  components: {
    AccreditationsTitle,
  },
};
</script>
<style lang="scss" scope>
@import "../../../../../assets/sass/variables/variables";
@import "../../../../../assets/sass/variables/fluid-variables";
@import "../../../../../assets/sass/mixins/fluid-mixin";
@import "../../../../../assets/sass/mixins/mq";

.accreditation-details {
  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: rem(40px) rem(20px);
    background-color: #fff;
    border-radius: 8px;
  }
}
</style>
