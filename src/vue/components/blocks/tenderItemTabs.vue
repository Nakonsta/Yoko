<template>
    <div class="tender-item__tabs">
        <div class="tender-item__tabs-row">
            <div class="tender-item__tab-item tender-item__tab-item--active">
                <a href="#" class="tender-item__tab-link tender-item__tab-link--active" data-tab="main-info">
                    Общая информация
                </a>
            </div>
            <div class="tender-item__tab-item">
                <a href="#" class="tender-item__tab-link">Заказчик</a>
            </div>
            <div class="tender-item__tab-item">
                <a href="#" class="tender-item__tab-link">Список лотов</a>
            </div>
            <div class="tender-item__tab-item">
                <a href="#" class="tender-item__tab-link">Документы</a>
            </div>
            <div class="tender-item__tab-item">
                <a href="#" class="tender-item__tab-link">Разъяснения</a>
            </div>
            <div class="tender-item__tab-item">
                <a href="#" class="tender-item__tab-link">Протоколы</a>
            </div>
            <div class="tender-item__tab-item">
                <a href="#" class="tender-item__tab-link">Журнал событий</a>
            </div>
        </div>
        <div class="tender-item__tabs-content">
            <div class="tender-item__tab tender-item__tab--active" data-tab="main-info">
                <TenderItemMainTab :tenderItemData="tenderItemData" :company="company" />
            </div>
        </div>
    </div>
</template>

<script>
import TenderItemMainTab from './tenderItemTabs/tenderItemMainTab.vue'
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
        }
    },

    components: {
        TenderItemMainTab,
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
            &-item {
                margin-right: rem(16px);
                padding: 0 rem(20px) rem(15px);
                border-bottom: 1px solid transparent;
                &--active {
                    border-bottom-color: $colorTurquoise;
                }
            }
            &-link {
                text-transform: uppercase;
                font-family: "Gilroy-SemiBold", sans-serif;
                font-size: rem(14px);
                line-height: 160%;
                letter-spacing: 0.05em;
                color: $colorGray;
                &--active {
                    color: $colorTurquoise;
                }
                &:hover,
                &:focus {
                    color: $colorTurquoise;
                }
            }
        }
    }
</style>