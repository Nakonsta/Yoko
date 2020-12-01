<template>
  <ValidationProvider
      :tag="tag"
      :rules="rules"
      class="field__container"
      v-slot="{ errors, failed }"
      :name="$attrs.label && $attrs.label.toLowerCase()"
      :vid="vid"
  >
    <span v-if="$attrs.label" class="field__label">{{ $attrs.label }}</span>
    <input
        :class="{field: true, error: failed}"
        v-mask="mask || noMask"
        :type="type"
        v-model="innerValue"
        :disabled="disabled"
    >
    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Input',
  props: {
    tag: {
      type: String,
      default: 'label'
    },
    mask: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    vid: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    rules: {
      type: [Object, String],
      default: 'required'
    },
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: '',
    noMask: {
      mask: '*'.repeat(255),
      tokens: {
        '*': { pattern: /./ }
      }
    }
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
