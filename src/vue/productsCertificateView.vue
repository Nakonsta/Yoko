<template>
<div>
    <div id="products-certificate-view" class="popup popup--alt certificate-view">
        <div class="popup__body">
            <button role="button" class="certificate-view__controls left" @click="changeItem('back')">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.75 2.5L2.25 10L9.75 17.5" stroke="#31ACB8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="popup__content">
                <a href="javascript:{}" class="popup__close" @click="closeModal"><svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg></a>
                <div v-if="certificate" class="popup__title certificate-view__title">Сертификат {{ certificate.properties.number }}</div>
                <div v-if="certificate" class="popup__content-container certificate-view__content">
                    <span>до {{ certificate.properties.date_end }}</span>
                    <span>{{ certificate.title }}</span>
                    <div class="certificate-view__media">
                        <embed v-if="checkIsPdf(certificate.url)" :src="certificate.url" />
                        <img v-else :src="certificate.url" />
                    </div>
                </div>
            </div>
            <button role="button" class="certificate-view__controls right" @click="changeItem('next')">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 2.5L9.75 10L2.25 17.5" stroke="#31ACB8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "productsCertificateView",
    props: {
        document: Object
    },
    data: () => ({
        certificate: null
    }),
    watch: {
        document: {
            handler: function(someData) {
                this.init();
            },
            immediate: true
        }
    },
    computed: {},
    mounted() {},
    methods: {
        init() {
            this.certificate = this.document;
        },
        closeModal() {
            closePopupById('#products-certificate-view');
        },
        checkIsPdf(url) {
            const ext = url.split(/[#?]/)[0].split('.').pop().trim();
            return ext && ext === "pdf";
        },
        changeItem(mode) {
            this.$emit("change-item", mode);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/sass/variables/variables";
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";
    @import "../assets/sass/mixins/mq";

    .certificate-view {
        &__controls {
            background-color: $colorWhite;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all .3s ease;
            border: none;
            &:hover {
                opacity: 0.8;
                cursor: pointer;
            }
            &:focus {
                border: none;
            }
            &.left {
                margin-right: 10%;
            }
            &.right {
                margin-left: 10%;
            }
        }
        &__title {
            font-family: $fontGilroy;
            margin-bottom: 1rem;
        }
        &__content {
            font-weight: 400;
            color: $colorGray;
            > span {
                display: block;
            }
        }
        &__media {
            height: 500px;
            margin-top: 1rem;
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            embed {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }

    @include mq($until: desktop) {
        .certificate-view {
            &__media {
                height: 400px;
            }
        }
    }

    @include mq($until: mobileLandscape) {
        .certificate-view {
            &__controls {
                display: none;
            }
        }
    }

</style>
