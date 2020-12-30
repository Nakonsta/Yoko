<template>
  <a            
    :href="file.url"    
    download
    class="product__document"
    target="_blank"
    >
    <svg class="product__svg" width="20" height="16">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#upload">
      </use>
    </svg>
    {{ file.name }}
  </a>
</template>
<script>
  import CatalogFile from '../../../components/admin/catalog/CatalogFile.vue'
  
  export default {
    name: 'CatalogFile',
    props: {
      file: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
.product{
  &__document{  
    color: $colorTurquoise;
    font-weight: 400;
    font-size: rem(14px);
    display: block;
  }
  &__svg{
    fill: $colorTurquoise;
    color: $colorTurquoise;
  }
}
</style>