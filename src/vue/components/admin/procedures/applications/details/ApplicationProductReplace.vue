<template>
    <div id="application-product-replace" class="popup">
        <div class="popup__body">
            <div class="product-replace popup__content">
                <div class="popup__close" @click="closeModal">
                    <svg class="sprite-close">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#close"></use>
                    </svg>
                </div>
                <div class="product-replace__content">
                    <application-title title="Замена позиций на аналоги" margin="0 0 32px 0"></application-title>
                    <div class="product-replace__row">
                        <div class="product-replace__input">
                            <select-input
                                is-single
                                close
                                placeholder="Выберите из списка"
                                v-model="replacementProduct.type"
                                label="Тип позиции"
                                :options="fieldsData.positionType"
                                disabled
                            ></select-input>
                        </div>
                        <div class="product-replace__input">
                            <select-input
                                is-single
                                close
                                v-model="replacementProduct.category_okpd2"
                                :options="fieldsData.OKPD2"
                                label="Раздел ОКПД2"
                                searchable
                                :search="searchOKPD2"
                                no-result="ОКПД-2 не найдены"
                            ></select-input>
                        </div>
                    </div>
                    <div class="product-replace__row">
                        <div class="product-replace__input">
                            <select-input
                                is-single
                                close
                                placeholder="Поиск"
                                v-model="replacementProduct.name"
                                :options="fieldsData.markSize"
                                label="Наименование позиции"
                                :searchable="true"
                                :loading="replacementProduct.loaderName"
                                :search="fetchCatalogMarksize"
                                no-result="Позиции не найдены"
                            ></select-input>
                        </div>
                        <div class="product-replace__input product-replace__input--small">
                            <text-input
                                v-model="replacementProduct.quantity"
                                :rules="{ required: true, numeric: true, min: 1 }"
                                label="Длина"
                                :input="countTotalPrice"
                            ></text-input>
                        </div>
                        <div class="product-replace__input product-replace__input--small">
                            <select-input
                                is-single
                                close
                                placeholder=""
                                v-model="replacementProduct.measure"
                                label="Единица"
                                :options="fieldsData.positionLongUnits"
                            ></select-input>
                        </div>
                        <div class="product-replace__input product-replace__input--small">
                            <select-input
                                is-single
                                close
                                placeholder=""
                                :disabled="true"
                                v-model="replacementProduct.currency"
                                label="Валюта"
                                :options="fieldsData.currency"
                            ></select-input>
                        </div>
                        <div class="product-replace__input product-replace__input--price">
                            <text-input
                                v-model="replacementProduct.price_for_one"
                                :rules="{ required: true, numeric: true, max: 12, min: 1 }"
                                label="Стоимость за единицу"
                                :input="countTotalPrice"
                            ></text-input>
                        </div>
                        <div class="product-replace__input product-replace__input--small">
                            <select-input
                                is-single
                                close
                                placeholder=""
                                v-model="replacementProduct.vat"
                                label="НДС"
                                disabled
                                :options="fieldsData.positionVAT"
                            ></select-input>
                        </div>
                        <div class="product-replace__input product-replace__input--price">
                            <text-input
                                disabled
                                v-model="replacementProduct.amount_per_position"
                                label="Сумма за позицию"
                            ></text-input>
                        </div>
                    </div>
                    <div class="product-replace__buttons">
                        <button class="product-replace__button" @click="saveReplace" :disabled="saveDisabled">
                            Сохранить
                        </button>
                        <button class="product-replace__button product-replace__button--cancel" @click="closeModal">
                            Отменить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/helpers/api'
import parses from '@/helpers/parsers'

