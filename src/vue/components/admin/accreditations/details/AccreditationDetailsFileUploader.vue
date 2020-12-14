<template>
    <div :class="classes">
        <div class="file-uploader__description" @click="selectFile">
            <div class="file-uploader__icon">
                <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.9567 11.29C12.8598 11.199 12.7454 11.1276 12.6203 11.08C12.3721 10.98 12.0938 10.98 11.8456 11.08C11.7205 11.1276 11.6062 11.199 11.5092 11.29L9.47051 13.29C9.27856 13.4783 9.17073 13.7337 9.17073 14C9.17073 14.2663 9.27856 14.5217 9.47051 14.71C9.66246 14.8983 9.9228 15.0041 10.1943 15.0041C10.4657 15.0041 10.726 14.8983 10.918 14.71L11.2136 14.41V17C11.2136 17.2652 11.321 17.5196 11.5122 17.7071C11.7033 17.8946 11.9626 18 12.233 18C12.5033 18 12.7626 17.8946 12.9538 17.7071C13.1449 17.5196 13.2523 17.2652 13.2523 17V14.41L13.5479 14.71C13.6427 14.8037 13.7554 14.8781 13.8797 14.9289C14.0039 14.9797 14.1371 15.0058 14.2717 15.0058C14.4062 15.0058 14.5395 14.9797 14.6637 14.9289C14.7879 14.8781 14.9007 14.8037 14.9954 14.71C15.091 14.617 15.1668 14.5064 15.2185 14.3846C15.2703 14.2627 15.2969 14.132 15.2969 14C15.2969 13.868 15.2703 13.7373 15.2185 13.6154C15.1668 13.4936 15.091 13.383 14.9954 13.29L12.9567 11.29ZM20.3878 8.94C20.3772 8.84813 20.3567 8.75763 20.3266 8.67V8.58C20.2776 8.47718 20.2123 8.38267 20.133 8.3L14.0168 2.3C13.9326 2.22222 13.8362 2.15808 13.7314 2.11H13.6295C13.5304 2.058 13.4238 2.02092 13.3135 2H7.13619C6.32514 2 5.54731 2.31607 4.97381 2.87868C4.40031 3.44129 4.07813 4.20435 4.07812 5V19C4.07812 19.7956 4.40031 20.5587 4.97381 21.1213C5.54731 21.6839 6.32514 22 7.13619 22H17.3297C18.1408 22 18.9186 21.6839 19.4921 21.1213C20.0656 20.5587 20.3878 19.7956 20.3878 19V9C20.3878 9 20.3878 9 20.3878 8.94ZM14.2717 5.41L16.9118 8H15.291C15.0207 8 14.7614 7.89464 14.5702 7.70711C14.3791 7.51957 14.2717 7.26522 14.2717 7V5.41ZM18.3491 19C18.3491 19.2652 18.2417 19.5196 18.0505 19.7071C17.8594 19.8946 17.6001 20 17.3297 20H7.13619C6.86584 20 6.60656 19.8946 6.4154 19.7071C6.22423 19.5196 6.11683 19.2652 6.11683 19V5C6.11683 4.73478 6.22423 4.48043 6.4154 4.29289C6.60656 4.10536 6.86584 4 7.13619 4H12.233V7C12.233 7.79565 12.5552 8.55871 13.1286 9.12132C13.7021 9.68393 14.48 10 15.291 10H18.3491V19Z"
                    />
                </svg>
            </div>
            <div :class="['file-uploader__label', { 'file-uploader__label--uploaded': isUploaded }]">
                {{ label }}
            </div>
            <div class="file-uploader__info-icon">
                <img src="/src/assets/img/svg-templates/info.svg" alt="" />
                <span>{{ tooltip }}</span>
            </div>
        </div>
        <div class="file-uploader__file-info">
            <div class="file-uploader__file">
                <a class="file-uploader__link" :href="localFile.url ? localFile.url : fileUrl" target="_blank">{{
                    localFile.name ? localFile.name : fileName
                }}</a>
                <div v-if="localFile.name" class="file-uploader__remove" @click="removeFile">
                    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.4142 11L17.7071 5.70712C18.0976 5.31659 18.0976 4.68343 17.7071 4.2929C17.3166 3.90238 16.6834 3.90238 16.2929 4.2929L11 9.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L9.5858 11L4.29289 16.2929C3.90237 16.6834 3.90237 17.3166 4.29289 17.7071C4.68342 18.0977 5.31658 18.0977 5.70711 17.7071L11 12.4142L16.2929 17.7071Z"
                        />
                    </svg>
                </div>
            </div>
            <div
                v-if="accepted !== null"
                :class="['file-uploader__status', { 'file-uploader__status--rejected': !accepted }]"
            >
                <img v-if="accepted" src="/src/assets/img/svg-templates/ok.svg" alt="accepted" />
                <svg v-else width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.4142 11L17.7071 5.70712C18.0976 5.31659 18.0976 4.68343 17.7071 4.2929C17.3166 3.90238 16.6834 3.90238 16.2929 4.2929L11 9.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L9.5858 11L4.29289 16.2929C3.90237 16.6834 3.90237 17.3166 4.29289 17.7071C4.68342 18.0977 5.31658 18.0977 5.70711 17.7071L11 12.4142L16.2929 17.7071Z"
                    />
                </svg>
            </div>
        </div>
        <input style="display: none" type="file" ref="input" accept="image/.jpg,.png,.jpeg,.pdf" @change="uploadFile" />
    </div>
</template>
<script>
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
        hasError: {
            type: Boolean
        }
    },
    data() {
        return {
            localFile: {
                name: '',
                url: ''
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
            const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/pdf']
            const file = this.$refs.input.files[0]

            if (types.includes(file.type)) {
                if (file) {
                    this.localFile.name = file.name
                    this.localFile.url = URL.createObjectURL(file)
                    this.$emit('uploaded', file)
                }
            } else {
                window.notificationError(
                    'Вы пытаетесь загрузить файлы неверного формата. Разрешенные форматы .pdf, .jpeg, .png'
                )
            }
        },
        removeFile() {
            this.$refs.input.files = null
            this.localFile = { name: '', url: '' }
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

    &--disabled {
        filter: grayscale(100%);
    }

    &--disabled &__description {
        cursor: default;

        &:hover {
            background-color: transparent;
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
        fill: $colorTurquoise;
        margin-right: rem(14px);
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

        width: 12px;
        height: 12px;
        cursor: pointer;

        svg {
            width: 12px;
            height: 12px;
            fill: $colorTurquoise;
        }
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

        &--rejected {
            background-color: $colorCrimson;
            fill: #fff;
        }
    }
}
</style>
