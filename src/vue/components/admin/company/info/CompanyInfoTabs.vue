<template>
  <div 
    v-if="companies.length"
    class="tabs tabs--line" 
  >
    <ul>
      <li 
        v-for="company in companies" 
        :key="company.id" 
        :class="{ 
          active: company.inn === inner.inn 
        }"
      >
        <a @click="changeCompany($event, company)">
          {{ company.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CompanyInfoTabs',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    companies: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    inner: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    changeCompany(event, company) {
      event.preventDefault();
      this.inner = company;
    },
  }
}
</script>