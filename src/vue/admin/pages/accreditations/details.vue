<template>
    <div class="accreditation-details">
        <div v-if="loading" class="preloader">
            <div class="preloader__preloader">
                <div class="preloader__loader"></div>
            </div>
        </div>
        <div v-if="!viewType.isEmpty && !loading" class="accreditation-details__wrapper">
            <div class="accreditation-details__header">
                <accreditations-steps
                    v-if="!viewType.isCreate && accreditation.status"
                    :status="accreditation.status"
                ></accreditations-steps>
                <accreditations-title
                    :title="`Заявка на аккредитацию ${viewType.isCreate ? '' : `№${id}`}`"
                    margin="32px 0 0 0"
                ></accreditations-title>

                <div class="divider"></div>
            </div>
            <div class="accreditation-details__content">
                <accreditation-details-card
                    title="Соглашение с оператором торгов"
                    content="Настоящее Пользовательское соглашение (далее – Соглашение)
                регулирует отношения по использованию единой системы электронной
                торговли , доступ к которой осуществляется через всемирную
                компьютерную сеть Интернет, в том числе, на сайте по адресу:
                между Акционерным обществом , которое является юридическим
                лицом, созданным на территории Российской Федерации и в
                соответствии с законодательством Российской Федерации, с одной
                стороны, и физическим/юридическим лицом, принявшим условия
                настоящего Соглашения путём присоединения к настоящему
                Соглашению в целом и безоговорочно, с другой стороны. Настоящее
                Соглашение и отношения Сторон, возникшие из настоящего
                Соглашения, регулируются законодательством Российской Федерации.

                Настоящее Соглашение в соответствии со ст. 435 Гражданского
                кодекса Российской Федерации является офертой - адресованной
                любым физическим/юридическим лицам предложением заключить
                Соглашение на указанных в нём условиях. Полное и безоговорочное
                принятие условий настоящего Соглашения осуществляется в момент
                заключения договора между Оператором и Участником. В свою
                очередь, моментом заключения такого договора является совершение
                Участником действий, направленных на использование
                информационно-аналитической и торгово-операционной системы
                электронной торговли , расположенной,в том числе, на сайте по
                адресу: , путем поиска на сайте, просмотра сайта, регистрации на
                сайте, направления сообщений через форму связи и т.д. Полный
                перечень торговых площадок (расположенных на иных доменных
                адресах), объединенных в единой системе электронной торговли
                поименован на сайте по адресу . 
								
								В отношении порядка и условий
                заключения настоящего Соглашения применяются нормы Гражданского
                кодекса Российской Федерации, регулирующие порядок и условия
                заключения договора присоединения (ст. 428 ГК РФ), направления
                оферты и акцепта (ст. 435–444 ГК РФ)."
                    :isAccepted="false"
                    :disabled="viewType.isView"
                ></accreditation-details-card>
                <accreditation-details-card
                    title="Подтверждение отсутствия в РНП"
                    content="Настоящее Пользовательское соглашение (далее – Соглашение)
                регулирует отношения по использованию единой системы электронной
                торговли , доступ к которой осуществляется через всемирную
                компьютерную сеть Интернет, в том числе, на сайте по адресу:
                между Акционерным обществом , которое является юридическим
                лицом, созданным на территории Российской Федерации и в
                соответствии с законодательством Российской Федерации, с одной
                стороны, и физическим/юридическим лицом, принявшим условия
                настоящего Соглашения путём присоединения к настоящему
                Соглашению в целом и безоговорочно, с другой стороны. Настоящее
                Соглашение и отношения Сторон, возникшие из настоящего
                Соглашения, регулируются законодательством Российской Федерации.
                Настоящее Соглашение в соответствии со ст. 435 Гражданского
                кодекса Российской Федерации является офертой - адресованной
                любым физическим/юридическим лицам предложением заключить
                Соглашение на указанных в нём условиях. Полное и безоговорочное
                принятие условий настоящего Соглашения осуществляется в момент
                заключения договора между Оператором и Участником. В свою
                очередь, моментом заключения такого договора является совершение
                Участником действий, направленных на использование
                информационно-аналитической и торгово-операционной системы
                электронной торговли , расположенной,в том числе, на сайте по
                адресу: , путем поиска на сайте, просмотра сайта, регистрации на
                сайте, направления сообщений через форму связи и т.д. Полный
                перечень торговых площадок (расположенных на иных доменных
                адресах), объединенных в единой системе электронной торговли
                поименован на сайте по адресу . В отношении порядка и условий
                заключения настоящего Соглашения применяются нормы Гражданского
                кодекса Российской Федерации, регулирующие порядок и условия
                заключения договора присоединения (ст. 428 ГК РФ), направления
                оферты и акцепта (ст. 435–444 ГК РФ)."
                    :isAccepted="false"
                    :disabled="viewType.isView"
                ></accreditation-details-card>

                <accreditation-details-select
                    :defaultCompanyId="accreditation.entity_id"
                    @on-select="onSelect"
                    :disabled="viewType.isView"
                    :hasError="errors.noCompany"
                ></accreditation-details-select>

                <div class="accreditation-details__title">Аккредитовать как:</div>
                <div class="accreditation-details__checkboxes">
                    <accreditation-details-checkbox
                        label="Поставщик"
                        :value="accreditation.provider_accreditation"
                        @click="accreditation.provider_accreditation = $event"
                        :disabled="viewType.isView"
                        :hasError="errors.noAccreditationType"
                    ></accreditation-details-checkbox>
                    <accreditation-details-checkbox
                        label="Заказчик"
                        :value="accreditation.customer_accreditation"
                        @click="accreditation.customer_accreditation = $event"
                        :disabled="viewType.isView"
                        :hasError="errors.noAccreditationType"
                    ></accreditation-details-checkbox>
                </div>
                <div class="accreditation-details__title">Документы:</div>
                <div v-if="fileLabels" class="accreditations-details__files">
                    <accreditation-details-file-uploader
                        v-for="(label, key) in fileLabels"
                        :key="label.id"
                        :label="label.value"
                        tooltip="Файл формата PDF/JPEG/PNG"
                        :fileName="accreditation.documents.length ? accreditation.documents[key].file.name : ''"
                        :fileUrl="accreditation.documents.length ? accreditation.documents[key].file.url : ''"
                        :accepted="accreditation.documents.length ? accreditation.documents[key].file.accepted : null"
                        :disabled="viewType.isView"
                        :hasError="errors.files[label.id]"
                        @uploaded="onFileUpload($event, label.id)"
                    ></accreditation-details-file-uploader>
                </div>
            </div>
            <div v-if="accreditation.comment" class="accreditation-details__comment">
                <span>Комментарий от оператора:</span>
                <p>{{ accreditation.comment }}</p>
            </div>
            <button
                v-if="!viewType.isView"
                class="accreditation-details__submit"
                @click="validation(viewType.isCreate ? 'send' : 'update')"
            >
                {{ viewType.isCreate ? 'Отправить заявку на аккредитацию' : 'Повторно отправить документы' }}
            </button>
        </div>
        <accreditation-details-empty v-if="!loading && viewType.isEmpty"></accreditation-details-empty>
    </div>
