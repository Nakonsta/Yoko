<template>
  <div class="application">
    <div class="application__flexlayout">
      <div class="application__flexcol">
        <div class="application__number">
        {{app.number}}
        </div>
        <div class="application__law">
          223-ФЗ Аукцион
        </div>
      </div>
      <div class="application__status">
        {{app.status}}
      </div>
    </div>
    <div class="application__flexlayout">
      <div class="application__flexwrap">
        <div class="application__company">
          Компания
          <a href="#" class="application__name">
            {{app.company}}
          </a>
        </div>
        <div class="application__option">
          Объект закупки
          <div class="application__text application__text--object">
            <span>{{app.object}}</span>
          </div>
        </div>
      </div>
      <div class="application__flex">
        <div class="application__option application__col">
          {{app.type}}
          <div class="application__text">
            {{app.trade}}
          </div>
        </div>
        <div class="application__option application__col">
          Дата окончания:
          <div class="application__text">
            {{app.end}}
          </div>
        </div>
        <div class="application__option application__col">
          Начальная цена:
          <div class="application__price">
            <nobr>{{app.price}}</nobr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'applicationBlock',
    props: ['app']    
  }
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.application{
  margin: 20px auto;
  padding: 24px;
  background: #fff;
  max-width: 770px;
  position: relative;
  @include mq($from: tablet){
    max-width: 100%;
  }
    &__number{
    font-size: 18px;
    font-weight: 500;
    color: #373735;
    @include mq($from: tablet){
      margin-right: 24px;
    }
  }     
  &__flexlayout{
    @include mq($from: tablet){
      display: flex;
      justify-content: space-between;
    }      
  }    
  &__flex{
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-left: -17px;
    margin-right: -17px;
    @include mq($from: 840px){
      justify-content: flex-end;
      width: 66%;
    }      
  }    
  &__flexcol{
    @include mq($from: tablet){
      display: flex;
    }      
  }    
   
  &__law{
    color:#9B9B9A;
    font-size: 18px;
  }    
  &__status{
    margin: 16px 0 32px 0;
    color: #373735;
    font-size: 14px;
    font-weight: 700;
    @include mq($from: tablet){
       margin: 0;
    }     
  }   
  &__company{
    color: #373735;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
  }    
  &__name{
    color: #31ACB8;
    font-size: 14px;
    display: block;
    line-height: 20px;
    text-decoration: underline;
  }   
  &__option{
    color: #9B9B9A;
  }    
  &__col{
    width: calc(50% - 34px);
    margin-left: 17px;
    margin-right: 17px;
    margin-top: 16px;
    @include mq($from: 840px){
      width: calc(33% - 34px);
      margin-top: 20px;
      &:last-child{
        align-items: flex-end;
        display: flex;
        flex-direction: column;
      }
    }
  }
  &__text{
    color: #373735;
    font-size: 14px;
    line-height: 20px;
    position: relative;
  }
  &__price{
    color: #373735;
    font-size: 20px;
    line-height: 27px;
  }
  &__flexwrap{
    @include mq($from: 1000px);
      margin-top: 20px;
  }
}
</style>