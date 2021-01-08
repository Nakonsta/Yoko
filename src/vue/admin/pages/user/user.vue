<template>
    <div class="form form--white user-data">
        <div class="form__title user-data__title">Личные данные пользователя</div>
        <ValidationObserver ref="form" tag="div" mode="eager">
            <form class="support-form__form" slot-scope="{ valid }">
                <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="Логин"
                        placeholder="Введите ваш логин"
                        :rules="{required: true }"
                        v-model="userData.email"
                        :maxlength="100"
                    />
                </div>
                <div class="form__grid">
                    <InputInput
                        type="password"
                        parentClass="field__container"
                        label="Пароль"
                        placeholder="Введите ваш пароль"
                        :rules="{required: true }"
                        v-model="userData.password"
                        :maxlength="100"
                        :disabled="true"
                    />
                    <span class="user-data__change" @click="openModal('#user-data__modal-password')">Сменить пароль</span>
                </div>
                <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="E-mail"
                        placeholder="Введите ваш e-mail"
                        :rules="{required: true }"
                        v-model="userData.email"
                        :maxlength="100"
                        :disabled="true"
                    />
                    <span class="user-data__change" @click="openModal('#user-data__modal-email')">Сменить e-mail</span>
                </div>
                <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="Фамилия"
                        placeholder="Введите вашу фамилию"
                        :rules="{required: true }"
                        v-model="userData.lastName"
                        :maxlength="100"
                    />
                </div>
                <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="Имя"
                        placeholder="Введите ваше имя"
                        :rules="{required: true }"
                        v-model="userData.name"
                        :maxlength="100"
                    />
                </div>
                <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="Отчество"
                        placeholder="Введите ваше отчество"
                        :rules="{required: true }"
                        v-model="userData.secondName"
                        :maxlength="100"
                    />
                </div>
                <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="Должность"
                        placeholder="Введите вашу должность"
                        :rules="{required: true }"
                        v-model="userData.position"
                        :maxlength="100"
                    />
                </div>
                <div class="form__grid">
                    <div class="field__container user-data__attachment">
                        <div class="support-form__item support-form__item--file">
                            <span class="field__label user-data__subtitle">Документ</span>
                            <input
                                id="file-input"
                                type="file"
                                name="file"
                                class="support-form__input-file"
                                @change="attachApplication"
                                accept="application/pdf, image/jpeg, image/png"
                            >
                            <label for="file-input" class="support-form__label-file">Загрузите документ</label>
                            <div v-for="(file, key) in userData.documents" :key="key" class="file-listing">
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
                    </div>
                </div>
                <div class="form__grid">
                    <div class="field__container field__container--no-margin-bottom">
                        <span class="field__label">Телефон</span>
                        <div class="phone-container">                            
                            <div class="support-form__item user-data__code">                                
                                <PhoneCodeCountries
                                    :countries="lists.countries"
                                    v-model="userData.currentPhoneCode"
                                />
                            </div>
                            <div class="support-form__item support-form__phone user-data__phone">
                            <InputInput
                                type="tel"
                                validation-name="телефон"
                                v-model="userData.phone"
                                :rules="{ required: true, customPhone: true }"
                                :mask="`+${codePhone.phone_code} (###) ###-####`"
                            />
                            </div>
                        </div>
                    </div>                    
                </div>
                <div class="form__grid">
                    <div class="field__container field__container--no-margin-bottom">
                        <span class="field__label">Факс</span>
                        <div class="phone-container">
                            <div class="support-form__item user-data__code">
                                <PhoneCodeCountries
                                    :countries="lists.countries"
                                    v-model="userData.currentPhoneCode"
                                />
                            </div>
                            <div class="support-form__item support-form__phone user-data__phone">
                            <InputInput
                                type="tel"
                                validation-name="факт"
                                v-model="userData.fax"
                                :rules="{ required: true, customPhone: true }"
                                :mask="`+${codePhone.phone_code} (###) ###-####`"
                            />
                            </div>
                        </div>
                    </div>                    
                </div>
            </form>
        </ValidationObserver>
        <div id="user-data__modal-password" class="popup popup--alt">
            <div class="popup__body">
                <div class="popup__content">
                    <a href="javascript:{}" class="popup__close" @click="closeModal('#user-data__modal-password')"><svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg></a>
                    <div class="popup__title">Сменить пароль</div>
                    <div class="popup__content-container">
                         <ValidationObserver ref="form" tag="div" mode="eager">
                            <form class="popup__form" slot-scope="{ valid }">
                                <ValidationProvider name="Старый пароль" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                                    <span class="field__label">Старый пароль</span>
                                    <input :class="{field: true, error: failed}" type="password" v-model="passwordChanging.password">
                                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                                </ValidationProvider>
                                <ValidationProvider name="Новый пароль" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                                    <span class="field__label">Новый пароль</span>
                                    <input :class="{field: true, error: failed}" type="password" v-model="passwordChanging.newPassword">
                                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                                </ValidationProvider>
                                <button type="submit" class="btn" :disabled="!valid">Отправить</button>
                            </form>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
        </div>
        <div id="user-data__modal-email" class="popup popup--alt">
            <div class="popup__body">
                <div class="popup__content">
                    <a href="javascript:{}" class="popup__close" @click="closeModal('#user-data__modal-email')"><svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg></a>
                    <div class="popup__title">Сменить e-mail</div>
                    <div class="popup__content-container">
                         <ValidationObserver ref="form" tag="div" mode="eager">
                            <form class="popup__form" slot-scope="{ valid }">
                                <ValidationProvider name="Старый пароль" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                                    <span class="field__label">Пароль</span>
                                    <input :class="{field: true, error: failed}" type="password" v-model="emailChanging.password">
                                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                                </ValidationProvider>
                                <ValidationProvider name="Новый пароль" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                                    <span class="field__label">Новый e-mail</span>
                                    <input :class="{field: true, error: failed}" type="email" v-model="emailChanging.newPassword">
                                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                                </ValidationProvider>
                                <button type="submit" class="btn" :disabled="!valid">Отправить</button>
                            </form>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputInput from "../../../components/forms/Input";
