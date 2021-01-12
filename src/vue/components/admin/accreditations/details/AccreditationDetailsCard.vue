<template>
    <div :class="classes" @click="isOpened = true">
        <div class="card__header">
            <div class="card__title">{{ title }}</div>
            <div v-if="isOpened" class="card__header-actions">
                <div class="card__header-action" @click.stop="download">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#download"></use>
                    </svg>
                </div>
                <div class="card__header-action" @click.stop="print">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#print"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="card__content">
            <iframe :src="pdf" frameborder="0"></iframe>
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

            <button class="card__agree" :disabled="disabled || isAccepted" @click.stop="agree">
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
        pdf: {
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
            isOpened: false,
            page: 1
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
    },
    methods: {
        download() {
            const link = document.createElement('a')
            link.href = this.pdf
            link.target = '_blank'
            link.download = `${this.title}.pdf`
            link.click()
            document.body.removeChild(link)
        },
        print() {
            const doc = this.$el.children[1].children[0]

            doc.focus()
            doc.contentWindow.print()
        },
        agree() {
            this.isOpened = false
            this.$emit('on-agree', true)
        }
    },
    created() {
        const mm = window.matchMedia('only screen and (max-width: 767px)')
        if (mm.matches) {
            this.isOpened = true
        }

        mm.addListener(mql => {
            if (mql.matches) {
                this.isOpened = true
            } else {
                this.isOpened = false
            }
        })
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

    @include mq($until: mobileLandscape) {
        padding: rem(12px) rem(16px);
    }

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
        height: 0;
        margin-bottom: 0;
    }

    &--error {
        background-color: rgba($color: $colorRed, $alpha: 0.05);
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

        @include mq($until: mobileLandscape) {
            flex-direction: column;
        }
    }

    &__header-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        fill: $colorTurquoise;
        cursor: pointer;

        @include mq($until: mobileLandscape) {
            margin-top: rem(8px);
        }
    }

    &__header-action {
        margin-right: rem(16px);
        width: 20px;
        height: 20px;

        &:last-child {
            margin-right: 0;
        }

        svg {
            width: 20px;
            height: 20px;
            fill: $colorTurquoise;
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

        width: 100%;
        height: 600px;
        margin-bottom: rem(60px);
        transition: 0.4s;
        overflow: hidden;

        @include mq($until: tablet) {
            height: 0;
            margin-bottom: 0;
        }

        iframe {
            width: 100%;
            height: 100%;
        }
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
        align-items: flex-start;

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
            margin-right: 0;
        }

        &--accepted {
            color: $colorTurquoise;
        }
    }

    &__hide-text {
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;

        font-family: Roboto;
        font-size: rem(14px);
        text-decoration-line: underline;
        color: $lightcolorText;
        white-space: nowrap;

        @include mq($until: tablet) {
            display: none;
        }
    }

    &__agree {
        padding: rem(9px) rem(68px);
        background-color: transparent;
        border: 1px solid currentColor;
        border-radius: 6px;
        outline: none;
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
