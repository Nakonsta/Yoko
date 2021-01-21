<template>
  <div v-if="
    selectedData.tender_available &&
    selectedData.tender_available.id === 0 &&
    (procedureIdData.procedureType == 'Auction' ||
      procedureIdData.procedureType == 'FromSupplier' ||
      procedureIdData.procedureType === 'Contest')
    "
    class="container-item"
  >
    <h3 class="procedure__main-title">Приглашение к участию</h3>
    <div class="row">
      <div class="col col-lg-6 col-xs-12">
        <h4>Зарегистрированные пользователи</h4>
        <div class="field-group field-group--null">
          <ValidationProvider
              v-slot="{ errors, failed }"
              tag="div"
              class="field__container field__container--single field__container--search"
          >
            <multiselect
                v-model="companyId"
                class="form-select form-select--stay"
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
                :disabled="isCreatedProcedure"
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
          <button :disabled="!companyId || isCreatedProcedure" class="btn" @click="() => addCompany(companyId)">
            Добавить
          </button>
        </div>
        <table v-if="selectedData.invitedCompanies.length" class="table table--thin invitation-list">
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
      <div class="col col-lg-6 col-xs-12">
        <h4>Не зарегистрированные пользователи</h4>
        <div class="field-group field-group--null">
          <text-input
              v-model="emailId"
              :disabled="isCreatedProcedure"
              validationName="email"
              placeholder="Введите Email"
              :rules="{ required: false, email: true }"
          ></text-input>
          <button :disabled="!emailId || isCreatedProcedure" class="btn" @click="() => addEmail(emailId)">
            Добавить
          </button>
        </div>
        <div class="row field__container">
          <div class="col mb1">
            <a href="/content/template-email.xlsx" class="btn btn--bdr" :disabled="isCreatedProcedure">
              Скачать шаблон
            </a>
          </div>
          <div class="col mb1">
            <button class="btn fileType">
              <input type="file" ref="file" accept=".xls, .xlsx" class="btn" @change="importEmail" :disabled="isCreatedProcedure">
              Загрузить шаблон
            </button>
          </div>
        </div>
        <table v-if="selectedData.invitedEmails.length" class="table table--thin invitation-list">
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="emailIndex <= selectedData.invitedEmails.length" v-for="emailIndex in emailToShow" class="invitation-list__item" :key="emailIndex">
              <td>
                <span>{{ emailIndex }}</span>
              </td>
              <td class="relative">
                {{ selectedData.invitedEmails[emailIndex - 1] }}
                <div class="invitation-list__remove" @click="removeItem('invitedEmails', emailIndex - 1)">
                  <svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <a v-if="showMore" href="#" class="btn-link" @click.prevent="viewMore">Показать еще</a>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectInput from '@/components/forms/Select.vue'
  import TextInput from '@/components/forms/Input.vue'
  import api from "@/helpers/api"
  import XLSX from 'xlsx/xlsx'

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
        showMore: false,
        emailToShow: 5,
        pattern: /^[0-9a-zA-z]([.-]?\w+)*@[0-9a-z]([.-]?[0-9a-zA-z])*(\.[0-9a-zA-z]{2,4})+$/,
        metatypes: [
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ],
        searchResultInn: [],
        searchFlag: null,
        emailId: null,
        searchInput: '',
        loadingSearch: false,
        companyId: null,
      }
    },
    methods: {
      importEmail(evt) {
        const getFile = evt.target.files[0];
        if (!this.metatypes.length || this.metatypes.indexOf(getFile.type) !== -1) {
          this.checkFile(getFile)
        } else {
          window.notificationError(
              'Вы пытаетесь загрузить файл неверного формата. Разрешенные форматы xls, xlsx'
          )
        }
        this.$refs.file.value = ''
      },
      checkFile(file) {
        window.openLoader();
        const reader = new FileReader();
        FileReader.onerror = () => {
          window.notificationError('Ошибка импорта из файла');
          window.closeLoader();
        };
        reader.onload = (e) => {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {type: 'binary'});
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws, {header: 1}); // get array
          data.splice(0, 1);
          const result = data.filter(e => e.length);
          if (result.length < 2) {
            window.closeLoader();
            return;
          }
          if (result.length) {
            this.selectedData.invitedEmails = [];
            result.map((item) => {
              if (this.pattern.test(item)) {
                this.selectedData.invitedEmails.push(item[0])
              }
            })
            this.showMore = this.selectedData.invitedEmails.length > 5
            window.closeLoader();
          }
        };
        reader.readAsBinaryString(file);
      },
      viewMore() {
        this.emailToShow += 5
        this.showMore = this.emailToShow === this.selectedData.invitedEmails.length
      },
      removeItem(array, key) {
        this.selectedData[array].splice(key, 1);
      },
      addCompany(event) {
        this.companyId = null
        this.selectedData.invitedCompanies.push(event.inn)
      },
      addEmail(event) {
        if (event.search(this.pattern) === 0) {
          this.emailId = null
          this.selectedData.invitedEmails.push(event)
        }
      },
      searchInn(value) {
        clearInterval(this.searchFlag)
        if (value && value.length > 2) {
          this.loadingSearch = true
          this.searchFlag = setTimeout(() => {
            this.fetchCompaniesByInnByName(value)
                .then(({data}) => {
                  this.searchResultInn = data.data.elements
                  this.loadingSearch = false
                })
                .catch(() => {
                  this.loadingSearch = false
                  window.notificationError('Ошибка сервера. Поиск компаний не доступен')
                })
          }, 1000)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
.invitation-list {
  width: 90%;
  margin-bottom: 20px;
  td:first-child {
    max-width: 100px;
    width: 100px;
  }
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
    z-index: 9;
    cursor: pointer;
    svg {
      height: 20px;
      width: 20px;
    }
  }
}
.field-group--null .btn {
  max-width: 160px;
  min-width: 160px;
}
h4 {
  font-size: 20px;
  font-weight: 500;
}
</style>
