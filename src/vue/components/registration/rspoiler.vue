<template>
  <div class="spoiler">
    <div class="spoiler__header" :class="{active: show}" @click="show = !show">
      <slot name="header"></slot>
      <div class="spoiler__header-arrow">
        <i :class="show ? 'icon-up-open' : 'icon-down-open'"></i>
      </div>
    </div>
    <div v-if="show" class="spoiler__body" :duration="500">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RSpoiler',
    data() {
      return {
        show: false,
        height: 0,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .spoiler {
    &__header {
      transition: 0.3s color;
      position: relative;
      padding: 10px 0;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      font-size: 18px;
      &:hover {
        color: #00b8d4;
      }
      &.active {
        border-color: #9B9B9A;
        + .spoiler__body {
          border-color: #9B9B9A;
        }
      }
      > div:first-child {
        padding-right: 2rem;
      }
    }
    &__header-arrow {
      position: absolute;
      top: 50%;
      right: 0;
      transform: rotateX(0deg) translate(0%, -50%);
      &--top {
        transform: rotateX(180deg) translate(0%, -50%);
      }
    }
    &__body {
      font-size: 18px;
      border-bottom: 1px solid transparent;
    }
  }
  .arrow {
    transition: 0.5s transform;
    transform: rotateX(0deg);
    &--rotate {
      transform: rotateX(180deg);
    }
  }
</style>
