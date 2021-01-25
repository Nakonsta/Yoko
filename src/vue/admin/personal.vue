<template>
  <div>
    <breadCrumbs />
    <div class="section section--green">
      <div class="container">
        <div
          :key="$store.state.newUserDataSignal"
          class="main"
        >
          <template v-if="$store.getters.userRole !== 'guest'">
            <app-menu
              :window-width="windowWidth"
              :full-mode="fullMode"
            />

            <div
              class="test-container"
              :class="{
                fullMode: windowWidth < 1025 || fullMode,
              }"
            >
              <router-view
                :key="$route.fullPath"
                @fullMode="getModeFromPage"
              />
            </div>
          </template>
          <noAuthBlock v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/helpers/api';
import functions from '@/helpers/functions';

import breadCrumbs from '@/components/blocks/breadCrumbs';
import AppMenu from '@/components/blocks/menu.vue';
import noAuthBlock from '@/components/blocks/noAuthBlock';

export default {
  name: 'Personal',
  components: {
    AppMenu,
    noAuthBlock,
    breadCrumbs,
  },
  mixins: [
    api,
    functions,
  ],
  data() {
    return {
      windowWidth: window.innerWidth,
      fullMode: false,
    };
  },
  watch: {
    $route() {
      this.fullMode = false;
      window.closePopupById('#menu');
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    getModeFromPage() {
      this.fullMode = true;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
