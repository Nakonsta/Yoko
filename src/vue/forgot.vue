<template>
    <ValidationObserver ref="form" tag="div" mode="eager">
        <form class="popup__form" @submit.prevent="onSubmit">
            <div v-show="error" v-html="error" class="form__error"></div>
            <ValidationProvider name="E-mail" v-slot="{ errors, failed }" rules="required|email" tag="label" class="field__container">
                <span class="field__label">Введите E-mail</span>
                <input :class="{field: true, error: failed}" type="text" name="email" placeholder="forexample@gmail.com" v-model="email">
                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
            </ValidationProvider>
            <button class="btn">Выслать письмо</button>
        </form>
    </ValidationObserver>
</template>

<script>
    import api from './helpers/api'

    export default {
        name: 'forgotApp',
        mixins: [api],
        data() {
            return {
                error: '',
                email: '',
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    window.openLoader()
                    this.forgotPass(this.email)
                        .then(() => {
                          window.closeLoader()
                          window.notificationSuccess(`Письмо с информацией для восстановления пароля отправлено на ${this.email}`)
                          closePopupById('#forgot')
                        })
                        .catch((e) => {
                          window.closeLoader()
                          if (e.response) {
                            switch (e.response.status) {
                              case 400:
                                window.notificationError('Такой e-mail не зарегестрирован')
                                break
                              case 500:
                                window.notificationError('Ошибка сервера')
                                break
                              default:
                                window.notificationError('Неизвестная ошибка')
                                break
                            }
                          }
                          console.log(e)
                          //todo вывести ошибку
                        })
                });
            },
        },
    }
</script>