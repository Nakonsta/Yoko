<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Контактная информация</h3>
    <div class="row">
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <select-input
            label="ФИО"
            :is-single="true"
            :close="true"
            placeholder="Выберите из списка"
            :disabled="isCreatedProcedure"
            v-model="selectedData.contact_full_name"
            :options="fieldsData.contacts_list"
            :select="setUserInfo"
        ></select-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            :disabled="true"
            v-model="selectedData.contact_phone"
            label="Телефон"
            mask="+7 (###) ###-####"
        ></text-input>
      </div>
      <div class="col col-md-4 col-sm-6 col-xs-12">
        <text-input
            :disabled="true"
            type="email"
            v-model="selectedData.contact_email"
            label="Email"
        ></text-input>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from '@/components/forms/Input.vue'
  import SelectInput from '@/components/forms/Select.vue'

  export default {
    name: 'ContactInformation',
    components: {
      TextInput,
      SelectInput,
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
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
      selectsValidation: {
        default: () => {},
        type: Function,
      },
      emailValidation: {
        default: () => {},
        type: Function,
      },
      phoneValidation: {
        default: () => {},
        type: Function,
      },
      textValidation: {
        default: () => {},
        type: Function,
      },
    },
    methods: {
      setUserInfo(e) {
        this.selectedData.contact_phone = e.phone
        this.selectedData.contact_email = e.email
      },
    },
  }
</script>

<style scoped></style>
