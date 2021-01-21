<template>
    <div class="products">
        <productsFilter
                :companies="companies"
                @changeFilter="changeFilter"
                @resetFilter="resetFilter"
        />
        <productsList
                :items="items"
                :companies="companies"
                :loading="loadingItems"
        />
        <paginate
                v-if="totalPages"
                :page-count="totalPages"
                :click-handler="changePagination"
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
</template>

<script>
    import api from '../../../helpers/api';
    import functions from '../../../helpers/functions';
    import productsFilter from '@/components/products/filter'
    import productsList from '@/components/products/list'

    export default {
        name: 'Products',

        components: {
            productsFilter,
            productsList,
        },

        mixins: [api, functions],
        props: {
            marksizeId: {
                type: String,
                default: null
            },
            companies: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                loadingItems: false,
                perPage: 8,
                items: [],
                totalItems: 0,
                page: 1,
                companyId: null,
                currentFilter: {
                    q: null,
                    company: null,
                    quantity: {
                        from: null,
                        to: null,
                    },
                    price: {
                        from: null,
                        to: null,
                    }
                },
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalItems / this.perPage)
            },
        },
        created() {
            this.getItems()
        },
        methods: {
            changePagination(page) {
                this.page = page;
                this.getItems();
            },
            getItems() {
                this.cancelCompanyRequest();
                this.loadingItems = true;
                let companyId = null;
                const { company_id, ...othersFilters } = this.currentFilter;
                companyId = company_id;
                let filters = othersFilters;
                const marksizeInfo = {
                    company_id: companyId,
                    page: this.page,
                    filter: filters,
                };
                const fData = this.objectToFormData(marksizeInfo);
                this.filterMarksizeQuantity(this.marksizeId, fData).then((response) => {
                    this.items = response.data.data.items || [];
                    this.totalItems = response.data.data.total;
                    this.loadingItems = false;
                }).catch((e) => {
                    if (!axios.isCancel(e)) {
                        console.log(e);
                        window.notificationError('Ошибка сервера');
                        this.loadingItems = false;
                    }
                })
            },
            changeFilter(filtersData) {
                this.page = 1;
                this.currentFilter.q = (filtersData.cable ? filtersData.cable.title.toString() : null) || null;
                this.currentFilter.company = (filtersData.company ? filtersData.company.id : null) || null;
                this.currentFilter.quantity.from = filtersData.metresFrom || null;
                this.currentFilter.quantity.to = filtersData.metresTo || null;
                this.currentFilter.price.from = filtersData.priceFrom || null;
                this.currentFilter.price.to = filtersData.priceTo || null;
                this.getItems();
            },
            resetFilter() {
                this.page = 1;
                this.currentFilter = {
                    q: null,
                    company: null,
                    quantity: {
                        from: null,
                        to: null,
                    },
                    price: {
                        from: null,
                        to: null,
                    }
                };
                this.getItems();
            },
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

    @include mq($from: tablet) {
        ::v-deep .cable-info,
        ::v-deep .company-products__thead {
            .table-cell {
                &__title,
                &__company,
                &__certificates {
                    width: 25%;
                }
                &__quantity,
                &__price {
                    width: 12.5%;
                }
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
