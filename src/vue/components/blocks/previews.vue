<template>
  <div>
    <div v-if="value" class="preview-block__item">
      <div class="preview-block__key">{{ label }}</div>
      <div class="preview-block__value">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Previews',
  props: {
    value: {
      default: null,
      type: [String, Number],
    },
    label: {
      default: null,
      type: String,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/variables/variables";
@import "../../../assets/sass/variables/fluid-variables";
@import "../../../assets/sass/mixins/fluid-mixin";
@import '../../../assets/sass/mixins/mq';

.preview-block {
  &__item {
    display: flex;
    align-items: center;
    margin-top: rem(20px);
    margin-bottom: rem(20px);
  }

  &__key {
    font-weight: 500;
    width: 55%;
    @include mq($from: tablet) {
      min-width: 330px;
      width: 30%;
    }
  }

  &__value {
    font-weight: 400;
    width: 45%;
    @include mq($from: tablet) {
      width: 70%;
    }
  }
}
</style>
