<template>
  <div
    v-if="isVisible"
    class="tabs tabs--line tabs--companies"
  >
    <ul>
      <li
        v-for="company in companies"
        :key="company.id"
        :class="{
          active: company.inn === innerValue.inn
        }"
      >
        <a
          href="javascript:{}"
          @click="select($event, company)"
        >
          {{ company.shortName }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CompaniesTabs',
  props: {
    companies: {
      default: () => [],
      type: Array,
      required: true,
    },
    value: {
      default: null,
      type: Object,
      required: true,
    },
    hideWithoutOptions: {
      // прячем ли если только 1 компания
      default: false,
      type: Boolean,
    },
  },
  computed: {
    isVisible() {
      return (!this.hideWithoutOptions && this.companies.length)
      || (this.hideWithoutOptions && this.companies.length > 1);
    },
    innerValue: {
      get() {
        return this.value;
      },
      set(value) {
        if (value.inn !== this.value.inn) {
          this.$emit('change', value);
        }
      },
    },
  },
  methods: {
    select(evt, company) {
      evt.preventDefault();
      this.innerValue = company;
    },
  },
};
</script>
