<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Дополнительные поля</h3>
    <button class="btn btn--bdr field__container" :disabled="isCreatedProcedure" @click="createNewFieldset">
      Добавить поле
    </button>
    <div
      v-for="(field, key) in selectedData.fields"
      :key="key"
      ref="field"
      class="new-fields"
    >
      <div class="row">
        <div class="col col-md-4 col-sm-6 col-xs-12">
          <select-input
              :is-single="true"
              :close="true"
              placeholder="Введите адрес"
              v-model="field.types"
              :options="fieldsData.fieldType"
              label="Выберите тип поля"
              :disabled="isCreatedProcedure || field.isSave"
              :select="() => changeTypeOfValue(key)"
          ></select-input>
        </div>
      </div>
      <div class="row">
        <div class="col col-md-4 col-sm-6 col-xs-12">
          <text-input
              :maxlength=100
              v-model="field.name"
              label="Название поля"
              :rules="{required: true, max: 100 }"
              placeholder="Введите название поля"
              :disabled="field.isSave"
          ></text-input>
        </div>
        <div v-if="
            field.types && (field.types.id === 'text' || field.types.id === 'number')
          "
          class="col col-md-8 col-sm-6 col-xs-12"
        >
          <div class="field-group">
            <text-input
                v-model="field.value"
                label="Содержание поля"
                :rules="{
                  required: true,
                  numeric: field.types.id === 'text' ? false : true,
                  max: field.types.id === 'text' ? 100 : 10,
                }"
                :placeholder="field.types.id === 'text' ? 'Введите текст' : 'Введите число'"
                :disabled="field.isSave"
            ></text-input>
            <button
                class="btn btn--bdr"
                @click="() => saveField(key)"
                :disabled="!(field.value && field.description && field.name) || field.isSave"
            >
              Сохранить
            </button>
          </div>
        </div>
        <div v-if="field.types && field.types.id === 'date'" class="col col-md-8 col-sm-6 col-xs-12">
          <div class="field-group">
            <date-time
                v-model="field.value"
                label="Содержание поля"
                placeholder="Выберите дату"
                :min-date="new Date(procedureIdData.setMinDates.publication_date)"
                :disabled="field.isSave"
            ></date-time>
            <button
                class="btn btn--bdr"
                @click="() => saveField(key)"
                :disabled="!(field.value && field.description && field.name)"
            >
              Сохранить
            </button>
        </div>
      </div>
        <div class="col col-xs-12">
          <textarea-input
              ref="description"
              v-model="field.description"
              label="Описание поля"
              placeholder="Введите описание поля"
              :disabled="field.isSave"
          ></textarea-input>
        </div>
      </div>
      <div class="col col-xs-12">
        <div v-if="!isCreatedProcedure" class="remove-btn" @click="removeField(key)">
          <svg class="sprite-cancel"><use xmlns\:xlink="http://www.w3.org/1999/xlink" xlink\:href="\./img/sprite.svg#cancel"></use></svg>
        </div>
      </div>
    </div>
    <app-control-elements
        v-if="!isCreatedProcedure"
        :selected-data="selectedData"
        :validation="validation"
    ></app-control-elements>
  </div>
</template>

<script>
  import TextareaInput from "@/components/forms/Textarea";
  import TextInput from "@/components/forms/Input";
  import SelectInput from "@/components/forms/Select";
  import DateTime from "@/components/forms/DateTime";
  import ControlElements from "./ControlElements";

  export default {
    name: 'ContactInformation',
    components: {
      TextareaInput,
      TextInput,
      SelectInput,
      DateTime,
      appControlElements: ControlElements,
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
      procedureIdData: {
        default: null,
        type: Object,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
      createNewFieldset: {
        default: () => {},
        type: Function,
      },
      removeField: {
        default: () => {},
        type: Function,
      },
      saveField: {
        default: () => {},
        type: Function,
      },
      validation: {
        default: () => {},
        type: Function,
      },
    },
    methods: {
      changeTypeOfValue(id) {
        this.selectedData.fields[id].value = null
      },
    }
  }
</script>

<style lang="scss">
  .new-fields {
    position: relative;
  }

  .remove-btn {
    position: absolute;
    top: -10px;
    right: 0;
  }
</style>
