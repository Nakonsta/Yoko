<template> 
  <div class="application__view">
      <span>Показывать:</span>
      <div class="dropdown">
          <div class="dropdown__value">{{ viewList[view] }}
            <svg class="application__svg">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#arrow-bottom"></use>
            </svg>
          </div>
          <div class="dropdown__list">
              <ul>
                  <li v-for="(item, index) in viewList">
                      <a href="javascript:{}" @click="viewItems(index)" class="{active: index === view}">{{ item }}</a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'Applicationfilter',
    data() {
      return {        
        view: 'all',
        viewList: {            
          'all': 'все',
          'new': 'новые',
          'approved': 'согласованны',
          'rejected': 'отклонены',
        }
      }
    },
    methods: {      
      viewItems(index){
        this.view = index
        this.$emit('on-filter',  this.view)
      }
    } 
  }
</script>
<style lang="scss" scoped>
  @import "../../../../assets/sass/variables/variables";
  @import "../../../../assets/sass/variables/fluid-variables";
  @import "../../../../assets/sass/mixins/fluid-mixin";
  @import "../../../../assets/sass/mixins/mq";

  .application {
    &__view {
      color: $colorGray;
      margin:  rem(5px) 0;     
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