<template>
    <div class="tender-item__tabs">
        <div class="tabs tabs--line js-tabs js-more" ref="tabs" v-if="tabs">
            <ul class="js-more__items">
                <li
                        v-for="item in tabs"
                        :key="item.url"
                        class="js-more__item"
                >
                    <a :href="item.url" @click="changeActiveTab($event, item.url)">{{ item.name }}</a>
                </li>
                <li class="js-more__btn hidden">
                    <button type="button" aria-haspopup="true" aria-expanded="false">
                        <svg class="sprite-dropdown">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#dropdown"></use>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
        <div class="tabs__content" id="info" data-print-title="Общая информация">
            <TenderItemMainTab :tenderItemData="tenderItemData" :company="company" />
        </div>
        <div class="tabs__content no-print" id="client" data-print-title="Заказчик">
            <TenderItemClientTab :company="company" />
        </div>
        <div class="tabs__content no-print" id="lots" data-print-title="Список лотов" v-if="tenderItemData.tender_trading_format === 'trading_223'">
            <TenderItemLotsTab :tenderItemData="tenderItemData" />
        </div>
        <div class="tabs__content no-print" id="documents" data-print-title="Документы">
            <TenderItemDocumentsTab :tenderItemData="tenderItemData" />
        </div>
        <div class="tabs__content tabs__content--plane no-print" id="chat" data-print-title="Разъяснения" v-if="tenderItemData.tender_trading_format === 'trading_223'">
            <TenderItemChatTab :tenderItemData="tenderItemData" :company="company" />
        </div>
        <div class="tabs__content no-print" id="protocols" data-print-title="Протоколы" v-if="tenderItemData.tender_trading_format === 'trading_223'">
            <TenderItemProtocolsTab :tenderItemData="tenderItemData" />
        </div>
        <div class="tabs__content no-print" id="logs" data-print-title="Журнал событий">
            <TenderItemLogsTab :tenderItemData="tenderItemData" />
        </div>
    </div>
</template>

