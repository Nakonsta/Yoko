<template>
  <ValidationProvider
      :tag="(tag === 'label' && isSingle && searchable) ? 'span' : tag"
      :rules="rules"
      class="field__container select__container"
      :class="parentClass"
      v-slot="{ errors, failed, validate }"
      :name="$attrs.label && $attrs.label.toLowerCase() || validationName"
  >
    <span v-if="$attrs.label" class="field__label">{{ $attrs.label }}</span>
    <input type="hidden" v-model="innerValue">
    <div class="relative">
      <multiselect
        v-if="isSingle"
        v-model="innerValue"
        :value="!isArray ? 'id' : null"
        class="form-select"
        :placeholder="placeholder"
        :class="{field: true, error: failed}"
        :track-by="!isArray ? 'id' : ''"
        :label="!isArray ? 'name' : ''"
        :show-labels="false"
        :options="options"
        :multiple="false"
        :searchable="searchable"
        :loading="loading"
        :internal-search="false"
        :closeOnSelect="close"
        :disabled="disabled"
        :allow-empty="false"
        @close="() => closeEvent(validate)"
        @select=select
        @remove=remove
        @search-change="search"
    >
      <template
          slot="singleLabel"
          slot-scope="{ option }"
          v-if="!isArray"
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
      <tooltip v-if="!!content" :content="content" />
    </div>
    <span v-if="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import Tooltip from '../tooltip'

export default {
  name: 'Select',
  components: {
    Tooltip
  },
  props: {
    parentClass: {
      type: String,
      default: 'field__container'
    },
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
    isArray: {
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
    content: {
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
    validationName: {
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
  },
  methods: {
    closeEvent(validate) {
      setTimeout(() =>validate(), 100)
    }
  }
};
</script>

<style lang="scss">
  .select__container {
    .tooltip {
      position: absolute;
      right: 50px;
      top: 13px;
      z-index: 10;
    }
  }
</style>
