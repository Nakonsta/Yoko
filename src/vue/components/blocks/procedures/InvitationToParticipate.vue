<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Приглашение к участию</h3>
    <div class="row">
      <div class="col col-md-6 col-xs-12">
        <h4>Зарегистрированные пользователи</h4>
        <div class="field-group field-group--null">
          <ValidationProvider
              v-slot="{ errors, failed }"
              tag="div"
              class="field__container field__container--single"
          >
            <multiselect
                v-model="companyId"
                class="form-select"
                :options="searchResultInn"
                placeholder="Введите название компании или ИНН"
                :class="{field: true, error: failed}"
                selectedLabel=""
                selectLabel=""
                deselectLabel=""
                track-by="id"
                label="name"
                :loading="loadingSearch"
                :internal-search="false"
                :closeOnSelect="true"
                @search-change="searchInn"
            >
              <template
                  slot="singleLabel"
                  slot-scope="{ option }"
              >
                {{ option.name }}
              </template>
              <template slot="option" slot-scope="{ option }">
                <div class="company-search">
                  <div class="company-search__name">
                    {{ option.name }}
                  </div>
                  <div class="company-search__inn">ИНН {{ option.inn }}</div>
                </div>
              </template>
              <span slot="noResult">Компании с таким ИНН не найдены</span>
              <span slot="noOptions">Список пуст</span>
            </multiselect>
          </ValidationProvider>
          <button :disabled="!companyId" class="btn" @click="() => addCompany(companyId)">
            Добавить
          </button>
        </div>
        <table v-if="selectedData.invitedCompanies.length" class="table invitation-list">
          <thead>
          <tr>
            <th>№</th>
            <th>Название</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in selectedData.invitedCompanies" class="invitation-list__item" :key="index">
            <td>
              <span>{{ index+1 }}</span>
            </td>
            <td class="relative">
              {{ item }}
              <div class="invitation-list__remove" @click="removeItem('invitedCompanies', index)">
                <svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col col-md-6 col-xs-12">
        <h4>Не зарегистрированные пользователи</h4>
        <div class="field-group field-group--null">
          <text-input
              v-model="emailId"
              validationName="email"
              placeholder="Введите Email"
              :rules="{ required: false, email: true }"
          ></text-input>
          <button :disabled="!emailId" class="btn" @click="() => addEmail(emailId)">
            Добавить
          </button>
        </div>
        <table v-if="selectedData.invitedEmails.length" class="table invitation-list">
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in selectedData.invitedEmails" class="invitation-list__item" :key="index">
              <td>
                <span>{{ index+1 }}</span>
              </td>
              <td class="relative">
                {{ item }}
                <div class="invitation-list__remove" @click="removeItem('invitedEmails', index)">
                  <svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectInput from '../../forms/Select.vue'
  import TextInput from '../../forms/Input.vue'
  import api from "../../../helpers/api";

  export default {
    name: 'InvitationToParticipate',
    components: {
      SelectInput,
      TextInput,
    },
    mixins: [api],
    props: {
      selectedData: {
        default: null,
        type: Object,
      },
      procedureIdData: {
        default: null,
        type: Object,
      },
      fieldsData: {
        default: null,
        type: Object,
      },
      isCreatedProcedure: {
        default: false,
        type: Boolean,
      },
    },
    data() {
      return {
        searchResultInn: [],
        searchFlag: null,
        emailId: null,
        searchInput: '',
        loadingSearch: false,
        companyId: null,
      }
    },
    methods: {
      removeItem(array, key) {
        this.selectedData[array].splice(key, 1);
      },
      addCompany(event) {
        this.companyId = null
        this.selectedData.invitedCompanies.push(event.name)
      },
      addEmail(event) {
        const pattern = /^[0-9a-zA-z]([.-]?\w+)*@[0-9a-z]([.-]?[0-9a-zA-z])*(\.[0-9a-zA-z]{2,4})+$/
        if (event.search(pattern) === 0) {
          this.emailId = null
          this.selectedData.invitedEmails.push(event)
        }
      },
      searchInn(value) {
        clearInterval(this.searchFlag)
        this.loadingSearch = true
        this.searchFlag = setTimeout(() => {
          this.fetchInn(value)
              .then(({data}) => {
                this.searchResultInn = data.data
                this.loadingSearch = false
              })
              .catch(() => {
                this.loadingSearch = false
                window.notificationError('Ошибка сервера. Поиск по ИНН не доступен')
              })
        }, 1000)
      },
    }
  }
</script>

<style scoped lang="scss">
.invitation-list {
  width: 90%;
  thead {
    text-align: left;
    color: #9B9B9A;
    th {
      font-weight: 500;
    }
  }
  &__item {
    position: relative;
    border-bottom: 1px solid #CDCDCC;
    height: 48px;
    span {
      width: 25px;
      margin-right: 10px;
    }
  }
  &__remove {
    position: absolute;
    right: -40px;
    top: 15px;
    svg {
      height: 20px;
      width: 20px;
    }
  }
}
.btn {
  max-width: 160px;
}
h4 {
  font-size: 20px;
  font-weight: 500;
}
</style>
