<template>
  <div class="bread-crumbs">
    <div class="container">
      <template v-for="(crumb, index) in breadCrumbs">
        <template>
          <a
            v-if="index < breadCrumbs.length - 1"
            :href="crumb.link"
          >
            {{ crumb.name }}
          </a>
          <span v-else>
            {{ crumb.name }}
          </span>
        </template>
        <span
          v-if="index < breadCrumbs.length - 1"
          class="bread-crumbs__separator"
        >
          •
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    breadCrumbs() {
      return this.$store.state.breadCrumbs;
    },
  },
  created() {
    this.$store.commit('setCrumbs');
  },
  watch: {
    $route() {
      this.$store.commit('setCrumbs');
    },
  },
};
</script>
