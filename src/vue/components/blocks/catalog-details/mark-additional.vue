<template>
  <div id="additional-mark">
    <div class="row">
      <div class="col col-md-6 col-xs-12">
        <select-input
            :close="true"
            :is-single="true"
            v-model="dataForm.company"
            label="Выберите компанию из списка"
            placeholder="Выберите компанию из списка"
            :options="root"
        ></select-input>
      </div>
    </div>
    <div class="row" v-if="dataForm.company">
      <div class="col col-md-6 col-xs-12">
        <h4>Дополнительная информация</h4>
        <p>{{ dataForm.company.desc }}</p>
      </div>
      <div class="col col-xs-12">
        <div class="images">
          <div class="images-el" v-for="(item, index) in root[dataForm.company && dataForm.company.id].images" :key="index">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectInput from "../../forms/Select.vue";

export default {
  name: "MarkAdditional",
  components: {
    SelectInput
  },
  props: {
    root: {
      default: null,
      type: Array
    },
  },
  data: () => ({
    dataForm: {
      company: null,
    },
  }),
}
</script>

<style scoped lang="scss">
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";

  .images {
    display: flex;
    flex-wrap: wrap;
    margin-left: rem(-12px);
    margin-right: rem(-12px);
    &-el {
      padding: rem(12px);
      width: 25%;
      @media(max-width: 1024px) {
        width: calc(100% / 3);
      }
    }
    img {
      border-radius: rem(6px);
      max-width: 100%;
      display: block;
    }
  }
</style>
