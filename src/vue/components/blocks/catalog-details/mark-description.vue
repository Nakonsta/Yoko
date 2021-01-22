<template>
  <div
    id="description-mark"
    class="typography"
    v-html="root.description"
  />
</template>

<script>
export default {
  name: 'MarkAppointment',
  props: {
    root: {
      default: () => {},
      type: Object,
    },
  },
};
</script>

<style scoped>

</style>
