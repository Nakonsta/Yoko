<template>
    <div class="tender-item__lots">
        <div class="tender-item__lots-block">
            <div class="tender-item__lots-rows">
                <div v-for="(lot, index) in tenderItemData.purchase_subject.lot_amounts" :key="index" class="tender-item__lot">
                    <div class="tender-item__lot-title">
                        <div class="tender-item__lot-item tender-item__lot-num">
                            Лот {{ index + 1 }}
                        </div>
                        <div class="tender-item__lot-item tender-item__lot-price">
                            {{ formatPriceWithCurrency(lot, tenderItemData.purchase_currency) }}
                        </div>
                    </div>
                    <div class="tender-item__lot-table">
                        <div class="tender-item__lot-header-row">
                            <div class="tender-item__lot-header tender-item__lot-name">
                                Наименование позиции
                            </div>
                            <div class="tender-item__lot-header tender-item__lot-length">
                                Длина
                            </div>
                            <div class="tender-item__lot-header tender-item__lot-measure">
                                Единица
                            </div>
                            <div class="tender-item__lot-header tender-item__lot-sum">
                                Сумма за позицию
                            </div>
                            <div class="tender-item__lot-header tender-item__lot-vat">
                                НДС
                            </div>
                            <div class="tender-item__lot-header tender-item__lot-analogue">
                                Аналог
                            </div>
                        </div>
                        <div class="tender-item__lot-products">
                            <div v-for="(product, key) in filterProductsToLots(tenderItemData.purchase_subject.products, index + 1)" :key="key" class="tender-item__lot-product-row">
                                <div class="tender-item__lot-product tender-item__lot-name" :data-name="product.marksize_id ? 'Наименование' : ''">
                                    {{ product.marksize_id }}
                                </div>
                                <div class="tender-item__lot-product tender-item__lot-length" :data-name="product.quantity ? 'Длина' : ''">
                                    {{ product.quantity }}
                                </div>
                                <div class="tender-item__lot-product tender-item__lot-measure" :data-name="product.measure ? 'Единица' : ''">
                                    {{ measures[product.measure] }}
                                </div>
                                <div class="tender-item__lot-product tender-item__lot-sum" :data-name="product.price_for_one ? 'Сумма за позицию' : ''">
                                    {{ formatPriceWithCurrency(product.price_for_one, product.currency) }}
                                </div>
                                <div class="tender-item__lot-product tender-item__lot-vat" :data-name="product.vat ? 'НДС' : ''">
                                    {{ product.vat }} %
                                </div>
                                <div class="tender-item__lot-product tender-item__lot-analogue" data-name="Аналог">
                                    {{ product.availability_of_analogues ? 'Да' : 'Нет' }}
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import functions from "@/helpers/functions";

export default {
    name: 'TenderItemLotsTab',

    mixins: [functions],

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            measures: {
                m: 'м',
                item: 'шт.'
            }
        }
    },

    methods: {
        filterProductsToLots(products, lotNumber) {
            let filteredProducts = products.filter(product => product.lot == lotNumber)
            return filteredProducts
        }
    }
}
</script>