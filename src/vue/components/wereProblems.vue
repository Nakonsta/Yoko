<template>
  <div
    class="wereProblems"
  >
    <div class="wereProblems__title"><b>Техническая поддержка</b></div>
    <div>Свяжитесь с нами по телефону:</div>
    <div>
      +7 999 333 - 22 - 11 (круглосуточно)<br />
      <b>или</b><br />
      <router-link
          class="wereProblems__link"
          :to="authorization ? '/feedback-public/' : '/feedback/'"
      >
        Заполни заявку
      </router-link
      >
      - менеджер ответит в течение 30 минут
    </div>
    <br>
    <button class="btn btn--bdr btn--sm" v-if="setIf" @click="resetList">Reset</button>
  </div>
</template>

<script>
  export default {
    name: 'WereProblems',
    props: {
      authorization: {
        default: false,
        type: Boolean,
      },
      setIf: {
        default: false,
        type: Boolean,
      },
      resetList: {
        default: () => {},
        type: Function,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wereProblems {
    background-color: #f5f5f5;
    padding: 2rem;
    font-size: 12px;
    &__link {
      color: #00b8d4;
    }
    &__title {
      font-size: 14px;
      margin-bottom: 1.5rem;
    }
    b {
      font-weight: 500;
    }
  }
</style>
