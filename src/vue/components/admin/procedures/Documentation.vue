<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Документация</h3>
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
            :multiple="true"
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
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sh',
              ]"
        ></uploader>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectInput from "@/components/forms/Select";
  import Uploader from "@/components/uploder";

  export default {
    name: 'Documentation',
    components: {
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
