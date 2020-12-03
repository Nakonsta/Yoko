<template>
  <div>
    <div>
      <router-link to="/personal">Перейти к главной</router-link>
    </div>
    <div>
      <router-link to="/personal/page1">Перейти к Странице 1</router-link>
    </div>
    <div>
      <router-link to="/personal/page2">Перейти к Странице 2</router-link>
    </div>
    <div class="test-container">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Personal'
  }
</script>

<style lang="scss">
  .test-container {
    margin-top: 20px;
  }
</style>