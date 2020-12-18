<template>
  <ValidationProvider
      :tag="tag"
      :rules="rules"
      class="input__container"
      :class="parentClass"
      v-slot="{ errors, failed }"
      :name="$attrs.label && $attrs.label.toLowerCase() || validationName"
      :vid="vid"
  >
    <span v-if="$attrs.label" class="field__label">{{ $attrs.label }}</span>
    <div class="relative">
      <input
          :class="{field: true, error: failed}"
          v-mask="mask || noMask"
          :type="type"
          v-model="innerValue"
          :disabled="disabled"
          @input="input"
          :placeholder="placeholder"
      >
      <tooltip v-if="!!content" :content="content" />
    </div>
    <span v-if="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import Tooltip from "../tooltip";

export default {
  name: 'Input',
  components: {
    Tooltip
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'label'
    },
    parentClass: {
      type: String,
      default: 'field__container'
    },
    mask: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    vid: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    validationName: {
      type: String,
      default: ''
    },
    input: {
      type: Function,
      default: () => {}
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

<style lang="scss">
.input__container {
  .tooltip {
    position: absolute;
    right: 15px;
    top: 13px;
    z-index: 10;
  }
}
</style>
