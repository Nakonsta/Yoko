<template>
  <div>
    <breadCrumbs />
    <pageTitle
      :title="title"
    />
    <div class="section section--green section--mark">
      <div class="container catalog-mark">
        <div>
          <mark-info :root="rootData" />
          <div
            v-if="tabs"
            ref="tabs"
            class="tabs tabs--line js-tabs js-more"
          >
            <ul class="js-more__items">
              <li
                v-for="item in tabs"
                :key="item.url"
                class="js-more__item"
              >
                <a :href="item.url">{{ item.name }}</a>
              </li>
              <li class="js-more__btn hidden">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg class="sprite-dropdown">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="\./img/sprite.svg#dropdown"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
          <div
            v-if="rootData.description.length"
            id="description"
            class="tabs__content"
          >
            <mark-description :root="rootData" />
          </div>
          <div
            v-if="marksizeId && rootData.companies.length"
            id="availability"
            class="tabs__content"
          >
            <mark-marksize-list
              :marksize-id="marksizeId"
              :companies="rootData.companies"
            />
          </div>
          <div
            v-if="rootData.containers.length"
            id="containers"
            class="tabs__content"
          >
            Тара
          </div>
          <div
            v-if="rootData.characters.length"
            id="characters"
            class="tabs__content"
          >
            <mark-characters :root="rootData.characters" />
          </div>
          <div
            v-if="rootData.boxing.length"
            id="boxing"
            class="tabs__content"
          >
            Упаковка
          </div>
          <div
            v-if="rootData.appointment.length"
            id="appointment"
            class="tabs__content"
          >
            <mark-appointment :root="rootData" />
          </div>
          <div
            v-if="rootData.documents.length"
            id="documents"
            class="tabs__content"
          >
            <mark-documents :root="rootData.documents" />
          </div>
          <div
            v-if="rootData.manufacturers.length"
            id="manufacturers"
            class="tabs__content"
          >
            <mark-manufacturer :root="rootData.manufacturers" />
          </div>
          <!--    <div class="tabs__content" id="additional" v-if="rootData.companies.length">-->
          <!--      <mark-additional :root="rootData.companies"></mark-additional>-->
          <!--    </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadCrumbs from '@/components/blocks/breadCrumbs';
import pageTitle from '@/components/blocks/pageTitle';
import api from './helpers/api';
import MarkInfo from './components/blocks/catalog-details/mark-info.vue';
import MarkDescription from './components/blocks/catalog-details/mark-description.vue';
import MarkCharacters from './components/blocks/catalog-details/mark-characters.vue';
import MarkAppointment from './components/blocks/catalog-details/mark-appointment.vue';
import MarkDocuments from './components/blocks/catalog-details/mark-documents.vue';
import MarkManufacturer from './components/blocks/catalog-details/mark-manufacturer.vue';
// import MarkAdditional from './components/blocks/catalog-details/mark-additional.vue';
import MarkMarksizeList from './components/blocks/catalog-details/mark-marksize-list';
import { initMore } from '../assets/js/main/modules/more.js';
import metaDataPage from "@/helpers/metaDataPage";

