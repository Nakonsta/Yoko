<template>
    <ValidationObserver ref="form" tag="div" mode="eager">
        <form class="popup__form" @submit.prevent="onSubmit">
            <div class="popup__tabs">
                <label><input type="radio" name="type" value="customer" v-model="type" /><span>Я Заказчик</span></label>
                <label><input type="radio" name="type" value="supplier" v-model="type" /><span>Я Поставщик</span></label>
            </div>
            <div v-show="error" v-html="error" class="form__error"></div>
            <ValidationProvider name="Логин или E-mail" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                <span class="field__label">Логин или E-mail</span>
                <input :class="{field: true, error: failed}" type="text" name="login" v-model="login">
                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="Пароль" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                <span class="field__label">Пароль</span>
                <input :class="{field: true, error: failed}" type="password" name="password" v-model="password">
                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="form__columns">
                <label class="field__container">
                    <input class="field" type="checkbox" name="remember" v-model="rememberMe">
                    <span class="field__label">Запомнить меня</span>
                </label>
                <a href="#forgot" class="popup-link">Восстановить пароль</a>
            </div>
            <button type="submit" class="btn">Войти</button>
        </form>
    </ValidationObserver>
</template>

<script>
    import api from './helpers/api'

    export default {
        name: 'singinApp',
        mixins: [api],
        data() {
            return {
                type: 'customer',
                error: '',
                login: 'test@test.ru',
                password: '1234567',
                rememberMe: false,
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    // todo this.type = 'customer' || 'supplier'
                    this.authSignin(this.login, this.password)
                        .then((data) => {
                            const user = data.data.data.user;
                            const token = data.data.data.token;
                            // todo
                            if (!this.rememberMe) {
                                document.cookie = `auth._token.local=Bearer%20${token};domain=${process.env.AUTH_DOMAIN};path=/`
                            } else {
                                const now = new Date()
                                now.setDate(now.getDate() + parseInt(process.env.AUTHORIZATION_COOKIE_LIFETIME))

                                document.cookie = `auth._token.local=Bearer%20${token};domain=${process.env.AUTH_DOMAIN};expires=${now};path=/`
                            }
                            window.location.href = `${process.env.LK_SUPP}`
                        })
                        .catch((response) => {
                            if (
                                response &&
                                response.message === 'Request failed with status code 401'
                            ) {
                                this.error = 'Введен неверный логин или пароль';
                            }
                        })
                });
            },
        },
    }
</script>
