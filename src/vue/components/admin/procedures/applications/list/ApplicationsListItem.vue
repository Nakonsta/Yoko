<template>
    <div class="applications-list-item">
        <div class="applications-list-item__header">
            <router-link
                class="applications-list-item__title"
                :to="`/personal/procedures/${procedureId}/applications/${application.id}`"
                >Заявка №{{ application.id }}</router-link
            >
            <div
                :class="[
                    'applications-list-item__status',
                    `applications-list-item__status--${applicationStatus(application.status).type}`
                ]"
            >
                {{ applicationStatus(application.status).text }}
            </div>
        </div>
        <time class="applications-list-item__date">от {{ formatDate(application.created_at) }}</time>
        <router-link class="applications-list-item__company" to="#">{{ company.name }}</router-link>
    </div>
</template>
<script>
import api from '@/helpers/api'
import formatDate from '@/helpers/formatDate'

export default {
    name: 'applications-list-item',
    mixins: [api, formatDate],
    props: {
        application: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            company: {}
        }
    },
    computed: {
        procedureId() {
            return this.$route.params.id
        },
        applicationStatus() {
            return status => {
                const statuses = {
                    submitted: { text: 'Новая', type: 'new' },
                    winner_processing: { text: 'Определяется победитель', type: 'default' },
                    rejected: { text: 'Отклонена', type: 'rejected' },
                    winner_chosen: { text: 'Одобрена', type: 'default' },
                    canceled: { text: 'Отменена', type: 'rejected' },
                    draft: { text: 'Черновик', type: 'draft' }
                }

                return statuses[status] ?? { text: 'Нет данных', type: 'default' }
            }
        }
    },
    methods: {
        getCompanyByInn() {
            window.openLoader()
            this.fetchCompanyByInn(this.application.inn)
                .then(({ data }) => {
                    this.company = data.data
                })
                .finally(() => window.closeLoader())
        }
    },
    created() {
        this.getCompanyByInn()
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.applications-list-item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    padding: rem(16px) rem(24px);
    background-color: #fff;
    border-radius: 6px;
    margin-bottom: rem(24px);

    &:last-child {
        margin-bottom: 0;
    }

    &__header {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        margin-bottom: rem(8px);
    }

    &__title {
        transition: 0.3s;
        cursor: pointer;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(16px);
        color: $colorTextLight;

        &:hover {
            color: $colorTurquoise;
        }
    }

    &__status {
        font-family: Roboto;
        font-weight: 500;
        font-size: rem(16px);
        color: $colorTextLight;

        &--new {
            color: $colorTurquoise;
        }

        &--rejected {
            color: $colorCrimson;
        }

        &--draft {
            color: $colorGray;
        }
    }

    &__date {
        margin-bottom: rem(8px);

        font-family: Roboto;
        font-size: rem(14px);
        color: $colorGray;
    }

    &__company {
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: $colorTurquoise;

        &:hover {
            color: $colorTurquoiseHover;
        }
    }
}
</style>
