<template>
    <div class="tender-item__protocols">
        <div class="tender-item__protocols-block">
            <div class="tender-item__protocols-rows">
                <div v-for="(group, index) in protocolGroups" :key="index" class="tender-item__protocol">
                    <div v-if="filterProtocols(tenderItemData.protocols, group.value).length" class="tender-item__protocol-title">
                        {{ group.name }}
                    </div>
                    <div v-if="filterProtocols(tenderItemData.protocols, group.value).length" class="tender-item__protocol-table">
                        <div class="tender-item__protocol-header-row">
                            <div class="tender-item__protocol-header tender-item__protocol-name">
                                Наименование
                            </div>
                            <!-- <div class="tender-item__protocol-header tender-item__protocol-edition">
                                Редакция
                            </div> -->
                            <div class="tender-item__protocol-header tender-item__protocol-created">
                                Создано
                            </div>
                        </div>
                        <div class="tender-item__protocol-block">
                            <div v-for="(protocol, key) in filterProtocols(tenderItemData.protocols, group.value)" :key="key" class="tender-item__protocol-item-row">
                                <div class="tender-item__protocol-item tender-item__protocol-name">
                                    <a :href="protocol.url" class="tender-item__protocol-link" download>{{ protocol.name }}</a>
                                </div>
                                <!-- <div class="tender-item__protocol-item tender-item__protocol-edition">
                                    {{ protocol.quantity }}
                                </div> -->
                                <div class="tender-item__protocol-item tender-item__protocol-created">
                                    {{ formatDate(protocol.created_at) }}
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
    name: 'TenderItemProtocolsTab',

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            protocolGroups: [
                {name: 'Протокол вскрытия заявок', value: 'opening'},
                {name: 'Протокол рассмотрения заявок', value: 'consideration'},
                {name: 'Протокол выбора победителя', value: 'choosing'},
                {name: 'Протокол отмены процедуры', value: 'canceling'},
            ]
        }
    },

    methods: {
        filterProtocols(protocols, protocolGroup) {
            let filteredProtocols = protocols.filter(protocol => protocol.properties.group == protocolGroup)
            return filteredProtocols
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