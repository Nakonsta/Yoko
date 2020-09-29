<template>
    <div class="spoiler">
        <div class="spoiler__header" @click="show = !show">
            <slot name="header"></slot>
            <div class="spoiler__header-arrow">
                Стрелка
            </div>
        </div>
        <slideUpDown :active="show" :duration="500">
            <slot name="body"></slot>
        </slideUpDown>
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
    .spoiler {
        &__header {
            transition: 0.3s color;
            position: relative;
            padding: 10px 0;
            cursor: pointer;
            &:hover {
                color: #00b8d4;
            }
        }
        &__header-arrow {
            position: absolute;
            top: 50%;
            right: 0;
            transform: rotateX(0deg) translate(0%, -50%);
            &--top {
                transform: rotateX(180deg) translate(0%, -50%);
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
