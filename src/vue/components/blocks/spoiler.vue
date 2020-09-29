<template>
    <div class="spoiler">
        <div
            class="spoiler__header"
            :class="{
                'spoiler__header--show': show
            }"
            @click="show = !show"
        >
            <slot name="header"></slot>
            <div
                class="spoiler__header-arrow"
                :class="{
                    'spoiler__header-arrow--top' : show
                }"
            >
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1L5 4L1 1" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div
            class="spoiler__body"
            :class="{
                'spoiler__body--show': show
            }"
        >
            <slideUpDown :active="show" :duration="500">
                <slot name="body"></slot>
            </slideUpDown>
        </div>
    </div>
</template>

<script>
    import slideUpDown from 'vue-slide-up-down'
    export default {
        name: 'Spoiler',
        components: {
            slideUpDown
        },
        data() {
            return {
                show: false,
                height: 0,
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";

    .spoiler {
        border-bottom: 1px solid #CDCDCC;
        &__header {
            transition: 0.3s color, 0.3s padding;
            position: relative;
            /*padding-top: rem(24px);*/
            padding: rem(24px) 0;
            cursor: pointer;
            font-size: rem(14px);
            text-transform: uppercase;
            &:hover {
                color: $colorTurquoise;
            }
            &--show {
                padding: rem(15px) 0;
            }
        }
        &__body {
            transition: 0.3s padding;
            &--show {
                padding-bottom: rem(13px);
            }
        }
        &__header-arrow {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0%, -50%);
            svg {
                transition: .3s transform;
                transform: rotateX(0deg);
            }
            path {
                transition: .3s stroke;
            }
            &--top {
                svg {
                    transform: rotateX(180deg);
                }
                path {
                    stroke: $colorTurquoise
                }
            }
        }
    }
    .arrow {
        transition: 0.5s transform;
        transform: rotateX(0deg);
        &--rotate {
            transform: rotateX(180deg);
        }
    }
</style>
