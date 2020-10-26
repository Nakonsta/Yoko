<template>
    <div class="customers-form__block">
        <div class="customers-form__title">
            Остались вопросы?
        </div>
        <ValidationObserver ref="form" tag="div" mode="eager">
            <form class="customers-form__form">
                <ValidationProvider name="ФИО" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                    <span class="field__label">ФИО</span>
                    <input :class="{field: true, error: failed}" type="text" name="fio" v-model="customersFio">
                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="E-mail" v-slot="{ errors, failed }" rules="required|email" tag="label" class="field__container">
                    <span class="field__label">E-mail</span>
                    <input :class="{field: true, error: failed}" type="text" name="email" v-model="customersEmail">
                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="Телефон" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                    <span class="field__label">Телефон</span>
                    <input :class="{field: true, error: failed}" type="tel" name="phone" v-model="customersPhone">
                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="form__columns">
                    <label class="field__container field__container--large">
                        <input class="field" type="checkbox" name="confident" v-model="customersConfident">
                        <span class="field__label">Я согласен с <a href="#" class="customers-form__link">Политикой конфиденциальности</a></span>
                    </label>
                </div>
                <button type="submit" class="btn customers-form__submit">Отправить</button>
            </form>
        </ValidationObserver>
    </div>
</template>