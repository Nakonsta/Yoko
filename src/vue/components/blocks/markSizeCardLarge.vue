<template>
    <div class="cable-info">
        <div class="table-cell__title cable-info__title" data-name="Маркоразмер">
            <span class="cable-info__title-text">
                {{ item.title }}
            </span>
        </div>
        <div class="table-cell__quantity cable-info__quantity" :data-name="item.quantity ? 'Остаток, м' : 'Наличие'">
            <span v-if="item.quantity">
                {{ item.quantity }} м
            </span>
            <span v-else>
                под заказ
            </span>
        </div>
        <div v-if="item.company_id" class="table-cell__company cable-info__company" data-name="Компания">
          <span>
            <a :href="`/compregister/${item.company.id}`">
              {{ item.company.name }}
            </a>
          </span>
          <span class="cable-info__company-desc">
            Рейтинг компании:
          </span>
          <span>
            {{ item.company.rating }}
          </span>
        </div>
        <div class="table-cell__price cable-info__price" :data-name="item.price ? 'Цена, руб' : 'Цена, руб'">
            <template v-if=" $store.state.auth.loggedIn">
                <span v-if="item.price">
                    {{ formatPriceWithCurrency(item.price, item.currency) }}
                </span>
                <span v-else>
                    не указана
                </span>
            </template>
            <span v-else class="cable-info__price--unauthorized">
                &#8381;
                <span class="cable-info__price-tooltip">
                    Для просмотра цен необходимо авторизоваться
                </span>
            </span>
        </div>
        <div v-if="item.documents && item.documents.certificates" class="table-cell__price cable-info__certificates" :data-name="item.documents && item.documents.certificates ? 'Сертификаты' : ''">
            <div>
                <span v-for="(document, key) in getCertificates(item.documents.certificates)" :key="key" @click="viewCertificate(key, item.title)" class="cable-info__certificate">
                    <a class="cable-info__certificate-link">
                        <img :src="`/img/sprite.svg#${chooseCertificatePic(document.properties.date_end)}-usage`" class="cable-info__certificate-pic" alt="Сертификат продукции">
                        <span class="cable-info__certificate-tooltip">{{chooseCertificateToolTip(document.properties.date_end)}}</span>
                    </a>
                    {{ document.properties.number }}
                </span>
            </div>
            <div v-show="item.documents.certificates.length > 6" @click="showMenu = !showMenu" class="table-menu">
                <div class="table-menu__content">

                </div>
                <span v-show="showMenu" class="table-menu__close">
                    <img src="/src/assets/img/svg-templates/close.svg" alt="закрыть меню">
                </span>
                    <span v-show="!showMenu" class="table-menu__control">
                   <img src="/src/assets/img/svg-templates/expand-menu.svg" alt="открыть меню">
               </span>
                <ul v-show="showMenu" class="table-menu__list">
                    <li v-show="!expandedCerts" @click="showCertificates(item.documents.certificates.length)" class="table-menu__item">Показать все сертификаты</li>
                    <li v-show="expandedCerts" @click="showCertificates(6)" class="table-menu__item">Скрыть все сертификаты</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import functions from "@/helpers/functions";
