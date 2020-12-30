<template>
  <div id="appointment-mark">
    <p>{{ root.appointment }}</p>
  </div>
</template>

<script>
export default {
  name: "DescriptionMark",
  props: {
    root: {
      default: null,
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>
