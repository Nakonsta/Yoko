<template>
  <div
    class="nav-inner"
    :class="{ fullMode: windowWidth < 1025 || fullMode }"
  >
    <a
      v-if="windowWidth < 1025 || fullMode"
      class="nav-inner__mobile popup-link"
      href="#menu"
    >
      <svg class="sprite-menu">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="/img/sprite.svg#menu"
        />
      </svg>
      Меню
    </a>
    <div
      id="menu"
      :class="{ popup: windowWidth < 1025 || fullMode }"
    >
      <div class="nav-inner__content">
        <div :class="{ popup__content: windowWidth < 1025 || fullMode }">
          <div
            v-if="windowWidth < 1025 || fullMode"
            class="hide-menu-ico popup__close"
            @click="closeModal"
          >
            <svg class="sprite-close">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="/img/sprite.svg#close"
              />
            </svg>
          </div>
          <div class="nav-inner__head">
            <span v-if="!search.isVisible">Меню</span>
            <text-input
              v-if="search.isVisible"
              v-model="search.text"
              parent-class=""
              :rules="{ required: false }"
              placeholder="Поиск по разделам"
              :input="filterMenuList"
            />
            <div
              v-if="this.notEmptyAccreditedCompanies"
              class="nav-icons"
            >
              <div
                v-if="!search.isVisible"
                :class="{ active: enabled }"
                @click="enabled = !enabled"
              >
                <svg class="sprite-settings">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="/img/sprite.svg#settings"
                  />
                </svg>
              </div>
              <div @click="searchList">
                <svg
                  v-if="!search.isVisible"
                  class="sprite-search"
                >
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="/img/sprite.svg#search"
                  />
                </svg>
                <svg
                  v-else
                  class="sprite-close"
                >
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="/img/sprite.svg#close"
                  />
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
              v-for="(item, i) in hideMenu(filteredMenuItems[role])"
              v-if="enabled ? true : item.isActive"
              :key="i"
            >
              <template>
                <div
                  v-if="item.subItems.length"
                  class="nav-inner__item"
                  :class="{ parent: item.subItems.length, active: activeIndex === i }"
                  @click="showSubMenu(i)"
                >
                  <span
                    class="nav-inner__link"
                    :class="{ disabled: !item.isActive }"
                  >
                    <span v-text="item.title" />
                  </span>
                  <div
                    v-if="item.subItems.length"
                    class="open-menu"
                  >
                    <svg
                      class="sprite-arrow"
                      :class="{ active: activeIndex === i }"
                    >
                      <use
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xlink:href="/img/sprite.svg#arrow-right"
                      />
                    </svg>
                  </div>
                  <div
                    v-if="enabled"
                    class="switch"
                    @click="enabledSwitch(i)"
                  >
                    <span
                      class="slider"
                      :class="{ active: item.isActive }"
                    />
                  </div>
                </div>
                <router-link
                  v-else
                  router
                  exact
                  :to="!enabled ? item.to : ''"
                  class="nav-inner__item"
                >
                  <span
                    class="nav-inner__link"
                    :class="{ disabled: !item.isActive }"
                  >
                    <span v-text="item.title" />
                  </span>
                  <div
                    v-if="enabled"
                    class="switch"
                    @click="enabledSwitch(i)"
                  >
                    <span
                      class="slider"
                      :class="{ active: item.isActive }"
                    />
                  </div>
                </router-link>
              </template>
              <div
                v-if="activeIndex === i"
                class="submenu"
              >
                <router-link
                  v-for="(el, i) in item.subItems"
                  :key="i"
                  router
                  exact
                  class="nav-inner__item-sub"
                  :to="el.to"
                >
                  <span v-text="el.title" />
                </router-link>
              </div>
            </div>
          </draggable>
          <were-problems
            :reset-list="resetList"
            :set-if="enabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import api from '../../helpers/api';
import functions from '../../helpers/functions';
import WereProblems from '../wereProblems.vue';
import TextInput from '../forms/Input.vue';

