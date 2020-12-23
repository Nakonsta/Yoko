<template>
    <div :class="classes" @click="handleClick">
        <div :class="['check', { 'check--checked': this.value }]">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#ok"></use>
            </svg>
        </div>
        <span>{{ label }}</span>
    </div>
</template>
<script>
export default {
    name: 'procedure-application-checkbox',
    props: {
        value: {
            type: Boolean
        },
        disabled: {
            type: Boolean
        },
        label: {
            type: String
        },
        hasError: {
            type: Boolean
        }
    },
    computed: {
        classes() {
            return [
                'procedure-application-checkbox',
                { 'procedure-application-checkbox--disabled': this.disabled },
                { 'procedure-application-checkbox--error': this.hasError }
            ]
        }
    },
    methods: {
        handleClick() {
            if (!this.disabled) {
                this.$emit('click', !this.value)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.procedure-application-checkbox {
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    margin-bottom: rem(16px);
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    span {
        margin-left: rem(16px);
        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: $lightcolorText;
        user-select: none;
    }

    &--disabled {
        cursor: default;
        filter: grayscale(100%);
    }

    &--error {
        span {
            color: $colorRed;
        }

        .check {
            border-color: $colorRed;
        }
    }
}

.check {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;
    background-color: transparent;
    border: 1px solid $colorGray;
    border-radius: 2px;
    transition: 0.3s;

    svg {
        display: none;
    }

    &--checked {
        background-color: $colorTurquoise;
        border: 1px solid $colorTurquoise;

        svg {
            display: block;
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>
