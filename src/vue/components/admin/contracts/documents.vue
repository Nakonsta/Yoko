<template>
  <div class="documents">
    <div class="item__block">
      <div class="item__block-title">
        {{ title }}
      </div>
      <div class="item__block-content">
        <template v-if="contractId && documentsForCopy.length">
          <div class="documents__copy">
            <Select
              v-model="documentForCopy"
              parent-class="field__container"
              label="Выберите из списка договор, он автоматически подгрузится в список ниже"
              placeholder="Выберите документацию из  списка"
              rules="required"
              :is-single="true"
              :close="true"
              :options="documentsForCopy"
              :select="copyDocument"
            />
          </div>
        </template>
        <table class="documents__items">
          <thead>
            <tr>
              <th class="documents__column-title">
                Название документа
              </th>
              <template v-if="useSing">
                <th class="documents__column-signed value">
                  Подпись заказчик
                </th>
                <th class="documents__column-signed value">
                  Подпись поставщик
                </th>
              </template>
              <th class="documents__column-status">
                Статус
              </th>
              <th class="documents__column-date">
                Размещено
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!documents.length">
              <tr class="documents__item documents__item--empty">
                <td colspan="5">
                  Пока документов нет
                </td>
              </tr>
            </template>
            <template v-else>
              <template v-for="(document, index) in documents">
                <tr
                  :key="index"
                  class="documents__item"
                  :class="{'documents__item--current': index === 0}"
                >
                  <td
                    class="documents__item-title documents__column-title"
                    data-name="Название документа"
                  >
                    <a :href="document.url">{{ document.name }}</a>
                  </td>
                  <template v-if="useSing">
                    <td
                      class="documents__item-signed documents__item-signed--buyer documents__column-signed value"
                      data-name="Подпись заказчик"
                    >
                      <template v-if="document.properties.customer_signed">
                        <span
                          class="signed signed--yes js-hint"
                          :data-tooltip="`signed-buyer-${document.id}`"
                        />
                        <div
                          :id="`signed-buyer-${document.id}`"
                          class="hint__content"
                        >
                          Подписано заказчиком
                        </div>
                      </template>
                      <template v-else>
                        <span
                          class="signed signed--no js-hint"
                          :data-tooltip="`nosigned-buyer-${document.id}`"
                        >
                          <svg class="sprite-wait"><use
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="/img/sprite.svg#wait"
                          /></svg>
                        </span>
                        <div
                          :id="`nosigned-buyer-${document.id}`"
                          class="hint__content"
                        >
                          Ожидает подписания заказчиком
                        </div>
                      </template>
                    </td>
                    <td
                      class="documents__item-signed documents__item-signed--contractor documents__column-signed value"
                      data-name="Подпись поставщик"
                    >
                      <template v-if="document.properties.supplier_signed">
                        <span
                          class="signed signed--yes js-hint"
                          :data-tooltip="`signed-buyer-${document.id}`"
                        />
                        <div
                          :id="`signed-buyer-${document.id}`"
                          class="hint__content"
                        >
                          Подписано поставщиком
                        </div>
                      </template>
                      <template v-else>
                        <span
                          class="signed signed--no js-hint"
                          :data-tooltip="`nosigned-buyer-${document.id}`"
                        >
                          <svg class="sprite-wait"><use
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="/img/sprite.svg#wait"
                          /></svg>
                        </span>
                        <div
                          :id="`nosigned-buyer-${document.id}`"
                          class="hint__content"
                        >
                          Ожидает подписания поставщиком
                        </div>
                      </template>
                    </td>
                  </template>
                  <td
                    class="documents__item-status documents__column-status"
                    data-name="Статус"
                  >
                    {{ getStatus(document, index) }}
                  </td>
                  <td
                    class="documents__item-date documents__column-date"
                    data-name="Размещено"
                  >
                    {{ formatDate(document.created_at) }}
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <div class="btns">
          <label
            class="btn btn--sm"
          >
            Загрузить файл
            <input
              type="file"
              @change="addDocument($event)"
            >
          </label>
          <template v-if="useSing">
            <a
              href="javascript:{}"
              class="btn btn--bdr btn--sm"
            >
              Подписать ЭЦП
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/helpers/api';
import formatDate from '@/helpers/formatDate';
import functions from '@/helpers/functions';
import Select from '@/components/forms/Select';

