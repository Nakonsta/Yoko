<template>
  <div class="registration">
    <div class="stepper">
      <div class="stepper-header">
        <div
          class="stepper-point"
          :class="{complete: step > 0}"
        />
        <div
          class="stepper-point"
          :class="{complete: step > 1}"
        />
        <div
          class="stepper-point"
          :class="{complete: step > 2}"
        />
      </div>
      <div class="stepper-body">
        <div class="row between-xs">
          <div class="col col-lg-5 col-md-6 col-xs-12 registration__form">
            <div v-if="step === 1">
              <form-step1
                :data-form="forms.form1"
                :lists="lists"
                :step="step"
                @newStep="setStep"
              />
            </div>
            <div v-if="step === 2">
              <form-step2
                :data-form="forms.form2"
                :lists="lists"
                :step="step"
                @newStep="setStep"
                @updateDataRegisteredCompany="updateDataRegisteredCompany"
              />
            </div>
            <div v-if="step === 3">
              <form-step3
                :data-form="forms.form3"
                :organization-type="forms.form2.organizationType"
                :old-company="forms.form2.oldCompany"
                :inn="forms.form2.inn"
                :lists="lists"
                :step="step"
                @resetCompany="resetCompany"
                @newStep="setStep"
                @startRegistration="registration"
              />
            </div>
          </div>
          <div class="col col-lg-5 col-md-6 col-xs-12 registration__info">
            <div class="registration__tab">
              <demands />
            </div>
            <div class="registration__tab">
              <gis />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import functions from '@/helpers/functions';
import FormStep1 from './components/registration/formStep1.vue';
import FormStep2 from './components/registration/formStep2.vue';
import FormStep3 from './components/registration/formStep3.vue';
import demands from './components/registration/demands.vue';
import gis from './components/registration/gis.vue';
import api from './helpers/api';
import authorizationMixins from './helpers/authorizationMixins';

