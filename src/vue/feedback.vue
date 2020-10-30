<template>
    <div class="feedback__block">
        <div class="feedback__title">
            Остались вопросы?
        </div>
        <ValidationObserver ref="form" tag="div" mode="eager">
            <form class="feedback__form" @submit.prevent="onSubmit" slot-scope="{ valid }">
                <ValidationProvider name="ФИО" v-slot="{ errors, failed }" :rules="{ required: true, min: 2 }" tag="label" class="field__container">
                    <span class="field__label">ФИО</span>
                    <input :class="{field: true, error: failed}" type="text" name="fio" v-model="customersFio">
                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="E-mail" v-slot="{ errors, failed }" rules="required|email" tag="label" class="field__container">
                    <span class="field__label">E-mail</span>
                    <input :class="{field: true, error: failed}" type="text" name="email" v-model="customersEmail">
                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="Телефон" v-slot="{ errors, failed }" :rules="{ required: true, min: 18 }" tag="label" class="field__container">
                    <span class="field__label">Телефон</span>
                    <input 
                        :class="{field: true, error: failed}"
                        type="text"
                        name="phone"
                        v-model="customersPhone"
                        v-mask="`+7 (###) ###-##-##`"
                        placeholder="+7 (___) ___-__-__">
                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="form__columns">
                    <label class="checkbox">
                        <input 
                          class=""
                          type="checkbox"
                          name="confident"
                          v-model="customersConfident"
                          @change="isChecked = !isChecked"
                        >
                        <span class="checkbox__body"></span>
                        <span class="checkbox__text">Я согласен с <a href="#" class="feedback__link">Политикой конфиденциальности</a></span>
                    </label>
                </div>
                <button type="submit" class="btn feedback__submit" :disabled="!valid || !customersConfident">Отправить</button>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import api from './helpers/api'

export default {
    name: 'Feedback',

    data() {
        return {
            customersFio: '',
            customersEmail: '',
            customersPhone: '',
            customersConfident: false,
            isChecked: false,
        }
    },

    methods: {
        onSubmit() {

        }
    }
}
</script>