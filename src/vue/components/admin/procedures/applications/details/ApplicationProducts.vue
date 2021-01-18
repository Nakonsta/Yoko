<template>
    <div class="application-products">
        <div v-if="!isMobile" class="application-products__header">
            <div class="application-products__header-title" v-for="header in headers" :key="header.text">
                {{ header.text }}
            </div>
        </div>
        <component
            :is="componentId"
            v-for="(product, index) in products"
            :key="product.id"
            :product="product"
            :headers="headers"
            :can-replace="canReplace"
            :countries="countries"
            :disabled="disabled"
            @on-price-change="changePrice($event, product)"
            @on-country-change="product.country = $event"
            @on-select-replace="onSelectReplace(product, index)"
        >
        </component>
        <application-product-replace
            :product="selectedProduct"
            @on-save="$emit('on-replace', $event)"
        ></application-product-replace>
    </div>
</template>
<script>
import ApplicationProduct from './ApplicationProduct.vue'
import ApplicationProductMobile from './ApplicationProductMobile.vue'
import ApplicationProductReplace from './ApplicationProductReplace.vue'

export default {
    components: { ApplicationProductReplace },
    name: 'application-products',
    components: {
        ApplicationProduct,
        ApplicationProductMobile,
        ApplicationProductReplace
    },
    props: {
        products: {
            type: [Object, Array],
            required: true
        },
        countries: {
            type: Array,
            required: true
        },
        isAuction: {
            type: Boolean,
            required: true
        },
        canReplace: {
            type: Boolean
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isMobile: false,
            selectedProduct: {}
        }
    },
    computed: {
        componentId() {
            return this.isMobile ? ApplicationProductMobile : ApplicationProduct
        },
        headers() {
            return [
                { text: 'Наименование позиции', value: 'name' },
                { text: 'Длина', value: 'quantity' },
                { text: 'Единица', value: 'measure' },
                { text: 'Валюта', value: 'currency' },
                { text: 'Стоимость за единицу', value: 'price_for_one' },
                { text: 'НДС', value: 'vat' },
                { text: 'Сумма за позицию', value: 'amount_per_position' },
                { text: 'Страна происхождения', value: 'country' }
            ]
        }
    },
    methods: {
        changePrice(value, product) {
            if (value <= 0.0) {
                this.$set(product, 'price_for_one', 1)
            } else {
                this.$set(product, 'price_for_one', value)
            }

            this.$set(
                product,
                'amount_per_position',
                parseFloat(
                    parseInt(product.quantity, 10) *
                        parseFloat(product.price_for_one, 10) *
                        (1 + parseInt(product.vat, 10) / 100)
                ).toFixed(2)
            )
        },
        onSelectReplace(product, index) {
            this.selectedProduct = product
            window.openPopupById('application-product-replace')
        }
    },
    created() {
        const mm = window.matchMedia('only screen and (max-width: 680px)')
        if (mm.matches) {
            this.isMobile = true
        }

        mm.addListener(mql => {
            if (mql.matches) {
                this.isMobile = true
            } else {
                this.isMobile = false
            }
        })
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-products {
    display: table;
    width: 100%;
    overflow-x: auto;

    &__header {
        display: table-header-group;
    }

    &__header-title {
        display: table-cell;
        padding-right: 72px;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: $colorGray;
        white-space: nowrap;

        &:last-child {
            padding: 0;
        }
    }
}
</style>
