<template>
    <div :class="classes" :style="styles">
        <slot>
            {{ title }}
        </slot>
    </div>
</template>
<script>
export default {
    name: 'procedure-application-title',
    props: {
        title: {
            type: String,
            required: true
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
            return ['procedure-application-title', {'procedure-application-title--subtitle': this.subtitle}]
        },
        styles() {
            return { padding: this.padding, margin: this.margin }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.procedure-application-title {
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
