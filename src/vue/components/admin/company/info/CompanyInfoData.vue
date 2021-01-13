<template>
  <div 
    v-if="isVisible"
    class="company-info__data" 
  >
    <div class="company-info__heading">
      <slot>
        {{ title }}
      </slot>
    </div>
    <slot name="pre" />
    <div 
      v-for="(row, index) in info" 
      :key="index"
      class="company-info__row"
    >
      <label class="company-info__label">
        {{ row.title}}
      </label>
      <input
        v-if="isOnEdit" 
        :value="row.value"
        class="field company-info__input"
        type="text"
        @input="(value) => apply(row.key, value)"
      >
      <div 
        v-else 
        class="company-info__text"
      >
        {{ row.value}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyInfoData',
  props: {
    title: {
      type: String,
      default: null,
    },
    info: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    isOnEdit: false,
  }),
  computed: {
    isVisible() {
      return this.$slots.pre
        || (this.info && this.info.length);
    },
  },
  methods: {
    apply(key, value) {
      this.$emit('change', { [key]: value });
    },
  },
}
</script>

<style lang="scss" scoped>
.company-info {
  &__data {
    & + .company-info__data {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid #CDCDCC;
    }
  }

  &__heading {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #31ACB8;
  }

  &__row {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  &__label {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    flex: 1;
    max-width: 320px;

    color: #373735;
  }

  &__input {
    flex: 1;
  }

  &__text {
    flex: 1;
  }
}
</style>
