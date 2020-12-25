<template>
    <div class="accreditations">
        <router-link class="accreditations__create" to="accreditations/new">
            создать заявку
        </router-link>
        <accreditations-title title="Список заявок"></accreditations-title>

        <div class="accreditations__filters">
            <accreditations-sort @on-sort="onSort"></accreditations-sort>
            <accreditations-search @on-search="onSearch"></accreditations-search>
        </div>

        <div v-if="loading" class="accreditations__preloader">
            <div class="preloader">
                <div class="preloader__preloader">
                    <div class="preloader__loader"></div>
                </div>
            </div>
        </div>

        <accreditations-list v-else :items="accreditations"></accreditations-list>

        <div v-if="!loading && accreditations.length === 0" class="accreditations__empty-search">
            Заявления не найдены
        </div>

        <paginate
            v-if="totalPages"
            class="accreditations__pagination"
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
import api from '../../../helpers/api'

import AccreditationsTitle from '../../../components/admin/accreditations/AccreditationsTitle.vue'
import AccreditationsSearch from '../../../components/admin/accreditations/AccreditationsSearch.vue'
import AccreditationsSort from '../../../components/admin/accreditations/AccreditationsSort.vue'
import AccreditationsList from '../../../components/admin/accreditations/AccreditationsList.vue'

export default {
    name: 'accreditations',
    components: {
        AccreditationsTitle,
        AccreditationsSearch,
        AccreditationsSort,
        AccreditationsList
    },
    mixins: [api],
    data() {
        return {
            accreditations: [],
            loading: true,
            search: '',
            totalPages: null,
            currentPage: 1,
            orderDir: 'DESC',
            debounceTimer: null
        }
    },
    methods: {
        getAccreditations() {
            this.loading = true

            this.fetchAccreditationsList({
                page: this.currentPage,
                search: this.search,
                orderDir: this.orderDir
            })
                .then(data => {
                    this.accreditations = data?.data?.data?.items ?? []
                    this.totalPages = Math.ceil((data?.data?.data?.total ?? 0) / 20)
                })
                .finally(() => (this.loading = false))
        },
        changePage(page) {
            this.currentPage = page
            this.getAccreditations()
        },
        onSort(value) {
            this.orderDir = value
            this.currentPage = 1

            this.getAccreditations()
        },
        onSearch(value) {
            this.search = value

            clearTimeout(this.debounceTimer)
            this.debounceTimer = setTimeout(() => this.getAccreditations(), 500)
        }
    },
    created() {
        this.getAccreditations()
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.accreditations {
    width: 100%;
    background-color: #e9f7f8;
    padding: 0;

    @include mq($until: desktop) {
        padding-top: rem(87px);
    }

    &__create {
        display: flex;
        justify-content: center;
        align-items: center;

        max-width: 290px;
        padding: rem(13px) rem(33px);
        background-color: $colorTurquoise;
        border: none;
        outline: none;
        border-radius: 6px;
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #ffffff;
        text-transform: uppercase;

        &:active,
        &:hover {
            background-color: lighten($color: $colorTurquoise, $amount: 5%);
        }
    }

    &__preloader {
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;

        width: 100%;
        height: 100%;
        min-height: 400px;
    }

    &__filters {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        width: 100%;
        max-width: 375px;
        margin-left: auto;
    }

    &__empty-search {
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
