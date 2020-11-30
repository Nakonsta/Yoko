<template>
  <div class="phone-container__item phone-container__item--select">
    <multiselect
      :value="value"
      deselect-label="Can't remove this value"
      track-by="phone_code"
      label="phone_code"
      class="phone-code form-select"
      selectedLabel=""
      selectLabel=""
      deselectLabel=""
      placeholder="Выберите страну"
      item-value="id"
      return-object
      :options="countries"
      :searchable="false"
      :allow-empty="false"
      @input="changeCurrentPhoneCode"
    >
      <template v-slot:singleLabel="prop">
        <div class="phone-code-block">
          <img :src="`data:image/png;base64,${prop.option.flag}`" alt="">
<!--          <div>-->
<!--            +{{ prop.option.phone_code }}-->
<!--          </div>-->
        </div>
      </template>
      <template v-slot:option="prop">
        <div class="phone-code-block">
          <img :src="`data:image/png;base64,${prop.option.flag}`" alt="">
          <div>
            +{{ prop.option.phone_code }}
          </div>
        </div>
      </template>
      <!-- <template v-slot:selection="slotProps">
        <div
          class="phone-code__flag-container phone-code__flag-container--selected"
        >
          <div class="phone-code__flag">
            <img
              :src="`data:image/png;base64,${slotProps.item.flag}`"
              alt="`"
            />
          </div>
        </div>
      </template> -->
      <!-- <template v-slot:item="slotProps">
        <div class="phone-code__flag-container">
          <div class="phone-code__flag">
            <img :src="`data:image/png;base64,${slotProps.item.flag}`" alt="" />
          </div>
          <div class="phone-code__code">+{{ slotProps.item.name }}</div>
        </div>
      </template> -->
    </multiselect>
  </div>
</template>

<script>
  export default {
    name: 'PhoneCodeCountries',

    props: {
        countries: {
            type: Array,
            required: true,
        },
        startCountry: {
            type: Object,
            required: false
        },
        value: {
          type: Object,
          default: () => {}
        }
    },

    data() {
      return {
        currentPhoneCode: {
            id: 0,
            name: '',
            phoneCode: 0,
            flag: '',
        },
      }
    },

    computed: {
        setCurrentPhoneCode() {
            console.log('startCountry');
            console.log(startCountry);
            // this.currentPhoneCode = startCountry
            // return currentPhoneCode
        }
    },

    methods: {
      changeCurrentPhoneCode(value) {
        this.$emit('input', value)
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/variables/fluid-variables";
  @import "../../assets/sass/mixins/fluid-mixin";
 .phone-code-block {
   display: flex;
   align-items: center;
   img {
     width: rem(25px);
     height: rem(25px);
     margin-right: rem(10px);
   }
 }
</style>
