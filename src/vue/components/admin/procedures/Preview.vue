<template>
  <div>
    <div class="tabs tabs--line js-tabs">
      <ul class="mt3">
        <li class="active"><a href="#description">Извещения</a></li>
        <li class=""><a href="#person">Организатор</a></li>
      </ul>
    </div>
    <div class="tabs__content company__content" id="description" style="display: block;">
      <div class="container-item">
        <div class="row between-xs">
          <div class="col">
            <ul>
              <li v-if="data.id"><b>№{{data.id}}</b></li>
              <li>{{ data.tender_trading_format.name }}</li>
              <li>{{ data.tender_trading_type.name }}</li>
            </ul>
          </div>
          <div class="col">
            <a href="javascript:{}" onclick="window.print()" title="Распечатать">
              <svg class="sprite-print">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#print"></use>
              </svg>
            </a>
          </div>
        </div>
        <h3 class="mt3">Основная информация</h3>
        <div class="preview-block">
          <previews label="Дата публикации" :value="convertedData && convertedData.publication_date"/>
          <previews
              v-if="
                calculatedData.procedureType !== 'Query' &&
                calculatedData.procedureType !== 'Offers' &&
                calculatedData.procedureType !== 'Commercial'
              "
              label="Доступность"
              :value="data.tender_available.name"
          />
          <previews label="Альтернативные заявки" :value="data.alternative_applications.name"/>
          <previews label="Допускается ли толеранс" :value="convertedData.tender_tolerance"/>
          <previews
              v-if="
                calculatedData.procedureType === 'Query' ||
                calculatedData.procedureType === 'Offers' ||
                calculatedData.procedureType === 'Commercial'
              "
              label="Этапы процедуры закупки"
              :value="data.stages_of_the_procurement_procedure.name"
          />
          <previews
              v-if="
                calculatedData.procedureType === 'Query' ||
                calculatedData.procedureType === 'Offers' ||
                calculatedData.procedureType === 'Commercial'
              "
              label="Возможна переторжка"
              :value="convertedData.tender_framework_contract"
          />
          <previews
              v-if="
                calculatedData.procedureType === 'Contest' ||
                calculatedData.procedureType === 'FromSupplier'
              "
              label="Конкурс на заключение рамочного договора"
              :value="convertedData.overbidding_is_possible"
          />
          <previews
              v-if="
                calculatedData.procedureType === 'Auction' ||
                calculatedData.procedureType === 'Supplier'
              "
              label="Скрыть названия участников"
              :value="convertedData.hide_member_names"
          />
          <previews
              v-if="
                calculatedData.procedureType === 'Query' ||
                calculatedData.procedureType === 'Offers' ||
                calculatedData.procedureType === 'Commercial' ||
                calculatedData.procedureType === 'FromSupplier' ||
                calculatedData.procedureType === 'Contest'
              "
              label="Цены конфиденциальны"
              :value="convertedData.confidential_price"
          />
        </div>
        <h3>Предмет закупки</h3>
        <div class="preview-block">
          <previews label="Описание предмета закупки" :value="data.item_description"/>
          <previews label="Начальная максимальная цена" :value="convertedData.baseCount"/>
        </div>
        <div v-for="index in data.count_lots.id || 1" :key="index">
          <ul v-if="data.count_lots.id !== 0" class="mt2">
            <li><b>Лот {{ index }}</b></li>
            <li>{{ calculatedData.totalCount[index - 1] }}</li>
          </ul>
          <ul v-else class="mt2">
            <li><b>Лот</b></li>
          </ul>
          <table class="table table--adaptive">
            <thead>
              <tr>
                <th>Наименование позиции</th>
                <th>Длина</th>
                <th>Единица</th>
                <th>Валюта</th>
                <th>Стоимость за единицу</th>
                <th>НДС</th>
                <th>Сумма за позицию</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="item in data.positions" v-if="item.addLot ? item.addLot.id === index : true">
              <td data-label="Наименование позиции">{{ item.names && item.names.name }}</td>
              <td data-label="Длина">{{ item.quantity }}</td>
              <td data-label="Единица">{{ item.measures && item.measures.name }}</td>
              <td data-label="Валюта">{{ data.currency && data.currency.name }}</td>
              <td data-label="Стоимость за единицу">{{ item.price_for_one }}</td>
              <td data-label="НДС">{{ item.vats && item.vats.name }}</td>
              <td data-label="Сумма за позицию">{{ item.total_price }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="calculatedData.procedureType === 'Auction'" class="preview-block">
          <previews label="Комментарий" :value="data.application_comment"/>
        </div>
        <h3 v-if="procedureIdData.procedureType === 'Commercial' && !fieldsData.hideBlock.payment_info">
          Условия оплаты и поставки товара
        </h3>
        <div v-if="procedureIdData.procedureType === 'Commercial' && !fieldsData.hideBlock.payment_info" class="preview-block">
          <previews label="Предоплата" :value="convertedData.application_prepayment"/>
          <previews label="Аккредитив" :value="convertedData.application_letter_of_credit"/>
          <previews label="Информация об оплате" :value="data.application_payment_info"/>
          <previews label="Условия поставки" :value="data.application_delivery_conditions"/>
          <previews label="Место поставки" :value="data.applications_delivery_address && data.applications_delivery_address.name"/>
        </div>
        <h3>Сроки конкурса</h3>
        <div class="preview-block">
          <previews
            :label="
              calculatedData.procedureType === 'Auction'
                ? 'Дата начала процедуры'
                : calculatedData.procedureType === 'Contest'
                  ? 'Дата начала подачи заявки на конкурс'
                  : 'Дата окончания подачи заявок'
            "
            :value="convertedData.application_end_date"
          />
          <previews
              v-if="
                calculatedData.procedureType === 'Contest' ||
                calculatedData.procedureType === 'Supplier'
              "
              label="Сроки заключения договора"
              :value="convertedData.application_terms_of_contract"
          />
          <previews
              v-if="
                calculatedData.procedureType === 'Contest' ||
                calculatedData.procedureType === 'Query' ||
                calculatedData.procedureType === 'Offers' ||
                calculatedData.procedureType === 'Commercial' ||
                calculatedData.procedureType === 'Supplier'
              "
              :label="
                calculatedData.procedureType === 'Contest' ||
                calculatedData.procedureType === 'Suppliers'
                  ? 'Сроки поставки товаров, услуг'
                  : 'Дата вскрытия заявок'
              "
              :value="convertedData.application_delivery_time"
          />
          <previews
              v-if="calculatedData.procedureType === 'Auction'"
              label="Дата окончания процедуры"
              :value="convertedData.application_delivery_time"
          />
          <previews
              v-if="calculatedData.procedureType === 'Auction'"
              label="Рассмотрение аукционных заявок до начала процедуры"
              :value="convertedData.consideration_of_auction_bids"
          />
        </div>
        <h3
            v-if="calculatedData.procedureType == 'Supplier' ||
            calculatedData.procedureType === 'Contest'"
        >
          Рассмотрения заявки и подведение итогов
        </h3>
        <div
            v-if="calculatedData.procedureType == 'Supplier' ||
            calculatedData.procedureType === 'Contest'"
            class="preview-block"
        >
          <previews
              label="Дата окончания подачи заявки на конкурс"
              :value="convertedData.application_submit_date_time"/>
          <previews
              label="Конкурсная коммиссия"
              :value="data.commission"
          />
          <previews
              label="Дата и время получения конкурсной документации"
              :value="convertedData.application_opening_date_time"
          />
          <previews
              label="Место получения конкурсной документации"
              :value="data.place_of_receipt.name"
          />
          <previews
              label="Дата и время рассмотрения заявок"
              :value="convertedData.application_date_time"
          />
        </div>
        <h3 v-if="data.application_security_of_the_contract || data.application_security_required">Обеспечение и гарантии</h3>
        <div
            class="preview-block"
            v-if="procedureIdData.procedureType === 'Commercial'
              ? !fieldsData.hideBlock.application_security
              : data.application_security_of_the_contract
            "
        >
          <previews label="Считать размер обеспечения в" :value="data.security.calculate_the_amount_of_collateral && data.security.calculate_the_amount_of_collateral.name"/>
          <previews label="Процент от начальной цены" :value="data.security.percentage_of_the_starting_price"/>
          <previews label="Сумма обеспечения" :value="data.security.collateral_amount_percents"/>
          <previews label="Сумма обеспечения" :value="data.security.collateral_amount"/>
          <previews label="Срок блокировки, дней" :value="data.security.blocking_period_days && data.security.blocking_period_days.name"/>
        </div>
        <div
            class="preview-block"
            v-if="procedureIdData.procedureType === 'Commercial'
              ? !fieldsData.hideBlock.application_security
              : data.application_security_required
            "
        >
          <previews label="Считать размер обеспечения в" :value="data.request.calculate_the_amount_of_collateral && data.request.calculate_the_amount_of_collateral.name"/>
          <previews label="Процент от начальной цены" :value="data.request.percentage_of_the_starting_price"/>
          <previews label="Сумма обеспечения" :value="data.request.collateral_amount_percents"/>
          <previews label="Сумма обеспечения" :value="data.request.collateral_amount"/>
          <previews label="Срок блокировки, дней" :value="data.request.blocking_period_days && data.request.blocking_period_days.name"/>
        </div>
        <h3 v-if="procedureIdData.procedureType === 'Commercial' && !fieldsData.hideBlock.additional_info">
          Дополнительная информация о конкурсе
        </h3>
        <div v-if="procedureIdData.procedureType === 'Commercial' && !fieldsData.hideBlock.additional_info" class="preview-block">
          <previews label="Дополнительная информация" :value="data.addition_information"/>
        </div>
        <h3 v-if="procedureIdData.procedureType === 'Commercial' && !fieldsData.hideBlock.documentation">Конкурсная документация</h3>
        <div v-if="procedureIdData.procedureType === 'Commercial' && !fieldsData.hideBlock.documentation" class="preview-block">
          <div class="preview-block__item">
            <div class="preview-block__key">Загруженные документы</div>
            <div class="preview-block__value">
              <div v-for="item in data.file" v-if="data.file.length" class="link">
                <svg class="sprite-paperclip">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#paperclip"></use>
                </svg>
                <a :href="item.url" target="_blank">{{ item.name }}</a>
              </div>
              <div v-if="!data.file.length" class="link">
                <svg class="sprite-paperclip">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#paperclip"></use>
                </svg>
                <span>{{ data.file.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <h3>Контактная информация</h3>
        <div class="preview-block">
          <previews label="ФИО" :value="data.contact_full_name.name"/>
          <previews label="Телефон" :value="data.contact_phone"/>
          <previews label="E-mail" :value="data.contact_email"/>
        </div>
        <h3 v-if="data.fields.length">Дополнительные поля</h3>
        <div
            v-for="(field, key) in data.fields"
            :key="`filed-${key}`"
            class="preview-block"
        >
          <previews label="Тип поля" :value="field.types.name"/>
          <previews label="Название поля" :value="field.name"/>
          <previews label="Содержание поля" :value="field.value"/>
          <previews label="Описание поля" :value="field.description"/>
        </div>
        <div class="row between-lg">
          <div class="col col-xl-3 mb1">
            <button class="btn btn--full" @click="publish(true)">
              Подписать и опубликовать
            </button>
          </div>
          <div class="col col-xl-3 mb1">
            <button class="btn btn--full" @click="publish(false)">
              Отправить на модерацию
            </button>
          </div>
          <div class="col mb1">
            <button class="btn btn--bdr" @click="uncheckPreview">
              Редактировать
            </button>
          </div>
          <div class="col mb1">
            <button class="btn btn--bdr" @click="validation(false)">
              Сохранить черновик
            </button>
          </div>
          <div class="col mb1">
            <router-link class="btn btn--bdr" to="/personal/procedures">
              Отменить
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs__content company__content" id="person">
      <div class="container-item">
        <h2>{{ convertedData.companyInfo.shortName }}</h2>
        <h3>Общая информация</h3>
        <div class="preview-block">
          <previews label="Генеральный директор" :value="convertedData.companyInfo.directorFio"/>
          <previews label="Контактное лицо"
                    :value="`${data.contact_full_name.name} ${data.contact_full_name.lastName}`"/>
          <previews label="Контактный телефон" :value="data.contact_full_name.phone"/>
          <previews label="E-mail" :value="data.contact_full_name.email"/>
        </div>
        <h3>Юридическая информация</h3>
        <div class="preview-block">
          <previews label="Полное название организации" :value="convertedData.companyInfo.name"/>
          <previews label="Краткое название" :value="convertedData.companyInfo.shortName"/>
          <previews label="ИНН" :value="convertedData.companyInfo.inn"/>
          <previews label="ОГРН/ОГРНИП" :value="convertedData.companyInfo.ogrn"/>
          <previews label="КПП" :value="convertedData.companyInfo.kpp"/>
          <previews label="Страна" :value="convertedData.companyInfo.country"/>
          <previews label="Адрес" :value="convertedData.companyInfo.address"/>
          <previews label="Почтовый индекс" :value="convertedData.companyInfo.post"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Previews from '@/components/blocks/previews'

export default {
  name: "Preview",
  components: {
    Previews
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
    validation: {
      type: Function,
      default: () => {},
    },
    publish: {
      type: Function,
      default: () => {},
    },
    fieldsData: {
      default: null,
      type: Object,
    },
    procedureIdData: {
      default: null,
      type: Object,
    },
    uncheckPreview: {
      type: Function,
      default: () => {},
    },
    calculatedData: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {
      convertedData: {
        publication_date: moment(this.data.publication_date).format('DD.MM.YYYY'),
        application_end_date: moment(this.data.application_end_date).format('DD.MM.YYYY'),
        application_submit_date_time: this.data.application_submit_date_time && moment(this.data.application_submit_date_time).format('DD.MM.YYYY'),
        application_opening_date_time: moment(this.data.application_opening_date_time).format('DD.MM.YYYY HH:mm:ss'),
        application_date_time: moment(this.data.application_date_time).format('DD.MM.YYYY HH:mm:ss'),
        application_terms_of_contract:
            this.data.application_terms_of_contract && this.data.application_terms_of_contract.start
                ? `${moment(this.data.application_terms_of_contract.start).format('DD.MM.YYYY')} -
                  ${moment(this.data.application_terms_of_contract.end).format('DD.MM.YYYY')}`
                : moment(this.data.application_terms_of_contract).format('DD.MM.YYYY'),
        application_delivery_time:
            this.data.application_delivery_time && this.data.application_delivery_time.start
                ? `${moment(this.data.application_delivery_time.start).format('DD.MM.YYYY')} -
                  ${moment(this.data.application_delivery_time.end).format('DD.MM.YYYY')}`
                : moment(this.data.application_delivery_time).format('DD.MM.YYYY'),
        tender_tolerance: this.data.tender_tolerance ? 'Да' : 'Нет',
        hide_member_names: this.data.hide_member_names ? 'Да' : 'Нет',
        overbidding_is_possible: this.data.overbidding_is_possible ? 'Да' : 'Нет',
        tender_framework_contract: this.data.tender_framework_contract ? 'Да' : 'Нет',
        confidential_price: this.data.confidential_price ? 'Да' : 'Нет',
        consideration_of_auction_bids: this.data.consideration_of_auction_bids ? 'Да' : 'Нет',
        application_prepayment: this.data.application_prepayment ? 'Да' : 'Нет',
        application_letter_of_credit: this.data.application_letter_of_credit ? 'Да' : 'Нет',
        baseCount: `${this.numberWithSpaces(this.calculatedData.baseCount)}  ₽`,
        companyInfo: this.data.contact_full_name.companies[0]
      }
    }
  },
  methods: {
    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";
@import '../../../../assets/sass/mixins/mq';

.tabs {
  margin-top: 5rem;

  &__content {
    padding: 0;
  }
}

.sprite-print {
  color: $colorTurquoise;
  width: rem(20px);
  height: rem(20px);
}

.sprite-paperclip {
  color: $colorTurquoise;
  width: rem(13px);
  height: rem(15px);
  margin-right: rem(10px);
}

.link {
  display: flex;
  align-items: center;

  a {
    color: $colorTurquoise;
    text-decoration: underline;
  }
}

h2 {
  font-weight: 500;
  font-size: rem(18px);
  border-bottom: 1px solid $colorBdr;
  padding-bottom: rem(25px);
  margin-bottom: rem(40px);
}

h3 {
  color: $colorTurquoise;
  font-size: rem(18px);
  padding-bottom: rem(12px);
  margin-bottom: 0;
}

.table {
  width: 100%;
  margin-top: rem(20px);
  margin-bottom: rem(20px);

  th {
    font-weight: 500;
    //min-width: 8%;
  }
  td {
    padding: 25px 0;
    font-weight: 500;
    border-bottom: none;
  }
  tr:not(:last-child) {
    td {
      border-bottom: 1px solid $colorBdr;
    }
  }
}

.preview-block {
  border-bottom: 1px solid $colorBdr;
  border-top: 1px solid $colorBdr;
  margin-bottom: rem(40px);

  &__item {
    display: flex;
    align-items: center;
    margin-top: rem(20px);
    margin-bottom: rem(20px);
  }

  &__key {
    font-weight: 500;
    width: 55%;
    @include mq($from: tablet) {
      min-width: 330px;
      width: 30%;
    }
  }

  &__value {
    font-weight: 400;
    width: 45%;
    @include mq($from: tablet) {
      width: 70%;
    }
  }
}

.container-item ul {
  padding: 0;
  margin-top: 0;
  list-style-type: none;
  font-size: rem(18px);

  li {
    display: inline-block;
    margin-right: rem(30px);
  }
}
</style>
