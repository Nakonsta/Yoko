<template>
  <div class="phone-container__item phone-container__item--select">
    <multiselect
        v-model="currentPhoneCode"
        deselect-label="Can't remove this value" 
        track-by="phone_code"
        label="phone_code"
        class="phone-code"
        selectedLabel=""
        selectLabel=""
        deselectLabel=""
        item-value="id"
        return-object
        :options="countries"
        @input="changeCurrentPhoneCode"
    >
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
      changeCurrentPhoneCode() {
        this.$emit('changePhoneCode', this.currentPhoneCode)
      },
    },
  }
</script>
