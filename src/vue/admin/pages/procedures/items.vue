<template>
  <div class="marketplace">
    <router-link
      v-if="this.$store.getters.userRole === 'buyer'"
      class="btn marketplace__add"
      to="/personal/procedures/new"
    >
      Создать процедуру
    </router-link>
    <div class="marketplace__flex">
      <div
        ref="filterContainer"
        class="marketplace__filter"
      >
        <filterList
          :key="filterKey"
          :mobile-width="1023"
          :loading="loadingFilter"
          :filter="filter"
          :current-filter="currentFilter"
          :filter-container="this.$refs.filterContainer"
          :full="true"
          @changeFilter="changeFilter"
          @searchCompanies="searchCompanies"
        />
      </div>
      <div class="marketplace__body">
        <router-link
          v-if="this.$store.getters.userRole === 'buyer'"
          to="/personal/procedures/new"
          class="btn"
        >
          Создать новую процедуру
        </router-link>
        <companiesTabs
          :companies="companies"
          :value="currentCompany"
          @change="changeCompany"
        />
        <div class="marketplace__search">
          <search
            v-model="searchQuery"
            placeholder="Номер или название торговой процедуры"
            :can-clear="true"
            @search="getItems"
          />
        </div>
        <marketplaceList
          :items-types="itemsTypes"
          :items-formats="itemsFormats"
          :items-statuses="itemsStatuses"
          :is-first-load="isFirstLoad"
          :loading="loadingItems"
          :items="items"
          :total-items="totalItems"
          :current-filter="currentFilter"
          :current-order="currentOrder"
          @changeFilter="changeFilter"
          @getItems="getItems"
        />
        <paginate
          v-if="isFirstLoad && totalPages"
          :page-count="totalPages"
          :click-handler="changePagination"
          prev-text="<svg width=&quot;6&quot; height=&quot;11&quot; viewBox=&quot;0 0 6 11&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M5 1L1 5.5L5 10&quot; stroke=&quot;#9B9B9A&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;/></svg>"
          next-text="<svg width=&quot;6&quot; height=&quot;11&quot; viewBox=&quot;0 0 6 11&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M5 1L1 5.5L5 10&quot; stroke=&quot;#9B9B9A&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;/></svg>"
          :prev-class="'catalog-pagination__prev'"
          :next-class="'catalog-pagination__next'"
          :container-class="'catalog-pagination'"
          :page-class="'catalog-pagination__item'"
          :value="page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import companiesTabs from '@/components/blocks/companiesTabs';
import functions from '@/helpers/functions';
import api from '../../../helpers/api';
import search from '../../../components/searchText.vue';
import filterList from '../../../components/blocks/filter.vue';
import marketplaceList from '../../../components/marketplace/list.vue';
import formatDate from '../../../helpers/formatDate';

