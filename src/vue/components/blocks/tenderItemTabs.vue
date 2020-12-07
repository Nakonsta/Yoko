<template>
    <div class="tender-item__tabs">
        <div class="tender-item__tabs-row">
            <div :class="[activeTab == 'main-info' ? 'tender-item__tab-item--active' : '', 'tender-item__tab-item']" data-tab="main-info">
                <span @click="changeActiveTab('main-info')" class="tender-item__tab-link">
                    Общая информация
                </span>
            </div>
            <div :class="[activeTab == 'client' ? 'tender-item__tab-item--active' : '', 'tender-item__tab-item']" data-tab="client">
                <span @click="changeActiveTab('client')" class="tender-item__tab-link">Заказчик</span>
            </div>
            <div class="tender-item__tab-item">
                <span class="tender-item__tab-link">Список лотов</span>
            </div>
            <div class="tender-item__tab-item">
                <span class="tender-item__tab-link">Документы</span>
            </div>
            <div class="tender-item__tab-item">
                <span class="tender-item__tab-link">Разъяснения</span>
            </div>
            <div class="tender-item__tab-item">
                <span class="tender-item__tab-link">Протоколы</span>
            </div>
            <div class="tender-item__tab-item">
                <span class="tender-item__tab-link">Журнал событий</span>
            </div>
        </div>
        <div class="tender-item__tabs-content">
            <div :class="[activeTab == 'main-info' ? 'tender-item__tab--active' : '', 'tender-item__tab']" data-tab="main-info">
                <TenderItemMainTab :tenderItemData="tenderItemData" :company="company" />
            </div>
            <div :class="[activeTab == 'client' ? 'tender-item__tab--active' : '', 'tender-item__tab']" data-tab="main-info">
                <TenderItemClientTab :tenderItemData="tenderItemData" :company="company" />
            </div>
        </div>
    </div>
</template>

<script>
import TenderItemMainTab from './tenderItemTabs/tenderItemMainTab.vue'
import TenderItemClientTab from './tenderItemTabs/tenderItemClientTab.vue'

export default {
    name: 'TenderItemTabs',

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        },
        company: {
            type: Object,
            required: true,
        },
        activeTab: {
            type: String,
            required: true,
        }
    },

    components: {
        TenderItemMainTab,
        TenderItemClientTab,
    },

    created() {

    },

    methods: {
        changeActiveTab(tab) {
            window.location.hash = tab;
            this.$emit('changeTab', tab);
            return false;
        },
        checkUrlHash() {

        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-item {
        &__tabs {
            padding-top: rem(79px);
            &-row {
                display: flex;
                border-bottom: 1px solid #D3D3D3;
                margin-bottom: rem(40px);
            }
            &-content {
                background-color: $colorWhite;
                border-radius: 6px;
                padding: rem(40px);
            }
        }
        &__tab {
            display: none;
            &--active {
                display: block;
            }
            &-item {
                margin-right: rem(16px);
                padding: 0 rem(20px) rem(15px);
                border-bottom: 1px solid transparent;
                &--active {
                    border-bottom-color: $colorTurquoise;
                    .tender-item__tab-link {
                        color: $colorTurquoise;
                        cursor: default;
                    }
                }
            }
            &-link {
                text-transform: uppercase;
                font-family: "Gilroy-SemiBold", sans-serif;
                font-size: rem(14px);
                line-height: 160%;
                letter-spacing: 0.05em;
                color: $colorGray;
                cursor: pointer;
                &:hover,
                &:focus {
                    color: $colorTurquoise;
                }
            }
        }
    }
</style>