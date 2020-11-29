<template>
    <div class="tender-item__info">
        <div class="tender-item__main">
            <div class="tender-item__left">
                <div class="tender-item__requsites">
                    <div class="tender-item__number">
                        № {{ tenderItemData.id }}
                    </div>
                    <div class="tender-item__type">
                       {{ TENDER_TRADING_FORMATS_AND_TYPES[tenderItemData.tender_trading_format] }} {{ TENDER_TRADING_FORMATS_AND_TYPES[tenderItemData.tender_trading_type] }}
                    </div>
                </div>
                <div class="tender-item__common">
                    <div v-if="tenderItemData.company_id" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Компания
                        </div>
                        <div class="tender-item__row-value">
                            {{ tenderItemData.company_id }}
                        </div>
                    </div>
                    <div v-if="tenderItemData.contact_id" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Контактное лицо
                        </div>
                        <div class="tender-item__row-value">
                            {{ tenderItemData.contact_id }}
                        </div>
                    </div>
                    <div v-if="tenderItemData.delivery_terms" class="tender-item__row">
                        <div class="tender-item__row-name">
                            Доставка
                        </div>
                        <div class="tender-item__row-value">
                            {{ tenderItemData.delivery_terms ? 'Требуется' : 'Не требуется' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tender-item__products">

        </div>
    </div>
</template>

<script>
export default {
    name: 'TenderItemCard',

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        }
    },
    
    data() {
        return {
            TENDER_TRADING_FORMATS_AND_TYPES: {
                trading_223: 'Торги по 223-ФЗ',
                commercial_trading: 'Коммерческие торги',
                contest: 'Конкурс',
                request_prices_or_offers: 'Запрос цен / запрос предложений',
                auction: 'Аукцион',
                request_prices: 'Запрос цен',
                purchase_from_supplier: 'Закупка у единственного поставщика',
            }
        }
    },

    created() {
    },

    methods: {
        
    }
}
</script>