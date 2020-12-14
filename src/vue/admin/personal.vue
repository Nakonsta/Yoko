<template>
    <div class="main">
    <app-menu :window-width="windowWidth" :full-mode="fullMode"></app-menu>

    <div class="test-container" :class="{fullMode: windowWidth < 1025 || fullMode}">
      <router-view @fullMode="getModeFromPage" />
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
        fullMode: false,
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
