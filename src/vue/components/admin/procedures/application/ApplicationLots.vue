<template>
    <div class="application-lots">
        <application-lot
            v-for="lot in lots"
            :key="lot.name"
            :lot="lot"
            :is-auction="isAuction"
            :can-replace="canReplace"
            @on-change="lot.checked = $event"
            @on-country-change="changeCountry($event, lot)"
        ></application-lot>
    </div>
</template>
<script>
import ApplicationLot from './ApplicationLot.vue'
export default {
    name: 'application-lots',
    components: {
        ApplicationLot
    },
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
    methods: {
        changeCountry(value, lot) {
            lot.country = value
            lot.products.map(product => {
                this.$set(product, 'country', value)
                // product.country = value
            })

            console.log(lot)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.application-lots {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
}
</style>
