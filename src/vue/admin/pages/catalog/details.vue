<template>
  <div>
    <div v-if="loading" class="product__preloader">
      <div class="preloader">
        <div class="preloader__preloader">
          <div class="preloader__loader"></div>
        </div>
      </div>           
    </div>    
    <div v-if="!loading && product !== null" class="product">     
      <div class="product__info">
        <div class="product__row">         
          <div class="product__title">Заявка №{{ product.id }}</div>
          <div class="product__status" :class="'product__status--'+product.status.id">{{ product.status.value }}</div>
        </div>
        <div class="product__row">
          <div class="product__date">
            от
            <time>{{ formatDate(product.created_at) }}</time>
          </div>
        </div>
        <div class="product__row">
          <div class="product__company" v-if="!!company">{{ company }}</div>          
      </div>
      <div class="product__row" v-if="!!text_rejection">
          <div class="product__title">Причина отклонения: <span>{{ text_rejection }}</span></div>         
      </div>
      <div class="divider"></div>
      <div class="product__content">
        <div class="product__name">
          {{product.mark}}
        </div>
        <div class="product__block" v-if="!!product.description">
          <div class="product__title">
            Описание {{ productType }}:
          </div>
          <div class="product__text" 
            v-html="product.description">
          </div>
        </div>
        <div class="product__block" v-if="!!product.description_additional">
          <div class="product__title">
            Дополнительное описание
          </div>
          <div class="product__text" 
            v-html="product.description_additional">
          </div>
        </div>
        <template v-if="!!product.layers">
          <ul class="product__ul">            
              <li class="product__li"
              v-for="(layer, index) in product.layers"
              :key="index">
                {{ layer.layer }} &mdash;  {{ layer.description }}
              </li>
          </ul>
        </template>
      </div>
      <div class="product__block">
          <div class="product__title">
            Характеристики {{ productType }}:
          </div>
          <div class="product__properties">
            <template v-for="(property, index) in properties">
            <div class="product__col"
              v-if="!!property.property"
              :key="index"
            >
              <div class="dotted">
                <span class="name">{{ property.name }}</span>
                <span class="value">{{ property.property.join(', ') }}</span>
              </div>
            </div>
          </template>          
          </div>
      </div>
      <div class="divider"></div>
      <div class="product__documents" v-if="!!documents">
            <template v-if="!!documents.technical_conditions">
              <catalog-file
              v-for="(file, index) in documents.technical_conditions"
              :key="index"
              :file="file"/>
            </template>
            <template v-if="!!documents.certificates">
              <catalog-file
              v-for="(file, index) in documents.certificates"
              :key="index"
              :file="file"/>
            </template>
            <template v-if="!!documents.guarantee_letters">
              <catalog-file
              v-for="(file, index) in documents.guarantee_letters"
              :key="index"
              :file="file"/>
            </template>
          </div>  
          <div class="product__documents" v-if="!!images">
            <catalog-file
              v-for="(file, index) in images"
              :key="index"
              :file="file"/>
          </div>    
        </div>
<!--      <template v-if="product.status.id === 'new'">-->
<!--        <div class="product__actions">-->
<!--              <button-->
<!--                class="product__approve"                -->
<!--                @click="setApprove"-->
<!--              >-->
<!--                Согласовать-->
<!--              </button>              -->
<!--              <form ref="form">-->
<!--                <button-->
<!--                  class="product__reject"-->
<!--                 @click="setError">-->
<!--                  Отклонить-->
<!--                </button>-->
<!--                <textarea-->
<!--                  v-model="textRejection"-->
<!--                  class="product__textarea"-->
<!--                  outlined-->
<!--                  placeholder="Причина отклонения"-->
<!--                  required                 -->
<!--                ></textarea>-->
<!--              </form>              -->
<!--            </div>-->
<!--      </template>-->
    </div>    
    <div v-else class="products__empty-search">
      Заявка не найдена
    </div>
  </div>
