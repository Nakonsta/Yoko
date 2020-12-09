<template>
  <ValidationProvider
      :tag="tag"
      :rules="rules"
      class="field__container"
      v-slot="{ errors, failed }"
      :name="$attrs.label && $attrs.label.toLowerCase()"
  >
    <span v-if="$attrs.label" class="field__label">{{ $attrs.label }}</span>
    <input type="hidden" v-model="innerValue.id">
    <multiselect
        v-if="isSingle"
        v-model="innerValue"
        value="id"
        class="form-select"
        :placeholder="placeholder"
        :class="{field: true, error: failed}"
        deselect-label=""
        track-by="id"
        label="name"
        selectedLabel=""
        selectLabel=""
        deselectLabel=""
        :options="options"
        :multiple="false"
        :searchable="searchable"
        :allow-empty="false"
        :loading="loading"
        :internal-search="false"
        :closeOnSelect="close"
        :disabled="disabled"
        @select=select
        @remove=remove
        @search-change="search"
    >
      <template
          slot="singleLabel"
          slot-scope="{ option }"
      >
        {{ option.name }}
      </template>
      <span slot="noOptions">Список пуст</span>
      <span slot="noResult">{{ noResult }}</span>
    </multiselect>
    <multiselect
        v-if="isMultiple"
        v-model="innerValue"
        class="form-select"
        :placeholder="placeholder"
        :class="{field: true, error: failed, 'form-select--multiple': multiple}"
        deselect-label=""
        track-by="id"
        label="name"
        selectedLabel=""
        selectLabel=""
        deselectLabel=""
        :options="options"
        :multiple="multiple"
        :searchable="searchable"
        :allow-empty="false"
        :loading="loading"
        :internal-search="false"
        :closeOnSelect="close"
        :disabled="disabled"
        @select=select
        @remove=remove
        @search-change="search"
    >
<!--      <template slot="tag" slot-scope="{ option }">-->
<!--        <span class="custom__tag">-->
<!--          <span>{{ option.name }}</span>-->
<!--        </span>-->
<!--      </template>-->
      <template slot="option" slot-scope="{ option }">
        <span
          class="checkbox"
          :class="{subunit: option.subunit, subsubunit: option.subSubunit}"
        >
          <input type="checkbox" v-model="option.checked" @focus.prevent>
          <span class="checkbox__body"></span>
          <span class="checkbox__text">
              {{ option.name }}
          </span>
        </span>
      </template>
      <span slot="noResult">{{ $attrs.label }} не найдены</span>
      <span slot="noOptions">Список пуст</span>
    </multiselect>
    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Select',
  props: {
    select: {
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isSingle: {
      type: Boolean,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Function,
      default: () => {}
    },
    search: {
      type: Function,
      default: () => {}
    },
    close: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Введите название или выберите из списка'
    },
    noResult: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'label'
    },
    options: {
      type: Array,
      default: null
    },
    text: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: 'required'
    },
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: ''
  }),
  watch: {
    innerValue (newVal) {
      this.$emit('input', newVal);
    },
    value (newVal) {
      this.innerValue = newVal;
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style lang="scss">
  @import "../../../assets/sass/variables/variables";

  .company {
    &-search {
      &__name {
        font-weight: 500;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }
      &__inn {
        color: $colorGray;
        font-weight: 400;
      }
    }
  }
</style>
