<template>
  <div class="page__title">
    <template v-if="(returnRoute.length || returnLink.length) && returnText.length">
      <div class="return">
        <template v-if="returnRoute.length">
          <router-link
            class="link link-icon"
            :to="returnRoute"
          >
            <svg class="sprite-return"><use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="/img/sprite.svg#return"
            /></svg>
            <b>{{ returnText }}</b>
          </router-link>
        </template>
        <template v-else-if="returnLink.length">
          <a
            class="link link-icon"
            :href="returnLink"
          >
            <svg class="sprite-return"><use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="\./img/sprite.svg#return"
            /></svg>
            <b>{{ returnText }}</b>
          </a>
        </template>
      </div>
    </template>
    <div class="title">
      <slot>
        {{ title }}
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    returnLink: {
      default: '',
      type: String,
    },
    returnRoute: {
      default: '',
      type: String,
    },
    returnText: {
      default: '',
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/sass/variables/variables';
@import '../../../assets/sass/variables/fluid-variables';
@import '../../../assets/sass/mixins/fluid-mixin';
@import '../../../assets/sass/mixins/mq';

.page__title {
  margin-bottom: rem(40px);
  border-radius: 6px;
  padding: rem(40px) rem(64px);
  background: $colorWhite;

  .fullMode & {
    padding-top: rem(80px) !important;
  }

  @include mq($until: widescreen) {
    padding: rem(40px);
  }

  @include mq($until: tablet) {
    padding: rem(32px) rem(20px);
  }

  @media print {
    border-radius: 0;
    padding: 0;
  }

  .return {
    margin-bottom: rem(20px);
    font-weight: 500;
    svg {
      width: 4px;
      height: 8px;
      margin-right: 12px;
    }
  }

  .title {
    font-family: $fontGilroy;
    font-weight: bold;
    font-size: rem(38px);
    letter-spacing: 0.02em;
    color: #2c2c2c;

    @include mq($until: mobileLandscape) {
      font-size: rem(30px);
    }
  }
}
</style>
