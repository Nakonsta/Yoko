<template>
    <div :class="classes">
        <div v-if="isUploaded" class="application-documents-uploader__files">
            <div class="application-documents-uploader__file" v-for="(file, i) in localFiles" :key="i">
                <span>
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#file"></use>
                    </svg>
                </span>
                <a class="application-documents-uploader__link" :href="file.url" target="_blank">{{ file.name }}</a>
                <div v-if="!disabled" class="application-documents-uploader__remove" @click="removeFile(i)">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#close"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="application-documents-uploader__upload">
            <div class="application-documents-uploader__icon">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#upload"></use>
                </svg>
            </div>
            <div class="application-documents-uploader__label">Перетащите файл (-ы) в область</div>
            <span>или</span>
            <button @click.stop="selectFile">Загрузите файл (-ы)</button>
            <input
                type="file"
                ref="input"
                accept="image/.jpg,.png,.jpeg,.pdf,.doc,.docx,.xls,.xlsx"
                multiple
                :disabled="disabled"
                @change="uploadFile"
            />
        </div>
    </div>
</template>
<script>
import functions from '@/helpers/functions'
export default {
    name: 'application-documents-uploader',
    props: {
        disabled: {
            type: Boolean
        },
        hasError: {
            type: Boolean
        },
        documents: {
            type: [Array, Object]
        }
    },
    mixins: [functions],
    data() {
        return {
            localFiles: this.documents ?? []
        }
    },
    computed: {
        classes() {
            return [
                'application-documents-uploader',
                { 'application-documents-uploader--error': this.hasError },
                { 'application-documents-uploader--disabled': this.disabled }
            ]
        },
        isUploaded() {
            return this.localFiles.length
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
            const files = this.$refs.input.files

            if (files.length) {
                let hasErrors = false
                const filesAsArray = []

                files.forEach(file => {
                    if (this.convertFileSize({ bytes: file.size, convertTo: 'MB' }) >= 20) {
                        window.notificationError(
                            'Вы пытаетесь загрузить файл превыщающий максимальный вес. Максимальный допустимый вес файла 20MB'
                        )
                        hasErrors = true
                        return
                    }

                    if (types.includes(file.type)) {
                        const localFile = {}

                        localFile.name = file.name
                        localFile.url = URL.createObjectURL(file)
                        localFile.file = file

                        this.localFiles.push(localFile)
                    } else {
                        window.notificationError(
                            'Вы пытаетесь загрузить файл неверного формата. Разрешенные форматы .pdf, .jpeg, .png, .doc, .docx, .xls, .xlsx'
                        )
                        hasErrors = true
                    }
                })

                this.localFiles.forEach(file => {
                    if (file.id) {
                        filesAsArray.push(file)
                    } else {
                        filesAsArray.push(file.file)
                    }
                })

                if (!hasErrors) {
                    this.$emit('uploaded', filesAsArray)
                    this.$refs.input.value = ''
                }
            }

            this.$refs.input.files = null
            this.$refs.input.value = ''
        },
        removeFile(index) {
            this.localFiles.splice(index, 1)

            const files = []
            this.localFiles.forEach(file => {
                if (file.id) {
                    files.push(file)
                } else {
                    files.push(file.file)
                }
            })

            this.$emit('remove', files)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-documents-uploader {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    margin-bottom: rem(40px);

    &--error &__icon {
        fill: $colorRed;
    }

    &--disabled &__upload {
        .application-documents-uploader__label,
        span {
            color: $colorGray;
        }

        button {
            border-color: $colorBdr;
            color: $colorGray;
            cursor: default;
        }
    }

    &__files {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        margin-bottom: rem(24px);
    }

    &__file {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        padding: rem(8px) rem(12px);
        border-radius: 6px;
        background: $colorTurquoise;
        margin-bottom: rem(12px);
        overflow: hidden;

        &:last-child {
            margin-bottom: 0;
        }

        span {
            width: 24px;
            height: 24px;
            margin-right: rem(24px);
            fill: #fff;
        }
    }

    &__link {
        flex: 1;
        width: 100%;
        overflow: hidden;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__remove {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-left: rem(12px);
        width: 24px;
        height: 24px;
        cursor: pointer;
        fill: #fff;
    }

    &__upload {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        position: relative;

        width: 100%;
        height: 278px;
        border: 1px dashed $colorBdr;
        border-radius: 8px;

        span {
            margin-bottom: rem(24px);

            font-family: Roboto;
            font-weight: 500;
            font-size: rem(14px);
            color: $colorTextLight;

            @include mq($until: tablet) {
                display: none;
            }
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;

            width: 100%;
            height: 100%;
            opacity: 0;
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;

            z-index: 3;

            width: 217px;
            border: 1px solid $colorTurquoise;
            padding: rem(15px) 0;
            background-color: transparent;
            outline: none;
            border-radius: 6px;

            font-family: Roboto;
            font-weight: 500;
            font-size: rem(14px);
            color: $colorTurquoise;
        }
    }

    &__label {
        margin-bottom: rem(16px);

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(24px);
        color: $colorTextLight;

        @include mq($until: tablet) {
            display: none;
        }
    }

    &__icon {
        width: 24px;
        height: 24px;
        margin-bottom: rem(26px);
        fill: $colorTurquoise;
    }

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
