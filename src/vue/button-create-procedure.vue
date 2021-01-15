<template>
    <a v-if="$store.getters.userRole === 'buyer'" href="/personal/procedures/new" class="page-banner__btn">
        Создать процедуру
    </a>
</template>

<script>
  export default {
    name: 'ButtonCreateProcedure'
  }
</script>