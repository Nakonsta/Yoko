<template>
    <div class="procedure-application">
        <div v-if="loading" class="preloader">
            <div class="preloader__preloader">
                <div class="preloader__loader"></div>
            </div>
        </div>
        <div v-else class="procedure-application__content">
            <procedure-application-title
                title="Заявка на участие в торговой процедуре"
                margin="0 0 32px"
            ></procedure-application-title>
            <div class="procedure-application__section">
                <procedure-application-title
                    title="Сведения о закупке"
                    subtitle
                ></procedure-application-title>
                <div class="divider"></div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Номер закупки:</div>
                    <router-link class="procedure-application__section-link" to="#">{{
                        procedure.id
                    }}</router-link>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Номер в ЕИС:</div>
                    <a class="procedure-application__section-link">46251781948</a>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">
                        Дата окончания подачи заявок:
                    </div>
                    <div class="procedure-application__section-text">
                        {{ procedure.purchase_term.application_end_date }}
                    </div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Объект закупки:</div>
                    <div class="procedure-application__section-text">
                        {{ procedure.purchase_subject.description }}
                    </div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Способ закупки:</div>
                    <div class="procedure-application__section-text">{{ tradingType.type }}</div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Компания - организатор:</div>
                    <a class="procedure-application__section-link">ПАО “Группа ПИК”</a>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Начальная цена с НДС:</div>
                    <div class="procedure-application__section-text">
                        {{ procedure.purchase_subject.start_price | numberWithSpaces }} ₽
                    </div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Валюта:</div>
                    <div class="procedure-application__section-text">{{ currencyType }}</div>
                </div>
                <div class="divider divider--no-margin"></div>
            </div>
            <div class="procedure-application__section">
                <procedure-application-title
                    title="Сведения об обеспечении"
                    subtitle
                ></procedure-application-title>
                <div class="divider"></div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Обеспечение контракта:</div>
                    <div class="procedure-application__section-text">Без обеспечения</div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Обеспечение заявки:</div>
                    <div class="procedure-application__section-text">15 000 ₽</div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Подтверждающий документ:</div>
                </div>
                <div class="divider divider--no-margin"></div>
            </div>
            <div class="procedure-application__section">
                <procedure-application-title
                    title="Сведения о лоте"
                    subtitle
                ></procedure-application-title>
                <div class="divider"></div>
            </div>
            <div class="procedure-application__section">
                <procedure-application-title
                    title="Сведения об участнике"
                    subtitle
                ></procedure-application-title>
                <div class="divider"></div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Название:</div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Полное название:</div>
                    <div class="procedure-application__section-text"></div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">ИНН:</div>
                    <div class="procedure-application__section-text">{{}}</div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Юридический адрес:</div>
                    <div class="procedure-application__section-text"></div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Фактический адрес:</div>
                    <div class="procedure-application__section-text"></div>
                </div>
                <div class="procedure-application__section-row">
                    <div class="procedure-application__section-title">Контактное лицо:</div>
                    <div class="procedure-application__section-text"></div>
                </div>
                <div class="divider divider--no-margin"></div>
            </div>
            <div class="procedure-application__section">
                <procedure-application-title
                    title="Дополнительные документы"
                    subtitle
                ></procedure-application-title>
                <div class="procedure-application__section-title">Дополнительная информация</div>
                <div class="procedure-application__textarea">
                    <textarea rows="3" placeholder="Введите текст"></textarea>
                    <procedure-application-tooltip></procedure-application-tooltip>
                </div>
                <div class="divider divider--no-margin"></div>
            </div>
            <procedure-application-checkbox
                :label="tradingType.checkboxLabel"
            ></procedure-application-checkbox>
            <div v-if="viewType.isCreate" class="procedure-application__buttons">
                <button disabled class="procedure-application__button">
                    Подписать и отправить
                </button>
                <button
                    disabled
                    class="procedure-application__button procedure-application__button--second"
                >
                    Сохранить черновик
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../../../helpers/api'
import functions from '../../../../helpers/functions'

