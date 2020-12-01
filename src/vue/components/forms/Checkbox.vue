<template>
  <ValidationProvider
      tag="div"
      :rules="rules"
      :class="className"
      :name="$attrs.label[0].item"
      v-slot="{ errors, failed }"
  >
    <label v-for="(item, key) in $attrs.label" class="checkbox">
      <input type="checkbox" :class="{error: failed}" :value=key+1 :disabled="disabled" :name="name" v-model="innerValue">
      <span v-if="withIcon" class="checkbox__img">
        <svg class="sprite-customer">
          <use xmlns\:xlink="http://www.w3.org/1999/xlink" :xlink\:href=item.icon></use>
        </svg>
      </span>
      <span class="checkbox__body" :class="{error: failed}"></span>
      <span class="checkbox__text">{{ item.label }}</span>
    </label>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Checkbox',
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
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: "required:true"
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
