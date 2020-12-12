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
            <div :class="[activeTab == 'lots' ? 'tender-item__tab-item--active' : '', 'tender-item__tab-item']" data-tab="lots">
                <span @click="changeActiveTab('lots')" class="tender-item__tab-link">Список лотов</span>
            </div>
            <div :class="[activeTab == 'documents' ? 'tender-item__tab-item--active' : '', 'tender-item__tab-item']" data-tab="documents">
                <span @click="changeActiveTab('documents')" class="tender-item__tab-link">Документы</span>
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
            <div :class="[activeTab == 'client' ? 'tender-item__tab--active' : '', 'tender-item__tab']" data-tab="client">
                <TenderItemClientTab :company="company" />
            </div>
            <div :class="[activeTab == 'lots' ? 'tender-item__tab--active' : '', 'tender-item__tab']" data-tab="lots">
                <TenderItemLotsTab :tenderItemData="tenderItemData" />
            </div>
            <div :class="[activeTab == 'documents' ? 'tender-item__tab--active' : '', 'tender-item__tab']" data-tab="documents">
                <TenderItemDocumentsTab :tenderItemData="tenderItemData" :company="company" />
            </div>
        </div>
    </div>
</template>

<script>
import TenderItemMainTab from './tenderItemTabs/tenderItemMainTab.vue'
import TenderItemClientTab from './tenderItemTabs/tenderItemClientTab.vue'
import TenderItemLotsTab from './tenderItemTabs/tenderItemLotsTab.vue'
import TenderItemDocumentsTab from './tenderItemTabs/tenderItemDocumentsTab.vue'

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
        TenderItemLotsTab,
        TenderItemDocumentsTab
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

<style lang="scss">
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-item__tab {
        &-block {
            border-bottom: 1px solid $borderColor;
            margin-bottom: rem(40px);
        }
        &-title {
            color: $colorTurquoise;
            font-weight: 500;
            font-size: rem(18px);
            line-height: rem(24px);
            padding-bottom: rem(12px);
            border-bottom: 1px solid $borderColor;
            margin-bottom: rem(8px);
        }
        &-row {
            display: flex;
            padding: rem(14px) 0;
            font-size: rem(14px);
            line-height: rem(20px);
            color: $lightcolorText;
            &-name {
                width: 420px;
                flex-shrink: 0;
                padding-right: 68px;
                font-weight: 500;                
            }
            &-link {
                display: flex;
                align-items: center;
                color: $colorTurquoise;
            }
            &-svg {
                margin-right: rem(7px);
            }
            &-value {
                &--flex {
                    display: flex;
                    align-items: center;
                }
            }
            &-svg {
                margin-right: rem(4px);
            }
        }
    }

    .tender-item__lot {
        padding-bottom: rem(24px);
        color: $lightcolorText;
        &-title {
            display: flex;
            font-weight: 700;
            font-size: rem(20px);
            padding-bottom: 1rem;
        }
        &-num {
            padding-right: rem(24px);
        }
        &-header {
            width: 17%;
            &-row {
                display: flex;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                color: $colorGray;
            }
        }
        &-product {
            width: 17%;
            &-row {
                display: flex;
                padding: rem(24px) 0;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                border-bottom: 1px solid $borderColor;
            }
        }
    }
</style>