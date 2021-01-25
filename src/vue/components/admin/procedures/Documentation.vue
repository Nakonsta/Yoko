<template>
  <div
      class="container-item"
      :class="{hideIt: procedureIdData.procedureType === 'Commercial' && fieldsData.hideBlock.documentation}"
      v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id"
  >
    <div
        class="function-btn"
        :class="{active: fieldsData.hideBlock.documentation}"
        v-if="procedureIdData.procedureType === 'Commercial'"
        @click="removeBlock('documentation')"
    >
      <tooltip content="Скрыть блок" icon="\./img/sprite.svg#cancel" />
    </div>
    <h3 class="procedure__main-title">Конкурсная документация</h3>
    <div class="row">
        <!--      TODO: доделать бэк для раздела документации-->
        <!--<div class="col col-lg-6 col-md-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.application_documentation_section"
            label="Раздел документации"
            :options="fieldsData.applicationDocumentationSection"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div class="col col-lg-6 col-md-6 col-xs-12">
        <select-input
            :is-single="true"
            :close="true"
            placeholder=""
            v-model="selectedData.application_title_of_the_document"
            label="Наименование документа"
            :options="fieldsData.titleOfTheDocument"
            :disabled="isCreatedProcedure"
        ></select-input>
      </div>
      <div class="col col-xs-12">
        <button
            class="btn"
            :disabled="!selectedData.application_title_of_the_document"
            @click="selectedData.application_documentation_checked === true"
        >
          Добавить в процедуру
        </button>
      </div>-->
      <div class="col col-xs-12">
        <uploader
            :max="true"
            v-model="selectedData.file"
            extensions=".pdf, .doc, .docx, .xls, .xlsx, .jpeg, .png"
            :is-not-files="isNotFiles"
            :disabled="isCreatedProcedure"
            :metatypes="[
                'image/png',
                'image/jpeg',
                'application/pdf',
                'application/msword',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sh',
              ]"
        ></uploader>
      </div>
    </div>
  </div>
</template>

<script>
  import Tooltip from "@/components/tooltip"
  import SelectInput from "@/components/forms/Select"
  import Uploader from "@/components/uploder"

  export default {
    name: 'Documentation',
    components: {
      Tooltip,
      SelectInput,
      Uploader,
    },
    props: {
      selectedData: {
        default: null,
        type: Object,
      },
      fieldsData: {
        default: null,
        type: Object,
      },
      isNotFiles: {
        default: false,
        type: Boolean,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
      procedureIdData: {
        default: null,
        type: Object,
      },
      removeBlock: {
        default: () => {},
        type: Function,
      },
      selectsValidation: {
        default: () => {},
        type: Function,
      },
      setFiles: {
        default: () => {},
        type: Function,
      },
      textValidation: {
        default: () => {},
        type: Function,
      },
    },
    methods: {
      attachApplication(evt) {
        const files = evt.target.files || evt.dataTransfer.files;
        if (!files.length)
          return;
        this.selectedData.file = files[0];
      },
    },
  }
</script>

<style scoped></style>
