<template>
    <div :class="classes">
        <div class="file-uploader__description" @click="selectFile">
            <div class="file-uploader__icon">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#upload"></use>
                </svg>
            </div>
            <div :class="['file-uploader__label', { 'file-uploader__label--uploaded': isUploaded }]">
                {{ label }}
            </div>
            <div class="file-uploader__info-icon">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#info"></use>
                </svg>
                <span>{{ tooltip }}</span>
            </div>
        </div>
        <div class="file-uploader__file-info">
            <div class="file-uploader__file">
                <a class="file-uploader__link" :href="localFile.url ? localFile.url : fileUrl" target="_blank">{{
                    localFile.name ? localFile.name : fileName
                }}</a>
                <div v-if="localFile.name" class="file-uploader__remove" @click="removeFile">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use>
                    </svg>
                </div>
            </div>
            <div
                v-if="showStatus && accepted !== null"
                :class="['file-uploader__status', { 'file-uploader__status--rejected': !accepted }]"
            >
                <svg v-if="accepted">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#ok"></use>
                </svg>
                <svg v-else>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use>
                </svg>
            </div>
        </div>
        <input style="display: none" type="file" ref="input" accept="image/.jpg,.png,.jpeg,.pdf" @change="uploadFile" />
    </div>
</template>
<script>
import functions from '../../../../helpers/functions'
export default {
    name: 'accreditation-details-file-uploader',
    props: {
        label: {
            type: String,
            required: true
        },
        tooltip: {
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
        accepted: {
            type: Boolean
        },
        showStatus: {
            type: Boolean
        },
        hasError: {
            type: Boolean
        }
    },
    mixins: [functions],
    data() {
        return {
            localFile: {
                name: '',
                url: '',
                file: null
            }
        }
    },
    computed: {
        classes() {
            return [
                'accreditation-details__file-uploader',
                'file-uploader',
                { 'file-uploader--error': this.hasError },
                { 'file-uploader--disabled': this.disabled }
            ]
        },
        isUploaded() {
            return this.localFile.name ? true : this.fileName ? true : false
        }
    },
    methods: {
        selectFile() {
            if (!this.disabled) {
                this.$refs.input.click()
            }
        },
        uploadFile() {
            const types = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
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
                        'Вы пытаетесь загрузить файл неверного формата. Разрешенные форматы .pdf, .jpeg, .png'
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
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.file-uploader {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    margin-bottom: rem(14px);

    &:last-child {
        margin-bottom: 0;
    }

    &--error &__icon {
        fill: $colorRed;
    }

    &--error &__label {
        color: $colorRed;
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
        align-items: flex-start;

        width: 100%;
        max-width: 295px;
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
        margin-right: rem(14px);
        width: 24px;
        height: 24px;
        fill: $colorTurquoise;
    }

    &__label {
        flex: 1;
        margin-right: 2px;

        font-family: Roboto;
        font-size: rem(14px);
        text-decoration-line: underline;
        color: $colorGray;

        &--uploaded {
            color: $lightcolorText;
            text-decoration: none;
        }
    }

    &__info-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;

        width: 20px;
        height: 20px;
        cursor: pointer;

        &:hover span {
            visibility: visible;
            opacity: 1;
        }

        span {
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: 0;
            left: 30px;
            z-index: 3;

            visibility: hidden;
            background-color: $lightcolorText;
            padding: rem(8px) rem(20px);
            border-radius: 4px;
            opacity: 0;
            transition: 0.2s;

            font-family: Roboto;
            font-size: 10px;
            color: #fff;
            white-space: nowrap;
        }
    }

    &__file-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;

        width: 100%;
        max-width: 295px;

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
        max-width: 150px;
        margin-right: rem(11px);
        overflow: hidden;

        font-family: Roboto;
        font-size: rem(14px);
        text-decoration-line: underline;
        color: $colorTurquoise;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__remove {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 15px;
        height: 15px;
        cursor: pointer;
        fill: $colorTurquoise;
    }

    &__status {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 24px;
        height: 24px;
        background-color: $colorTurquoise;
        border-radius: 2px;
        transition: 0.3s;

        svg {
            width: 24px;
            height: 24px;
            fill: #fff;
        }

        &--rejected {
            background-color: $colorCrimson;
        }
    }

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
