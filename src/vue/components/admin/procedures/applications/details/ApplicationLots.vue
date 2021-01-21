<template>
    <div class="application-lots">
        <application-lot
            v-for="lot in lots"
            :key="lot.name"
            :lot="lot"
            :is-auction="isAuction"
            :can-replace="canReplace"
            :countries="countries"
            :disabled="disabled"
            :errors="errors"
            @on-change=";(lot.checked = $event), $emit('on-check')"
            @on-country-change="changeCountry($event, lot)"
        ></application-lot>
    </div>
</template>
<script>
import api from '@/helpers/api'

import ApplicationLot from './ApplicationLot.vue'
export default {
    name: 'application-lots',
    components: {
        ApplicationLot
    },
    mixins: [api],
    props: {
        lots: {
            type: [Object, Array],
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
            type: Boolean
        },
        errors: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            countries: []
        }
    },
    methods: {
        changeCountry(value, lot) {
            lot.country = value
            lot.products.map(product => {
                this.$set(product, 'country', value)
            })
        },
        getCountries() {
            this.fetchCountries().then(({ data }) => {
                this.countries = data.data

                if (typeof this.lots?.[0]?.products?.[0]?.country == 'string') {
                    this.lots.forEach(lot => {
                        lot.products.map(product => {
                            product.country = this.countries.filter(
                                country =>
                                    country.code === product.country ||
                                    JSON.stringify(country) === JSON.stringify(product.country)
                            )[0]
                        })
                    })
                }
            })
        }
    },
    created() {
        this.getCountries()
    }
}
</script>
<style lang="scss" scoped>
.application-lots {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
}
</style>
