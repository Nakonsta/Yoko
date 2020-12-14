<template>
  <div class="card__loader card__loader--absolute">
    <div class="preloader">
      <div class="preloader__preloader">
        <div class="preloader__loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Preloader',
    }
</script>

<style lang="scss" scoped>
  .preloader {
    z-index: 99;
    background: rgba(white, 0.5);
  }
</style>
