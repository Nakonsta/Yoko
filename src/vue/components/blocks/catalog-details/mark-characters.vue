<template>
  <div id="characters-mark">
    <ul class="characters">
      <li v-for="(item, index) in this.root" :key="index">
        <dl>
          <dt><span>{{ item.name }}</span></dt>
          <dd>{{ item.desc }}</dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MarkCharacters",
  data() {
    return {}
  },
  props: {
    root: {
      default: () => [],
      type: Array,
    }
  }
}
</script>





<style lang="scss" scoped>
  @import "../../../../assets/sass/variables/variables";
  @import "../../../../assets/sass/variables/fluid-variables";
  @import "../../../../assets/sass/mixins/fluid-mixin";
  @import "../../../../assets/sass/mixins/mq";
  ul.characters {
    list-style: none;
    column-gap: rem(40px);
    padding: 0;
    @include mq($from: desktop) {
      columns: 2;
    }
    li {
      page-break-inside: avoid;
    }
    dl {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
      background-color: white;
      margin-bottom: rem(25px);
    }
    dt {
      flex-grow: 1;
      align-self: flex-start;
      position: relative;
      &:before {
        content: '';
        border-bottom: 1px dashed #D3D3D3;
        height: 0;
        line-height: 0;
        position: absolute;
        left: 0;
        right: rem(-265px);
        bottom: .4em;
        @include mq($from: desktop, $until: widescreen) {
          right: rem(-160px);
        }
        @include mq($until: tablet) {
          right: rem(-160px);
        }
      }
      span {
        display: inline;
        padding-right: rem(5px);
        color: $colorGray;
        background: $colorWhite;
        z-index: 1;
        position: relative;
      }
    }
    dd {
      flex-shrink: 0;
      width: rem(265px);
      margin-left: rem(20px);
      background: $colorWhite;
      color: $colorText;
      padding-left: rem(5px);
      position: relative;
      @include mq($from: desktop, $until: widescreen) {
        width: rem(160px);
      }
      @include mq($until: tablet) {
        width: rem(160px);
      }
    }
  }
</style>
