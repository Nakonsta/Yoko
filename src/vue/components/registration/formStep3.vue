<template>
  <ValidationObserver
    ref="form1"
    tag="div"
    mode="eager"
  >
    <form
      slot-scope="{ valid }"
      class="support-form__form"
      @submit.prevent="(evt) => evt.preventDefault()"
    >
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
      <div class="registration-form__title">
        Название организации
      </div>
      <text-input
        v-model="dataForm.fullCompanyName"
        label="Полное имя организации"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-model="dataForm.abbreviatedName"
        label="Краткое имя организации"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-model="dataForm.directorFio"
        :label="organizationType === 'LEGAL_ENTITY' ? 'Генеральный директор' : 'ФИО'"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-model="dataForm.ogrn"
        :label="organizationType === 'LEGAL_ENTITY' ? 'ОГРН' : 'ОГРНИП'"
        :disabled="oldCompany === '1'"
        :mask="
          organizationType === 'LEGAL_ENTITY'
            ? '#### #### #####'
            : '##### ##### #####'
        "
        :rules="
          organizationType === 'LEGAL_ENTITY'
            ? 'required|lengthNoSpaces:13'
            : 'required|lengthNoSpaces:15'
        "
      />
      <text-input
        v-if="organizationType === 'LEGAL_ENTITY'"
        v-model="dataForm.kpp"
        label="КПП"
        mask="#########"
        :disabled="oldCompany === '1'"
        rules="required|lengthNoSpaces:9"
      />
      <text-input
        v-model="dataForm.okpo"
        label="ОКПО"
        :mask="
          organizationType === 'LEGAL_ENTITY'
            ? '#### ####'
            : '##### #####'
        "
        :disabled="oldCompany === '1'"
        :rules="
          organizationType === 'LEGAL_ENTITY'
            ? 'required|lengthNoSpaces:8'
            : 'required|lengthNoSpaces:10'
        "
      />
      <div class="registration-form__title">
        Расчетный счет
      </div>
      <text-input
        v-model="dataForm.rs"
        label="Р/c"
        mask="#### #### #### #### ####"
        :disabled="oldCompany === '1'"
        rules="required|lengthNoSpaces:20"
      />
      <text-input
        v-model="dataForm.ks"
        label="К/c"
        mask="#### #### #### #### ####"
        :disabled="oldCompany === '1'"
        rules="required|lengthNoSpaces:20"
      />
      <text-input
        v-model="dataForm.bik"
        label="БИК"
        mask="#########"
        :disabled="oldCompany === '1'"
        rules="required|lengthNoSpaces:9"
      />
      <div class="registration-form__title">
        Юридический адрес
      </div>
      <select-input
        v-model="dataForm.legalAddress.country"
        :is-single="true"
        label="Страна"
        :options="lists.countries"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-model="dataForm.legalAddress.address"
        label="Адрес"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-model="dataForm.legalAddress.mailIndex"
        label="Почтовый индекс"
        mask="#########"
        :disabled="oldCompany === '1'"
      />
      <div class="registration-form__title">
        Фактический адрес
      </div>
      <checkbox-input
        v-model="dataForm.actualAddress.coincidesLegalAddress"
        :rules="{required:false}"
        name="coincidesLegalAddress"
        :label="[{label: 'Совпадает с юридическим'}]"
        :disabled="oldCompany === '1'"
      />
      <select-input
        v-if="!dataForm.actualAddress.coincidesLegalAddress"
        v-model="dataForm.actualAddress.country"
        :is-single="true"
        label="Страна"
        :options="lists.countries"
        :disabled="oldCompany === '1'"
      />
      <select-input
        v-else
        v-model="dataForm.legalAddress.country"
        :is-single="true"
        label="Страна"
        :options="lists.countries"
        :disabled="true"
      />
      <text-input
        v-if="!dataForm.actualAddress.coincidesLegalAddress"
        v-model="dataForm.actualAddress.address"
        label="Адрес"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-else
        v-model="dataForm.legalAddress.address"
        label="Адрес"
        :disabled="true"
      />
      <text-input
        v-if="!dataForm.actualAddress.coincidesLegalAddress"
        v-model="dataForm.actualAddress.mailIndex"
        mask="#########"
        label="Почтовый индекс"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-else
        v-model="dataForm.legalAddress.mailIndex"
        label="Почтовый индекс"
        :disabled="true"
      />
      <div class="registration-form__title">
        Почтовый адрес
      </div>
      <checkbox-input
        v-model="dataForm.mailAddress.coincidesLegalAddress"
        :rules="{required:false}"
        name="coincidesLegalAddress"
        :label="[{label: 'Совпадает с юридическим'}]"
        :disabled="oldCompany === '1'"
      />
      <select-input
        v-if="!dataForm.mailAddress.coincidesLegalAddress"
        v-model="dataForm.mailAddress.country"
        :is-single="true"
        label="Страна"
        :options="lists.countries"
        :disabled="oldCompany === '1'"
      />
      <select-input
        v-else
        v-model="dataForm.legalAddress.country"
        :is-single="true"
        label="Страна"
        :options="lists.countries"
        :disabled="true"
      />
      <text-input
        v-if="!dataForm.mailAddress.coincidesLegalAddress"
        v-model="dataForm.mailAddress.address"
        label="Адрес"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-else
        v-model="dataForm.legalAddress.address"
        label="Адрес"
        :disabled="true"
      />
      <text-input
        v-if="!dataForm.mailAddress.coincidesLegalAddress"
        v-model="dataForm.mailAddress.mailIndex"
        mask="#########"
        label="Почтовый индекс"
        :disabled="oldCompany === '1'"
      />
      <text-input
        v-else
        v-model="dataForm.legalAddress.mailIndex"
        label="Почтовый индекс"
        :disabled="true"
      />
      <checkbox-input
        v-model="dataForm.smallBusinessFlag"
        :rules="{required:false}"
        name="smallBusinessFlag"
        :class-name="{field__container: !dataForm.smallBusinessFlag}"
        :label="[{label: 'Организация соответствует критериям малого или среднего бизнеса'}]"
        :disabled="oldCompany === '1'"
      />
      <ValidationProvider
        v-if="dataForm.smallBusinessFlag"
        v-slot:default="{ validate, errors, failed }"
        ref="provider"
        rules="required"
        tag="label"
        name="загрузить декларацию"
        class="field__container"
      >
        <input
          id="file-input"
          type="file"
          name="file"
          class="support-form__input-file"
          :disabled="oldCompany === '1'"
          @change="attachApplication"
        >
        <span
          for="file-input"
          class="support-form__text-file"
        >Загрузить декларацию</span>
        <div class="file-listing">
          <div class="file-listing__info">
            <div class="file-listing__file">
              {{ dataForm.declarationFile && dataForm.declarationFile.name }}
            </div>
          </div>
        </div>
        <span
          v-show="failed"
          class="file-listing field__error"
        >{{ errors[0] }}</span>
      </ValidationProvider>
      <div class="btn-flex field__container">
        <button
          class="btn btn--bdr"
          @click="prevStep"
        >
          Вернуться на шаг 2
        </button>
        <button
          class="btn"
          @click="nextStep"
        >
          Сохранить и продолжить
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import SelectInput from '../forms/Select.vue';
import TextInput from '../forms/Input.vue';
import CheckboxInput from '../forms/Checkbox.vue';

export default {
  name: 'FormStep3',
  components: {
    SelectInput,
    TextInput,
    CheckboxInput,
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
      default: '0',
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
    };
  },
  methods: {
    nextStep() {
      if (this.step === 3) {
        this.$refs.form1.validate().then((res) => {
          if (res) {
            this.$emit('startRegistration');
          }
        });
      }
    },
    prevStep() {
      this.$emit('resetCompany', 2);
      this.$emit('newStep', 2);
    },
    attachApplication(evt) {
      const valid = this.$refs.provider.validate(evt);
      console.log(valid);
      const files = evt.target.files || evt.dataTransfer.files;
      if (!files.length) return;
      this.dataForm.declarationFile = files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
