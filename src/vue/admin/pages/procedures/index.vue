<template>
  <div class="procedure-new container-item">
    <accreditations-title title="Торговые процедуры" margin="0 0 30px 0"></accreditations-title>
    <router-link to="/personal/procedures/new" class="btn">Создать новую процедуру</router-link>
  </div>
</template>

<script>
import AccreditationsTitle from '@/components/admin/accreditations/AccreditationsTitle'
export default {
  name: "index",
  components: {
    AccreditationsTitle
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
