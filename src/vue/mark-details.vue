<template>
  <div>
    <mark-info :root="rootData"></mark-info>
    <div class="tabs tabs--line js-tabs js-more" ref="tabs" v-if="tabs">
      <ul class="js-more__items">
        <li
          v-for="item in tabs"
          :key="item.url"
          class="js-more__item"
        >
          <a :href="item.url">{{ item.name }}</a>
        </li>
        <li class="js-more__btn hidden">
          <button type="button" aria-haspopup="true" aria-expanded="false">
            <svg class="sprite-dropdown">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#dropdown"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>
    <div class="tabs__content" id="marksizes" v-if="rootData.marksizes.length">
      <mark-mark-size :root="rootData"></mark-mark-size>
    </div>
    <div class="tabs__content" id="characters" v-if="rootData.characters.length">
      <mark-characters :root="rootData.characters"></mark-characters>
    </div>
    <div class="tabs__content" id="appointment">
      <mark-appointment :root="rootData"></mark-appointment>
    </div>
    <div class="tabs__content" id="documents" v-if="rootData.documents.length">
      <mark-documents :root="rootData.documents"></mark-documents>
    </div>
    <div class="tabs__content" id="analogs" v-if="rootData.analogs.length">
      <mark-analog :root="rootData.analogs"></mark-analog>
    </div>
    <div class="tabs__content" id="manufacturers" v-if="rootData.manufacturers.length">
      <mark-manufacturer :root="rootData.manufacturers"></mark-manufacturer>
    </div>
<!--    <div class="tabs__content" id="additional" v-if="rootData.companies.length">-->
<!--      <mark-additional :root="rootData.companies"></mark-additional>-->
<!--    </div>-->
  </div>
</template>

