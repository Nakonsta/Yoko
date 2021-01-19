<template>
    <div>
      <breadCrumbs
          :crumbs="breadCrumbs"
      />
      <div class="section section--green">
        <div class="container">
          <div :key="$store.state.newUserDataSignal" class="main">
            <template v-if="$store.getters.userRole !== 'guest'">
              <app-menu :window-width="windowWidth" :full-mode="fullMode"></app-menu>

              <div class="test-container" :class="{fullMode: windowWidth < 1025 || fullMode}">
                <router-view :key="$route.fullPath" @fullMode="getModeFromPage" />
              </div>
            </template>
            <noAuthBlock v-else />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import api from '../helpers/api'
import functions from '../helpers/functions'
import AppMenu from '../components/blocks/Menu.vue'
import noAuthBlock from '../components/blocks/noAuthBlock'
import breadCrumbs from "@/components/blocks/breadCrumbs";

export default {
    name: 'Personal',
    components: {
        AppMenu,
        draggable,
        noAuthBlock,
        breadCrumbs
    },
    mixins: [api, functions],
    data() {
        return {
            breadCrumbs: [
                {
                    name: 'Главная',
                    link: '/'
                },
                {
                    name: 'Личный кабинет',
                    link: '/personal'
                }
            ],
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
