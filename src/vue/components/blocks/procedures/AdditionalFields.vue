<template>
  <div v-if="selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Дополнительные поля</h3>
    <button class="btn field__container" @click="createNewFieldset">
      Добавить поле
    </button>
    <div
      v-for="(field, key) in selectedData.fields"
      :key="key"
      ref="field"
      class="row new-fields"
    >
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            ref="type"
            :is-single="true"
            :close="true"
            placeholder="Введите адрес"
            v-model="field.type"
            :options="fieldsData.fieldType"
            label="Выберите тип поля"
            :disabled="isCreatedProcedure || field.isSave"
            :select="changeTypeOfValue(key)"
        ></select-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            ref="name"
            v-model="field.name"
            label="Название поля"
            placeholder="Введите название поля"
            :disabled="field.isSave"
        ></text-input>
      </div>
      <div v-if="field.type === 'text' || field.type === 'number'" class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            ref="value"
            v-model="field.value"
            label="Содержание поля"
            placeholder="Введите текст"
            :disabled="field.isSave"
        ></text-input>
      </div>
      <div v-if="field.type === 'date'" class="col col-md-4 col-sm-6 col-xs-12">
        <date-time
            ref="value"
            v-model="field.value"
            label="Описание поля"
            placeholder="Выберите дату"
            :min-date="new Date(procedureIdData.setMinDates.publication_date)"
            :disabled="field.isSave"
        ></date-time>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <button class="btn" @click="saveField(key, $refs)">
          Сохранить
        </button>
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
  import ControlElements from "./ControlElements";

  export default {
    name: 'ContactInformation',
    components: {
      TextareaInput,
      TextInput,
      SelectInput,
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
      changeTypeOfValue: {
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
    data() {
      return {
        numMaxValidation: [
          (v) => /^\d{1,10}$/.test(v) || 'Вводите только цифровые значения',
        ],
      }
    },
  }
</script>

<style lang="scss">
  .new-fields {
    position: relative;
  }

  .remove-btn {
    position: absolute;
    top: -40px;
    right: 0;
  }
</style>
