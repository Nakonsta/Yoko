<template>
    <div :class="classes">
        <div v-if="!isUploaded" class="application-file-uploader__description" @click="selectFile">
            <div class="application-file-uploader__icon">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#paperclip"></use>
                </svg>
            </div>
            <div class="application-file-uploader__link">
                {{ label }}
            </div>
        </div>
        <div v-else class="application-file-uploader__file-info">
            <div class="application-file-uploader__file">
                <a class="application-file-uploader__link" :href="localFile.url" target="_blank">{{
                    localFile.name
                }}</a>
                <div
                    v-if="!disabled && (localFile.name || fileName)"
                    class="application-file-uploader__remove"
                    @click="removeFile"
                >
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#close"></use>
                    </svg>
                </div>
            </div>
        </div>
        <input
            style="display: none"
            type="file"
            ref="input"
            accept="image/.jpg,.png,.jpeg,.pdf,.doc,.docx,.xls,.xlsx"
            @change="uploadFile"
        />
    </div>
</template>
<script>
import functions from '@/helpers/functions'
export default {
    name: 'application-file-uploader',
    props: {
        label: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean
        },
        fileName: {
            type: String
        },
        fileUrl: {
            type: String
        },
        hasError: {
            type: Boolean
        }
    },
    mixins: [functions],
    data() {
        return {
            localFile: {
                name: this.fileName ?? '',
                url: this.fileUrl ?? '',
                file: null
            }
        }
    },
    computed: {
        classes() {
            return [
                'application-file-uploader',
                { 'application-file-uploader-error': this.hasError },
                { 'application-file-uploader-disabled': this.disabled }
            ]
        },
        isUploaded() {
            return this.localFile.name && this.localFile.url
        }
    },
    methods: {
        selectFile() {
            if (!this.disabled) {
                this.$refs.input.click()
            }
        },
        uploadFile() {
            const types = [
                'image/png',
                'image/jpg',
                'image/jpeg',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel'
            ]
            const file = this.$refs.input.files[0]

            if (file) {
                if (this.convertFileSize({ bytes: file.size, convertTo: 'MB' }) >= 20) {
                    window.notificationError(
                        'Вы пытаетесь загрузить файл превыщающий максимальный вес. Максимальный допустимый вес файла 20MB'
                    )
                    return
                }

                if (types.includes(file.type)) {
                    this.localFile.name = file.name
                    this.localFile.url = URL.createObjectURL(file)
                    this.localFile.file = file
                    this.$emit('uploaded', file)
                } else {
                    window.notificationError(
                        'Вы пытаетесь загрузить файл неверного формата. Разрешенные форматы .pdf, .jpeg, .png, .doc, .docx, .xls, .xlsx'
                    )
                }
            }

            this.$refs.input.files = null
            this.$refs.input.value = ''
        },
        removeFile() {
            this.$emit('remove', this.localFile.file)

            this.localFile = { name: '', url: '', file: null }
            this.$refs.input.files = null
            this.$refs.input.value = ''
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-file-uploader {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    &:last-child {
        margin-bottom: 0;
    }

    &--error &__icon {
        fill: $colorRed;
    }

    &--disabled &__description {
        cursor: default;

        &:hover {
            background-color: transparent;
        }

        * {
            color: $colorGray;
            fill: $colorGray;
        }
    }

    &__description {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
        margin-right: auto;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.3s;

        @include mq($until: tablet) {
            max-width: 100%;
        }

        &:hover {
            background-color: rgba(80, 80, 80, 0.05);
        }
    }

    &__icon {
        width: 16px;
        height: 16px;
        margin-right: rem(8px);
        fill: $colorTurquoise;
    }

    &__file-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;

        width: 100%;

        @include mq($until: tablet) {
            max-width: 100%;
        }
    }

    &__file {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        margin-right: rem(20px);
    }

    &__link {
        width: 100%;

        font-family: Roboto;
        font-size: rem(14px);
        text-decoration-line: underline;
        color: $colorTurquoise;
    }

    &__remove {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-left: rem(12px);
        width: 15px;
        height: 15px;
        cursor: pointer;
        fill: $colorTurquoise;
    }

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
