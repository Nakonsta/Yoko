<template>
  <div id="appointment-mark" class="typography">
    <p>{{ root.appointment }}</p>
  </div>
</template>

<script>
export default {
  name: "AppointmentMark",
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
