<template>
  <ValidationObserver ref="form1" tag="div" mode="eager">
    <form class="support-form__form" @submit.prevent="(evt) => evt.preventDefault()" slot-scope="{ valid }">
      <h3>Шаг 3: Заполните Адреса и Реквизиты</h3>
      <div v-if="oldCompany === '0'">
        <p><b>Создать новую учетную запись к данной компании</b></p>
      </div>
      <div v-if="oldCompany === '1'">
        <p>
          <b>
            Компания с ИНН {{ inn }} уже зарегистрирована: {{ dataForm.fullCompanyName }}.
          </b>
        </p>
        <p>
          Попробуйте <a href="#">восстановить</a> логин или пароль. Если возникли проблемы с
          доступом воспользуйтесь <a href="#">формой обратной связи</a>
        </p>
      </div>
      <div class="registration-form__title">Название организации</div>
      <text-input
          v-model="dataForm.fullCompanyName"
          label="Полное имя организации"
          :disabled="oldCompany === '1'"
      ></text-input>
      <text-input
          v-model="dataForm.abbreviatedName"
          label="Краткое имя организации"
          :disabled="oldCompany === '1'"
      ></text-input>
      <text-input
          v-model="dataForm.ogrn"
          label="ОГРН/ОГРНИП"
          :disabled="oldCompany === '1'"
          :mask="
            organizationType === 'LEGAL_ENTITY'
              ? '#### #### #####'
              : '##### ##### #####'
          "
          :rules="
            dataForm.organizationType === 'LEGAL_ENTITY'
              ? 'required|length:17'
              : 'required|length:15'
          "
      ></text-input>
      <text-input
          v-if="organizationType === 'LEGAL_ENTITY'"
          v-model="dataForm.kpp"
          label="КПП"
          mask="#### #####"
          :disabled="oldCompany === '1'"
          rules="required|length:10"
      ></text-input>
      <div class="registration-form__title">Юридический адрес</div>
      <select-input
          :is-single="true"
          v-model="dataForm.legalAddress.country"
          label="Страна"
          :options="lists.countries"
          :disabled="oldCompany === '1'"
      ></select-input>
      <text-input
          v-model="dataForm.legalAddress.address"
          label="Адрес"
          :disabled="oldCompany === '1'"
      ></text-input>
      <text-input
          v-model="dataForm.legalAddress.mailIndex"
          label="Почтовый индекс"
          mask="#########"
          :disabled="oldCompany === '1'"
      ></text-input>
      <div class="registration-form__title">Фактический адрес</div>
      <checkbox-input
          :rules="{required:false}"
          name="coincidesLegalAddress"
          v-model="dataForm.actualAddress.coincidesLegalAddress"
          :label="[{label: 'Совпадает с юридическим'}]"
          :disabled="oldCompany === '1'"
      ></checkbox-input>
      <select-input
          :is-single="true"
          v-if="!dataForm.actualAddress.coincidesLegalAddress"
          v-model="dataForm.actualAddress.country"
          label="Страна"
          :options="lists.countries"
          :disabled="oldCompany === '1'"
      ></select-input>
      <select-input
          v-else
          :is-single="true"
          v-model="dataForm.legalAddress.country"
          label="Страна"
          :options="lists.countries"
          :disabled="true"
      ></select-input>
      <text-input
          v-if="!dataForm.actualAddress.coincidesLegalAddress"
          v-model="dataForm.actualAddress.address"
          label="Адрес"
          :disabled="oldCompany === '1'"
      ></text-input>
      <text-input
          v-else
          v-model="dataForm.legalAddress.address"
          label="Адрес"
          :disabled="true"
      ></text-input>
      <text-input
          v-if="!dataForm.actualAddress.coincidesLegalAddress"
          v-model="dataForm.actualAddress.mailIndex"
          mask="#########"
          label="Почтовый индекс"
          :disabled="oldCompany === '1'"
      ></text-input>
      <text-input
          v-else
          v-model="dataForm.legalAddress.mailIndex"
          label="Почтовый индекс"
          :disabled="true"
      ></text-input>
      <div class="registration-form__title">Почтовый адрес</div>
      <checkbox-input
          :rules="{required:false}"
          name="coincidesLegalAddress"
          v-model="dataForm.mailAddress.coincidesLegalAddress"
          :label="[{label: 'Совпадает с юридическим'}]"
          :disabled="oldCompany === '1'"
      ></checkbox-input>
      <select-input
          :is-single="true"
          v-if="!dataForm.mailAddress.coincidesLegalAddress"
          v-model="dataForm.mailAddress.country"
          label="Страна"
          :options="lists.countries"
          :disabled="oldCompany === '1'"
      ></select-input>
      <select-input
          v-else
          :is-single="true"
          v-model="dataForm.legalAddress.country"
          label="Страна"
          :options="lists.countries"
          :disabled="true"
      ></select-input>
      <text-input
          v-if="!dataForm.mailAddress.coincidesLegalAddress"
          v-model="dataForm.mailAddress.address"
          label="Адрес"
          :disabled="oldCompany === '1'"
      ></text-input>
      <text-input
          v-else
          v-model="dataForm.legalAddress.address"
          label="Адрес"
          :disabled="true"
      ></text-input>
      <text-input
          v-if="!dataForm.mailAddress.coincidesLegalAddress"
          v-model="dataForm.mailAddress.mailIndex"
          mask="#########"
          label="Почтовый индекс"
          :disabled="oldCompany === '1'"
      ></text-input>
      <text-input
          v-else
          v-model="dataForm.legalAddress.mailIndex"
          label="Почтовый индекс"
          :disabled="true"
      ></text-input>
      <checkbox-input
          :rules="{required:false}"
          name="smallBusinessFlag"
          v-model="dataForm.smallBusinessFlag"
          :class-name="{field__container: !dataForm.smallBusinessFlag}"
          :label="[{label: 'Организация соответствует критериям малого или среднего бизнеса'}]"
          :disabled="oldCompany === '1'"
      ></checkbox-input>
      <ValidationProvider
          v-slot="{ validate, errors, failed }"
          rules="required"
          tag="label"
          ref="provider"
          name="загрузить декларацию"
          class="field__container"
          v-if="dataForm.smallBusinessFlag"
      >
        <input
            id="file-input"
            type="file"
            name="file"
            class="support-form__input-file"
            @change="attachApplication"
            :disabled="oldCompany === '1'"
        >
        <span for="file-input" class="support-form__text-file">Загрузить декларацию</span>
        <div class="file-listing">
          <div class="file-listing__info">
            <div class="file-listing__file">
              {{ dataForm.declarationFile && dataForm.declarationFile.name }}
            </div>
          </div>
        </div>
        <span v-show="failed" class="file-listing field__error">{{ errors[0] }}</span>
      </ValidationProvider>
      <div class="btn-flex field__container">
        <button class="btn btn--bdr" @click="prevStep">
          Вернуться на шаг 2
        </button>
        <button class="btn" @click="nextStep">
          Сохранить и продолжить
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import SelectInput from '../forms/Select.vue'
import TextInput from '../forms/Input.vue'
import CheckboxInput from '../forms/Checkbox.vue'

export default {
  name: 'formStep3',
  components: {
    SelectInput,
    TextInput,
    CheckboxInput
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
    organizationType: {
      default: '',
      type: String,
    },
    oldCompany: {
      default: 0,
      type: String,
    },
    inn: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      valid: true,
    }
  },
  methods: {
    nextStep() {
      if (this.step === 3) {
        this.$refs.form1.validate().then((res) => {
          if(res) {
            this.$emit('startRegistration')
          }
        })
      }
    },
    prevStep() {
      this.$emit('resetCompany', 2)
      this.$emit('newStep', 2)
    },
    attachApplication(evt) {
      const valid = this.$refs.provider.validate(evt);
      console.log(valid)
      const files = evt.target.files || evt.dataTransfer.files;
      if (!files.length)
        return;
      this.dataForm.declarationFile = files[0];
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