</template>
<script>
import api from '../../../helpers/api'
import functions from '../../../helpers/functions'
import formatDate from '../../../helpers/formatDate.js'
import CatalogFile from '../../../components/admin/catalog/CatalogFile.vue'

export default {
  name: 'catalog-details',
  mixins: [api, functions, formatDate],
  components:{
    CatalogFile
  },
  data() {
    return {
      loading: false,
      product: null,
      documents: null,
      images: null,
      company: '',
      textRejection: '',
      text_rejection: '',
      status: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    productType() {
      return this.product.type === 'mark' ? 'Марки' : 'Маркоразмера'
    },
    properties() {
    if (this.product.type) {
      return [
        {
          property: this.product.property_screen_view,
          name: 'Вид экрана',
        },
        {
          property: this.product.property_gost,
          name: 'Гост',
        },
        {
          property: this.product.property_voltage_allowable,
          name: 'Допустимое напряжение',
        },
        {
          property: this.product.property_filling,
          name: 'Заполнение',
        },
        {
          property: this.product.property_protective_cover,
          name: 'Защитный покров',
        },
        {
          property: this.product.property_isolation,
          name: 'Изоляция',
        },
        {
          property: this.product.property_execution,
          name: 'Исполнение',
        },
        {
          property: this.product.property_caliber,
          name: 'Калибр',
        },
        {
          property: this.product.property_material,
          name: 'Материал',
        },
        {
          property: this.product.property_material_fibers,
          name: 'Материал волокон',
        },
        {
          property: this.product.property_material_shell,
          name: 'Материал оболочки',
        },
        {
          property: this.product.property_armor_availability,
          name: 'Наличие брони',
        },
        {
          property: this.product.property_rated_operating_voltage,
          name: 'Номинальное рабочее напряжение',
        },
        {
          property: this.product.property_normative_document,
          name: 'Нормативный документ',
        },
        {
          property: this.product.property_use,
          name: 'Применение',
        },
        {
          property: this.product.property_insulation_resistance,
          name: 'Сопротивление изоляции',
        },
        {
          property: this.product.property_fiber_type,
          name: 'Тип волокна',
        },
        {
          property: this.product.property_veins_type,
          name: 'Тип жил',
        },
        {
          property: this.product.property_cable_type,
          name: 'Тип кабеля',
        },
        {
          property: this.product.property_laying_conditions,
          name: 'Условия прокладки',
        },
        {
          property: this.product.property_color_protective_hose_outer_sheath,
          name: 'Цвет защитного шланга/наружной оболочки',
        },
        {
          property: this.product.property_central_element,
          name: 'Центральный элемент',
        },
      ]
    } else {
      return [
        {
          property: this.product.size,
          name: 'Наименование маркоразмера',
        },
        {
          property: this.product.property_active_resistance_zero,
          name: 'Активное сопротивление жил (нулевой)',
        },
        {
          property: this.product.property_active_resistance_main,
          name: 'Активное сопротивление жил (основных)',
        },
        {
          property: this.product.property_active_resistance,
          name: 'Активное сопротивление',
        },
        {
          property: this.product.property_active_resistance_plane,
          name: 'Активное сопротивление при прокладке в плоскости',
        },
        {
          property: this.product.property_active_resistance_triangle,
          name: 'Активное сопротивление при прокладке треугольником',
        },
        {
          property: this.product.property_voltage_versions,
          name: 'Варианты исполнения вольтажа',
        },
        {
          property: this.product.property_outer_diameter,
          name: 'Внешний диаметр',
        },
        {
          property: this.product.property_resistance_wave,
          name: 'Волновое сопротивление',
        },
        {
          property: this.product.property_diameter_cabel,
          name: 'Диаметр кабеля',
        },
        {
          property: this.product.property_diameter,
          name: 'Диаметр',
        },
        {
          property: this.product.property_voltage_allowable,
          name: 'Допустимое напряжение',
        },
        {
          property: this.product.property_capacitive_conductivity,
          name: 'Емкостная проводимость',
        },
        {
          property: this.product.property_capacity,
          name: 'Емкость',
        },
        {
          property: this.product.property_inductive_resistance_cores_zero,
          name: 'Индуктивное сопротивление жил (нулевой)',
        },
        {
          property: this.product.property_inductive_resistance_cores_main,
          name: 'Индуктивное сопротивление жил (основных)',
        },
        {
          property: this.product.property_inductive_resistance_zero_sequence,
          name: 'Индуктивное сопротивление нулевой последовательности',
        },
        {
          property: this.product.property_inductive_resistance,
          name: 'Индуктивное сопротивление',
        },
        {
          property: this.product.property_inductive_resistance_plane,
          name: 'Индуктивное сопротивление при прокладке в плоскости',
        },
        {
          property: this.product.property_inductive_resistance_triangle,
          name: 'Индуктивное сопротивление при прокладке треугольником',
        },
        {
          property: this.product.property_inductive_resistance_direct_sequence,
          name: 'Индуктивное сопротивление прямой последовательности',
        },
        {
          property: this.product.property_class_flexibility_vein,
          name: 'Класс гибкости жилы',
        },
        {
          property: this.product.property_fiber_count,
          name: 'Количеств волокон',
        },
        {
          property: this.product.property_veins_count,
          name: 'Количество жил',
        },
        {
          property: this.product.property_number_pairs,
          name: 'Количество пар',
        },
        {
          property: this.product.property_number_triples,
          name: 'Количество троек',
        },
        {
          property: this.product.property_number_fours,
          name: 'Количество четверок',
        },
        {
          property: this.product.property_number_elements,
          name: 'Количество элементов',
        },
        {
          property: this.product.property_material_vein,
          name: 'Материал жилы',
        },
        {
          property: this.product.property_minimum_bending_radius,
          name: 'Минимальный радиус изгиба',
        },
        {
          property: this.product.property_voltage,
          name: 'Напряжение',
        },
        {
          property: this.product.property_optical_module,
          name: 'Оптические модули',
        },
        {
          property: this.product.property_crushing_force,
          name: 'Раздавливающее усилие',
        },
        {
          property: this.product.property_fiber_size,
          name: 'Размер волокна',
        },
        {
          property: this.product.property_fibers_size,
          name: 'Размер волокон',
        },
        {
          property: this.product.property_tensile_force,
          name: 'Растягивающее усилие',
        },
        {
          property: this.product.property_section,
          name: 'Сечение',
        },
        {
          property: this.product.property_cable_cross_section,
          name: 'Сечение кабеля',
        },
        {
          property: this.product.property_lifetime,
          name: 'Срок службы',
        },
        {
          property: this.product.property_construction_length,
          name: 'Строительная длина',
        },
        {
          property: this.product.property_application_type,
          name: 'Тип применения',
        },
        {
          property: this.product.property_electrical_resistance,
          name: 'Электрическое сопротивление',
        },
      ]
    }
  },
  },
  methods: {
    getProductDetails() {
      this.loading = true
      this.fetchProductDetails(this.id)
          .then(response => {
            this.product = response.data.data
            this.status = response.data.status
            this.text_rejection = response.data.text_rejection
            this.documents = response.data.data.documents
            this.images = response.data.data.images
            this.fetchRegisteredCompany(response.data.data.company_id)
              .then(response => {
                this.company = response.data.data.name
              })
              .catch((e) => {
                console.log(e)
              })
          })
          .catch((e) => {
            console.log(e)
          })
          .finally(() => (this.loading = false))
      },
    setApprove(){
      this.setCatalogPositionStatus(this.$route.params.id, 'approved')
      .then((response) => {
        if (response.success === true) {
          this.status = response.data.status   
          console.log(response.data.status)           
        } 
      })
      .catch((error) => {          
        console.log(error.response.status)
      })
    },
    setError(){
      this.setCatalogPositionStatus(
          this.$route.params.id,
          'rejected',
          this.textRejection,
        )
          .then((response) => {
            if (response.success === true) {
              this.status = response.data.status
              this.text_rejection = response.data.text_rejection
            }
          })
          .catch((error) => {
            console.log(error.response.status)
          })
      },
  },
  created(){
    this.getProductDetails()
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.product {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  padding: rem(20px) rem(16px);
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: rem(12px);
  @include mq($until: desktop) {
    margin-top: rem(87px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__info {
    width: 100%;
  }

  &__title {
    font-family: Roboto;
    font-weight: 500;
    font-size: rem(16px);
    color: $colorTextLight;
    margin-right: rem(30px);
    &:hover {
      color: $colorTurquoise;
    }
  }

  &__date {
    font-family: Roboto;
    font-weight: 400;
    margin-right: rem(30px);
    font-size: rem(14px);
    color: $colorGray;
  }
  &__status{
    font-weight: 500;
    font-size: rem(16px);
    &--new{
      color: $colorTurquoise;      
    }
    &--approved{
      color: $colorTextLight;
    }
    &--rejected{
      color: $colorCrimson;
    }
  }
  &__document {
    color: $colorTurquoise;
    font-weight: 400;
    font-size: rem(14px);
  }
  
  &__company {
    color: $colorTurquoise;
    font-weight: 500;
    font-size: rem(14px);
    margin-right: rem(30px);
  }

  &__row{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    margin: rem(8px) 0;
  }
  &__block{
    margin: 20px 0;
  }
  &__name{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: rem(18px);
    margin: rem(24px) 0;
 }
 &__preloader{
    margin-top: rem(87px);
 }
 &__actions{
    width: 100%;
 }
 &__ul{
    margin: 20px 0;
    padding: 0;
  }
 &__li{
   list-style: none;
   padding-left: 5px;
   position: relative;
   &:before{
     content: '';
     display: inline-block;
     vertical-align: middle;
     width: 3px;
     height: 3px;
     background: #31ACB8;
     border-radius: 100px;
   }
 }
  &__approve{
    border: none;
    outline: none;
    display: block;
    height: 48px;
    width: 100%;
    max-width: 304px;
    color: #FFF;
    background: #31ACB8;
    border-radius: 6px;
    margin: rem(20px) auto;
    position: relative;
    @media(min-width: 1024px){
      float: left;
      width: 218px;      
      margin-right: 15px;
    }
  }
  &__reject{
    border: 1px solid #31ACB8;
    outline: none;
    display: block;
    height: 48px;
    width: 100%;
    max-width: 304px;
    color: #31ACB8;
    background: #FFF;
    border-radius: 6px;
    margin: rem(20px) auto;
    position: relative;
    @media(min-width: 1024px){
      width: 218px;    
      float: left;      
      &:after{
        content: '';
        display: block;
        clear: both;
      }  
    }
  }
  &__textarea{
    width: 100%;   
    height: 104px;
    color:#D3D3D3;
    border: 1px solid #D3D3D3;
    border-radius: 6px;
    margin: rem(20px) auto;
    position: relative;
    @media(min-width: 1024px){
      width: 100%;      
      height: 48px;
    }
  }
  &__properties{
    @media(min-width: 1024px){
      display: flex;
      margin: 0 -20px;
      flex-wrap: wrap;
    }
  }
  &__col{
    @media(min-width: 1024px){
      width: calc(50% - 40px);
      margin: 0 20px;
    }
  }
}
 
.divider {
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
  margin: 20px 0 32px 0;
}

  .dotted {
    border-bottom: 1px dotted;
    position: relative;
    padding: 0;
    margin-bottom: 30px;
    width: 100%;
  }
  .name {
    background-color: #fff;
    margin: 0;
    bottom: -5px;
    position: relative;
    margin-right: 7em;
    padding-right: 2px;
    max-width: 250px;
    display: inline-block;
    color: rgba(0, 0, 0, 0.6);      
  }
  .value {
    background-color: #fff;
    margin: 0;
    bottom: -5px;
    position: absolute;
    right: 0;
    padding-left: 2px;
    max-width: 300px;
    text-align: right;
  }
</style>