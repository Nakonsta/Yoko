<template>
    <div id="application-company-info" class="popup popup--alt">
        <div class="popup__body">
            <div class="company-info popup__content">
                <div class="popup__close" @click="closeModal">
                    <svg class="sprite-close">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#close"></use>
                    </svg>
                </div>
                <div class="company-info__content">
                    <application-title title="Сведения о компании" margin="0 0 32px 0"></application-title>
                    <div class="divider"></div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">
                            Название:
                        </div>
                        <div class="company-info__content-text">{{ company.shortName }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">
                            Полное название:
                        </div>
                        <div class="company-info__content-text">{{ company.name }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">ИНН:</div>
                        <div class="company-info__content-text">{{ company.inn }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">ОГРН:</div>
                        <div class="company-info__content-text">{{ company.ogrn }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">
                            Юридический адрес:
                        </div>
                        <div class="company-info__content-text">{{ company.legalAddress }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">
                            Фактический адрес:
                        </div>
                        <div class="company-info__content-text">{{ company.address }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">
                            Контактное лицо:
                        </div>
                        <div class="company-info__content-text">{{ company.directorFio }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">
                            Почта:
                        </div>
                        <div class="company-info__content-text">{{ company.email }}</div>
                    </div>
                    <div class="company-info__content-row">
                        <div class="company-info__content-title">
                            Телефон:
                        </div>
                        <div class="company-info__content-text">{{ company.phone }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ApplicationTitle from '../ApplicationTitle'
export default {
    name: 'application-company-popup',
    components: {
        ApplicationTitle
    },
    props: {
        company: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeModal() {
            window.closePopupById('application-company-info')
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.company-info {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    position: relative;

    width: 100%;
    max-width: 1322px;
    margin: rem(20px);
    padding: 0;
    background-color: #fff;
    border-radius: 6px;

    .popup__close {
        display: flex;
        justify-content: center;
        align-items: center;

        top: 0;
        right: 0;

        width: 40px;
        height: 40px;
        background-color: $colorTurquoise !important;
        border-radius: 0px 6px 0px 0px;

        svg {
            width: 20px;
            height: 20px;
            fill: #fff;
        }
    }

    &__content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        padding: rem(38px) rem(48px) rem(48px);
    }

    &__content-row {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        width: 100%;
        margin-bottom: rem(24px);

        @include mq($until: tablet) {
            flex-direction: column;
        }
    }

    &__content-title {
        margin-right: rem(69px);
        width: 220px;
        min-width: 220px;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: $colorTextLight;
        white-space: nowrap;

        @include mq($until: tablet) {
            margin-right: rem(8px);
        }
    }

    &__content-text {
        margin-right: auto;

        font-family: Roboto;
        font-size: rem(14px);
        color: $colorTextLight;
    }
}
</style>
