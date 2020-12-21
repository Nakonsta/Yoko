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
      <textarea
          :class="{field: true, error: failed}"
          v-model="innerValue"
          :rows="rows"
          :disabled="disabled"
          @input="input"
          :placeholder="placeholder"
          @keydown="countSymbols($event)"
      ></textarea>
      <tooltip v-if="!!content" :content="content" />
      <span class="field__counter" v-if="counter !== false">{{ length }}/{{ counter }}</span>
    </div>
    <span v-if="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import Tooltip from "../tooltip";

export default {
  name: 'Textarea',
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
    rows: {
      type: Number,
      default: 3
    },
    parentClass: {
      type: String,
      default: 'field__container'
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
    input: {
      type: Function,
      default: () => {}
    },
    validationName: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: 'required'
    },
    value: {
      type: null
    },
    counter: {
      default: false
    }
  },
  data: () => ({
    innerValue: '',
    length: 0,
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
      this.length = newVal.length;
    },
    value (newVal) {
      this.innerValue = newVal;
      this.length = this.innerValue.length;
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value;
      this.length = this.innerValue.length;
    }
  },
  methods: {
    countSymbols: function(evt) {
      if( this.counter === false ) return;
      if ( evt.target.value.length >= this.counter ) {
        evt.target.value = evt.target.value.substring(0,max);
        if (evt.keyCode >= 48 && evt.keyCode <= 90) {
          evt.preventDefault();
        }
      }
    }
  }
};
</script>

<style lang="scss">
  .input__container {
    .field__counter {
      position: absolute;
      right: 10px;
      bottom: 7px;
    }
  }
</style>

