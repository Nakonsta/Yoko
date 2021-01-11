<template>
  <div class="page-title">
    <div class="container">
      <div class="page-title__title">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pageTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>