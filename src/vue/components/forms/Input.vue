<template>
  <ValidationProvider
      :tag="tag"
      :rules="rules"
      class="input__container"
      :class="parentClass"
      v-slot="{ errors, failed, failedRules }"
      :name="$attrs.label && $attrs.label.toLowerCase() || validationName"
      :vid="vid"
  >
    <span v-if="$attrs.label" class="field__label">{{ $attrs.label }}</span>
    <div class="relative">
      <input
          :class="{field: true, error: failed}"
          v-mask="mask || noMask"
          v-inputmask="inputmask"
          :type="type"
          v-model="innerValue"
          :disabled="disabled"
          @input="input"
          :placeholder="placeholder"
          :maxlength="maxlength || false"
          :max="type === 'number' && max ? max : false"
          :min="type === 'number' && min ? min : false"
          @paste="paste"
      >
      <div class="multiselect__spinner field__spinner" v-show="loading"></div>
      <tooltip v-if="!!content" :content="content" />
    </div>
    <span v-if="failed && !failedRules.excluded" class="field__error">{{ errors[0] }}</span>
    <span v-if="failed && failedRules.excluded" class="field__error">Нужно ввести уникальное значение.</span>
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
    inputmask: {
      default: false,
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
    loading: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      default: 'required'
    },
    value: {
      type: null
    },
    maxlength: {
      default: false,
      type: [Number, Boolean]
    },
    max: {
      default: 0,
      type: Number
    },
    min: {
      default: 0,
      type: Number
    },
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
  },
  methods: {
    paste: function(evt) {
      // fix Inputmask & vue past issue
      if( this.inputmask === false ) return;
      let clipboardData = evt.clipboardData || window.clipboardData,
        pastedData = clipboardData.getData('Text');
      let newValue = Inputmask.format(pastedData, {mask: this.inputmask});
      this.innerValue = newValue;
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
  .input__spinner {
    background-color: transparent !important;
  }
}
</style>
