<template>
  <ValidationProvider
      tag="div"
      :rules="rules"
      class="field__container"
      :name="$attrs.label && $attrs.label.toLowerCase() || validationName"
      v-slot="{ errors, failed }"
  >
    <span v-if="$attrs.label" class="field__label">{{ $attrs.label }}</span>
    <input type="hidden" v-model="innerValue">
    <datepicker
        :placeholder="placeholder"
        :monday-first=true
        :input-class="{field: true, error: failed}"
        :format="format"
        :language="locale"
        v-model="innerValue"
        @input="setDates"
        :disabled="disabled"
        :disabled-dates="{ from: disabledFrom, to: disabledTo }"
    >
      <svg class="sprite-calendar" slot="afterDateInput"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#calendar"></use></svg>
    </datepicker>
    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import moment from "moment";
import {ru} from "vuejs-datepicker/dist/locale";

export default {
  name: 'Date',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledFrom: {
      type: Date,
      default: null,
    },
    disabledTo: {
      type: Date,
      default: null,
    },
    validationName: {
      type: String,
      default: ''
    },
    disabled: {
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
    setDates: {
      type: Function,
      default: () => {},
    }
  },
  data() {
    return {
      innerValue: '',
      locale: ru,
      picker: {
        locale: ru,
        disabledFrom: moment().subtract(1, 'day').toDate(),
        disabledTo: moment().add(10, 'year').toDate(),
      },
    }
  },
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
};
</script>

<style lang="scss">
@import "../../../assets/sass/variables/fluid-variables";
@import "../../../assets/sass/variables/variables";
@import "../../../assets/sass/mixins/fluid-mixin";

.vdp-datepicker {
  position: relative;

  input {
    background: transparent;
    height: rem(40px);
    border: 1px solid $colorGray;
  }

  .icon-calendar-outlilne {
    position: absolute;
    top: rem(10px);
    right: rem(15px);
    color: $colorTurquoise;
  }
}

</style>
