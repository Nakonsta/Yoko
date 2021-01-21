<template>
    <div class="tender-item__menu">
        <!-- <div v-if="$store.getters.userRole === 'buyer' && this.$store.getters.companyBuyer.find((firm) => firm.inn === company.inn)" class="tender-item__menu-inner"> -->
        <div v-if="true" class="tender-item__menu-inner">    
            <div
                    v-for="(item, key) in buyerMenu"
                    :key="key"
                    class="tender-item__menu-item"
            >
                <span @click="applyBuyerMenuAction($event, item.action)" class="tender-item__menu-link">{{ item.name }}</span>
            </div>
        </div>
        <div v-else class="tender-item__menu-inner">
            <div
                    v-for="item in tabs"
                    :key="item.url"
                    class="js-more__item"
                    :class="[activeTab === item.url ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']"
            >
                <a :href="item.url" @click="changeActiveTab($event, item.url)" class="tender-item__menu-link">{{ item.name }}</a>
            </div>
        </div>
        <div class="tender-item__menu-rebidding">
            <a href="#" class="btn btn--bdr">Объявить переторжку</a>
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
        },
        tabs: {
            type: Array,
            default: () => [],
            required: true,
        },
        buyerMenu: {
            type: Array,
            default: () => [],
            required: true,
        },
        tenderItemData: {
            type: Object,
            required: true,
        },
        company: {
            type: Object,
            required: true,
        },
    },

    methods: {
        changeActiveTab(evt, hash) {
            evt.preventDefault();
            this.$emit('changeTab', evt, hash, true);
        },
        applyBuyerMenuAction(evt, action) {
            if (action === 'edit') {
                const href = '/personal/procedures/' + this.tenderItemData.id
                document.location.href = href
            }
            if (action === 'attach-protocols') {
                this.changeActiveTab(evt, '#protocols')
            }
            if (action === 'winner') {
                evt.preventDefault();
                this.$emit('chooseWinner', true);
            }
            // if (action === 'return') {
            //     evt.preventDefault();
            //     this.$emit('chooseWinner', false);
            // }
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
        @include mq($until: widescreen) {
            width: 296px;
        }
        @include mq($until: desktop) {
            width: 100%;
            margin-bottom: 2rem;
        }
        @media print {
            display: none !important;
        }
        &-inner {
            padding: rem(20px) rem(32px);
            background-color: #fff;
        }
        &-item {
            padding: rem(12px) 0;
            border-bottom: 1px solid $colorBdr;
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
            color: $colorTextLight;
            cursor: pointer;
            &:hover,
            &:focus {
                color: $colorTurquoise;
            }
        }
        &-rebidding {
            padding-top: 1rem;
        }
        .btn {
            width: 100%;
        }
    }
</style>