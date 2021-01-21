<template>
    <div class="products__table">
        <div class="products__item products__item--empty item item--empty" v-if="!items.length && !loading">
            Ничего не найдено
        </div>
        <table v-if="items.length">
            <thead>
                <tr>
                    <th class="products__item-title">
                        Маркоразмер
                    </th>
                    <th class="products__item-quantity">
                        Остаток, м
                    </th>
                    <th class="products__item-company" v-if="companies !== false">
                        Компания
                    </th>
                    <th class="products__item-price">
                        Цена, руб
                    </th>
                    <th class="products__item-certificates">
                        Сертификаты
                    </th>
                    <th class="products__item-controls"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in items" :key="key" class="products__item">
                    <!--<MarkSizeCard :item="item" @view-certificate="viewCertificate" />-->
                    <td class="products__item-title" data-name="Маркоразмер">
                        <span class="products__item-title-text">
                            {{ item.title }}
                        </span>
                    </td>
                    <td class="products__item-quantity" :data-name="item.quantity ? 'Остаток, м' : 'Наличие'">
                        <span v-if="item.quantity">
                            {{ item.quantity }} м
                        </span>
                        <span v-else>
                            под заказ
                        </span>
                    </td>
                    <td class="products__item-company" data-name="Компания" v-if="companies !== false">
                        <a :href="`/compregister/${item.company.id}`">{{ item.company.name }}</a>
                        <br>Рейтинг компании: {{ item.company.rating }}
                    </td>
                    <td class="products__item-price" :data-name="item.price ? 'Цена, руб' : 'Цена, руб'">
                        <template v-if=" $store.state.auth.loggedIn">
                            <span v-if="item.price">
                                {{ formatPriceWithCurrency(item.price, item.currency) }}
                            </span>
                            <span v-else>
                                не указана
                            </span>
                        </template>
                        <span v-else class="products__item-price--unauthorized">
                            <span data-tooltip="view-prices" class="hint">
                                <svg class="sprite-hint"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#hint"></use></svg>
                            </span>
                        </span>
                    </td>
                    <td class="products__item-certificates" :data-name="item.documents && item.documents.certificates ? 'Сертификаты' : ''" v-if="item.documents && item.documents.certificates">
                        <ul>
                            <li v-for="(document, key) in item.expanded ? item.documents.certificates : item.documents.certificates.slice(0, maxOfCertificates)" :key="key" @click="openCertificate(key, item)" class="products__item-certificate">
                                <svg class="sprite-certificate js-hint" :data-tooltip="`certificate-${document.id}`"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/img/sprite.svg#${getCertificateIcon(document.properties.date_end)}-usage`"></use></svg>
                                <div :id="`certificate-${document.id}`" class="hint__content">{{getCertificateTooltip(document.properties.date_end)}}</div>
                                {{ document.properties.number }}
                            </li>
                            <li v-if="item.documents.certificates.length > maxOfCertificates" class="products__item-certificate-menu">
                                <a href="javascript:{}" @click="item.menu = !item.menu"><svg class="sprite-menu"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/img/sprite.svg#${item.menu ? 'close' : 'expand-menu'}`"></use></svg></a>
                                <ul v-show="item.menu" class="products__item-certificate-list">
                                    <li v-show="!item.expanded" @click="item.expanded = true; item.menu = false" class="table-menu__item">Показать все сертификаты</li>
                                    <li v-show="item.expanded" @click="item.expanded = false; item.menu = false" class="table-menu__item">Скрыть все сертификаты</li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="view-prices" class="hint__content">Для просмотра цен необходимо авторизоваться</div>
        <certificatesView
                :document="currentCertificate"
                @change-item="changeCertificate"
        />
        <div
                v-show="loading"
                class="products__loader"
        >
            <div class="preloader">
                <div class="preloader__preloader">
                    <div class="preloader__loader"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/helpers/api';
    import functions from '@/helpers/functions';
    import formatDate from "@/helpers/formatDate";
    import certificatesView from "@/components/products/certificatesView";

    export default {
        name: 'productsList',

        components: {
            certificatesView,
        },

        mixins: [api, functions, formatDate],

        props: {
            items: {
                default: () => [],
                type: Array,
                required: true,
            },
            companies: {
                default: false,
                type: [Array, Boolean],
            },
            loading: {
                default: false,
                type: Boolean,
            },
            maxOfCertificates: {
                default: 6,
                type: Number,
            }
        },

        watch: {
            items(newValue) {
                return newValue.map((item) => {
                    if (!item.expanded) Vue.set(item, 'expanded', false);
                    if (!item.menu) Vue.set(item, 'menu', false);
                    if (this.companies !== false) {
                        const company = this.companies.find((company) => company.id === item.company_id);
                        if (!item.company) {
                            Vue.set(item, 'company', company);
                        } else {
                            item.company = company;
                        }
                    }
                    return item;
                });
            },
        },

        data() {
            return {
                today: new Date(),
                currentFilter: {
                    q: null,
                    quantity: {
                        from: null,
                        to: null,
                    },
                    price: {
                        from: null,
                        to: null,
                    }
                },
                certificates: [],
                currentCertificate: null
            }
        },

        methods: {
            pagination(page) {
                this.isLoading = true
                this.page = page
            },
            openCertificate(i, item) {
                this.certificates = item.documents.certificates;
                this.currentCertificate = this.certificates[i];
                this.currentCertificate.title = item.title;
                openPopupById('#products-certificate-view');
            },
            changeCertificate(value) {
                let idx = this.certificates.findIndex(item => item.properties.number === this.currentCertificate.properties.number);
                if (idx >= 0) {
                    switch (value) {
                        case "next":
                            idx += 1;
                            break;
                        case "back":
                            idx -= 1;
                            break;
                        default:
                            console.log("Неизвестный тип переключения слайдера сертификата", value);
                            return;
                    }

                    if (idx > this.certificates.length - 1) {
                        idx = 0;
                    }

                    if (idx < 0) {
                        idx = this.certificates.length - 1;
                    }
                    this.currentCertificate = { ...this.certificates[idx], title: this.currentCertificate.title };
                }
            },
            getCertificateIcon(date_end) {
                const expiringDate = new Date(date_end);
                if (this.today > expiringDate) {
                    return 'expiring-certificate';
                }
                // число миллисекунд в месяце
                if ((expiringDate - this.today) < 3600 * 24 * 30 * 1000) {
                    return 'expiring-soon-certificate';
                }
                return 'actual-certificate';
            },
            getCertificateTooltip(date_end) {
                const expiringDate = new Date(date_end)
                if (this.today > expiringDate) {
                    return 'срок сертификата истек'
                }
                // число миллисекунд в месяце
                if ((expiringDate - this.today) < 3600 * 24 * 30 * 1000) {
                    return `срок сертификата закончится ${this.formatDate(expiringDate)}`
                }
                return `сертификат действует до ${this.formatDate(expiringDate)}`
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .products {
        &__table {
            position: relative;
            min-height: 100px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            thead {
                @include mq($until: tablet) {
                    display: none;
                }
            }
            th {
                font-weight: 500;
                font-size: 14px;
                text-align: left;
                color: $colorGray;
                + th {
                    padding-left: rem(24px);
                }
            }
            @include mq($until: tablet) {
                display: block;
                tbody,
                tr,
                td {
                    display: block;
                    width: 100%;
                }
            }
        }
        &__item {
            font-weight: 500;
            font-size: rem(14px);
            @include mq($until: tablet) {
                border-bottom: 1px solid $colorBdr;
                padding: rem(16px) 0;
            }
            td {
                border-bottom: 1px solid $colorBdr;
                padding: rem(24px) 0;
                @include mq($until: tablet) {
                    border: 0;
                    padding: rem(8px) 0 rem(8px) rem(128px);
                    position: relative;
                    &::before {
                        content: attr(data-name);
                        width: rem(124px);
                        padding: 0 rem(4px) 0 0;
                        font-size: rem(14px);
                        font-weight: 500;
                        color: $colorGray;
                        position: absolute;
                        top: rem(8px);
                        left: 0;
                    }
                }
                @include mq($from: tablet) {
                    + td {
                        padding-left: rem(24px);
                    }
                }
            }
            &-title {
                &-text {
                    display: inline-block;
                    font-size: rem(14px);
                    border: 1px solid $colorBdr;
                    border-radius: 4px;
                    padding: rem(10px) rem(32px);
                    text-align: center;
                }
            }
            &-quantity {
                width: 15%;
            }
            &-company {
                width: 20%;
                a {
                    color: $colorTurquoise;
                    &:hover {
                        color: $colorTurquoiseHover;
                    }
                }
            }
            &-price {
                width: 15%;
                font-size: rem(16px);
                color: $colorTurquoise;
            }
            &-certificates {
                width: 20%;
                ul {
                    list-style-type: none;
                    display: flex;
                    flex-wrap: wrap;
                    margin: rem(-6px) 0 0 rem(-12px);
                    padding: 0;
                }

            }
            &-certificate,
            &-certificate-menu {
                margin: rem(6px) 0 0 rem(12px);
                position: relative;
                line-height: rem(22px);
                cursor: pointer;
            }
            &-certificate {
                padding-left: rem(16px);
                white-space: nowrap;
                svg {
                    display: block;
                    margin-top: rem(-6px);
                    width: rem(12px);
                    height: rem(12px);
                    position: absolute;
                    top: 50%;
                    left: 0;
                }
                &-menu {
                    a {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: rem(22px);
                        height: rem(22px);
                    }
                    svg.sprite-menu {
                        display: block;
                        width: rem(12px);
                        height: rem(12px);
                        fill: $colorText;
                        cursor: pointer;
                        &:hover {
                            fill: $colorTurquoiseHover;
                        }
                    }
                }
                &-list {
                    list-style: none;
                    margin: 0 !important;
                    padding: 0;
                    white-space: nowrap;
                    font-size: rem(12px);
                    background: $colorText;
                    position: absolute;
                    right: 0;
                    top: 100%;
                    li {
                        margin: 0;
                        padding: rem(10px) rem(20px);
                        color: $colorWhite;
                        transition: color .2s ease;
                        &:hover {
                            color:$colorTurquoise;
                        }
                        + li {
                            border-top: 1px solid  $colorBdr;
                        }
                    }
                }
            }
        }
        &__loader {
            position: absolute;
            z-index: 10;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba($colorWhite, .75);
            height: 100%;
            width: 100%;
            padding: 10px;
            box-sizing: content-box;
            .preloader {
                background-color: transparent;
            }
            .preloader__loader {
                position: static;
            }
            .preloader__preloader {
                align-items: center;
                justify-content: center;
            }
        }
    }

    @include mq($until: tablet) {
        .company-products {
            &__thead {
                display: none;
            }
        }
    }

</style>