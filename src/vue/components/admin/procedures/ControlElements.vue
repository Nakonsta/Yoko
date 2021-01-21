<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="row">
    <div class="col mb1">
      <button class="btn" @click="validation(true)">
        Опубликовать процедуру
      </button>
    </div>
    <div class="col mb1">
      <button class="btn" @click="validation(false)">
        Сохранить черновик
      </button>
    </div>
    <div class="col mb1">
      <router-link class="btn btn--bdr" to="/personal/procedures">
        Отменить
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ControlElements',
    props: {
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
      selectedData: {
        default: null,
        type: Object,
      },
      validation: {
        default: () => {},
        type: Function,
      },
    },
  }
</script>

<style scoped lang="scss">
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";

.row {
  margin-top: rem(24px);
}
</style>
