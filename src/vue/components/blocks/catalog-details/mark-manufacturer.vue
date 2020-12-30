<template>
  <div id="manufacturer-mark">
    <div class="row">
      <div class="col col-xl-3 col-lg-4 col-md-6 col-xs-12" v-for="(item, index) in root" :key="index">
        <div class="group-el">
          <div class="group-el__header">
            <div class="group-el__img">
              <img :src="item.ico" alt="">
            </div>
            <div class="group-el__ratings">
              <div class="group-el__ratings-el">
                <svg class="sprite-field-time"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#time"></use></svg>
                {{ item.activityIndex }}
              </div>
              <div class="group-el__ratings-el">
                <svg class="sprite-field-time"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#time"></use></svg>
                {{ item.innerRating }}
              </div>
              <div class="group-el__ratings-el">
                <svg class="sprite-field-fav"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#fav"></use></svg>
                {{ item.rating }}
              </div>
            </div>
          </div>
          <div class="group-el__body">
            <h3>{{ item.name }}</h3>
          </div>
          <div class="group-el__footer">
            <ul class="tags">
              <li class="tags-el" v-for="(el, index) in item.tags" :key="index">{{ el }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkManufacturer",
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
  @import "../../../../assets/sass/variables/variables";
  @import "../../../../assets/sass/mixins/fluid-mixin";

  .group-el {
    padding: rem(24px);
    margin-bottom: 1rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 1rem);
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__body {
      h3 {
        font-weight: 600;
        font-size: rem(24px);
        margin-top: rem(40px);
        max-width: 70%;
        @media(max-width: 1250px) {
          max-width: 100%;
        }
      }
    }
    &__footer {
      margin-top: auto;
    }
    &__ratings {
      display: flex;
      svg {
        height: 14px;
      }
      span {
        margin-left: rem(10px);
        margin-right: rem(14px);
      }
      &-el {
        display: flex;
        align-items: center;
      }
    }
    .tags {
      list-style-type: none;
      padding: 0;
      margin: 0;
      &-el {
        display: inline-block;
        font-weight: 500;
        font-size: rem(12px);
        color: $colorGray3;
        padding: rem(4px) rem(12px);
        border: 1px solid $colorGray3;
        border-radius: rem(4px);
        margin-top: rem(10px);
        &:not(:last-child) {
          margin-right: rem(10px);
        }
      }
    }
  }
</style>
