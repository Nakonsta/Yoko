<template>
    <div class="support-block">
        <div class="support-form">
            <div class="support-form__title">
                Связаться с поддержкой
            </div>
            <ValidationObserver ref="form" tag="div" mode="eager">
                <form class="support-form__form" @submit.prevent="sendForm" slot-scope="{ valid }">
                    <div v-if="supportForm.topics" class="support-form__item">
                        <label class="support-form__label">Выбрать тему</label>
                        <ValidationProvider tag="div" :rules="{ required: true }" name="theme" v-slot="{ errors }">
                            <input type="hidden" v-model="formForSend.theme">
                            <multiselect
                                v-model="formForSend.theme"
                                class="form-select"
                                deselect-label="Can't remove this value"
                                track-by="id"
                                label="value"
                                selectedLabel=""
                                selectLabel=""
                                deselectLabel=""
                                placeholder="Выбрать тему"
                                :options="supportForm.topics"
                                :searchable="false"
                                :allow-empty="false"
                            >
                              <template
                                  slot="singleLabel"
                                  slot-scope="{ option }"
                              >
                                {{ option.value }}
                              </template>
                            </multiselect>
                            <p class="message-error">
                              <span v-if="errors[0]" class="label-secondary-fail">{{ errors[0] }}</span>
                            </p>
                        </ValidationProvider>
                    </div>
                    <div v-if="formForSend.theme && formForSend.theme.id === 'login_to_system'" class="support-form__item">
                        <label class="support-form__label">Уточнить тему</label>
                        <ValidationProvider tag="div" :rules="{ required: true }" name="login_to_system" v-slot="{ errors }">
                          <input type="hidden" v-model="formForSend.login_to_system">
                          <multiselect
                              v-model="formForSend.login_to_system"
                              class="form-select"
                              deselect-label="Can't remove this value"
                              track-by="id"
                              label="value"
                              selectedLabel=""
                              selectLabel=""
                              deselectLabel=""
                              placeholder="Уточнить тему"
                              :options="supportForm.topicsAuth"
                              :searchable="false"
                              :allow-empty="false"
                          >
                            <template
                                slot="singleLabel"
                                slot-scope="{ option }"
                            >
                              {{ option.value }}
                            </template>
                          </multiselect>
                        </ValidationProvider>
                    </div>
                    <div v-if="
                        formForSend.theme &&
                        (formForSend.theme.id === 'organization_and_participation_in_tenders' ||
                        formForSend.theme.id === 'technical_problems' ||
                        formForSend.theme.id === 'autonomous_industry')
                        " 
                        class="support-form__item"
                    >
                        <ValidationProvider name="Номер торговой процедуры" :rules="{ regex: /^[0-9]+$/ }" v-slot="{ errors, failed }" tag="label" class="field__container">
                            <span class="field__label">Номер торговой процедуры</span>
                            <input 
                                :class="{field: true, error: failed}"
                                type="tel"
                                name="trade_procedure_number"
                                v-model="formForSend.trade_procedure_number"
                                @keydown="onlyDigits($event)"
                                placeholder="Номер торговой процедуры">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div v-if="formForSend.theme && formForSend.theme.id === 'login_to_system'" class="support-form__item">
                        <a href="#" class="support-form__application">Скачайте заявление на смену главного пользователя организации</a>
                        <div class="support-form__size">(47  КБ)</div>
                    </div>
                    <div v-if="formForSend.theme && formForSend.theme.id === 'login_to_system'" class="support-form__item support-form__item--file">
                        <input
                            id="file-input"
                            type="file"
                            name="file"
                            class="support-form__input-file"
                            @change="attachApplication"
                            accept="application/pdf, image/jpeg, image/png"
                        >
                        <label for="file-input" class="support-form__label-file">Прикрепить заявление</label>
                        <div v-for="(file, key) in formForSend.statement" :key="key" class="file-listing">
                            <div class="file-listing__info">
                                <div class="file-listing__file">
                                {{ file.name }}
                                </div>
                            </div>
                            <a class="file-listing__delete" fab dark x-small @click="removeFile(key)">
                                <svg width="12" height="12" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.4142 11L17.7071 5.70712C18.0976 5.31659 18.0976 4.68343 17.7071 4.2929C17.3166 3.90238 16.6834 3.90238 16.2929 4.2929L11 9.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L9.5858 11L4.29289 16.2929C3.90237 16.6834 3.90237 17.3166 4.29289 17.7071C4.68342 18.0977 5.31658 18.0977 5.70711 17.7071L11 12.4142L16.2929 17.7071Z" fill="#31ACB8"/>
                                </svg>
                            </a>
                        </div>
                        <div class="support-form__item-info support-form__item-info--padding-top">
                            Загрузите заявления в формате:  pdf, jpeg, png
                        </div>
                    
                    </div>
                    <div class="support-form__item">
                        <ValidationProvider name="Введите текст обращения" :rules="{ required: true, max: 1000 }" v-slot="{ errors, failed }" tag="label" class="field__container">
                            <span class="field__label">Введите текст обращения</span>
                            <textarea 
                                :class="{field: true, error: failed}"
                                row="4"
                                name="text"
                                v-model="formForSend.text"
                                @input="countSymbols($event)"
                                class="support-form__textarea"
                            ></textarea>
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            <div class="support-form__item-info">
                                Осталось символов: <span class="support-form__item-symbols"> {{ actualSymbolForType }}</span>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="support-form__item">
                        <ValidationProvider name="E-mail" v-slot="{ errors, failed }" rules="required|email" tag="label" class="field__container">
                            <span class="field__label">E-mail</span>
                            <input :class="{field: true, error: failed}" type="text" name="email" v-model="formForSend.email">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="support-form__item">
                        <ValidationProvider name="Имя" v-slot="{ errors, failed }" :rules="{ required: true, min: 2 }" tag="label" class="field__container">
                            <span class="field__label">Имя</span>
                            <input :class="{field: true, error: failed}" type="text" name="name" v-model="formForSend.name">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="phone-container">
                        <div class="support-form__item">
                            <span class="field__label">Телефон</span>
                            <PhoneCodeCountries
                                :countries="lists.countries"
                                v-model="startCountry"
                            />
                        </div>
                        <div class="support-form__item support-form__phone">
                          <ValidationProvider name="Телефон" v-slot="{ errors, failed }" :rules="{ required: true, customPhone: true }" tag="label" class="field__container">
                            <input
                                v-model="formForSend.phone"
                                type="tel"
                                name="phone"
                                class="field"
                                v-mask="`+${startCountry.phone_code} (###) ###-####`">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                    </div>
                    <div class="support-form__item">
                        <ValidationProvider name="ИНН Компании" v-slot="{ errors, failed }" :rules="{ required: true, min: 10 }" tag="label" class="field__container">
                            <span class="field__label">ИНН Компании</span>
                            <input :class="{field: true, error: failed}" type="text" name="inn" v-model="formForSend.inn" v-mask="`############`">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="support-form__policy">
                        Нажимая на кнопку «Сохранить и продолжить», вы принимаете условия <a href="#" class="support-form__link">Пользовательского соглашения</a>, соглашаетесь на <a href="#" class="support-form__link">обработку персональных данных</a> и получение сообщений
                    </div>
                    <button 
                    type="submit" 
                    class="btn support-form__submit" 
                    :disabled="!valid"
                    >
                    Отправить обращение
                    </button>
                </form>
            </ValidationObserver>
        </div>
        <div v-if="!$store.state.auth.loggedIn" class="support-info" v-html="supportInfo.reference_block">
        </div>
    </div>
