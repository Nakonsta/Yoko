<template>
  <ValidationObserver ref="form1" tag="div" mode="eager">
    <form class="support-form__form" @submit.prevent="(evt) => evt.preventDefault()" slot-scope="{ valid }">
      <h3>Шаг 2: Заполните данные об Организации</h3>
      <div class="popup__tabs">
        <label><input type="radio" name="type" value=0 v-model="dataForm.oldCompany"/>
          <span>Новая компания</span>
        </label>
        <label><input type="radio" name="type" value=1 v-model="dataForm.oldCompany"/>
          <span>Уже зарегистрирована</span>
        </label>
      </div>
      <div v-if="dataForm.oldCompany === '0'">
        <select-input
            v-model="dataForm.currentCountryOfRegistration"
            label="Страна регистрации"
            :options="lists.countries"
        ></select-input>
        <checkbox-input
            rules="required:true"
            :withIcon="true"
            icon="customer"
            name="clientType"
            v-model="dataForm.clientType"
            :label="[
              {label: 'Регистрация в качестве заказчика', icon: './img/sprite.svg#customer'},
              {label: 'Регистрация в качестве поставщика', icon: './img/sprite.svg#provider'},
            ]"
        ></checkbox-input>
        <radio-input
            name="organizationType"
            v-model="dataForm.organizationType"
            :label="[
              {label: 'Юридическое лицо', value: 'LEGAL_ENTITY'},
              {label: 'Индивидуальный предприниматель', value: 'INDIVIDUAL'}
            ]"
        ></radio-input>
        <text-input
            v-model="dataForm.inn"
            label="ИНН"
            type="tel"
            :rules="
              dataForm.organizationType === 'LEGAL_ENTITY'
                ? 'required|length:12'
                : 'required|length:14'
            "
            :mask="
              dataForm.organizationType === 'LEGAL_ENTITY'
                ? '#### #### ##'
                : '#### #### ####'
            "
        ></text-input>
        <select-input
            v-if="dataForm.clientType.find((item) => item === 1)"
            v-model="dataForm.offeredProductsAndServices"
            class="field__container field__container--tags"
            :options="lists.productsAndServicesOKVED"
            label="ОКВЭД"
            :multiple="true"
            :searchable="true"
            :loading="loadingOKVEDSearch"
            :select="onSelectOKVED"
            :remove="onRemoveOKVED"
            :search="getSearchListOKVED"
        ></select-input>
        <select-input
            v-if="dataForm.clientType.find((item) => item === 2)"
            v-model="dataForm.consumedProductsAndServices"
            class="field__container field__container--tags"
            :options="lists.productsAndServicesOKPD2"
            label="ОКПД-2"
            :multiple="true"
            :searchable="true"
            :loading="loadingOKPD2Search"
            :select="onSelectOKPD"
            :remove="onRemoveOKPD"
            :search="getSearchListOKPD2"
        ></select-input>
      </div>
      <div v-if="dataForm.oldCompany === '1'">
        <ValidationProvider
            name="ИНН"
            v-slot="{ errors, failed }"
            rules="required"
            tag="div"
            class="field__container field__container--single"
        >
          <span class="field__label">ИНН</span>
          <multiselect
              v-model="companyId"
              :options="searchResultInn"
              placeholder="Введите название"
              :class="{field: true, error: failed}"
              selectedLabel=""
              selectLabel=""
              deselectLabel=""
              track-by="id"
              label="inn"
              open-direction="bottom"
              :loading="loadingSearch"
              :internalSearch="true"
              :preserveSearch="false"
              :closeOnSelect="true"
              @search-change="searchInn"
          >
            <template
                slot="singleLabel"
                slot-scope="{ option }"
            >
              {{ option.inn }}
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
            <span slot="noOptions">Компании с таким ИНН не найдены</span>
          </multiselect>
        </ValidationProvider>
      </div>
      <div class="btn-flex field__container">
        <button class="btn btn--bdr" @click="prevStep">
          Вернуться на шаг 1
        </button>
        <button class="btn" @click="nextStep">
          Сохранить и продолжить
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import PhoneCodeCountries from '../phoneCodeCountries.vue'
import SelectInput from '../forms/Select.vue'
import TextInput from '../forms/Input.vue'
import CheckboxInput from '../forms/Checkbox.vue'
import RadioInput from '../forms/Radio.vue'
import api from "../../helpers/api";

