<template>
  <ValidationObserver ref="form1" tag="div" mode="eager">
    <form class="support-form__form" @submit.prevent="(evt) => evt.preventDefault()" slot-scope="{ valid }">
      <h3>Шаг 1: Заполните Личные данные</h3>
      <text-input v-model="dataForm.lastName" label="Фамилия"></text-input>
      <text-input v-model="dataForm.firstName" label="Имя"></text-input>
      <text-input v-model="dataForm.secondName" label="Отчество"></text-input>
      <text-input v-model="dataForm.position" label="Должность"></text-input>
      <text-input v-model="dataForm.email" label="E-mail" rules="required|email" type="email"></text-input>
      <text-input
          v-model="dataForm.password"
          label="Пароль"
          rules="required|min:7"
          type="password"
      ></text-input>
      <text-input
          v-model="dataForm.passwordRepeat"
          label="Повторите пароль"
          :rules="{required: true, repeatPass: dataForm.password}"
          type="password"
          vid="password"
      ></text-input>
      <div class="phone-container">
        <div class="support-form__item">
          <span class="field__label">Телефон</span>
          <PhoneCodeCountries
            :countries="lists.countries"
            v-model="dataForm.currentPhoneCode"
          />
        </div>
        <div class="support-form__item support-form__phone">
          <text-input
              type="tel"
              v-model="dataForm.phone"
              :rules="{ required: true, customPhone: true }"
              :mask="`+${codePhone.phone_code} (###) ###-####`"
          ></text-input>
        </div>
      </div>
      <div class="field__container">
        Нажимая на кнопку "Сохранить и продолжить" вы принимаете условия
        <a href="#" class="feedback__link">Пользовательского соглашения</a>, соглашаетесь на
        <a href="#" class="feedback__link">обработку персональных данных</a> и получение сообщений
      </div>
      <div class="field__container">
        <button class="btn" @click="nextStep">
          Сохранить и продолжить
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import PhoneCodeCountries from '../phoneCodeCountries.vue'
import TextInput from '../forms/Input.vue'

export default {
  name: 'formStep1',
  components: {
    PhoneCodeCountries,
    TextInput
  },
  props: {
    step: {
      default: 1,
      type: Number,
    },
    dataForm: {
      default: null,
      type: Object,
    },
    lists: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      phoneMaskInstance: null,
    }
  },
  computed: {
    codePhone() {
      return this.dataForm.currentPhoneCode
    },
  },
  watch: {
    codePhone() {
      this.dataForm.phone = ``
    },
  },
  methods: {
    nextStep() {
      if (this.step === 1) {
        this.$refs.form1.validate().then((res) => {
          if(res) {
            this.$emit('newStep', 2)
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
