<template>
    <div :class="classes">
        <div class="application-lot__header">
            <application-checkbox :value="lot.checked" @click="$emit('on-change', $event)"></application-checkbox>
            <div
                :class="['application-lot__title', { 'application-lot__title--disabled': !lot.checked }]"
                @click="toggleOpened"
            >
                <span>{{ lot.name }}</span>
                <span class="application-lot__amount"
                    >{{ lot.amountWithVat.replace('.00', '') | numberWithSpaces }} {{ lot.currency.symbol }}</span
                >
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#arrow-bottom"></use>
                </svg>
            </div>
        </div>
        <div class="application-lot__content">
            <div class="application-lot__country">
                <span>Страна происхождения Лота</span>
                <application-country-select
                    :countries="countries"
                    @on-select="$emit('on-country-change', $event)"
                ></application-country-select>
            </div>
            <application-products
                :products="lot.products"
                :is-auction="isAuction"
                :can-replace="canReplace"
                :countries="countries"
                @on-replace="replaceProduct"
            ></application-products>
        </div>
    </div>
</template>
<script>
import ApplicationCheckbox from './ApplicationCheckbox.vue'
import ApplicationProducts from './ApplicationProducts.vue'
import ApplicationCountrySelect from './ApplicationCountrySelect.vue'
export default {
    name: 'application-lot',
    components: {
        ApplicationCountrySelect,
        ApplicationCheckbox,
        ApplicationProducts
    },
    filters: {
        numberWithSpaces(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }
    },
    props: {
        lot: {
            type: Object,
            required: true
        },
        isAuction: {
            type: Boolean,
            required: true
        },
        countries: {
            type: Array,
            required: true
        },
        canReplace: {
            type: Boolean
        }
    },
    computed: {
        classes() {
            return ['application-lot', { 'application-lot--opened': this.isOpened }]
        }
    },
    data() {
        return {
            isOpened: false
        }
    },
    methods: {
        toggleOpened() {
            this.isOpened = !this.isOpened

            const element = this.$el.children[1]
            const sectionHeight = element.scrollHeight

            if (this.isOpened) {
                element.style.overflow = 'auto'
                requestAnimationFrame(() => {
                    element.style.height = sectionHeight + 'px'
                })
            } else {
                element.style.overflow = null
                requestAnimationFrame(() => {
                    element.style.height = 0 + 'px'
                })
            }
        },
        replaceProduct(value, products) {
            this.lot.products = this.lot.products.map(product => {
                if (product.id === value.id) {
                    product = value
                }

                return product
            })

            // this.lot
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.application-lot {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    margin-bottom: rem(32px);
    // overflow: hidden;

    &:last-child {
        margin-bottom: 0;
    }

    &--opened &__header {
        margin-bottom: rem(25px);

        svg {
            transform: rotate(0deg);
        }
    }

    &__header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
        max-width: 320px;

        .application-checkbox {
            margin: 0;
        }
    }

    &__title {
        display: flex;
        align-items: center;
        width: 100%;

        cursor: pointer;
        span {
            margin-right: rem(24px);
            transition: 0.3s;

            font-family: Roboto;
            font-weight: 700;
            font-size: rem(20px);
            color: $colorTextLight;
        }

        svg {
            width: 20px;
            height: 20px;
            margin-left: auto;
            transform: rotate(-90deg);
            transition: 0.3s;
        }

        &--disabled {
            span {
                color: $colorGray;
            }
        }
    }

    &__amount {
        margin: 0 rem(20px);
    }

    &__content {
        height: 0;
        width: 100%;
        transition: height 0.3s;
        overflow: hidden;
    }

    &__country {
        margin-bottom: rem(32px);

        span {
            font-family: Roboto;
            font-weight: 500;
            font-size: rem(14px);
            color: $colorGray;
            white-space: nowrap;
        }
    }
}
</style>
