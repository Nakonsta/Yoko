<template>
  <ValidationProvider
    v-slot:default="{ errors, failed, validate }"
    tag="div"
    :rules="rules"
    :class="parentClass"
    :name="$attrs.label && $attrs.label.toLowerCase()"
  >
    <label
      v-if="$attrs.label"
      class="field__label"
    >{{ $attrs.label }}</label>
    <input
      v-model="innerValue"
      type="hidden"
    >
    <v-date-picker
      v-model="innerValue"
      is24hr
      locale="ru"
      :mode="mode"
      class="date-picker"
      :disabled-dates="useProductionCalendar ? disableDates : null"
      :available-dates="useProductionCalendar ? enabledDates : null"
      :min-date="(minDate && minDate.toString() !== 'Invalid Date') ? minDate : null"
      :popover="{ visibility: 'click' }"
    >
      <template v-slot:default="{ inputValue, inputEvents }">
        <input
          type="text"
          :placeholder="placeholder"
          :class="{field: true, error: failed}"
          :value="inputValue"
          :disabled="disabled"
          v-on="inputEvents"
          @blur="() => validateField(validate)"
        >
        <span
          slot="afterDateInput"
          class="icon-calendar-outlilne"
        />
      </template>
    </v-date-picker>
    <span
      v-if="failed"
      class="field__error"
    >{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>

export default {
  name: 'DateTime',
  props: {
    mode: {
      type: String,
      default: 'date',
    },
    parentClass: {
      type: String,
      default: 'field__container',
    },
    placeholder: {
      type: String,
      default: '',
    },
    minDate: {
      type: Date,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [Object, String],
      default: 'required',
    },
    value: {
      type: null,
    },
    useProductionCalendar: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerValue: '',
    };
  },
  computed: {
    disableDates() {
      return [
        { weekdays: [1, 7] },
        ...this.$store.state.settings.productionCalendar.disabledDates,
        {
          start: new Date(2021, 0, 1),
          end: new Date(2021, 0, 9),
        },
      ];
    },
    enabledDates() {
      return this.$store.state.settings.productionCalendar.enabledDates;
    },
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.useProductionCalendar) {
      this.$store.dispatch('loadProductionCalendar');
    }
    if (this.value) {
      this.innerValue = this.value;
    }
  },
  methods: {
    validateField(validate) {
      setTimeout(() => validate(), 100);
    },
  },
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
