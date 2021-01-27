<template>
  <div class="contracts">
    <div class="contracts__flex">
      <div
        ref="filterContainer"
        class="contracts__filter"
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
        />
      </div>
      <div class="contracts__body">
        <companiesTabs
          :companies="companies"
          :value="currentCompany"
          @change="changeCompany"
        />
        <div class="contracts__search">
          <search
            v-model="searchQuery"
            placeholder="Номер или название договора по ИНН пользователя"
            :can-clear="true"
            @search="getItems"
          />
        </div>
        <div class="contracts items">
          <div class="items__head">
            <div class="items__head-counter">
              <template v-if="!loadingItems">
                Найдено&nbsp;<span>{{ totalItems }}</span>
              </template>
              <template v-else>
                <span>Загрузка...</span>
              </template>
            </div>
            <span
              class="items__head-filter popup-link"
              @click="openPopupById('filter-modal')"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.701172 13.0771C0.701172 13.3531 0.908173 13.6291 1.25317 13.6291H8.84317C9.05017 14.4571 9.80917 15.0091 10.7062 15.0091C11.6032 15.0091 12.2932 14.3881 12.5692 13.6291H14.9152C15.1912 13.6291 15.4672 13.4221 15.4672 13.1461C15.4672 12.8701 15.2602 12.5941 14.9842 12.5941H12.5002C12.2932 11.7661 11.5342 11.2141 10.6372 11.2141C9.74017 11.2141 9.05017 11.8351 8.77417 12.5941H1.18417C0.977172 12.5251 0.701172 12.8011 0.701172 13.0771ZM0.701172 7.48812C0.701172 7.76412 0.908173 8.04012 1.25317 8.04012H3.59917C3.80617 8.86812 4.56517 9.42012 5.46217 9.42012C6.35917 9.42012 7.04917 8.79912 7.32517 8.04012H14.9152C15.1912 8.04012 15.4672 7.83311 15.4672 7.55711C15.4672 7.28111 15.2602 7.00512 14.9842 7.00512H7.39417C7.18717 6.17712 6.42817 5.62512 5.53117 5.62512C4.63417 5.62512 3.94417 6.24612 3.66817 7.00512H1.32217C0.977172 7.00512 0.701172 7.21212 0.701172 7.48812ZM0.701172 1.8991C0.701172 2.1751 0.908173 2.45113 1.25317 2.45113H8.84317C9.05017 3.27913 9.80917 3.83113 10.7062 3.83113C11.6032 3.83113 12.2932 3.21013 12.5692 2.45113H14.9152C15.1912 2.45113 15.4672 2.24412 15.4672 1.96812C15.4672 1.69212 15.2602 1.41613 14.9842 1.41613H12.5002C12.2932 0.588133 11.5342 0.0361328 10.6372 0.0361328C9.74017 0.0361328 9.05017 0.657133 8.77417 1.41613H1.18417C0.977172 1.41613 0.701172 1.6231 0.701172 1.8991ZM4.56517 7.48812C4.56517 7.00512 4.97917 6.59113 5.46217 6.59113C5.94517 6.59113 6.35917 7.00512 6.35917 7.48812C6.35917 7.97112 5.94517 8.38512 5.46217 8.38512C4.97917 8.38512 4.56517 7.97112 4.56517 7.48812ZM9.80917 13.0771C9.80917 12.5941 10.2232 12.1801 10.7062 12.1801C11.1892 12.1801 11.6032 12.5941 11.6032 13.0771C11.6032 13.5601 11.1892 13.9741 10.7062 13.9741C10.1542 13.9741 9.80917 13.5601 9.80917 13.0771ZM9.80917 1.8991C9.80917 1.4161 10.2232 1.00211 10.7062 1.00211C11.1892 1.00211 11.6032 1.4161 11.6032 1.8991C11.6032 2.3821 11.1892 2.79613 10.7062 2.79613C10.1542 2.79613 9.80917 2.3821 9.80917 1.8991Z"
                  fill="#31ACB8"
                />
              </svg>
              <span>
                Все фильтры
              </span>
            </span>
            <dropdownList
              class="items__head-item"
              label="Сортировать по:"
              :options="sortList"
              :current="sort"
              @change="sortItems"
            />
            <!--<dropdownList v-if="type !== 'drafts'"
                          class="items__head-item"
                          label="Показывать:"
                          :options="viewList"
                          :current="view"
                          @change="viewItems"
            />-->
          </div>
        </div>
        <contractsList
          :items="items"
          :is-first-load="isFirstLoad"
          :loading="loadingItems"
          :items-statuses="itemsStatuses"
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
import search from '@/components/searchText.vue';
import dropdownList from '@/components/blocks/dropdownList';
import filterList from '@/components/blocks/filter';
import contractsList from '@/components/contracts/list.vue';
import functions from '@/helpers/functions';
import api from '../../../helpers/api';

