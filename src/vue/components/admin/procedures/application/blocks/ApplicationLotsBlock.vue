<template>
    <div class="application__section">
        <application-title
            v-if="isAuction"
            title="1 часть заявки"
            font-size="20px"
            margin="0 0 16px"
        ></application-title>
        <application-checkbox
            v-if="isAuction"
            style="margin-bottom: 24px;"
            :value="application.agreement"
            label='Согласие участника закупки на "поставку товара"'
            @click="$emit('on-check', $event)"
        ></application-checkbox>
        <application-title title="Сведения о лоте" subtitle></application-title>
        <div class="divider"></div>
        <div class="application-lots__text">Конкретные показатели товара:</div>
        <application-lots
            :lots="lots"
            :is-auction="isAuction"
            :can-replace="procedure.purchase_subject.products_analogues"
        ></application-lots>

        <div class="application__section-row">
            <div class="application__section-title">
                Дополнительная информация:
            </div>
            <application-file-uploader
                label="Прикрепить документ"
                :fileName="lotsFile.name"
                :fileUrl="lotsFile.url"
                @uploaded="$emit('on-upload', $event)"
                @remove="$emit('on-upload', {})"
            ></application-file-uploader>
        </div>
        <div class="divider"></div>
    </div>
</template>
<script>
import ApplicationTitle from '../ApplicationTitle.vue'
import ApplicationFileUploader from '../ApplicationFileUploader.vue'
import ApplicationCheckbox from '../ApplicationCheckbox.vue'
import ApplicationLots from '../ApplicationLots.vue'

export default {
    name: 'application-lots-block',
    components: {
        ApplicationCheckbox,
        ApplicationFileUploader,
        ApplicationTitle,
        ApplicationLots
    },
    props: {
        application: {
            type: Object,
            required: true
        },
        procedure: {
            type: Object,
            required: true
        },
        lots: {
            type: Array,
            required: true
        },
        isAuction: {
            type: Boolean
        }
    },
    computed: {
        lotsFile() {
            return this.application.documents.lots?.[0] ?? {}
        }
    }
}
</script>
<style lang="scss" scoped>
.application__section-row {
    margin-top: 32px;
}

.application-lots__text {
    margin-bottom: 20px;
    font-family: Roboto;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
}
</style>