export default {
  name: 'Menu',
  components: {
    WereProblems,
    draggable,
    TextInput,
  },
  mixins: [api, functions],
  props: {
    fullMode: {
      default: false,
      type: Boolean,
    },
    windowWidth: {
      default: 0,
      type: Number,
    },
  },
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
            title: 'Рабочий стол пользователя',
            to: '/personal',
            order: 0,
            availableAll: true, // ключ для пунктов меню, которые доступны пользователю без аккредитации компаний
            isActive: true,
            subItems: [],
          },
          {
            icon: 'mdi-home',
            title: 'Профиль организации',
            to: '/personal/company',
            order: 1,
            availableAll: true, // ключ для пунктов меню, которые доступны пользователю без аккредитации компаний
            isActive: true,
            subItems: [
              {
                title: 'Пользователи',
                to: '/personal/company/users',
              },
              {
                title: 'Общая информация',
                to: '/personal/company/info',
              },
            ],
          },
          {
            icon: 'mdi-buffer',
            title: 'Торговые процедуры',
            to: '/personal/procedures',
            order: 2,
            isActive: true,
            subItems: [
              {
                title: 'Список процедур',
                to: '/personal/procedures',
              },
              {
                title: 'Создание процедуры',
                to: '/personal/procedures/new',
              },
              {
                title: 'Черновики процедур',
                to: '/personal/procedures/drafts',
              },
            ],
          },
          {
            icon: 'mdi-buffer',
            title: 'Заявки на аккредитацию',
            to: '/personal/accreditations',
            order: 3,
            availableAll: true,
            isActive: true,
            subItems: [
              {
                title: 'Список заявок',
                to: '/personal/accreditations',
              },
              {
                title: 'Создание заявки',
                to: '/personal/accreditations/new',
              },
            ],
          },
          {
            icon: 'mdi-home',
            title: 'Мои данные',
            to: '/personal/user',
            order: 4,
            isActive: true,
            subItems: [],
          },
        ],
        contractor: [
          {
            icon: 'mdi-home',
            title: 'Рабочий стол пользователя',
            to: '/personal',
            order: 0,
            availableAll: true,
            isActive: true,
            subItems: [],
          },
          {
            icon: 'mdi-home',
            title: 'Профиль организации',
            to: '/personal/company',
            order: 1,
            availableAll: true, // ключ для пунктов меню, которые доступны пользователю без аккредитации компаний
            isActive: true,
            subItems: [
              {
                title: 'Общая информация',
                to: '/personal/company/info',
              },
            ],
          },
          {
            icon: 'mdi-buffer',
            title: 'Каталог',
            to: '/personal/catalog',
            order: 2,
            isActive: true,
            subItems: [
              {
                title: 'Список продукции',
                to: '/personal/catalog',
              },
              {
                title: 'Добавление продукции',
                to: '/personal/catalog/new',
              },
              {
                title: 'Заявки на добавление продукции',
                to: '/personal/catalog/positions',
              },
            ],
          },
          {
            icon: 'mdi-buffer',
            title: 'Торговые процедуры',
            to: '/personal/procedures',
            order: 3,
            isActive: true,
            subItems: [
              {
                title: 'Список процедур',
                to: '/personal/procedures',
              },
              {
                title: 'Участие в процедурах',
                to: '/personal/procedures/applications',
              },
            ],
          },
          {
            icon: 'mdi-buffer',
            title: 'Заявки на участие в процедурах',
            to: '/personal/applications',
            order: 3,
            isActive: true,
            subItems: [
              {
                title: 'Список заявок',
                to: '/personal/applications'
              },
              {
                title: 'Список заявок-черновиков',
                to: '/personal/applications/drafts'
              },
            ]
          },
          {
            icon: 'mdi-buffer',
            title: 'Заявки на аккредитацию',
            to: '/personal/accreditations',
            order: 4,
            availableAll: true,
            isActive: true,
            subItems: [
              {
                title: 'Список заявок',
                to: '/personal/accreditations',
              },
              {
                title: 'Создание заявки',
                to: '/personal/accreditations/new',
              },
            ],
          },
          {
            icon: 'mdi-home',
            title: 'Мои данные',
            to: '/personal/user',
            order: 5,
            isActive: true,
            subItems: [],
          },
        ],
        guest: [],
      },
      filteredMenuItems: [],
    };
  },
  computed: {
    notEmptyAccreditedCompanies() {
      const role = this.$store.getters.userRole;
      const companyBuyer = this.$store.getters.companyBuyer;
      const companyContractor = this.$store.getters.companyContractor;

      switch (role) {
        case 'buyer':
          return !!companyBuyer.length;
          break;
        case 'contractor':
          return !!companyContractor.length;
          break;
        default:
          return false;
          break;
      }
    },
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
    this.filteredMenuItems = this.menuItems;
  },
  methods: {
    hideMenu(arr) {
      if (!this.notEmptyAccreditedCompanies) {
        return arr.filter((item) => item.availableAll);
      }
      return arr;
    },
    showSubMenu(index) {
      if (this.activeIndex === index) {
        this.activeIndex = undefined;
      } else {
        this.activeIndex = index;
      }
    },
    resetList() {
      this.filteredMenuItems[this.role] = this.filteredMenuItems[this.role]
        .sort((one, two) => one.order - two.order)
        .map((item) => ({ ...item, isActive: true }));
      this.saveList();
    },
    saveList() {
      this.sendSettingsData('menu', encodeURIComponent(JSON.stringify(this.filteredMenuItems)));
    },
    filterMenuList(event) {
      this.filteredMenuItems = {
        ...this.filteredMenuItems,
        [this.role]: this.menuItems[this.role].filter((item) => item.title.toLowerCase().includes(event.target.value.toLowerCase())),
      };
    },
    searchList() {
      this.search.isVisible = !this.search.isVisible;
      if (!this.search.isVisible) {
        this.search.text = null;
        this.filterMenuList({ target: { value: '' } });
      }
    },
    closeModal() {
      closePopupById('#menu');
    },
    enabledSwitch(index) {
      this.filteredMenuItems[this.role][index].isActive = !this.filteredMenuItems[this.role][index].isActive;
      if (!this.filteredMenuItems[this.role][index].isActive) {
        setTimeout(() => {
          this.moveArrayElements(this.filteredMenuItems[this.role], index, true);
          this.saveList();
        }, 100);
      } else {
        setTimeout(() => {
          this.moveArrayElements(this.filteredMenuItems[this.role], index, false);
          this.saveList();
        }, 100);
      }
      return false;
    },
  },
};
</script>
