<template>
  <div id="documents-mark">
    <div class="row">
      <div class="col col-lg-3 col-md-4 col-xs-12 mb2" v-for="(item, index) in root" :key="index">
        <a class="btn btn--white btn--with-icon" :href="item.link">
          <svg class="sprite-download">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#download"></use>
          </svg>
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkDocuments",
  props: {
    root: {
      default: null,
      type: Array,
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../../assets/sass/variables/fluid-variables";
  @import "../../../../assets/sass/mixins/fluid-mixin";
  .btn {
    min-height: rem(72px);
    min-width: inherit;
    padding-right: 1rem;
    padding-left: 3rem;
    width: 100%;
    svg {
      @media(max-width: 1199px) {
        left: 1rem;
      }
    }
  }
  .mb2 {
    margin-bottom: 2rem;
  }
</style>
