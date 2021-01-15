<template>
  <div
      class="container-item"
      :class="{hideIt: procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.additional_info}"
      v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id"
  >
    <div
        class="function-btn"
        :class="{active: fieldsData.hideBlock.additional_info}"
        v-if="procedureIdData.procedureType === 'Commercial'"
        @click="removeBlock('additional_info')"
    >
      <tooltip content="Скрыть блок" icon="\./img/sprite.svg#cancel" />
    </div>
    <h3 class="procedure__main-title">Дополнительная информация</h3>
    <textarea-input
        :maxlength=null
        v-model="selectedData.addition_information"
        label="Дополнительная информация"
        placeholder="Введите текст"
        :rules="{required: false}"
        :disabled="isCreatedProcedure"
    ></textarea-input>
  </div>
</template>

<script>
  import Tooltip from "@/components/tooltip"
  import TextareaInput from "@/components/forms/Textarea"

  export default {
    name: 'AdditionalInformation',
    components: {
      Tooltip,
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
      fieldsData: {
        default: null,
        type: Object,
      },
      procedureIdData: {
        default: null,
        type: Object,
      },
      removeBlock: {
        default: () => {},
        type: Function,
      },
    },
  }
</script>

<style scoped></style>
