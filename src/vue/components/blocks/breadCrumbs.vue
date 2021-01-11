<template>
  <div class="bread-crumbs">
    <div class="container">
      <template v-for="(crumb, index) in crumbs">
        <template>
          <a
            v-if="index < crumbs.length - 1"
            :href="crumb.link"
          >
            {{ crumb.name }}
          </a>
          <span v-else>
            {{ crumb.name }}
          </span>
        </template>
        <span
          v-if="index < crumbs.length - 1"
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
    props: {
      crumbs: {
        type: Array,
        default: () => []
      }
    },
  }
</script>