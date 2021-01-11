<template>
    <div :class="classes" :style="styles">
        <slot>
            {{ title }}
        </slot>
    </div>
</template>
<script>
export default {
    name: 'application-title',
    props: {
        title: {
            type: String,
            required: true
        },
        fontSize: {
            type: String
        },
        margin: {
            type: String
        },
        padding: {
            type: String
        },
        subtitle: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return ['application-title', { 'application-title--subtitle': this.subtitle }]
        },
        styles() {
            return { padding: this.padding, margin: this.margin, 'font-size': this.fontSize }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.application-title {
    font-family: Roboto;
    font-weight: bold;
    font-size: rem(24px);
    color: $lightcolorText;

    &--subtitle {
        font-family: Roboto;
        font-weight: 500;
        font-size: rem(18px);
        color: $colorTurquoise;
    }
}
</style>
