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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                                    rules=""
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
                                        :class="{error: failed}"
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
                                        :disabled="item.file === null"
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
                            <ValidationProvider name="сертификат" v-slot="{ errors, failed }" :rules="{ required: markForSend.documents.guarantee_letters[0].file === null }" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :class="{error: failed}"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                        :disabled="markForSend.documents.guarantee_letters[0].file !== null"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="form__grid">
                                <InputInput
                                        parentClass="field__container field__container--w50"
                                        label="Номер сертификата"
                                        placeholder="Введите номер"
                                        :rules="{ required: item.file !== null }"
                                        :maxlength="50"
                                        v-model="item.properties.number"
                                        :disabled="item.file === null"
                                />
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Выберите дату начала и окончания сертификата</span>
                                    <div class="field__range">
                                        <div class="field__range-from">
                                            <DateInput
                                                    placeholder="Дата начала"
                                                    validationName="дата начала"
                                                    v-model="item.properties.date_start"
                                                    :disabledFrom="item.properties.date_end"
                                                    :disabledTo="picker.disabledTo"
                                                    :format="picker.format"
                                                    :rules="{ required: item.file !== null }"
                                                    :disabled="item.file === null"
                                            />
                                        </div>
                                        <span>&mdash;</span>
                                        <div class="field__range-to">
                                            <DateInput
                                                    placeholder="Дата окончания"
                                                    validationName="дата окончания"
                                                    v-model="item.properties.date_end"
                                                    :disabledFrom="picker.disabledFrom"
                                                    :disabledTo="item.properties.date_start"
                                                    :format="picker.format"
                                                    :rules="{ required: item.file !== null }"
                                                    :disabled="item.file === null"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="field__add" :class="{disabled: markForSend.documents.guarantee_letters[0].file !== null}">
                            <a href="javascript:{}" @click="fileAdd(markForSend.documents.certificates)">
                                <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                                Добавить Сертификат
                            </a>
                        </div>
                        <fieldset class="files" v-for="(item, index) in markForSend.documents.guarantee_letters">
                            <div class="legend">Загрузить гарантийное письмо</div>
                            <ValidationProvider name="гарантийное письмо" v-slot="{ errors, failed }" :rules="{ required: markForSend.documents.certificates[0].file === null }" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :class="{error: failed}"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                        :disabled="markForSend.documents.certificates[0].file !== null"
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
                                        :class="{error: failed}"
                                        :metatypes="['image/jpeg','image/png']"
                                        :max="2"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </fieldset>
                        <div class="btns">
                            <button type="submit" class="btn">Добавить</button>
                            <a href="/personal/" class="btn btn--bdr">Отменить</a>
                        </div>
                        <div class="form__note">Обратите внимание, добавленная вами марка отправится на модерацию</div>
                    </template>
                </template>
                <template v-if="type && type.id === 'marksize'">
                    <div class="tabs tabs--line">
                        <ul>
                            <li :class="{active: view === 'form'}"><a href="javascript:{}" @click="viewSelect('form')">Заполнить форму</a></li>
                            <li :class="{active: view === 'import'}"><a href="javascript:{}" @click="viewSelect('import')">Импортировать Файл</a></li>
                        </ul>
                    </div>
                    <template v-if="view === 'import'">
                        <Uploader
                                v-model="marksizeImport"
                                extensions=".csv, .xlsx"
                                :metatypes="['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
                        >
                            <p>1. Скачайте <a href="/content/template-marksize.xlsx">шаблон</a> добавления маркоразмера в каталог
                                <br>
                                2. Заполните необходимые поля.
                                <br>
                                3. Загрузите заполненный <a href="/content/template-marksize.xlsx">шаблон</a> в формате .csv или .xlsx
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
                        <fieldset v-if="marksizeForSend.mark">
                            <div class="legend">Характеристики:</div>
                            <div class="form__grid">
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_active_resistance_zero') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_active_resistance_zero[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_active_resistance_main') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_active_resistance_main[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_active_resistance') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_active_resistance[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_active_resistance_plane') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_active_resistance_plane[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_active_resistance_triangle') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_active_resistance_triangle[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_voltage_versions') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_voltage_versions[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_outer_diameter') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_outer_diameter[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_resistance_wave') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_resistance_wave[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_diameter_cabel') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_diameter_cabel[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_diameter') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_diameter[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_voltage_allowable') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_voltage_allowable[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_capacitive_conductivity') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_capacitive_conductivity[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_capacity') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_capacity[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_inductive_resistance_cores_zero') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_inductive_resistance_cores_zero[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_inductive_resistance_cores_main') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_inductive_resistance_cores_main[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_inductive_resistance_zero_sequence') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_inductive_resistance_zero_sequence[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_inductive_resistance') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_inductive_resistance[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_inductive_resistance_plane') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_inductive_resistance_plane[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_inductive_resistance_triangle') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_inductive_resistance_triangle[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_inductive_resistance_direct_sequence') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_inductive_resistance_direct_sequence[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_class_flexibility_vein') !== -1">
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
                                                    rules=""
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_class_flexibility_vein"
                                                    v-model="marksizeForSend.property_class_flexibility_vein[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_fiber_count') !== -1">
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
                                                    rules=""
                                                    :max="99999"
                                                    :min="1"
                                                    v-model="marksizeForSend.property_fiber_count[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_veins_count') !== -1">
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
                                                    rules=""
                                                    :max="99999"
                                                    :min="1"
                                                    v-model="marksizeForSend.property_veins_count[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_number_pairs') !== -1">
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
                                                    rules=""
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_pairs[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_number_triples') !== -1">
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
                                                    rules=""
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_triples[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_number_fours') !== -1">
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
                                                    rules=""
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_fours[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_number_elements') !== -1">
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
                                                    rules=""
                                                    :max="99999"
                                                    :min="0"
                                                    v-model="marksizeForSend.property_number_elements[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_material_vein') !== -1">
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
                                                    rules=""
                                                    :isSingle="true"
                                                    :isArray="true"
                                                    :close="true"
                                                    :options="property_material_vein"
                                                    v-model="marksizeForSend.property_material_vein[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_minimum_bending_radius') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_minimum_bending_radius[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_voltage') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_voltage[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_optical_module') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_optical_module[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_crushing_force') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_crushing_force[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_fiber_size') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_fiber_size[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_fibers_size') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_fibers_size[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_tensile_force') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_tensile_force[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_section') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_section[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_cable_cross_section') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_cable_cross_section[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_lifetime') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_lifetime[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_construction_length') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                                                    v-model="marksizeForSend.property_construction_length[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_application_type') !== -1">
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
                                                    rules=""
                                                    :maxlength="50"
                                                    v-model="marksizeForSend.property_application_type[field.index]"
                                            />
                                        </template>
                                    </Multiple>
                                </div>
                                <div class="field__container field__container--w50" v-if="!properties.length || properties.indexOf('property_electrical_resistance') !== -1">
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
                                                    rules=""
                                                    inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
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
                                        :class="{error: failed}"
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
                                        :disabled="item.file === null"
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
                            <ValidationProvider name="сертификат" v-slot="{ errors, failed }" :rules="{ required: marksizeForSend.documents.guarantee_letters[0].file === null }" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :class="{error: failed}"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                        :disabled="marksizeForSend.documents.guarantee_letters[0].file !== null"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="form__grid">
                                <InputInput
                                        parentClass="field__container field__container--w50"
                                        label="Номер сертификата"
                                        placeholder="Введите номер"
                                        :rules="{ required: item.file !== null }"
                                        :maxlength="50"
                                        v-model="item.properties.number"
                                        :disabled="item.file === null"
                                />
                                <div class="field__container field__container--w50">
                                    <span class="field__label">Выберите дату начала и окончания сертификата</span>
                                    <div class="field__range">
                                        <div class="field__range-from">
                                            <DateInput
                                                    placeholder="Дата начала"
                                                    validationName="дата начала"
                                                    v-model="item.properties.date_start"
                                                    :disabledFrom="item.properties.date_end"
                                                    :disabledTo="picker.disabledTo"
                                                    :format="picker.format"
                                                    :rules="{ required: item.file !== null }"
                                                    :disabled="item.file === null"
                                            />
                                        </div>
                                        <span>&mdash;</span>
                                        <div class="field__range-to">
                                            <DateInput
                                                    placeholder="Дата окончания"
                                                    validationName="дата окончания"
                                                    v-model="item.properties.date_end"
                                                    :disabledFrom="picker.disabledFrom"
                                                    :disabledTo="item.properties.date_start"
                                                    :format="picker.format"
                                                    :rules="{ required: item.file !== null }"
                                                    :disabled="item.file === null"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="field__add" :class="{disabled: marksizeForSend.documents.guarantee_letters[0].file !== null}">
                            <a href="javascript:{}" @click="fileAdd(marksizeForSend.documents.certificates)">
                                <svg class="sprite-field-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#field-add"></use></svg>
                                Добавить Сертификат
                            </a>
                        </div>
                        <fieldset class="files" v-for="(item, index) in marksizeForSend.documents.guarantee_letters">
                            <div class="legend">Загрузить гарантийное письмо</div>
                            <ValidationProvider name="гарантийное письмо" v-slot="{ errors, failed }" :rules="{ required: marksizeForSend.documents.certificates[0].file === null }" tag="div" :mode="validateFile">
                                <Uploader
                                        v-model="item.file"
                                        :preview="true"
                                        extensions=".pdf, .jpg, .png"
                                        :class="{error: failed}"
                                        :metatypes="['application/pdf','image/jpeg','image/png']"
                                        :disabled="marksizeForSend.documents.certificates[0].file !== null"
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
                                        :class="{error: failed}"
                                        :metatypes="['image/jpeg','image/png']"
                                        :max="2"
                                />
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </fieldset>
                        <div class="btns">
                            <button type="submit" class="btn">Добавить</button>
                            <a href="/personal/" class="btn btn--bdr">Отменить</a>
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
    import functions from '../../../helpers/functions';
    import cloneDeep from 'lodash.clonedeep';
    import Uploader from "../../../components/uploder.vue";
    // import moment from 'moment';
    import {ru} from "vuejs-datepicker/src/locale";
    import Multiple from "../../../components/forms/Multiple";
    import SelectInput from "../../../components/forms/Select";
    import InputInput from "../../../components/forms/Input";
    import TextareaInput from "../../../components/forms/Textarea";
    import DateInput from "../../../components/forms/Date";
    import XLSX from 'xlsx/xlsx';

    // inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
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
        mixins: [api, functions],
        data: function () {
            return {
                view: 'form',
                scrollToErrorInstance: null,
                company: null,
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
                    format: "dd.MM.yyyy",
                    locale: ru,
                    disabledFrom: null,
                    disabledTo: null,
                },
                allProperties: {},
                properties: [],
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
                    size: null,
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
        computed: {
            companies() {
                // список компаний пользователя
                let companies = [];
                switch( this.$store.getters.userRole ) {
                    case 'buyer':
                        companies = this.$store.getters.companyBuyer;
                        break;
                    case 'contractor':
                        companies = this.$store.getters.companyContractor;
                        break;
                }
                return companies;
            },
        },
        created() {
            this.$emit('fullMode');
            this.loadProperties();
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
            getProperties: function(mark) {
                let properties = [];
                for (let i=0; i<mark.property_cable_type.length; i++ ) {
                    properties = properties.concat(this.allProperties.required[mark.property_cable_type[i]]);
                    properties = properties.filter((item, pos) => properties.indexOf(item) === pos);
                }
                this.properties = properties;
            },
            loadProperties: function() {
                if (this.allProperties.length) return;
                this.allProperties = [];
                window.openLoader();
                this.fetchCatalogMarksizeProperties()
                    .then((response) => {
                        this.allProperties = response.data.data;
                        window.closeLoader();
                    })
                    .catch((response) => {
                        this.marks = [];
                        window.closeLoader();
                        window.notificationError('Ошибка сервера');
                    });
            },
            markChange: function() {
                this.markSearch(this.markForSend.mark);
            },
            markSelect: function(selectedMark, id) {
                this.marksizeForSend.mark = selectedMark.name;
                this.marksizeForSend.type = selectedMark.property_cable_type && selectedMark.property_cable_type.length ? selectedMark.property_cable_type.join(', ') : '';
                this.getProperties(selectedMark);
            },
            markSearch: function(q) {
                clearInterval(this.loadingMarksCounter);
                if( q.length ) {
                    this.cancelCatalogMarkSearch();
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
                    this.cancelCatalogMarksizeSearch();
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
            sendForm(evt) {
                evt.preventDefault();
                this.$refs.form.validate().then((res) => {
                    if (res) {
                        window.openLoader();
                        let fData = cloneDeep(this.type.id === 'mark' ? this.markForSend : this.marksizeForSend);
                        for (let i=0; i< fData.documents.technical_conditions.length; i++) {
                            if (fData.documents.technical_conditions[i].file === null) {
                                fData.documents.technical_conditions.splice(i, 1);
                            }
                        }
                        for (let i=0; i< fData.documents.certificates.length; i++) {
                            if (fData.documents.certificates[i].file === null) {
                                fData.documents.certificates.splice(i, 1);
                            }
                        }
                        for (let i=0; i< fData.documents.guarantee_letters.length; i++) {
                            if (fData.documents.guarantee_letters[i].file === null) {
                                fData.documents.guarantee_letters.splice(i, 1);
                            }
                        }
                        if( this.type.id === 'mark' ) {
                            const formDataObj = this.objectToFormData(fData);
                            this.sendCatalogMark(formDataObj)
                                .then(() => {
                                    window.closeLoader();
                                    window.notificationSuccess('Ваша марка отправлена на модерацию');
                                })
                                .catch((response) => {
                                    console.log(response.message);
                                    window.closeLoader();
                                    window.notificationError('Ошибка сервера');
                                });
                        } else {
                            for (const key in fData) {
                                // удаляем ненужные характеристики
                                if (fData.hasOwnProperty(key) && key.indexOf('property_') === 0 && this.properties.indexOf(key) === -1) {
                                    delete fData[key];
                                }
                            }
                            const formDataObj = this.objectToFormData(fData);
                            this.sendCatalogMarksize(formDataObj)
                                .then(() => {
                                    window.closeLoader();
                                    window.notificationSuccess('Ваш макроразмер отправлен на модерацию');
                                })
                                .catch((response) => {
                                    console.log(response.message);
                                    window.closeLoader();
                                    window.notificationError('Ошибка сервера');
                                });
                        }
                    } else {
                        clearInterval(this.scrollToErrorInstance)
                        this.scrollToErrorInstance = setTimeout(() => {
                            this.scrollToError()
                        }, 500)
                    }
                });
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
                    if (data.length<2) {
                        window.closeLoader();
                        this.view = 'form';
                        return;
                    }
                    const item = data[1]; // get item row
                    data.splice(0, 2); // delete head & item rows
                    data.splice(9); // delete all trash rows
                    let fields = [],
                        importedFields = {};
                    if( this.type.id === 'mark' ) {
                        fields = ['mark', 'description', 'appointment', 'description_additional', 'layers|layer', 'layers|description', 'property_armor_options', 'property_screen_view', 'property_gost', 'property_voltage_allowable', 'property_filling', 'property_protective_cover', 'property_isolation', 'property_execution', 'property_caliber', 'property_material', 'property_material_fibers', 'property_material_shell', 'property_armor_availability', 'property_rated_operating_voltage', 'property_normative_document', 'property_use', 'property_insulation_resistance', 'property_fiber_type', 'property_veins_type', 'property_cable_type', 'property_laying_conditions', 'property_color_protective_hose_outer_sheath', 'property_central_element'];
                        importedFields = this.markForSend;
                        // чистим все масивы с объектами
                        importedFields.layers = [{}];
                    } else {
                        fields = ['size', 'markname', 'description', 'appointment', 'description_additional', 'property_active_resistance_zero', 'property_active_resistance_main', 'property_active_resistance', 'property_active_resistance_plane', 'property_active_resistance_triangle', 'property_voltage_versions', 'property_outer_diameter', 'property_resistance_wave', 'property_diameter_cabel', 'property_diameter', 'property_voltage_allowable', 'property_capacitive_conductivity', 'property_capacity', 'property_inductive_resistance_cores_zero', 'property_inductive_resistance_cores_main', 'property_inductive_resistance_zero_sequence', 'property_inductive_resistance', 'property_inductive_resistance_plane', 'property_inductive_resistance_triangle', 'property_inductive_resistance_direct_sequence', 'property_class_flexibility_vein', 'property_fiber_count', 'property_veins_count', 'property_number_pairs', 'property_number_triples', 'property_number_fours', 'property_number_elements', 'property_material_vein', 'property_minimum_bending_radius', 'property_voltage', 'property_optical_module', 'property_crushing_force', 'property_fiber_size', 'property_fibers_size', 'property_tensile_force', 'property_section', 'property_cable_cross_section', 'property_lifetime', 'property_construction_length', 'property_application_type', 'property_electrical_resistance'];
                        importedFields = this.marksizeForSend;
                    }
                    function getImportValue(field, value) {
                        if( !value || !value.length ) return value;
                        let v = '';
                        switch( field ) {
                            case 'property_voltage_allowable':
                            case 'property_caliber':
                            case 'property_rated_operating_voltage':
                            case 'property_insulation_resistance':
                            case 'property_active_resistance_zero':
                            case 'property_active_resistance_main':
                            case 'property_active_resistance':
                            case 'property_active_resistance_plane':
                            case 'property_active_resistance_triangle':
                            case 'property_voltage_versions':
                            case 'property_outer_diameter':
                            case 'property_resistance_wave':
                            case 'property_diameter_cabel':
                            case 'property_diameter':
                            case 'property_capacitive_conductivity':
                            case 'property_capacity':
                            case 'property_inductive_resistance_cores_zero':
                            case 'property_inductive_resistance_cores_main':
                            case 'property_inductive_resistance_zero_sequence':
                            case 'property_inductive_resistance':
                            case 'property_inductive_resistance_plane':
                            case 'property_inductive_resistance_triangle':
                            case 'property_inductive_resistance_direct_sequence':
                            case 'property_minimum_bending_radius':
                            case 'property_voltage':
                            case 'property_optical_module':
                            case 'property_crushing_force':
                            case 'property_fiber_size':
                            case 'property_fibers_size':
                            case 'property_tensile_force':
                            case 'property_section':
                            case 'property_cable_cross_section':
                            case 'property_lifetime':
                            case 'property_construction_length':
                            case 'property_electrical_resistance':
                                // цифровое значение с маской
                                v = Inputmask.format(value, {mask: '(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])'});
                                v = value.replace(/[^,0-9]/g,'');
                                break;
                            case 'property_fiber_count':
                            case 'property_veins_count':
                            case 'property_number_pairs':
                            case 'property_number_triples':
                            case 'property_number_fours':
                            case 'property_number_elements':
                                // integer
                                v = value.replace(/[^0-9]/g,'');
                                break;
                            default:
                                // обычная строка
                                v = value;
                                break;
                        }
                        // console.log("getImportValue('"+field+"', '"+value+"') = '"+v+"';");
                        return v;
                    }
                    for (let i=0; i<fields.length; i++) {
                        let field = fields[i].indexOf('|') === -1 ? fields[i] : fields[i].substr(0, fields[i].indexOf('|'));
                        if (importedFields.hasOwnProperty(field)) {
                            if (Array.isArray(importedFields[field])) {
                                if (typeof importedFields[field][0] === 'object') {
                                    // проставляем значения для объектов
                                    let subfield = fields[i].substr(fields[i].indexOf('|')+1);
                                    // console.log('Import field: '+field+', subfield: '+subfield+' = '+item[i]);
                                    if (importedFields[field][0]) {
                                        // если элемент уже существует - ставим значение
                                        importedFields[field][0][subfield] = item[i];
                                        if (data.length) {
                                            // перебираем все дополнительные поля
                                            for (let r = 0; r < data.length; r++) {
                                                if( field !== 'layers' && r > 4 ) continue;
                                                if (data[r][i] && data[r][i].length) {
                                                    if (typeof importedFields[field][r+1] === 'object') {
                                                        // если элемент для дополнительного поля существует - ставим значение
                                                        importedFields[field][r+1][subfield] = data[r][i];
                                                    } else {
                                                        // если элемент для дополнительного поля НЕ существует - создаем и добавляем
                                                        let obj = {};
                                                        obj[subfield] = data[r][i];
                                                        importedFields[field].push(obj);
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        // если элемент НЕ существует - создаём и добавляем
                                        let obj = {};
                                        obj[subfield] = item[i];
                                        importedFields[field].push(obj);
                                        if (data.length) {
                                            // перебираем все дополнительные поля
                                            for (let r = 0; r < data.length; r++) {
                                                if( field !== 'layers' && r > 4 ) continue;
                                                if (data[r][i] && data[r][i].length) {
                                                    // т.к. элемент для дополнительного поля гарантированно НЕ существует - создаем и добавляем
                                                    obj = {};
                                                    obj[subfield] = data[r][i];
                                                    importedFields[field].push(obj);
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    // проставляем текстовые значения
                                    importedFields[field] = [];
                                    if (Array.isArray(this[field])) {
                                        // console.log(field+' is array: '+this[field].indexOf(item[i]));
                                        // если поле выпадающий список то проверяем значение
                                        if (this[field].indexOf(item[i]) !== -1) {
                                            importedFields[field].push(getImportValue(field, item[i]));
                                        } else {
                                            importedFields[field].push('');
                                        }
                                        if (data.length) {
                                            for (let r = 0; r < data.length; r++) {
                                                if (data[r][i] && data[r][i].length) {
                                                    if (this[field].indexOf(data[r][i]) !== -1) {
                                                        let v = getImportValue(field, data[r][i]);
                                                        if (v || v.length) importedFields[field].push(v);
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        // console.log('Import field: '+field+' = '+item[i]);
                                        importedFields[field].push(getImportValue(field, item[i]));
                                        if (data.length) {
                                            for (let r = 0; r < data.length; r++) {
                                                if (data[r][i] && data[r][i].length) {
                                                    let v = getImportValue(field, data[r][i]);
                                                    if (v || v.length) importedFields[field].push(v);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                importedFields[field] = getImportValue(field, item[i]);
                            }
                        } else {
                            // console.log('?field: '+field+' = '+item[i]);
                        }
                    }
                    if( this.type.id === 'mark' ) {
                        this.markForSend = importedFields;
                        while (this.markForSend.layers.length < 3) {
                            this.markForSend.layers.push({
                                layer: '',
                                description: '',
                            });
                        }
                        window.closeLoader();
                        this.view = 'form';
                    } else {
                        let newMark = item[1] || '';
                        if (this.marksizeForSend.mark !== newMark && newMark.length) {
                            // импортировали НОВОЕ markname
                            if (!newMark.length) {
                                // mark пустое
                                // this.marksizeForSend = importedFields;
                                this.marksizeForSend.mark === '';
                                this.marksizeForSend.type = '';
                                this.marks = [];
                                window.closeLoader();
                                this.view = 'form';
                            } else {
                                // mark НЕ пустое - проверяем
                                this.cancelCatalogMarkSearch();
                                this.marks = [];
                                this.loadingMarks = true;
                                this.fetchCatalogMark(newMark)
                                    .then((response) => {
                                        this.marks = response.data.data;
                                        this.loadingMarks = false;
                                        let importedMark = this.marks.filter((item)=>{return item.name === newMark})[0] || null;
                                        // this.marksizeForSend = importedFields;
                                        if (importedMark) {
                                            this.mark = importedMark;
                                            this.markSelect(importedMark);
                                        } else {
                                            this.mark = null;
                                            this.marksizeForSend.mark = '';
                                            this.marksizeForSend.type = '';
                                        }
                                        window.closeLoader();
                                        this.view = 'form';
                                    })
                                    .catch((response) => {
                                        console.log(response.message);
                                        window.notificationError('Ошибка сервера');
                                        this.marks = [];
                                        this.mark = null;
                                        this.marksizeForSend.mark = '';
                                        this.marksizeForSend.type = '';
                                        this.loadingMarks = false;
                                        // this.marksizeForSend = importedFields;
                                        window.closeLoader();
                                        this.view = 'form';
                                    });
                            }
                        } else {
                            // mark не менялось
                            this.loadingMarks = false;
                            window.closeLoader();
                            this.view = 'form';
                        }
                    }
                };
                reader.readAsBinaryString(file);
            },
        }
    }
</script>

<style lang="scss" scoped>
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
