<template>
    <div class="accreditations-title" :style="styles">
        <slot>
            {{ title }}
        </slot>
    </div>
</template>
<script>
export default {
    name: 'accreditations-title',
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
        }
    },
    computed: {
        styles() {
            return { padding: this.padding, margin: this.margin }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.accreditations-title {
    font-family: $fontGilroy, Arial, 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: bold;
    font-size: rem(30px);
    letter-spacing: 0.02em;
    color: #2c2c2c;
    @include mq($from: tablet) {
      font-size: rem(38px);
    }
}
</style>