import ProcedureApplicationTitle from '../../../../components/admin/procedures/application/ProcedureApplicationTitle.vue'
import ProcedureApplicationCheckbox from '../../../../components/admin/procedures/application/ProcedureApplicationCheckbox.vue'
import ProcedureApplicationTooltip from '../../../../components/admin/procedures/application/ProcedureApplicationTooltip.vue'
export default {
    components: {
        ProcedureApplicationTooltip,
        ProcedureApplicationCheckbox,
        ProcedureApplicationTitle
    },
    mixins: [api, functions],
    filters: {
        numberWithSpaces(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }
    },
    data() {
        return {
            procedure: {},
            application: {},
            loading: true
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        appId() {
            return this.$route.params.appid
        },
        companies() {
            return this.$store.getters.userRole.toLowerCase() === 'buyer'
                ? this.$store.getters.companyBuyer
                : this.$store.getters.companyContractor
        },
        tradingType() {
            switch (this.procedure.tender_trading_type) {
                case 'request_prices':
                    return {
                        type: 'Запрос цен',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                case '':
                    return { type: 'Аукцион', checkboxLabel: 'Подключить автобота' }
                    break
                case '':
                    return {
                        type: 'Запрос предложений',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                case '':
                    return {
                        type: 'Конкурс',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                case '':
                    return {
                        type: 'Закупка у единственного поставщика',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
                case '':
                    return {
                        type: 'Коммерческая закупка',
                        checkboxLabel: 'Согласие участника закупки на "поставку товара"'
                    }
                    break
            }
        },
        viewType() {
            return {
                isCreate: this.appId === 'new'
            }
        },
        currencyType() {
            switch (this.procedure.purchase_currency) {
                case 'rub':
                    return 'Рубль'
                    break
                case 'eur':
                    return 'Евро'
                    break
                case 'usd':
                    return 'Доллар'
                    break
                default:
                    return 'Неизвестно'
                    break
            }
        }
    },
    methods: {
        getProcedureDetails() {
            this.loading = true
            this.fetchTenderItem(this.id)
                .then(({ data }) => {
                    this.procedure = data?.data ?? {}
                    console.log(this.procedure)
                })
                .finally(() => (this.loading = false))
        },
        createApplication() {
            this.loading = true
            this.sendProcedureApplication(this.id)
                // .then(({ data }) => {})
                .finally(() => (this.loading = false))
        }
    },
    created() {
        this.getProcedureDetails()
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.procedure-application {
    padding: rem(40px);
    background-color: #fff;
    border-radius: 6px;
    min-height: 300px;

    &__content {
        width: 100%;
    }

    &__section {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        margin-bottom: rem(48px);
    }

    &__section-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        width: 100%;
        margin-bottom: rem(24px);

        @include mq($until: tablet) {
            flex-flow: row wrap;
        }
    }

    &__section-title {
        margin-right: rem(69px);
        width: 220px;
        min-width: 220px;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: $lightcolorText;
        white-space: nowrap;

        @include mq($until: tablet) {
            margin-right: rem(8px);
        }
    }

    &__section-text {
        margin-right: auto;

        font-family: Roboto;
        font-size: rem(14px);
        color: $lightcolorText;
    }

    &__section-link {
        margin-right: auto;

        font-family: Roboto;
        font-size: rem(14px);
        text-decoration-line: underline;
        color: $colorTurquoise;
    }

    &__textarea {
        width: 100%;

        textarea {
            width: 100%;
            resize: none;
            border-color: $colorGray;
        }
    }

    &__buttons {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        margin-top: rem(56px);
    }

    &__button {
        padding: rem(13px) rem(60px);
        background-color: $colorTurquoise;
        border-radius: 6px;
        border: 1px solid $colorTurquoise;
        transition: 0.3s;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #ffffff;

        &:active,
        &:hover {
            background-color: lighten($color: $colorTurquoise, $amount: 5%);
        }

        &:disabled {
            border: 1px solid $colorGray;
            background-color: transparent;
            color: $colorGray;

            &:hover {
                background-color: lighten($color: $colorGray, $amount: 25%);
            }
        }

        &--second {
            margin-left: rem(16px);
            background-color: #f4f4f4;
            color: $colorTurquoise;

            &:active,
            &:hover {
                background-color: lighten($color: #f4f4f4, $amount: 1%);
            }
        }
    }
}

.divider {
    width: 100%;
    height: 1px;
    background-color: $borderColor;
    margin: rem(12px) 0 rem(20px);

    &--no-margin {
        margin: 0;
    }
}
</style>
