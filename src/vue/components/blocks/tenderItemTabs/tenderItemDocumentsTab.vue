<template>
    <div class="tender-item__files">
        <div class="tender-item__files-block">
            <div class="tender-item__file-rows">
                <div class="tender-item__file">
                    <div class="tender-item__file-table">
                        <div class="tender-item__file-header-row">
                            <div class="tender-item__file-header tender-item__file-name tender-item__file-document">
                                Наименование
                            </div>
                            <div class="tender-item__file-header tender-item__file-date">
                                Дата и время создания
                            </div>
                        </div>
                        <div class="tender-item__file-products">
                            <div v-for="(file, index) in tenderItemData.documents" :key="index" class="tender-item__file-item-row">
                                <div class="tender-item__file-item tender-item__file-name tender-item__file-document" :data-name="file.name ? 'Наименование' : ''">
                                    <a :href="file.url" class="tender-item__protocol-link" download>{{ file.name }}</a>
                                </div>
                                <div class="tender-item__file-item tender-item__file-date" :data-name="file.created_at ? 'Создан' : ''">
                                    {{ formatDate(file.created_at) }}
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TenderItemDocumentsTab',

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