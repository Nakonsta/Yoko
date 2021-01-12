<template>
    <div class="restore-block">
        <div class="restore-form">
            <div class="restore-form__title">
                Смена пароля
            </div>
            <ValidationObserver ref="form" tag="div" mode="eager">
                <form @submit.prevent="onSubmit" slot-scope="{ valid }">
                    <ValidationProvider name="пароль" vid="pass" v-slot="{ errors, failed }" rules="required|min:7" tag="label" class="field__container">
                        <span class="field__label">Новый пароль</span>
                        <input :class="{field: true, error: failed}" type="password" v-model="password">
                        <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider name="повтор пароля" v-slot="{ errors, failed }" rules="required|min:7|password:@pass" tag="label" class="field__container">
                        <span class="field__label">Повторите пароль</span>
                        <input :class="{field: true, error: failed}" type="password" v-model="passwordConfirm">
                        <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <button class="btn" :disabled="!valid">Сохранить</button>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import api from './helpers/api'
    import { extend } from 'vee-validate';

    extend('password', {
        params: ['target'],
        validate(value, { target }) {
            return value === target;
        },
        message: 'Пароли не совпадают'
    });

    export default {
        name: 'forgotRestore',
        mixins: [api],
        data() {
            return {
                email: null,
                code: null,
                password: null,
                passwordConfirm: null,
            }
        },
        created() {
            const urlParams = new URLSearchParams(window.location.search);
            this.email = urlParams.get('email');
            this.code = urlParams.get('code');
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate().then(success => {
                    if (!success || !this.email || !this.code) {
                        return;
                    }
                    window.openLoader();
                    const data = {
                        email: this.email,
                        code: this.code,
                        password: this.password,
                    };
                    this.forgotPassChange(data)
                        .then(() => {
                          window.closeLoader();
                          window.notificationSuccess(`Пароль изменен`);
                          // todo redirect?
                        })
                        .catch((e) => {
                          window.closeLoader();
                          if (e.response) {
                            switch (e.response.status) {
                              case 400:
                                window.notificationError('Такой e-mail не зарегистрирован');
                                break;
                              case 500:
                                window.notificationError('Ошибка сервера');
                                break;
                              default:
                                window.notificationError('Неизвестная ошибка');
                                break;
                            }
                          }
                          // console.log(e)
                        })
                });
            },
        },
    }
</script>

<style lang="scss">
@import "../assets/sass/variables/variables";
@import "../assets/sass/variables/fluid-variables";
@import "../assets/sass/mixins/fluid-mixin";
@import "../assets/sass/mixins/mq";

.restore-block {
    display: flex;
    @include mq($until: desktop) {
        flex-direction: column-reverse;
    }
}

.restore-form {
    width: 48%;
    margin-right: rem(148px);
    background-color: #fff;
    border-radius: 6px;
    padding: rem(32px) rem(32px) rem(47px);
    @include mq($until: widescreen) {
        margin-right: rem(104px);
        width: 55%;
    }
    @include mq($until: desktop) {
        width: 100%;
        margin-right: 0;
    }
    @include mq($until: tablet) {
        padding: rem(32px) rem(16px) rem(40px);
    }

    &__title {
        font-family: $fontGilroy;
        font-size: rem(32px);
        line-height: 120%;
        padding-bottom: rem(24px);
        color: $colorTextLight;
        @include mq($until: tablet) {
            font-size: rem(28px);
        }
    }
}
</style>