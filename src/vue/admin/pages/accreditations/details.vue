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
                <accreditationsMessage v-if="viewType.isCreate" />
                <accreditations-title
                    :title="`Заявка на аккредитацию ${viewType.isCreate ? '' : `№${id}`}`"
                    :margin="!viewType.isCreate && accreditation.status ? '32px 0 0 0' : '0'"
                ></accreditations-title>

                <div class="divider"></div>
            </div>
            <div class="accreditation-details__content">
                <accreditation-details-card
                    title="Соглашение с оператором торгов"
                    pdf="/content/sample.pdf"
                    :isAccepted="accreditation.agreement"
                    :disabled="!viewType.isCreate"
                    :hasError="errors.agreement"
                    @on-agree="
                        accreditation.agreement = $event
                        errors.agreement = false
                    "
                ></accreditation-details-card>
                <accreditation-details-card
                    title="Подтверждение отсутствия в РНП"
                    pdf="/content/sample.pdf"
                    :isAccepted="accreditation.rnp"
                    :disabled="!viewType.isCreate"
                    :hasError="errors.rnp"
                    @on-agree="
                        accreditation.rnp = $event
                        errors.rnp = false
                    "
                ></accreditation-details-card>

                <accreditation-details-select
                    :defaultCompanyId="accreditation.entity_id"
                    @on-select="onSelect"
                    :disabled="!viewType.isCreate"
                    :hasError="errors.noCompany"
                ></accreditation-details-select>

                <div class="accreditation-details__title">Аккредитовать как:</div>
                <div class="accreditation-details__checkboxes">
                    <accreditation-details-checkbox
                        label="Поставщик"
                        :value="accreditation.provider_accreditation"
                        @click="
                            accreditation.provider_accreditation = $event
                            errors.noAccreditationType = false
                        "
                        :disabled="!viewType.isCreate"
                        :hasError="errors.noAccreditationType"
                    ></accreditation-details-checkbox>
                    <accreditation-details-checkbox
                        label="Заказчик"
                        :value="accreditation.customer_accreditation"
                        @click="
                            accreditation.customer_accreditation = $event
                            errors.noAccreditationType = false
                        "
                        :disabled="!viewType.isCreate"
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
                        :showStatus="viewType.isEdit"
                        :disabled="viewType.isView || (viewType.isEdit && accreditation.documents[key].file.accepted)"
                        :hasError="errors.files[label.id]"
                        @uploaded="onFileUpload($event, label.id)"
                        @remove="onFileRemove"
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
import accreditationsMessage from '../../../components/blocks/accreditationsMessage'

export default {
    name: 'accreditation-details',
    components: {
        accreditationsMessage,
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
                status: null,
                rnp: false,
                agreement: false
            },
            fileLabels: null,
            newFiles: {},
            errors: {
                noCompany: false,
                noAccreditationType: false,
                rnp: false,
                agreement: false,
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
            this.errors.noCompany = false
        },
        onFileUpload(file, key) {
            if (this.viewType.isCreate) {
                this.accreditation.documents[key] = file
            } else {
                this.newFiles[key] = file
            }

            this.errors.files[key] = false
            this.errors = Object.assign({}, this.errors)
        },
        onFileRemove(file) {
            if (this.viewType.isCreate) {
                Object.entries(this.accreditation.documents).map(([key, value]) => {
                    if (value === file) {
                        this.accreditation.documents[key] = null
                    }
                })
            } else {
                Object.entries(this.newFiles).map(([key, value]) => {
                    if (value === file) {
                        this.newFiles[key] = null
                    }
                })
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

            let filesSize = 0
            if (this.viewType.isCreate) {
                if (!this.accreditation.agreement) {
                    this.errors.agreement = true
                    hasErrors = true
                }

                if (!this.accreditation.rnp) {
                    this.errors.rnp = true
                    hasErrors = true
                }

                Object.entries(this.accreditation.documents).forEach(([key, document]) => {
                    if (!(document instanceof File)) {
                        this.errors.files[key] = true
                        hasErrors = true
                    } else {
                        filesSize += document.size
                    }
                })
            } else {
                Object.entries(this.newFiles).forEach(([key, file], i) => {
                    if (!(file instanceof File) && !this.accreditation.documents[i].file.accepted) {
                        this.errors.files[key] = true
                        hasErrors = true
                    } else {
                        if (file) {
                            filesSize += file.size
                        }
                    }
                })
            }

            if (!this.checkAllowFileSize(filesSize)) {
                hasErrors = true
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
            if (this.convertFileSize({ bytes: size, convertTo: 'MB' }) >= 100) {
                window.notificationError(
                    'Вы пытаетесь загрузить файлы превыщающие максимальный вес. Максимальный допустимый вес всех файлов 100MB'
                )

                return false
            } else {
                return true
            }
        },
        update() {
            window.openLoader()
            const updateFiles = this.getNewUploadFiles()
            this.updateAccreditation(this.id, updateFiles)
                .then(() => {
                    window.notificationSuccess('Документы отправлены на аккредитацию')
                    this.$router.replace('/personal/accreditations')
                })
                .catch(e => {
                    window.notificationError('Ошибка сервера. Попробуйте повторить позднее.')
                })
                .finally(() => window.closeLoader())
        },
        getNewUploadFiles() {
            const objFiles = {}
            Object.entries(this.newFiles).forEach(([key, file]) => {
                if (file instanceof File) {
                    objFiles[key] = file
                }
            })

            return objFiles
        },
        send() {
            window.openLoader()
            this.sendAccreditationCompany(this.objectToFormData(this.accreditation))
                .then(() => {
                    window.notificationSuccess('Заявка на аккредитацию отправлена')
                    this.$router.replace('/personal/accreditations')
                })
                .catch(e => {
                    if (e?.response?.data?.message ?? false) {
                        window.notificationError(
                            'Вы пытаетесь загрузить файлы неверного формата. Разрешенные форматы pdf, jpeg.'
                        )
                    } else {
                        window.notificationError('Ошибка сервера. Попробуйте повторить позднее.')
                    }
                })
                .finally(() => window.closeLoader())
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
    padding: rem(40px) 0 rem(40px) !important;
    border-radius: 6px;
    background-color: #fff;

    @media (max-width: 1024px) {
        padding: rem(80px) 0 rem(40px) !important;
    }

    &__header {
        padding: 0 rem(40px);

        @include mq($until: mobileLandscape) {
            padding: 0 rem(20px);
        }
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

        @include mq($until: mobileLandscape) {
            padding: 0 rem(20px);
        }
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
        outline: none;
        border-radius: 6px;
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #ffffff;

        @include mq($until: mobileLandscape) {
            margin: rem(24px) rem(20px) 0 rem(20px);
        }

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
