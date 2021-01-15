<template>
  <div>
    <CompanyTabs
      :value="currentCompany"
      :companies="companies"
      @input="changeCompany"
    />
    <div class="company-users__panel">
      <CompanyUsersBlock
        title="Административные права"
        :users="adminRoles"
      />
      <CompanyUsersBlock
        title="Пользовательские права"
        :users="userRoles"
      />
      <CompanyUsersBlock
        title="Комиссия"
        :users="comissionRoles"
      />
    </div>
  </div>
</template>

<script>
import api from '@/helpers/api';

import CompanyTabs from '@/components/admin/company/common/CompanyTabs';
import CompanyUsersBlock from '@/components/admin/company/users/CompanyUsersBlock';

export default {
  name: 'CompanyUsers',
  components: {
    CompanyTabs,
    CompanyUsersBlock,
  },
  mixins: [api],
  data: () => ({
    currentCompany: {},
    users: [],
  }),
  computed: {
    companies() {
      const {
        userRole,
        companyBuyer,
        companyContractor,
      } = this.$store.getters;

      switch (userRole) {
        case 'buyer': return companyBuyer;
        case 'contractor': return companyContractor;
        default: return [];
      }
    },
    userRoles() {
      return this.users.filter((user) => user.role === 'USER');
    },
    adminRoles() {
      return this.users.filter((user) => user.role === 'ADMIN');
    },
    comissionRoles() {
      return this.users.filter((user) => user.role === 'COMISSION');
    },
  },
  created() {
    if (this.companies && this.companies.length) {
      this.currentCompany = this.companies[0];
      this.fetchUsers();
    }
  },
  methods: {
    fetchUsers() {
      if (!this.currentCompany) return;

      this.fetchUsersFromCompany(this.currentCompany.id)
        .then(({ data }) => this.users = data.data)
        .catch((error) => console.error(error));
    },
    changeCompany(company) {
      this.currentCompany = company;
      this.fetchUsers();
    },
  },
};
</script>

<style lang="scss" scoped>
.company-users {
  &__panel {
    margin-top: 40px;
    padding: 24px;
    background-color: white;
  }
}
</style>
