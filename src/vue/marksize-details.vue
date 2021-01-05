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
    <div class="tabs__content" id="description" v-if="rootData.description.length">
      <mark-description :root="rootData"></mark-description>
    </div>
    <div class="tabs__content" id="availability" v-if="marksizeId && rootData.companies.length">
      <mark-marksize-list :marksize-id="marksizeId" :companies="rootData.companies" />
    </div>
    <div class="tabs__content" id="containers" v-if="rootData.containers.length">
      Тара
    </div>
    <div class="tabs__content" id="characters" v-if="rootData.characters.length">
      <mark-characters :root="rootData.characters"></mark-characters>
    </div>
    <div class="tabs__content" id="boxing" v-if="rootData.boxing.length">
      Упаковка
    </div>
    <div class="tabs__content" id="appointment" v-if="rootData.appointment.length">
      <mark-appointment :root="rootData"></mark-appointment>
    </div>
    <div class="tabs__content" id="documents" v-if="rootData.documents.length">
      <mark-documents :root="rootData.documents"></mark-documents>
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
import api from './helpers/api';
import MarkInfo from './components/blocks/catalog-details/mark-info.vue'
import MarkDescription from './components/blocks/catalog-details/mark-description.vue'
import MarkCharacters from './components/blocks/catalog-details/mark-characters.vue'
import MarkAppointment from './components/blocks/catalog-details/mark-appointment.vue'
import MarkDocuments from './components/blocks/catalog-details/mark-documents.vue'
import MarkManufacturer from './components/blocks/catalog-details/mark-manufacturer.vue'
import MarkAdditional from './components/blocks/catalog-details/mark-additional.vue'
import MarkMarksizeList from './components/blocks/catalog-details/mark-marksize-list'
import {initMore} from '../assets/js/main/modules/more.js'

