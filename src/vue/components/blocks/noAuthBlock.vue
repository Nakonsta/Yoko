<template>
  <div v-else class="no-auth-block">
    Вы не авторизованы
    <a href="#singin" class="btn popup-link">Авторизоваться</a>
  </div>
</template>

<script>
  export default {
    name: 'noAuthBlock'
  }
</script>

<style lang="scss">
.no-auth-block {
  width: 100% !important;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>