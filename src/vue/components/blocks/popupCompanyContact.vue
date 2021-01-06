<template>
    <div class="company-contact">
        <a href="javascript:{}" @click="open($event)">{{ company.directorFio }}</a>
        <div class="company-contact__popup">
            <div class="company-contact__title">{{ company.directorFio }}</div>
            <div class="company-contact__subtitle">Генеральный директор<br /> {{ company.name }}</div>
            <div class="company-contact__content" v-if="company.phone">Телефон:<br /> <span>{{ company.phone }}</span></div>
            <div class="company-contact__content" v-if="company.email">E-mail:<br /> <span>{{ company.email }}</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'popupCompanyContact',
    props: {
        company: {
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
    
    .company-contact {
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