<template>
  <div class="catalog-mark__info">
    <div class="row">
      <div class="col col-md-6 col-xs-12">
        <div class="gallery-group">
          <VueSlickCarousel
              ref="c2"
              class="gallery-thumbs"
              v-bind="window.width > 1200 ? settings : { arrows: false }"
              :asNavFor="$refs.c1"
              :slidesToShow="this.show"
              :swipeToSlide="true"
              :focusOnSelect="true"
          >
            <div v-for="(src, i) in sliderImagesThumbs" :key="i">
              <img draggable="false" :src="src" />
            </div>
          </VueSlickCarousel>
          <VueSlickCarousel
              ref="c1"
              class="gallery-top"
              :asNavFor="$refs.c2"
              :arrows="false"
              :focusOnSelect="true"
              :dots="window.width <= 600 ? true : false"
              dotsClass="dots"
          >
            <div v-for="(item, idx) in sliderImagesTop" :key="idx">
              <img draggable="false" :src="item" style="max-height: 200px;" />
            </div>
          </VueSlickCarousel>
        </div>
      </div>
      <div class="col col-md-6 col-xs-12">
        <div v-for="item in root.items" class="catalog-mark__el">
          <div class="catalog-mark__title">{{ item.title }}</div>
          <div class="catalog-mark__text">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  name: "mark-info",
  components: {
    VueSlickCarousel
  },
  data() {
    return {
      show: 2,
      window: {
        width: 0,
      },
      settings: {
        "vertical": true,
        "verticalSwiping": true,
      },
      sliderImagesThumbs: [
        "https://stage-operator.ec.extyl.pro/storage/products/404/sample.jpg",
        "/content/catalog/slider-add-1.jpg",
        "/content/catalog/slider-add-2.jpg",
        "/content/catalog/slider-add-3.jpg",
        "/content/catalog/slider-add-4.jpg",
        "/content/catalog/slider-add-4.jpg",
        "/content/catalog/slider-add-4.jpg",
        "https://stage-operator.ec.extyl.pro/storage/products/405/sample.png"
      ],
      sliderImagesTop: [
        "/content/catalog/slider.jpg",
        "/content/catalog/slider.jpg",
        "/content/catalog/slider.jpg",
        "/content/catalog/slider.jpg",
        "/content/catalog/slider.jpg",
        "/content/catalog/slider.jpg"
      ]
    }
  },
  props: {
    root: {
      default: null,
      type: Object
    }
  },
  watch: {
    root() {
      this.initSliderImages();
    }
  },
  mounted() {
    this.show = 4
    this.initSliderImages();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
    },
    initSliderImages() {
      let { images = [] } = this.root;
      if (images.length) {
        this.sliderImagesTop = images;
        this.sliderImagesThumbs = images;
        this.show = images.length;
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/mixins/fluid-mixin";

  .gallery-group {
    display: flex;
    flex-wrap: wrap;
    .slick-slide {
      div:focus {
        outline: 0;
      }
    }
    .gallery-thumbs {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media(min-width: 1200px) {
        width: rem(84px);
        margin-right: rem(32px);
        flex-direction: column;
      }
      @media(max-width: 600px) {
        display: none;
      }
      .slick-slide {
        img {
          padding: rem(5px);
          border-radius: rem(6px);
          border: 1px solid transparent;
          max-height: 100px;
        }
      }
      .slick-current {
        img {
          border-color: $colorTurquoise;
        }
      }
      .slick-arrow {
        order: 0;
        font-size: 0;
        display: flex !important;
        justify-content: center;
        align-items: center;
        &:before {
          font-family: "fontello";
          font-size: 2.5rem;
          color: $colorTurquoise;
        }
      }
      .slick-prev {
        transform: none;
        &:before {
          content: '\e75f';
          @media(max-width: 1199px) {
            transform: rotate(-90deg);
          }
        }
      }
      .slick-next {
        &:before {
          content: '\e75c';
          @media(max-width: 1199px) {
            transform: rotate(-90deg);
          }
        }
      }
    }
    .gallery-top {
      width: 100%;
      order: -1;
      img {
        width: 100%;
      }
      @media(min-width: 1200px) {
        order: 1;
        width: calc(100% - 116px);
      }
      @media (max-width: 600px) {
        margin-bottom: rem(75px);
      }
    }
  }
  img {
    max-width: 100%;
  }
  .dots {
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
</style>
