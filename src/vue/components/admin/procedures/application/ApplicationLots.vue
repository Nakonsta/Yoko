<template>
    <div class="application-lots">
        <application-lot
            v-for="lot in lots"
            :key="lot.name"
            :lot="lot"
            :is-auction="isAuction"
            :can-replace="canReplace"
            :countries="countries"
            @on-change="lot.checked = $event"
            @on-country-change="changeCountry($event, lot)"
        ></application-lot>
    </div>
</template>
<script>
import ApplicationLot from './ApplicationLot.vue'
import api from '../../../../helpers/api'
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

                if (this.lots?.[0]?.products?.[0]?.country instanceof String) {
                    this.lots.forEach(lot => {
                        lot.products.forEach(product => {
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
