<template>
  <div class="company-products">
    <div class="company-products__filters">
      <mark-marksize-filter @changeFilter="changeFilter" @resetFilter="resetFilter" :option-list="companyList" />
    </div>
    <div class="company-products__table">
      <div v-if="items.length && !isLoading" class="company-products__thead">
        <div class="table-cell__title">
          Маркоразмер
        </div>
        <div class="table-cell__quantity">
          Наличие, м
        </div>
        <div class="table-cell__quantity">
          Компания
        </div>
        <div class="table-cell__price">
          Цена, руб
        </div>
        <div class="table-cell__certificates">
          Сертификаты
        </div>
        <div class="table-cell__controls"></div>
      </div>
      <div v-for="(item, key) in items" :key="key">
        <MarkSizeCard :item="item" @view-certificate="viewCertificate" />
      </div>
      <div v-if="!items.length && !isLoading">
        Ничего не найдено
      </div>
      <transition name="fade-loader">
        <div
          v-if="isLoading"
          class="card__loader card__loader--absolute"
        >
          <div class="preloader">
            <div class="preloader__preloader">
              <div class="preloader__loader"></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="company-products__pagination">
      <paginate
        v-if="isFirstLoad && totalPages"
        :page-count="totalPages"
        :click-handler="pagination"
        prev-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        next-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        :prev-class="'catalog-pagination__prev'"
        :next-class="'catalog-pagination__next'"
        :container-class="'catalog-pagination'"
        :page-class="'catalog-pagination__item'"
        :value="page"
      >
      </paginate>
    </div>
    <ProductCertificateView :document="currentCertificate" @change-item="changeCertificate" />
  </div>
</template>

<script>
import api from '../../../helpers/api';
import functions from '../../../helpers/functions';
import MarkSizeCard from '../markSizeCardLarge.vue';
import MarkMarksizeFilter from './mark-marksize-filter';
import ProductCertificateView from '../../../productsCertificateView';

export default {
  name: 'Products',

  components: {
    MarkSizeCard,
    MarkMarksizeFilter,
    ProductCertificateView
  },

  mixins: [api, functions],
  props: {
    marksizeId: {
      type: String,
      default: null
    },
    companyList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      isFirstLoad: false,
      items: [],
      page: 1,
      totalPages: null,
      isLoading: true,
      currentFilter: {
        q: null,
        quantity: {
          from: null,
          to: null,
        },
        price: {
          from: null,
          to: null,
        }
      },
      certificates: [],
      currentCertificate: null
    }
  },
  created() {
    this.getMarksizesData()
  },

  methods: {
    pagination(page) {
      this.isLoading = true
      this.page = page
      this.cancelCompanyRequest()
      this.getMarksizesData(this.currentFilter)
    },
    getMarksizesData(filterValues = null) {
      let companyId = null;
      let filters = null;
      if (filterValues) {
        const { company_id, ...othersFilters } = filterValues;
        companyId = company_id;
        filters = othersFilters;
      }
      const marksizeInfo = {
        company_id: companyId,
        page: this.page,
        filter: filters
      }
      const fData = this.objectToFormData(marksizeInfo)
      this.filterMarksizeQuantity(this.marksizeId, fData).then((response) => {
        const { items = [] } = response.data.data;
        if (items.length && this.companyList.length) {
          this.items = this.prepareItems(items);
        } else {
          this.items = [];
        }
        this.totalPages = Math.ceil(response.data.data.total / 8);
        this.isFirstLoad = true
        this.isLoading = false
      }).catch((e) => {
        console.log(e)
      })
    },
    prepareItems(dataItems) {
      const result = dataItems.map((item) => {
        const company = this.companyList.find((company) => company.id === item.company_id);
        item.company = company;
        return item;
      });
      return result;
    },
    changeFilter(filtersData) {
      this.isLoading = true
      this.page = 1
      if(filtersData.company) {
        this.currentFilter.company_id = filtersData.company.id
      } else {
        this.currentFilter.company_id = null
      }
      if(filtersData.metresFrom) {
        this.currentFilter.quantity.from = filtersData.metresFrom
      } else {
        this.currentFilter.quantity.from = null
      }
      if(filtersData.metresTo) {
        this.currentFilter.quantity.to = filtersData.metresTo
      } else {
        this.currentFilter.quantity.to = null
      }
      if(filtersData.priceFrom) {
        this.currentFilter.price.from = filtersData.priceFrom
      } else {
        this.currentFilter.price.from = null
      }
      if(filtersData.priceTo) {
        this.currentFilter.price.to = filtersData.priceTo
      } else {
        this.currentFilter.price.to = null
      }
      this.cancelCompanyRequest()
      this.getMarksizesData(this.currentFilter)
    },
    resetFilter() {
      this.isLoading = true
      this.currentFilter = {
        q: null,
        quantity: {
          from: null,
          to: null,
        },
        price: {
          from: null,
          to: null,
        }
      }
      this.getMarksizesData(this.currentFilter)
    },
    viewCertificate(value) {
      this.certificates = value.items;
      this.currentCertificate = value.current;
      openPopupById('#products-certificate-view');
    },
    changeCertificate(value) {
      let idx = this.certificates.findIndex(item => item.properties.number === this.currentCertificate.properties.number);
      if (idx >= 0) {
        switch (value) {
          case "next":
            idx += 1;
            break;
          case "back":
            idx -= 1;
            break;
          default:
            console.log("Неизвестный тип переключения слайдера сертификата", value);
            return;
        }

        if (idx > this.certificates.length - 1) {
          idx = 0;
        }

        if (idx < 0) {
          idx = this.certificates.length - 1;
        }
        this.currentCertificate = { ...this.certificates[idx], title: this.currentCertificate.title };
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";
@import "../../../../assets/sass/mixins/mq";

.company-products {
  &__table {
    position: relative;
  }
  &__thead {
    display: flex;
    align-items: flex-start;
    font-weight: 500;
    font-size: 14px;
    color: $colorGray;
  }
}

.table-cell {
  &__title {
    width: 25%;
  }
  &__quantity {
    width: 20%;
  }
  &__price {
    width: 20%;
  }
  &__certificates{
    width: 35%;
  }
}

.card {
  &__loader {
    position: relative;
    height: 400px;
    animation: blur 1s linear forwards;
    &--absolute {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      width: 100%;
      padding: 10px;
      box-sizing: content-box;
      .preloader {
        background-color: transparent;
      }
      .preloader__loader {
        position: static;
      }
      .preloader__preloader {
        align-items: center;
        justify-content: center;
      }
    }
  }
}

@keyframes blur {
  0%   {
    backdrop-filter: blur(0px);
  }
  100% {
    backdrop-filter: blur(2px);
  }
}

@include mq($until: desktop) {
  .table-cell {
    &__title {
      width: 35%;
    }
    &__quantity {
      width: 20%;
    }
    &__price {
      width: 20%;
    }
    &__certificates {
      width: 25%;
    }
  }
}

@include mq($until: tablet) {
  .company-products {
    &__thead {
      display: none;
    }
  }
}

</style>
