<template>
    <a v-if="$store.getters.userRole === 'contractor'" href="/personal/catalog/new" class="page-banner__btn page-banner__btn--product btn">
        Добавить продукцию
    </a>
</template>

<script>
  export default {
    name: 'ButtonCreateProduct'
  }
</script>