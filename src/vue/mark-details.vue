<template>
  <div>
    <breadCrumbs
      :crumbs="breadCrumbs"
    />
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
            v-if="rootData.marksizes.length"
            id="marksizes"
            class="tabs__content"
          >
            <mark-mark-size :root="rootData" />
          </div>
          <div
            v-if="rootData.characters.length"
            id="characters"
            class="tabs__content"
          >
            <mark-characters :root="rootData.characters" />
          </div>
          <div
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
            v-if="rootData.analogs.length"
            id="analogs"
            class="tabs__content"
          >
            <mark-analog :root="rootData.analogs" />
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
import MarkInfo from './components/blocks/catalog-details/mark-info.vue';
import MarkMarkSize from './components/blocks/catalog-details/mark-marksize.vue';
import MarkCharacters from './components/blocks/catalog-details/mark-characters.vue';
import MarkAppointment from './components/blocks/catalog-details/mark-appointment.vue';
import MarkDocuments from './components/blocks/catalog-details/mark-documents.vue';
import MarkAnalog from './components/blocks/catalog-details/mark-analogs.vue';
import MarkManufacturer from './components/blocks/catalog-details/mark-manufacturer.vue';
import MarkAdditional from './components/blocks/catalog-details/mark-additional.vue';
import { initMore } from '../assets/js/main/modules/more.js';
import api from './helpers/api';

export default {
  name: 'MarkDetails',
  components: {
    MarkInfo,
    MarkAnalog,
    MarkMarkSize,
    MarkDocuments,
    MarkCharacters,
    MarkAppointment,
    MarkManufacturer,
    MarkAdditional,
    breadCrumbs,
    pageTitle,
  },
  mixins: [api],
  data() {
    return {
      markId: null,
      title: '',
      breadCrumbs: [],
      rootData: {
        description: '',
        images: [],
        marksizes: [],
        characters: [],
        appointment: '',
        documents: [],
        items: [],
        analogs: [],
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
        property_armor_options: 'Броня',
        property_screen_view: 'Вид экрана',
        property_gost: 'ГОСТ',
        property_filling: 'Заполнение',
        property_protective_cover: 'Защитный покров',
        property_isolation: 'Изоляция',
        property_execution: 'Исполнение',
        property_caliber: 'Калибр',
        property_material: 'Материал',
        property_material_fibers: 'Материал волокон',
        property_material_shell: 'Материал оболочки',
        property_armor_availability: 'Наличие брони',
        property_rated_operating_voltage: 'Номинальное рабочее напряжение',
        property_normative_document: 'Нормативный документ',
        property_use: 'Применение',
        property_insulation_resistance: 'Сопротивление изоляции',
        property_fiber_type: 'Тип волокна',
        property_veins_type: 'Тип жил',
        property_cable_type: 'Тип кабеля',
        property_laying_conditions: 'Условия прокладки',
        property_color_protective_hose_outer_sheath: 'Цвет защитного шланга/наружной оболочки',
        property_central_element: 'Центральный элемент',
      },
      descriptionCharacters: {
        property_veins_type: 'Токопроводящая жила',
        property_isolation: 'Изоляция',
        property_screen_view: 'Экран',
        property_armor_availability: 'Наличие брони',
        property_material_shell: 'Наружная оболчка',
      },
    };
  },
  computed: {
    tabs() {
      const result = [];
      if (this.rootData.marksizes.length) {
        result.push({
          name: 'Маркоразмеры',
          url: '#marksizes',
        });
      }
      if (this.rootData.characters.length) {
        result.push({
          name: 'Характеристики',
          url: '#characters',
        });
      }
      if (this.rootData.appointment.length) {
        result.push({
          name: 'Назначение',
          url: '#appointment',
        });
      }
      if (this.rootData.documents.length) {
        result.push({
          name: 'Документация',
          url: '#documents',
        });
      }
      if (this.rootData.analogs.length) {
        result.push({
          name: 'Аналоги',
          url: '#analogs',
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
    tabs(newValue) {
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
    this.markId = document.querySelector('#mark-details').getAttribute('data-id');
    this.getMarkData(this.markId);
  },
  methods: {
    setBeadCrumbs(name) {
      this.breadCrumbs = [
        {
          name: 'Главная',
          link: '/',
        },
        {
          name: 'Каталог',
          link: '/catalog',
        },
        {
          name,
          link: '/',
        },
      ];
    },
    setTitle(name) {
      this.title = name;
    },
    prepareMarkData(data) {
      this.rootData = {
        description: '',
        images: [
          '/content/no-photo.jpg',
        ],
        marksizes: [],
        characters: [],
        appointment: '',
        documents: [],
        items: [],
        analogs: [],
        manufacturers: [],
        companies: [],
      };

      this.setTitle(data.name);
      this.setBeadCrumbs(data.name);

      this.setCharacters(data);
      this.setDocuments(data);
      this.setAnalogs(data);
      this.setManufacturers(data);

      if (data.images) {
        this.rootData.images = data.images;
      }

      if (data.marksizes) {
        this.rootData.marksizes = data.marksizes;
      }

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
        };
        characters.push(prop);
        if (this.descriptionCharacters[prop.id]) {
          descriptionCharacters.push(prop);
        }
      });
      if (characters.length) {
        this.rootData.characters = characters;
      }
      if (descriptionCharacters.length) {
        this.rootData.items = [{ name: 'Описание', value: data.description }, ...descriptionCharacters];
      }
    },
    setDocuments(data) {
      const { documents } = data;
      if (documents) {
        let result = [];
        for (const key in documents) {
          if (Array.isArray(documents[key])) {
            result.push(...documents[key]);
          }
        }
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
    setAnalogs(data) {
      this.rootData.analogs = []; // todo аналоги
    },
    getMarkData(id) {
      this.fetchMark(id)
        .then((response) => {
          const markData = response.data.data;
          this.prepareMarkData(markData);
        })
        .catch((e) => {
          if (e.response && e.response.status === 404) {
            window.location.href = '/404';
          } else {
            console.log(e);
          }
        });
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
