<template>
  <div class="products">        
    <accreditations-title title="Заявки на добавление в каталог"></accreditations-title>
    <div class="products__filters">
      <catalog-sort @on-sort="onSort"></catalog-sort>
      <catalog-filter @on-filter="onFilter"></catalog-filter>
      <catalog-search @on-search="onSearch"></catalog-search>
    </div>

    <div v-if="loading" class="products__preloader">
        <div class="preloader">
            <div class="preloader__preloader">
                <div class="preloader__loader"></div>
            </div>
        </div>
    </div>       

    <div v-if="!loading && items.length === 0" class="products__empty-search">
        Заявки не найдены
    </div>    
    <catalog-list 
      v-else
      :items="items"      
      >
    </catalog-list>    
    <paginate
      v-if="totalPages"
      class="products__pagination"
      :page-count="totalPages"
      :click-handler="changePage"
      prev-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      next-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      :value="currentPage"
    >
    </paginate>
  </div>
</template>
<script>
import api from '../../../helpers/api'

import AccreditationsTitle from '../../../components/admin/accreditations/AccreditationsTitle.vue'
import CatalogSearch from '../../../components/admin/catalog/CatalogSearch.vue'
import CatalogFilter from '../../../components/admin/catalog/CatalogFilter.vue'
import CatalogSort from '../../../components/admin/catalog/CatalogSort.vue'
import CatalogList from '../../../components/admin/catalog/CatalogList.vue'

export default {
  name: 'positions',
  components: {
    AccreditationsTitle,
    CatalogSearch,
    CatalogFilter,
    CatalogSort,
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
      companies: {}
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

.products {
    width: 100%;
    background-color: #e9f7f8;
    padding: 0;

    @include mq($until: desktop) {
      padding-top: rem(87px);
    }
    &__preloader {
      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      width: 100%;
      height: 100%;
      min-height: 400px;
    }

    &__filters {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        position: relative;
        width: 100%;
    }

    &__empty-search {
      width: 100%;
      padding: rem(40px) rem(20px);

      text-align: center;
      font-size: rem(16px);
      color: $colorGray;
    }

    &__pagination {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: rem(20px);

      ::v-deep li {
        width: 30px;
        height: 30px;
        margin: 0 rem(5px);

        &.disabled {
            a {
                cursor: default;

                &:hover {
                    background-color: #fff;
                    color: currentColor;
                }
            }
        }

        &.active {
          a {
              background-color: $colorTurquoise;
              color: #fff;

              &:hover {
                  background-color: $colorTurquoiseHover;
              }
          }
        }

        &:first-child {
          margin-right: rem(15px);
        }

        &:last-child {
          margin-left: rem(15px);
          transform: rotate(-180deg);
        }

        a {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 100%;
          height: 100%;
          background-color: #fff;
          transition: 0.3s;
          border-radius: 6px;

          &:hover {
            background-color: $colorTurquoise;
            color: #fff;

            svg path {
              transition: 0.3s stroke;
              stroke: #fff;
            }
          }
        }
      }
  }
}
</style>
