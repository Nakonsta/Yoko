<template>
    <div class="tender-delivery">
        <a href="javascript:{}" @click="open($event)">Требуется</a>
        <div class="tender-delivery__popup">
            <div class="tender-delivery__title">Доставка</div>
            <div class="tender-delivery__subtitle">№ {{ tender.id }}<br /> {{ company.name }}</div>
            <div class="tender-delivery__content">Статус:<br /> <span>Доставка требуется</span></div>
            <div class="tender-delivery__content" v-if="tender.payment_and_delivery.delivery_address">Адрес доставки:<br /> <span>{{ tender.payment_and_delivery.delivery_address }}</span></div>
            <div class="tender-delivery__content" v-if="tender.payment_and_delivery.delivery_terms">Дата доставки:<br /> <span>{{ tender.payment_and_delivery.delivery_terms }}</span></div>
        </div>
    </div>
</template>

<script>
import formatDate from "@/helpers/formatDate";

export default {
    name: 'popupTenderDelivery',
    mixins: [formatDate],
    props: {
        company: {
            type: Object,
            required: true,
        },
        tender: {
            type: Object,
            required: true,
        },
    },
    created() {},
    methods: {
        open(evt) {
            let popupContainer = document.querySelector('#default .popup__content-container');
            while(popupContainer.firstChild) popupContainer.removeChild(popupContainer.firstChild);
            popupContainer.appendChild(evt.target.nextElementSibling.cloneNode(true));
            window.openPopupById('default');
        },
    },
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-delivery {
        font-weight: 500;

        a {
            color: $colorTurquoise;

            &:hover {
                color: $colorTurquoiseHover;
            }
        }

        &__popup {
            display: none;
            font-weight: 500;

            .popup & {
                display: block;
            }
        }

        &__title {
            margin: 0 0 rem(36px);
            width: calc(100% - 40px);
            font-weight: normal;
            font-size: rem(24px);
            line-height: (34/24);
        }

        &__subtitle {
            margin: 0 0 rem(24px);
            color: $colorGray;
        }

        &__content {
            margin: rem(24px) 0 0;
            color: $colorGray;

            a,
            span {
                color: $colorText;
            }

            a {
                &:hover {
                    color: $colorTurquoiseHover;
                }
            }
        }
    }
</style>