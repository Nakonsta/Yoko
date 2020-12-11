<template>
  <ValidationProvider
      tag="div"
      :rules="rules"
      class="field__container"
      :name="$attrs.label && $attrs.label.toLowerCase()"
      v-slot="{ errors, failed, validate }"
  >
    <label v-if="$attrs.label" class="field__label">{{ $attrs.label }}</label>
    <v-date-picker
        v-model="range"
        mode="date"
        is-range
        locale="ru"
        class="date-picker"
        :min-date='minDate'
        :popover="{ visibility: 'click' }"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input
            type="text"
            :placeholder="placeholder"
            :class="{field: true, error: failed}"
            :value="inputValue.start !== null ? `${inputValue.start} - ${inputValue.end}` : ''"
            v-on="inputEvents.start"
            :disabled="disabled"
            @blur="() => validateField(validate)"
        />
        <span slot="afterDateInput" class="icon-calendar-outlilne"></span>
      </template>
    </v-date-picker>
    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>

export default {
  name: 'DateTime',
  props: {
    mode: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: ''
    },
    minDate: {
      type: Date,
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
    }
  },
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
      disableDates: [
        { weekdays: [1, 7] },
        new Date(2021, 2, 8),
        new Date(2021, 1, 23),
        {
          start: new Date(2021, 0, 1),
          end:  new Date(2021, 0, 9)
        },
      ],
      innerValue: '',
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
  methods: {
    validateField(validate) {
      setTimeout(() =>validate(), 100)
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/sass/variables/fluid-variables";
@import "../../../assets/sass/variables/variables";
@import "../../../assets/sass/mixins/fluid-mixin";

.date-picker {
  position: relative;
  display: block;
}

</style>
