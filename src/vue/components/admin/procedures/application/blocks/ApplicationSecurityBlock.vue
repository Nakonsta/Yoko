<template>
    <div class="application__section">
        <application-title title="Сведения об обеспечении" subtitle></application-title>
        <div class="divider"></div>
        <a href="" class="application__sber">
            <img src="/content/sber.png" alt="" />
            <span>
                Подать онлайн заявку <br />
                на банковскую гарантию
            </span>
        </a>
        <div class="application__section-row">
            <div class="application__section-title">
                Обеспечение контракта:
            </div>
            <div class="application__section-text">
                {{ securityType(procedure.guarantee.contract_collateral.amount) }}
            </div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Обеспечение заявки:
            </div>
            <div class="application__section-text">
                {{ securityType(procedure.guarantee.application_collateral.amount) }}
            </div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Подтверждающий документ:
            </div>
            <application-file-uploader
                label="Прикрепить платежное поручение или банковскую гарантию"
                :fileName="securityFile.name"
                :fileUrl="securityFile.url"
                @uploaded="$emit('on-upload', $event)"
                @remove="$emit('on-upload', {})"
            ></application-file-uploader>
        </div>
        <div class="divider divider--no-margin"></div>
    </div>
</template>
<script>
import ApplicationTitle from '../ApplicationTitle'
import ApplicationFileUploader from '../ApplicationFileUploader'
export default {
    name: 'application-security-block',
    components: {
        ApplicationFileUploader,
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
        currencyType: {
            type: Object,
            required: true
        }
    },
    computed: {
        securityType() {
            return amount =>
                amount !== null && amount != 0
                    ? `${this.$parent.$options.filters.numberWithSpaces(amount)} ${this.currencyType.symbol}`
                    : 'Без обеспечения'
        },
        securityFile() {
            console.log(this.application.documents)
            return this.application.documents.security?.[0] ?? {}
        }
    }
}
</script>
<style lang="scss">
@import '../../../../../../assets/sass/variables/variables';
@import '../../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../../assets/sass/mixins/mq';

.application {
    &__sber {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 60px;
        right: 0;

        img {
            margin-right: 10px;
        }

        span {
            font-family: Helvetica Neue;
            font-size: rem(14px);
            color: $lightcolorText;
        }
    }
}
</style>