export default {
  name: 'App',
  components: {
    FormStep1,
    FormStep2,
    FormStep3,
    demands,
    gis,
  },
  mixins: [api, authorizationMixins, functions],
  data() {
    return {
      step: 1,
      lists: {
        countries: [
          {
            label: 'Россия',
            value: 234,
          },
          {
            label: 'Бельгия',
            value: 456,
          },
        ],
        productsAndServicesOKPD2: [],
        productsAndServicesOKVED: [],
      },
      forms: {
        form1: {
          firstName: '',
          lastName: '',
          secondName: '',
          email: '',
          position: '',
          phone: '',
          password: '',
          passwordRepeat: '',
          currentPhoneCode: {
            id: 0,
            name: '',
            phoneCode: 0,
            flag: '',
          },
        },
        form2: {
          inn: '',
          clientType: [],
          oldCompany: '0',
          organizationType: 'LEGAL_ENTITY',
          currentCountryOfRegistration: null,
          offeredProductsAndServices: [],
          consumedProductsAndServices: [],
        },
        form3: {
          fullCompanyName: '',
          abbreviatedName: '',
          ogrn: '',
          kpp: '',
          okpo: '',
          rs: '',
          ks: '',
          bik: '',
          directorFio: '',
          smallBusinessFlag: false,
          declarationFile: undefined,
          legalAddress: {
            country: null,
            address: '',
            mailIndex: '',
          },
          actualAddress: {
            coincidesLegalAddress: false,
            country: null,
            address: '',
            mailIndex: '',
          },
          mailAddress: {
            coincidesLegalAddress: false,
            country: null,
            address: '',
            mailIndex: '',
          },
        },
      },
    };
  },
  created() {
    window.openLoader();
    this.fetchCountries()
      .then((data) => {
        this.lists.countries = data.data.data;
        this.setStartValueCountries(
          this.lists.countries.find((country) => country.phone_code === 7),
        );
        window.closeLoader();
      })
      .catch(() => {
        window.closeLoader();
        window.notificationError('Ошибка сервера. Регистрация не доступна.');
      });
    this.getFieldsData();
  },
  methods: {
    resetCompany() {
      this.forms.form3 = {
        fullCompanyName: '',
        abbreviatedName: '',
        ogrn: '',
        kpp: '',
        okpo: '',
        rs: '',
        ks: '',
        bik: '',
        directorFio: '',
        smallBusinessFlag: false,
        declarationFile: undefined,
        legalAddress: {
          country: null,
          address: '',
          mailIndex: '',
        },
        actualAddress: {
          coincidesLegalAddress: false,
          country: null,
          address: '',
          mailIndex: '',
        },
        mailAddress: {
          coincidesLegalAddress: false,
          country: null,
          address: '',
          mailIndex: '',
        },
      };
    },
    parseOKPD2OKVED(arr) {
      return arr.map((item) => ({
        code: item.code,
        id: item.id,
        checked: false,
        subunit: item.code.match(/\./g) && item.code.match(/\./g).length === 1,
        subSubunit: item.code.match(/\./g) && item.code.match(/\./g).length === 2,
        name: `${item.code} ${item.name}`,
      }));
    },
    setStep(value) {
      this.step = value;
    },
    updateDataRegisteredCompany(data) {
      this.forms.form2.inn = data.inn;

      this.forms.form3 = {
        id: data.id,
        fullCompanyName: data.name,
        abbreviatedName: data.shortName,
        ogrn: data.ogrn,
        kpp: data.kpp,
        okpo: data.okpo,
        rs: data.rs,
        ks: data.ks,
        bik: data.bik,
        directorFio: data.directorFio,
        smallBusinessFlag: false,
        legalAddress: {
          country: data.legalCountry,
          address: data.legalAddress,
          mailIndex: data.legalPostcode,
        },
        actualAddress: {
          coincidesLegalAddress: false,
          country: data.country,
          address: data.address,
          mailIndex: data.postcode,
        },
        mailAddress: {
          coincidesLegalAddress: false,
          country: data.mailingCountry,
          address: data.mailingAddress,
          mailIndex: data.mailingPostcode,
        },
      };
    },
    setStartValueCountries(country) {
      this.forms.form1.currentPhoneCode = country;
      this.forms.form2.currentCountryOfRegistration = country;
      this.forms.form3.legalAddress.country = country;
      this.forms.form3.actualAddress.country = country;
      this.forms.form3.mailAddress.country = country;
    },
    getFieldsData() {
      this.fetchProceduresOKPD2('okpd')
        .then(({ data }) => {
          this.lists.productsAndServicesOKPD2 = this.parseOKPD2OKVED(
            data.data.items,
          );
        })
        .catch((e) => {
          console.log(e);
        });
      this.fetchProceduresOKPD2('okved')
        .then(({ data }) => {
          this.lists.productsAndServicesOKVED = this.parseOKPD2OKVED(
            data.data.items,
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    registration() {
      const data = {
        login: this.forms.form1.email,
        password: this.forms.form1.password,
        lastName: this.forms.form1.lastName,
        name: this.forms.form1.firstName,
        secondName: this.forms.form1.secondName,
        phone: this.forms.form1.phone.replace(/[+()-\s]/g, ''),
        position: this.forms.form1.position,
      };

      if (this.forms.form2.oldCompany === '1') {
        data.company = {
          id: this.forms.form3.id,
        };
      } else {
        const coincidesLegalAddressA = this.forms.form3.actualAddress
          .coincidesLegalAddress;
        const coincidesLegalAddressM = this.forms.form3.mailAddress
          .coincidesLegalAddress;
        data.company = {
          name: this.forms.form3.fullCompanyName,
          shortName: this.forms.form3.abbreviatedName,
          regCountry: this.forms.form2.currentCountryOfRegistration.id,
          legalType: this.forms.form2.organizationType,
          inn: this.forms.form2.inn.replace(/\s/g, ''),
          kpp:
              this.forms.form2.organizationType === 'LEGAL_ENTITY'
                ? this.forms.form3.kpp.replace(/\s/g, '')
                : null,
          ogrn: this.forms.form3.ogrn.replace(/\s/g, ''),
          okpo: this.forms.form3.okpo.replace(/\s/g, ''),
          rs: this.forms.form3.rs.replace(/\s/g, ''),
          ks: this.forms.form3.ks.replace(/\s/g, ''),
          bik: this.forms.form3.bik.replace(/\s/g, ''),
          directorFio: this.forms.form3.directorFio,
          legalCountry: parseInt(this.forms.form3.legalAddress.country.id),
          legalAddress: this.forms.form3.legalAddress.address,
          legalPostcode: this.forms.form3.legalAddress.mailIndex,
          country: coincidesLegalAddressA
            ? parseInt(this.forms.form3.legalAddress.country.id)
            : parseInt(this.forms.form3.actualAddress.country.id),
          address: coincidesLegalAddressA
            ? this.forms.form3.legalAddress.address
            : this.forms.form3.actualAddress.address,
          postcode: coincidesLegalAddressA
            ? this.forms.form3.legalAddress.mailIndex
            : this.forms.form3.actualAddress.mailIndex,
          mailingCountry: coincidesLegalAddressM
            ? parseInt(this.forms.form3.legalAddress.country.id)
            : parseInt(this.forms.form3.mailAddress.country.id),
          mailingAddress: coincidesLegalAddressM
            ? this.forms.form3.legalAddress.address
            : this.forms.form3.mailAddress.address,
          mailingPostcode: coincidesLegalAddressM
            ? this.forms.form3.legalAddress.mailIndex
            : this.forms.form3.mailAddress.mailIndex,
          groups: this.forms.form2.clientType,
          declaration: this.forms.form3.smallBusinessFlag
            ? this.forms.form3.declarationFile
            : null,
        };
      }

      window.openLoader();

      console.log(data);

      const fData = this.objectToFormDataJava(data);

      this.sendRegistrationData(fData)
        .then(({ data }) => {
          window.notificationSuccess('Пользователь успешно зарегистрирован!');
          window.closeLoader();
          const user = data.data.user;
          const token = data.data.token;

          this.authorizationMethod(user, token, {
            rememberMe: false,
            redirect: '/personal',
          });
        })
        .catch((e) => {
          if (e.response) {
            if (!e.response.data.data.success && e.response.data.data.inn) {
              window.notificationError(`${e.response.data.inn}`);
            }
            if (!e.response.data.data.success && e.response.data.data.login) {
              window.notificationError('Такой пользователь уже существует');
            }
          }
          window.notificationError('Ошибка регистрации');
          this.step = 1;
          window.closeLoader();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
