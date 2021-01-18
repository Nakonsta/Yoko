<template>
    <div class="applications">
        <accreditations-title title="Заявки на модерацию" margin="0 0 23px"></accreditations-title>
        <div class="applications__header">
            <div class="applications__sorts">
                <application-sort
                    label="Сортировать по:"
                    :sort-list="orderSort"
                    default-value="desc"
                    @on-sort="changeSortDate"
                ></application-sort>
                <application-sort
                    label="Показывать:"
                    :sort-list="statusesSort"
                    default-value="all"
                    @on-sort="changeSortStatus"
                ></application-sort>
            </div>
            <application-search></application-search>
        </div>
        <applications-list v-if="!loading && applications.length > 0" :applications="applications"></applications-list>
        <div v-if="!loading && applications.length === 0" class="applications__empty">
            Заявления не найдены
        </div>
    </div>
</template>
<script>
import api from '@/helpers/api'

import AccreditationsTitle from '../../../../components/admin/accreditations/AccreditationsTitle.vue'
import ApplicationSort from '../../../../components/admin/procedures/applications/ApplicationSort.vue'
import ApplicationsList from '../../../../components/admin/procedures/applications/list/ApplicationsList'
import ApplicationSearch from '../../../../components/admin/procedures/applications/ApplicationSearch'
export default {
    name: 'applications',
    mixins: [api],
    components: {
        ApplicationSort,
        AccreditationsTitle,
        ApplicationsList,
        ApplicationSearch
    },
    data() {
        return {
            loading: true,
            applications: [],
            loadig: true,
            filter: {
                procedure_ids: [this.$route.params.id]
            },
            order: {
                publication_date: 'desc'
            },
            orderSort: {
                desc: 'дате размещения (от новых к старым)',
                asc: 'дате размещения (от старых к новым)'
            },
            statusesSort: {
                all: 'Все',
                submitted: 'Новые',
                winner_processing: 'Определяется победитель',
                rejected: 'Отклоненные',
                winner_chosen: 'Одобренные',
                canceled: 'Отмененные',
                draft: 'Черновики'
            }
        }
    },
    methods: {
        getApplications() {
            window.openLoader()
            this.loading = true
            this.fetchApplications(this.filter, this.order)
                .then(({ data }) => {
                    this.applications = data.data.items
                })
                .finally(() => {
                    this.loading = false
                    window.closeLoader()
                })
        },
        changeSortDate(value) {
            this.order.publication_date = value
            this.getApplications()
        },
        changeSortStatus(value) {
            if (value === 'all') {
                delete this.filter.application_status
            } else {
                this.filter.application_status = [value]
            }
            this.getApplications()
        }
    },
    created() {
        this.getApplications()
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.applications {
    width: 100%;
    padding: rem(80px) 0 rem(40px);

    &__header {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
    }

    &__sorts {
        flex: 1;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
    }

    &__empty {
        width: 100%;
        padding: rem(40px) rem(20px);

        text-align: center;
        font-size: rem(16px);
        color: $colorGray;
    }
}
</style>