<script>
import MarkInfo from './components/blocks/catalog-details/mark-info.vue'
import MarkMarkSize from './components/blocks/catalog-details/mark-marksize.vue'
import MarkCharacters from './components/blocks/catalog-details/mark-characters.vue'
import MarkAppointment from './components/blocks/catalog-details/mark-appointment.vue'
import MarkDocuments from './components/blocks/catalog-details/mark-documents.vue'
import MarkAnalog from './components/blocks/catalog-details/mark-analogs.vue'
import MarkManufacturer from './components/blocks/catalog-details/mark-manufacturer.vue'
import MarkAdditional from './components/blocks/catalog-details/mark-additional.vue'
import { initMore } from '../assets/js/main/modules/more.js'
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
  },
  mixins: [api],
  data() {
    return {
      markId: null,
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
        property_active_resistance_zero: "Активное сопротивление жил (нулевой)",
        property_active_resistance_main: "Активное сопротивление жил (основных)",
        property_active_resistance_plane: "Активное сопротивление при прокладке в плоскости",
        property_active_resistance_triangle: "Активное сопротивление при прокладке треугольником",
        property_active_resistance: "Активное сопротивление",
        property_voltage_versions: "Варианты исполнения вольтажа",
        property_outer_diameter: "Внешний диаметр",
        property_resistance_wave: "Волновое сопротивление",
        property_diameter_cabel: "Диаметр кабеля",
        property_diameter: "Диаметр",
        property_voltage_allowable: "Допустимое напряжение",
        property_capacitive_conductivity: "Емкостная проводимость",
        property_capacity: "Емкость",
        property_inductive_resistance_cores_zero: "Индуктивное сопротивление жил (нулевой)",
        property_inductive_resistance_cores_main: "Индуктивное сопротивление жил (основных)",
        property_inductive_resistance_zero_sequence: "Индуктивное сопротивление нулевой последовательности",
        property_inductive_resistance: "Индуктивное сопротивление",
        property_inductive_resistance_plane: "Индуктивное сопротивление при прокладке в плоскости",
        property_inductive_resistance_triangle: "Индуктивное сопротивление при прокладке треугольником",
        property_inductive_resistance_direct_sequence: "Индуктивное сопротивление прямой последовательности",
        property_class_flexibility_vein: "Класс гибкости жилы",
        property_fiber_count: "Количеств волокон",
        property_veins_count: "Количество жил",
        property_number_pairs: "Количество пар",
        property_number_triples: "Количество троек",
        property_number_fours: "Количество четверок",
        property_number_elements: "Количество элементов",
        property_material_vein: "Материал жилы",
        property_minimum_bending_radius: "Минимальный радиус изгиба",
        property_voltage: "Напряжение",
        property_optical_module: "Оптические модули",
        property_crushing_force: "Раздавливающее усилие",
        property_fiber_size: "Размер волокНА",
        property_fibers_size: "Размер волокОН",
        property_tensile_force: "Растягивающее усилие",
        property_section: "Сечение",
        property_cable_cross_section: "Сечение кабеля",
        property_lifetime: "Срок службы",
        property_construction_length: "Строительная длина",
        property_application_type: "Тип применения",
        property_electrical_resistance: "Электрическое сопротивление",
        property_armor_options: "Броня",
        property_screen_view: "Вид экрана",
        property_gost: "ГОСТ",
        property_filling: "Заполнение",
        property_protective_cover: "Защитный покров",
        property_isolation: "Изоляция",
        property_execution: "Исполнение",
        property_caliber: "Калибр",
        property_material: "Материал",
        property_material_fibers: "Материал волокон",
        property_material_shell: "Материал оболочки",
        property_armor_availability: "Наличие брони",
        property_rated_operating_voltage: "Номинальное рабочее напряжение",
        property_normative_document: "Нормативный документ",
        property_use: "Применение",
        property_insulation_resistance: "Сопротивление изоляции",
        property_fiber_type: "Тип волокна",
        property_veins_type: "Тип жил",
        property_cable_type: "Тип кабеля",
        property_laying_conditions: "Условия прокладки",
        property_color_protective_hose_outer_sheath: "Цвет защитного шланга/наружной оболочки",
        property_central_element: "Центральный элемент"
      },
      descriptionCharacters: {
        property_veins_type: "Токопроводящая жила",
        property_isolation: "Изоляция",
        property_screen_view: "Экран",
        property_armor_availability: "Наличие брони",
        property_material_shell: "Наружная оболчка"
      }
    }
  },
  computed: {
    tabs() {
      let result = [];
      if (this.rootData.marksizes.length) {
        result.push({
          name: "Маркоразмеры",
          url: "#marksizes"
        });
      }
      if (this.rootData.characters.length) {
        result.push({
          name: "Характеристики",
          url: "#characters"
        });
      }
      if (this.rootData.appointment.length) {
        result.push({
          name: "Назначение",
          url: "#appointment"
        });
      }
      if (this.rootData.documents.length) {
        result.push({
          name: "Документация",
          url: "#documents"
        });
      }
      if (this.rootData.analogs.length) {
        result.push({
          name: "Аналоги",
          url: "#analogs"
        });
      }
      if (this.rootData.manufacturers.length) {
        result.push({
          name: "Производители",
          url: "#manufacturers"
        });
      }
      // if (this.rootData.companies.length) {
      //   result.push({
      //     name: "Дополнительная информация",
      //     url: "#additional"
      //   });
      // }
      return result;
    }
  },
  watch: {
    tabs(newValue) {
      this.$nextTick(() => {
        initMore();
        let tabs = this.$refs['tabs'],
          hash = window.location.hash.substr(1),
          link = tabs.querySelector('li a[href="#'+hash+'"]') || tabs.querySelector('li.active a') || tabs.querySelector('li:nth-child(1) a');
        if (link) {
          link.click();
        }
      });
    }
  },
  created() {
    this.markId = document.querySelector('#mark-details').getAttribute('data-id');
    this.getMarkData(this.markId);
  },
  methods: {
    prepareMarkData(data) {
      this.rootData = {
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
      };
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
      for (let key in data) {
        if (key.includes("property_")) {
          const name = this.characterTitles[key] ? this.characterTitles[key] : key;
          const value = data[key];

          if (value) {
            characters.push({name, desc: value[0]});
          }

          if (value && this.descriptionCharacters[key]) {
            descriptionCharacters.push({title: this.descriptionCharacters[key], desc: value[0]});
          }
        }
      }
      if (characters.length) {
        this.rootData.characters = characters;
      }
      if (descriptionCharacters.length) {
        this.rootData.items = [{ title: "Описание", desc: data.description }, ...descriptionCharacters];
      }
    },
    setDocuments(data) {
      const {documents} = data;
      if (documents) {
        let result = [];
        for (let key in documents) {
          if (Array.isArray(documents[key])) {
            result.push(...documents[key]);
          }
        }
        result = result.map((item) => {
          return {
            id: item.id,
            name: item.name,
            link: item.url
          }
        });
        this.rootData.documents = result;
      }
    },
    setManufacturers(data) {
      this.rootData.manufacturers = [];
      this.rootData.companies = [];
      if (data.companies && data.companies.length) {
        const ids = data.companies.map((item) => item.company_id);
        this.fetchCompaniesByIds(ids).then((response) => {
          this.rootData.companies = response.data.data.elements;
          const result = this.rootData.companies.map((item) => {
            const tags = [];
            if (item.contractor) {
              tags.push("Поставщик");
            }
            tags.push(item.businessSize.value);
            item.ico = './content/company-default.jpg';
            item.tags = tags;
            return item;
          });
          this.rootData.manufacturers = result;
        });
      }
    },
    setAnalogs(data) {
      this.rootData.analogs = []; // todo аналоги
    },
    getMarkData(id) {
      this.fetchMark(id).then((response) => {
        const markData = response.data.data;
        this.prepareMarkData(markData);
      });
    }
  }
}
</script>
<style scoped lang="scss">
  #manufacturers,
  #documents {
    padding: 0;
    background: transparent;
  }
</style>
