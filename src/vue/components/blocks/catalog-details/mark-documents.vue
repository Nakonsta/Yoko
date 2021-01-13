<template>
  <div class="documents">
    <a class="btn btn--white btn--with-icon" :href="item.link" target="_blank" v-for="(item, index) in root" :key="index">
      <svg class="sprite-download">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#download"></use>
      </svg>
      {{ item.name }}
    </a>
  </div>
</template>

<script>
export default {
  name: "MarkDocuments",
  props: {
    root: {
      default: [],
      type: Array,
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../../assets/sass/variables/variables";
  @import "../../../../assets/sass/variables/fluid-variables";
  @import "../../../../assets/sass/mixins/mq";
  @import "../../../../assets/sass/mixins/fluid-mixin";
  .documents {
    display: flex;
    flex-wrap: wrap;
    margin: -32px 0 0 -32px;

    ::v-deep a {
      display: block;
      margin: 32px 0 0 32px;
      min-height: rem(72px);
      width: calc(25% - 32px);
      min-width: 0;
      padding: rem(24px) rem(26px) rem(24px) rem(72px);
      text-align: left;

      @include mq($until: widescreen) {
        width: calc(33.33% - 32px);
      }

      @include mq($until: desktop) {
        width: calc(50% - 32px);
      }

      @include mq($until: tablet) {
        width: calc(100% - 32px);
      }

      svg {
        @media(max-width: 1199px) {
          left: rem(26px)
        }
      }
    }
  }
</style>
