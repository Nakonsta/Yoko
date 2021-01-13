<template>
    <div class="application-tooltip">
        <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#hint"></use>
        </svg>
        <span>
            <slot>{{ text }}</slot>
        </span>
    </div>
</template>
<script>
export default {
    name: 'application-tooltip',
    props: {
        text: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    },
    computed: {
        classes() {
            return ['application-tooltip', { 'application-tooltip--disabled': this.disabled }]
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
.application-tooltip {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20px;
    height: 20px;
    border: 1px solid $borderColor;
    border-radius: 100%;
    cursor: pointer;

    &:hover span {
        visibility: visible;
        opacity: 1;
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 0;
        left: 30px;
        z-index: 3;

        visibility: hidden;
        background-color: $lightcolorText;
        padding: rem(8px) rem(20px);
        border-radius: 4px;
        opacity: 0;
        transition: 0.2s;

        font-family: Roboto;
        font-size: 10px;
        color: #fff;
        white-space: nowrap;
    }

    &--disabled {
        cursor: default;

        &:hover span {
            visibility: hidden;
            opacity: 0;
        }

        svg {
            fill: #9b9b9a;
        }
    }

    svg {
        width: 12px;
        height: 12px;
        fill: #4e4f57;
    }
}
</style>
