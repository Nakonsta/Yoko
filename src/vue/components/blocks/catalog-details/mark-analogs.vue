<template>
  <div id="analogs-mark">
    <table v-if="root.length" class="table">
      <thead>
        <tr>
          <th>Марка</th>
          <th>Отличие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in root" :key="index">
          <td><span class="mark-catalog__product">{{ item.mark }}</span></td>
          <td>{{ item.desc }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MarkAnalog",
  props: {
    root: {
      default: null,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
