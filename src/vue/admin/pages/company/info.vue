<template>
  <div>
    <companiesTabs
      :value="currentCompany" 
      :companies="companies"

      @change="changeCompany"
    />
    <div class="company-info__panel">
      <CompanyInfoData
        title="Данные о компании"
        :info="companyData"

        @change="change"
      />
      <CompanyInfoData
        title="Реквизиты"
        :info="requisites"

        @change="change"
      />
      <CompanyInfoData
        title="Юридический адрес"
        :info="lawAddress"

        @change="change"
      />
      <CompanyInfoData
        title="Фактический адрес"
        :info="exactAddress.info"
        @change="change"
      >
        <template v-slot:pre>
          <label class="checkbox company-info__checkbox">
            <input 
              type="checkbox"
              name="is_same_exact_address"
              :checked="exactAddress.isSameAddress"
            >
            <span class="checkbox__body" />
            <span class="checkbox__text">
              Совпадает с юридическим
            </span>
          </label>
        </template>
      </CompanyInfoData>
      <CompanyInfoData
        title="Почтовый адрес"
        :info="postAddress.info"

        @change="change"
      >
        <template v-slot:pre>
          <label class="checkbox company-info__checkbox">
            <input 
              type="checkbox"
              name="is_same_post_address"
              :checked="postAddress.isSameAddress"
            >
            <span class="checkbox__body" />
            <span class="checkbox__text">
              Совпадает с юридическим
            </span>
          </label>
        </template>
      </CompanyInfoData>
      <button 
        class="btn company-info__button"

        @click="openForm"
      >
        Создать заявку на изменение данных
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/helpers/api'
import companiesTabs from "@/components/blocks/companiesTabs";
import CompanyInfoData from '@/components/admin/company/info/CompanyInfoData';

export default {
  name: 'CompanyInfo',
  mixins: [api],
  components: {
    companiesTabs,
    CompanyInfoData,
  },
  data: () => ({ currentCompany: {} }),
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
      }
    },
    companyData() {
      const { currentCompany: company } = this;

      return [
        { 
          key: 'name', 
          title: 'Полное название организации',
          value: company.name,
        },
        {
          key: 'shortName',
          title: 'Краткое название организации',
          value: company.shortName,
        },
        {
          key: 'directorFio',
          title: 'Генеральный директор',
          value: company.directorFio,
        },
      ];
    },
    requisites() {
      const { currentCompany: company } = this;

      return [
        {
          key: 'inn',
          title: 'ИНН',
          value: company.inn,
        },
        {
          key: 'kpp',
          title: 'КПП',
          value: company.kpp,
        },
        {
          key: 'ogrn',
          title: 'ОГРН/ОГРНИП',
          value: company.ogrn,
        },
        {
          key: 'okpo',
          title: 'ОКПО',
          value: company.okpo,
        },
        {
          key: 'rs',
          title: 'Р/С',
          value: company.rs,
        },
        {
          key: 'ks',
          title: 'К/С',
          value: company.ks,
        },
        {
          key: 'bik',
          title: 'БИК',
          value: company.bik,
        },
      ];
    },
    lawAddress() {
      const {
        legalAddress,
        legalCountry: { 
          name: country, 
        } = {},
        legalPostcode,
      } = this.currentCompany;

      return [
        {
          key: 'country',
          title: 'Страна',
          value: country,
        },
        {
          key: 'address',
          title: 'Адрес',
          value: legalAddress,
        },
        {
          key: 'postIndex',
          title: 'Почтовый индекс',
          value: legalPostcode,
        },
      ];
    },
    exactAddress() {
      const {
        legalAddress,
        address,
        country: {
          name: country,
        } = {},
        postcode,
      } = this.currentCompany;

      const info = [
        {
          key: 'country',
          title: 'Страна',
          value: country,
        },
        {
          key: 'address',
          title: 'Адрес',
          value: address,
        },
        {
          key: 'postIndex',
          title: 'Почтовый индекс',
          value: postcode,
        },
      ];

      return {
        isSameAddress: legalAddress === address,
        info,
      };
    },
    postAddress() {
      const {
        legalAddress,
        mailingAddress,
        mailingCountry: { 
          name: country, 
        } = {},
        mailingPostcode,
      } = this.currentCompany;

      const info = [
        {
          key: 'country',
          title: 'Страна',
          value: country,
        },
        {
          key: 'address',
          title: 'Адрес',
          value: mailingAddress,
        },
        {
          key: 'postIndex',
          title: 'Почтовый индекс',
          value: mailingPostcode,
        },
      ];

      return {
        isSameAddress: legalAddress === mailingAddress,
        info,
      };
    },
  },
  created() {
    if (this.companies && this.companies.length) {
      this.fetchCompanyByInn(this.companies[0].inn)
        .then(({ data }) => this.currentCompany = data.data)
        .catch((error) => console.error(error));
    }
  },
  methods: {
    changeCompany(company) {
      this.fetchCompanyByInn(company.inn)
        .then(({ data }) => this.currentCompany = data.data)
        .catch((error) => console.error(error));
    },
    change(obj) {
      Object.assign(this.currentCompany, obj);
    },
    openForm() {},
  },
};
</script>

<style lang="scss" scoped>
.company-info {
  &__panel {
    margin-top: 40px;
    padding: 24px;
    background-color: white;
  }

  &__checkbox {
    margin-top: 20px;
    pointer-events: none;
  }

  &__files {
    margin-top: 16px;
    margin-left: 36px;
  }

  &__button {
    margin-top: 56px;

    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
}
</style>
