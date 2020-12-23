<template>
    <div class="tender-item__tab-inner">
        <div class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Основная информация
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="tenderItemData.publication_date" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Дата публикации
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDateNoTime(tenderItemData.publication_date) }}
                    </div>
                </div>
                <div class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Доступность
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.tender_available ? 'Открытый конкурс' : 'Закрытый конкурс' }}
                    </div>
                </div>
                <div class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Альтернативные заявки
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.alternative_applications ? 'Возможны альтернативные заявки' : 'Невозможны альтернативные заявки' }}
                    </div>
                </div>
            </div>
        </div> 
        <div v-if="tenderItemData.purchase_subject"  class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Предмет закупки
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="tenderItemData.purchase_subject.description" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Описание предмета закупки
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.purchase_subject.description }}
                    </div>
                </div>
                <div v-if="tenderItemData.purchase_subject.start_price" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Начальная максимальная цена
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.purchase_subject.start_price }} &#8381;
                    </div>
                </div>
            </div>
        </div>
        <div class="tender-item__tab-block">
            <div v-if="tenderItemData.payment_and_delivery" class="tender-item__tab-title">
                Условия оплаты и поставки товара
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="tenderItemData.payment_and_delivery" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Предоплата
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.payment_and_delivery.prepayment ? 'Да' : 'Нет' }}
                    </div>
                </div>
                <div v-if="tenderItemData.payment_and_delivery && tenderItemData.payment_and_delivery.payment_info" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Информация об оплате
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.payment_and_delivery.payment_info }}
                    </div>
                </div>
                <div v-if="tenderItemData.payment_and_delivery && tenderItemData.payment_and_delivery.delivery_terms" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Условия поставки
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.payment_and_delivery.delivery_terms }}
                    </div>
                </div>
                <div v-if="tenderItemData.purchase_term" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Дата поставки
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDateNoTime(tenderItemData.purchase_term.delivery_to) }}
                    </div>
                </div>
                <div v-if="tenderItemData.payment_and_delivery && tenderItemData.payment_and_delivery.delivery_address" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Место поставки
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.payment_and_delivery.delivery_address }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tenderItemData.purchase_term" class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Сроки конкурса
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="tenderItemData.purchase_term.contract_conclusion_from || tenderItemData.purchase_term.contract_conclusion_to" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Сроки заключения договора
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDateNoTime(tenderItemData.purchase_term.contract_conclusion_from) }} - {{ formatDateNoTime(tenderItemData.purchase_term.contract_conclusion_to) }}
                    </div>
                </div>
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="tenderItemData.purchase_term.delivery_from || tenderItemData.purchase_term.delivery_to" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Сроки поставки товаров, услуг
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDateNoTime(tenderItemData.purchase_term.delivery_from) }} - {{ formatDateNoTime(tenderItemData.purchase_term.delivery_to) }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tenderItemData.purchase_term || tenderItemData.summarizing" class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Рассмотрения заявки и подведение итогов
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="tenderItemData.purchase_term.application_end_date" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Дата окончания подачи заявки на конкурс
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDateNoTime(tenderItemData.purchase_term.application_end_date) }}
                    </div>
                </div>
                <div v-if="tenderItemData.summarizing && tenderItemData.summarizing.competition_commission" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Конкурсная коммиссия
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.summarizing.competition_commission }}
                    </div>
                </div>
                <div v-if="tenderItemData.summarizing && tenderItemData.summarizing.documentation_receipt_date" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Дата и время получения конкурсной документации
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDate(tenderItemData.summarizing.documentation_receipt_date) }}
                    </div>
                </div>
                <div v-if="tenderItemData.summarizing && tenderItemData.summarizing.documentation_receipt_place" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Место получения конкурсной документации
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.summarizing.documentation_receipt_place }}
                    </div>
                </div>
                <div v-if="tenderItemData.summarizing && tenderItemData.summarizing.application_consideration_date" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Дата и время рассмотрения заявок
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDate(tenderItemData.summarizing.application_consideration_date) }}
                    </div>
                </div>
                <div v-if="tenderItemData.summarizing && tenderItemData.summarizing.application_consideration_place" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Место рассмотрения заявки
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.summarizing.application_consideration_place }}
                    </div>
                </div>
                <div v-if="tenderItemData.summarizing && tenderItemData.summarizing.summing_up_date" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Дата и время подтвердения итогов
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ formatDate(tenderItemData.summarizing.summing_up_date) }}
                    </div>
                </div>
                <div v-if="tenderItemData.summarizing && tenderItemData.summarizing.summing_up_place" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Место подведения итогов
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.summarizing.summing_up_place }}
                    </div>
                </div>
            </div>
        </div> 
        <div v-if="tenderItemData.purchase_term" class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Дополнительная информация о конкурсе
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="tenderItemData.addition_information" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Дополнительная информация
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ tenderItemData.addition_information }}
                    </div>
                </div>
            </div>
        </div>    
        <div v-if="tenderItemData.documents && tenderItemData.documents.length" class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Конкурсная документация
            </div>
            <div class="tender-item__tab-rows">
                <div class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Загруженные документы
                    </div>
                    <div class="tender-item__tab-row-value">
                        <div v-for="(item, key) in tenderItemData.documents" :key="key" class="tender-item__tab-row-file">
                            <a :href="item.url" class="tender-item__tab-row-link" download>
                                <svg class="tender-item__tab-row-svg" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0538 7.27998L6.93377 11.4066C6.39364 11.8867 5.69053 12.1422 4.96825 12.1209C4.24597 12.0996 3.5591 11.8032 3.04815 11.2923C2.5372 10.7813 2.24077 10.0944 2.21951 9.37216C2.19825 8.64988 2.45375 7.94677 2.93377 7.40664L8.2671 2.07331C8.58552 1.77084 9.00792 1.6022 9.4471 1.6022C9.88628 1.6022 10.3087 1.77084 10.6271 2.07331C10.9373 2.38771 11.1113 2.81162 11.1113 3.25331C11.1113 3.695 10.9373 4.11892 10.6271 4.43331L6.0271 9.02664C5.98157 9.07567 5.92684 9.11525 5.86602 9.14312C5.8052 9.171 5.73948 9.18662 5.67262 9.18909C5.60576 9.19157 5.53907 9.18085 5.47636 9.15756C5.41364 9.13426 5.35613 9.09884 5.3071 9.05331C5.25807 9.00779 5.21849 8.95305 5.19062 8.89223C5.16275 8.83141 5.14713 8.76569 5.14465 8.69883C5.14217 8.63198 5.15289 8.56528 5.17619 8.50257C5.19948 8.43985 5.23491 8.38234 5.28043 8.33331L8.70043 4.91998C8.82597 4.79444 8.89649 4.62418 8.89649 4.44665C8.89649 4.26911 8.82597 4.09885 8.70043 3.97331C8.5749 3.84778 8.40463 3.77725 8.2271 3.77725C8.04957 3.77725 7.8793 3.84778 7.75377 3.97331L4.33377 7.39998C4.16264 7.56978 4.02681 7.77178 3.93412 7.99433C3.84143 8.21687 3.79371 8.45557 3.79371 8.69664C3.79371 8.93772 3.84143 9.17642 3.93412 9.39896C4.02681 9.62151 4.16264 9.82351 4.33377 9.99331C4.68335 10.3263 5.14764 10.512 5.63043 10.512C6.11323 10.512 6.57752 10.3263 6.9271 9.99331L11.5204 5.39331C12.0504 4.82461 12.3388 4.07243 12.3251 3.29522C12.3114 2.51802 11.9966 1.77648 11.4469 1.22682C10.8973 0.677173 10.1557 0.362325 9.37852 0.348612C8.60132 0.334899 7.84913 0.623392 7.28043 1.15331L1.9471 6.48664C1.2279 7.2832 0.843784 8.32655 0.874788 9.39929C0.905791 10.472 1.34952 11.4915 2.11353 12.2452C2.87753 12.9988 3.90288 13.4287 4.97596 13.4451C6.04903 13.4615 7.08706 13.0633 7.87377 12.3333L12.0004 8.21331C12.0626 8.15115 12.1119 8.07736 12.1455 7.99614C12.1792 7.91493 12.1965 7.82788 12.1965 7.73998C12.1965 7.65207 12.1792 7.56503 12.1455 7.48381C12.1119 7.4026 12.0626 7.3288 12.0004 7.26664C11.9383 7.20449 11.8645 7.15518 11.7833 7.12154C11.7021 7.0879 11.615 7.07058 11.5271 7.07058C11.4392 7.07058 11.3521 7.0879 11.2709 7.12154C11.1897 7.15518 11.1159 7.20449 11.0538 7.26664V7.27998Z" fill="#31ACB8"/>
                                </svg>
                                {{ item.name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div v-if="tenderItemData.additional_fields && tenderItemData.additional_fields.length" class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Дополнительные поля
            </div>
            <div class="tender-item__tab-rows">
                <div v-for="(item, key) in tenderItemData.additional_fields" :key="key" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        {{ item.name }}
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ item.value }}
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'TenderItemMainTab',

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        },
        company: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {

        }
    },

    methods: {
        formatDateNoTime(string) {
            var d = new Date(string),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [day, month, year].join('.');
        },
        formatDate(string) {
            var d = new Date(string),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            minutes = '' + d.getMinutes();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            if (hour.length < 2) 
                hour = '0' + hour;
            if (minutes.length < 2) 
                minutes = '0' + minutes;

            var time = ' ' + hour + ':' + minutes;

            return [day, month, year].join('.') + time;
        },
    }
}
</script>