<template>
    <div class="application__section">
        <application-title title="Дополнительные документы" subtitle margin="0 0 11px 0"></application-title>
        <application-documents-uploader
            :documents="application.documents.additional_documents"
            @uploaded="$emit('on-upload', $event)"
            @remove="$emit('on-upload', $event)"
            :disabled="disabled"
        ></application-documents-uploader>
        <div class="application__section-title">
            Дополнительная информация
        </div>
        <div class="application__textarea">
            <textarea
                placeholder="Введите текст"
                :value="application.description"
                @input="$emit('on-input', $event.target.value)"
                :disabled="disabled"
            ></textarea>
            <!-- <application-tooltip></application-tooltip> -->
        </div>
        <div class="divider divider--no-margin"></div>
    </div>
</template>
<script>
import ApplicationTitle from '../ApplicationTitle'
import ApplicationTooltip from '../ApplicationTooltip'
import ApplicationDocumentsUploader from '../details/ApplicationDocumentsUploader'
export default {
    name: 'application-purchase-block',
    components: {
        ApplicationDocumentsUploader,
        ApplicationTooltip,
        ApplicationTitle
    },
    props: {
        procedure: {
            type: Object,
            required: true
        },
        application: {
            type: Object,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss">
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application {
    &__textarea {
        position: relative;
        width: 100%;
        margin-bottom: rem(40px);

        textarea {
            width: 100%;
            height: 72px;
            margin-top: 4px;
            padding: rem(14px) rem(40px) rem(14px) rem(20px);
            border-color: $colorBdr;
            border-radius: 4px;
            resize: none;
        }

        .application-tooltip {
            position: absolute;
            top: 15px;
            right: 15px;
        }
    }
}
</style>
