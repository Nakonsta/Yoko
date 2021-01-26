<template>
  <div id="appointment-mark" class="typography">
    <p v-for="(item) in root.appointment.split('\n')">{{ item }}</p>
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
