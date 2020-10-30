<template>
    <div class="support-block">
        <div class="support-form">
            <div class="support-form__item">
                <label class="support-form__label">Выбрать тему</label>
                <multiselect
                v-model="formForSend.theme"
                deselect-label="Can't remove this value" 
                track-by="name"
                label="name" 
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
                    {{ option.name }}
                    </template>
                </multiselect>
            </div>
            <div v-if="formForSend.theme && formForSend.theme.value === 'auth'" class="support-form__item">
                <label class="support-form__label">Уточнить тему</label>
                <multiselect
                v-model="formForSend.login_to_system"
                deselect-label="Can't remove this value" 
                track-by="name" 
                label="name"
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
                    {{ option.name }}
                    </template>
                </multiselect>
            </div>
            <div v-if="
                formForSend.theme &&
                (formForSend.theme.value === 'bidding' ||
                formForSend.theme.value === 'technical' ||
                formForSend.theme.value === 'autonomous')
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
                        placeholder="Номер торговой процедуры">
                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
        </div>
        <div class="support-info">
            <div class="support-info__title">
                У компании OOO “ПРИМЕР” есть учетная запись.
            </div>
            <div class="support-info__text">
                Для получения доступа к учетной записи отправьте запрос о смене пользователя. Перед этим рекомендуем проверить работает ли в вашей организации существующий пользователь. Для этого выберете «Запросить контакты главного пользователя».
            </div>
            <div class="support-info__title">
                Как отправить обращение
            </div>
            <div class="support-info__stages">
                <div class="support-info__stage">
                    <a :href="supportInfo.url" class="support-info__link" download>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12C18.7348 12 18.4804 12.1054 18.2929 12.2929C18.1054 12.4804 18 12.7348 18 13V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V13C2 12.7348 1.89464 12.4804 1.70711 12.2929C1.51957 12.1054 1.26522 12 1 12C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12ZM9.29 13.71C9.3851 13.801 9.49725 13.8724 9.62 13.92C9.7397 13.9729 9.86913 14.0002 10 14.0002C10.1309 14.0002 10.2603 13.9729 10.38 13.92C10.5028 13.8724 10.6149 13.801 10.71 13.71L14.71 9.71C14.8983 9.5217 15.0041 9.2663 15.0041 9C15.0041 8.7337 14.8983 8.4783 14.71 8.29C14.5217 8.1017 14.2663 7.99591 14 7.99591C13.7337 7.99591 13.4783 8.1017 13.29 8.29L11 10.59V1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0C9.73478 0 9.48043 0.105357 9.29289 0.292893C9.10536 0.48043 9 0.734784 9 1V10.59L6.71 8.29C6.61676 8.19676 6.50607 8.1228 6.38425 8.07234C6.26243 8.02188 6.13186 7.99591 6 7.99591C5.86814 7.99591 5.73757 8.02188 5.61575 8.07234C5.49393 8.1228 5.38324 8.19676 5.29 8.29C5.19676 8.38324 5.1228 8.49393 5.07234 8.61575C5.02188 8.73757 4.99591 8.86814 4.99591 9C4.99591 9.13186 5.02188 9.26243 5.07234 9.38425C5.1228 9.50607 5.19676 9.61676 5.29 9.71L9.29 13.71Z" fill="#31ACB8"/>
                        </svg>
                        <span class="support-info__stage-text">Скачайте шаблон заявления из формы обратной связи.</span>
                    </a>
                </div>
                <div class="support-info__stage">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 8H6C6.26522 8 6.51957 7.89464 6.70711 7.70711C6.89464 7.51957 7 7.26522 7 7C7 6.73478 6.89464 6.48043 6.70711 6.29289C6.51957 6.10536 6.26522 6 6 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8ZM10.2105 10.3862L8.53711 12.5381L7.66895 11.7568C7.56772 11.6657 7.44894 11.5962 7.31989 11.5526C7.19085 11.5091 7.05425 11.4923 6.9185 11.5034C6.78274 11.5145 6.65069 11.5533 6.53045 11.6172C6.4102 11.6812 6.3043 11.7691 6.21924 11.8755L4.21924 14.3755C4.13666 14.478 4.07512 14.5957 4.03815 14.722C4.00118 14.8483 3.98951 14.9807 4.00382 15.1115C4.01812 15.2424 4.05811 15.3691 4.1215 15.4844C4.18488 15.5997 4.27042 15.7014 4.37319 15.7836C4.47597 15.8658 4.59396 15.9269 4.7204 15.9634C4.84684 15.9999 4.97925 16.0111 5.11002 15.9963C5.24079 15.9816 5.36736 15.9411 5.48246 15.8773C5.59756 15.8135 5.69893 15.7276 5.78076 15.6245L7.11865 13.9521L7.99756 14.7431C8.09966 14.8351 8.21961 14.905 8.34993 14.9485C8.48024 14.992 8.61813 15.0082 8.75498 14.9961C8.89183 14.9839 9.02472 14.9437 9.14534 14.8779C9.26596 14.8121 9.37173 14.7222 9.45605 14.6137L11.7895 11.6137C11.9523 11.4043 12.0253 11.1388 11.9923 10.8757C11.9593 10.6125 11.8232 10.3732 11.6138 10.2104C11.5101 10.1298 11.3915 10.0704 11.2649 10.0356C11.1383 10.0009 11.006 9.99135 10.8757 10.0077C10.6125 10.0406 10.3732 10.1768 10.2105 10.3862V10.3862ZM15.9876 6.93829C15.9745 6.6972 15.8753 6.46879 15.7082 6.29456L15.7067 6.29266L9.70734 0.29327L9.70551 0.29181C9.62217 0.211296 9.52534 0.146035 9.41943 0.099C9.38953 0.085 9.35843 0.07709 9.32697 0.066C9.24101 0.0357777 9.15126 0.0176609 9.0603 0.0121701C9.03925 0.0108601 9.02136 0 9 0H3C2.20462 0.000868196 1.44206 0.317218 0.879639 0.879639C0.317218 1.44206 0.000868196 2.20462 0 3V17C0.000868196 17.7954 0.317218 18.5579 0.879639 19.1204C1.44206 19.6828 2.20462 19.9991 3 20H13C13.7954 19.9991 14.5579 19.6828 15.1204 19.1204C15.6828 18.5579 15.9991 17.7954 16 17V7C16 6.97809 15.989 6.95984 15.9876 6.93829ZM10 3.41406L12.5859 6H11C10.7349 5.99966 10.4807 5.89419 10.2933 5.70673C10.1058 5.51927 10.0003 5.26511 10 5V3.41406ZM14 17C13.9997 17.2651 13.8942 17.5193 13.7067 17.7067C13.5193 17.8942 13.2651 17.9997 13 18H3C2.73489 17.9997 2.48073 17.8942 2.29327 17.7067C2.10581 17.5193 2.00034 17.2651 2 17V3C2.00034 2.73489 2.10581 2.48073 2.29327 2.29327C2.48073 2.10581 2.73489 2.00034 3 2H8V5C8.00087 5.79538 8.31722 6.55794 8.87964 7.12036C9.44206 7.68278 10.2046 7.99913 11 8H14V17Z" fill="#31ACB8"/>
                    </svg>
                    <span class="support-info__stage-text">Оформите его на официальном бланке компании.</span>
                </div>
                <div class="support-info__stage">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.71 9.29C8.6149 9.19896 8.50275 9.12759 8.38 9.08C8.13654 8.97998 7.86346 8.97998 7.62 9.08C7.49725 9.12759 7.3851 9.19896 7.29 9.29L5.29 11.29C5.1017 11.4783 4.99591 11.7337 4.99591 12C4.99591 12.2663 5.1017 12.5217 5.29 12.71C5.4783 12.8983 5.7337 13.0041 6 13.0041C6.2663 13.0041 6.5217 12.8983 6.71 12.71L7 12.41V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V12.41L9.29 12.71C9.38296 12.8037 9.49356 12.8781 9.61542 12.9289C9.73728 12.9797 9.86799 13.0058 10 13.0058C10.132 13.0058 10.2627 12.9797 10.3846 12.9289C10.5064 12.8781 10.617 12.8037 10.71 12.71C10.8037 12.617 10.8781 12.5064 10.9289 12.3846C10.9797 12.2627 11.0058 12.132 11.0058 12C11.0058 11.868 10.9797 11.7373 10.9289 11.6154C10.8781 11.4936 10.8037 11.383 10.71 11.29L8.71 9.29ZM16 6.94C15.9896 6.84813 15.9695 6.75763 15.94 6.67V6.58C15.8919 6.47718 15.8278 6.38267 15.75 6.3L9.75 0.3C9.66734 0.222216 9.57282 0.158081 9.47 0.11H9.37C9.27276 0.058003 9.16826 0.020922 9.06 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V7C16 7 16 7 16 6.94ZM10 3.41L12.59 6H11C10.7348 6 10.4804 5.89464 10.2929 5.70711C10.1054 5.51957 10 5.26522 10 5V3.41ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H8V5C8 5.79565 8.31607 6.55871 8.87868 7.12132C9.44129 7.68393 10.2044 8 11 8H14V17Z" fill="#31ACB8"/>
                    </svg>
                    <span class="support-info__stage-text">Приложите скан-копию вашего заявления в формате pdf, jpeg, png</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from './helpers/api'