export default {
  name: 'Documents',
  components: {
    Select,
  },
  mixins: [api, formatDate, functions],
  props: {
    title: {
      default: '',
      type: String,
      required: true,
    },
    procedure: {
      default: null,
      type: Object,
      required: true,
    },
    documents: {
      default: () => [],
      type: Array,
      required: true,
    },
    holidays: {
      default: () => {},
      type: Array,
    },
    useSing: {
      default: false,
      type: Boolean,
    },
    contractId: {
      default: null,
      type: Number,
    },
    documentsForCopy: {
      default: () => [],
      type: Array,
    },
    documentsType: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      documentForCopy: null,
    };
  },
  created() {},
  methods: {
    getStatus(document, index) {
      if (index !== 0) {
        return 'Не действует';
      }
      if (document.properties.customer_signed && document.properties.supplier_signed) {
        return 'Подписан';
      }
      let date = '';
      // eslint-disable-next-line max-len
      const daysDiff = this.diffDaysWorking(document.created_at, this.procedure.purchase_term.contract_conclusion_to, this.holidays);
      if (daysDiff > 20) {
        // Если разница между датой добавления документа и датой окончания оформления документов
        // (дата определения победителя + 30 календарных дней) больше 20 рабочих дней,
        // тогда срок устанавливается по формуле «Дата добавления документа + 20 рабочих дней»;
        date = this.addDaysWorking(document.created_at, 20, this.holidays);
      } else if (daysDiff >= 10 && daysDiff <= 20) {
        // Если разница между датой добавления документа и датой окончания оформления документов
        // (дата определения победителя + 30 календарных дней) меньше или равна 20 рабочим дням,
        // но больше или равна 10 рабочим дням, тогда срок устанавливается по формуле:
        // «Дата добавления документа + полученное значение разницы в рабочих днях»;
        date = this.addDaysWorking(document.created_at, daysDiff, this.holidays);
      } else {
        // Если если разница между датой добавления документа и датой окончания оформления документов
        // (дата определения победителя + 30 календарных дней) меньше 10 рабочих дней,
        // тогда срок устанавливается по формуле «Дата добавления документа + 10 рабочих дней»;
        date = this.addDaysWorking(document.created_at, 10, this.holidays);
      }
      return `Ожидает подписания. Срок до: ${this.formatDateNoTime(date)}`;
    },
    addDocument(evt) {
      const extensions = '.pdf, .doc, .docx, .xls, .xlsx, .jpg, .png';
      const metatypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', ' \tapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];
      if (!metatypes.length || metatypes.indexOf(evt.target.files[0].type) !== -1) {
        window.openLoader();
        const fData = {
          file: evt.target.files[0],
          collection: this.documentsType,
        };
        const formDataObj = this.objectToFormData(fData);
        this.addContractDocument(this.contractId, formDataObj)
          .then((response) => {
            this.documents.unshift(response.data.data);
            evt.target.value = '';
            window.notificationError('Документ добавлен');
            window.closeLoader();
          })
          .catch((e) => {
            console.log(e);
            window.notificationError('Ошибка сервера');
            window.closeLoader();
          });
      } else {
        window.notificationError(
          `Вы пытаетесь загрузить файл неверного формата. Разрешенные форматы ${extensions}`,
        );
      }
    },
    copyDocument(selectedDocument) {
      this.documentForCopy = selectedDocument;
      window.openLoader();
      this.copyContractDocument(this.contractId, { id: selectedDocument.id })
        .then((response) => {
          this.documents.unshift(response.data.data);
          this.documentForCopy = null;
          window.notificationError('Документ добавлен');
          window.closeLoader();
        })
        .catch((e) => {
          console.log(e);
          window.notificationError('Ошибка сервера');
          window.closeLoader();
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";
@import "../../../../assets/sass/mixins/mq";

.documents {
  border-radius: 6px;
  padding: rem(40px) rem(64px);
  background: $colorWhite;
  @include mq($until: widescreen) {
    padding: rem(40px);
  }

  @include mq($until: tablet) {
    padding: rem(32px) rem(20px);
  }

  @media print {
    border-radius: 0;
    padding: 0;
  }

  & + & {
    margin-top: rem(40px);
  }

  &__copy {
    margin: rem(24px) 0 rem(32px);
  }

  &__items {
    width: 100%;
    font-size: rem(14px);
    th {
      font-weight: 500;
      color: $colorGray;
      text-align: left;
      + th {
        padding-left: rem(24px);
      }
      &.value {
        text-align: center;
      }
    }
    td {
      padding: rem(16px) 0;
      + td {
        padding-left: rem(24px);
      }
      &.value {
        text-align: center;
      }
    }
  }
  &__item {
    color: rgba($colorText, .5);

    &--current {
      color: $colorText;

      a {
        color: $colorTurquoise !important;

        &:hover {
          color: $colorTurquoiseHover !important;
        }
      }

      .signed {
        &--yes {
          background-color: $colorTurquoise !important;
        }
        svg {
          fill: $colorText !important;
        }
      }
    }

    a {
      font-weight: 500;
      color: rgba($colorTurquoise, .5);

      &:hover {
        color: $colorTurquoiseHover;
      }
    }
  }
  &__column {
    &-title {

    }
    &-signed,
    &-date {
      width: 15%;
    }
    &-status {
      width: 25%;
    }
  }
  .signed {
    display: inline-block;
    width: rem(24px);
    height: rem(24px);
    overflow: hidden;
    text-indent: -9999px;
    &--yes {
      border-radius: rem(4px);
      background: rgba($colorTurquoise, .5) url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEzIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDQuMzE1NzlMNC43NTQ3OSA4TDExLjg4ODkgMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==) no-repeat 50% 50% / #{rem(12px)} #{rem(9px)};
    }
    svg {
      margin: rem(2px);
      width: rem(20px);
      height: rem(20px);
      fill: rgba($colorText, .5)
    }
  }
}
.btns {
  margin-top: 0 !important;
  margin-bottom: rem(24px);
}
label.btn {
  position: relative;
  input[type="file"] {
    position: absolute;
    top: 0;
    left: -9999px;
    pointer-events: none;
    opacity: 0;
  }
}
</style>
