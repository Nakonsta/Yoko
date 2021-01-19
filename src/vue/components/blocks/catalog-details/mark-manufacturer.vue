<template>
  <div id="manufacturer-mark">
    <companiesList
            :items="root"
            :show-counters="false"
            link-target="_blank"
    />
  </div>
</template>

<script>
import companiesList from "@/components/companies/list.vue";
export default {
  name: "MarkManufacturer",
  components: {
    companiesList,
  },
  props: {
    root: {
      default: null,
      type: Array,
    }
  }
}
</script>