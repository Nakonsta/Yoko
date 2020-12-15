<template>
  <div class="tooltip">
    <div class="tooltip-body" @mouseover="isHide = false" @mouseleave="isHide = true" >
      <svg class="sprite-question">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#question"></use>
      </svg>
    </div>
    <transition name="fade-loader">
      <div class="tooltip-content" :class="{hide: isHide}">
        {{ content }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    content: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      isHide: true
    }
  },
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  margin-left: 15px;

  &-body {
    svg {
      width: 20px;
      height: 20px;
    }
  }

  &-content {
    position: absolute;
    top: 110%;
    left: 10px;
    color: white;
    padding: 6px 15px;
    background: #373735;
    border-radius: 4px;
    font-size: 12px;
    max-width: 220px;
    display: inline-block;

    &.hide {
      display: none;
    }
  }
}
</style>