</template>
<script>
import api from '../../../helpers/api'
import functions from '../../../helpers/functions'

import AccreditationsTitle from '../../../components/admin/accreditations/AccreditationsTitle.vue'
import AccreditationsSteps from '../../../components/admin/accreditations/AccreditationsSteps.vue'
import AccreditationDetailsCard from '../../../components/admin/accreditations/details/AccreditationDetailsCard.vue'
import AccreditationDetailsSelect from '../../../components/admin/accreditations/details/AccreditationDetailsSelect.vue'
import AccreditationDetailsCheckbox from '../../../components/admin/accreditations/details/AccreditationDetailsCheckbox.vue'
import AccreditationDetailsFileUploader from '../../../components/admin/accreditations/details/AccreditationDetailsFileUploader.vue'
import AccreditationDetailsEmpty from '../../../components/admin/accreditations/details/AccreditationDetailsEmpty.vue'

export default {
    name: 'accreditation-details',
    components: {
        AccreditationsSteps,
        AccreditationsTitle,
        AccreditationDetailsSelect,
        AccreditationDetailsCard,
        AccreditationDetailsFileUploader,
        AccreditationDetailsEmpty,
        AccreditationDetailsCheckbox
    },
    mixins: [api, functions],
    data() {
        return {
            loading: false,
            accreditation: {
                entity_id: null,
                provider_accreditation: false,
                customer_accreditation: false,
                documents: {},
                status: null
            },
            fileLabels: null,
            newFiles: {},
            errors: {
                noCompany: false,
                noAccreditationType: false,
                files: {}
            }
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        viewType() {
            return {
                isCreate: this.id === 'new',
                isEdit: this.accreditation.status !== null ? this.accreditation.status.id === 'revision' : false,
                isView:
                    this.id !== 'new' &&
                    !(this.accreditation.status !== null ? this.accreditation.status.id === 'revision' : false),
                isEmpty: false
            }
        }
    },
    methods: {
        getAccreditationDetails() {
            this.loading = true
            this.fetchAccreditationDetails(this.id)
                .then(data => {
                    this.accreditation = {
                        ...this.accreditation,
                        ...(data?.data?.data ?? {})
                    }
                })
                .catch(() => {
                    this.viewType.isEmpty = true
                })
                .finally(() => (this.loading = false))
        },
        getAccreditationSampleRequiredFiles() {
            this.fetchAccreditationSampleRequiredFiles().then(data => {
                this.fileLabels = Object.values(data.data.data)
                this.fileLabels.forEach(({ id }) => {
                    this.newFiles[id] = null

                    if (this.viewType.isCreate) {
                        this.accreditation.documents[id] = null
                    }
                })
            })
        },
        onSelect(value) {
            this.accreditation.entity_id = value.id
        },
        onFileUpload(file, key) {
            if (this.viewType.isCreate) {
                this.accreditation.documents[key] = file
            } else {
                this.newFiles[key] = file
            }
        },
        validation(typeSend) {
            this.errors = {
                noCompany: false,
                noAccreditationType: false,
                files: {}
            }

            let hasErrors = false

            if (!this.accreditation.provider_accreditation && !this.accreditation.customer_accreditation) {
                this.errors.noAccreditationType = true
                hasErrors = true
            }

            if (this.accreditation.entity_id === null) {
                this.errors.noCompany = true
                hasErrors = true
            }

            if (this.viewType.isCreate) {
                let filesSize = 0
                Object.entries(this.accreditation.documents).forEach(([key, document]) => {
                    if (!(document instanceof File)) {
                        this.errors.files[key] = true
                        hasErrors = true
                    } else {
                        filesSize += document.size
                    }
                })
                
                if (!this.checkAllowFileSize(filesSize)) {
                    hasErrors = true
                }
            } else {
                let filesSize = 0
                Object.entries(this.newFiles).forEach(([key, file]) => {
                    if (!(file instanceof File) && !this.accreditation.documents[key].file.accepted) {
                        this.errors.files[key] = true
                        hasErrors = true
                    } else {
                        filesSize += file.size
                    }
                })
                
                if (!this.checkAllowFileSize(filesSize)) {
                    hasErrors = true
                }
            }

            if (!hasErrors) {
                switch (typeSend) {
                    case 'update':
                        this.update()
                        break
                    case 'send':
                        this.send()
                        break
                }
            }
        },
        checkAllowFileSize(size) {
            if (this.convertFileSize({bytes: size, convertTo: 'MB'}) >= 100) {
                window.notificationError(
                    'Вы пытаетесь загрузить файлы превыщаюший максимальный вес. Максимальный допустимый вес всех файлов 100MB'
                )

                return false
            } else {
                return true
            }
        },
        update() {
            if (this.checkUnacceptedFiles()) {
                const updateFiles = this.getNewUploadFiles()
                this.updateAccreditation(this.id, updateFiles)
                    .then(() => {
                        window.notificationSuccess('Документы отправлены на аккредитацию')
                        this.$router.replace('/accreditations')
                    })
                    .catch(e => {
                        window.notificationError('Ошибка сервера. Попробуйте повторить позднее.')
                    })
            } else {
                window.notificationError('Зарузите повторно все отклоненные документы')
            }
        },
        getNewUploadFiles() {
            const objFiles = {}
            this.newFiles.forEach((file, key) => {
                if (file instanceof File) {
                    objFiles[key] = file
                }
            })

            return objFiles
        },
        checkUnacceptedFiles() {
            for (const key in this.accreditation.documents) {
                if (this.accreditation.documents[key].accepted === false) {
                    return false
                }
            }

            return true
        },
        send() {
            this.sendAccreditationCompany(this.objectToFormData(this.accreditation))
                .then(() => {
                    window.notificationSuccess('Заявка на аккредитацию отправлена')
                    this.$router.replace('/presonal/accreditations')
                })
                .catch(e => {
                    if (e.response) {
                        switch (e.response.data.message) {
                            case 'Validation error':
                                window.notificationError(
                                    'Вы пытаетесь загрузить файлы неверного формата. Разрешенные форматы pdf, jpeg.'
                                )
                                break
                            default:
                                window.notificationError('Ошибка сервера. Попробуйте повторить позднее.')
                        }
                    } else {
                        window.notificationError('Ошибка сервера. Попробуйте повторить позднее.')
                    }
                })
        }
    },
    created() {
        this.getAccreditationSampleRequiredFiles()
        if (!this.viewType.isCreate) {
            this.getAccreditationDetails()
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.accreditation-details {
    padding: rem(80px) 0 rem(40px) !important;
    border-radius: 6px;
    background-color: #fff;

    &__header {
        padding: 0 rem(40px);
    }

    &__title {
        margin-bottom: rem(16px);

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(16px);
        color: $lightcolorText;
    }

    &__content {
        padding: 0 rem(40px);
    }

    &__checkboxes {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        margin-bottom: rem(32px);
    }

    &__comment {
        width: 100%;
        margin-top: rem(30px);
        padding: rem(14px) rem(40px);
        border-top: 1px solid #cbeaed;
        border-bottom: 1px solid #cbeaed;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(12px);

        span {
            margin-bottom: rem(8px);
            font-weight: 500;
        }

        p {
            margin: 0;

            font-family: Roboto;
            font-weight: 500;
            font-size: rem(12px);
            color: $lightcolorText;
        }
    }

    &__submit {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: rem(13px) rem(33px);
        margin: rem(48px) rem(40px) 0 rem(40px);
        background-color: $colorTurquoise;
        border: none;
        border-radius: 6px;
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #ffffff;

        &:active,
        &:hover {
            background-color: lighten($color: $colorTurquoise, $amount: 5%);
        }

        &:disabled {
            color: $colorGray;

            &:hover {
                background-color: lighten($color: $colorGray, $amount: 5%);
            }
        }
    }
}

.divider {
    width: 100%;
    height: 1px;
    background-color: #d3d3d3;
    margin: 20px 0 32px 0;
}
</style>
