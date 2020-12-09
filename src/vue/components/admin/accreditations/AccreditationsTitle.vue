<template>
  <div class="accreditations-title" :style="styles">
    <slot>
      {{ title }}
    </slot>
  </div>
</template>
<script>
export default {
  name: "accreditations-title",
  props: {
    title: {
      type: String,
      required: true,
    },
    margin: {
      type: String,
    },
    padding: {
      type: String,
    },
  },
  computed: {
    styles() {
      return { padding: this.padding, margin: this.margin };
    },
  },
};
</script>
<style lang="scss">
@import "../../../../assets/sass/variables/variables";

.accreditations-title {
  font-family: $fontGilroy, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  font-size: 38px;
  letter-spacing: 0.02em;
  color: #2c2c2c;
}
</style>
