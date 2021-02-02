<template>
    <div class="tender-item__menu">
        <div v-if="$store.getters.userRole === 'buyer' && this.$store.getters.companyBuyer.find((firm) => firm.inn === company.inn)" class="tender-item__menu-inner">
            <div
                    v-for="(item, key) in buyerMenu"
                    :key="key"
                    class="tender-item__menu-item"
            >
                <span @click="applyBuyerMenuAction($event, item.action)" class="tender-item__menu-link">{{ item.name }}</span>
            </div>
        </div>
        <div v-else class="tender-item__menu-inner">
            <div
                    v-for="item in tabs"
                    :key="item.url"
                    class="js-more__item"
                    :class="[activeTab === item.url ? 'tender-item__menu-item--active' : '', 'tender-item__menu-item']"
            >
                <a :href="item.url" @click="changeActiveTab($event, item.url)" class="tender-item__menu-link">{{ item.name }}</a>
            </div>
        </div>
        <div 
            v-if="
                $store.getters.userRole === 'buyer' 
                && this.$store.getters.companyBuyer.find((firm) => firm.inn === company.inn)
                && visibleRebiddingBtn
            " 
            class="tender-item__menu-rebidding"
        >
            <span class="btn btn--bdr" @click="openModal('#winner-choice__rebidding-modal')">Объявить переторжку</span>
        </div>
        <div id="winner-choice__rebidding-modal" class="popup popup--alt">
            <div class="popup__body">
                <div class="popup__content">
                    <a href="javascript:{}" class="popup__close" @click="closeModal('#winner-choice__rebidding-modal')"><svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg></a>
                    <div class="popup__title">Объявление переторжки</div>
                    <div class="popup__content-container">
                         <ValidationObserver ref="form" tag="div" mode="eager">
                            <form class="popup__form" @submit.prevent="sendForm" slot-scope="{ valid }">
                                <radio-input
                                    name="rebidding_type"
                                    v-model="rebiddingData.declared_rebidding_type"
                                    :label="[
                                    {name: 'Новый запрос цен', id: 'price_request'},
                                    {name: 'Переторжка', id: 'rebidding'}
                                    ]"
                                    rules="required"
                                ></radio-input>
                                <date-time
                                    v-if="rebiddingData.declared_rebidding_type === 'price_request'"
                                    mode="dateTime"
                                    v-model="rebiddingData.rebidding_date_end"
                                    label="Дата и время окончания"
                                    placeholder="Выберите дату"
                                    :rules="{required: true}"
                                ></date-time>
                                <date-time
                                    v-if="rebiddingData.declared_rebidding_type === 'rebidding'"
                                    mode="dateTime"
                                    v-model="rebiddingData.rebidding_date_start"
                                    label="Дата и время начала акциона"
                                    placeholder="Выберите дату"
                                    :rules="{required: true}"
                                ></date-time>
                                <InputInput
                                    v-model="rebiddingData.minimal_step"
                                    label="Минимальный шаг аукциона:"
                                    parent-class="field__container"
                                    validation-name="Минимальный шаг аукциона"
                                    placeholder="Введите значение"
                                    rules="required"
                                />
                                <SelectInput
                                    v-if="rebiddingData.declared_rebidding_type === 'rebidding'"
                                    parentClass="field__container"
                                    label="Время на ответ участника:"
                                    rules="required"
                                    :isSingle="true"
                                    placeholder="Выберите из списка"
                                    :close="true"
                                    v-model="rebiddingData.response_time_minutes"
                                    :options="answerTimes"
                                />
                                <button type="submit" class="btn" :disabled="!valid">Сохранить</button>
                            </form>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SelectInput from "@/components/forms/Select";
import RadioInput from '@/components/forms/Radio.vue';
import DateTime from '@/components/forms/DateTime.vue';
import InputInput from '@/components/forms/Input';
import functions from '@/helpers/functions';
import formatDate from '@/helpers/formatDate';