export default {
  name: 'Procedures',
  components: {
    companiesTabs,
    search,
    filterList,
    marketplaceList,
  },
  mixins: [api, functions, formatDate],
  props: {
    type: {
      default: 'list',
      type: String,
    },
  },
  data() {
    return {
      searchQuery: '',
      isFirstLoad: false,
      loadingFilter: true,
      loadingItems: true,
      currentFilter: {},
      currentOrder: {
        publication_date: 'desc',
      },
      itemsTypes: [],
      itemsFormats: [],
      itemsStatuses: [],
      filter: [],
      filterKey: 0,
      perPage: 10,
      items: [],
      totalItems: 0,
      page: 1,
      currentCompany: {},
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    companies() {
      // список компаний пользователя
      let companies = [];
      switch (this.$store.getters.userRole) {
        case 'buyer':
          companies = this.$store.getters.companyBuyer;
          break;
        case 'contractor':
          if (this.type === 'applications') {
            companies = this.$store.getters.companyContractor;
          }
          break;
      }
      // обновляем фильтр - ставим нужную компанию
      if (companies.length) {
        this.currentCompany = companies[0];
      }
      return companies;
    },
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$emit('fullMode');
      const companies = this.companies; // run companies computed
      const params = new URLSearchParams(window.location.search.substring(1));
      this.searchQuery = params.get('q') || '';
      if (this.searchQuery.length) {
        // если в урле есть запрос для поиска - ставим его
        this.currentFilter.q = this.searchQuery;
      }
      function parseObjToArr(obj) {
        const arr = [];
        for (const key in obj) {
          arr.push({
            id: key,
            name: obj[key],
          });
        }
        return arr;
      }
      this.filter = [];
      this.fetchMarketplaceProceduresFilter()
        .then((response) => {
          const filterData = response.data.data.procedures;
          const statuses = {};
          for (let i = 0; i < filterData.public_statuses.length; i++) {
            const status = filterData.public_statuses[i];
            statuses[status] = filterData.values.status[status];
          }
          this.filter.push({
            id: 'tender_trading_type',
            value: 'Тип процедуры',
            type: 'checkbox',
            values: parseObjToArr(filterData.values.tender_trading_type),
          });
          this.filter.push({
            id: 'publication_date',
            value: 'Дата размещения',
            type: 'period',
            values: '',
          });
          if (this.type !== 'drafts') {
            // не выводим в фильтр статусы для черновиков
            this.filter.push({
              id: 'status',
              value: 'Статус',
              type: 'checkbox',
              values: parseObjToArr(statuses),
            });
          }
          this.filter.push({
            id: 'tender_trading_format',
            value: 'Формат',
            type: 'checkbox',
            values: parseObjToArr(filterData.values.tender_trading_format),
          });
          this.itemsTypes = parseObjToArr(filterData.values.tender_trading_type);
          this.itemsFormats = parseObjToArr(filterData.values.tender_trading_format);
          this.itemsStatuses = parseObjToArr(statuses);
          this.loadingFilter = false;
        })
        .catch((e) => {
          console.log(e);
          this.loadingFilter = false;
        });
      if (!this.companies.length) {
        // если у нас список процедур ДЛЯ компаний - не добавляем в фильтр компании и регион ибо не имеет смысла
        this.fetchRegions()
          .then((response) => {
            this.filter.push({
              type: 'select',
              id: 'regions',
              value: 'Регион',
              placeholder: 'Выбрать регион',
              values: response.data.data,
              currentValues: [],
            });
          })
          .catch((e) => {
            console.log(e);
          });
        this.filter.push({
          type: 'search',
          id: 'company_id',
          value: 'Компания',
          placeholder: 'Выбрать компанию',
          values: [],
          currentValues: [],
          search: 'searchCompanies',
          loading: false,
        });
      }
      this.getItems();
    },
    changePagination(page) {
      this.page = page;
      this.getItems();
    },
    changeCompany(company) {
      this.page = 1;
      this.currentFilter = {};
      this.currentCompany = company;
      this.getItems();
    },
    changeFilter() {
      this.page = 1;
      this.getItems();
    },
    getItems(search = null) {
      this.cancelMarketplaceProceduresRequest();
      this.loadingItems = true;
      this.items = [];
      // пришли от поиска и с запросом
      if (search && search.length) {
        // чистим фильтр
        this.page = 1;
        const showing = this.currentFilter.showing || 'all';
        this.currentFilter = {};
        this.currentFilter.showing = showing;
        this.currentFilter.q = search;
        // перерисовываем фильтр
        this.filterKey++;
      }
      // чистим поиск
      if (search === false) {
        // чистим фильтр
        this.page = 1;
        const showing = this.currentFilter.showing || 'all';
        this.currentFilter = {};
        this.currentFilter.showing = showing;
        // перерисовываем фильтр
        this.filterKey++;
      }
      if (this.companies.length && this.currentCompany) {
        this.currentFilter.inn = [this.currentCompany.inn];
      }
      this.currentFilter.showing = this.currentFilter.showing || 'all';
      const filter = {
        draft: this.$store.getters.userRole === 'buyer' && this.type === 'drafts',
        has_applications: this.$store.getters.userRole === 'contractor' && this.type === 'applications',
        filter: this.parseFilter(this.currentFilter),
        order: this.currentOrder,
      };
      this.fetchMarketplaceProcedures(filter, this.page)
        .then((data) => {
          this.isFirstLoad = true;
          const items = data.data.data.items;
          if (!items.length && this.page > 1) {
            // если ничего не получили и у нас НЕ первая страница - грузим предыдущую
            this.changePagination(this.page - 1);
            return;
          }
          const companiesINN = [];
          this.totalItems = data.data.data.total;
          /* TODO: переделать запрос детальной информации о компании через новый роут (Отправка массива id компаний)
                            Сделать чтобы названия компаний добавлялись реактивно к уже выведенному списку компаний
                         */
          items.forEach((item, index) => {
            items[index].company = null;
            if (companiesINN.indexOf(items[index].inn) === -1) companiesINN.push(items[index].inn);
          });
          if (companiesINN.length) {
            this.fetchCompaniesByINN(companiesINN)
              .then((response) => {
                const companies = response.data.data.elements;
                companies.forEach((company) => {
                  items.forEach((item) => {
                    if (parseInt(company.inn) === parseInt(item.inn)) {
                      item.company = company;
                    }
                  });
                });
              })
              .catch((e) => {
                console.log(e);
              });
          }
          items.forEach((item, index) => {
            items[index].isExpanded = false;
          });
          this.items = items;
          this.loadingItems = false;
        })
        .catch((e) => {
          if (!axios.isCancel(e)) {
            console.log(e);
            window.notificationError('Ошибка сервера');
            this.loadingItems = false;
          }
        });
    },
    searchCompanies(index, q) {
      clearInterval(this.searchCompanyCounter);
      if (q) {
        this.cancelCompaniesRequest();
        this.searchCompanyCounter = setTimeout(() => {
          this.filter[index].loading = true;
          this.fetchCompaniesByName(q)
            .then((response) => {
              this.filter[index].loading = false;
              this.filter[index].values = response.data.data.elements;
            })
            .catch((e) => {
              if (!axios.isCancel(e)) {
                console.log(e);
                this.filter[index].loading = false;
                this.filter[index].values = [];
              }
            });
        }, 1000);
      } else {
        this.filter[index].values = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
    @import "../../../../assets/sass/variables/variables";
    @import "../../../../assets/sass/variables/fluid-variables";
    @import "../../../../assets/sass/mixins/fluid-mixin";
    @import "../../../../assets/sass/mixins/mq";

    .marketplace {
        padding: 0 !important;
        background: transparent !important;
        &__add {
            display: none;
            margin: 0 0 rem(24px);
            width: 100%;
            //@include mq($from: tablet) {
            //    display: none;
            //}
        }
        &__search {
            margin: 0 0 rem(64px);
        }
        &__flex {
            display: flex;
            justify-content: space-between;
        }
        &__filter {
            width: rem(348px);
            @include mq($until: desktop) {
                display: none;
            }
            .test-container.fullMode & {
                padding-top: rem(86px);
            }
        }
        &__body {
            width: calc(100% - #{rem(348px)});
            @include mq($until: desktop) {
                width: 100%;
            }
            > .btn {
                margin: 0 0 rem(40px);
                @include mq($until: desktop) {
                    float: right;
                }
                @include mq($until: tablet) {
                    float: none;
                    display: block;
                }
            }
            > .tabs {
                @include mq($until: desktop) {
                    clear: both;
                }
            }
        }
    }
</style>