export default {
  name: 'formStep2',
  components: {
    PhoneCodeCountries,
    SelectInput,
    CheckboxInput,
    TextInput,
    RadioInput
  },
  mixins: [api],
  props: {
    step: {
      default: 1,
      type: Number,
    },
    dataForm: {
      default: null,
      type: Object,
    },
    lists: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      active: false,
      searchResultInn: [],
      searchFlag: null,
      searchInput: '',
      loadingSearch: false,
      companyId: null,
      loadingOKPD2Search: false,
      searchOKPD2: '',
      loadingOKVEDSearch: false,
      searchOKVED: '',
      searchOKPD2Counter: null,
      searchOKVEDCounter: null,
    }
  },
  methods: {
    setActive(e) {
      console.log(e)
      this.active = !this.active
    },
    toggleFunction(option, array, bool) {
      let index = this.lists[array].findIndex(item => item.name === option.name)
      this.lists[array][index].checked = bool
    },
    onSelectOKVED (option) {
      this.toggleFunction(option, 'productsAndServicesOKVED', true)
    },
    onRemoveOKVED (option) {
      this.toggleFunction(option, 'productsAndServicesOKVED', false)
    },
    onSelectOKPD (option) {
      this.toggleFunction(option, 'productsAndServicesOKPD2', true)
    },
    onRemoveOKPD (option) {
      this.toggleFunction(option, 'productsAndServicesOKPD2', false)
    },
    parseOKPD2OKVED(arr) {
      return arr.map((item) => {
        return {
          code: item.code,
          id: item.id,
          checked: false,
          subunit: item.code.match(/\./g) && item.code.match(/\./g).length === 1,
          subSubunit: item.code.match(/\./g) && item.code.match(/\./g).length === 2,
          name: `${item.code} ${item.name}`,
        }
      })
    },
    getSearchListOKVED(string) {
      clearInterval(this.searchOKVEDCounter)
      this.loadingOKVEDSearch = true
      if (string && string.length > 1) {
        this.searchOKVEDCounter = setTimeout(() => {
          this.searchProceduresOKVED(string)
              .then((response) => {
                this.lists.productsAndServicesOKVED = this.parseOKPD2OKVED(
                    response.data.data,
                )
                this.loadingOKVEDSearch = false
              })
              .catch((e) => {
                console.log(e)
                this.loadingOKVEDSearch = false
              })
        }, 1000)
      } else {
        this.loadingOKVEDSearch = false
      }
    },
    getSearchListOKPD2(string) {
      clearInterval(this.searchOKPD2Counter)
      this.loadingOKPD2Search = true
      if (string && string.length > 1) {
        this.searchOKPD2Counter = setTimeout(() => {
          this.searchProceduresOKPD2(string)
              .then((response) => {
                this.lists.productsAndServicesOKPD2 = this.parseOKPD2OKVED(
                    response.data.data,
                )
                this.loadingOKPD2Search = false
              })
              .catch((e) => {
                console.log(e)
                this.loadingOKPD2Search = false
              })
        }, 1000)
      } else {
        this.loadingOKPD2Search = false
      }
    },
    getRegisteredCompany(id) {
      window.openLoader()
      this.fetchRegisteredCompanyFull(id)
          .then(({data}) => {
            this.$emit('updateDataRegisteredCompany', data.data)
            this.$emit('newStep', 3)
            window.closeLoader()
          })
          .catch(() => {
            window.notificationError('Ошибка сервера. Информация зарегистрированной компании недоступна')
            window.closeLoader()
          })
    },
    prevStep() {
      this.$emit('newStep', 1)
    },
    nextStep() {
      if (this.step === 2) {
        this.$refs.form1.validate().then((res) => {
          if(res) {
            if (this.dataForm.oldCompany === '1') {
              this.getRegisteredCompany(this.companyId.id)
            } else {
              const inn = this.dataForm.inn.replace(/\s/g, '')
              this.fetchInn(inn)
                  .then(({data}) => {
                    const arrInn = data.data
                    const isOldCompany = arrInn.find((item) => item.inn === inn)
                    if (isOldCompany) {
                      this.dataForm.oldCompany = '1'
                      this.companyId = isOldCompany.id
                      this.getRegisteredCompany(this.companyId)
                    } else {
                      this.$emit('newStep', 3)
                    }
                  })
                  .catch((response) => {
                    window.notificationError('Ошибка сервера. Ошибка проверки ИНН')
                  })
            }
          }
        })
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
  },
}
</script>

<style lang="scss">
  .field__container--tags {
    .multiselect {
      &--active {
        .multiselect__tags {
          height: 60px !important
        }
      }
    }
  }
  .field__container--single {
    .multiselect {
      &__input {
        margin-top: 5px;
      }
    }
  }
</style>
