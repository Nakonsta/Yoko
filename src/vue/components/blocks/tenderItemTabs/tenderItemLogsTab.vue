<template>
    <div v-if="tenderItemData.logs.length" class="tender-item__logs">
        <div class="tender-item__logs-block">
            <div class="tender-item__log-rows">
                <div class="tender-item__log">
                    <div class="tender-item__log-table">
                        <div class="tender-item__log-header-row">
                            <div class="tender-item__log-header tender-item__log-date">
                                Дата и время
                            </div>
                            <div class="tender-item__log-header tender-item__log-name">
                                Событие
                            </div>
                        </div>
                        <div class="tender-item__log-items">
                            <div v-for="(log, index) in tenderItemData.logs" :key="index" class="tender-item__log-item-row">
                                <div class="tender-item__log-item tender-item__log-date" :data-name="log.created_at ? 'Дата' : ''">
                                    {{ formatDate(log.created_at) }}
                                </div>
                                <div class="tender-item__log-item tender-item__log-name" :data-name="log.created_at ? 'Событие' : ''">
                                    {{ log.description }}
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
    <div v-else class="tender-item__empty">
        Журнал событий пуст
    </div>
</template>

<script>
export default {
    name: 'TenderItemLogsTab',

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        }
    },

    methods: {
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