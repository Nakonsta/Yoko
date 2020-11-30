<template>
    <div class="company__reports">
        <template v-for="item in reports">
            <a href="javascript:{}" class="company__report" :data-title="item.modalTitle" @click="openModal($event, item)">
                <svg :class="`sprite-${item.icon}`"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`./img/sprite.svg#${item.icon}`"></use></svg>
                {{item.title}}
            </a>
        </template>
        <div id="company-report" class="popup popup--alt">
            <div class="popup__body">
                <div class="popup__content">
                    <a href="javascript:{}" class="popup__close" @click="closeModal"><svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg></a>
                    <div class="popup__title">{{modal.title}}</div>
                    <div class="popup__content-container">
                        <ValidationObserver ref="form" tag="div" mode="eager">
                            <form class="popup__form" @submit.prevent="sendForm" slot-scope="{ valid }">
                                <div class="company__reports company__reports--providers" v-if="modal.providers && modal.providers.length > 1">
                                    <label v-for="provider in modal.providers">
                                        <input type="radio" :value="provider.id" v-model="formForSend.provider"/>
                                        <span class="company__report">
                                            <svg class="sprite-ok"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#ok"></use></svg>
                                            {{provider.title}}
                                        </span>
                                    </label>
                                </div>
                                <ValidationProvider name="E-mail" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container">
                                    <span class="field__label">E-mail</span>
                                    <input :class="{field: true, error: failed}" type="email" v-model="formForSend.email">
                                    <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                                </ValidationProvider>
                                <button type="submit" class="btn" :disabled="!valid">Получить</button>
                            </form>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from './helpers/api'

    export default {
        name: 'companyReport',
        mixins: [api],
        data() {
            return {
                reports: [
                    {
                        icon: 'report',
                        title: 'Общий отчёт',
                        modalTitle: 'Получить общий отчёт',
                        providers: [ // todo получение провайдеров данных
                            {
                                id: '0',
                                title: 'Контур Фокус',
                            },
                            {
                                id: '1',
                                title: 'СБИС',
                            }
                        ]
                    },
                    {
                        icon: 'file-search',
                        title: 'Выписка из ЕГРЮЛ',
                        modalTitle: 'Получить выписку из ЕГРЮЛ',
                    },
                    {
                        icon: 'chart',
                        title: 'Финансовый анализ',
                        modalTitle: 'Получить финансовый анализ',
                    },
                ],
                modal: {
                    providers: null,
                    title: null,
                },
                formForSend: {
                    provider: null,
                    email: '',
                },
            }
        },
        created() {
            if (this.$store.state.auth.loggedIn) {
                this.formForSend.email = this.$store.state.auth.user.email
            }
        },
        methods: {
            openModal(evt, item) {
                evt.preventDefault();
                this.modal.title = item.modalTitle;
                this.modal.providers = item.providers;
                if( item.providers && item.providers.length ) {
                    this.formForSend.provider = this.modal.providers[0].id;
                }
                openPopupById('#company-report');
            },
            closeModal() {
                closePopupById('#company-report');
            },
            objectToFormData(data) {
                const fData = new FormData();
                function appendFormData(data, root, formDataObj) {
                    root = root || '';
                    if (data instanceof File) {
                        formDataObj.append(root, data);
                    } else if (Array.isArray(data)) {
                        for (let i = 0; i < data.length; i++) {
                            appendFormData(data[i], root + '[' + i + ']', formDataObj);
                        }
                    } else if (typeof data === 'object' && data) {
                        for (const key in data) {
                            // eslint-disable-next-line
                            if (data.hasOwnProperty(key)) {
                                if (root === '') {
                                    appendFormData(data[key], key, formDataObj);
                                } else {
                                    appendFormData(data[key], root + '[' + key + ']', formDataObj);
                                }
                            }
                        }
                    } else if (data !== null && typeof data !== 'undefined') {
                        formDataObj.append(root, data);
                    }
                }
                appendFormData(data, '', fData);
                return fData;
            },
            sendForm(evt) {
                evt.preventDefault();
                const fData = {
                    provider: this.formForSend.provider,
                    email: this.formForSend.email,
                };
                const formDataObj = this.objectToFormData(fData);
                window.openLoader();
                this.fetchCompanyReportForm(formDataObj)
                    .then(() => {
                        window.closeLoader();
                        window.notificationSuccess('Ваш запрос отправлен');
                    })
                    .catch((response) => {
                        window.closeLoader();
                        window.notificationError('Ошибка сервера');
                    });
            },
        },
    }
</script>

<style lang="scss">
    .form__columns--remember {
        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
            .checkbox {
                margin-bottom: .5rem;
            }
        }
    }
</style>