export default {
    name: 'TenderItemMenu',

    components: {
        SelectInput,
        RadioInput,
        DateTime,
        InputInput
    },

    props: {
        activeTab: {
            type: String,
            required: true,
        },
        activeLotTab: {
            required: true,
        },
        tabs: {
            type: Array,
            default: () => [],
            required: true,
        },
        buyerMenu: {
            type: Array,
            default: () => [],
            required: true,
        },
        tenderItemData: {
            type: Object,
            required: true,
        },
        company: {
            type: Object,
            required: true,
        },
        visibleRebiddingBtn: {
            type: Boolean,
            default: false
        }
    },

    mixins: [functions, formatDate],

    data() {
        return {
            answerTimes: [
                {id: 10, name: '10 мин'},
                {id: 20, name: '20 мин'},
                {id: 30, name: '30 мин'},
                {id: 40, name: '40 мин'},
                {id: 50, name: '50 мин'},
                {id: 60, name: '60 мин'}],
            rebiddingData: {
                response_time_minutes: null,
                declared_rebidding_type: 'price_request',
                rebidding_date_start: null,
                rebidding_date_end: null,
                minimal_step: null
            }
        }
    },

    methods: {
        changeActiveTab(evt, hash) {
            evt.preventDefault();
            this.$emit('changeTab', evt, hash, true);
        },
        applyBuyerMenuAction(evt, action) {
            if (action === 'edit') {
                const href = '/personal/procedures/' + this.tenderItemData.id
                document.location.href = href
            }
            if (action === 'attach-protocols') {
                this.changeActiveTab(evt, '#protocols')
            }
            if (action === 'winner') {
                evt.preventDefault();
                this.$emit('chooseWinner', true);
            }
            // if (action === 'return') {
            //     evt.preventDefault();
            //     this.$emit('chooseWinner', false);
            // }
        },
        openModal(popupId) {
            openPopupById(popupId);
        },
        closeModal(popupId) {
            closePopupById(popupId);
        },
        sendForm(evt) {
            evt.preventDefault();
            let fData = {
                lot: this.activeLotTab === 'all' ? 1 : this.activeLotTab,
                response_time_minutes: this.rebiddingData.response_time_minutes.id,
                declared_rebidding_type: this.rebiddingData.declared_rebidding_type,
            };
            if (this.rebiddingData.declared_rebidding_type === 'price_request') {
                fData.rebidding_date_end = this.formatDateForFilter(this.rebiddingData.rebidding_date_end);
            }
            if (this.rebiddingData.declared_rebidding_type === 'rebidding') {
                fData.rebidding_date_start = this.formatDateForFilter(this.rebiddingData.rebidding_date_start);
                fData.minimal_step = this.rebiddingData.minimal_step;
            }
            const formDataObj = this.objectToFormData(fData);
            console.log(formDataObj);
            this.sendRebidding(this.tenderItemData.id, formDataObj)
                .then(() => {
                    window.notificationSuccess('Объявлена переторжка');
                    closePopupById('#winner-choice__rebidding-modal');
                })
                .catch((response) => {
                    window.notificationError('Ошибка сервера');
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-item__menu {
        margin-left: 32px;
        width: 315px;
        flex-shrink: 0;
        @include mq($until: widescreen) {
            width: 296px;
        }
        @include mq($until: desktop) {
            width: 100%;
            margin-bottom: 2rem;
        }
        @media print {
            display: none !important;
        }
        &-inner {
            padding: rem(20px) rem(32px);
            background-color: #fff;
        }
        &-item {
            padding: rem(12px) 0;
            border-bottom: 1px solid $colorBdr;
            &:last-child {
                border-bottom: none;
            }
            &--active .tender-item__menu-link {
                color: $colorTurquoise;
            }
        }
        &-link {
            font-size: rem(14px);
            line-height: 160%;
            color: $colorTextLight;
            cursor: pointer;
            &:hover,
            &:focus {
                color: $colorTurquoise;
            }
        }
        &-rebidding {
            padding-top: 1rem;
        }
        .btn {
            width: 100%;
        }
    }
</style>