export default {
    name: 'MarkSizeCard',

    mixins: [functions],

    props: {
        item: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            today: new Date(),
            showMenu: false,
            maxOfCertificates: 6
        }
    },

    computed: {
        expandedCerts() {
            return this.maxOfCertificates > 6;
        }
    },

    methods: {
        chooseCertificatePic(date_end) {
            const expiringDate = new Date(date_end)
            if (this.today > expiringDate) {
                return 'expiring-certificate'
            }
            // число миллисекунд в месяце
            if ((expiringDate - this.today) < 3600 * 24 * 30 * 1000) {
                return 'expiring-soon-certificate'
            }
            return 'actual-certificate'
        },
        chooseCertificateToolTip(date_end) {
            const expiringDate = new Date(date_end)
            if (this.today > expiringDate) {
                return 'срок сертификата истек'
            }
            console.log(expiringDate - this.today);
            console.log(2,628e+9);
            // число миллисекунд в месяце
            if ((expiringDate - this.today) < 3600 * 24 * 30 * 1000) {
                return `срок сертификата закончится ${this.formatDate(expiringDate)}`
            }
            return `сертификат действует до ${this.formatDate(expiringDate)}`
        },
        formatDate(date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            return dd + '.' + mm + '.' + yy;
        },
        showCertificates(max) {
            this.maxOfCertificates = max;
        },
        getCertificates(list) {
            if (list.length) {
                return list.slice(0, this.maxOfCertificates);
            }
        },
        viewCertificate(id, title) {
            const certificates = {
                current: { ...this.item.documents.certificates[id], title },
                items: this.item.documents.certificates
            };
            this.$emit("view-certificate", certificates);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .cable-info {
        display: flex;
        align-items: center;
        padding: rem(27px) 0;
        border-bottom: 1px solid $colorBdr;
        color: $colorTextLight;
        font-weight: 500;
        &__title-text {
            display: inline-block;
            font-size: rem(14px);
            border: 1px solid #D3D3D3;
            border-radius: 4px;
            padding: rem(10px) rem(32px);
            margin-right: rem(12px);
        }
        &__quantity {
            font-size: rem(14px);
        }
        &__company {
            font-size: rem(14px);
            > span {
              &:first-child {
                display: block;
              }
              > a {
                transition: .3s color;
                color: #31ACB8;
                &:hover {
                  color: #4cb9c3;
                }
              }
              &-desc {
                font-weight: 400;
              }
            }
        }
        &__price {
            font-size: rem(16px);
            color: $colorTurquoise;
            &--unauthorized {
                position: relative;
                &:hover .cable-info__price-tooltip,
                &:focus .cable-info__price-tooltip {
                    display: block;
                }
            }
            &-tooltip {
                display: none;
                position: absolute;
                box-shadow: 0px 4px 24px rgba(55, 31, 31, 0.25);
                padding: rem(10px) rem(20px);
                background-color: $colorWhite;
                color: $colorGray;
                font-size: rem(14px);
                border-radius: 4px;
                top: -120px;
                left: -80px;
            }
        }
        &__certificate {
            display: inline-block;
            margin-right: rem(12px);
            &:hover {
                cursor: pointer;
                color: lighten($colorGray, 10%);
            }
            &-link {
                display: inline-block;
                position: relative;
                color: $colorTextLight;
                font-size: rem(14px);
                font-weight: 500;
                &:hover .cable-info__certificate-tooltip,
                &:focus .cable-info__certificate-tooltip {
                    display: block;
                }
            }
            &-tooltip {
                display: none;
                position: absolute;
                box-shadow: 0px 4px 24px rgba(55, 31, 31, 0.25);
                padding: rem(10px);
                background-color: $colorWhite;
                color: $colorGray;
                font-size: rem(14px);
                white-space: nowrap;
                border-radius: 4px;
                top: -50px;
                left: -80px;
            }
            &-pic {
                width: 12px;
                height: 12px;
            }
        }
        &__certificates {
            display: flex;
        }
    }

    .table-cell {
        &__title {
            width: 21%;
        }
        &__quantity {
            width: 10%;
        }
        &__price {
            width: 20%;
        }
        &__company {
          width: 25%;
        }
        &__certificates {
            width: 35%;
        }
        &__controls {
            width: 20%;
        }
    }

    .table-menu {
        position: relative;
        display: block;
        font-size: rem(12px);
        font-weight: 400;
        max-height: 20px;
        margin-top: rem(6px);
        color: white;
        img {
            width: 18px;
            height: 18px;
        }
        &:hover {
            cursor: pointer;
        }
        &__list {
            position: absolute;
            background-color: #373735;
            list-style: none;
            left: -5px;
            bottom: -45px;
            margin: 0;
            padding: rem(10px) rem(20px);
            min-width: 200px;

            li {
                margin: 0;
                padding: 0;
                transition: color .2s ease;
                &:hover {
                    color:$colorTurquoise;
                }
            }
        }
        &__close {
            opacity: 1;
            transition: opacity .2s linear;
            &:hover {
                opacity: 0.6;
            }
        }
    }

    @include mq($until: desktop) {
        .table-cell {
            &__title {
                width: 35%;
            }
            &__quantity {
                width: 20%;
            }
            &__price {
                width: 20%;
            }
            &__certificates {
                width: 25%;
            }
        }
    }

    @include mq($until: tablet) {
        .cable-info {
            flex-direction: column;
            align-items: flex-start;
            &__title,
            &__quantity,
            &__company,
            &__price,
            &__certificates {
                position: relative;
                padding: rem(8px) 0 rem(8px) rem(128px);
                &::before {
                    content: attr(data-name);
                    position: absolute;
                    top: rem(8px);
                    left: 0;
                    font-size: rem(14px);
                    font-weight: 500;
                    color: $colorGray;
                }
            }
            &__title-text {
                padding: rem(10px);
            }
        }
        .table-cell {
            &__title {
                width: 100%;
            }
            &__quantity {
                width: 100%;
            }
            &__company {
                width: 100%;
            }
            &__price {
                width: 100%;
            }
            &__certificates {
                width: 100%;
            }
        }
        .table-menu {
            margin-top: 0;
            &__list {
                left: -200px;
                bottom: -45px;
                margin: 0;
                padding: rem(10px) rem(20px);
                min-width: 200px;

                li {
                    margin: 0;
                    padding: 0;
                    transition: color .2s ease;
                    &:hover {
                        color:$colorTurquoise;
                    }
                }
            }
        }
    }

</style>
