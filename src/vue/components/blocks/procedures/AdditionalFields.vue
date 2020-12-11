<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Дополнительные поля</h3>
    <button class="btn btn--bdr field__container" @click="createNewFieldset">
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
              v-model="field.type"
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
              v-model="field.name"
              label="Название поля"
              placeholder="Введите название поля"
              :disabled="field.isSave"
          ></text-input>
        </div>
        <div v-if="
            field.type && field.type.id === 'text' ||
            field.type && field.type.id === 'number'
          "
          class="col col-md-8 col-sm-6 col-xs-12"
        >
          <div class="field-group">
            <text-input
                v-model="field.value"
                label="Содержание поля"
                :rules="{required: true, numeric: field.type.id === 'text' ? false : true}"
                :placeholder="field.type.id === 'text' ? 'Введите текст' : 'Введите число'"
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
        <div v-if="field.type && field.type.id === 'date'" class="col col-md-8 col-sm-6 col-xs-12">
          <div class="field-group">
            <date-time
                v-model="field.value"
                label="Описание поля"
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
              content="Вы допускаете торги по конкурсу"
              v-model="field.description"
              label="Описание поля"
              placeholder="Введите описание поля"
              :disabled="field.isSave"
          ></textarea-input>
        </div>
      </div>
      <div class="col col-xs-12">
        <div class="remove-btn" @click="removeField(key)">
          <svg class="sprite-cancel"><use xmlns\:xlink="http://www.w3.org/1999/xlink" xlink\:href="\./img/sprite.svg#cancel"></use></svg>
        </div>
      </div>
    </div>
    <app-control-elements
        :selected-data="selectedData"
        :validation="validation"
    ></app-control-elements>
  </div>
</template>

<script>
  import TextareaInput from "../../forms/Textarea";
  import TextInput from "../../forms/Input";
  import SelectInput from "../../forms/Select";
  import DateTime from "../../forms/DateTime";
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
