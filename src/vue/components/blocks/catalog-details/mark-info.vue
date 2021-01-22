<template>
  <div class="catalog-mark__info">
    <div class="catalog-mark__gallery">
      <div
        v-if="root.images.length"
        class="gallery-group"
      >
        <VueSlickCarousel
          ref="thumbs"
          class="gallery-thumbs"
          v-bind="settingsThumbs"
          @beforeChange="syncSliders"
        >
          <div
            v-for="(src, i) in root.images"
            :key="i"
            class="gallery-thumb"
          >
            <img
              draggable="false"
              :src="src"
              alt=""
            >
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel
          ref="gallery"
          class="gallery-top"
          v-bind="settingsGallery"
          @beforeChange="syncSliders"
        >
          <div
            v-for="(src, i) in root.images"
            :key="i"
            class="gallery-image"
          >
            <img
              draggable="false"
              :src="src"
              alt=""
            >
          </div>
        </VueSlickCarousel>
      </div>
    </div>
    <div class="catalog-mark__wrap">
      <div class="catalog-mark__inner">
        <div
          v-for="item in root.items"
          class="catalog-mark__el"
        >
          <div class="catalog-mark__title">
            {{ item.name }}
          </div>
          <template v-if="item.id === 'description' && item.isHTML && item.value.length > 1000">
            <div class="catalog-mark__text">
              <a
                href="#description"
                @click="openTab($event, 'description')"
              >Перейти к описанию</a>
            </div>
          </template>
          <template v-else>
            <div
              class="catalog-mark__text"
              v-html="item.value"
            />
          </template>
        </div>
      </div>
      <div
        v-if="root.price !== undefined"
        class="catalog-mark__price"
      >
        <p>
          Средняя цена<span>
            <template v-if="root.price === 0">
              Неизвестно
            </template>
            <template v-else>
              {{ formatPriceWithCurrency(root.price) }}
            </template>
          </span>
        </p>
        <a
          v-if="root.companies.length"
          href="#availability"
          class="btn"
          @click="openTab($event, 'availability')"
        >Наличие</a>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import functions from '@/helpers/functions';

