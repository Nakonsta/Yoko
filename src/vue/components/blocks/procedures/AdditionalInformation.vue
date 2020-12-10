<template>
  <div v-if="selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Дополнительная информация</h3>
    <textarea-input
        v-model="selectedData.addition_information"
        label="Дополнительная информация"
        placeholder="Введите текст"
    ></textarea-input>
  </div>
</template>

<script>
  import TextareaInput from "../../forms/Textarea";

  export default {
    name: 'AdditionalInformation',
    components: {
      TextareaInput,
    },
    props: {
      selectedData: {
        default: null,
        type: Object,
      },
    },
  }
</script>

<style scoped></style>
