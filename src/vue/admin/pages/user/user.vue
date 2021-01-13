<template>
    <div class="form form--white">
        <div class="form__title">Ваши данные</div>
        <ValidationObserver ref="form" tag="div" mode="eager">
            <form class="support-form__form" slot-scope="{ valid }">
                <div class="form__grid">
                    <InputInput
                        parentClass="field__container"
                        label="E-mail"
                        placeholder="Введите ваш e-mail"
                        :rules="{required: true }"
                        v-model="userData.email"
                        :maxlength="100"
                    />
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
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import InputInput from "../../../components/forms/Input";

export default {
    name: 'User',

    components: {
        InputInput,
    },

    data() {
        return {
            userData: {
                login: null,
                newLogin: null,
                password: null,
                newPassword: null,
                email: null,
                lastName: null,
                name: null,
                secondName: null,
                position: null,
                phone: null,
                fax: null,
            }
        }
    },

    created() {
        this.fillUserDataFromStore();
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
                this.userData.phone = this.$store.state.auth.user.phone;
            }
            if (this.$store.state.auth.user.fax) {
                this.userData.fax = this.$store.state.auth.user.fax;
            }
        }
    }
}
</script>