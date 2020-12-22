<template>
    <div class="main">
      <template v-if="$store.getters.userRole !== 'guest'">
        <app-menu :window-width="windowWidth" :full-mode="fullMode"></app-menu>

        <div class="test-container" :class="{fullMode: windowWidth < 1025 || fullMode}">
          <router-view @fullMode="getModeFromPage" />
        </div>
      </template>
      <div v-else class="no-auth-block">
        <preloader />
      </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import api from '../helpers/api'
import functions from '../helpers/functions'
import AppMenu from '../components/blocks/Menu.vue'
import preloader from "@/components/preloader";

export default {
    name: 'Personal',
    components: {
        AppMenu,
        draggable,
        preloader,
    },
    mixins: [api, functions],
    data() {
        return {
        windowWidth: window.innerWidth,
        fullMode: false,
        }
    },
    watch: {
      $route(to, from) {
        this.fullMode = false
        closePopupById('#menu')
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
        getModeFromPage() {
            this.fullMode = true
        },
        onResize() {
            this.windowWidth = window.innerWidth
        },
    }
}
</script>

<style lang="scss">
  .no-auth-block {
    height: 20rem;
  }
</style>