<script>
import TenderItemMainTab from './tenderItemTabs/tenderItemMainTab.vue'
import TenderItemClientTab from './tenderItemTabs/tenderItemClientTab.vue'
import TenderItemLotsTab from './tenderItemTabs/tenderItemLotsTab.vue'
import TenderItemDocumentsTab from './tenderItemTabs/tenderItemDocumentsTab.vue'
import TenderItemProtocolsTab from './tenderItemTabs/tenderItemProtocolsTab.vue'
import TenderItemLogsTab from './tenderItemTabs/tenderItemLogsTab.vue'
import TenderItemChatTab from './tenderItemTabs/tenderItemChatTab.vue'

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
        tabs: {
            type: Array,
            default: () => [],
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
        TenderItemDocumentsTab,
        TenderItemProtocolsTab,
        TenderItemLogsTab,
        TenderItemChatTab
    },

    created() {

    },

    methods: {
        changeActiveTab(evt, hash) {
            evt.preventDefault();
            this.$emit('changeTab', evt, hash);
        },
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
            @include mq($from: tablet) {
                padding-top: rem(80px);
            }
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
                font-family: $fontGilroy;
                font-size: rem(14px);
                line-height: 160%;
                letter-spacing: 0.05em;
                color: $colorGray;
                white-space: nowrap;
                cursor: pointer;
                &:hover,
                &:focus {
                    color: $colorTurquoise;
                }
            }
        }
    }

    @include mq($until: widescreen) {
        .tender-item {
            &__tabs {
                &-row {
                    overflow-x: auto;
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
            border-bottom: 1px solid $colorBdr;
            margin-bottom: rem(40px);
            @media print {
                border-bottom: 0;
            }
        }
        &-title {
            color: $colorTurquoise;
            font-weight: 500;
            font-size: rem(18px);
            line-height: rem(24px);
            padding-bottom: rem(12px);
            border-bottom: 1px solid $colorBdr;
            margin-bottom: rem(8px);
            @media print {
                color: $colorGray;
            }
        }
        &-row {
            display: flex;
            padding: rem(14px) 0;
            font-size: rem(14px);
            line-height: rem(20px);
            color: $colorTextLight;
            @media print {
                padding: rem(5px) 0;
            }
            &-name {
                width: 420px;
                flex-shrink: 0;
                padding-right: 68px;
                font-weight: 500;
                @media print {
                    width: 40%;
                    padding-right: rem(24px);
                }
            }
            &-link {
                display: flex;
                align-items: center;
                color: $colorTurquoise;
                @media print {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                svg {
                    fill: $colorTurquoise;
                }
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
        color: $colorTextLight;
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
                border-bottom: 1px solid $colorBdr;
                @media print {
                    padding: rem(5px) 0;
                }
                &:last-child {
                    border: none;
                }
            }
        }
    }

    .tender-item__protocol {
        padding-bottom: rem(32px);
        &-title {
            font-weight: 700;
            font-size: rem(20px);
            padding-bottom: 1rem;
        }
        &-header {
            width: 33%;
            @media print {
                width: 40%;
            }
            &-row {
                display: flex;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                color: $colorGray;
                /*border-bottom: 1px solid $colorBdr;*/
                padding-bottom: rem(12px);
            }
        }
        &-item {
            width: 33%;
            @media print {
                width: 40%;
            }
            &-row {
                display: flex;
                padding: rem(24px) 0;
                border-bottom: 1px solid $colorBdr;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                @media print {
                    padding: rem(5px) 0;
                }
                &:last-child {
                    border: none;
                }
            }
        }
        &-link {
            color: $colorTurquoise;
            text-decoration: underline;
            @media print {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        &-attach-block {
            padding-bottom: 2rem;
        }
    }

    .tender-item__file {
        padding-bottom: rem(24px);
        color: $colorTextLight;
        &-header {
            width: 33%;
            @media print {
                width: 40%;
            }
            &-row {
                display: flex;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                color: $colorGray;
                padding-bottom: rem(12px);
                /*border-bottom: 1px solid $colorBdr;*/
            }
        }
        &-item {
            width: 33%;
            @media print {
                width: 40%;
            }
            &-row {
                display: flex;
                border-bottom: 1px solid $colorBdr;
                padding: rem(16px) 0;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                @media print {
                    padding: rem(5px) 0;
                }
                &:last-child {
                    border: none;
                }
            }
        }
        &-link {
            color: $colorTurquoise;
            text-decoration: underline;
            @media print {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .tender-item__log {
        padding-bottom: rem(24px);
        color: $colorTextLight;
        &-header {
            &-row {
                display: flex;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                color: $colorGray;
                padding-bottom: rem(12px);
                /*border-bottom: 1px solid $colorBdr;*/
            }
        }
        &-item {
            &-row {
                display: flex;
                border-bottom: 1px solid $colorBdr;
                padding: rem(16px) 0;
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                @media print {
                    padding: rem(5px) 0;
                }
                &:last-child {
                    border: none;
                }
            }
        }
        &-date {
            width: 33%;
            @media print {
                width: 40%;
            }
        }
        &-name {
            width: 67%;
            @media print {
                width: 60%;
            }
        }
    }

    @include mq($until: widescreen) {
        .tender-item {
            &__file {
                &-document {
                    width: 60%;
                }
            }
        }
    }

    @include mq($until: desktop) {
        .tender-item {
            &__tab {
                &-row-name {
                    width: 250px;
                    padding-right: 2rem;
                }
            }
        }
    }

    @include mq($until: 767px) {
        .tender-item {
            &__lot {
                &-header {
                    &-row {
                        display: none;
                    }
                }
                &-product {
                    &-row {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
                &-name,
                &-length,
                &-measure,
                &-sum,
                &-vat,
                &-analogue {
                    position: relative;
                    padding: rem(8px) 0 rem(8px) rem(155px);
                    width: 100%;
                    &::before {
                        content: attr(data-name);
                        position: absolute;
                        top: rem(8px);
                        left: 0;
                        font-size: rem(14px);
                        font-weight: 500;
                        color: $colorGray;
                    }
                }
            }
        }
    }

    @include mq($until: 575px) {
        .tender-item {
            &__tab {
                &-row {
                    flex-direction: column;
                    &-name {
                        width: 100%;
                        &--company {
                            padding-bottom: 0.5rem;
                        }
                    }
                }
            }
            &__file {
                &-header {
                    &-row {
                        display: none;
                    }
                }
                &-item {
                    &-row {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
                &-name,
                &-date {
                    position: relative;
                    padding: rem(8px) 0 rem(8px) rem(120px);
                    width: 100%;
                    word-wrap: break-word;
                    &::before {
                        content: attr(data-name);
                        position: absolute;
                        top: rem(8px);
                        left: 0;
                        font-size: rem(14px);
                        font-weight: 500;
                        color: $colorGray;
                    }
                }
            }
            &__protocol {
                &-title {
                    font-size: rem(18px);
                    line-height: rem(24px);
                }
                &-header {
                    &-row {
                        display: none;
                    }
                }
                &-item {
                    &-row {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
                &-name,
                &-created {
                    position: relative;
                    padding: rem(8px) 0 rem(8px) rem(120px);
                    width: 100%;
                    word-wrap: break-word;
                    &::before {
                        content: attr(data-name);
                        position: absolute;
                        top: rem(8px);
                        left: 0;
                        font-size: rem(14px);
                        font-weight: 500;
                        color: $colorGray;
                    }
                }
            }
            &__log {
                &-header {
                    &-row {
                        display: none;
                    }
                }
                &-item {
                    &-row {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
                &-name,
                &-date {
                    position: relative;
                    padding: rem(8px) 0 rem(8px) rem(120px);
                    width: 100%;
                    word-wrap: break-word;
                    &::before {
                        content: attr(data-name);
                        position: absolute;
                        top: rem(8px);
                        left: 0;
                        font-size: rem(14px);
                        font-weight: 500;
                        color: $colorGray;
                    }
                }
            }
        }
    }

</style>