</template>

<script>
import api from './helpers/api'
import PhoneCodeCountries from './components/phoneCodeCountries.vue'

export default {
    name: 'Support',

    components: {
        PhoneCodeCountries
    },

    data() {
        return {
            supportForm: {
                topics: [],
                topicsAuth: []
            },
            formForSend: {
                theme: null,
                login_to_system: null,
                trade_procedure_number: null,
                statement: [],
                text: '',
                email: null,
                name: null,
                phone: null,
                inn: null,
                currentPhoneCode: {
                    id: 0,
                    name: '',
                    phoneCode: 0,
                    flag: '',
                },
            },
            supportInfo: {
                reference_block: null,
            },
            maxSymbolForType: 1000,
            actualSymbolForType: 1000,
            lists: {
                countries: [],
            },
            startCountry: {
                id: 0,
                name: '',
                phoneCode: 0,
                flag: '',
            }
        }
    },

    mixins: [api],

    created() {
       this.getSupportInfo()
       this.getSupportTopics()
       this.fillUserData()
       this.fetchCountries()
        .then((data) => {
          this.lists.countries = data.data.data
          this.fillUserPhone()
        })
        .catch((e) => {
          console.log(e)
        })
    },

    computed: {
      codePhone() {
        return this.formForSend.currentPhoneCode
      },
    },

    methods: {
        getSupportTopics() {
            this.fetchSupportTopics()
                .then((response) => {
                    console.log(response);
                    this.supportForm.topics = response.data.data.theme
                    this.supportForm.topicsAuth = response.data.data.login_to_system
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getSupportInfo() {
            this.fetchSupportInfo()
                .then((response) => {
                    this.supportInfo.reference_block = response.data.data.reference_block
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        setStartValueCountries(country) {
            this.startCountry = country
        },
        fillUserPhone() {
          if (this.$store.state.auth.loggedIn) {
            const phone = this.$store.state.auth.user.phone
            const code = phone.slice(0, -10)
            const number = phone.substr(phone.length - 10, 10)
            console.log(code, number)
            this.setStartValueCountries(
                this.lists.countries.find((country) => {
                  return country.phone_code === parseInt(code)
                }),
            )
            this.formForSend.phone = number
          } else {
            this.setStartValueCountries(
                this.lists.countries.find((country) => {
                  return country.phone_code === 7
                }),
            )
          }
        },
        fillUserData() {
            if (this.$store.state.auth.loggedIn) {
                this.formForSend.email = this.$store.state.auth.user.email
                this.formForSend.name = this.$store.state.auth.user.name + ' ' + this.$store.state.auth.user.lastName
                this.formForSend.phone = this.$store.state.auth.user.phone
                this.formForSend.inn = this.$store.state.auth.user.company.inn
            }
            return false
        },
        countSymbols(evt) {
            this.formForSend.text.length <= this.maxSymbolForType ?
              this.actualSymbolForType = this.maxSymbolForType - this.formForSend.text.length :
              this.actualSymbolForType = 0;
            if (! this.actualSymbolForType) {
                this.formForSend.text = this.formForSend.text.substring(0,this.maxSymbolForType);
                if (evt.keyCode >= 48 && evt.keyCode <= 90) {
                    evt.preventDefault();
                }
            }
        },
        onlyDigits(evt) {
            let key = evt.keyCode;
            if (
                // numbers
                key >= 48 && key <= 57 ||
                // Numeric keypad
                key >= 96 && key <= 105 ||
                // comma, period and minus, . on keypad
                // key == 190 || key == 188 || key == 109 || key == 110 ||
                // Backspace and Tab and Enter
                key == 8 || key == 9 || key == 13 ||
                // Home and End
                key == 35 || key == 36 ||
                // left and right arrows
                key == 37 || key == 39 ||
                // Del and Ins
                key == 46 || key == 45) {
                    return true;
            } else {
                evt.preventDefault();
            }
        },
        attachApplication(evt) {
            var files = evt.target.files || evt.dataTransfer.files;
            if (!files.length)
                return;
            this.formForSend.statement.push(files[0]);
        },
        removeFile(key) {
            this.formForSend.statement.splice(key, 1)
        },
        objectToFormData(data) {
            const fData = new FormData()

            function appendFormData(data, root, formDataObj) {
                root = root || ''
                if (data instanceof File) {
                formDataObj.append(root, data)
                } else if (Array.isArray(data)) {
                console.log('fdsf')
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    appendFormData(data[i], root + '[' + i + ']', formDataObj)
                }
                } else if (typeof data === 'object' && data) {
                for (const key in data) {
                    // eslint-disable-next-line
                    if (data.hasOwnProperty(key)) {
                        if (root === '') {
                            appendFormData(data[key], key, formDataObj)
                        } else {
                            appendFormData(data[key], root + '[' + key + ']', formDataObj)
                        }
                    }
                }
                } else if (data !== null && typeof data !== 'undefined') {
                formDataObj.append(root, data)
                }
            }

            appendFormData(data, '', fData)

            return fData
        },
        sendForm(evt) {
            evt.preventDefault()
            const fData = {
                theme: this.formForSend.theme.id,
                text: this.formForSend.text,
                email: this.formForSend.email,
                name: this.formForSend.name,
                phone: this.formForSend.phone,
                inn: this.formForSend.inn,
            }
            if (this.formForSend.theme.id === "login_to_system") {
                fData.login_to_system = this.formForSend.login_to_system.id
                fData.statement = this.formForSend.statement[0]
            }
            if (this.formForSend.theme.id === "organization_and_participation_in_tenders" ||
                this.formForSend.theme.id === "technical_problems" ||
                this.formForSend.theme.id === "autonomous_industry"
            ) {
                fData.trade_procedure_number = this.formForSend.trade_procedure_number
            }
            const formDataObj = this.objectToFormData(fData)
            console.log(fData);
            console.log(formDataObj)
            window.openLoader()
            this.fetchSupportForm(formDataObj)
                .then(() => {
                  window.closeLoader()
                  window.notificationSuccess('Ваше обращение отправлено')
                })
                .catch((response) => {
                    console.log(response.message)
                    window.closeLoader()
                    window.notificationError('Ошибка сервера')
                });
        }
    }
}
</script>

<style lang="scss">
@import "../assets/sass/variables/fluid-variables";
@import "../assets/sass/mixins/fluid-mixin";
.support-form__item {
  margin-bottom: rem(24px)
}
.multiselect__option--selected {
    background: #cbeaed;
}
</style>