<template>
    <div class="applications">
        <accreditations-title title="Заявки на участие в процедурах"></accreditations-title>
        <companiesTabs
                :companies="companies"
                :value="currentCompany"
                @change="changeCompany"
        />
        <div class="applications items">
            <div class="items__head">
                <div class="items__head-counter">
                    <template v-if="!loading">
                        Найдено&nbsp;<span>{{ totalItems }}</span>
                    </template>
                    <template v-else>
                        <span>Загрузка...</span>
                    </template>
                </div>
                <dropdownList
                        class="items__head-item"
                        label="Сортировать по:"
                        :options="sortList"
                        :current="sort"
                        @change="sortItems"
                />
                <dropdownList v-if="type !== 'drafts'"
                        class="items__head-item"
                        label="Показывать:"
                        :options="viewList"
                        :current="view"
                        @change="viewItems"
                />
            </div>
        </div>
        <div class="applications__items">
            <div class="applications__item applications__item--empty item item--empty" v-if="isFirstLoad && !items.length && !loading">
                Заявки не найдены
            </div>
            <div class="applications__item applications__item--loading item item--loading" v-if="!items.length && loading">
                <div class="preloader">
                    <div class="preloader__preloader">
                        <div class="preloader__loader"></div>
                    </div>
                </div>
            </div>
            <applicationBlock
                v-else
                v-for="(item, index) in items"
                :key="index"
                :item="item"/>
        </div>
        <paginate
                v-if="isFirstLoad && totalPages"
                :page-count="totalPages"
                :click-handler="changePagination"
                prev-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                next-text='<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5.5L5 10" stroke="#9B9B9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                :prev-class="'catalog-pagination__prev'"
                :next-class="'catalog-pagination__next'"
                :container-class="'catalog-pagination'"
                :page-class="'catalog-pagination__item'"
                :value="page"
        />
  </div>
</template>
<script>
import AccreditationsTitle from '../../../components/admin/accreditations/AccreditationsTitle.vue'
import applicationBlock from '../../../components/admin/applications/applicationBlock.vue'
import companiesTabs from "@/components/blocks/companiesTabs";
import dropdownList from "@/components/blocks/dropdownList";
import api from '../../../helpers/api'
import functions from "@/helpers/functions";

export default {
    name: 'applications',
    components: {
        AccreditationsTitle,
        companiesTabs,
        dropdownList,
        applicationBlock,
    },
    mixins: [api, functions],
    props: {
        type: {
            default: 'list',
            type: String,
        }
    },
    data () {
        return {
            isFirstLoad: false,
            loading: false,
            perPage: 20,
            totalItems: 0,
            page: 1,
            currentCompany: {},
            currentFilter: {},
            currentOrder: {
                'publication_date': 'desc',
            },
            sort: 'desc',
            sortList: [
                {
                    id: 'desc',
                    name: 'дате размещения (от новых к старым)',
                },
                {
                    id: 'asc',
                    name: 'дате размещения (от старых к новым)',
                },
            ],
            view: 'submitted',
            viewList: [
                {
                    id: 'all',
                    name: 'все',
                },
                {
                    id: 'submitted',
                    name: 'отправленные',
                },
                {
                    id: 'winner_processing',
                    name: 'определение победителя',
                },
                {
                    id: 'winner_chosen',
                    name: 'победитель определен',
                },
                {
                    id: 'canceled',
                    name: 'закрытые',
                },
            ],
            items:[],
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage)
        },
        companies() {
            // список компаний пользователя
            let companies = [];
            switch( this.$store.getters.userRole ) {
                case 'buyer':
                    companies = this.$store.getters.companyBuyer;
                    break;
                case 'contractor':
                    companies = this.$store.getters.companyContractor;
                    break;
            }
            // обновляем фильтр - ставим нужную компанию
            if( companies.length ) {
                this.currentCompany = companies[0];
            }
            return companies;
        },
    },
    watch: {
        $route(to, from) {
            this.init();
        }
    },
    created(){
        this.init();
    },
    methods:{
        init() {
            let companies = this.companies; // run companies computed
            this.getItems();
        },
        changeFilter() {
            this.page = 1;
            this.getItems();
        },
        getItems(){
            this.loading = true;
            this.items = [];
            if( this.companies.length && this.currentCompany) {
                this.currentFilter.inn = [this.currentCompany.inn];
            }
            this.currentFilter.application_status = this.currentFilter.application_status || ['submitted'];
            let filter = {
                draft: this.type === 'drafts',
                filter: this.parseFilter(this.currentFilter),
                order: this.currentOrder,
            };
            this.fetchApplicationsList(filter, this.page)
                .then((data) => {
                    this.isFirstLoad = true;
                    const items = data.data.data.items;
                    if (!items.length && this.page > 1) {
                        // если ничего не получили и у нас НЕ первая страница - грузим предыдущую
                        this.changePagination(this.page-1);
                        return;
                    }
                    const companiesINN = [];
                    /* TODO: переделать запрос детальной информации о компании через новый роут (Отправка массива id компаний)
                        Сделать чтобы названия компаний добавлялись реактивно к уже выведенному списку компаний
                     */
                    items.forEach((item, index) => {
                        items[index].procedure.company = null;
                        if (companiesINN.indexOf(items[index].procedure.inn) === -1) companiesINN.push(items[index].procedure.inn);
                    });
                    if (companiesINN.length) {
                        this.fetchCompaniesByINN(companiesINN)
                            .then((response) => {
                                const companies = response.data.data.elements;
                                companies.forEach((company) => {
                                    items.forEach((item) => {
                                        if (parseInt(company.inn) === parseInt(item.procedure.inn)) {
                                            item.procedure.company = company;
                                        }
                                    });
                                });
                            })
                            .catch((e) => {
                                console.log(e)
                            });
                    }
                    this.totalItems = data.data.data.total;
                    this.items = items;
                    this.loading = false;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        sortItems(sortBy){
            this.sort = sortBy;
            this.currentOrder['publication_date'] = sortBy;
            this.changeFilter();
        },
        viewItems(view){
            this.view = view;
            this.currentFilter.application_status = [view];
            this.changeFilter();
        },
        changeCompany(company) {
            this.page = 1;
            this.currentCompany = company;
            this.getItems();
        },
        changePagination(page) {
            this.page = page;
            this.getItems();
        },
    },
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.applications{
  padding-top: 4.21429rem;
  @include mq($from: 1024px){
    padding-top: 0;
  }
}
.container-personal {
  @include mq($from: 1000px){
    width: 65%;
  }    
}
.applications{
  &-flexlayout{
    @include mq($from: tablet){
      display: flex;
      justify-content: space-between;
      margin-top: 47px;
    }
    @include mq($from: 1000px){
      margin-top: 0;
    }
  }
  &__filters{
    @media(min-width: 1024px){
      display: flex;
      align-items: center;   
      margin-left: 20px;
      justify-content: flex-end;
    }
  }
  &-filter{
    margin-top: 12px;
    @include mq($from: tablet){
      margin-left: 36px;
    } 
  }     
  &-flexwrap{
    margin-top: 20px;
  }   
}
</style>