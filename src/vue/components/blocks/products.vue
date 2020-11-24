<template>
    <div class="company-products">
        <div class="company-products__filters">
            <ProductsFilters @changeFilter="changeFilter(filtersData)"/>
        </div>
        <div class="company-products__table">
            <div class="company-products__thead">
                <div class="table-cell__title">
                    Маркоразмер
                </div>
                <div class="table-cell__quantity">
                    Остаток, м
                </div>
                <div class="table-cell__price">
                    Цена, руб
                </div>
                <div class="table-cell__certificates">
                    Сертификаты
                </div>
            </div>
            <div v-for="(item, key) in items" :key="key">
                <MarkSizeCard :item="item" />
            </div>
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
    </div>
</template>

<script>
import api from '../../helpers/api'
import MarkSizeCard from './markSizeCardLarge.vue'
import ProductsFilters from './ProductsFilters.vue'

export default {
    name: 'Products',

    components: {
        MarkSizeCard,
        ProductsFilters
    },

    mixins: [api],

    data() {
        return {
            isFirstLoad: false,
            companyId: null,
            items: [],
            page: 1,
        }
    },

    created() {
        this.fillUserData()
        this.getCompanyData()
    },

    computed: {
        totalPages() {
            return Math.ceil(this.items.length / 5)
        },
    },

    methods: {
        pagination(page) {
            this.page = page
            this.getCompanyData()
        },
        fillUserData() {
            this.companyId = document.querySelector('.section--company').getAttribute('data-id');
            return false;
        },
        getCompanyData(filterValues = null) {
            this.fetchCompany(this.companyId, filterValues)
                .then((response) => {
                    this.items = response.data.data.items;
                    this.isFirstLoad = true
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        changeFilter(filtersData) {
            this.getCompanyData(filtersData)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .company-products {
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