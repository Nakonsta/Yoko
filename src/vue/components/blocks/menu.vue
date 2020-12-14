<template>
  <div class="nav-inner" :class="{fullMode: windowWidth < 1025 || fullMode}">
    <a class="nav-inner__mobile popup-link" v-if="windowWidth < 1025 || fullMode" href="#menu">
      <svg class="sprite-menu">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#menu"/>
      </svg>
      Меню
    </a>
    <div id="menu" :class="{popup: windowWidth < 1025 || fullMode}">
      <div class="nav-inner__content">
        <div :class="{popup__content: windowWidth < 1025 || fullMode}">
          <div class="hide-menu-ico popup__close" @click="closeModal" v-if="windowWidth < 1025 || fullMode">
            <svg class="sprite-close">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#close"/>
            </svg>
          </div>
          <div class="nav-inner__head">
            <span v-if="!search.isVisible">Меню</span>
            <text-input
                parent-class=""
                :rules="{required:false}"
                v-if="search.isVisible"
                v-model="search.text"
                placeholder="Поиск по разделам"
                :input="filterMenuList"
            ></text-input>
            <div class="nav-icons">
              <div
                  v-if="!search.isVisible"
                  :class="{ active: enabled }"
                  @click="enabled = !enabled"
              >
                <svg class="sprite-settings">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#settings"/>
                </svg>
              </div>
              <div @click="searchList">
                <svg class="sprite-search" v-if="!search.isVisible">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#search"/>
                </svg>
                <svg class="sprite-close" v-else>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#close"/>
                </svg>
              </div>
            </div>
          </div>
          <draggable
              v-model="filteredMenuItems"
              group="people"
              :disabled="!enabled"
              @start="drag = true"
              @end="drag = false"
          >
            <div
                :key="i"
                v-if="enabled ? true : item.isActive"
                v-for="(item, i) in filteredMenuItems"
            >
              <div
                  class="nav-inner__item"
                  :class="{ parent: item.subItems.length }"
              >
                <router-link
                    router
                    exact
                    :to="!enabled ? item.to : ''"
                    class="nav-inner__link"
                    :class="{disabled: !item.isActive}"
                >
                  <span v-text="item.title"/>
                </router-link>
                <div v-if="item.subItems.length" class="open-menu" @click="showSubMenu(i)">
                  <svg class="sprite-arrow" :class="{active: activeIndex === i}">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#arrow-right"/>
                  </svg>
                </div>
                <div class="switch" v-if="enabled" @click="enabledSwitch(i)">
                  <span class="slider" :class="{active: item.isActive}"></span>
                </div>
              </div>
              <div v-if="activeIndex === i" class="submenu">
                <router-link
                    router
                    exact
                    :key="i"
                    class="nav-inner__item-sub"
                    v-for="(el, i) in item.subItems"
                    :to="el.to"
                >
                  <span v-text="el.title"/>
                </router-link>
              </div>
            </div>
          </draggable>
          <were-problems
              :reset-list="resetList"
              :set-if="enabled"
          ></were-problems>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable"
import api from '../../helpers/api'
import functions from '../../helpers/functions'
import WereProblems from "../wereProblems.vue"
import TextInput from "../forms/Input.vue"

export default {
  name: 'Menu',
  components: {
    WereProblems,
    draggable,
    TextInput,
  },
  props: {
    fullMode: {
      default: false,
      type: Boolean
    },
    windowWidth: {
      default: 0,
      type: Number
    },
  },
  mixins: [api, functions],
  data() {
    return {
      search: {
        isVisible: false,
        test: null,
      },
      activeIndex: undefined,
      enabled: false,
      filteredMenuItems: [],
      menuItems: [
        {
          icon: 'mdi-home',
          title: 'Главная',
          to: '/',
          order: 0,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-buffer',
          title: 'Каталог',
          to: '/catalog',
          order: 1,
          isActive: true,
          subItems: [
            {
              title: 'Управление закупками',
              to: '/'
            },
            {
              title: 'Открытые переговоры',
              to: '/'
            },
            {
              title: 'Мои заявки в закупках',
              to: '/'
            },
            {
              title: 'Избранное',
              to: '/'
            }
          ]
        },
        {
          icon: 'mdi-compare-horizontal',
          title: 'Торговые процедуры',
          to: '/procedures',
          order: 2,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-information-outline',
          title: 'О компании',
          to: '/info',
          order: 3,
          isActive: true,
          subItems: [
            {
              title: 'Управление закупками',
              to: '/'
            },
            {
              title: 'Открытые переговоры',
              to: '/'
            },
            {
              title: 'Мои заявки в закупках',
              to: '/'
            },
            {
              title: 'Избранное',
              to: '/'
            }
          ]
        },
        {
          icon: 'mdi-card-account-phone-outline',
          title: 'Контакты',
          to: '/contact',
          order: 4,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-account-multiple-check',
          title: 'Аккредитация',
          to: '/accreditations',
          order: 5,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-account-heart',
          title: 'Мои данные',
          to: '/user',
          order: 6,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-home',
          title: 'Справочник',
          to: '/info',
          order: 7,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-home',
          title: 'Логистические сервисы',
          to: '/accreditations',
          order: 8,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-home',
          title: 'Торги',
          to: '/catalog',
          order: 9,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-home',
          title: 'Электронные документооборот',
          to: '/procedures',
          order: 10,
          isActive: true,
          subItems: [],
        },
        {
          icon: 'mdi-home',
          title: 'Инструкции',
          to: '/user',
          order: 11,
          isActive: true,
          subItems: [],
        },
      ],
    }
  },
  mounted() {
    // this.getSettingsData('menu')
    //     .then((response) => {
    //       const data = decodeURIComponent(response.data.data.value)
    //           .replace(/\+/g, ' ')
    //           .replace(/=/g, '')
    //       this.menuItems = JSON.parse(data)
          this.filteredMenuItems = this.menuItems
    //       console.log(this.filteredMenuItems)
    //     })
    //     .catch((e) => {
    //       console.log(e)
    //     })
  },
  methods: {
    showSubMenu(index) {
      if (this.activeIndex === index) {
        this.activeIndex = undefined
      } else {
        this.activeIndex = index
      }
    },
    resetList() {
      this.filteredMenuItems = this.filteredMenuItems
          .sort((one, two) => {
            return one.order - two.order
          })
          .map((item) => ({ ...item, isActive: true }))
      this.saveList()
    },
    saveList() {
      this.sendSettingsData(
          'menu',
          encodeURIComponent(JSON.stringify(this.filteredMenuItems)),
      )
    },
    filterMenuList(event) {
      this.filteredMenuItems = this.menuItems.filter((item) =>
          item.title.toLowerCase().includes(event.target.value.toLowerCase()),
      )
    },
    searchList() {
      this.search.isVisible = !this.search.isVisible
      if (!this.search.isVisible) {
        this.search.text = null
        this.filterMenuList({target: {value: ''}})
      }
    },
    closeModal() {
      closePopupById('#menu')
    },
    enabledSwitch(index) {
      this.filteredMenuItems[index].isActive = !this.filteredMenuItems[index].isActive
      if (!this.filteredMenuItems[index].isActive) {
        setTimeout(() => {
          this.moveArrayElements(this.filteredMenuItems, index, true)
          this.saveList()
        }, 100)
      } else {
        setTimeout(() => {
          this.moveArrayElements(this.filteredMenuItems, index, false)
          this.saveList()
        }, 100)
      }
      return false;
    },
  },
}
</script>
