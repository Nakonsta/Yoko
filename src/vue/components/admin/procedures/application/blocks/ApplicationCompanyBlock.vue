<template>
    <div class="application__section">
        <application-title title="Сведения об участнике" subtitle></application-title>
        <div class="divider"></div>
        <div class="application__section-row">
            <div class="application__section-title">Название:</div>
            <application-company-select
                :defaultINN="application.inn"
                @on-select="$emit('on-company-select', $event)"
                :disabled="disabled"
                :has-error="errors"
            ></application-company-select>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Полное название:
            </div>
            <div class="application__section-text">{{ procedure.selectedCompany.name }}</div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">ИНН:</div>
            <div class="application__section-text">{{ procedure.selectedCompany.inn }}</div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Юридический адрес:
            </div>
            <div class="application__section-text">{{ procedure.selectedCompany.legalAddress }}</div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Фактический адрес:
            </div>
            <div class="application__section-text">{{ procedure.selectedCompany.address }}</div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Контактное лицо:
            </div>
            <div class="application__section-text">{{ procedure.selectedCompany.directorFio }}</div>
        </div>
        <div class="divider divider--no-margin"></div>
    </div>
</template>
<script>
import ApplicationCompanySelect from '../ApplicationCompanySelect'
import ApplicationTitle from '../ApplicationTitle'
export default {
    name: 'application-purchase-block',
    components: {
        ApplicationTitle,
        ApplicationCompanySelect
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
        },
        errors: {
            type: Boolean,
            default: false
        }
    }
}
</script>