export default {
  name: 'MarkSizeDetails',
  components: {
    MarkInfo,
    MarkDocuments,
    MarkCharacters,
    MarkDescription,
    MarkAppointment,
    MarkManufacturer,
    MarkAdditional,
    MarkMarksizeList
  },
  mixins: [api],
  data() {
    return {
      marksizeId: null,
      rootData: {
        description: '',
        appointment: '',
        price: '',
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
        property_electrical_resistance: "Электрическое сопротивление"
      },
      descriptionCharacters: {
        property_veins_count: "Число жил",
        property_section: "Сечение, мм²",
        property_voltage: "Напряжение, кВ"
      }
    }
  },
  computed: {
    tabs() {
      let result = [];
      if (this.rootData.description.length) {
        result.push({
          name: "Описание",
          url: "#description"
        });
      }
      if (this.marksizeId && this.rootData.companies.length) {
        result.push({
          name: "Наличие",
          url: "#availability"
        });
      }
      if (this.rootData.containers.length) {
        result.push({
          name: "Тара",
          url: "#containers"
        });
      }
      if (this.rootData.appointment.length) {
        result.push({
          name: "Назначение",
          url: "#appointment"
        });
      }
      if (this.rootData.characters.length) {
        result.push({
          name: "Характеристики",
          url: "#characters"
        });
      }
      if (this.rootData.boxing.length) {
        result.push({
          name: "Упаковка",
          url: "#boxing"
        });
      }
      if (this.rootData.documents.length) {
        result.push({
          name: "Документация",
          url: "#documents"
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
    this.marksizeId = document.querySelector('#marksize-details').getAttribute('data-id');
    this.getMarksizeDetailData(this.marksizeId);
  },
  mounted() {
    initMore();
  },
  methods: {
    prepareMarksizeDetailData(data) {
      this.rootData = {
        description: '',
        appointment: '',
        price: '',
        images: [],
        items: [],
        containers: [],
        marksizes: [],
        characters: [],
        boxing: [],
        documents: [],
        manufacturers: [],
        companies: [],
      };
      // this.rootData = {
      //   items: [
      //     {
      //       title: 'Описание кабеля:',
      //       desc: 'Силовые кабели с медными жилами, с изоляцией и оболочкой из ПВХ пластиката',
      //     },
      //     {
      //       title: 'Токопроводящая жила:',
      //       desc: 'Медная, однопроволочная (ок) или многопроволочная, круглой (мк) или секторной формы (мс), 1 или 2 класса по ГОСТ 22483',
      //     },
      //     {
      //       title: 'Изоляция:',
      //       desc: 'ПВХ пластикат',
      //     },
      //     {
      //       title: 'Экран:',
      //       desc: 'без экрана',
      //     },
      //     {
      //       title: 'Броня:',
      //       desc: 'без брони',
      //     },
      //     {
      //       title: 'Наружная оболочка:',
      //       desc: 'ПВХ пластикат',
      //     },
      //   ],
      //   characters: [
      //     {
      //       name: 'Токопроводящая жила:',
      //       desc: 'медная'
      //     },
      //     {
      //       name: 'Материал изоляции:',
      //       desc: 'ПВХ пластикат'
      //     },
      //     {
      //       name: 'Огнестойкое исполнение (FR):',
      //       desc: 'нет'
      //     },
      //     {
      //       name: 'Хладостойкое исполнение (ХЛ):',
      //       desc: 'нет'
      //     },
      //     {
      //       name: 'Экран:',
      //       desc: 'без экрана'
      //     },
      //     {
      //       name: 'Тип брони:',
      //       desc: 'без брони'
      //     },
      //     {
      //       name: 'Материал изоляции:',
      //       desc: 'ПВХ пластикат'
      //     },
      //     {
      //       name: 'Класс пожарной опасности:',
      //       desc: 'О1.8.2.5.4'
      //     },
      //     {
      //       name: 'Вид климатического исполнения по ГОСТ 15150-69:',
      //       desc: 'ПВХ пластикат'
      //     },
      //     {
      //       name: 'Диапазон температур эксплуатации, °С:',
      //       desc: 'ПВХ пластикат'
      //     },
      //     {
      //       name: 'Прокладка и монтаж кабелей без предварительного подогрева производится при температуре\n' +
      //         'не ниже, °С:',
      //       desc: '-15'
      //     },
      //     {
      //       name: 'Испытательное переменное напряжение частотой 50 Гц, на напряжение 0,66 кВ:',
      //       desc: '3 кВ'
      //     },
      //     {
      //       name: 'Испытательное переменное напряжение частотой 50 Гц, на напряжение 1 кВ:',
      //       desc: '3,5 кВ'
      //     },
      //     {
      //       name: 'Минимальный радиус изгиба при прокладке и монтаже, одножильный кабель:',
      //       desc: '10 наружных диаметров кабеля'
      //     },
      //     {
      //       name: 'Минимальный радиус изгиба при прокладке и монтаже, многожильный кабель:',
      //       desc: '7,5 наружных диаметров кабеля'
      //     },
      //     {
      //       name: 'Длительно допустимая температура нагрева жил при эксплуатации, не более, °С:',
      //       desc: '70'
      //     },
      //     {
      //       name: 'Допустимые усилия при тяжении кабелей по трассе прокладки, не более:',
      //       desc: '50 Н/мм2'
      //     },
      //     {
      //       name: 'Строительная длина кабелей для сечения основных жил: до 16 мм2:',
      //       desc: '450'
      //     },
      //     {
      //       name: 'Строительная длина кабелей для сечения основных жил, от 25 до 70 мм2:',
      //       desc: '300'
      //     },
      //     {
      //       name: 'Строительная длина кабелей для сечения основных жил, от 95 мм2:',
      //       desc: '200'
      //     },
      //     {
      //       name: 'Гарантийный срок эксплуатации, лет:',
      //       desc: '5'
      //     },
      //     {
      //       name: 'Срок службы, лет:',
      //       desc: '30'
      //     }
      //   ],
      //   markoSize: [
      //     {
      //       id: 1,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 2,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 3,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 4,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 5,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 6,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 7,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 8,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 9,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 10,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 11,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 12,
      //       name: 'ВВГ 1х1,5',
      //     },
      //     {
      //       id: 13,
      //       name: 'ВВГ 1х1,5',
      //     }
      //   ],
      //   links: [
      //     {
      //       name: 'ГО00.RU.1348.Н00393',
      //       link: '#',
      //     },
      //     {
      //       name: 'ГО00.RU.1348.Н00393',
      //       link: '#',
      //     },
      //     {
      //       name: 'ГО00.RU.1348.Н00393',
      //       link: '#',
      //     },
      //     {
      //       name: 'ГО00.RU.1348.Н00393',
      //       link: '#',
      //     },
      //     {
      //       name: 'ГО00.RU.1348.Н00393',
      //       link: '#',
      //     }
      //   ],
      //   manufacturers: [
      //     {
      //       name: 'ПАО «Группа компаний ПИК»',
      //       ico: './content/catalog/pik.svg',
      //       tags: ['поставщик', 'крупный бизнес'],
      //       rating: {
      //         rate: 9,
      //         time: 9,
      //         fav: 9,
      //       }
      //     },
      //     {
      //       name: 'ОАО «Волжская ТГК»',
      //       ico: './content/catalog/tgk.svg',
      //       tags: ['поставщик', 'средний бизнес'],
      //       rating: {
      //         rate: 9,
      //         time: 9,
      //         fav: 9,
      //       }
      //     },
      //     {
      //       name: 'АО «Тандер»',
      //       ico: './content/catalog/tander.svg',
      //       tags: ['поставщик', 'крупный бизнес'],
      //       rating: {
      //         rate: 9,
      //         time: 9,
      //         fav: 9,
      //       }
      //     },
      //     {
      //       name: 'ПАО «Мегафон»',
      //       ico: './content/catalog/megafon.svg',
      //       tags: ['поставщик', 'средний бизнес'],
      //       rating: {
      //         rate: 9,
      //         time: 9,
      //         fav: 9,
      //       }
      //     },
      //   ],
      //   companies: [
      //     {
      //       id: 1,
      //       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      //       images: ['./content/catalog/cat-1.jpg', './content/catalog/cat-2.jpg', './content/catalog/cat-3.jpg', './content/catalog/cat-4.jpg', './content/catalog/cat-5.jpg', './content/catalog/cat-6.jpg']
      //     }
      //   ]
      // }

      this.setContainers(data);
      this.setCharacters(data);
      this.setBoxing(data);
      this.setDocuments(data);
      this.setManufacturers(data);

      if (data.images) {
        this.rootData.images = data.images;
      }

      this.rootData.price = data.price_average || 'Неизвестно';

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

          if (this.descriptionCharacters[key]) {
            descriptionCharacters.push({title: this.descriptionCharacters[key], desc: value[0]});
          }
        }
      }
      if (characters.length) {
        this.rootData.characters = characters;
      }
      if (descriptionCharacters.length) {
        this.rootData.items = descriptionCharacters;
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
        })
      }
    },
    handleTabLinkClick(link) {
      if (link) {
        this.currentTab = link.replace("#", "").trim();
        let elLink = document.getElementById(this.currentTab);
        /**
         * На табы вешается какой-то js обработчик извне, который не дает показывать контент таба по клику.
         * пришлось пока сдлеать через setTimout с нулевой задержкой.
         */
        setTimeout(function () {
          elLink.style.display = "block";
        }, 0);
      }
    },
    setContainers(data) {
      // todo тара
    },
    setBoxing(data) {
      // todo упаковка
    },
    getMarksizeDetailData(id) {
      this.fetchMarksizeDetail(id).then((response) => {
        const marksizeDetailData = response.data.data;
        this.prepareMarksizeDetailData(marksizeDetailData);
      })
    },
  }
}
</script>
<style scoped lang="scss">
.tabs.tabs--line {
  //overflow: hidden;
}

#manufacturers,
#documents {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  background: transparent;
}
</style>
