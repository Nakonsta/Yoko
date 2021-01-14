<template>
    <div class="application__section">
        <application-title title="Сведения о закупке" subtitle></application-title>
        <div class="divider"></div>
        <div class="application__section-row">
            <div class="application__section-title">Номер закупки:</div>
            <router-link class="application__section-link" :to="`/personal/procedures/${procedure.id}`">{{
                procedure.id
            }}</router-link>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">Номер в ЕИС:</div>
            <a class="application__section-link">46251781948 (данных пока нет на беке)</a>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Дата окончания подачи заявок:
            </div>
            <div class="application__section-text">
                {{ formatDate(procedure.purchase_term.application_end_date) }}
            </div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Объект закупки:
            </div>
            <div class="application__section-text">
                {{ procedure.purchase_subject.description }}
            </div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Способ закупки:
            </div>
            <div class="application__section-text">
                {{ tradingType }}
            </div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Компания - организатор:
            </div>
            <button class="application__section-link" @click="openCompanyModal">
                {{ procedure.company.name }}
            </button>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">
                Начальная цена с НДС:
            </div>
            <div class="application__section-text">
                {{ $parent.$options.filters.numberWithSpaces(procedure.purchase_subject.start_price) }}
                {{ currencyType.symbol }}
            </div>
        </div>
        <div class="application__section-row">
            <div class="application__section-title">Валюта:</div>
            <div class="application__section-text">
                {{ currencyType.text }}
            </div>
        </div>
        <div class="divider divider--no-margin"></div>
        <application-company-popup :company="procedure.company"></application-company-popup>
    </div>
</template>
<script>
import formatDate from '../../../../../helpers/formatDate'
import ApplicationCompanyPopup from '../ApplicationCompanyPopup'
import ApplicationTitle from '../ApplicationTitle'
export default {
    name: 'application-purchase-block',
    components: {
        ApplicationTitle,
        ApplicationCompanyPopup
    },
    mixins: [formatDate],
    props: {
        procedure: {
            type: Object,
            required: true
        },
        currencyType: {
            type: Object,
            required: true
        },
        tradingType: {
            type: String,
            required: true
        }
    },
    methods: {
        openCompanyModal() {
            window.openPopupById('#application-company-info')
        }
    }
}
</script>
