<template>
  <div>
    <pageTitle
      return-route="/personal/contracts/"
      return-text="Вернуться в список договоров"
      :title="`№${id}`"
    />
    <div
      v-if="item"
      class="contracts-detail"
    >
      <div
        ref="tabs"
        class="tabs tabs--line js-tabs js-more"
      >
        <ul class="js-more__items">
          <li><a href="#info">Основная информация</a> </li>
          <li><a href="#documents">Документы</a></li>
        </ul>
      </div>
      <div
        id="info"
        class="tabs__content"
      >
        <div class="item__block">
          <div class="item__block-title">
            Основная информация
          </div>
          <div class="item__block-content">
            <dl>
              <dt>Дата публикации</dt>
              <dd>{{ formatDateNoTime(item.created_at) }}</dd>
            </dl>
          </div>
        </div>
        <div class="item__block">
          <div class="item__block-title">
            Предмет закупки
          </div>
          <div class="item__block-content">
            <dl v-if="item.participation_application.procedure.purchase_subject.description && item.participation_application.procedure.purchase_subject.description.length">
              <dt>Описание предмета закупки</dt>
              <dd>{{ item.participation_application.procedure.purchase_subject.description }}</dd>
            </dl>
            <dl v-if="item.participation_application.procedure.purchase_subject.start_price">
              <dt>Начальная максимальная цена</dt>
              <dd>
                {{
                  // eslint-disable-next-line max-len
                  formatPriceWithCurrency(item.participation_application.procedure.purchase_subject.start_price,
                                          item.participation_application.procedure.purchase_currency)
                }}
              </dd>
            </dl>
          </div>
        </div>
        <div
          v-if="item.participation_application.procedure.purchase_subject.lots_number"
          class="item__block"
        >
          <procedureLots
            :procedure="item.participation_application.procedure"
          />
        </div>
        <div
          v-if="item.participation_application.procedure.payment_and_delivery"
          class="item__block"
        >
          <div class="item__block-title">
            Условия оплаты и поставки товара
          </div>
          <div class="item__block-content">
            <dl>
              <dt>Предоплата</dt>
              <dd>{{ item.participation_application.procedure.payment_and_delivery.prepayment ? 'Да' : 'Нет' }}</dd>
            </dl>
            <dl>
              <dt>Аккредитив</dt>
              <dd>&mdash;</dd>
            </dl>
            <dl v-if="item.participation_application.procedure.payment_and_delivery.payment_info">
              <dt>Информация об оплате</dt>
              <dd>{{ item.participation_application.procedure.payment_and_delivery.payment_info }}</dd>
            </dl>
            <dl v-if="item.participation_application.procedure.payment_and_delivery.delivery_terms">
              <dt>Условия поставки</dt>
              <dd>{{ item.participation_application.procedure.payment_and_delivery.delivery_terms }}</dd>
            </dl>
            <dl v-if="item.participation_application.procedure.purchase_term.delivery_to">
              <dt>Дата поставки</dt>
              <dd>{{ formatDateNoTime(item.participation_application.procedure.purchase_term.delivery_to) }}</dd>
            </dl>
            <dl v-if="item.participation_application.procedure.payment_and_delivery.delivery_address">
              <dt>Место поставки</dt>
              <dd>{{ item.participation_application.procedure.payment_and_delivery.delivery_address }}</dd>
            </dl>
          </div>
        </div>
        <div
          v-if="item.participation_application.procedure.purchase_term"
          class="item__block"
        >
          <div class="item__block-title">
            Сроки конкурса
          </div>
          <div class="item__block-content">
            <dl v-if="item.participation_application.procedure.purchase_term.contract_conclusion_from || item.participation_application.procedure.purchase_term.contract_conclusion_to">
              <dt>Сроки заключения договора</dt>
              <dd>{{ formatDateNoTime(item.participation_application.procedure.purchase_term.contract_conclusion_from) }} &mdash; {{ formatDateNoTime(item.participation_application.procedure.purchase_term.contract_conclusion_to) }}</dd>
            </dl>
            <dl v-if="item.participation_application.procedure.purchase_term.delivery_from || item.participation_application.procedure.purchase_term.delivery_to">
              <dt>Сроки поставки товаров, услуг</dt>
              <dd>{{ formatDateNoTime(item.participation_application.procedure.purchase_term.delivery_from) }} &mdash; {{ formatDateNoTime(item.participation_application.procedure.purchase_term.delivery_to) }}</dd>
            </dl>
          </div>
        </div>
        <div
          v-if="item.participation_application.procedure.documents && item.participation_application.procedure.documents.length"
          class="item__block"
        >
          <div class="item__block-title">
            Конкурсная документация
          </div>
          <div class="item__block-content">
            <dl>
              <dt>Загруженные документы</dt>
              <dd>
                <template v-for="(document, index) in item.participation_application.procedure.documents">
                  <a
                    :key="index"
                    :href="document.url"
                    class="file"
                  >
                    <svg class="sprite-browse">
                      <use
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xlink:href="/img/sprite.svg#browse"
                      />
                    </svg>
                    {{ document.name }}
                  </a>
                  <template v-if="index < item.participation_application.procedure.documents.length - 1">
                    <br><br>
                  </template>
                </template>
              </dd>
            </dl>
          </div>
        </div>
        <div
          v-if="company"
          class="item__block"
        >
          <div class="item__block-title">
            Контактная информация
          </div>
          <!--// todo контактное лицо процедуры-->
          <div class="item__block-content">
            <dl v-if="company.directorFio">
              <dt>ФИО</dt>
              <dd>{{ company.directorFio }}</dd>
            </dl>
            <dl v-if="company.phone">
              <dt>Телефон</dt>
              <dd>{{ company.phone }}</dd>
            </dl>
            <dl v-if="company.email">
              <dt>E-mail</dt>
              <dd>{{ company.email }}</dd>
            </dl>
          </div>
        </div>
        <div
          v-if="item.participation_application.procedure.additional_fields && item.participation_application.procedure.additional_fields.length"
          class="item__block"
        >
          <div class="item__block-title">
            Дополнительные поля
          </div>
          <div class="item__block-content">
            <dl
              v-for="(item, key) in item.participation_application.procedure.additional_fields"
              :key="key"
            >
              <dt>
                {{ item.name }}
              </dt>
              <dd>
                {{ item.value }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div
        id="documents"
        class="tabs__content tabs__content--plane"
      >
        <documents
          title="Контракты"
          :procedure="item.participation_application.procedure"
          :documents="item.documents"
          documents-type="documents"
          :holidays="holidays"
          :contract-id="id"
          :use-sing="true"
          :documents-for-copy="item.participation_application.procedure.documents"
        />
        <documents
          title="Протокол разногласий"
          :procedure="item.participation_application.procedure"
          :documents="item.disagreements"
          documents-type="disagreements"
          :holidays="holidays"
          :contract-id="id"
          :use-sing="true"
        />
        <documents
          title="Банковская гарантия на исполнение контракта"
          :procedure="item.participation_application.procedure"
          :documents="item.bank_guarantees"
          documents-type="bank_guarantees"
          :contract-id="id"
        />
        <documents
          title="Дополнительные файлы"
          :procedure="item.participation_application.procedure"
          :documents="item.additional"
          documents-type="additional"
          :contract-id="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/helpers/api';
import formatDate from '@/helpers/formatDate';
import functions from '@/helpers/functions';
import pageTitle from '@/components/admin/pageTitle';
import procedureLots from '@/components/marketplace/lots';
import documents from '@/components/admin/contracts/documents';
import { initMore } from '../../../../assets/js/main/modules/more.js';

export default {
  name: 'ContractsDetail',
  components: {
    pageTitle,
    procedureLots,
    documents,
  },
  mixins: [api, formatDate, functions],
  data() {
    return {
      breadCrumbs: [],
      item: null,
      company: null,
      holidays: [],
    };
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    },
  },
  watch: {
    item() {
      this.$nextTick(() => {
        initMore();
        const tabs = this.$refs.tabs;
        const hash = window.location.hash.substr(1);
        const link = tabs.querySelector(`li a[href="#${hash}"]`) || tabs.querySelector('li.active a') || tabs.querySelector('li:nth-child(1) a');
        if (link) {
          link.click();
        }
        if (hash.length) {
          const el = document.getElementById(hash);
          if (el) {
            this.scrollTo(el);
          }
        }
      });
    },
  },
  created() {
    // this.$store.commit('setBeadCrumbs', [
    //   {
    //     name: 'Список договоров',
    //     link: '/personal/contracts',
    //   },
    //   {
    //     name: 'Договор',
    //     link: `/personal/contracts/${id}`,
    //   },
    // ]);
    this.getHolidays();
    this.init();
  },
  methods: {
    init() {
      this.$emit('fullMode');
      this.getItem();
    },
    getItem() {
      window.openLoader();
      this.fetchContract(this.id)
        .then((response) => {
          this.item = response.data.data;
          this.getCompany();
          this.item.participation_application.procedure.purchase_term.contract_conclusion_to = '2021-03-26 00:00:00';
          this.item.documents = [
            {
              id: 9,
              name: 'some_file.txt',
              url: 'http://localhost:10180/storage/procedure/19/some_file.txt',
              properties: {
                previous_edition_id: 44,
                customer_signed: true,
                supplier_signed: false,
              },
              created_at: '2020-08-26 00:00:00',
            },
            {
              id: 10,
              name: 'some_file_again.txt',
              url: 'http://localhost:10180/storage/procedure/19/some_file.txt',
              properties: {
                previous_edition_id: 44,
                customer_signed: true,
                supplier_signed: true,
              },
              created_at: '2020-08-24 00:00:00',
            },
          ];
          this.item.participation_application.procedure.documents = [
            {
              id: 9,
              name: 'some_file.txt',
              url: 'http://localhost:10180/storage/procedure/19/some_file.txt',
              created_at: '2020-08-26 00:00:00',
            },
            {
              id: 10,
              name: 'some_file_again.txt',
              url: 'http://localhost:10180/storage/procedure/19/some_file.txt',
              created_at: '2020-08-26 00:00:00',
            },
          ];
        })
        .catch((e) => {
          console.log(e);
          window.closeLoader();
        });
    },
    getCompany() {
      this.fetchCompanyByInn(this.item.participation_application.procedure.inn)
        .then((response) => {
          this.company = response.data.data;
          window.closeLoader();
        })
        .catch((e) => {
          console.log(e);
          window.closeLoader();
        });
    },
    getHolidays() {
      this.fetchSettingsProcedures()
        .then((response) => {
          // eslint-disable-next-line max-len
          this.holidays = response.data.data.production_calendar ? response.data.data.production_calendar : [];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterProductsToLots(products, lotNumber) {
      return products.filter((product) => product.lot === lotNumber) || [];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";
@import "../../../../assets/sass/mixins/mq";

.container-item {
  margin-bottom: rem(40px);
}
</style>
