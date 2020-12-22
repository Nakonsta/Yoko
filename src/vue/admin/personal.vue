<template>
    <div class="main">
      <template v-if="$store.getters.userRole !== 'guest'">
        <app-menu :window-width="windowWidth" :full-mode="fullMode"></app-menu>

        <div class="test-container" :class="{fullMode: windowWidth < 1025 || fullMode}">
          <router-view @fullMode="getModeFromPage" />
        </div>
      </template>
      <noAuthBlock v-else />
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import api from '../helpers/api'
import functions from '../helpers/functions'
import AppMenu from '../components/blocks/Menu.vue'
import noAuthBlock from '../components/blocks/noAuthBlock'

export default {
    name: 'Personal',
    components: {
        AppMenu,
        draggable,
        noAuthBlock,
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
</style>