export default {
    name: 'Support',

    data() {
        return {
            supportForm: {
                topics: [
                    { name: '223-ФЗ. Проблемы выгрузки на ЕИС', value: '223' },
                    { name: 'Вопросы по оплате и подключению', value: 'payment' },
                    { name: 'Оформление договора, реорганизация', value: 'agreement' },
                    { name: 'Смена наименования, смена ОПФ', value: 'rename' },
                    { name: 'Смена юридического адреса и КПП', value: 'change-address' },
                    { name: 'Акт, счет-фактура', value: 'invoice' },
                    { name: 'Акты-сверки и авансовые счета-фактуры', value: 'reconciliation' },
                    { name: 'Вход в систему', value: 'auth' },
                    { name: 'НСИ', value: 'law' },
                    { name: 'Организация и участие в торгах', value: 'bidding' },
                    { name: 'Предложения и отзывы о работе Системы', value: 'reviews' },
                    { name: 'Работа ЭЦП', value: 'EDS' },
                    { name: 'Регистрация компании в Системе', value: 'registration' },
                    { name: 'Техническое проблемы', value: 'technical' },
                    { name: 'Автономная отрасль', value: 'autonomous' },
                ],
                topicsAuth: [
                    { name: 'Запросить контакты главного пользователя', value: 'request-contacts' },
                    { name: 'Сменить главного пользователя', value: 'change-main-user' },
                ]
            },
            formForSend: {
                theme: null,
                login_to_system: null,
                trade_procedure_number: null,
            },
            supportInfo: {
                reference_block: null,
                download_link: null,
                ext: null,
                name: null,
                original_name: null,
                size: 0,
                url: null,
            }
        }
    },

    mixins: [api],

    created() {
       this.getSupportInfo() 
    },

    methods: {
        getSupportInfo() {
            this.fetchSupportInfo()
                .then((response) => {
                    this.supportInfo.reference_block = response.data.data.reference_block
                    this.supportInfo.download_link = response.data.data.statement.download_link
                    this.supportInfo.ext = response.data.data.statement.ext
                    this.supportInfo.name = response.data.data.statement.name
                    this.supportInfo.original_name = response.data.data.statement.original_name
                    this.supportInfo.size = response.data.data.statement.size
                    this.supportInfo.url = response.data.data.statement.url
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
}
</script>