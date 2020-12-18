<template>
    <div class="form form--white">
        <div class="form__title">Добавление продукции</div>
        <ValidationObserver ref="form" tag="div" mode="eager">
            <form class="support-form__form" @submit.prevent="sendForm" slot-scope="{ valid }">
                <div class="form__grid">
                    <SelectInput
                            parentClass="field__container field__container--w50"
                            label="Юридическое лицо"
                            placeholder="Выберите юридическое лицо"
                            rules="required"
                            :isSingle="true"
                            :close="true"
                            v-model="company"
                            :options="companies"
                            :select="companySelect"
                    />
                    <SelectInput
                            parentClass="field__container field__container--w50"
                            label="Тип добавляемой продукции"
                            placeholder="Выберите тип продукции"
                            rules="required"
                            :isSingle="true"
                            :close="true"
                            v-model="type"
                            :options="types"
                            :select="typeSelect"
                    />
                </div>
                <template v-if="type && type.id === 'mark'">
                    <div class="tabs tabs--line">
                        <ul>
                            <li :class="{active: view === 'form'}"><a href="javascript:{}" @click="viewSelect('form')">Заполнить форму</a></li>
                            <li :class="{active: view === 'import'}"><a href="javascript:{}" @click="viewSelect('import')">Импортировать Файл</a></li>
                        </ul>
                    </div>
                    <template v-if="view === 'import'">
                        <Uploader
                                v-model="markImport"
                                extensions=".csv, .xlsx"
                                :metatypes="['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
                        >
                            <p>1. Скачайте <a href="/content/template-mark.xlsx">шаблон</a> добавления марки в каталог
                                <br>
                                2. Заполните необходимые поля.
                                <br>
                                3. Загрузите заполненный <a href="/content/template-mark.xlsx">шаблон</a> в формате .csv или .xlsx
                            </p>
                        </Uploader>
                    </template>
                    <template v-if="view === 'form'">
                        <div class="form__grid">
                            <InputInput
                                    parentClass="field__container"
                                    label="Наименование марки"
                                    placeholder="Введите наименование марки"
                                    :rules="{required: true, excluded: marks.map((item)=>{return item.name}) }"
                                    v-model="markForSend.mark"
                                    :maxlength="100"
                                    @input="markChange"
                                    :loading="loadingMarks"
                            />
                        </div>
                        <fieldset>
                            <div class="legend">Слои:</div>
                            <template v-for="(item, index) in markForSend.layers">
                                <div class="form__line">
                                    <InputInput
                                            parentClass="field__container field__container--short"
                                            label="Слой"
                                            rules="required"
                                            v-model="item.layer"
                                            :maxlength="10"
                                    />
                                    <InputInput
                                            parentClass="field__container field__container--long"
                                            label="Описание"
                                            rules="required"
                                            v-model="item.description"
                                            :maxlength="100"
                                    />
                                    <div class="field__remove" v-if="index > 2">
                                        <a href="javascript:{}" @click="layerRemove(item, index)">
                                            <svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg>
                                        </a>
                                    </div>
                                </div>
                            </template>
                            <div class="field__add" v-show="markForSend.layers.length < 10">
                                <a href="javascript:{}" @click="layerAdd">
                                    <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                                    Добавить слой
                                </a>
                            </div>
                        </fieldset>
                        <TextareaInput
                                label="Описание"
                                placeholder="Введите текст"
                                rules="required"
                                v-model="markForSend.description"
                                counter="1000"
                        />
                        <TextareaInput
                                label="Назначение"
                                placeholder="Введите текст"
                                rules="required"
                                v-model="markForSend.appointment"
                                counter="1000"
                        />
                        <TextareaInput
                                label="Дополнительная информация"
                                placeholder="Введите текст"
                                rules="required"
                                v-model="markForSend.description_additional"
                                counter="1000"
                        />
                        <fieldset>
                            <div class="legend">Характеристики:</div>
                            <div class="form__grid">
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Варианты брони</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_armor_options"
                                    >
                                        <template v-slot:default="field">
                                            <SelectInput
                                                    parentClass="field__container"
                                                    placeholder="Выберите из списка"
                                                    validationName="варианты брони"
                                                    rules="required"
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_armor_options"
                                                    v-model="markForSend.property_armor_options[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Вид экрана</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_screen_view"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="вид экрана"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_screen_view[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">ГОСТ</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_gost"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="ГОСТ"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_gost[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Допустимое напряжение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_voltage_allowable"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="допустимое напряжение"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="markForSend.property_voltage_allowable[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Заполнение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_filling"
                                    >
                                        <template v-slot:default="field">
                                            <SelectInput
                                                    parentClass="field__container"
                                                    placeholder="Выберите из списка"
                                                    validationName="заполнение"
                                                    rules="required"
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_filling"
                                                    v-model="markForSend.property_filling[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Защитный покров</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_protective_cover"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="защитный покров"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_protective_cover[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Изоляция</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_isolation"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="изоляция"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_isolation[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Исполнение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_execution"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="исполнение"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_execution[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Калибр (для импортных производителей) </span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_caliber"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="калибр"
                                                    placeholder="Введите значение"
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="markForSend.property_caliber[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Материал</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_material">
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="материал"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_material[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Материал волокон</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_material_fibers"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="материал волокон"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_material_fibers[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Материал оболочки</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_material_shell"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="материал оболочки"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_material_shell[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Наличие брони</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_armor_availability"
                                    >
                                        <template v-slot:default="field">
                                            <SelectInput
                                                    parentClass="field__container"
                                                    validationName="наличие брони"
                                                    placeholder="Выберите из списка"
                                                    rules="required"
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_armor_availability"
                                                    v-model="markForSend.property_armor_availability[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Номинальное рабочее напряжение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_rated_operating_voltage"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="номинальное рабочее напряжение"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="markForSend.property_rated_operating_voltage[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Нормативный документ</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_normative_document"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="нормативный документ"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_normative_document[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Применение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_use"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="применение"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_use[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Сопротивление изоляции</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_insulation_resistance"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="сопротивление изоляции"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="markForSend.property_insulation_resistance[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Тип волокна</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_fiber_type"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="тип волокна"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_fiber_type[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Тип жил</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_veins_type"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="тип жил"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_veins_type[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Тип кабеля</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_cable_type"
                                    >
                                        <template v-slot:default="field">
                                            <SelectInput
                                                    parentClass="field__container"
                                                    validationName="тип кабеля"
                                                    placeholder="Выберите из списка"
                                                    rules="required"
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_cable_type"
                                                    v-model="markForSend.property_cable_type[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Условия прокладки</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_laying_conditions"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="условия прокладки"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_laying_conditions[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Цвет защитного шланга/наружной оболочки</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_color_protective_hose_outer_sheath"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="цвет защитного шланга/наружной оболочки"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_color_protective_hose_outer_sheath[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Центральный элемент</span>
                                    <Multiple
                                            :max="5"
                                            v-model="markForSend.property_central_element"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="центральный элемент"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="markForSend.property_central_element[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="files" v-for="(item, index) in markForSend.documents.technical_conditions">
                            <div class="field__remove" v-if="markForSend.documents.technical_conditions.length > 1">
                                <a href="javascript:{}" @click="fileRemove(markForSend.documents.technical_conditions, item, index)">
                                    <svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg>
                                </a>
                            </div>
                            <div class="legend">Загрузить ТУ</div>
                            <ValidationProvider name="ТУ" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="form__grid">
                                <InputInput
                                        parentClass="field__container field__container--w50"
                                        label="Номер ТУ"
                                        placeholder="Введите номер"
                                        rules="required"
                                        :maxlength="50"
                                        v-model="item.properties.number"
                                />
                            </div>
                        </fieldset>
                        <div class="field__add">
                            <a href="javascript:{}" @click="fileAdd(markForSend.documents.technical_conditions)">
                                <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                                Добавить ТУ
                            </a>
                        </div>
                        <fieldset class="files" v-for="(item, index) in markForSend.documents.certificates">
                            <div class="field__remove" v-if="markForSend.documents.certificates.length > 1">
                                <a href="javascript:{}" @click="fileRemove(markForSend.documents.certificates, item, index)">
                                    <svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg>
                                </a>
                            </div>
                            <div class="legend">Загрузить сертификат</div>
                            <ValidationProvider name="сертификат" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="form__grid">
                                <InputInput
                                        parentClass="field__container field__container--w50"
                                        label="Номер сертификата"
                                        placeholder="Введите номер"
                                        rules="required"
                                        :maxlength="50"
                                        v-model="item.properties.number"
                                />
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Выберите дату начала и окончания сертификата</span>
                                    <div class="field__range">
                                        <div class="field__range-from">
                                            <DateInput
                                                    placeholder="Дата начала"
                                                    v-model="item.properties.date_start"
                                                    :disabledFrom="item.properties.date_end"
                                                    :disabledTo="picker.disabledTo"
                                            />
                                        </div>
                                        <span>&mdash;</span>
                                        <div class="field__range-to">
                                            <DateInput
                                                    placeholder="Дата окончания"
                                                    v-model="item.properties.date_end"
                                                    :disabledFrom="picker.disabledFrom"
                                                    :disabledTo="item.properties.date_start"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="field__add">
                            <a href="javascript:{}" @click="fileAdd(markForSend.documents.certificates)">
                                <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                                Добавить Сертификат
                            </a>
                        </div>
                        <fieldset class="files" v-for="(item, index) in markForSend.documents.guarantee_letters">
                            <div class="legend">Загрузить гарантийное письмо</div>
                            <ValidationProvider name="гарантийное письмо" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </fieldset>
                        <fieldset class="files">
                            <div class="legend">Загрузить изображения</div>
                            <ValidationProvider name="изображения" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="markForSend.images"
                                        :preview="true"
                                        extensions=".jpg, .png"
                                        :metatypes="['image/jpeg','image/png']"
                                        :max="2"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </fieldset>
                        <div class="btns">
                            <button type="submit" class="btn" :disabled="!valid">Добавить</button>
                            <a href="#" class="btn btn--bdr">Отменить</a>
                        </div>
                        <div class="form__note">Обратите внимание, добавленная вами марка отправится на модерацию</div>
                    </template>
                </template>
                <template v-if="type && type.id === 'marksize'">
                    <div class="tabs tabs--line">
                        <ul>
                            <li :class="{active: view === 'form'}"><a href="javascript:{}" @click="viewSelect('form')">Заполнить форму</a></li>
                            <li :class="{active: view === 'import'}" v-if="false"><a href="javascript:{}" @click="viewSelect('import')">Импортировать Файл</a></li>
                        </ul>
                    </div>
                    <template v-if="view === 'import'">
                        <Uploader
                                v-model="marksizeImport"
                                extensions=".csv, .xlsx"
                                :metatypes="['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
                        >
                            <p>1. Скачайте <a href="./content/test.xlsx">шаблон</a> добавления маркоразмера в каталог
                                <br>
                                2. Заполните необходимые поля.
                                <br>
                                3. Загрузите заполненный <a href="./content/test.xlsx">шаблон</a> в формате .csv или .xlsx
                            </p>
                        </Uploader>
                    </template>
                    <template v-if="view === 'form'">
                        <div class="form__grid">
                            <InputInput
                                    parentClass="field__container"
                                    label="Наименование маркоразмера"
                                    placeholder="Введите наименование маркоразмера"
                                    :rules="{required: true, excluded: marksizes.map((item)=>{return item.name}) }"
                                    v-model="marksizeForSend.size"
                                    :maxlength="100"
                                    @input="marksizeChange"
                                    :loading="loadingMarksizes"
                            />
                            <SelectInput
                                    parentClass="field__container field__container--w50"
                                    label="Марка, к которой прикрепляется маркоразмер"
                                    placeholder="Выбрать марку"
                                    rules="required"
                                    :isSingle="true"
                                    :close="true"
                                    v-model="mark"
                                    :options="marks"
                                    :select="markSelect"
                                    :loading="loadingMarks"
                                    :searchable="true"
                                    :search="markSearch"
                            />
                            <InputInput
                                    parentClass="field__container field__container--w50"
                                    label="Тип кабеля"
                                    rules="required"
                                    v-model="marksizeForSend.type"
                                    :maxlength="100"
                                    :disabled="true"
                            />
                        </div>
                        <TextareaInput
                                label="Описание"
                                placeholder="Введите текст"
                                rules="required"
                                v-model="marksizeForSend.description"
                                counter="1000"
                        />
                        <TextareaInput
                                label="Назначение"
                                placeholder="Введите текст"
                                rules="required"
                                v-model="marksizeForSend.appointment"
                                counter="1000"
                        />
                        <TextareaInput
                                label="Дополнительная информация"
                                placeholder="Введите текст"
                                rules="required"
                                v-model="marksizeForSend.description_additional"
                                counter="1000"
                        />
                        <fieldset>
                            <div class="legend">Характеристики:</div>
                            <div class="form__grid">
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Активное сопротивление жил (нулевой)</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_active_resistance_zero"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="активное сопротивление жил (нулевой)"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_active_resistance_zero[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Активное сопротивление жил (основных)</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_active_resistance_main"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="активное сопротивление жил (основных)"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_active_resistance_main[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Активное сопротивление</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_active_resistance"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="активное сопротивление"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_active_resistance[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Активное сопротивление при прокладке в плоскости</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_active_resistance_plane"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="активное сопротивление при прокладке в плоскости"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_active_resistance_plane[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Активное сопротивление при прокладке треугольником</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_active_resistance_triangle"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="активное сопротивление при прокладке треугольником"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_active_resistance_triangle[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Варианты исполнения вольтажа</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_voltage_versions"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="варианты исполнения вольтажа"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_voltage_versions[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Внешний диаметр</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_outer_diameter"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="внешний диаметр"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_outer_diameter[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Волновое сопротивление</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_resistance_wave"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="волновое сопротивление"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_resistance_wave[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Диаметр кабеля</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_diameter_cabel"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="диаметр кабеля"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_diameter_cabel[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Диаметр</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_diameter"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="диаметр"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_diameter[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Допустимое напряжение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_voltage_allowable"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="допустимое напряжение"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_voltage_allowable[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Емкостная проводимость</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_capacitive_conductivity"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="емкостная проводимость"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_capacitive_conductivity[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Емкость</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_capacity"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="емкость"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_capacity[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Индуктивное сопротивление жил (нулевой)</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_inductive_resistance_cores_zero"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="индуктивное сопротивление жил (нулевой)"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_inductive_resistance_cores_zero[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Индуктивное сопротивление жил (основных)</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_inductive_resistance_cores_main"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="индуктивное сопротивление жил (основных)"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_inductive_resistance_cores_main[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Индуктивное сопротивление нулевой последовательности</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_inductive_resistance_zero_sequence"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="индуктивное сопротивление нулевой последовательности"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_inductive_resistance_zero_sequence[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Индуктивное сопротивление</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_inductive_resistance"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="индуктивное сопротивление"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_inductive_resistance[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Индуктивное сопротивление при прокладке в плоскости</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_inductive_resistance_plane"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="индуктивное сопротивление при прокладке в плоскости"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_inductive_resistance_plane[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Индуктивное сопротивление при прокладке треугольником</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_inductive_resistance_triangle"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="индуктивное сопротивление при прокладке треугольником"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_inductive_resistance_triangle[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Индуктивное сопротивление прямой последовательности</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_inductive_resistance_direct_sequence"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="индуктивное сопротивление прямой последовательности"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_inductive_resistance_direct_sequence[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Класс гибкости жилы</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_class_flexibility_vein"
                                    >
                                        <template v-slot:default="field">
                                            <SelectInput
                                                    parentClass="field__container"
                                                    validationName="класс гибкости жилы"
                                                    placeholder="Выберите из списка"
                                                    rules="required"
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_class_flexibility_vein"
                                                    v-model="marksizeForSend.property_class_flexibility_vein[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Количество волокон</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_fiber_count"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    type="number"
                                                    parentClass="field__container"
                                                    validationName="количеств волокон"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    :max="99999"
                                                    :min="1"
                                                    v-model="marksizeForSend.property_fiber_count[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Количество жил</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_veins_count"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    type="number"
                                                    parentClass="field__container"
                                                    validationName="количеств жил"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    :max="99999"
                                                    :min="1"
                                                    v-model="marksizeForSend.property_veins_count[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Количество пар</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_number_pairs"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    type="number"
                                                    parentClass="field__container"
                                                    validationName="количеств пар"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_pairs[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Количество троек</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_number_triples"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    type="number"
                                                    parentClass="field__container"
                                                    validationName="количеств троек"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_triples[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Количество четверок</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_number_fours"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    type="number"
                                                    parentClass="field__container"
                                                    validationName="количеств четверок"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_fours[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Количество элементов</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_number_elements"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    type="number"
                                                    parentClass="field__container"
                                                    validationName="количеств элементов"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_elements[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Материал жилы</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_material_vein"
                                    >
                                        <template v-slot:default="field">
                                            <SelectInput
                                                    parentClass="field__container"
                                                    validationName="материал жилы"
                                                    placeholder="Выберите из списка"
                                                    rules="required"
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_material_vein"
                                                    v-model="marksizeForSend.property_material_vein[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Минимальный радиус изгиба</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_minimum_bending_radius"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="минимальный радиус изгиба"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_minimum_bending_radius[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Напряжение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_voltage"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="напряжение"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_voltage[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Оптические модули</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_optical_module"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="оптические модули"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_optical_module[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Раздавливающее усилие</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_crushing_force"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="раздавливающее усилие"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_crushing_force[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Размер волокна</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_fiber_size"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="размер волокна"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_fiber_size[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Размер волокон</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_fibers_size"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="размер волокон"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_fibers_size[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Растягивающее усилие</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_tensile_force"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="растягивающее усилие"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_tensile_force[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Сечение</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_section"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="сечение"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_section[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Сечение кабеля</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_cable_cross_section"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="сечение кабеля"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_cable_cross_section[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Срок службы</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_lifetime"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="срок службы"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_lifetime[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Строительная длина</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_construction_length"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="строительная длина"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_construction_length[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Тип применения</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_application_type"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="тип применения"
                                                    placeholder="Введите текст"
                                                    rules="required"
                                                    :maxlength="50"
                                                    v-model="marksizeForSend.property_application_type[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Электрическое сопротивление</span>
                                    <Multiple
                                            :max="5"
                                            v-model="marksizeForSend.property_electrical_resistance"
                                    >
                                        <template v-slot:default="field">
                                            <InputInput
                                                    parentClass="field__container"
                                                    validationName="электрическое сопротивление"
                                                    placeholder="Введите значение"
                                                    rules="required"
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
                                                    v-model="marksizeForSend.property_electrical_resistance[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="files" v-for="(item, index) in marksizeForSend.documents.technical_conditions">
                            <div class="field__remove" v-if="marksizeForSend.documents.technical_conditions.length > 1">
                                <a href="javascript:{}" @click="fileRemove(marksizeForSend.documents.technical_conditions, item, index)">
                                    <svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg>
                                </a>
                            </div>
                            <div class="legend">Загрузить ТУ</div>
                            <ValidationProvider name="ТУ" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="form__grid">
                                <InputInput
                                        parentClass="field__container field__container--w50"
                                        label="Номер ТУ"
                                        placeholder="Введите номер"
                                        rules="required"
                                        :maxlength="50"
                                        v-model="item.properties.number"
                                />
                            </div>
                        </fieldset>
                        <div class="field__add">
                            <a href="javascript:{}" @click="fileAdd(marksizeForSend.documents.technical_conditions)">
                                <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                                Добавить ТУ
                            </a>
                        </div>
                        <fieldset class="files" v-for="(item, index) in marksizeForSend.documents.certificates">
                            <div class="field__remove" v-if="marksizeForSend.documents.certificates.length > 1">
                                <a href="javascript:{}" @click="fileRemove(marksizeForSend.documents.certificates, item, index)">
                                    <svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg>
                                </a>
                            </div>
                            <div class="legend">Загрузить сертификат</div>
                            <ValidationProvider name="сертификат" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="form__grid">
                                <InputInput
                                        parentClass="field__container field__container--w50"
                                        label="Номер сертификата"
                                        placeholder="Введите номер"
                                        rules="required"
                                        :maxlength="50"
                                        v-model="item.properties.number"
                                />
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Выберите дату начала и окончания сертификата</span>
                                    <div class="field__range">
                                        <div class="field__range-from">
                                            <DateInput
                                                    placeholder="Дата начала"
                                                    v-model="item.properties.date_start"
                                                    :disabledFrom="item.properties.date_end"
                                                    :disabledTo="picker.disabledTo"
                                            />
                                        </div>
                                        <span>&mdash;</span>
                                        <div class="field__range-to">
                                            <DateInput
                                                    placeholder="Дата окончания"
                                                    v-model="item.properties.date_end"
                                                    :disabledFrom="picker.disabledFrom"
                                                    :disabledTo="item.properties.date_start"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="field__add">
                            <a href="javascript:{}" @click="fileAdd(marksizeForSend.documents.certificates)">
                                <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                                Добавить Сертификат
                            </a>
                        </div>
                        <fieldset class="files" v-for="(item, index) in marksizeForSend.documents.guarantee_letters">
                            <div class="legend">Загрузить гарантийное письмо</div>
                            <ValidationProvider name="гарантийное письмо" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </fieldset>
                        <fieldset class="files">
                            <div class="legend">Загрузить изображения</div>
                            <ValidationProvider name="изображения" v-slot="{ errors, failed }" rules="required" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="marksizeForSend.images"
                                        :preview="true"
                                        extensions=".jpg, .png"
                                        :metatypes="['image/jpeg','image/png']"
                                        :max="2"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </fieldset>
                        <div class="btns">
                            <button type="submit" class="btn" :disabled="!valid">Добавить</button>
                            <a href="#" class="btn btn--bdr">Отменить</a>
                        </div>
                        <div class="form__note">Обратите внимание, добавленный вами маркоразмер отправится на модерацию</div>
                    </template>
                </template>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import api from '../../../helpers/api';
    import Uploader from "../../../components/uploder.vue";
    import moment from 'moment';
    import {ru} from "vuejs-datepicker/src/locale";
    import Multiple from "../../../components/forms/Multiple";
    import SelectInput from "../../../components/forms/Select";
    import InputInput from "../../../components/forms/Input";
    import TextareaInput from "../../../components/forms/Textarea";
    import DateInput from "../../../components/forms/Date";
    import XLSX from 'xlsx/xlsx';

    // inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0,9[x])"
    // :inputmask='{regex: `([1-9]\\d{0,4})|(([1-9]\\d{0,2},\\d?[1-9])|([1-9]\\d{3},[1-9])|(0,\\d?[1-9]))`}'

    export default {
        name: 'CatalogAdd',
        components: {
            DateInput,
            TextareaInput,
            SelectInput,
            InputInput,
            Multiple,
            Uploader,
        },
        mixins: [api],
        data: function () {
            return {
                view: 'form',
                company: null,
                companies: [],
                type: null,
                types: [
                    {
                        id: 'mark',
                        name: 'Марка',
                    },
                    {
                        id: 'marksize',
                        name: 'Маркоразмер',
                    },
                ],
                property_armor_options: ['Лента', 'Проволока', 'Оплетка'],
                property_filling: ['Без заполнения', 'С заполнением'],
                property_armor_availability: ['Не бронированный', 'Бронированный'],
                property_cable_type: ['LAN кабели', 'Авиационные', 'Акустические', 'Антенные', 'Антивибрационные', 'Аудиокабели', 'Бортовые', 'Взрывные', 'Водопогружные', 'Высокочастотные', 'Геофизические', 'Грузонесущие', 'Для аэродромных огней', 'Для заземления', 'Для компьютерных сетей', 'Для медицинских приборов', 'Для подвижного состава', 'Для прогрева бетона', 'Для промышленной автоматизации и систем управления', 'Для систем пожарной и охранной сигнализации', 'Импортные', 'Импульсные', 'Интерфейсные', 'Коаксиальные', 'Контактные', 'Кроссовые', 'Ленточные', 'Магистральные', 'Металлические', 'Микрофонные', 'Нагревательные', 'Немагнитные', 'Нефтепогружные', 'Низкочастотные', 'Обмоточные', 'Оптические', 'Плавучие', 'Пневмокабель', 'Полевые', 'Проводного вещания', 'Радиотрансляционные', 'Радиочастотные', 'Резистивные', 'Релейные', 'Саморегулирующиеся', 'Сварочные', 'Связи', 'Сетевые', 'Сигнально-блокировочные', 'Сигнальные', 'Силовые', 'Силовые с резиновой изоляцией', 'Станционные', 'Судовые', 'Телефонные', 'Термопарные', 'Термостойкие', 'Термоэлектродные', 'Троллейбусные', 'Универсальные', 'Установочные', 'Холодостойкие', 'Шахтные', 'Экскаваторные', 'Электрические'],
                property_class_flexibility_vein: ['1', '2', '3', '4', '5', '6'],
                property_material_vein: ['Медь', 'Алюминий'],
                marks: [],
                loadingMarks: false,
                loadingMarksCounter: null,
                marksizes: [],
                loadingMarksizes: false,
                loadingMarksizesCounter: null,
                mark: '',
                picker: {
                    start_date: '',
                    end_date: '',
                    format: "yyyy-MM-dd",
                    locale: ru,
                    disabledFrom: null,
                    disabledTo: null,
                },
                markImport: null,
                markForSend: {
                    company_id: null,
                    mark: null,
                    layers: [
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
                    description: null,
                    appointment: null,
                    description_additional: null,
                    property_armor_options: [''],
                    property_screen_view: [''],
                    property_gost: [''],
                    property_voltage_allowable: [''],
                    property_filling: [''],
                    property_protective_cover: [''],
                    property_isolation: [''],
                    property_execution: [''],
                    property_caliber: [''],
                    property_material: [''],
                    property_material_fibers: [''],
                    property_material_shell: [''],
                    property_armor_availability: [''],
                    property_rated_operating_voltage: [''],
                    property_normative_document: [''],
                    property_use: [''],
                    property_insulation_resistance: [''],
                    property_fiber_type: [''],
                    property_veins_type: [''],
                    property_cable_type: [''],
                    property_laying_conditions: [''],
                    property_color_protective_hose_outer_sheath: [''],
                    property_central_element: [''],
                    documents: {
                        technical_conditions: [
                            {
                                file: null,
                                properties: {
                                    number: null,
                                },
                            }
                        ],
                        certificates: [
                            {
                                file: null,
                                properties: {
                                    number: null,
                                    date_start: null,
                                    date_end: null,
                                }
                            },
                        ],
                        guarantee_letters: [
                            {
                                file: null,
                            }
                        ],
                    },
                    images: [],
                },
                marksizeImport: null,
                marksizeForSend: {
                    company_id: null,
                    mark: null,
                    type: '',
                    description: null,
                    appointment: null,
                    description_additional: null,
                    property_active_resistance_zero: [''],
                    property_active_resistance_main: [''],
                    property_active_resistance: [''],
                    property_active_resistance_plane: [''],
                    property_active_resistance_triangle: [''],
                    property_voltage_versions: [''],
                    property_outer_diameter: [''],
                    property_resistance_wave: [''],
                    property_diameter_cabel: [''],
                    property_diameter: [''],
                    property_voltage_allowable: [''],
                    property_capacitive_conductivity: [''],
                    property_capacity: [''],
                    property_inductive_resistance_cores_zero: [''],
                    property_inductive_resistance_cores_main: [''],
                    property_inductive_resistance_zero_sequence: [''],
                    property_inductive_resistance: [''],
                    property_inductive_resistance_plane: [''],
                    property_inductive_resistance_triangle: [''],
                    property_inductive_resistance_direct_sequence: [''],
                    property_class_flexibility_vein: [''],
                    property_fiber_count: [''],
                    property_veins_count: [''],
                    property_number_pairs: [''],
                    property_number_triples: [''],
                    property_number_fours: [''],
                    property_number_elements: [''],
                    property_material_vein: [''],
                    property_minimum_bending_radius: [''],
                    property_voltage: [''],
                    property_optical_module: [''],
                    property_crushing_force: [''],
                    property_fiber_size: [''],
                    property_fibers_size: [''],
                    property_tensile_force: [''],
                    property_section: [''],
                    property_cable_cross_section: [''],
                    property_lifetime: [''],
                    property_construction_length: [''],
                    property_application_type: [''],
                    property_electrical_resistance: [''],
                    documents: {
                        technical_conditions: [
                            {
                                file: null,
                                properties: {
                                    number: null,
                                },
                            }
                        ],
                        certificates: [
                            {
                                file: null,
                                properties: {
                                    number: null,
                                    date_start: null,
                                    date_end: null,
                                }
                            },
                        ],
                        guarantee_letters: [
                            {
                                file: null,
                            }
                        ],
                    },
                    images: [],
                },
            }
        },
        created() {
            this.$emit('fullMode');
            this.companies = this.$store.state.auth.loggedIn ? this.$store.state.auth.user.companies : [];
        },
        watch: {
            markImport: function (file) {
                this.importFile(file);
            },
            marksizeImport: function (file) {
                this.importFile(file);
            },
        },
        methods: {
            viewSelect: function(view) {
                // переключаем вид: form или import
                this.view = view;
            },
            companySelect: function (selectedCompany, id) {
                this.markForSend.company_id = selectedCompany.id;
                this.marksizeForSend.company_id = selectedCompany.id;
            },
            typeSelect: function(selectedType, id) {
                this.view = 'form'; // по умолчанию - вид для заполнения формы
                this.type = selectedType.id;
            },
            markChange: function() {
                this.markSearch(this.markForSend.mark);
            },
            markSelect: function(selectedMark, id) {
                this.marksizeForSend.mark = selectedMark.name;
                this.marksizeForSend.type = selectedMark.property_cable_type && selectedMark.property_cable_type.length ? selectedMark.property_cable_type.join(', ') : '';
            },
            markSearch: function(q) {
                clearInterval(this.loadingMarksCounter);
                if( q.length ) {
                    this.cancelCatalogSearch();
                    this.loadingMarksCounter = setTimeout(() => {
                        this.loadingMarks = true;
                        this.fetchCatalogMark(q)
                            .then((response) => {
                                this.marks = response.data.data;
                                this.loadingMarks = false;
                            })
                            .catch((response) => {
                                console.log(response.message);
                                this.marks = [];
                                this.loadingMarks = false;
                                window.notificationError('Ошибка сервера');
                            });
                    }, 1000);
                }
            },
            marksizeChange: function() {
                clearInterval(this.loadingMarksizesCounter);
                if( this.marksizeForSend.size.length ) {
                    this.cancelCatalogSearch();
                    this.loadingMarksizesCounter = setTimeout(() => {
                        this.loadingMarksizes = true;
                        this.fetchCatalogMarksize(this.marksizeForSend.size)
                            .then((response) => {
                                this.marksizes = response.data.data;
                                this.loadingMarksizes = false;
                            })
                            .catch((response) => {
                                console.log(response.message);
                                this.marksizes = [];
                                this.loadingMarksizes = false;
                                window.notificationError('Ошибка сервера');
                            });
                    }, 1000);
                }
            },
            layerAdd: function () {
                this.markForSend.layers.push({
                    layer: '',
                    description: '',
                });
            },
            layerRemove: function (layer, index) {
                evt.preventDefault();
                this.markForSend.layers.splice(index, 1);
            },
            fileAdd: function (field) {
                let newItem = {};
                newItem.file = null;
                if (field[0].hasOwnProperty('properties')) {
                    newItem.properties = {};
                    if (newItem.properties && field[0].properties.length) {
                        for (const key in field[0].properties) {
                            newItem.properties[key] = null;
                        }
                    }
                }
                field.push(newItem);
            },
            fileRemove: function (field, layer, index) {
                field.splice(index, 1);
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
                const fData = this.type.id === 'mark' ? this.markForSend : this.marksizeForSend;
                // fData.company_id = 7; // todo TEST data
                const formDataObj = this.objectToFormData(fData);
                window.openLoader();
                if( this.type.id === 'mark' ) {
                    this.sendCatalogMark(formDataObj)
                        .then(() => {
                            window.closeLoader();
                            window.notificationSuccess('Ваша макра отправлен');
                        })
                        .catch((response) => {
                            console.log(response.message);
                            window.closeLoader();
                            window.notificationError('Ошибка сервера');
                        });
                } else {
                    this.sendCatalogMarksize(formDataObj)
                        .then(() => {
                            window.closeLoader();
                            window.notificationSuccess('Ваш макроразмер отправлен');
                        })
                        .catch((response) => {
                            console.log(response.message);
                            window.closeLoader();
                            window.notificationError('Ошибка сервера');
                        });
                }
            },
            validateFile() {
                return { on: ['blur', 'input', 'change'] };
            },
            importFile(file) {
                window.openLoader();
                const reader = new FileReader();
                FileReader.onerror = (e) => {
                    window.notificationError('Ошибка импорта из файла');
                    window.closeLoader();
                };
                reader.onload = (e) => {
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, {type:'binary'});
                    const ws = wb.Sheets[wb.SheetNames[0]];
                    const data = XLSX.utils.sheet_to_json(ws, {header:1}); // get array
                    const item = data[1]; // get item row
                    data.splice(0, 2); // delete head & item rows
                    data.splice(9); // delete all trash rows
                    console.log(item);
                    console.log(data);
                    let fields = [];
                    if( this.type.id === 'mark' ) {
                        fields = ['mark', 'description', 'appointment', 'description_additional', 'layers|layer', 'layers|description', 'property_armor_options', 'property_screen_view', 'property_gost', 'property_voltage_allowable', 'property_filling', 'property_protective_cover', 'property_isolation', 'property_execution', 'property_caliber', 'property_material', 'property_material_fibers', 'property_material_shell', 'property_armor_availability', 'property_rated_operating_voltage', 'property_normative_document', 'property_use', 'property_insulation_resistance', 'property_fiber_type', 'property_veins_type', 'property_cable_type', 'property_laying_conditions', 'property_color_protective_hose_outer_sheath', 'property_central_element'];
                        // чистим все масивы с объектами
                        this.markForSend.layers = [{}];
                    } else {

                    }
                    for (let i=0; i<fields.length; i++) {
                        let field = fields[i].indexOf('|') === -1 ? fields[i] : fields[i].substr(0, fields[i].indexOf('|'));
                        if (this.type.id === 'mark') {
                            if (this.markForSend.hasOwnProperty(field)) {
                                if (Array.isArray(this.markForSend[field])) {
                                    if (typeof this.markForSend[field][0] === 'object') {
                                        // проставляем значения для объектов
                                        let subfield = fields[i].substr(fields[i].indexOf('|')+1);
                                        // console.log('Import field: '+field+', subfield: '+subfield+' = '+item[i]);
                                        if (this.markForSend[field][0]) {
                                            // если элемент уже существует - ставим значение
                                            this.markForSend[field][0][subfield] = item[i];
                                            if (data.length) {
                                                // перебираем все дополнительные поля
                                                for (let r = 0; r < data.length; r++) {
                                                    if (data[r][i] && data[r][i].length) {
                                                        if (typeof this.markForSend[field][r+1] === 'object') {
                                                            // если элемент для дополнительного поля существует - ставим значение
                                                            this.markForSend[field][r+1][subfield] = data[r][i];
                                                        } else {
                                                            // если элемент для дополнительного поля НЕ существует - создаем и добавляем
                                                            let obj = {};
                                                            obj[subfield] = data[r][i];
                                                            this.markForSend[field].push(obj);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            // если элемент НЕ существует - создаём и добавляем
                                            let obj = {};
                                            obj[subfield] = item[i];
                                            this.markForSend[field].push(obj);
                                            if (data.length) {
                                                // перебираем все дополнительные поля
                                                for (let r = 0; r < data.length; r++) {
                                                    if (data[r][i] && data[r][i].length) {
                                                        // т.к. элемент для дополнительного поля гарантированно НЕ существует - создаем и добавляем
                                                        obj = {};
                                                        obj[subfield] = data[r][i];
                                                        this.markForSend[field].push(obj);
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        // проставляем текстовые значения
                                        this.markForSend[field] = [];
                                        if (Array.isArray(this[field])) {
                                            // console.log(field+' is array: '+this[field].indexOf(item[i]));
                                            // если поле выпадающий список то проверяем значение
                                            if (this[field].indexOf(item[i]) !== -1) {
                                                this.markForSend[field].push(item[i]);
                                            } else {
                                                this.markForSend[field].push('');
                                            }
                                            if (data.length) {
                                                for (let r = 0; r < data.length; r++) {
                                                    if (data[r][i] && data[r][i].length) {
                                                        if (this[field].indexOf(data[r][i]) !== -1) {
                                                            this.markForSend[field].push(data[r][i]);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            // console.log('Import field: '+field+' = '+item[i]);
                                            this.markForSend[field].push(item[i]);
                                            if (data.length) {
                                                for (let r = 0; r < data.length; r++) {
                                                    if (data[r][i] && data[r][i].length) {
                                                        this.markForSend[field].push(data[r][i]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    this.markForSend[field] = item[i];
                                }
                            } else {
                                console.log('?field: '+field+' = '+item[i]);
                            }
                        }
                    }
                    window.closeLoader();
                    this.view = 'form';
                };
                reader.readAsBinaryString(file);
            },
        }
    }
</script>

<style lang="scss">
    @import "../../../../assets/sass/variables/variables";
    @import "../../../../assets/sass/variables/fluid-variables";
    @import "../../../../assets/sass/mixins/fluid-mixin";
    @import "../../../../assets/sass/mixins/mq";

    .uploader {
        margin: 0 0 rem(32px);
        + .field__error {
            margin: rem(-27px) 0 rem(32px);
        }
    }

    .files {
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
