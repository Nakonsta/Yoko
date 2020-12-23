<template>
    <div class="accreditations__sort" @click="changeSortType">
        <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#sort"></use>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'accreditations-sort',
    data() {
        return {
            orderDir: 'DESC'
        }
    },
    methods: {
        changeSortType() {
            this.orderDir = this.orderDir === 'DESC' ? 'ASC' : 'DESC'

            this.$emit('on-sort', this.orderDir)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.accreditations {
    &__sort {
        width: 20px;
        height: 20px;
        margin-right: rem(25px);
        cursor: pointer;
        transition: 0.3s;

        svg {
            width: 20px;
            height: 20px;
        }

        &:hover {
            filter: brightness(0.85);
        }
    }
}
</style>