export default {
  name: 'MarkSizeDetails',
  components: {
    MarkInfo,
    MarkDocuments,
    MarkCharacters,
    MarkDescription,
    MarkAppointment,
    MarkManufacturer,
    // MarkAdditional,
    MarkMarksizeList,
    breadCrumbs,
    pageTitle,
  },
  mixins: [api, metaDataPage],
  data() {
    return {
      marksizeId: null,
      title: '',
      rootData: {
        description: '',
        appointment: '',
        price: 0,
        images: [],
        items: [],
        containers: [],
        marksizes: [],
        characters: [],
        boxing: [],
        documents: [],
        manufacturers: [],
        companies: [],
      },
      characterTitles: {
        property_active_resistance_zero: 'Активное сопротивление жил (нулевой)',
        property_active_resistance_main: 'Активное сопротивление жил (основных)',
        property_active_resistance_plane: 'Активное сопротивление при прокладке в плоскости',
        property_active_resistance_triangle: 'Активное сопротивление при прокладке треугольником',
        property_active_resistance: 'Активное сопротивление',
        property_voltage_versions: 'Варианты исполнения вольтажа',
        property_outer_diameter: 'Внешний диаметр',
        property_resistance_wave: 'Волновое сопротивление',
        property_diameter_cabel: 'Диаметр кабеля',
        property_diameter: 'Диаметр',
        property_voltage_allowable: 'Допустимое напряжение',
        property_capacitive_conductivity: 'Емкостная проводимость',
        property_capacity: 'Емкость',
        property_inductive_resistance_cores_zero: 'Индуктивное сопротивление жил (нулевой)',
        property_inductive_resistance_cores_main: 'Индуктивное сопротивление жил (основных)',
        property_inductive_resistance_zero_sequence: 'Индуктивное сопротивление нулевой последовательности',
        property_inductive_resistance: 'Индуктивное сопротивление',
        property_inductive_resistance_plane: 'Индуктивное сопротивление при прокладке в плоскости',
        property_inductive_resistance_triangle: 'Индуктивное сопротивление при прокладке треугольником',
        property_inductive_resistance_direct_sequence: 'Индуктивное сопротивление прямой последовательности',
        property_class_flexibility_vein: 'Класс гибкости жилы',
        property_fiber_count: 'Количеств волокон',
        property_veins_count: 'Количество жил',
        property_number_pairs: 'Количество пар',
        property_number_triples: 'Количество троек',
        property_number_fours: 'Количество четверок',
        property_number_elements: 'Количество элементов',
        property_material_vein: 'Материал жилы',
        property_minimum_bending_radius: 'Минимальный радиус изгиба',
        property_voltage: 'Напряжение',
        property_optical_module: 'Оптические модули',
        property_crushing_force: 'Раздавливающее усилие',
        property_fiber_size: 'Размер волокНА',
        property_fibers_size: 'Размер волокОН',
        property_tensile_force: 'Растягивающее усилие',
        property_section: 'Сечение',
        property_cable_cross_section: 'Сечение кабеля',
        property_lifetime: 'Срок службы',
        property_construction_length: 'Строительная длина',
        property_application_type: 'Тип применения',
        property_electrical_resistance: 'Электрическое сопротивление',
      },
      descriptionCharacters: {
        property_voltage: 'Напряжение, кВ',
        property_veins_count: 'Количество жил',
        property_section: 'Сечение, мм²',
      },
    };
  },
  computed: {
    tabs() {
      const result = [];
      if (this.rootData.description.length) {
        result.push({
          name: 'Описание',
          url: '#description',
        });
      }
      if (this.marksizeId && this.rootData.companies.length) {
        result.push({
          name: 'Наличие',
          url: '#availability',
        });
      }
      if (this.rootData.containers.length) {
        result.push({
          name: 'Тара',
          url: '#containers',
        });
      }
      if (this.rootData.appointment.length) {
        result.push({
          name: 'Назначение',
          url: '#appointment',
        });
      }
      if (this.rootData.characters.length) {
        result.push({
          name: 'Характеристики',
          url: '#characters',
        });
      }
      if (this.rootData.boxing.length) {
        result.push({
          name: 'Упаковка',
          url: '#boxing',
        });
      }
      if (this.rootData.documents.length) {
        result.push({
          name: 'Документация',
          url: '#documents',
        });
      }
      if (this.rootData.manufacturers.length) {
        result.push({
          name: 'Производители',
          url: '#manufacturers',
        });
      }
      // if (this.rootData.companies.length) {
      //   result.push({
      //     name: "Дополнительная информация",
      //     url: "#additional"
      //   });
      // }
      return result;
    },
  },
  watch: {
    tabs() {
      this.$nextTick(() => {
        initMore();
        const tabs = this.$refs.tabs;
        const hash = window.location.hash.substr(1);
        const link = tabs.querySelector(`li a[href="#${hash}"]`) || tabs.querySelector('li.active a') || tabs.querySelector('li:nth-child(1) a');
        if (link) {
          link.click();
        }
      });
    },
  },
  created() {
    this.marksizeId = document.querySelector('#marksize-details').getAttribute('data-id');
    this.getMarksizeDetailData(this.marksizeId);
  },
  mounted() {
    initMore();
  },
  methods: {
    setTitle(name) {
      this.title = name;
    },
    prepareMarksizeDetailData(data) {
      this.rootData = {
        description: '',
        appointment: '',
        price: 0,
        price_average: 0,
        images: [
          '/content/no-photo.jpg',
        ],
        items: [],
        containers: [],
        marksizes: [],
        characters: [],
        boxing: [],
        documents: [],
        manufacturers: [],
        companies: [],
      };

      this.setTitle(data.name);

      this.setContainers(data);
      this.setCharacters(data);
      this.setBoxing(data);
      this.setDocuments(data);
      this.setManufacturers(data);

      if (data.images) {
        this.rootData.images = data.images;
      }

      this.rootData.price = data.price_average || 0;

      if (data.description) {
        this.rootData.description = data.description;
      }

      if (data.appointment) {
        this.rootData.appointment = data.appointment;
      }
    },
    setCharacters(data) {
      const characters = [];
      const descriptionCharacters = [];
      Object.keys(data.properties).forEach((property) => {
        const prop = {
          id: data.properties[property].id,
          name: data.properties[property].name,
          value: data.properties[property].value.join('<br />'),
          isHTML: true,
        };
        characters.push(prop);
        if (this.descriptionCharacters[prop.id]) {
          descriptionCharacters.push(prop);
        }
      });
      if (characters.length) {
        this.rootData.characters = characters;
      }
      this.rootData.items = [{
        id: 'description', name: 'Описание', value: data.description, isHTML: this.isHTML(data.description),
      }, ...descriptionCharacters];
    },
    setDocuments(data) {
      const { documents } = data;
      if (documents) {
        let result = [];
        Object.keys(documents).forEach((key) => {
          if (Array.isArray(documents[key])) {
            result.push(...documents[key]);
          }
        });
        result = result.map((item) => ({
          id: item.id,
          name: item.name,
          link: item.url,
        }));
        this.rootData.documents = result;
      }
    },
    setManufacturers(data) {
      if (data.companies && data.companies.length) {
        const ids = data.companies.map((item) => item.company_id);
        this.fetchCompaniesByIds(ids).then((response) => {
          this.rootData.companies = response.data.data.elements;
          this.rootData.manufacturers = response.data.data.elements;
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    setContainers(data) {
      // todo тара
    },
    // eslint-disable-next-line no-unused-vars
    setBoxing(data) {
      // todo упаковка
    },
    getMarksizeDetailData(id) {
      this.fetchMarksizeDetail(id)
        .then((response) => {
          const marksizeDetailData = response.data.data;
          this.$store.commit('setCrumbs', {
            crumbs: [
              {
                name: 'Главная',
                link: '/',
              },
              {
                name: 'Каталог',
                link: '/',
              },
              {
                name: marksizeDetailData.name,
                link: '/',
              },
            ],
          });
          this.setHeadTitle(marksizeDetailData.name);
          this.prepareMarksizeDetailData(marksizeDetailData);
        })
        .catch((e) => {
          if (e.response.status === 404) {
            window.location.href = '/404';
          }
        });
    },
    isHTML(str) {
      const doc = new DOMParser().parseFromString(str, 'text/html');
      return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
    },
  },
};
</script>
<style scoped lang="scss">
#manufacturers,
#documents {
  padding: 0;
  background: transparent;
}
</style>
