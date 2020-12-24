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
              v-model="filteredMenuItems[role]"
              group="people"
              :disabled="!enabled"
              @start="drag = true"
              @end="drag = false"
          >
            <div
                :key="i"
                v-if="enabled ? true : item.isActive"
                v-for="(item, i) in filteredMenuItems[role]"
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
      role: this.$store.getters.userRole,
      search: {
        isVisible: false,
        test: null,
      },
      activeIndex: undefined,
      enabled: false,
      menuItems: {
        buyer: [
          {
            icon: 'mdi-home',
            title: 'Главная',
            to: '/personal',
            order: 0,
            isActive: true,
            subItems: [],
          },
          {
            icon: 'mdi-buffer',
            title: 'Торговые процедуры',
            to: '/personal/procedures',
            order: 1,
            isActive: true,
            subItems: [
              {
                title: 'Список процедур',
                to: '/personal/procedures'
              },
              {
                title: 'Создание процедуры',
                to: '/personal/procedures/new'
              },
              {
                title: 'Черновики процедур',
                to: '/personal/procedures/drafts'
              },
            ]
          },
          {
            icon: 'mdi-buffer',
            title: 'Аккредитация',
            to: '/personal/accreditations',
            order: 1,
            isActive: true,
            subItems: [
              {
                title: 'Создание заявки',
                to: '/personal/accreditations/new'
              },
            ]
          }
        ],
        contractor: [
          {
            icon: 'mdi-home',
            title: 'Главная',
            to: '/personal',
            order: 0,
            isActive: true,
            subItems: [],
          },
          {
            icon: 'mdi-buffer',
            title: 'Аккредитация',
            to: '/personal/accreditations',
            order: 1,
            isActive: true,
            subItems: [
              {
                title: 'Создание заявки',
                to: '/personal/accreditations/new'
              },
            ]
          },
          {
            icon: 'mdi-buffer',
            title: 'Торговые процедуры',
            to: '/personal/procedures',
            order: 1,
            isActive: true,
            subItems: [
              {
                title: 'Список процедур',
                to: '/personal/procedures'
              },
              {
                title: 'Участие в процедурах',
                to: '/personal/procedures/applications'
              },
            ]
          },
          {
            icon: 'mdi-buffer',
            title: 'Каталог',
            to: '/catalog',
            order: 1,
            isActive: true,
            subItems: [
              {
                title: 'Добавление продукции',
                to: '/personal/catalog/new'
              },
            ]
          },
        ],
        guest: [],
      },
      filteredMenuItems: [],
    }
  },
  mounted() {
    // todo: пока отключим сохранение позиций меню на время разработки
    // this.getSettingsData('menu')
    //     .then((response) => {
    //       const data = decodeURIComponent(response.data.data.value)
    //           .replace(/\+/g, ' ')
    //           .replace(/=/g, '')
    //       this.menuItems = JSON.parse(data)
    //       this.filteredMenuItems = this.menuItems
    //     })
    //     .catch((e) => {
    //       console.log(e)
    //     })
    this.filteredMenuItems = this.menuItems
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
      this.filteredMenuItems[this.role] = this.filteredMenuItems[this.role]
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
      this.filteredMenuItems = {
        ...this.filteredMenuItems,
        [this.role]: this.menuItems[this.role].filter((item) =>
            item.title.toLowerCase().includes(event.target.value.toLowerCase()),
        )
      }
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
      this.filteredMenuItems[this.role][index].isActive = !this.filteredMenuItems[this.role][index].isActive
      if (!this.filteredMenuItems[this.role][index].isActive) {
        setTimeout(() => {
          this.moveArrayElements(this.filteredMenuItems[this.role], index, true)
          this.saveList()
        }, 100)
      } else {
        setTimeout(() => {
          this.moveArrayElements(this.filteredMenuItems[this.role], index, false)
          this.saveList()
        }, 100)
      }
      return false;
    },
  },
}
</script>
