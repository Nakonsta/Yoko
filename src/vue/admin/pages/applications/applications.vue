<template>
  <div class="applications">
     <accreditations-title title="Заявки на участие в процедурах"></accreditations-title>
     <div class="tabs tabs--line" v-if="companies.length">
        <ul>
          <li v-for="company in companies" :key="company.id" :class="{active: company.inn === currentCompany.inn}"><a href="javascript:{}" @click="changeCompany($event, company)">{{ company.name }}</a></li>
        </ul>
    </div>
    <div class="applications__filters">
      <application-sort @on-sort="onSort"></application-sort>
      <application-filter @on-filter="onFilter"></application-filter>
    </div>
    <div v-if="loading" class="applications__preloader">
      <div class="preloader">
        <div class="preloader__preloader">
          <div class="preloader__loader"></div>
        </div>
      </div>
    </div>
    <div v-if="!loading && applications.length === 0" class="application__empty-search">
        Заявки не найдены
    </div>         
    <applicationBlock
        v-else
        v-for="(app, index) in applications" 
        :key="index"
        :app="app"/> 
     <paginate
      v-if="totalPages"
      class="products__pagination"
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
import AccreditationsTitle from '../../../components/admin/accreditations/AccreditationsTitle.vue'
import applicationBlock from '../../../components/admin/applications/applicationBlock.vue'
import applicationSort from '../../../components/admin/applications/applicationSort.vue'
import applicationFilter from '../../../components/admin/applications/applicationFilter.vue'

import api from '../../../helpers/api'
export default {
  name: 'applications',
  components: {
    AccreditationsTitle,
    applicationBlock,
    applicationFilter,
    applicationSort
  },
  mixins: [api],
  data () {
    return {
      loading: false,
      totalPages: null,
      currentPage: 1,
      productSort: 'desc',
      productFilter: 'all',
      currentCompany: null,
      currentFilter: {},
      applications:[
        {
          id: 1,
          number: '№ 310986367',         
          status: 'На рассмотрении',
          company: 'ПАО "Группа Компаний ПИК"',
          object: 'Кабельно-проводниковая продукция',
          type: 'Торги',
          trade: '04.11.2020, 10:30 МСК',
          end: '01.09.2020, 10:30 МСК',
          price: '10 000 000 ₽'
        },
        {
          id: 2,
          number: '№ 310986367',        
          status: 'Идет подача заявок',
          company: 'ПАО "Группа Компаний ПИК"',
          object: 'Кабельно-проводниковая продукция',
          type: 'Торги',
          trade: '04.11.2020, 10:30 МСК',
          end: '01.09.2020, 10:30 МСК',
          price: '10 000 000 ₽'
        },
        {
          id: 3,
          number: '№ 310986367',        
          status: 'Определение победителя',
          company: 'ПАО "Группа Компаний ПИК"',
          object: 'Кабельно-проводниковая продукция',
          type: 'Перетожка',
          trade: '04.11.2020, 10:30 МСК',
          end: '01.09.2020, 10:30 МСК',
          price: '22 000 000 ₽'
        },
        {
          id: 3,
          number: '№ 310986367',        
          status: 'Определение победителя',
          company: 'ПАО "Группа Компаний ПИК"',
          object: 'Кабельно-проводниковая продукция',
          type: '',
          trade: '',
          end: '01.09.2020, 10:30 МСК',
          price: '102 000 000 ₽'
        }
      ]
    }
  },
  computed: {
    companies() {
      // список компаний пользователя
      let companies = [];
      switch( this.$store.getters.userRole ) {
        case 'buyer':
          companies = this.$store.getters.companyBuyer;
          break;
        case 'contractor':
          if (this.type === 'applications') {
              companies = this.$store.getters.companyContractor;
          }
          break;
      }
      // обновляем фильтр - ставим нужную компанию
      if( companies.length ) {
        this.currentCompany = companies[0];
      }
      return companies;
    },
  },
  methods:{
    getApplications(){
      if( this.companies.length && this.currentCompany) {
        this.currentFilter.inn = [this.currentCompany.inn];
      }
      this.currentFilter.inn = [this.companies[0].inn];
      this.fetchApplicationsList()
    },
    onSort(){

    },
    onFilter(){

    },
    changeCompany(evt, company) {
      evt.preventDefault();
      this.page = 1;
      this.currentFilter = {};
      this.currentCompany = company;
      this.getApplications();
    },
  },
  created(){
    this.getApplications()
  }
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
@media(min-width: 774px){
  .tabs.tabs--line{
    display: inline-block;
    margin-bottom: -30px;
  }
}
</style>