import ApplicationTitle from '../ApplicationTitle'
import SelectInput from '../../../../forms/Select'
import TextInput from '../../../../forms/Input'
export default {
    name: 'application-product-replace',
    components: {
        ApplicationTitle,
        SelectInput,
        TextInput
    },
    mixins: [api, parses],
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            replacementProduct: {
                name: '',
                type: { id: 1, name: 'Товар' },
                category_okpd2: null,
                quantity: null,
                measure: null,
                currency: { name: 'Рубль', id: 'rub' },
                marksize_id: null,
                price_for_one: 0,
                vat: { id: 20, name: '20%' },
                amount_per_position: 0
            },
            fieldsData: {
                markSize: [],
                currency: [{ name: 'Рубль', id: 'rub' }],
                positionType: [{ id: 1, name: 'Товар' }],
                positionLongUnits: [
                    { id: 'm', name: 'м' },
                    { id: 'km', name: 'км' }
                ],
                positionVAT: [
                    { id: 0, name: '0%' },
                    { id: 10, name: '10%' },
                    { id: 20, name: '20%' }
                ],
                OKPD2: []
            }
        }
    },
    computed: {
        saveDisabled() {
            return (
                this.replacementProduct.name === '' ||
                !this.replacementProduct.category_okpd2 ||
                !this.replacementProduct.measure ||
                this.replacementProduct.amount_per_position <= 0
            )
        }
    },
    watch: {
        replacementProduct: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val.amount_per_position == 'NaN') {
                    this.replacementProduct.amount_per_position = 0
                }
            }
        }
    },
    methods: {
        closeModal() {
            window.closePopupById('application-product-replace')
        },
        searchOKPD2(string) {
            clearTimeout(this.searchOKPD2Counter)
            if (string && string.length > 2) {
                this.searchOKPD2Counter = setTimeout(() => {
                    this.searchProceduresOKPD2(string).then(({ data }) => {
                        this.fieldsData.OKPD2 = this.parseOKPD2(data.data)
                    })
                }, 1000)
            }
        },
        fetchCatalogMarksize(string) {
            clearTimeout(this.searchMarksizeCounter)
            if (string && string.length > 2) {
                this.searchMarksizeCounter = setTimeout(() => {
                    this.fetchCatalogMarksizeOKPD(string, this.replacementProduct.category_okpd2.id).then(
                        ({ data }) => {
                            this.fieldsData.markSize = data.data
                        }
                    )
                }, 1000)
            }
        },
        countTotalPrice() {
            this.$set(
                this.replacementProduct,
                'amount_per_position',
                parseFloat(
                    parseInt(this.replacementProduct?.quantity ?? 0, 10) *
                        parseFloat(this.replacementProduct?.price_for_one ?? 0, 10) *
                        (1 + parseInt(this.replacementProduct.vat.id, 10) / 100)
                ).toFixed(2)
            )
        },
        saveReplace() {
            const savedProduct = {
                id: this.product.id,
                is_product: this.product.is_product,
                availability_of_analogues: this.product.availability_of_analogues,
                lot: this.product.lot,
                name: this.replacementProduct.name.name,
                category_okpd2: this.replacementProduct.category_okpd2.code,
                quantity: this.replacementProduct.quantity,
                measure: this.replacementProduct.measure.id,
                currency: this.replacementProduct.currency.id,
                marksize_id: this.replacementProduct.name.id,
                price_for_one: this.replacementProduct.price_for_one,
                vat: this.replacementProduct.vat.id,
                amount_per_position: this.replacementProduct.amount_per_position,
                country: this.product.country
            }

            this.$emit('on-save', savedProduct)
            this.closeModal()
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.product-replace {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    position: relative;

    width: 100%;
    max-width: 1322px;
    margin: rem(20px);
    padding: 0;
    background-color: #fff;
    border-radius: 6px;

    .popup__close {
        display: flex;
        justify-content: center;
        align-items: center;

        top: 0;
        right: 0;

        width: 40px;
        height: 40px;
        background-color: $colorTurquoise !important;
        border-radius: 0px 6px 0px 0px;

        svg {
            width: 20px;
            height: 20px;
            fill: #fff;
        }
    }

    &__content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        padding: rem(38px) rem(48px) rem(48px);
    }

    &__row {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        width: 100%;
        margin-bottom: rem(24px);

        @include mq($until: tablet) {
            flex-direction: column;
        }
    }

    &__input {
        width: 100%;
        max-width: 295px;
        margin-right: rem(16px);

        &--small {
            max-width: 110px;
        }

        &--price {
            max-width: 195px;
        }

        &:last-child {
            margin-right: 0;
        }
    }

    &__buttons {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
    }

    &__button {
        width: 100%;
        max-width: 128px;
        margin-right: rem(16px);
        padding: rem(13px) 0;
        background-color: $colorTurquoise;
        border-radius: 6px;
        border: 1px solid $colorTurquoise;
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #ffffff;

        &:active,
        &:hover {
            background-color: lighten($color: $colorTurquoise, $amount: 5%);
        }

        &:disabled {
            border: 1px solid $colorGray;
            background-color: transparent;
            color: $colorGray;

            &:hover {
                background-color: lighten($color: $colorGray, $amount: 25%);
            }
        }

        &--cancel {
            margin: 0;
            background-color: transparent;
            color: $colorTurquoise;
            border: 1px solid $colorTurquoise;

            &:active,
            &:hover {
                background-color: lighten($color: #f4f4f4, $amount: 1%);
            }
        }
    }
}
</style>
