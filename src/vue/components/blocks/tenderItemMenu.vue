<template>
    <div class="tender-item__menu">
        <div class="tender-item__menu-inner">
            <div :class="[activeTab == 'main-info' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeChange('main-info')" class="tender-item__menu-link">Общая информация</span>
            </div>
            <div :class="[activeTab == 'client' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeChange('client')" class="tender-item__menu-link">Заказчик</span>
            </div>
            <div :class="[activeTab == 'lots' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeChange('lots')" class="tender-item__menu-link">Список лотов</span>
            </div>
            <div :class="[activeTab == 'documents' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeChange('documents')" class="tender-item__menu-link">Документы</span>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Разъяснения</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Протоколы</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Журнал событий</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TenderItemMenu',

    props: {
        activeTab: {
            type: String,
            required: true,
        }
    },

    methods: {
        changeChange(tab) {
            window.location.hash = tab;
            this.$emit('changeTab', tab);
            return false;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-item__menu {
        width: 315px;
        flex-shrink: 0;
        padding: rem(20px) rem(32px);
        background-color: #fff;
        &-item {
            padding: rem(12px) 0;
            border-bottom: 1px solid $borderColor;
            &:last-child {
                border-bottom: none;
            }
            &--active .tender-item__menu-link {
                color: $colorTurquoise;
            }
        }
        &-link {
            font-size: rem(14px);
            line-height: 160%;
            color: $lightcolorText;
            cursor: pointer;
            &:hover,
            &:focus {
                color: $colorTurquoise;
            }
        }
    }
</style>