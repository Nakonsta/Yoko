<template>
  <ValidationProvider
      tag="div"
      :rules="rules"
      class="field__container"
      v-slot="{ errors, failed }"
  >
    <span v-if="title" class="field__label field__label--radio">{{ title }}</span>
    <label v-for="item in $attrs.label" class="radio" :class="{error: failed}">
      <input type="radio" :true-value="1" :false-value="0" :name="item.name" :disabled="disabled" :value="item.id" v-model="innerValue"/>
      <span class="radio__body" :class="{error: failed}"></span>
      <span class="radio__text">{{ item.name }}</span>
    </label>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      default: function () {
        return { required:false }
      }
    },
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: ''
  }),
  watch: {
    innerValue (newVal) {
      this.$emit('input', newVal);
    },
    value (newVal) {
      this.innerValue = newVal;
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>
