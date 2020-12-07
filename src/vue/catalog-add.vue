<template>
    <div class="form">
        <div class="form__title">Добавление маркоразмеров</div>
        <ValidationObserver ref="form" tag="div" mode="eager">
            <form class="support-form__form" @submit.prevent="sendForm" slot-scope="{ valid }">
                <div class="form__grid">
                    <ValidationProvider name="Юридическое лицо" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                        <span class="field__label">Юридическое лицо</span>
                        <input type="hidden" v-model="formForSend.company_id">
                        <multiselect
                                v-model="company"
                                class="form-select"
                                deselect-label="Can't remove this value"
                                track-by="id"
                                label="name"
                                selectedLabel=""
                                selectLabel=""
                                deselectLabel=""
                                placeholder="Выбрать юридическое лицо"
                                :options="companies"
                                :searchable="false"
                                :allow-empty="false"
                                @select="companySelect"
                        >
                        </multiselect>
                        <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider name="Название" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                        <span class="field__label">Название</span>
                        <input :class="{field: true, error: failed}" type="text" v-model="formForSend.mark" readonly="readonly">
                        <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <fieldset>
                    <div class="legend">Описание Маркоразмера:</div>
                    <template v-for="(item, index) in formForSend.marksize_description">
                        <div class="form__line">
                            <ValidationProvider name="Слой" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--short">
                                <span class="field__label">Слой</span>
                                <input :class="{field: true, error: failed}" type="text" v-model="item.layer" maxlength="5">
                                <!--<span v-show="failed" class="field__error">{{ errors[0] }}</span>-->
                            </ValidationProvider>
                            <ValidationProvider name="Описание" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--long">
                                <span class="field__label">Описание</span>
                                <input :class="{field: true, error: failed}" type="text" v-model="item.description" placeholder="Введите текстовое описание слоя" maxlength="100">
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="field__remove" v-if="index > 2">
                                <a href="javascript:{}" @click="layerRemove($event, item, index)">
                                    <svg class="sprite-cancel"><use xmlns\:xlink="http://www.w3.org/1999/xlink" xlink\:href="./img/sprite.svg#cancel"></use></svg>
                                </a>
                            </div>
                        </div>
                    </template>
                    <div class="field__add" v-show="formForSend.marksize_description.length < 10">
                        <a href="javascript:{}" @click="layerAdd($event)">
                            <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                            Добавить слой
                        </a>
                    </div>
                    <ValidationProvider name="Дополнительная информация" v-slot="{ errors, failed }" tag="label" class="field__container">
                        <span class="field__label">Дополнительная информация о маркоразмере</span>
                        <textarea :class="{field: true, error: failed}" name="description_additional" v-model="formForSend.marksize_description_additional" placeholder="Введите текст" @keydown="countSymbols($event, 1000)"></textarea>
                        <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </fieldset>
                <fieldset>
                    <div class="legend">Характеристики Маркоразмера:</div>
                    <div class="form__grid">
                        <ValidationProvider name="Тип кабеля" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Тип кабеля</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_cable_type" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Защитный покров" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Защитный покров</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_protective_cover" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Тип жил" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Тип жил</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_veins_type" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Калибр" v-slot="{ errors, failed }" rules="required|max_value:99999" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Калибр</span>
                            <input :class="{field: true, error: failed}" type="number" v-model="formForSend.property_caliber" placeholder="Введите значение" @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Количество жил" v-slot="{ errors, failed }" rules="required|max_value:99999" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Количество жил</span>
                            <input :class="{field: true, error: failed}" type="number" v-model="formForSend.property_veins_count" placeholder="Введите значение"  @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Количество волокон" v-slot="{ errors, failed }" rules="required|max_value:99999" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Количество волокон</span>
                            <input :class="{field: true, error: failed}" type="number" v-model="formForSend.property_fiber_count" placeholder="Введите значение"  @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Сечение" v-slot="{ errors, failed }" rules="required|max_value:99999" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Сечение</span>
                            <input :class="{field: true, error: failed}" type="number" v-model="formForSend.property_execution" placeholder="Введите значение" @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Размер волокон" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Размер волокон</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_fiber_size" placeholder="Введите значение" @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Применение" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Применение</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_use" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Условия прокладки" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Условия прокладки</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_laying_conditions" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Допустимое напряжение" v-slot="{ errors, failed }" rules="required|max_value:99999" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Допустимое напряжение</span>
                            <input :class="{field: true, error: failed}" type="number" v-model="formForSend.property_voltage_allowable" placeholder="Введите значение" @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Изоляция" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Изоляция</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_isolation" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Мощность" v-slot="{ errors, failed }" rules="required|max_value:99999" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Мощность</span>
                            <input :class="{field: true, error: failed}" type="number" v-model="formForSend.property_power" placeholder="Введите значение" @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Волновое сопротивление" v-slot="{ errors, failed }" rules="required|max_value:99999" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Волновое сопротивление</span>
                            <input :class="{field: true, error: failed}" type="number" v-model="formForSend.property_resistance_wave" placeholder="Введите значение" @keyup="onlyDigits">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Исполнение" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Исполнение</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_section" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Тип волокна" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Тип волокна</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_fiber_type" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider name="Материал оболочки" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                            <span class="field__label">Материал оболочки</span>
                            <input :class="{field: true, error: failed}" type="text" v-model="formForSend.property_material_shell" placeholder="Введите значение" maxlength="50">
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </fieldset>
                <template v-for="(item, index) in formForSend.documents.certificates">
                    <fieldset class="certificate">
                        <div class="field__remove" v-if="formForSend.documents.certificates.length > 1">
                            <a href="javascript:{}" @click="certificateRemove($event, item, index)">
                                <svg class="sprite-cancel"><use xmlns\:xlink="http://www.w3.org/1999/xlink" xlink\:href="./img/sprite.svg#cancel"></use></svg>
                            </a>
                        </div>
                        <div class="legend">Загрузить сертификат</div>
                        <ValidationProvider name="Сертификат" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                            <Uploader v-model="item.file" :preview="true" extensions=".pdf, .jpg, .png" :metatypes="['application/pdf','image/jpeg','image/png']"></Uploader>
                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <div class="form__grid">
                            <ValidationProvider name="Номер сертификата" v-slot="{ errors, failed }" rules="required" tag="label" class="field__container field__container--w50">
                                <span class="field__label">Номер сертификата</span>
                                <input :class="{field: true, error: failed}" type="text" v-model="item.properties.number" placeholder="Введите номер">
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="field__container field__container--w50">
                                <span class="field__label">Выберите дату начала и окончания сертификата</span>
                                <div class="field__range">
                                    <div class="field__range-from">
                                        <ValidationProvider name="Дата начала сертификата" v-slot="{ errors, failed }" rules="required" tag="div" class="field__range-start" :mode="validateDate">
                                            <datepicker
                                                    placeholder="Дата начала"
                                                    :monday-first=true
                                                    :format="picker.format"
                                                    :language="picker.locale"
                                                    :input-class="{field: true, error: failed}"
                                                    v-model="item.properties.date_start"
                                                    :disabled-dates="{ from: item.properties.date_end, to: picker.disabledTo }"
                                                    :required="true"
                                            >
                                                <svg class="sprite-calendar" slot="afterDateInput"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#calendar"></use></svg>
                                            </datepicker>
                                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <span>&mdash;</span>
                                    <div class="field__range-to">
                                        <ValidationProvider name="Дата окончания сертификата" v-slot="{ errors, failed }" rules="required" tag="div" class="field__range-end" :mode="validateDate">
                                            <datepicker
                                                placeholder="Дата окончания"
                                                :monday-first=true
                                                :format="picker.format"
                                                :language="picker.locale"
                                                :input-class="{field: true, error: failed}"
                                                v-model="item.properties.date_end"
                                                :disabled-dates="{ from: picker.disabledFrom, to: item.properties.date_start }"
                                                :required="true"
                                            >
                                                <svg class="sprite-calendar" slot="afterDateInput"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#calendar"></use></svg>
                                            </datepicker>
                                            <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </template>
                <div class="field__add">
                    <a href="javascript:{}" @click="certificateAdd($event)">
                        <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                        Добавить Сертификат
                    </a>
                </div>
                <div class="btns">
                    <button type="submit" class="btn" :disabled="!valid">Добавить</button>
                    <a href="#" class="btn btn--bdr">Отменить</a>
                </div>
                <div class="form__note">Обратите внимание, добавленный вами маркоразмер отправится на модерацию</div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import api from './helpers/api';
    import Uploader from "./components/uploder.vue";
    import moment from 'moment';
    import {ru} from "vuejs-datepicker/src/locale";

    export default {
        name: 'CatalogAdd',
        components: {
            Uploader,
        },
        mixins: [api],
        data: function () {
            return {
                company: null,
                companies: [],
                picker: {
                    start_date: '',
                    end_date: '',
                    format: "yyyy-MM-dd",
                    locale: ru,
                    disabledFrom: null,
                    disabledTo: null,
                },
                formForSend: {
                    company_id: null,
                    mark: null,
                    marksize_description: [
                        {
                            layer: '',
                            description: '',
                        },
                        {
                            layer: '',
                            description: '',
                        },
                        {
                            layer: '',
                            description: '',
                        },
                    ],
                    marksize_description_additional: null,
                    property_cable_type: null,
                    property_protective_cover: null,
                    property_veins_type: null,
                    property_caliber: null,
                    property_veins_count: null,
                    property_fiber_count: null,
                    property_execution: null,
                    property_fiber_size: null,
                    property_use: null,
                    property_laying_conditions: null,
                    property_voltage_allowable: null,
                    property_isolation: null,
                    property_power: null,
                    property_resistance_wave: null,
                    property_section: null,
                    property_fiber_type: null,
                    property_material_shell: null,
                    documents: {
                        certificates: [
                            {
                                // name: '',
                                // url: '',
                                file: null,
                                properties: {
                                    number: null,
                                    date_start: null,
                                    date_end: null,
                                }
                            },
                        ],
                    },
                },
            }
        },
        watch: {
            formForSend: {
                handler: function(newValue, oldValue) {
                    let mark = '';
                    for( let i=0; i<this.formForSend.marksize_description.length; i++ ) {
                        mark += this.formForSend.marksize_description[i].layer || '';
                    }
                    mark += ' ';
                    mark += this.formForSend.property_veins_count || '';
                    mark += 'x';
                    mark += this.formForSend.property_execution || '';
                    mark += '-';
                    mark += this.formForSend.property_voltage_allowable || '';
                    this.formForSend.mark = mark;
                },
                deep: true,
            },
        },
        created() {
            this.companies = this.$store.state.auth.loggedIn ? this.$store.state.auth.user.companies : [];
        },
        methods: {
            companySelect: function (selectedCompany, id) {
                this.formForSend.company_id = selectedCompany.id;
            },
            layerAdd: function (evt) {
                evt.preventDefault();
                this.formForSend.marksize_description.push({
                    layer: '',
                    description: '',
                });
            },
            layerRemove: function (evt, layer, index) {
                evt.preventDefault();
                this.formForSend.marksize_description.splice(index, 1);
            },
            certificateAdd: function (evt) {
                evt.preventDefault();
                this.formForSend.documents.certificates.push({
                    // name: '',
                    // url: '',
                    file: null,
                    properties: {
                        number: null,
                        date_start: null,
                        date_end: null,
                    }
                });
            },
            certificateRemove: function (evt, layer, index) {
                evt.preventDefault();
                this.formForSend.documents.certificates.splice(index, 1);
            },
            certificateDates: function (evt, layer, index) {

            },
            countSymbols(evt, max) {
                if ( evt.target.value.length >= max ) {
                    evt.target.value = evt.target.value.substring(0,max);
                    if (evt.keyCode >= 48 && evt.keyCode <= 90) {
                        evt.preventDefault();
                    }
                }
            },
            onlyDigits(evt) {
                evt.target.value = evt.target.value.replace(/[^\d]+/g,'');
            },
            onlyDigitsWithSlash(evt) {
                function parse(d) {
                    if( d.toString().indexOf(',') === -1 ) return d;
                    d = d.split(',');
                    d.splice(2);
                    d[0] = d[0].replace(/^0+/,'');
                    d[1] = d[1].replace(/0+$/,'').substr(0,2);
                    return d.join(',');
                }
                let v = evt.target.value.replace(/[^\d,\/]+/g,'');
                if( v.toString().indexOf('/') !== -1 ) {
                    v = v.split('/');
                    v.splice(2);
                    v[0] = parse(v[0]);
                    v[1] = parse(v[1]);
                    v = v.join('/');
                } else {
                    v = parse(v);
                }
                evt.target.value = v;
            },
            objectToFormData(data) {
                const fData = new FormData();
                function appendFormData(data, root, formDataObj) {
                    root = root || '';
                    if (data instanceof File) {
                        formDataObj.append(root, data);
                    } else if (data instanceof Date) {
                        formDataObj.append(root, moment(data).format('YYYY-MM-DD'));
                    } else if (Array.isArray(data)) {
                        for (let i = 0; i < data.length; i++) {
                            appendFormData(data[i], root + '[' + i + ']', formDataObj);
                        }
                    } else if (typeof data === 'object' && data) {
                        for (const key in data) {
                            // eslint-disable-next-line
                            if (data.hasOwnProperty(key)) {
                                if (root === '') {
                                    appendFormData(data[key], key, formDataObj);
                                } else {
                                    appendFormData(data[key], root + '[' + key + ']', formDataObj);
                                }
                            }
                        }
                    } else if (data !== null && typeof data !== 'undefined') {
                        formDataObj.append(root, data);
                    }
                }
                appendFormData(data, '', fData);
                return fData;
            },
            sendForm(evt) {
                evt.preventDefault();
                const fData = {
                    // company_id: this.formForSend.company_id,
                    company_id: 7, // todo TEST data
                    mark: this.formForSend.mark,
                    marksize_description: this.formForSend.marksize_description,
                    marksize_description_additional: this.formForSend.marksize_description_additional,
                    property_cable_type: this.formForSend.property_cable_type,
                    property_protective_cover: this.formForSend.property_protective_cover,
                    property_veins_type: this.formForSend.property_veins_type,
                    property_caliber: parseInt(this.formForSend.property_caliber),
                    property_veins_count: this.formForSend.property_veins_count,
                    property_fiber_count: this.formForSend.property_fiber_count,
                    property_execution: this.formForSend.property_execution,
                    property_fiber_size: this.formForSend.property_fiber_size,
                    property_use: this.formForSend.property_use,
                    property_laying_conditions: this.formForSend.property_laying_conditions,
                    property_voltage_allowable: parseInt(this.formForSend.property_voltage_allowable),
                    property_isolation: this.formForSend.property_isolation,
                    property_power: parseInt(this.formForSend.property_power),
                    property_resistance_wave: parseInt(this.formForSend.property_resistance_wave),
                    property_section: parseInt(this.formForSend.property_section),
                    property_fiber_type: this.formForSend.property_fiber_type,
                    property_material_shell: this.formForSend.property_material_shell,
                    documents: this.formForSend.documents,
                };
                const formDataObj = this.objectToFormData(fData);
                window.openLoader();
                this.fetchCatalogAdd(formDataObj)
                    .then(() => {
                        window.closeLoader();
                        window.notificationSuccess('Ваш макроразмер отправлен');
                    })
                    .catch((response) => {
                        console.log(response.message);
                        window.closeLoader();
                        window.notificationError('Ошибка сервера');
                    });
            },
            validateDate() {
                return { on: ['blur', 'input', 'change'] };
            },
            validateFile() {
                return { on: ['blur', 'input', 'change'] };
            },
        }
    }
</script>

<style lang="scss">
    @import "../assets/sass/variables/variables";
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";
    @import "../assets/sass/mixins/mq";

    .uploader {
        margin: 0 0 rem(32px);
        + .field__error {
            margin: rem(-27px) 0 rem(32px);
        }
    }

    .certificate {
        position: relative;

        legend,
        .legend {
            margin-right: rem(60px);
        }

        .field__remove {
            position: absolute;
            margin: 0 0 rem(24px);
            padding: 0 0 rem(8px);
            right: 0;
            top: 0;

            a {
                justify-content: center;
            }
        }
    }

    .multiselect__option--selected {
        background: #cbeaed;
    }
</style>