<template>
    <div class="procedures items">
        <div class="items__head">
            <div class="items__head-counter">
                <template v-if="!loading">
                    Найдено&nbsp;<span>{{ totalItems }}</span>
                </template>
                <template v-else>
                    <span>Загрузка...</span>
                </template>
            </div>
            <span class="items__head-filter popup-link" @click="openPopupById('filter-modal')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.701172 13.0771C0.701172 13.3531 0.908173 13.6291 1.25317 13.6291H8.84317C9.05017 14.4571 9.80917 15.0091 10.7062 15.0091C11.6032 15.0091 12.2932 14.3881 12.5692 13.6291H14.9152C15.1912 13.6291 15.4672 13.4221 15.4672 13.1461C15.4672 12.8701 15.2602 12.5941 14.9842 12.5941H12.5002C12.2932 11.7661 11.5342 11.2141 10.6372 11.2141C9.74017 11.2141 9.05017 11.8351 8.77417 12.5941H1.18417C0.977172 12.5251 0.701172 12.8011 0.701172 13.0771ZM0.701172 7.48812C0.701172 7.76412 0.908173 8.04012 1.25317 8.04012H3.59917C3.80617 8.86812 4.56517 9.42012 5.46217 9.42012C6.35917 9.42012 7.04917 8.79912 7.32517 8.04012H14.9152C15.1912 8.04012 15.4672 7.83311 15.4672 7.55711C15.4672 7.28111 15.2602 7.00512 14.9842 7.00512H7.39417C7.18717 6.17712 6.42817 5.62512 5.53117 5.62512C4.63417 5.62512 3.94417 6.24612 3.66817 7.00512H1.32217C0.977172 7.00512 0.701172 7.21212 0.701172 7.48812ZM0.701172 1.8991C0.701172 2.1751 0.908173 2.45113 1.25317 2.45113H8.84317C9.05017 3.27913 9.80917 3.83113 10.7062 3.83113C11.6032 3.83113 12.2932 3.21013 12.5692 2.45113H14.9152C15.1912 2.45113 15.4672 2.24412 15.4672 1.96812C15.4672 1.69212 15.2602 1.41613 14.9842 1.41613H12.5002C12.2932 0.588133 11.5342 0.0361328 10.6372 0.0361328C9.74017 0.0361328 9.05017 0.657133 8.77417 1.41613H1.18417C0.977172 1.41613 0.701172 1.6231 0.701172 1.8991ZM4.56517 7.48812C4.56517 7.00512 4.97917 6.59113 5.46217 6.59113C5.94517 6.59113 6.35917 7.00512 6.35917 7.48812C6.35917 7.97112 5.94517 8.38512 5.46217 8.38512C4.97917 8.38512 4.56517 7.97112 4.56517 7.48812ZM9.80917 13.0771C9.80917 12.5941 10.2232 12.1801 10.7062 12.1801C11.1892 12.1801 11.6032 12.5941 11.6032 13.0771C11.6032 13.5601 11.1892 13.9741 10.7062 13.9741C10.1542 13.9741 9.80917 13.5601 9.80917 13.0771ZM9.80917 1.8991C9.80917 1.4161 10.2232 1.00211 10.7062 1.00211C11.1892 1.00211 11.6032 1.4161 11.6032 1.8991C11.6032 2.3821 11.1892 2.79613 10.7062 2.79613C10.1542 2.79613 9.80917 2.3821 9.80917 1.8991Z" fill="#31ACB8"/>
                </svg>
                <span>
                    Все фильтры
                </span>
            </span>
            <label class="items__head-checkbox checkbox">
                <input type="checkbox" v-model="expandAll">
                <span class="checkbox__body"></span>
                <span class="checkbox__text">Показывать лоты/позиции</span>
            </label>
            <dropdownList
                    class="items__head-item"
                    label="Сортировать по:"
                    :options="sortList"
                    :current="sort"
                    @change="sortItems"
            />
            <dropdownList
                    class="items__head-item"
                    label="Показывать:"
                    :options="viewList"
                    :current="view"
                    @change="viewItems"
                    v-if="$store.getters.userRole === 'buyer' || $store.getters.userRole === 'contractor'"
            />
        </div>
        <div class="procedures__items items">
            <div class="procedures__item procedures__item--empty item item--empty" v-if="isFirstLoad && !items.length && !loading">
                По вашему запросу ничего не найдено
            </div>
            <div class="procedures__item procedures__item--loading item item--loading" v-if="!items.length && loading">
                <div class="preloader">
                    <div class="preloader__preloader">
                        <div class="preloader__loader"></div>
                    </div>
                </div>
            </div>
            <div v-for="(item, index) in items" :key="item.id" class="procedures__item item" v-if="isFirstLoad && items.length">
                <div class="procedures__item-head">
                    <div class="procedures__item-flex">
                        <div class="procedures__item-title">№{{ item.id }}</div>
                        <div class="procedures__item-type">{{ getTenderTradingFormatName(item)}}: {{ getTenderTradingTypeName(item) }}</div>
                    </div>
                    <dl>
                        <dt>Компания</dt>
                        <dd><a :href="'/companies/'+item.company.inn" v-if="item.company">{{ item.company.name }}</a></dd><!-- todo линк на компанию -->
                    </dl>
                    <dl class="procedures__item-contact">
                        <dt>Контактное лицо</dt>
                        <dd>
                            <popupCompanyContact
                                    :company="item.company"
                                    v-if="item.company"
                            />
                        </dd>
                    </dl>
                    <dl class="procedures__item-delivery">
                        <dt>Доставка</dt>
                        <dd>
                            <template v-if="item.customer_delivery">
                                <popupTenderDelivery
                                        :delivery="item.company"
                                />
                            </template>
                            <template v-else>
                                Не требуется
                            </template>
                        </dd>
                    </dl>
                </div>
                <div class="procedures__item-body">
                    <div class="procedures__item-flex">
                        <div class="procedures__item-status">{{ getTenderStatusName(item) }}</div>
                        <div class="procedures__item-btns">
                            <a href="javascript:{}" title="Распечатать" @click="printPage(`/platform/${item.id}`)"><svg class="sprite-print"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#print"></use></svg></a>
                            <a :href="`/platform/${item.id}#documents`" title="Приложенные файлы"><svg class="sprite-paperclip"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#paperclip"></use></svg></a>
                            <a href="javascript:{}" title="Написать продавцу" v-if="$store.getters.userRole === 'contractor'"><svg class="sprite-message"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#message"></use></svg></a>
                            <a href="javascript:{}" :title="itemMarkExist(item, 'hidden') ? 'Показать' : 'Скрыть'" @click="updateItemMark(item, 'hidden', itemMarkExist(item, 'hidden') ? 'Процедура показана' : 'Процедура скрыта')" v-if="$store.getters.userRole === 'buyer' || $store.getters.userRole === 'contractor'" :class="{active: itemMarkExist(item, 'hidden')}">
                                <svg class="sprite-hide"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#hide"></use></svg>
                            </a>
                            <a href="javascript:{}" :title="itemMarkExist(item, 'favorite') ? 'Удалить из избранного' : 'Добавить в избранное'" @click="updateItemMark(item, 'favorite', itemMarkExist(item, 'favorite') ? 'Процедура удалена из избранного' : 'Процедура добавлена в избранное')" v-if="$store.getters.userRole === 'contractor'" :class="{active: itemMarkExist(item, 'favorite')}">
                                <svg class="sprite-favorite"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#favorite"></use></svg>
                            </a>
                        </div>
                    </div>
                    <div class="procedures__item-price">
                        <span>Начальная цена:</span>
                        <template v-if="item.purchase_subject.start_price">
                            {{ formatPriceWithCurrency(item.purchase_subject.start_price, item.purchase_currency) }}
                        </template>
                        <template v-if="!item.purchase_subject.start_price">
                            Без указания цены
                        </template>
                    </div>
                    <div class="procedures__item-dates">
                        <div class="procedures__item-date" v-if="item.publication_date">
                            <span>Дата размещения:</span>
                            {{ formatDateNoTime(item.publication_date) }}
                        </div>
                        <div class="procedures__item-date" v-if="item.terms_tender_to">
                            <span>Дата окончания:</span>
                            {{ formatDateNoTime(item.terms_tender_to) }}
                        </div>
                    </div>
                </div>
                <div class="procedures__item-foot">
                    <div class="procedures__item-flex">
                        <a href="javascript:{}" class="procedures__item-toggle" @click="toggleItem(index)" v-if="!expandAll">
                            <span v-html="item.isExpanded ? 'Скрыть' : 'Показать позиции'"></span>
                            <svg :class="{expanded: item.isExpanded}" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 1L5 4L1 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <div class="procedures__item-buttons">
                            <template>
                              <router-link :to="`/personal/procedures/${item.id}/applications/new`" class="btn btn--bdr procedures__item-request" v-if="$store.getters.userRole !== 'buyer' && $router">Отправить заявку</router-link>
                              <a v-if="$store.getters.userRole !== 'buyer' && !$router" :href="`/personal/procedures/${item.id}/applications/new`" class="btn btn--bdr procedures__item-request">Отправить заявку</a>
                            </template>
                            <a :href="`/platform/${item.id}`" class="btn btn--bdr procedures__item-request">Подробнее</a>
                        </div>
                    </div>
                    <div class="procedures__item-products" v-if="item.isExpanded || expandAll">
                        <table>
                            <colgroup>
                                <col />
                                <col width="74px" />
                                <col width="74px" />
                                <col width="124px" />
                                <col width="74px" />
                                <col width="74px" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Наименование позиции</th>
                                    <th>Длина</th>
                                    <th>Единица</th>
                                    <th>Сумма</th>
                                    <th>НДС</th>
                                    <th>Аналог</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="product in item.purchase_subject.products"
                                    :key="product.id"
                                    class="procedures__item-product"
                                >
                                    <td data-title="Наименование">{{ product.id }}</td>
                                    <td data-title="Длина">{{ product.quantity }}</td>
                                    <td data-title="Единица">{{ product.measure }}</td>
                                    <td data-title="Сумма">{{ formatPriceWithCurrency(product.price_for_one, product.currency) }}</td>
                                    <td data-title="НДС">{{ product.quantity }}%</td>
                                    <td data-title="Аналог">{{ product.availability_of_analogues ? 'Да' : 'Нет' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../helpers/api';
    import functions from "@/helpers/functions";
    import formatDate from '../../helpers/formatDate'
    import popupCompanyContact from "@/components/blocks/popupCompanyContact";
    import popupTenderDelivery from "@/components/blocks/popupTenderDelivery";
    import dropdownList from "@/components/blocks/dropdownList";

    export default {
        name: 'marketplaceItems',
        mixins: [api, functions, formatDate],
        components: {
            popupCompanyContact,
            popupTenderDelivery,
            dropdownList,
        },
        props: {
            filter: {
                default: () => {},
                type: Object,
            },
            currentFilter: {
                default: () => {},
                type: Object,
            },
            currentOrder: {
                default: () => {},
                type: Object,
            },
            items: {
                default: () => [],
                type: Array
            },
            loadingItems: {
                default: true,
                type: Boolean,
            },
            totalItems: {
                default: 0,
                type: Number
            },
            isFirstLoad: {
                default: false,
                type: Boolean
            },
            loading: {
                default: false,
                type: Boolean
            },
            itemsTypes: {
                default: [],
                type: Array
            },
            itemsFormats: {
                default: [],
                type: Array
            },
            itemsStatuses: {
                default: [],
                type: Array
            },
        },
        data: function() {
            return {
                expandAll: false,
                sort: 'desc',
                sortList: [
                    {
                        id: 'desc',
                        name: 'дате размещения (от новых к старым)',
                    },
                    {
                        id: 'asc',
                        name: 'дате размещения (от старых к новым)',
                    }
                ],
                view: 'all',
                viewList: [
                    {
                        id: 'all',
                        name: 'все',
                    },
                    {
                        id: 'hidden',
                        name: 'скрытые',
                    }
                ],
            }
        },
        created() {
            if (this.$store.getters.userRole === 'contractor') {
                this.viewList = [
                    {
                        id: 'all',
                        name: 'все',
                    },
                    {
                        id: 'favorite',
                        name: 'избранные',
                    },
                    {
                        id: 'hidden',
                        name: 'скрытые',
                    },
                ];
            }
        },
        methods: {
            getTenderTradingTypeName(item) {
                const type = this.getTradingType(item.tender_trading_type);
                if (type) {
                    return type.name;
                }
                return item.tender_trading_type;
            },
            getTenderTradingFormatName(item) {
                const type = this.getTradingFormat(item.tender_trading_format);
                if (type) {
                    return type.name;
                }
                return item.tender_trading_format;
            },
            getTenderStatusName(item) {
                const status = this.itemsStatuses.find(
                    (status) => status.id === item.status,
                );
                if (status) {
                    return status.name;
                }
                return item.status;
            },
            toggleItem(index) {
                this.items[index].isExpanded = !this.items[index].isExpanded;
            },
            sortItems(sortBy) {
                this.sort = sortBy;
                this.currentOrder['publication_date'] = sortBy;
                this.$emit('changeFilter');
            },
            viewItems(view) {
                this.view = view;
                this.currentFilter.showing = view;
                this.$emit('changeFilter');
            },
            itemMarkExist(item, mark) {
                return item.marks.find((item) => item.mark_code === mark);
            },
            updateItemMark(item, mark, msg) {
                if( this.itemMarkExist(item, mark) ) {
                    this.removeMarketplaceProcedureMark(item.id, mark)
                        .then((response) => {
                            // const newMark = response.data.data;
                            item.marks.forEach((i, index) => {
                                if (i.mark_code === mark) item.marks.splice(index, 1)
                            });
                            window.notificationSuccess(msg);
                            if (this.$store.getters.userRole === 'contractor' && ((mark === 'hidden' && this.view !== 'favorite') || (mark === 'favorite' && this.view === 'favorite'))) {
                                this.$emit('getItems');
                            }
                        })
                        .catch((e) => {
                            console.log(e);
                            window.notificationError('Ошибка сервера');
                        });
                } else {
                    this.addMarketplaceProcedureMark(item.id, mark)
                        .then((response) => {
                            const newMark = response.data.data;
                            item.marks.push(newMark);
                            window.notificationSuccess(msg);
                            if (this.$store.getters.userRole === 'contractor' && ((mark === 'hidden' && this.view !== 'favorite') || (mark === 'favorite' && this.view === 'favorite'))) {
                                this.$emit('getItems');
                            }
                        })
                        .catch((e) => {
                            console.log(e);
                            window.notificationError('Ошибка сервера');
                        });
                }
            },
            openPopup(evt) {
                console.log(evt.target);
                let popupContainer = document.querySelector('#default .popup__content-container');
                while(popupContainer.firstChild) popupContainer.removeChild(popupContainer.firstChild);
                popupContainer.appendChild(evt.target.nextElementSibling.cloneNode(true));
                window.openPopupById('default');
            },
            openPopupById(id) {
                window.openPopupById(id)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .procedures {
        display: flex;
        flex-direction: column;
        /*min-height: 100%;*/
        &__item-buttons {
            a {
                &:first-child {
                  margin-right: 1rem;
                }
            }
            @media(max-width: 659px) {
                order: -1;
                a {
                    &:first-child {
                        margin-right: 0;
                        margin-bottom: 1rem;
                    }
                }
            }
        }
        &__head {
            display: flex;
            justify-content: space-between;
            font-weight: 500;
            font-size: 14px;
            line-height: 160%;
            @include mq($until: widescreen) {
                flex-wrap: wrap;
            }
        }
        &__counter,
        &__expand,
        &__sort,
        &__view,
        &__filter {
            margin: 0 0 rem(24px);
            @include mq($until: widescreen) {
                margin: 0 0 rem(20px) !important;
                width: calc(50% - #{rem(12px)});
            }
        }
        &__counter {
            margin-right: auto;
            /*height: 32px;*/
            color: #9b9b9a;
            display: flex;
            align-items: center;
            @include mq($until: desktop) {
                width: calc(100% - 150px);
            }
            span {
                color: $colorTurquoise;
            }
        }
        &__expand,
        &__sort,
        &__view {
            margin-left: rem(56px);
            @include mq($until: desktop) {
                max-width: calc(33.33% - #{rem(12px)});
                width: auto;
            }
            @include mq($until: tablet) {
                max-width: none;
                width: 100%;
            }
        }
        &__expand {
            color: $colorText;
        }
        &__sort,
        &__view {
            color: $colorGray;
        }
        &__filter {
            display: none;
            align-items: center;
            width: auto !important;
            cursor: pointer;
            @include mq($until: desktop) {
                display: flex;
            }
            span {
                transition: .3s color;
                margin-left: rem(12px);
                font-weight: bold;
                font-size: rem(16px);
                line-height: 140%;
                color: $colorTurquoise;
            }
            path {
                transition: .3s fill
            }
            &:hover {
                span {
                    color: $colorTurquoiseHover
                }
                path {
                    fill: $colorTurquoiseHover
                }
            }
        }
        &__items {
            flex-grow: 1;
            position: relative;
        }
        &__loader {
            position: relative;
            height: 400px;
            animation: blur 1s linear forwards;
            &--absolute {
                position: absolute;
                z-index: 2;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
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
        &__item {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            background: #FFFFFF;
            border-radius: rem(6px);
            padding: rem(24px) rem(32px);
            font-weight: 500;

            & + & {
                margin-top: rem(24px);
            }

            &--empty {

            }

            &--loading {
                min-height: rem(200px);
            }

            @include mq($until: widescreen) {
                padding: rem(24px);
            }

            @include mq($until: tablet) {
                display: block;
            }

            &-head {
                width: calc(100% - 326px);

                @include mq($until: tablet) {
                    width: 100%;
                }
            }

            &-body {
                width: 302px;

                @include mq($until: tablet) {
                    margin: rem(24px) 0 0;
                    width: 100%;
                }
            }

            &-foot {
                margin: rem(24px) 0 0;
                border-top: 1px solid #cdcdcd;
                padding: rem(24px) 0 0;
                width: 100%;

                @include mq($until: widescreen) {
                    margin-top: rem(20px);
                    padding-top: rem(20px);
                }

            }

            &-flex {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                .procedures__item-foot & {
                    align-items: center;

                    @include mq($until: mobileLandscape) {
                        .btn {
                            order: -1;
                            width: 100%;
                        }
                    }
                }
            }

            &-title,
            &-head dt {
                margin-right: rem(24px);
                width: 115px;

                @include mq($until: widescreen) {
                    margin-right: 0;
                    width: 100%;
                }
            }

            &-type,
            &-head dd {
                width: calc(100% - 139px); // 115+24

                @include mq($until: widescreen) {
                    width: 100%;
                }
            }

            &-title,
            &-type {
                margin: 0 0 rem(20px);
                font-size: rem(18px);
                line-height: (27/18);
            }

            &-title {
                @include mq($until: widescreen) {
                    margin-bottom: 0;
                }
            }

            &-type {
                color: $colorGray;
                @include mq($until: widescreen) {
                    margin-bottom: rem(8px);
                }
                @include mq($until: tablet) {
                    margin-bottom: 0;
                }
            }

            &-head dl {
                display: flex;
                justify-content: flex-start;
                margin: rem(12px) 0 0;
                font-weight: 500;

                @include mq($until: widescreen) {
                    display: block;
                }

                dt {
                    color: $colorGray;
                }

                dd {
                    margin: 0;

                    a {
                        color: $colorTurquoise;

                        &:hover {
                            color: $colorTurquoiseHover;
                        }
                    }
                }
            }

            &-status {
                width: 134px;
                margin-right: rem(20px);
            }

            &-btns {
                display: flex;
                justify-content: flex-start;
                width: 148px;

                a {
                    display: block;
                    width: 20px;
                    height: 20px;

                    + a {
                        margin-left: 12px;
                    }

                    &:hover {
                        svg {
                            fill: $colorTurquoiseHover;
                        }
                    }

                    &.active {
                        svg.sprite-hide,
                        svg.sprite-favorite {
                            fill: $colorTurquoise;
                        }

                        &:hover {
                            svg.sprite-hide,
                            svg.sprite-favorite {
                                fill: $colorTurquoiseHover;
                            }
                        }
                    }

                    svg {
                        display: block;
                        width: 20px;
                        height: 20px;
                        fill: $colorGray;
                        transition: fill $animation;

                        &.sprite-print,
                        &.sprite-paperclip,
                        &.sprite-message {
                            fill: $colorTurquoise;
                        }
                    }
                }
            }

            &-price,
            &-date {
                span {
                    display: block;
                    color: $colorGray;
                    margin: 0 0 rem(3px);
                    font-size: rem(14px);
                    line-height: (20/14);
                }
            }

            &-price {
                margin: rem(32px) 0 0;
                font-size: rem(20px);
                line-height: (27/20);
                white-space: nowrap;
            }

            &-date {
                margin: rem(24px) 0 0;
                width: calc(50% - 12px);
                font-size: rem(14px);
                line-height: (20/14);
            }

            &-dates {
                display: flex;
                justify-content: space-between;
            }

            &-toggle {
                padding-right: 20px;
                color: $colorTurquoise;
                position: relative;

                @include mq($until: mobileLandscape) {
                    margin-top: rem(20px);
                }

                &:hover {
                    color: $colorTurquoiseHover;

                    svg {
                        stroke: $colorTurquoiseHover;
                    }
                }

                svg {
                    margin-top: -2.5px;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    stroke: $colorTurquoise;
                    stroke-width: 2;
                    transition: stroke $animation, transform $animation;

                    &.expanded {
                        transform: rotate(180deg);
                    }
                }
            }

            &-request {
                margin-left: auto;
            }

            &-products {
                margin-top: rem(24px);
                @include mq($until: tablet) {
                    margin-top: 0;
                }
                table {
                    width: 100%;
                    table-layout: fixed;
                    font-size: rem(14px);
                    line-height: (22.4/14);
                    @include mq($until: tablet) {
                        display: block;
                        thead {
                            display: none;
                        }
                        tbody,
                        tr,
                        td {
                            display: block;
                            width: 100%;
                        }
                    }
                }
                tr {
                    @include mq($until: tablet) {
                        border-top: 1px solid #cdcdcd;
                        padding: rem(20px) 0 rem(12px);
                    }
                }
                th + th,
                td + td {
                    padding-left: rem(24px);
                }
                th {
                    padding: 0;
                    font-weight: 500;
                    text-align: left;
                    color: $colorGray;
                }
                td {
                    padding: rem(22px) 0;
                    @include mq($until: tablet) {
                        clear: left;
                        padding: rem(4px) 0;
                        padding-left: 120px !important;
                        min-height: rem(30.4px); // 4 + 22.4 + 4
                        &::before {
                            content: attr(data-title);
                            float: left;
                            margin-left: -120px;
                            display: block;
                            width: 110px;
                            color: $colorGray;
                        }
                    }
                }
                tbody td {
                    @include mq($from: tablet) {
                        border-bottom: 1px solid #cdcdcd;
                    }
                }
            }

            &-product {}
        }
    }
    @keyframes blur {
        0%   {
            backdrop-filter: blur(0px);
        }
        100% {
            backdrop-filter: blur(2px);
        }
    }
</style>
