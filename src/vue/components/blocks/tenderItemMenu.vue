<template>
    <div class="tender-item__menu">
        <div class="tender-item__menu-inner">
            <div :class="[activeTab == 'main-info' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeActualTab('main-info')" class="tender-item__menu-link">Общая информация</span>
            </div>
            <div :class="[activeTab == 'client' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeActualTab('client')" class="tender-item__menu-link">Заказчик</span>
            </div>
            <div :class="[activeTab == 'lots' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeActualTab('lots')" class="tender-item__menu-link">Список лотов</span>
            </div>
            <div :class="[activeTab == 'documents' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeActualTab('documents')" class="tender-item__menu-link">Документы</span>
            </div>
            <div :class="[activeTab == 'chat' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeActualTab('chat')" class="tender-item__menu-link">Разъяснения</span>
            </div>
            <div :class="[activeTab == 'protocols' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeActualTab('protocols')" class="tender-item__menu-link">Протоколы</span>
            </div>
            <div :class="[activeTab == 'logs' ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']">
                <span @click="changeActualTab('logs')" class="tender-item__menu-link">Журнал событий</span>
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
        changeActualTab(tab) {
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

    @include mq($until: widescreen) {
        .tender-item__menu {
            width: 296px;
        }
    }

    @include mq($until: desktop) {
        .tender-item__menu {
            width: 100%;
            margin-bottom: 2rem;
        }
    }
</style>