<template>
  <div class="main">
    <app-menu :window-width="windowWidth"></app-menu>
    
    <router-view />
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import api from '../helpers/api'
  import functions from '../helpers/functions'
  import AppMenu from '../components/blocks/Menu.vue'

  export default {
    name: 'Personal',
    components: {
      AppMenu,
      draggable,
    },
    mixins: [api, functions],
    data() {
      return {
        windowWidth: window.innerWidth,
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      })
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      onResize() {
        this.windowWidth = window.innerWidth
      },
    }
  }
</script>

<style lang="scss">
</style>
