<template>
  <div class="form form--white user-data">
    <div class="form__title user-data__title">
      Личные данные пользователя
    </div>
    <ValidationObserver
      ref="form"
      tag="div"
      mode="eager"
    >
      <form
        class="support-form__form"
        @submit.prevent="sendForm($event, 'common')"
      >
        <!-- <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="Логин"
                        placeholder="Введите ваш логин"
                        :rules="{required: true }"
                        v-model="userData.email"
                        :maxlength="100"
                    />
                </div> -->
        <div class="form__grid">
          <InputInput
            v-model="userData.password"
            type="password"
            parent-class="field__container"
            label="Пароль"
            placeholder="Введите ваш пароль"
            :rules="{ required: true }"
            :maxlength="100"
            :disabled="true"
          />
          <span
            class="user-data__change"
            @click="openModal('#user-data__modal-password')"
          >Сменить пароль</span>
        </div>
        <div class="form__grid">
          <InputInput
            v-model="userData.email"
            parent-class="field__container"
            label="E-mail"
            placeholder="Введите ваш e-mail"
            :rules="{ required: true }"
            :maxlength="100"
            :disabled="true"
          />
          <span
            class="user-data__change"
            @click="openModal('#user-data__modal-email')"
          >Сменить e-mail</span>
        </div>
        <div class="form__grid">
          <InputInput
            v-model="userData.lastName"
            parent-class="field__container"
            label="Фамилия"
            placeholder="Введите вашу фамилию"
            :rules="{ required: true }"
            :maxlength="100"
          />
        </div>
        <div class="form__grid">
          <InputInput
            v-model="userData.name"
            parent-class="field__container"
            label="Имя"
            placeholder="Введите ваше имя"
            :rules="{ required: true }"
            :maxlength="100"
          />
        </div>
        <div class="form__grid">
          <InputInput
            v-model="userData.secondName"
            parent-class="field__container"
            label="Отчество"
            placeholder="Введите ваше отчество"
            :rules="{ required: true }"
            :maxlength="100"
          />
        </div>
        <div class="form__grid">
          <InputInput
            v-model="userData.position"
            parent-class="field__container"
            label="Должность"
            placeholder="Введите вашу должность"
            :rules="{ required: true }"
            :maxlength="100"
          />
        </div>
        <div class="form__grid">
          <div class="field__container user-data__attachment">
            <div class="support-form__item support-form__item--file user-data__file">
              <span class="field__label user-data__subtitle">Документ</span>
              <input
                id="file-input"
                type="file"
                name="file"
                class="support-form__input-file"
                accept="application/pdf, image/jpeg, image/png"
                @change="attachApplication"
              >
              <label
                for="file-input"
                class="support-form__label-file"
              >Загрузите документ</label>
              <div
                v-if="userData.document"
                class="file-listing"
              >
                <div class="file-listing__info">
                  <div v-if="userData.documentLink" class="file-listing__file">
                    <a class="user-data__link" :href="userData.documentLink" download>
                      {{ userData.document.name }}
                    </a>
                  </div>
                  <div v-else class="file-listing__file">
                    {{ userData.document.name }}
                  </div>
                </div>
                <!-- <a
                  class="file-listing__delete"
                  fab
                  dark
                  x-small
                  @click="removeFile()"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071
                      17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.4142
                      11L17.7071 5.70712C18.0976 5.31659 18.0976 4.68343 17.7071
                      4.2929C17.3166 3.90238 16.6834 3.90238 16.2929 4.2929L11
                      9.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237
                      4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289
                      5.70711L9.5858 11L4.29289 16.2929C3.90237 16.6834 3.90237
                      17.3166 4.29289 17.7071C4.68342 18.0977 5.31658 18.0977
                      5.70711 17.7071L11 12.4142L16.2929 17.7071Z"
                      fill="#31ACB8"
                    />
                  </svg>
                </a> -->
              </div>
            </div>
            <div class="user-data__file-number">
              <InputInput
                v-model="userData.documentNumber"
                class="user-data__file-number-input"
                :maxlength="100"
                :rules="{ required: !userData.documentWithoutNumber }"
                :disabled="!userData.document || userData.documentWithoutNumber"
                label="Номер документа"
              />
              <label class="checkbox user-data__file-checkbox">
                <input
                  class=""
                  type="checkbox"
                  name="confident"
                  :disabled="!userData.document"
                  @change="toggleDocumentNumeration"
                >
                <span class="checkbox__body" />
                <span class="checkbox__text user-data__file-checkbox-text">
                  Без номера
                  <div class="user-data__file-info">
                    <svg>
                      <use
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xlink:href="/img/sprite.svg#info"
                      />
                    </svg>
                    <span>
                      В данное окно необходимо вписать документ,
                      на основании которого пользователь действует
                      в Системе от имени Вашей организации.
                    </span>
                  </div>
                </span>
              </label>
            </div>
            <date-time
              v-model="userData.documentDate"
              :disabled="!userData.document"
              label="Дата публикации"
              placeholder="Выберите дату"
              class="user-data__file-term"
            />
          </div>
        </div>
        <div class="form__grid">
          <div class="field__container field__container--no-margin-bottom">
            <span class="field__label">Телефон</span>
            <div class="phone-container">
              <div class="support-form__item user-data__code">
                <PhoneCodeCountries
                  v-model="userData.currentPhoneCode"
                  :countries="lists.countries"
                />
              </div>
              <div class="support-form__item support-form__phone user-data__phone">
                <InputInput
                  v-model="userData.phone"
                  type="tel"
                  validation-name="телефон"
                  :rules="{ required: true, customPhone: true }"
                  :mask="`+${codePhone.phone_code} (###) ###-####`"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="user-data__buttons">
          <button
            type="button"
            class="btn btn--bdr"
          >
            Отменить
          </button>
          <button
            type="submit"
            class="btn"
          >
            Сохранить
          </button>
        </div>
      </form>
    </ValidationObserver>
    <div
      id="user-data__modal-password"
      class="popup popup--alt"
    >
      <div class="popup__body">
        <div class="popup__content">
          <a
            href="javascript:{}"
            class="popup__close"
            @click="closeModal('#user-data__modal-password')"
          ><svg class="sprite-close">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="\./img/sprite.svg#close"
            /></svg></a>
          <div class="popup__title">
            Сменить пароль
          </div>
          <div class="popup__content-container">
            <ValidationObserver
              ref="form"
              tag="div"
              mode="eager"
            >
              <form
                slot-scope="{ valid }"
                class="popup__form"
                @submit.prevent="sendForm($event, 'password')"
              >
                <ValidationProvider
                  v-slot:default="{ errors, failed }"
                  name="Старый пароль"
                  rules="required"
                  tag="label"
                  class="field__container"
                >
                  <span class="field__label">Старый пароль</span>
                  <input
                    v-model="passwordChanging.password"
                    :class="{ field: true, error: failed }"
                    type="password"
                  >
                  <span
                    v-show="failed"
                    class="field__error"
                  >{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot:default="{ errors, failed }"
                  name="Новый пароль"
                  rules="required"
                  tag="label"
                  class="field__container"
                >
                  <span class="field__label">Новый пароль</span>
                  <input
                    v-model="passwordChanging.newPassword"
                    :class="{ field: true, error: failed }"
                    type="password"
                  >
                  <span
                    v-show="failed"
                    class="field__error"
                  >{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot:default="{ errors, failed }"
                  name="Новый пароль"
                  :rules="{ required: true, repeatPass: passwordChanging.newPassword }"
                  tag="label"
                  class="field__container"
                >
                  <span class="field__label">Повторите пароль</span>
                  <input
                    v-model="passwordChanging.newPasswordRepeate"
                    :class="{ field: true, error: failed }"
                    type="password"
                  >
                  <span
                    v-show="failed"
                    class="field__error"
                  >{{ errors[0] }}</span>
                </ValidationProvider>
                <button
                  type="submit"
                  class="btn"
                  :disabled="!valid"
                >
                  Отправить
                </button>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <div
      id="user-data__modal-email"
      class="popup popup--alt"
    >
      <div class="popup__body">
        <div class="popup__content">
          <a
            href="javascript:{}"
            class="popup__close"
            @click="closeModal('#user-data__modal-email')"
          ><svg class="sprite-close">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="\./img/sprite.svg#close"
            /></svg></a>
          <div class="popup__title">
            Сменить e-mail
          </div>
          <div class="popup__content-container">
            <ValidationObserver
              ref="form"
              tag="div"
              mode="eager"
            >
              <form
                slot-scope="{ valid }"
                class="popup__form"
                @submit.prevent="sendForm($event, 'email')"
              >
                <ValidationProvider
                  v-slot:default="{ errors, failed }"
                  name="Старый пароль"
                  rules="required"
                  tag="label"
                  class="field__container"
                >
                  <span class="field__label">Пароль</span>
                  <input
                    v-model="emailChanging.password"
                    :class="{ field: true, error: failed }"
                    type="password"
                  >
                  <span
                    v-show="failed"
                    class="field__error"
                  >{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot:default="{ errors, failed }"
                  name="Новый пароль"
                  rules="required"
                  tag="label"
                  class="field__container"
                >
                  <span class="field__label">Новый e-mail</span>
                  <input
                    v-model="emailChanging.newEmail"
                    :class="{ field: true, error: failed }"
                    type="email"
                  >
                  <span
                    v-show="failed"
                    class="field__error"
                  >{{ errors[0] }}</span>
                </ValidationProvider>
                <button
                  type="submit"
                  class="btn"
                  :disabled="!valid"
                >
                  Отправить
                </button>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from '@/components/forms/DateTime.vue';
import functions from '@/helpers/functions';
import InputInput from '../../../components/forms/Input';
import PhoneCodeCountries from '../../../components/phoneCodeCountries.vue';
import api from '../../../helpers/api';

export default {
  name: 'User',

  components: {
    InputInput,
    PhoneCodeCountries,
    DateTime,
  },

  mixins: [api, functions],

  data() {
    return {
      userData: {
        login: null,
        password: 'any-text',
        email: null,
        newEmail: null,
        lastName: null,
        name: null,
        secondName: null,
        position: null,
        document: null,
        documentNumber: null,
        documentWithoutNumber: false,
        documentDate: null,
        documentLink: null,
        phone: null,
        currentPhoneCode: {
          id: 0,
          name: '',
          phoneCode: 0,
          flag: '',
        },
        currentFaxCode: {
          id: 0,
          name: '',
          phoneCode: 0,
          flag: '',
        },
        fax: null,
      },
      passwordChanging: {
        password: '',
        newPassword: '',
        newPasswordRepeate: '',
      },
      emailChanging: {
        password: '',
        newEmail: '',
      },
      lists: {
        countries: [
          {
            label: 'Россия',
            value: 234,
          },
          {
            label: 'Бельгия',
            value: 456,
          },
        ],
      },
    };
  },

  computed: {
    codePhone() {
      return this.userData.currentPhoneCode;
    },
    codeFax() {
      return this.userData.currentFaxCode;
    },
  },

  created() {
    this.$store.commit('setCrumbs', [
      {
        name: 'Личные данные пользователя',
        link: '/',
      },
    ]);
    this.fillUserDataFromStore();
    this.getCountries();
  },

  methods: {
    fillUserDataFromStore() {
      if (this.$store.state.auth.user.email) {
        this.userData.email = this.$store.state.auth.user.email;
      }
      if (this.$store.state.auth.user.lastName) {
        this.userData.lastName = this.$store.state.auth.user.lastName;
      }
      if (this.$store.state.auth.user.name) {
        this.userData.name = this.$store.state.auth.user.name;
      }
      if (this.$store.state.auth.user.secondName) {
        this.userData.secondName = this.$store.state.auth.user.secondName;
      }
      if (this.$store.state.auth.user.position) {
        this.userData.position = this.$store.state.auth.user.position;
      }
      if (this.$store.state.auth.user.doc) {
        this.userData.document = this.$store.state.auth.user.doc;
        this.userData.documentLink = this.$store.state.auth.user.doc.path;
      }
      if (this.$store.state.auth.user.docDate) {
        this.userData.documentDate = this.$store.state.auth.user.docDate;
      }
      if (this.$store.state.auth.user.docNum) {
        this.userData.documentNumber = this.$store.state.auth.user.docNum;
      }
    },
    getCountries() {
      this.fetchCountries()
        .then((data) => {
          this.lists.countries = data.data.data;
          this.fillUserPhone();
          this.fillUserFax();
        })
        .catch(() => {
          window.closeLoader();
          window.notificationError('Ошибка сервера');
        });
    },
    setStartValueCountries(country) {
      this.userData.currentPhoneCode = country;
    },
    setStartValueCountriesFax(country) {
      this.userData.currentFaxCode = country;
    },
    fillUserPhone() {
      const phone = this.$store.state.auth.user.phone;
      const code = phone.slice(0, -10);
      const number = phone.substr(phone.length - 10, 10);
      this.setStartValueCountries(this.lists.countries
        .find((country) => country.phone_code === Number.parseInt(code, 10)));
      this.userData.phone = number;
      this.userData.phone = `+${code} (${number.substr(0, 3)}) ${number.substr(3, 3)} ${number.substr(6, 2)}-${number.substr(
        8,
        2,
      )}`;
    },
    fillUserFax() {
      if (this.$store.state.auth.user.fax) {
        const phone = this.$store.state.auth.user.fax;
        const code = phone.slice(0, -10);
        const number = phone.substr(phone.length - 10, 10);
        this.setStartValueCountriesFax(this.lists.countries
          .find((country) => country.phone_code === Number.parseInt(code, 10)));
        this.userData.fax = number;
        this.userData.fax = `+${code} (${number.substr(0, 3)}) ${number.substr(3, 3)} ${number.substr(6, 2)}-${number.substr(
          8,
          2,
        )}`;
      } else {
        this.setStartValueCountriesFax(this.lists.countries
          .find((country) => country.phone_code === 7));
      }
    },
    openModal(popupId) {
      window.openPopupById(popupId);
    },
    closeModal(popupId) {
      window.closePopupById(popupId);
    },
    attachApplication(evt) {
      const files = evt.target.files || evt.dataTransfer.files;
      if (!files.length) return;
      if (['application/pdf', 'image/jpeg', 'image/png'].includes(files[0].type)) {
        this.userData.document = files[0];
        this.userData.documentLink = null,
        Object.assign(evt.target, { value: '' });
      } else {
        window.notificationError('Загружаемый файл должен быть форматов: pdf, jpeg, png');
      }
    },
    // removeFile() {
    //   this.userData.document = null;
    // },
    toggleDocumentNumeration() {
      this.userData.documentNumber = null;
      this.userData.documentWithoutNumber = !this.userData.documentWithoutNumber;
    },
    sendForm(evt, typeOfForm) {
      evt.preventDefault();
      const formData = {};
      if (typeOfForm === 'common') {
        formData.lastName = this.userData.lastName;
        formData.name = this.userData.name;
        formData.secondName = this.userData.secondName;
        formData.position = this.userData.position;
        if (this.userData.document instanceof File) {
          formData.doc = this.userData.document;
        }
        formData.docNum = this.userData.documentNumber;
        formData.docDate = this.userData.documentDate;
        formData.phone = this.userData.phone;
        formData.fax = this.userData.fax;
        if (this.userData.newEmail) {
          formData.newEmail = this.userData.newEmail;
        }
        if (this.userData.newPassword) {
          formData.newPassword = this.userData.newPassword;
        }
      }
      if (typeOfForm === 'email') {
        formData.password = this.emailChanging.password;
        formData.email = this.emailChanging.newEmail;
      }
      if (typeOfForm === 'password') {
        formData.password = this.passwordChanging.password;
        formData.newPassword = this.passwordChanging.newPassword;
      }
      const formDataObj = this.objectToFormData(formData);      
      this.sendUserData(formDataObj)
        .then(() => {
          window.notificationSuccess('Данные успешно обновлены');
          if (typeOfForm === 'email') {
            window.closePopupById('user-data__modal-email');
            this.$store.commit('logout', {
              reload: true,
              mute: false,
            });
          }
          if (typeOfForm === 'password') {
            window.closePopupById('user-data__modal-password');
          }
        })
        .catch(() => {
          window.notificationError('Ошибка сервера');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.user-data {
  &__title {
    font-family: 'Gilroy-SemiBold', sans-serif, Arial, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 2.71429rem;
    letter-spacing: 0.02em;
    color: $colorText;
  }
  &__subtitle {
    margin-bottom: 1rem;
    font-size: 1.125rem;
  }
  &__phone {
    padding-top: 0;
  }
  &__code {
    margin-top: rem(4px);
  }
  &__change {
    color: $colorTurquoise;
    margin: -1rem 0 2rem 2.85714rem;
    cursor: pointer;
  }
  &__attachment {
    display: flex;
    align-items: flex-start;
  }
  &__file {
    width: 40%;

    .user-data__subtitle {
      margin-bottom: 1.44rem;
    }

    &-number {
      flex: 1;

      &-input {
        margin-bottom: 0;
      }

      @include mq($from: tablet) {
        min-width: 150px;
        max-width: 30%;
      }
    }

    &-checkbox {
      margin-top: 20px;

      &-text {
        display: flex;
        align-items: center;
      }
    }

    &-term {
      flex: 1;
      margin-left: 20px;
    }

    &-info {
      margin-left: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      width: 20px;
      height: 20px;
      cursor: pointer;

      &:hover span {
        visibility: visible;
        opacity: 1;
      }

      span {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 30px;
        right: 0;
        z-index: 3;
        width: 300px;

        visibility: hidden;
        background-color: $colorTextLight;
        padding: rem(8px) rem(20px);
        border-radius: 4px;
        opacity: 0;
        transition: 0.2s;

        font-family: Roboto;
        font-size: 10px;
        color: #fff;

        @include mq($until: tablet) {
          left: -130px;
          right: auto;
        }
      }
    }
  }
  .field__label {
    font-size: 1.14286rem;
    line-height: 1.375;
  }
}

@include mq($until: tablet) {
  .user-data {
    &__title {
      font-size: 1.875rem;
      line-height: 120%;
    }
    &__change {
      margin-left: 0;
      margin-bottom: 1rem;
      display: inline-block;
    }
    &__attachment {
      flex-direction: column;
    }
    &__file {
      width: 100%;
      &-number {
        margin-top: 12px;
        width: 100%;
      }
      &-checkbox {
        width: 100%;
        margin-left: 0;
      }
      &-term {
        margin-top: 12px;
        width: 100%;
        margin-left: 0;
      }
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      .btn {
        margin-bottom: 0.5rem;
        width: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.user-data {
  input[type='tel'].field {
    height: 3.42857rem;
  }
  .field__container--no-margin-bottom {
    margin-bottom: 0;
  }
  &__phone {
    .field__container {
      margin-bottom: 0;
    }
  }
  .support-form__label-file {
    padding: 1.07rem 2.28571rem;
  }
  .file-listing {
    margin-left: 0;
    margin-top: 1rem;
  }
  &__link {
    color: $colorTurquoise;
    text-decoration: none;
  }
}
</style>
