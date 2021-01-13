<template>
  <div id="description-mark" class="typography" v-if="root.description">
    <p>{{ root.description }}</p>
  </div>
</template>

<script>
export default {
  name: "MarkAppointment",
  props: {
    root: {
      default: {},
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>
