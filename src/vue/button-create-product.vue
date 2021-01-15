<template>
    <a v-if="$store.getters.userRole === 'contractor'" href="/personal/catalog/new" class="add-product-button btn">
        Добавить продукцию
    </a>
</template>

<script>
  export default {
    name: 'ButtonCreateProduct'
  }
</script>