import PhoneCodeCountries from "../../../components/phoneCodeCountries.vue";
import api from "../../../helpers/api";

export default {
    name: 'User',

    components: {
        InputInput,
        PhoneCodeCountries
    },

    mixins: [api],

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
                documents: [],
                phone: null,
                currentPhoneCode: {
                    id: 0,
                    name: '',
                    phoneCode: 0,
                    flag: '',
                },
                fax: null,
            },
            passwordChanging: {
                password: '',
                newPassword: ''
            },
            emailChanging: {
                password: '',
                newEmail: ''
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
        }
    },

    computed: {
        codePhone() {
            return this.userData.currentPhoneCode
        },
    },

    created() {
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
            if (this.$store.state.auth.user.phone) {
                const phone = this.$store.state.auth.user.phone;
                const code = phone.slice(0, -10)
                const number = phone.substr(phone.length - 10, 10)
                this.userData.phone = number;
            }
            if (this.$store.state.auth.user.fax) {
                const phone = this.$store.state.auth.user.fax;
                const code = phone.slice(0, -10)
                const number = phone.substr(phone.length - 10, 10)
                this.userData.fax = number;
            }
        },
        getCountries() {
            this.fetchCountries()
                .then((data) => {
                    this.lists.countries = data.data.data
                    this.setStartValueCountries(
                        this.lists.countries.find((country) => {
                            return country.phone_code === 7
                        }),
                    )
                })
                .catch(() => {
                    window.closeLoader()
                    window.notificationError('Ошибка сервера. Регистрация не доступна.')
                })
        },
        setStartValueCountries(country) {
            this.userData.currentPhoneCode = country
        },
        openModal(popupId) {
            openPopupById(popupId);
        },
        closeModal(popupId) {
            closePopupById(popupId);
        },
        attachApplication(evt) {
            var files = evt.target.files || evt.dataTransfer.files;
            if (!files.length)
                return;
            if (['application/pdf', 'image/jpeg', 'image/png'].includes(files[0].type)) {
              this.userData.documents.push(files[0]);
            } else {
              notificationError('Загружаемый файл должен быть форматов: pdf, jpeg, png')
            }
        },
        removeFile(key) {
            this.userData.documents.splice(key, 1)
        },
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../../assets/sass/variables/variables";
    @import "../../../../assets/sass/variables/fluid-variables";
    @import "../../../../assets/sass/mixins/fluid-mixin";
    @import "../../../../assets/sass/mixins/mq";

    .user-data {
        &__title {
            font-family: "Gilroy-SemiBold", sans-serif, Arial, "Helvetica Neue", Helvetica, sans-serif;
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
        .field__label {
            font-size: 1.14286rem;
            line-height: 1.375;
        }
    }
</style>

<style lang="scss">
    @import "../../../../assets/sass/variables/variables";
    @import "../../../../assets/sass/variables/fluid-variables";
    @import "../../../../assets/sass/mixins/fluid-mixin";
    @import "../../../../assets/sass/mixins/mq";

    .user-data {
        input[type="tel"].field {
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
    }
</style>