export default {
  name: 'MarkInfo',
  components: {
    VueSlickCarousel,
  },
  mixins: [functions],
  props: {
    root: {
      default: {},
      type: Object,
    },
  },
  data() {
    return {
      settingsThumbs: {
        slidesToShow: 4,
        focusOnSelect: true,
        arrows: true,
        vertical: true,
        verticalSwiping: true,
        responsive: [
          {
            breakpoint: 1250,
            settings: {
              vertical: false,
              verticalSwiping: false,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              vertical: false,
              verticalSwiping: false,
            },
          },
        ],
      },
      settingsGallery: {
        arrows: false,
        slidesToShow: 1,
        fade: true,
        swipeToSlide: true,
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              dots: true,
            },
          },
        ],
      },
    };
  },
  methods: {
    syncSliders(currentPosition, nextPosition) {
      // asNavFor плохое решение. смотреть тут https://github.com/staskjs/vue-slick/issues/68#issuecomment-636056601
      this.$refs.thumbs.goTo(nextPosition);
      this.$refs.gallery.goTo(nextPosition);
    },
    openTab(evt, hash) {
      evt.preventDefault();
      const link = document.querySelector(`.js-tabs li a[href="#${hash}"]`);
      if (link) {
        link.click();
        const top = window.scrollY + link.getBoundingClientRect().y;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../../../assets/sass/variables/fluid-variables";
  @import "../../../../assets/sass/variables/variables";
  @import "../../../../assets/sass/mixins/mq";
  @import "../../../../assets/sass/mixins/fluid-mixin";

  .catalog-mark {
    &__info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__gallery {
      width: 670px;
      @include mq($until: widescreen) {
        width: 444px;
      }
      @include mq($until: desktop) {
        width: 344px;
      }
      @include mq($until: tablet) {
        width: 100%;
      }
    }

    &__wrap {
      width: calc(100% - 702px);
      @include mq($until: widescreen) {
        width: calc(100% - 476px);
      }
      @include mq($from: desktop) {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      @include mq($until: desktop) {
        width: calc(100% - 376px);
      }
      @include mq($from: 600px, $until: tablet) {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      @include mq($until: tablet) {
        width: 100%;
      }
    }

    &__inner {
      flex-grow: 1;
    }

    &__price {
      margin: rem(32px) 0 0 0;
      border-radius: rem(6px);
      padding: rem(24px);
      font-weight: 500;
      font-size: rem(14px);
      color: $colorGray;
      background: $colorWhite;

      @include mq($from: desktop) {
        margin: 0 0 0 rem(32px);
        width: rem(282px);
      }

      @include mq($from: 600px, $until: tablet) {
        margin: 0 0 0 rem(32px);
        width: rem(282px);
      }

      p {
        margin: 0;
      }

      span {
        display: block;
        margin: 1em 0 0;
        font-weight: 600;
        font-size: rem(24px);
        line-height: (34/24);
        color: $colorText;
      }

      .btn {
        display: block;
        margin: rem(30px) 0 0;
        width: 100%;
        text-align: center;
      }
    }
  }

  .gallery {
    &-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: rem(64px);

      @include mq($until: widescreen) {
        flex-direction: column-reverse;
      }

      ::v-deep .slick-slide {
        border: 0 !important;
        div:focus {
          outline: 0;
        }
      }
    }
    &-thumbs {
      margin: rem(16px) 0 0;
      padding: 0 22px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      @include mq($from: widescreen) {
        padding: 22px 0;
        /*width: rem(96px);*/
        width: 96px;
        margin: 0 rem(26px) 0 0;

        /*::v-deep .slick-track {*/
        /*  &::before,*/
        /*  &::after {*/
        /*    display: none !important;*/
        /*  }*/
        /*}*/
      }

      @include mq($until: tablet) {
        display: none;
      }

      ::v-deep .slick-list {
        flex-grow: 1;
        @include mq($from: widescreen) {
          height: rem(400px) !important; // (2px + 96px + 2px) * 4
        }
      }

      ::v-deep .slick-slide {
        padding: 0 2px;
        @include mq($from: widescreen) {
          padding: 2px 0;
        }
      }

      ::v-deep .slick-arrow {
        order: initial;
        font-size: 0;
        display: flex !important;
        justify-content: center;
        align-items: center;
        position: absolute;

        @include mq($until: widescreen) {
          width: 22px;
          height: 100%;
          top: 0;
          bottom: 0;
        }

        @include mq($from: widescreen) {
          width: 100%;
          height: 22px;
          left: 0;
          right: 0;
        }

        &:before {
          font-family: "fontello";
          font-size: 2.5rem;
          color: $colorTurquoise;
        }
      }

      ::v-deep .slick-prev {
        transform: none;

        @include mq($until: widescreen) {
          left: 0;
        }

        @include mq($from: widescreen) {
          top: 0;
        }

        &:before {
          content: '\e75f';

          @include mq($until: widescreen) {
            transform: rotate(-90deg);
          }
        }
      }

      ::v-deep .slick-next {

        @include mq($until: widescreen) {
          right: 0;
        }

        @include mq($from: widescreen) {
          bottom: 0;
        }

        &:before {
          content: '\e75c';

          @include mq($until: widescreen) {
            transform: rotate(-90deg);
          }
        }
      }
    }
    &-thumb {
      display: flex;
      padding: rem(5px);
      border-radius: rem(6px);
      border: 1px solid transparent;
      /*width: rem(96px);*/
      /*height: rem(96px);*/
      width: 96px !important;
      height: 96px !important;
      cursor: pointer;

      .slick-current & {
        border-color: $colorTurquoise;
      }

      &::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 100%;
      }

      ::v-deep img {
        display: inline-block;
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
      }
    }
    &-image {
      /*height: rem(444px);*/
      border-radius: rem(6px);
      height: 444px;
      background: $colorWhite;
      @include mq($until: desktop) {
        height: 344px;
      }

      ::v-deep img {
        /*border-radius: rem(6px);*/
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-top {
      width: 100%;

      @include mq($from: widescreen) {
        width: calc(100% - #{rem(122px)});
        /*height: rem(444px);*/
        height: 444px;
      }

      @include mq($until: desktop) {
        height: 344px;
      }

      @include mq($until: tablet) {
        width: 100%;
        /*height: auto;*/
      }

      ::v-deep .slick-dots {
        display: flex;
        position: absolute;
        left: 0;
        bottom: -40px;
        width: 100%;
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;
        align-items: center;
        li {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 0 5px;
          padding: 0;
          cursor: pointer;
        }

        li button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 20px;
          height: 20px;
          padding: 5px;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: transparent;

          &:hover, &:focus {
            outline: none;
          }

          &:before {
            background-color: #373735;
            position: absolute;
            top: 0;
            left: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            content: '';
            text-align: center;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }

        li.slick-active {
          button:before {
            opacity: 1;
            background-color: $colorTurquoise;
          }
        }
      }
    }
  }
</style>
