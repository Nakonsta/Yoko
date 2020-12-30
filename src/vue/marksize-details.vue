<template>
  <div v-if="this.rootData">
    <mark-info :root="rootData"></mark-info>
    <div class="tabs tabs--line js-tabs js-more">
      <ul class="js-more__items">
        <li
          v-for="item in tabLinks"
          :key="item.url"
          @click="handleTabLinkClick(item.url)"
          class="js-more__item"
          :class="item.url === '#' + currentTab ? 'active' : ''"
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
    <div class="tabs__content company__content" id="marksize-list" style="display: block;">
      <mark-marksize-list :marksize-id="marksizeId" :company-list="rootData.companies" />
    </div>
    <div class="tabs__content company__content" id="container">
      Тара
    </div>
    <div class="tabs__content company__content" id="characters">
      <mark-characters :root="rootData.characters"></mark-characters>
    </div>
    <div class="tabs__content company__content" id="boxing">
      Упаковка
    </div>
    <div class="tabs__content company__content" id="appointment">
      <mark-appointment :root="rootData"></mark-appointment>
    </div>
    <div class="tabs__content company__content" id="documents">
      <mark-documents :root="rootData.links"></mark-documents>
    </div>
    <div class="tabs__content company__content" id="manufacturer">
      <mark-manufacturer :root="rootData.manufacturer"></mark-manufacturer>
    </div>
    <div class="tabs__content company__content" id="additional">
      <mark-additional :root="rootData.companies" :lists="lists.companies" :data-form="dataForm"></mark-additional>
    </div>
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
import {initTabs} from '../assets/js/main/modules/more.js'

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
      companyId: null,
      rootData: null,
      lists: {
        quantity: [
          {
            name: '1',
            id: 1,
          },
          {
            name: '2',
            id: 2,
          },
        ],
        section: [
          {
            name: '1',
            id: 1,
          },
          {
            name: '2',
            id: 2,
          },
        ],
        voltage: [
          {
            name: '1',
            id: 1,
          },
          {
            name: '2',
            id: 2,
          },
        ],
        companies: [
          {
            name: 'ПАО "Группа Компаний ПИК"',
            id: 0,
          }
        ]
      },
      dataForm: {
        quantity: null,
        section: null,
        voltage: null,
        company: null,
      },
      currentTab: "marksize-list",
      tabLinks: [
        {
          name: "Наличие",
          url: "#marksize-list"
        },
        {
          name: "Тара",
          url: "#container"
        },
        {
          name: "Назначение",
          url: "#appointment"
        },
        {
          name: "Характеристики",
          url: "#characters"
        },
        {
          name: "Упаковка",
          url: "#boxing"
        },
        {
          name: "Документация",
          url: "#documents"
        },
        {
          name: "Производители",
          url: "#manufacturer"
        },
        {
          name: "Дополнительная информация",
          url: "#additional"
        }
      ],
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
        property_class_flexibility_vein: "Класс гибкости жилы (in:1,2,3,4,5,6)",
        property_fiber_count: "Количеств волокон",
        property_veins_count: "Количество жил",
        property_number_pairs: "Количество пар",
        property_number_triples: "Количество троек",
        property_number_fours: "Количество четверок",
        property_number_elements: "Количество элементов",
        property_material_vein: "Материал жилы (in:Медь,Алюминий)",
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
        property_section: "Сечение, мм2",
        property_voltage: "Напряжение, кВ"
      }
    }
  },
  created() {
    this.initId();
    this.getMarksizeDetailData(this.marksizeId);
  },
  mounted() {
    initTabs()
  },
  methods: {
    initId() {
      this.marksizeId = document.querySelector('#marksize-details').getAttribute('data-id');
      return false;
    },
    prepareMarksizeDetailData(data) {
      this.rootData = {
        items: [
          {
            title: 'Описание кабеля:',
            desc: 'Силовые кабели с медными жилами, с изоляцией и оболочкой из ПВХ пластиката',
          },
          {
            title: 'Токопроводящая жила:',
            desc: 'Медная, однопроволочная (ок) или многопроволочная, круглой (мк) или секторной формы (мс), 1 или 2 класса по ГОСТ 22483',
          },
          {
            title: 'Изоляция:',
            desc: 'ПВХ пластикат',
          },
          {
            title: 'Экран:',
            desc: 'без экрана',
          },
          {
            title: 'Броня:',
            desc: 'без брони',
          },
          {
            title: 'Наружная оболочка:',
            desc: 'ПВХ пластикат',
          },
        ],
        characters: [
          {
            name: 'Токопроводящая жила:',
            desc: 'медная'
          },
          {
            name: 'Материал изоляции:',
            desc: 'ПВХ пластикат'
          },
          {
            name: 'Огнестойкое исполнение (FR):',
            desc: 'нет'
          },
          {
            name: 'Хладостойкое исполнение (ХЛ):',
            desc: 'нет'
          },
          {
            name: 'Экран:',
            desc: 'без экрана'
          },
          {
            name: 'Тип брони:',
            desc: 'без брони'
          },
          {
            name: 'Материал изоляции:',
            desc: 'ПВХ пластикат'
          },
          {
            name: 'Класс пожарной опасности:',
            desc: 'О1.8.2.5.4'
          },
          {
            name: 'Вид климатического исполнения по ГОСТ 15150-69:',
            desc: 'ПВХ пластикат'
          },
          {
            name: 'Диапазон температур эксплуатации, °С:',
            desc: 'ПВХ пластикат'
          },
          {
            name: 'Прокладка и монтаж кабелей без предварительного подогрева производится при температуре\n' +
              'не ниже, °С:',
            desc: '-15'
          },
          {
            name: 'Испытательное переменное напряжение частотой 50 Гц, на напряжение 0,66 кВ:',
            desc: '3 кВ'
          },
          {
            name: 'Испытательное переменное напряжение частотой 50 Гц, на напряжение 1 кВ:',
            desc: '3,5 кВ'
          },
          {
            name: 'Минимальный радиус изгиба при прокладке и монтаже, одножильный кабель:',
            desc: '10 наружных диаметров кабеля'
          },
          {
            name: 'Минимальный радиус изгиба при прокладке и монтаже, многожильный кабель:',
            desc: '7,5 наружных диаметров кабеля'
          },
          {
            name: 'Длительно допустимая температура нагрева жил при эксплуатации, не более, °С:',
            desc: '70'
          },
          {
            name: 'Допустимые усилия при тяжении кабелей по трассе прокладки, не более:',
            desc: '50 Н/мм2'
          },
          {
            name: 'Строительная длина кабелей для сечения основных жил: до 16 мм2:',
            desc: '450'
          },
          {
            name: 'Строительная длина кабелей для сечения основных жил, от 25 до 70 мм2:',
            desc: '300'
          },
          {
            name: 'Строительная длина кабелей для сечения основных жил, от 95 мм2:',
            desc: '200'
          },
          {
            name: 'Гарантийный срок эксплуатации, лет:',
            desc: '5'
          },
          {
            name: 'Срок службы, лет:',
            desc: '30'
          }
        ],
        markoSize: [
          {
            id: 1,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 2,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 3,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 4,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 5,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 6,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 7,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 8,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 9,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 10,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 11,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 12,
            name: 'ВВГ 1х1,5',
          },
          {
            id: 13,
            name: 'ВВГ 1х1,5',
          }
        ],
        links: [
          {
            name: 'ГО00.RU.1348.Н00393',
            link: '#',
          },
          {
            name: 'ГО00.RU.1348.Н00393',
            link: '#',
          },
          {
            name: 'ГО00.RU.1348.Н00393',
            link: '#',
          },
          {
            name: 'ГО00.RU.1348.Н00393',
            link: '#',
          },
          {
            name: 'ГО00.RU.1348.Н00393',
            link: '#',
          }
        ],
        manufacturer: [
          {
            name: 'ПАО «Группа компаний ПИК»',
            ico: './content/catalog/pik.svg',
            tags: ['поставщик', 'крупный бизнес'],
            rating: {
              rate: 9,
              time: 9,
              fav: 9,
            }
          },
          {
            name: 'ОАО «Волжская ТГК»',
            ico: './content/catalog/tgk.svg',
            tags: ['поставщик', 'средний бизнес'],
            rating: {
              rate: 9,
              time: 9,
              fav: 9,
            }
          },
          {
            name: 'АО «Тандер»',
            ico: './content/catalog/tander.svg',
            tags: ['поставщик', 'крупный бизнес'],
            rating: {
              rate: 9,
              time: 9,
              fav: 9,
            }
          },
          {
            name: 'ПАО «Мегафон»',
            ico: './content/catalog/megafon.svg',
            tags: ['поставщик', 'средний бизнес'],
            rating: {
              rate: 9,
              time: 9,
              fav: 9,
            }
          },
        ],
        companies: [
          {
            id: 1,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
            images: ['./content/catalog/cat-1.jpg', './content/catalog/cat-2.jpg', './content/catalog/cat-3.jpg', './content/catalog/cat-4.jpg', './content/catalog/cat-5.jpg', './content/catalog/cat-6.jpg']
          }
        ]
      }

      if (data.images) {
        this.rootData.images = data.images;
      }

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
        this.rootData.links = result;
      }

      if (data.companies && data.companies.length) {
        this.companyId = data.companies[0].company_id;
        const ids = data.companies.map((item) => item.company_id);
        this.fetchCompaniesByIds(ids).then((response) => {
          this.rootData.companies = response.data.data.elements;
          this.setManufacturer(this.rootData.companies);
        })
      } else {
        this.rootData.manufacturer = [];
        this.hideLink("#manufacturer");
      }

      if (data.description) {
        this.rootData.description = data.description;
      }

      if (data.appointment) {
        this.rootData.appointment = data.appointment;
      }
    },
    setManufacturer(companies) {
      const result = companies.map((item) => {
        const tags = [];
        if (item.contractor) {
          tags.push("Поставщик");
        }
        tags.push(item.businessSize.value);
        item.ico = './content/company-default.jpg';
        item.tags = tags;
        return item;
      });
      this.rootData.manufacturer = result;
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
    getMarksizeDetailData(id) {
      this.fetchMarksizeDetail(id).then((response) => {
        const marksizeDetailData = response.data.data;
        this.prepareMarksizeDetailData(marksizeDetailData);
      })
    },
    hideLink(url) {
      let idx = this.tabLinks.findIndex((item) => item.url === url);
      if (idx > -1) {
        this.tabLinks.splice(idx, 1);
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tabs.tabs--line {
  //overflow: hidden;
}

#manufacturer,
#documents {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  background: transparent;
}
</style>
