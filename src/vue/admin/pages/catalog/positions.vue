<template>
    <div class="products">
        <accreditations-title title="Заявки на добавление в каталог"></accreditations-title>
        <div class="items__head">
            <dropdownList
                    class="items__head-item"
                    label="Сортировать по:"
                    :options="sortList"
                    :current="sort"
                    @change="onSort"
            />
            <dropdownList
                    class="items__head-item"
                    label="Показывать:"
                    :options="viewList"
                    :current="view"
                    @change="onFilter"
            />
            <shortSearch
                    class="items__head-item products__search"
                    @on-search="onSearch"
            />
        </div>
        <div class="products__item products__item--empty item item--empty" v-if="!items.length && !loading">
            Заявки не найдены
        </div>
        <div class="products__item products__item--loading item item--loading" v-if="!items.length && loading">
            <div class="preloader">
                <div class="preloader__preloader">
                    <div class="preloader__loader"></div>
                </div>
            </div>
        </div>
        <catalog-list
                v-else
                :items="items"
        />
        <paginate
                v-if="totalPages"
                :page-count="totalPages"
                :click-handler="changePage"
                prev-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                next-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                :prev-class="'catalog-pagination__prev'"
                :next-class="'catalog-pagination__next'"
                :container-class="'catalog-pagination'"
                :page-class="'catalog-pagination__item'"
                :value="currentPage"
        />
    </div>
</template>
<script>
import api from '../../../helpers/api'

import AccreditationsTitle from '../../../components/admin/accreditations/AccreditationsTitle.vue'
import dropdownList from "@/components/blocks/dropdownList";
import CatalogList from '../../../components/admin/catalog/CatalogList.vue'
import shortSearch from "@/components/blocks/shortSearch";

export default {
  name: 'positions',
  components: {
    AccreditationsTitle,
    dropdownList,
    shortSearch,
    CatalogList
  },
  mixins: [api],
  data() {
    return {
      items: [],
      loading: true,
      search: '',
      totalPages: null,
      currentPage: 1,
      productSort: null,
      productFilter: null,
      debounceTimer: null,
      companies: {},
      sort: 'desc',
      sortList: [
        {
          id: 'desc',
          name: 'дате размещения (от новых к старым)',
        },
        {
          id: 'asc',
          name: 'дате размещения (от старых к новым)',
        },
      ],
      view: 'all',
      viewList: [
        {
          id: 'all',
          name: 'все',
        },
        {
          id: 'new',
          name: 'новые',
        },
        {
          id: 'approved',
          name: 'согласованны',
        },
        {
          id: 'rejected',
          name: 'отклонены',
        },
      ],

    }
  },
  methods: {
    getPositions() {
      this.loading = true
      this.fetchProductList({
        page: this.currentPage,
        'order[created_at]': this.productSort,
        'filter[status]': this.productFilter,
        'filter[q]': this.search
      })
        .then((response) => {
          const items = response.data.data.items 
          this.totalPages = response.data.data.total       
          const companiesIds = [];                 
          items.forEach((item, index) => {
            items[index].company = null;
            if (companiesIds.indexOf(items[index].company_id) === -1) companiesIds.push(items[index].company_id);
          });
          if (companiesIds.length){
            this.fetchCompanysByIds(companiesIds)
              .then((response) => {
                  const companies = response.data.data.elements;
                  companies.forEach((company) => {
                      items.forEach((item) => {
                          if (parseInt(company.id) === parseInt(item.company_id)) {
                              item.company = company;
                          }
                      });
                  });
              })
              .catch((e) => {
                  console.log(e)
              });
          }
          items.forEach((item, index) => {
              items[index].isExpanded = false;
            });
          this.items = items;     
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => (this.loading = false))
      },
      changePage(page) {
          this.currentPage = page
          this.getPositions()
      },
      onSort(value) {
          this.productSort = value
          this.currentPage = 1

          this.getPositions()
      },
      onFilter(value) {
          value === 'all'? this.productFilter = null:  this.productFilter = value           
          this.currentPage = 1

          this.getPositions()
      },
      onSearch(value) {
          this.search = value

          clearTimeout(this.debounceTimer)
          this.debounceTimer = setTimeout(() => this.getPositions(), 500)
      },
    loadCompanies(data) {
        const updateIds = []
        data.forEach((item) => {
          if (
            typeof this.companies[item.company_id] === 'undefined' &&
            !updateIds.includes(item.company_id)
          ) {
            updateIds.push(item.company_id)
          }
        })
        return updateIds        
      },
   
  },
  created() {
    this.getPositions()
  }     
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.products__search {
    margin-left: auto;
}
</style>
