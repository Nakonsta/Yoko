<template>
    <div class="products__search"
       :class="{ active: isActive }">
        <input
            type="text"
            placeholder="Поиск"
            :value="search"
            @input="handleSearch($event.target.value)"
            class="products__search-input"            
        />

        <svg @click="isActive = true">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#search"></use>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'catalog-search',
    data() {
      return {
        search: '',
        isActive: false
      }
    },
    methods: {
      handleSearch(value) {
          this.search = value

          this.$emit('on-search', this.search)
      }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.products__search {
    position: absolute;
    right: 50px;
    bottom: 0;
    width: 0;
    transition: right .5s, bottom .5s;
    @media(min-width: 550px){
      position: relative;
      right: 0;
    }
    svg {
        position: absolute;
        right: 0;
        bottom: 5px;

        width: 22px;
        height: 22px;
        fill: $colorTurquoise;
    }
    &.active{
      position: relative;
      width: 100%;
      right: 0;
      bottom: 0;
      max-width: 375px;
      .products__search-input{
        width: 100%;
        max-width: 375px;
        border-bottom: 1px solid $colorTurquoise;
      }
    }
}

.products__search-input {    
    outline: none;
    border: none;
    padding: rem(5px) rem(25px) rem(5px) 0;
    width: 0;
    background-color: transparent;
    font-family: Roboto;
    font-size: 16px;
    color: $colorText;
    &::placeholder {
        font-family: Roboto;
        font-size: 14px;
        color: $colorGray;
    }
}
</style>
