<template>
    <div class="cable-info">
        <div class="table-cell__title cable-info__title" data-name="Наименование позиции">
            <span class="cable-info__title-text">
                {{ item.marksize_id }}
            </span>
        </div>
        <div class="table-cell__quantity cable-info__quantity" :data-name="item.quantity ? 'Длина' : ''">
            <span v-if="item.quantity">
                {{ item.quantity }}
            </span>     
        </div>
        <div class="table-cell__measure cable-info__measure" :data-name="item.measure ? 'Единица' : ''">
            <span v-if="item.measure">
                {{ measures[item.measure] }}       
            </span>
        </div>
        <div class="table-cell__sum cable-info__sum" :data-name="item.quantity ? 'Сумма за позицию' : ''">
            <span v-if="item.price_for_one">
                {{ item.price_for_one }} &#8381;
            </span>
        </div>
        <div class="table-cell__vat cable-info__vat" :data-name="item.measure ? 'НДС' : ''">
            <span v-if="item.vat">
                {{ item.vat }} %
            </span>
        </div>
        <div class="table-cell__analogues cable-info__analogues" :data-name="item.measure ? 'Аналог' : ''">
            {{ item.availability_of_analogues ? 'да' : 'нет' }}       
        </div>
    </div>
</template>

<script>
export default {
    name: 'TenderItemProductCard',

    props: {
        item: {
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
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";
    
    .cable-info {
        display: flex;
        font-weight: 500;
        font-size: 14px;
        line-height: 160%;
        color: $lightcolorText;
        padding: rem(24px) 0;
        border-bottom: 1px solid $borderColor;
    }
    .table-cell {
        &__title {
            width: 20%;
        }
        &__quantity {
            width: 20%;
        }
        &__measure {
            width: 20%;
        }
        &__sum {
            width: 20%;
        }
        &__vat {
            width: 20%;
        }
        &__analogues {
            width: 20%;
        }
    }

    @include mq($until: widescreen) {
        .table-cell {
            &__title {
                width: 30%;
            }
            &__quantity {
                width: 15%;
            }
            &__measure {
                width: 20%;
            }
            &__sum {
                width: 20%;
            }
            &__vat {
                width: 20%;
            }
            &__analogues {
                width: 15%;
            }
        }
    }

</style>