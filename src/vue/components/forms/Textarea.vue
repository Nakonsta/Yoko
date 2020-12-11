<template>
  <ValidationProvider
      :tag="tag"
      :rules="rules"
      class="input__container"
      :class="parentClass"
      v-slot="{ errors, failed }"
      :name="$attrs.label && $attrs.label.toLowerCase()"
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
      ></textarea>
      <tooltip v-if="!!content" :content="content" />
    </div>
    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
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
