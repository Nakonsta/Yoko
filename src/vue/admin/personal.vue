<template>
  <div class="main">
    <app-menu :window-width="windowWidth"></app-menu>
    <!-- <div>
      <router-link to="/personal">Перейти к главной</router-link>
    </div>
    <div>
      <router-link to="/personal/page1">Перейти к Странице 1</router-link>
    </div>
    <div>
      <router-link to="/personal/page2">Перейти к Странице 2</router-link>
    </div>-->
    <div class="test-container">
      <router-view />
    </div>
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
