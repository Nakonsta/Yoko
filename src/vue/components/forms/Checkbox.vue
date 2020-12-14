<template>
  <ValidationProvider
      tag="div"
      :rules="rules"
      :class="className"
      :name="$attrs.label[0].item"
      v-slot="{ errors, failed }"
  >
    <label v-for="(item, key) in $attrs.label" class="checkbox" :class="{error: failed}">
      <input type="checkbox" :true-value="1" :false-value="0" :class="{error: failed}" :value=key+1 :disabled="disabled" @change="change" :name="name" v-model="innerValue">
      <span v-if="withIcon" class="checkbox__img">
        <svg class="sprite-customer">
          <use xmlns\:xlink="http://www.w3.org/1999/xlink" :xlink\:href=item.icon></use>
        </svg>
      </span>
      <span class="checkbox__body" :class="{error: failed}"></span>
      <span class="checkbox__text">{{ item.label }}</span>
      <tooltip v-if="!!content" :content="content" />
    </label>
  </ValidationProvider>
</template>

<script>
import Tooltip from '../tooltip'

export default {
  name: 'Checkbox',
  components: {
    Tooltip
  },
  props: {
    className: {
      type: [Object, String],
      default: 'field__container'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    withIcon: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    change: {
      type: Function,
      default: () => {}
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
