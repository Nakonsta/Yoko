<template>
    <div class="cable-info">
        <div class="table-cell__title cable-info__title">
            <span class="cable-info__title-text">
                {{ item.title }}
            </span>
        </div>
        <div class="table-cell__quantity cable-info__quantity">
            <span v-if="item.quantity">
                {{ item.quantity }} м
            </span>
            <span v-else>
                под заказ
            </span>
        </div>
        <div class="table-cell__price cable-info__price">
            <span v-if="item.price">
                {{ item.price }} &#8381;
            </span>
        </div>
        <div v-if="item.documents" class="table-cell__certificates cable-info__certificates">
            <span v-if="item.documents">
                <!-- Здесь надо написать вывод сертификатов, пока они не приходят -->
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MarkSizeCard',

    props: {
        item: {
            type: Object,
            required: true,
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
        align-items: center;
        padding: rem(27px) 0;
        border-bottom: 1px solid $borderColor;
        color: $lightcolorText;
        font-weight: 500;
        &__title-text {
            display: inline-block;
            font-size: rem(14px);
            border: 1px solid #D3D3D3;
            border-radius: 4px;
            padding: rem(10px) rem(32px);
        }
        &__quantity {
            font-size: rem(14px);
        }
        &__price {
            font-size: rem(16px);
            color: $colorTurquoise;
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
        &__certificates {
            width: 35%;
        }
    }

</style>