<template>
    <div :class="classes" @click="isOpened = true">
        <div class="card__header">
            <div class="card__title">{{ title }}</div>
            <div v-if="isOpened" class="card__header-actions">
                <div class="card__header-action" @click.stop="">
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 14C20.7348 14 20.4804 14.1054 20.2929 14.2929C20.1054 14.4804 20 14.7348 20 15V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15C4 14.7348 3.89464 14.4804 3.70711 14.2929C3.51957 14.1054 3.26522 14 3 14C2.73478 14 2.48043 14.1054 2.29289 14.2929C2.10536 14.4804 2 14.7348 2 15V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V15C22 14.7348 21.8946 14.4804 21.7071 14.2929C21.5196 14.1054 21.2652 14 21 14ZM11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.7397 15.9729 11.8691 16.0002 12 16.0002C12.1309 16.0002 12.2603 15.9729 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L16.71 11.71C16.8983 11.5217 17.0041 11.2663 17.0041 11C17.0041 10.7337 16.8983 10.4783 16.71 10.29C16.5217 10.1017 16.2663 9.99591 16 9.99591C15.7337 9.99591 15.4783 10.1017 15.29 10.29L13 12.59V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V12.59L8.71 10.29C8.61676 10.1968 8.50607 10.1228 8.38425 10.0723C8.26243 10.0219 8.13186 9.99591 8 9.99591C7.86814 9.99591 7.73757 10.0219 7.61575 10.0723C7.49393 10.1228 7.38324 10.1968 7.29 10.29C7.19676 10.3832 7.1228 10.4939 7.07234 10.6158C7.02188 10.7376 6.99591 10.8681 6.99591 11C6.99591 11.1319 7.02188 11.2624 7.07234 11.3842C7.1228 11.5061 7.19676 11.6168 7.29 11.71L11.29 15.71Z"
                        />
                    </svg>
                </div>
                <div class="card__header-action" @click.stop="">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.5 9.5H16V6.0625C16 5.66468 15.842 5.28314 15.5607 5.00184C15.2794 4.72054 14.8978 4.5625 14.5 4.5625H14.426V4.135C14.4261 4.06926 14.4131 4.00416 14.388 3.94341C14.3629 3.88267 14.326 3.82748 14.2795 3.781L12.6435 2.146C12.5497 2.05241 12.4225 1.9999 12.29 2H6.7C6.4013 2.00093 6.11514 2.12013 5.90411 2.33153C5.69309 2.54292 5.5744 2.8293 5.574 3.128V4.5625H5.5C5.10218 4.5625 4.72064 4.72054 4.43934 5.00184C4.15804 5.28314 4 5.66468 4 6.0625V9.5H3.5C3.10218 9.5 2.72064 9.65804 2.43934 9.93934C2.15804 10.2206 2 10.6022 2 11V16.5C2 16.8978 2.15804 17.2794 2.43934 17.5607C2.72064 17.842 3.10218 18 3.5 18H16.5C16.8978 18 17.2794 17.842 17.5607 17.5607C17.842 17.2794 18 16.8978 18 16.5V11C18 10.6022 17.842 10.2206 17.5607 9.93934C17.2794 9.65804 16.8978 9.5 16.5 9.5ZM14.5 5.5625C14.6326 5.5625 14.7598 5.61518 14.8536 5.70895C14.9473 5.80272 15 5.92989 15 6.0625V9.5H14.426V5.5625H14.5ZM6.574 3.128C6.57438 3.09451 6.58771 3.06247 6.6112 3.03861C6.6347 3.01474 6.66652 3.0009 6.7 3H12.083L13.426 4.342V9.5H6.574V3.128ZM5 6.0625C5 5.92989 5.05268 5.80272 5.14645 5.70895C5.24021 5.61518 5.36739 5.5625 5.5 5.5625H5.574V9.5H5V6.0625ZM13.8435 15.5H6.156V15H13.8435V15.5ZM6.156 17V16.5H13.8435V17H6.156ZM17 16.5C17 16.6326 16.9473 16.7598 16.8536 16.8536C16.7598 16.9473 16.6326 17 16.5 17H14.8435V14.5C14.8435 14.3674 14.7908 14.2402 14.6971 14.1464C14.6033 14.0527 14.4761 14 14.3435 14H5.656C5.52339 14 5.39621 14.0527 5.30245 14.1464C5.20868 14.2402 5.156 14.3674 5.156 14.5V17H3.5C3.36739 17 3.24021 16.9473 3.14645 16.8536C3.05268 16.7598 3 16.6326 3 16.5V11C3 10.8674 3.05268 10.7402 3.14645 10.6464C3.24021 10.5527 3.36739 10.5 3.5 10.5H16.5C16.6326 10.5 16.7598 10.5527 16.8536 10.6464C16.9473 10.7402 17 10.8674 17 11V16.5Z"
                        />
                        <path
                            d="M14.343 11.0625H13.543C13.4104 11.0625 13.2832 11.1152 13.1894 11.2089C13.0956 11.3027 13.043 11.4299 13.043 11.5625C13.043 11.6951 13.0956 11.8223 13.1894 11.9161C13.2832 12.0098 13.4104 12.0625 13.543 12.0625H14.343C14.4756 12.0625 14.6028 12.0098 14.6965 11.9161C14.7903 11.8223 14.843 11.6951 14.843 11.5625C14.843 11.4299 14.7903 11.3027 14.6965 11.2089C14.6028 11.1152 14.4756 11.0625 14.343 11.0625Z"
                        />
                    </svg>
                </div>
            </div>
        </div>
        <div class="card__content">
            <p class="card__content-text" v-html="content"></p>
        </div>
        <div class="card__footer">
            <div class="card__footer-section">
                <div :class="['card__status', { 'card__status--accepted': isAccepted }]">
                    {{ isAccepted ? 'Подписано' : 'Не подписано' }}
                </div>

                <button v-show="isOpened" class="card__hide-text" @click.stop="isOpened = false">
                    Скрыть полный текст
                </button>
            </div>

            <button class="card__agree" :disabled="disabled || isAccepted" @click.stop="">
                Подписать Электронной Подписью
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'accreditation-details-card',
    props: {
        isAccepted: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        hasError: {
            type: Boolean
        },
        disabled: {
            type: Boolean
        }
    },
    data() {
        return {
            isOpened: false
        }
    },
    computed: {
        classes() {
            return [
                'accreditation-details__card',
                'card',
                { 'card--collapsed': !this.isOpened },
                { 'card--error': this.hasError }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.card {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    margin-bottom: rem(20px);
    padding: rem(24px) rem(32px);
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid $borderColor;
    box-shadow: 5px 10px 15px rgba(55, 55, 53, 0.1);
    cursor: default;

    &:last-child {
        margin-bottom: 0;
    }

    &--collapsed {
        cursor: pointer;
    }

    &:not(&--collapsed) &__title {
        text-decoration-line: underline;
        color: $colorTurquoise;
    }

    &--collapsed &__header {
        margin-bottom: rem(6px);
    }

    &--collapsed &__content {
        max-height: 0;
        margin-bottom: 0;
    }

    &--error {
        background-color: rgba($color: $colorRed, $alpha: 0.2);
    }

    &--error &__status {
        color: $colorRed;
    }

    &__header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;

        width: 100%;
        margin-bottom: rem(30px);
        transition: 0.3s;
    }

    &__header-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        fill: $colorTurquoise;
        cursor: pointer;
    }

    &__header-action {
        margin-right: rem(16px);

        &:last-child {
            margin-right: 0;
        }
    }

    &__title {
        font-family: Roboto;
        font-weight: 500;
        font-size: rem(16px);
        color: $lightcolorText;
        transition: 0.2s;
    }

    &__content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        height: 100%;
        max-height: 785px;
        margin-bottom: rem(60px);
        transition: 0.4s;
        overflow: hidden;

        @include mq($until: desktop) {
            max-height: 2200px;
        }
    }

    &__content-text {
        margin: 0;

        font-family: Roboto;
        font-size: rem(14px);
        color: $lightcolorText;
    }

    &__footer {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
    }

    &__footer-section {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        margin-right: auto;

        @include mq($until: tablet) {
            width: 100%;
            margin-bottom: rem(28px);
        }

        @include mq($until: mobileLandscape) {
            flex-flow: column;
        }
    }

    &__status {
        flex: 0 1;
        margin-right: rem(40px);

        font-family: Roboto;
        font-size: rem(14px);
        color: $colorGray;
        white-space: nowrap;

        @include mq($until: tablet) {
            flex: auto;
            width: 100%;
        }

        &--accepted {
            color: $colorTurquoise;
        }
    }

    &__hide-text {
        padding: 0;
        border: none;
        background-color: transparent;

        font-family: Roboto;
        font-size: rem(14px);
        text-decoration-line: underline;
        color: $lightcolorText;
        white-space: nowrap;
    }

    &__agree {
        padding: rem(9px) rem(68px);
        background-color: transparent;
        border: 1px solid currentColor;
        border-radius: 6px;
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        text-align: center;
        color: $colorTurquoise;

        @include mq($until: tablet) {
            padding: rem(10px);
            width: 100%;
        }

        &:active,
        &:hover {
            background-color: lighten($color: $colorTurquoise, $amount: 50%);
        }

        &:disabled {
            color: $colorGray;

            &:hover {
                background-color: lighten($color: $colorGray, $amount: 30%);
            }
        }
    }
}
</style>
