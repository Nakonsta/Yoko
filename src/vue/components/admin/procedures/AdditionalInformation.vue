<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Дополнительная информация</h3>
    <textarea-input
        v-model="selectedData.addition_information"
        label="Дополнительная информация"
        placeholder="Введите текст"
        :disabled="isCreatedProcedure"
    ></textarea-input>
  </div>
</template>

<script>
  import TextareaInput from "@/components/forms/Textarea";

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
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
    },
  }
</script>

<style scoped></style>
