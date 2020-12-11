<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="row">
    <div class="col">
      <button class="btn" @click="validation(true)">
        Опубликовать процедуру
      </button>
    </div>
    <div class="col">
      <button class="btn" @click="validation(false)">
        Сохранить черновик
      </button>
    </div>
    <div class="col">
      <router-link class="btn btn--bdr" to="/procedures">
        Отменить
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ControlElements',
    props: {
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

<style scoped lang="scss"></style>
