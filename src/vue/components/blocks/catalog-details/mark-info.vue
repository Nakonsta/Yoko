<template>
  <div class="catalog-mark__info">
    <div class="row">
      <div class="col col-md-6 col-xs-12">
        <div class="gallery-group">
          <VueSlickCarousel
              ref="c2"
              class="gallery-thumbs"
              v-bind="window.width > 1200 ? settings : {}"
              :asNavFor="$refs.c1"
              :slidesToShow="show"
              :swipeToSlide="true"
              :focusOnSelect="true"
          >
            <div><img draggable="false" src="/content/catalog/slider-add-1.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider-add-2.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider-add-3.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider-add-4.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider-add-4.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider-add-4.jpg" /></div>
          </VueSlickCarousel>
          <VueSlickCarousel
              ref="c1"
              class="gallery-top"
              :asNavFor="$refs.c2"
              :arrows="false"
              :focusOnSelect="true"
          >
            <div><img draggable="false" src="/content/catalog/slider.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider.jpg" /></div>
            <div><img draggable="false" src="/content/catalog/slider.jpg" /></div>
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
      show: 1,
      window: {
        width: 0,
      },
      settings: {
        "vertical": true,
        "verticalSwiping": true,
      },
    }
  },
  props: {
    root: {
      default: null,
      type: Object
    }
  },
  mounted() {
    this.show = 4
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
      .slick-slide {
        img {
          padding: rem(5px);
          border-radius: rem(6px);
          border: 1px solid transparent;
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
    }
  }
  img {
    max-width: 100%;
  }
</style>