export default {
  name: 'Contracts',
  components: {
    companiesTabs,
    search,
    dropdownList,
    filterList,
    contractsList,
  },
  mixins: [api, functions],
  props: {
    type: {
      default: 'list',
      type: String,
    },
  },
  data() {
    return {
      isFirstLoad: false,
      searchQuery: '',
      loadingFilter: true,
      loadingItems: true,
      perPage: 20,
      totalItems: 0,
      page: 1,
      itemsStatuses: [],
      currentCompany: {},
      currentFilter: {},
      filter: [],
      filterKey: 0,
      currentOrder: {
        conclusion_date: 'desc',
        // "created_at": "asc",
        // "conclusion_date": "asc",
        // "price": "asc"
      },
      sort: 'desc',
      sortList: [
        {
          id: 'desc',
          name: 'дате подписания (от новых к старым)',
        },
        {
          id: 'asc',
          name: 'дате подписания (от старых к новым)',
        },
      ],
      // view: 'submitted',
      // viewList: [
      //   {
      //     id: 'all',
      //     name: 'все',
      //   },
      //   {
      //     id: 'submitted',
      //     name: 'отправленные',
      //   },
      //   {
      //     id: 'winner_processing',
      //     name: 'определение победителя',
      //   },
      //   {
      //     id: 'winner_chosen',
      //     name: 'победитель определен',
      //   },
      //   {
      //     id: 'canceled',
      //     name: 'закрытые',
      //   },
      // ],
      items: [],
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
        default:
          companies = this.$store.getters.companyContractor;
          break;
      }
      return companies;
    },
  },
  watch: {
    $route() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$emit('fullMode');
      this.currentCompany = this.companies[0]; // run companies computed
      this.fetchContractsFilter('status')
        .then((response) => {
          this.filter.push({
            id: 'status',
            value: 'Статус договора',
            type: 'checkbox',
            values: response.data.data,
          });
          this.filter.push({
            id: 'created_at',
            value: 'Дата размещения',
            type: 'period',
            values: '',
          });
          this.itemsStatuses = response.data.data;
          this.loadingFilter = false;
        })
        .catch((e) => {
          console.log(e);
          this.loadingFilter = false;
        });
      this.getItems();
    },
    changeFilter() {
      this.page = 1;
      this.getItems();
    },
    getItems(search = null) {
      this.loadingItems = true;
      this.items = [];
      // пришли от поиска и с запросом
      if (search && search.length) {
        // чистим фильтр
        this.page = 1;
        this.currentFilter = {};
        this.currentFilter.q = search;
        // перерисовываем фильтр
        this.filterKey += 1;
      }
      // чистим поиск
      if (search === false) {
        // чистим фильтр
        this.page = 1;
        this.currentFilter = {};
        // перерисовываем фильтр
        this.filterKey += 1;
      }
      if (this.companies.length && this.currentCompany) {
        this.currentFilter.inn = {};
        if (this.$store.getters.userRole === 'buyer') {
          // todo 'customer' to 'buyer'
          this.currentFilter.inn.buyer = this.currentCompany.inn;
        } else {
          this.currentFilter.inn.contractor = this.currentCompany.inn;
        }
      }
      const filter = {
        filter: this.parseFilter(this.currentFilter),
        order: this.currentOrder,
      };
      this.fetchContractList(filter, this.page)
        .then((data) => {
          this.isFirstLoad = true;
          const items = data.data.data.items;
          if (!items.length && this.page > 1) {
            // если ничего не получили и у нас НЕ первая страница - грузим предыдущую
            this.changePagination(this.page - 1);
            return;
          }
          this.getItemsCompanies(items);
          this.totalItems = data.data.data.total;
          this.items = items;
          this.loadingItems = false;
        })
        .catch((e) => {
          console.log(e);
          this.loadingItems = false;
        });
    },
    sortItems(sortBy) {
      this.sort = sortBy;
      this.currentOrder.conclusion_date = sortBy;
      this.changeFilter();
    },
    // viewItems(view) {
    //   this.view = view;
    //   this.currentFilter.status = [view];
    //   this.changeFilter();
    // },
    changeCompany(company) {
      this.page = 1;
      this.currentCompany = company;
      this.getItems();
    },
    changePagination(page) {
      this.page = page;
      this.getItems();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.contracts {
  &__flex {
    display: flex;
    justify-content: space-between;
    @include mq($until: desktop) {
      padding-top: rem(92px);
    }
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
  }
  &__search {
    margin: 0 0 rem(64px);
  }
}
</style>
