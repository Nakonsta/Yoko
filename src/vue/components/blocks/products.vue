<template>
    <div class="company-products">
        <div class="company-products__filters">
            
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
    </div>
</template>

<script>
import api from '../../helpers/api'
import MarkSizeCard from './markSizeCardLarge.vue'

export default {
    name: 'Products',

    components: {
        MarkSizeCard
    },

    mixins: [api],

    data() {
        return {
            companyId: null,
            items: [],
            page: 1,
        }
    },

    created() {
        this.fillUserData()
        this.getCompanyData()
    },

    methods: {
        fillUserData() {
            this.companyId = document.querySelector('.section--company').getAttribute('data-id');
            return false;
        },
        getCompanyData() {
            this.fetchCompany(this.companyId)
                .then((response) => {
                    this.items = response.data.data.items;
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e)
                })
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

</style>