<template>
  <div class="products__sort">
      <span>Сортировать по:</span>
      <div class="dropdown">
          <div class="dropdown__value">{{ sortList[sort] }}
            <svg class="products__svg">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#arrow-bottom"></use>
            </svg>
          </div>
          <div class="dropdown__list">
              <ul>
                  <li v-for="(item, index) in sortList">
                      <a href="javascript:{}" @click="sortItems(index)" class="{active: index === sort}">{{ item }}</a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'Catalogsort',
    data() {
      return {
        sort: 'desc',
        sortList: {
            'desc': 'дате размещения (от новых к старым)',
            'asc': 'дате размещения (от старых к новым)',
        },        
      }
    },
    methods: {
      sortItems(index){
        this.sort = index
        this.$emit('on-sort', this.sort)

      }      
    } 
  }
</script>
<style lang="scss" scoped>
  @import "../../../../assets/sass/variables/variables";
  @import "../../../../assets/sass/variables/fluid-variables";
  @import "../../../../assets/sass/mixins/fluid-mixin";
  @import "../../../../assets/sass/mixins/mq";

  .products {
    &__sort{
      color: $colorGray;
      margin: 0;      
      @media(min-width: 550px){
        margin-right: rem(56px);
        width: auto;
    }
  }
    &__svg{
      color: $colorGray;
      fill: $colorGray;
      width: 10px;
      height: 5px;
    }
  }
</style>