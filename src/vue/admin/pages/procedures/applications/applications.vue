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
            <application-search @on-search="onSearch"></application-search>
        </div>

        <applications-list v-if="!loading && applications.length > 0" :applications="applications"></applications-list>

        <div v-if="!loading && applications.length === 0" class="applications__empty">
            Заявления не найдены
        </div>

        <paginate
            v-if="totalPages"
            class="applications__pagination"
            :page-count="totalPages"
            :click-handler="changePage"
            prev-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            next-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            :value="currentPage"
        >
        </paginate>
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
            },
            totalPages: null,
            currentPage: 1,
            debounceTimer: null
        }
    },
    methods: {
        getApplications() {
            window.openLoader()
            this.loading = true
            this.fetchApplications(this.currentPage, this.filter, this.order)
                .then(({ data }) => {
                    this.applications = data.data.items
                    this.totalPages = Math.ceil(data.data.total / 20)
                })
                .finally(() => {
                    this.loading = false
                    window.closeLoader()
                })
        },
        changePage(page) {
            this.currentPage = page
            this.getAccreditations()
        },
        changeSortDate(value) {
            this.order.publication_date = value
            this.getApplications()
        },
        onSearch(value) {
            this.currentPage = 1
            if (value) {
                this.filter.ids = [value]
            } else {
                delete this.filter.ids
            }

            clearTimeout(this.debounceTimer)
            this.debounceTimer = setTimeout(() => this.getApplications(), 500)
        },
        changeSortStatus(value) {
            if (value === 'all') {
                delete this.filter.application_status
            } else {
                this.filter.application_status = [value]
            }
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

    @include mq($until: desktop) {
        padding: rem(80px) 0 rem(40px);
    }

    &__header {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
    }

    &__sorts {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;

        margin-right: rem(56px);
    }

    &__empty {
        width: 100%;
        padding: rem(40px) rem(20px);

        text-align: center;
        font-size: rem(16px);
        color: $colorGray;
    }

    &__pagination {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: rem(20px);

        ::v-deep li {
            width: 30px;
            height: 30px;
            margin: 0 rem(5px);
            outline: none;

            &.disabled {
                a {
                    cursor: default;

                    &:hover {
                        background-color: #fff;
                        color: currentColor;

                        svg path {
                            transition: 0.3s stroke;
                            stroke: $colorGray;
                        }
                    }
                }
            }

            &.active {
                a {
                    background-color: $colorTurquoise;
                    color: #fff;

                    &:hover {
                        background-color: $colorTurquoiseHover;
                    }
                }
            }

            &:first-child {
                margin-right: rem(15px);
            }

            &:last-child {
                margin-left: rem(15px);
                transform: rotate(-180deg);
            }

            a {
                display: flex;
                justify-content: center;
                align-items: center;

                width: 100%;
                height: 100%;
                background-color: #fff;
                transition: 0.3s;
                border-radius: 6px;

                &:hover {
                    background-color: $colorTurquoise;
                    color: #fff;

                    svg path {
                        transition: 0.3s stroke;
                        stroke: #fff;
                    }
                }
            }
        }
    }
}
</style>
