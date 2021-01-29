<template>
  <div class="form form--white">
    <div class="form__title">
      Добавление продукции
    </div>
    <ValidationObserver
      ref="form"
      tag="div"
      mode="eager"
    >
      <form
        slot-scope="{ valid }"
        class="support-form__form"
        @submit.prevent="sendForm"
      >
        <div class="form__grid">
          <SelectInput
            v-model="company"
            parent-class="field__container field__container--w50"
            label="Юридическое лицо"
            placeholder="Выберите юридическое лицо"
            rules="required"
            :is-single="true"
            :close="true"
            :options="companies"
            :select="companySelect"
          />
          <SelectInput
            v-model="type"
            parent-class="field__container field__container--w50"
            label="Тип добавляемой продукции"
            placeholder="Выберите тип продукции"
            rules="required"
            :is-single="true"
            :close="true"
            :options="types"
            :select="typeSelect"
          />
        </div>
        <template v-if="type && type.id === 'mark'">
          <div class="tabs tabs--line">
            <ul>
              <li :class="{active: view === 'form'}">
                <a
                  href="javascript:{}"
                  @click="viewSelect('form')"
                >Заполнить форму</a>
              </li>
              <li :class="{active: view === 'import'}">
                <a
                  href="javascript:{}"
                  @click="viewSelect('import')"
                >Импортировать Файл</a>
              </li>
            </ul>
          </div>
          <template v-if="view === 'import'">
            <Uploader
              v-model="markImport"
              extensions=".csv, .xlsx"
              :metatypes="['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
            >
              <p>
                1. Скачайте <a href="/content/template-mark.xlsx">шаблон</a> добавления марки в каталог
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
                v-model="markForSend.mark"
                parent-class="field__container"
                label="Наименование марки"
                placeholder="Введите наименование марки"
                :rules="{required: true, excluded: marks.map((item)=>{return item.name}) }"
                :maxlength="4000"
                :loading="loadingMarks"
                @input="markChange"
              />
              <!-- todo ПОКА убрали т.к. характеристики МАРКИ НЕ зависят от типа кабеля -->
              <!--<div class="field__container">
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
                            </div>-->
            </div>
            <fieldset>
              <div class="legend">
                Слои:
              </div>
              <template v-for="(item, index) in markForSend.layers">
                <div class="form__line">
                  <InputInput
                    v-model="item.layer"
                    parent-class="field__container field__container--short"
                    label="Слой"
                    rules="required"
                    :maxlength="10"
                  />
                  <InputInput
                    v-model="item.description"
                    parent-class="field__container field__container--long"
                    label="Описание"
                    rules="required"
                    :maxlength="4000"
                  />
                  <div
                    v-if="index > 2"
                    class="field__remove"
                  >
                    <a
                      href="javascript:{}"
                      @click="layerRemove(item, index)"
                    >
                      <svg class="sprite-cancel"><use
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xlink:href="/img/sprite.svg#cancel"
                      /></svg>
                    </a>
                  </div>
                </div>
              </template>
              <div
                v-show="markForSend.layers.length < 10"
                class="field__add"
              >
                <a
                  href="javascript:{}"
                  @click="layerAdd"
                >
                  <svg class="sprite-field-add"><use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="\./img/sprite.svg#field-add"
                  /></svg>
                  Добавить слой
                </a>
              </div>
            </fieldset>
            <TextareaInput
              v-model="markForSend.description"
              label="Описание"
              placeholder="Введите текст"
              rules="required"
              :counter="10000"
            />
            <TextareaInput
              v-model="markForSend.appointment"
              label="Назначение"
              placeholder="Введите текст"
              rules="required"
              :counter="10000"
            />
            <TextareaInput
              v-model="markForSend.description_additional"
              label="Дополнительная информация"
              placeholder="Введите текст"
              rules="required"
              :counter="10000"
            />
            <fieldset>
              <div class="legend">
                Характеристики:
              </div>
              <div class="form__grid">
                <div class="field__container field__container--w50">
                  <span class="field__label">Тип кабеля</span>
                  <Multiple
                    v-model="markForSend.property_cable_type"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <SelectInput
                        v-model="markForSend.property_cable_type[field.index]"
                        parent-class="field__container"
                        validation-name="тип кабеля"
                        placeholder="Выберите из списка"
                        rules="required"
                        :is-single="true"
                        :is-array="true"
                        :close="true"
                        :options="property_cable_type"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_armor_options') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Варианты брони</span>
                  <Multiple
                    v-model="markForSend.property_armor_options"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <SelectInput
                        v-model="markForSend.property_armor_options[field.index]"
                        parent-class="field__container"
                        placeholder="Выберите из списка"
                        validation-name="варианты брони"
                        rules="required"
                        :is-single="true"
                        :is-array="true"
                        :close="true"
                        :options="property_armor_options"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_screen_view') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Вид экрана</span>
                  <Multiple
                    v-model="markForSend.property_screen_view"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_screen_view[field.index]"
                        parent-class="field__container"
                        validation-name="вид экрана"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_gost') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">ГОСТ</span>
                  <Multiple
                    v-model="markForSend.property_gost"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_gost[field.index]"
                        parent-class="field__container"
                        validation-name="ГОСТ"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_voltage_allowable') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Допустимое напряжение</span>
                  <Multiple
                    v-model="markForSend.property_voltage_allowable"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_voltage_allowable[field.index]"
                        parent-class="field__container"
                        validation-name="допустимое напряжение"
                        placeholder="Введите значение"
                        rules="required"
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_filling') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Заполнение</span>
                  <Multiple
                    v-model="markForSend.property_filling"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <SelectInput
                        v-model="markForSend.property_filling[field.index]"
                        parent-class="field__container"
                        placeholder="Выберите из списка"
                        validation-name="заполнение"
                        rules="required"
                        :is-single="true"
                        :is-array="true"
                        :close="true"
                        :options="property_filling"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_protective_cover') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Защитный покров</span>
                  <Multiple
                    v-model="markForSend.property_protective_cover"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_protective_cover[field.index]"
                        parent-class="field__container"
                        validation-name="защитный покров"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_isolation') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Изоляция</span>
                  <Multiple
                    v-model="markForSend.property_isolation"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_isolation[field.index]"
                        parent-class="field__container"
                        validation-name="изоляция"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_execution') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Исполнение</span>
                  <Multiple
                    v-model="markForSend.property_execution"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_execution[field.index]"
                        parent-class="field__container"
                        validation-name="исполнение"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_caliber') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Калибр (для импортных производителей) </span>
                  <Multiple
                    v-model="markForSend.property_caliber"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_caliber[field.index]"
                        parent-class="field__container"
                        validation-name="калибр"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_material') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Материал</span>
                  <Multiple
                    v-model="markForSend.property_material"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_material[field.index]"
                        parent-class="field__container"
                        validation-name="материал"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_material_fibers') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Материал волокон</span>
                  <Multiple
                    v-model="markForSend.property_material_fibers"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_material_fibers[field.index]"
                        parent-class="field__container"
                        validation-name="материал волокон"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_material_shell') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Материал оболочки</span>
                  <Multiple
                    v-model="markForSend.property_material_shell"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_material_shell[field.index]"
                        parent-class="field__container"
                        validation-name="материал оболочки"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_armor_availability') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Наличие брони</span>
                  <Multiple
                    v-model="markForSend.property_armor_availability"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <SelectInput
                        v-model="markForSend.property_armor_availability[field.index]"
                        parent-class="field__container"
                        validation-name="наличие брони"
                        placeholder="Выберите из списка"
                        rules="required"
                        :is-single="true"
                        :is-array="true"
                        :close="true"
                        :options="property_armor_availability"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_rated_operating_voltage') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Номинальное рабочее напряжение</span>
                  <Multiple
                    v-model="markForSend.property_rated_operating_voltage"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_rated_operating_voltage[field.index]"
                        parent-class="field__container"
                        validation-name="номинальное рабочее напряжение"
                        placeholder="Введите значение"
                        rules="required"
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_normative_document') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Нормативный документ</span>
                  <Multiple
                    v-model="markForSend.property_normative_document"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_normative_document[field.index]"
                        parent-class="field__container"
                        validation-name="нормативный документ"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_use') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Применение</span>
                  <Multiple
                    v-model="markForSend.property_use"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_use[field.index]"
                        parent-class="field__container"
                        validation-name="применение"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_insulation_resistance') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Сопротивление изоляции</span>
                  <Multiple
                    v-model="markForSend.property_insulation_resistance"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_insulation_resistance[field.index]"
                        parent-class="field__container"
                        validation-name="сопротивление изоляции"
                        placeholder="Введите значение"
                        rules="required"
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_fiber_type') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Тип волокна</span>
                  <Multiple
                    v-model="markForSend.property_fiber_type"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_fiber_type[field.index]"
                        parent-class="field__container"
                        validation-name="тип волокна"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_veins_type') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Тип жил</span>
                  <Multiple
                    v-model="markForSend.property_veins_type"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_veins_type[field.index]"
                        parent-class="field__container"
                        validation-name="тип жил"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_laying_conditions') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Условия прокладки</span>
                  <Multiple
                    v-model="markForSend.property_laying_conditions"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_laying_conditions[field.index]"
                        parent-class="field__container"
                        validation-name="условия прокладки"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_color_protective_hose_outer_sheath') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Цвет защитного шланга/наружной оболочки</span>
                  <Multiple
                    v-model="markForSend.property_color_protective_hose_outer_sheath"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_color_protective_hose_outer_sheath[field.index]"
                        parent-class="field__container"
                        validation-name="цвет защитного шланга/наружной оболочки"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_central_element') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Центральный элемент</span>
                  <Multiple
                    v-model="markForSend.property_central_element"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="markForSend.property_central_element[field.index]"
                        parent-class="field__container"
                        validation-name="центральный элемент"
                        placeholder="Введите текст"
                        rules="required"
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
              </div>
            </fieldset>
            <fieldset
              v-for="(item, index) in markForSend.documents.technical_conditions"
              class="files"
            >
              <div
                v-if="markForSend.documents.technical_conditions.length > 1"
                class="field__remove"
              >
                <a
                  href="javascript:{}"
                  @click="fileRemove(markForSend.documents.technical_conditions, item, index)"
                >
                  <svg class="sprite-cancel"><use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="/img/sprite.svg#cancel"
                  /></svg>
                </a>
              </div>
              <div class="legend">
                Загрузить ТУ
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="ТУ"
                rules="required"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="item.file"
                  :preview="true"
                  :class="{error: failed}"
                  extensions=".pdf, .jpg, .png"
                  :metatypes="['application/pdf','image/jpeg','image/png']"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="form__grid">
                <InputInput
                  v-model="item.properties.number"
                  parent-class="field__container field__container--w50"
                  label="Номер ТУ"
                  placeholder="Введите номер"
                  rules="required"
                  :maxlength="4000"
                  :disabled="item.file === null"
                />
              </div>
            </fieldset>
            <div class="field__add">
              <a
                href="javascript:{}"
                @click="fileAdd(markForSend.documents.technical_conditions)"
              >
                <svg class="sprite-field-add"><use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="\./img/sprite.svg#field-add"
                /></svg>
                Добавить ТУ
              </a>
            </div>
            <fieldset
              v-for="(item, index) in markForSend.documents.certificates"
              class="files"
            >
              <div
                v-if="markForSend.documents.certificates.length > 1"
                class="field__remove"
              >
                <a
                  href="javascript:{}"
                  @click="fileRemove(markForSend.documents.certificates, item, index)"
                >
                  <svg class="sprite-cancel"><use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="/img/sprite.svg#cancel"
                  /></svg>
                </a>
              </div>
              <div class="legend">
                Загрузить сертификат
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="сертификат"
                :rules="{ required: markForSend.documents.guarantee_letters[0].file === null }"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="item.file"
                  :preview="true"
                  extensions=".pdf, .jpg, .png"
                  :class="{error: failed}"
                  :metatypes="['application/pdf','image/jpeg','image/png']"
                  :disabled="markForSend.documents.guarantee_letters[0].file !== null"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="form__grid">
                <InputInput
                  v-model="item.properties.number"
                  parent-class="field__container field__container--w50"
                  label="Номер сертификата"
                  placeholder="Введите номер"
                  :rules="{ required: item.file !== null }"
                  :maxlength="4000"
                  :disabled="item.file === null"
                />
                <div class="field__container field__container--w50">
                  <span class="field__label">Выберите дату начала и окончания сертификата</span>
                  <div class="field__range">
                    <div class="field__range-from">
                      <DateInput
                        v-model="item.properties.date_start"
                        placeholder="Дата начала"
                        validation-name="дата начала"
                        :disabled-from="item.properties.date_end"
                        :disabled-to="picker.disabledTo"
                        :format="picker.format"
                        :rules="{ required: item.file !== null }"
                        :disabled="item.file === null"
                      />
                    </div>
                    <span>&mdash;</span>
                    <div class="field__range-to">
                      <DateInput
                        v-model="item.properties.date_end"
                        placeholder="Дата окончания"
                        validation-name="дата окончания"
                        :disabled-from="picker.disabledFrom"
                        :disabled-to="item.properties.date_start"
                        :format="picker.format"
                        :rules="{ required: item.file !== null }"
                        :disabled="item.file === null"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <div
              class="field__add"
              :class="{disabled: markForSend.documents.guarantee_letters[0].file !== null}"
            >
              <a
                href="javascript:{}"
                @click="fileAdd(markForSend.documents.certificates)"
              >
                <svg class="sprite-field-add"><use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="\./img/sprite.svg#field-add"
                /></svg>
                Добавить Сертификат
              </a>
            </div>
            <fieldset
              v-for="(item, index) in markForSend.documents.guarantee_letters"
              class="files"
            >
              <div class="legend">
                Загрузить гарантийное письмо
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="гарантийное письмо"
                :rules="{ required: markForSend.documents.certificates[0].file === null }"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="item.file"
                  :preview="true"
                  extensions=".pdf, .jpg, .png"
                  :class="{error: failed}"
                  :metatypes="['application/pdf','image/jpeg','image/png']"
                  :disabled="markForSend.documents.certificates[0].file !== null"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
            </fieldset>
            <fieldset class="files">
              <div class="legend">
                Загрузить изображения
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="изображения"
                rules="required"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="markForSend.images"
                  :preview="true"
                  extensions=".jpg, .png"
                  :class="{error: failed}"
                  :metatypes="['image/jpeg','image/png']"
                  :max="2"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
            </fieldset>
            <div class="btns">
              <button
                type="submit"
                class="btn"
              >
                Добавить
              </button>
              <a
                href="/personal/"
                class="btn btn--bdr"
              >Отменить</a>
            </div>
            <div class="form__note">
              Обратите внимание, добавленная вами марка отправится на модерацию
            </div>
          </template>
        </template>
        <template v-if="type && type.id === 'marksize'">
          <div class="tabs tabs--line">
            <ul>
              <li :class="{active: view === 'form'}">
                <a
                  href="javascript:{}"
                  @click="viewSelect('form')"
                >Заполнить форму</a>
              </li>
              <li :class="{active: view === 'import'}">
                <a
                  href="javascript:{}"
                  @click="viewSelect('import')"
                >Импортировать Файл</a>
              </li>
            </ul>
          </div>
          <template v-if="view === 'import'">
            <Uploader
              v-model="marksizeImport"
              extensions=".csv, .xlsx"
              :metatypes="['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']"
            >
              <p>
                1. Скачайте <a href="/content/template-marksize.xlsx">шаблон</a> добавления маркоразмера в каталог
                <br>
                2. Заполните необходимые поля.
                <br>
                3. Загрузите заполненный <a href="/content/template-marksize.xlsx">шаблон</a> в формате .csv или .xlsx
              </p>
            </Uploader>
          </template>
          <template v-if="view === 'form'">
            <div class="form__grid">
              <SelectInput
                v-model="mark"
                parent-class="field__container field__container--w50"
                label="Марка, к которой прикрепляется маркоразмер"
                placeholder="Выбрать марку"
                rules="required"
                :is-single="true"
                :close="true"
                :options="marks"
                :select="markSelect"
                :loading="loadingMarks"
                :searchable="true"
                :search="markSearch"
              />
              <InputInput
                v-model="marksizeForSend.type"
                parent-class="field__container field__container--w50"
                label="Тип кабеля"
                rules="required"
                :maxlength="4000"
                :disabled="true"
              />
              <InputInput
                v-model="marksizeForSend.size"
                parent-class="field__container"
                label="Наименование маркоразмера (без марки)"
                placeholder="Введите наименование маркоразмера (без марки)"
                validation-name="наименование маркоразмера"
                :rules="{required: true, excluded: marksizes.map((item)=>{return item.name}) }"
                :maxlength="4000"
                :loading="loadingMarksizes"
                :disabled="!marksizeForSend.mark || !marksizeForSend.mark.length"
                :prefix="marksizeForSend.mark || ''"
                @input="marksizeChange"
              />
            </div>
            <TextareaInput
              v-model="marksizeForSend.description"
              label="Описание"
              placeholder="Введите текст"
              rules="required"
              :counter="10000"
            />
            <TextareaInput
              v-model="marksizeForSend.appointment"
              label="Назначение"
              placeholder="Введите текст"
              rules="required"
              :counter="10000"
            />
            <TextareaInput
              v-model="marksizeForSend.description_additional"
              label="Дополнительная информация"
              placeholder="Введите текст"
              rules="required"
              :counter="10000"
            />
            <fieldset v-if="marksizeForSend.mark">
              <div class="legend">
                Характеристики:
              </div>
              <div class="form__grid">
                <div
                  v-if="!properties.length || properties.indexOf('property_active_resistance_zero') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Активное сопротивление жил (нулевой)</span>
                  <Multiple
                    v-model="marksizeForSend.property_active_resistance_zero"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_active_resistance_zero[field.index]"
                        parent-class="field__container"
                        validation-name="активное сопротивление жил (нулевой)"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_active_resistance_main') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Активное сопротивление жил (основных)</span>
                  <Multiple
                    v-model="marksizeForSend.property_active_resistance_main"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_active_resistance_main[field.index]"
                        parent-class="field__container"
                        validation-name="активное сопротивление жил (основных)"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_active_resistance') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Активное сопротивление</span>
                  <Multiple
                    v-model="marksizeForSend.property_active_resistance"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_active_resistance[field.index]"
                        parent-class="field__container"
                        validation-name="активное сопротивление"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_active_resistance_plane') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Активное сопротивление при прокладке в плоскости</span>
                  <Multiple
                    v-model="marksizeForSend.property_active_resistance_plane"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_active_resistance_plane[field.index]"
                        parent-class="field__container"
                        validation-name="активное сопротивление при прокладке в плоскости"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_active_resistance_triangle') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Активное сопротивление при прокладке треугольником</span>
                  <Multiple
                    v-model="marksizeForSend.property_active_resistance_triangle"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_active_resistance_triangle[field.index]"
                        parent-class="field__container"
                        validation-name="активное сопротивление при прокладке треугольником"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_voltage_versions') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Варианты исполнения напряжения</span>
                  <Multiple
                    v-model="marksizeForSend.property_voltage_versions"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_voltage_versions[field.index]"
                        parent-class="field__container"
                        validation-name="варианты исполнения напряжения"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_outer_diameter') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Внешний диаметр</span>
                  <Multiple
                    v-model="marksizeForSend.property_outer_diameter"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_outer_diameter[field.index]"
                        parent-class="field__container"
                        validation-name="внешний диаметр"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_resistance_wave') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Волновое сопротивление</span>
                  <Multiple
                    v-model="marksizeForSend.property_resistance_wave"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_resistance_wave[field.index]"
                        parent-class="field__container"
                        validation-name="волновое сопротивление"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_diameter_cabel') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Диаметр кабеля</span>
                  <Multiple
                    v-model="marksizeForSend.property_diameter_cabel"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_diameter_cabel[field.index]"
                        parent-class="field__container"
                        validation-name="диаметр кабеля"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_diameter') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Диаметр</span>
                  <Multiple
                    v-model="marksizeForSend.property_diameter"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_diameter[field.index]"
                        parent-class="field__container"
                        validation-name="диаметр"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_voltage_allowable') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Допустимое напряжение</span>
                  <Multiple
                    v-model="marksizeForSend.property_voltage_allowable"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_voltage_allowable[field.index]"
                        parent-class="field__container"
                        validation-name="допустимое напряжение"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_capacitive_conductivity') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Емкостная проводимость</span>
                  <Multiple
                    v-model="marksizeForSend.property_capacitive_conductivity"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_capacitive_conductivity[field.index]"
                        parent-class="field__container"
                        validation-name="емкостная проводимость"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_capacity') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Емкость</span>
                  <Multiple
                    v-model="marksizeForSend.property_capacity"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_capacity[field.index]"
                        parent-class="field__container"
                        validation-name="емкость"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_inductive_resistance_cores_zero') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Индуктивное сопротивление жил (нулевой)</span>
                  <Multiple
                    v-model="marksizeForSend.property_inductive_resistance_cores_zero"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_inductive_resistance_cores_zero[field.index]"
                        parent-class="field__container"
                        validation-name="индуктивное сопротивление жил (нулевой)"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_inductive_resistance_cores_main') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Индуктивное сопротивление жил (основных)</span>
                  <Multiple
                    v-model="marksizeForSend.property_inductive_resistance_cores_main"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_inductive_resistance_cores_main[field.index]"
                        parent-class="field__container"
                        validation-name="индуктивное сопротивление жил (основных)"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_inductive_resistance_zero_sequence') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Индуктивное сопротивление нулевой последовательности</span>
                  <Multiple
                    v-model="marksizeForSend.property_inductive_resistance_zero_sequence"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_inductive_resistance_zero_sequence[field.index]"
                        parent-class="field__container"
                        validation-name="индуктивное сопротивление нулевой последовательности"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_inductive_resistance') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Индуктивное сопротивление</span>
                  <Multiple
                    v-model="marksizeForSend.property_inductive_resistance"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_inductive_resistance[field.index]"
                        parent-class="field__container"
                        validation-name="индуктивное сопротивление"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_inductive_resistance_plane') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Индуктивное сопротивление при прокладке в плоскости</span>
                  <Multiple
                    v-model="marksizeForSend.property_inductive_resistance_plane"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_inductive_resistance_plane[field.index]"
                        parent-class="field__container"
                        validation-name="индуктивное сопротивление при прокладке в плоскости"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_inductive_resistance_triangle') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Индуктивное сопротивление при прокладке треугольником</span>
                  <Multiple
                    v-model="marksizeForSend.property_inductive_resistance_triangle"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_inductive_resistance_triangle[field.index]"
                        parent-class="field__container"
                        validation-name="индуктивное сопротивление при прокладке треугольником"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_inductive_resistance_direct_sequence') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Индуктивное сопротивление прямой последовательности</span>
                  <Multiple
                    v-model="marksizeForSend.property_inductive_resistance_direct_sequence"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_inductive_resistance_direct_sequence[field.index]"
                        parent-class="field__container"
                        validation-name="индуктивное сопротивление прямой последовательности"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_class_flexibility_vein') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Класс гибкости жилы</span>
                  <Multiple
                    v-model="marksizeForSend.property_class_flexibility_vein"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <SelectInput
                        v-model="marksizeForSend.property_class_flexibility_vein[field.index]"
                        parent-class="field__container"
                        validation-name="класс гибкости жилы"
                        placeholder="Выберите из списка"
                        rules=""
                        :is-single="true"
                        :is-array="true"
                        :close="true"
                        :options="property_class_flexibility_vein"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_fiber_count') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Количество волокон</span>
                  <Multiple
                    v-model="marksizeForSend.property_fiber_count"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_fiber_count[field.index]"
                        type="number"
                        parent-class="field__container"
                        validation-name="количеств волокон"
                        placeholder="Введите значение"
                        rules=""
                        :max="99999"
                        :min="1"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_veins_count') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Количество жил</span>
                  <Multiple
                    v-model="marksizeForSend.property_veins_count"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_veins_count[field.index]"
                        type="number"
                        parent-class="field__container"
                        validation-name="количеств жил"
                        placeholder="Введите значение"
                        rules=""
                        :max="99999"
                        :min="1"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_section') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Сечение</span>
                  <Multiple
                    v-model="marksizeForSend.property_section"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_section[field.index]"
                        parent-class="field__container"
                        validation-name="сечение"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_number_pairs') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Количество пар</span>
                  <Multiple
                    v-model="marksizeForSend.property_number_pairs"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_number_pairs[field.index]"
                        type="number"
                        parent-class="field__container"
                        validation-name="количеств пар"
                        placeholder="Введите значение"
                        rules=""
                        :max="99999"
                        :min="0"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_number_triples') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Количество троек</span>
                  <Multiple
                    v-model="marksizeForSend.property_number_triples"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_number_triples[field.index]"
                        type="number"
                        parent-class="field__container"
                        validation-name="количеств троек"
                        placeholder="Введите значение"
                        rules=""
                        :max="99999"
                        :min="0"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_number_fours') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Количество четверок</span>
                  <Multiple
                    v-model="marksizeForSend.property_number_fours"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_number_fours[field.index]"
                        type="number"
                        parent-class="field__container"
                        validation-name="количеств четверок"
                        placeholder="Введите значение"
                        rules=""
                        :max="99999"
                        :min="0"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_number_elements') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Количество элементов</span>
                  <Multiple
                    v-model="marksizeForSend.property_number_elements"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_number_elements[field.index]"
                        type="number"
                        parent-class="field__container"
                        validation-name="количеств элементов"
                        placeholder="Введите значение"
                        rules=""
                        :max="99999"
                        :min="0"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_material_vein') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Материал жилы</span>
                  <Multiple
                    v-model="marksizeForSend.property_material_vein"
                    :max="1"
                  >
                    <template v-slot:default="field">
                      <SelectInput
                        v-model="marksizeForSend.property_material_vein[field.index]"
                        parent-class="field__container"
                        validation-name="материал жилы"
                        placeholder="Выберите из списка"
                        rules=""
                        :is-single="true"
                        :is-array="true"
                        :close="true"
                        :options="property_material_vein"
                        :disabled="disabledPropertyMaterialVein"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_minimum_bending_radius') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Минимальный радиус изгиба</span>
                  <Multiple
                    v-model="marksizeForSend.property_minimum_bending_radius"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_minimum_bending_radius[field.index]"
                        parent-class="field__container"
                        validation-name="минимальный радиус изгиба"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_voltage') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Напряжение</span>
                  <Multiple
                    v-model="marksizeForSend.property_voltage"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_voltage[field.index]"
                        parent-class="field__container"
                        validation-name="напряжение"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_optical_module') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Оптические модули</span>
                  <Multiple
                    v-model="marksizeForSend.property_optical_module"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_optical_module[field.index]"
                        parent-class="field__container"
                        validation-name="оптические модули"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_crushing_force') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Раздавливающее усилие</span>
                  <Multiple
                    v-model="marksizeForSend.property_crushing_force"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_crushing_force[field.index]"
                        parent-class="field__container"
                        validation-name="раздавливающее усилие"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_fiber_size') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Размер волокна</span>
                  <Multiple
                    v-model="marksizeForSend.property_fiber_size"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_fiber_size[field.index]"
                        parent-class="field__container"
                        validation-name="размер волокна"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_fibers_size') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Размер волокон</span>
                  <Multiple
                    v-model="marksizeForSend.property_fibers_size"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_fibers_size[field.index]"
                        parent-class="field__container"
                        validation-name="размер волокон"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_tensile_force') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Растягивающее усилие</span>
                  <Multiple
                    v-model="marksizeForSend.property_tensile_force"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_tensile_force[field.index]"
                        parent-class="field__container"
                        validation-name="растягивающее усилие"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_cable_cross_section') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Сечение кабеля</span>
                  <Multiple
                    v-model="marksizeForSend.property_cable_cross_section"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_cable_cross_section[field.index]"
                        parent-class="field__container"
                        validation-name="сечение кабеля"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_lifetime') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Срок службы</span>
                  <Multiple
                    v-model="marksizeForSend.property_lifetime"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_lifetime[field.index]"
                        parent-class="field__container"
                        validation-name="срок службы"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_construction_length') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Строительная длина</span>
                  <Multiple
                    v-model="marksizeForSend.property_construction_length"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_construction_length[field.index]"
                        parent-class="field__container"
                        validation-name="строительная длина"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_application_type') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Тип применения</span>
                  <Multiple
                    v-model="marksizeForSend.property_application_type"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_application_type[field.index]"
                        parent-class="field__container"
                        validation-name="тип применения"
                        placeholder="Введите текст"
                        rules=""
                        :maxlength="4000"
                      />
                    </template>
                  </Multiple>
                </div>
                <div
                  v-if="!properties.length || properties.indexOf('property_electrical_resistance') !== -1"
                  class="field__container field__container--w50"
                >
                  <span class="field__label">Электрическое сопротивление</span>
                  <Multiple
                    v-model="marksizeForSend.property_electrical_resistance"
                    :max="5"
                  >
                    <template v-slot:default="field">
                      <InputInput
                        v-model="marksizeForSend.property_electrical_resistance[field.index]"
                        parent-class="field__container"
                        validation-name="электрическое сопротивление"
                        placeholder="Введите значение"
                        rules=""
                        inputmask="(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])"
                      />
                    </template>
                  </Multiple>
                </div>
              </div>
            </fieldset>
            <fieldset
              v-for="(item, index) in marksizeForSend.documents.technical_conditions"
              class="files"
            >
              <div
                v-if="marksizeForSend.documents.technical_conditions.length > 1"
                class="field__remove"
              >
                <a
                  href="javascript:{}"
                  @click="fileRemove(marksizeForSend.documents.technical_conditions, item, index)"
                >
                  <svg class="sprite-cancel"><use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="/img/sprite.svg#cancel"
                  /></svg>
                </a>
              </div>
              <div class="legend">
                Загрузить ТУ
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="ТУ"
                rules="required"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="item.file"
                  :preview="true"
                  extensions=".pdf, .jpg, .png"
                  :class="{error: failed}"
                  :metatypes="['application/pdf','image/jpeg','image/png']"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="form__grid">
                <InputInput
                  v-model="item.properties.number"
                  parent-class="field__container field__container--w50"
                  label="Номер ТУ"
                  placeholder="Введите номер"
                  rules="required"
                  :maxlength="4000"
                  :disabled="item.file === null"
                />
              </div>
            </fieldset>
            <div class="field__add">
              <a
                href="javascript:{}"
                @click="fileAdd(marksizeForSend.documents.technical_conditions)"
              >
                <svg class="sprite-field-add"><use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="\./img/sprite.svg#field-add"
                /></svg>
                Добавить ТУ
              </a>
            </div>
            <fieldset
              v-for="(item, index) in marksizeForSend.documents.certificates"
              class="files"
            >
              <div
                v-if="marksizeForSend.documents.certificates.length > 1"
                class="field__remove"
              >
                <a
                  href="javascript:{}"
                  @click="fileRemove(marksizeForSend.documents.certificates, item, index)"
                >
                  <svg class="sprite-cancel"><use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="/img/sprite.svg#cancel"
                  /></svg>
                </a>
              </div>
              <div class="legend">
                Загрузить сертификат
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="сертификат"
                :rules="{ required: marksizeForSend.documents.guarantee_letters[0].file === null }"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="item.file"
                  :preview="true"
                  extensions=".pdf, .jpg, .png"
                  :class="{error: failed}"
                  :metatypes="['application/pdf','image/jpeg','image/png']"
                  :disabled="marksizeForSend.documents.guarantee_letters[0].file !== null"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="form__grid">
                <InputInput
                  v-model="item.properties.number"
                  parent-class="field__container field__container--w50"
                  label="Номер сертификата"
                  placeholder="Введите номер"
                  :rules="{ required: item.file !== null }"
                  :maxlength="50"
                  :disabled="item.file === null"
                />
                <div class="field__container field__container--w50">
                  <span class="field__label">Выберите дату начала и окончания сертификата</span>
                  <div class="field__range">
                    <div class="field__range-from">
                      <DateInput
                        v-model="item.properties.date_start"
                        placeholder="Дата начала"
                        validation-name="дата начала"
                        :disabled-from="item.properties.date_end"
                        :disabled-to="picker.disabledTo"
                        :format="picker.format"
                        :rules="{ required: item.file !== null }"
                        :disabled="item.file === null"
                      />
                    </div>
                    <span>&mdash;</span>
                    <div class="field__range-to">
                      <DateInput
                        v-model="item.properties.date_end"
                        placeholder="Дата окончания"
                        validation-name="дата окончания"
                        :disabled-from="picker.disabledFrom"
                        :disabled-to="item.properties.date_start"
                        :format="picker.format"
                        :rules="{ required: item.file !== null }"
                        :disabled="item.file === null"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <div
              class="field__add"
              :class="{disabled: marksizeForSend.documents.guarantee_letters[0].file !== null}"
            >
              <a
                href="javascript:{}"
                @click="fileAdd(marksizeForSend.documents.certificates)"
              >
                <svg class="sprite-field-add"><use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="\./img/sprite.svg#field-add"
                /></svg>
                Добавить Сертификат
              </a>
            </div>
            <fieldset
              v-for="(item, index) in marksizeForSend.documents.guarantee_letters"
              class="files"
            >
              <div class="legend">
                Загрузить гарантийное письмо
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="гарантийное письмо"
                :rules="{ required: marksizeForSend.documents.certificates[0].file === null }"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="item.file"
                  :preview="true"
                  extensions=".pdf, .jpg, .png"
                  :class="{error: failed}"
                  :metatypes="['application/pdf','image/jpeg','image/png']"
                  :disabled="marksizeForSend.documents.certificates[0].file !== null"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
            </fieldset>
            <fieldset class="files">
              <div class="legend">
                Загрузить изображения
              </div>
              <ValidationProvider
                v-slot:default="{ errors, failed }"
                name="изображения"
                rules="required"
                tag="div"
                :mode="validateFile"
              >
                <Uploader
                  v-model="marksizeForSend.images"
                  :preview="true"
                  extensions=".jpg, .png"
                  :class="{error: failed}"
                  :metatypes="['image/jpeg','image/png']"
                  :max="2"
                />
                <span
                  v-show="failed"
                  class="field__error"
                >{{ errors[0] }}</span>
              </ValidationProvider>
            </fieldset>
            <div class="btns">
              <button
                type="submit"
                class="btn"
              >
                Добавить
              </button>
              <a
                href="/personal/"
                class="btn btn--bdr"
              >Отменить</a>
            </div>
            <div class="form__note">
              Обратите внимание, добавленный вами маркоразмер отправится на модерацию
            </div>
          </template>
        </template>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep';
import { ru } from 'vuejs-datepicker/src/locale';
import XLSX from 'xlsx/xlsx';
import api from '../../../helpers/api';
import functions from '../../../helpers/functions';
import Uploader from '../../../components/uploder.vue';
// import moment from 'moment';
import Multiple from '../../../components/forms/Multiple';
import SelectInput from '../../../components/forms/Select';
import InputInput from '../../../components/forms/Input';
import TextareaInput from '../../../components/forms/Textarea';
import DateInput from '../../../components/forms/Date';

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
  data() {
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
        format: 'dd.MM.yyyy',
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
            },
          ],
          certificates: [
            {
              file: null,
              properties: {
                number: null,
                date_start: null,
                date_end: null,
              },
            },
          ],
          guarantee_letters: [
            {
              file: null,
            },
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
            },
          ],
          certificates: [
            {
              file: null,
              properties: {
                number: null,
                date_start: null,
                date_end: null,
              },
            },
          ],
          guarantee_letters: [
            {
              file: null,
            },
          ],
        },
        images: [],
      },
      disabledPropertyMaterialVein: false,
    };
  },
  computed: {
    companies() {
      // список компаний пользователя
      let companies = [];
      switch (this.$store.getters.userRole) {
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
  watch: {
    'markForSend.property_cable_type': function (cable_type) {
      this.getProperties(cable_type);
    },
    markImport(file) {
      this.importFile(file);
    },
    marksizeImport(file) {
      this.importFile(file);
    },
  },
  created() {
    this.$emit('fullMode');
    this.loadProperties();
  },
  methods: {
    viewSelect(view) {
      // переключаем вид: form или import
      this.view = view;
    },
    companySelect(selectedCompany, id) {
      this.markForSend.company_id = selectedCompany.id;
      this.marksizeForSend.company_id = selectedCompany.id;
    },
    typeSelect(selectedType, id) {
      this.view = 'form'; // по умолчанию - вид для заполнения формы
      this.type = selectedType.id;
    },
    getProperties(cable_types) {
      let properties = [];
      if (this.type.id === 'marksize') { // todo ПОКА добавили т.к. характеристики МАРКИ НЕ зависят от типа кабеля
        for (let i = 0; i < cable_types.length; i += 1) {
          if (cable_types[i].length) {
            properties = properties.concat(this.allProperties.required[cable_types[i]]);
            properties = properties.filter((item, pos) => properties.indexOf(item) === pos);
          }
        }
      }
      this.properties = properties;
    },
    loadProperties() {
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
    markChange() {
      this.markSearch(this.markForSend.mark);
    },
    markSelect(selectedMark, id) {
      this.marksizeForSend.mark = selectedMark.name;
      this.marksizeForSend.type = selectedMark.property_cable_type && selectedMark.property_cable_type.length ? selectedMark.property_cable_type.join(', ') : '';
      this.getProperties(selectedMark.property_cable_type);
      window.openLoader();
      this.fetchMark(selectedMark.id)
        .then((response) => {
          const layers = response.data.layers;
          if (layers && layers.length) {
            if (layers.find((layer) => ['a', 'а'].indexOf(layer.layer.toLowerCase()) !== -1).length) {
              this.marksizeForSend.property_material_vein = ['Алюминий'];
            } else {
              this.marksizeForSend.property_material_vein = ['Медь'];
            }
            // поле предустановлено - запрещаем редактировать
            this.disabledPropertyMaterialVein = true;
          // } else {
            // this.marksizeForSend.property_material_vein = ['Алюминий'];
            // this.disabledPropertyMaterialVein = true;
          }
          window.closeLoader();
        })
        .catch((e) => {
          if (!axios.isCancel(e)) {
            console.log(e);
            window.openLoader();
            // window.notificationError('Ошибка сервера');
          }
        });
    },
    markSearch(q) {
      clearInterval(this.loadingMarksCounter);
      if (q.length) {
        this.cancelCatalogMarkSearch();
        this.loadingMarksCounter = setTimeout(() => {
          this.loadingMarks = true;
          this.fetchCatalogMark(q)
            .then((response) => {
              this.marks = response.data.data;
              this.loadingMarks = false;
            })
            .catch((e) => {
              if (!axios.isCancel(e)) {
                console.log(e);
                this.marks = [];
                this.loadingMarks = false;
                window.notificationError('Ошибка сервера');
              }
            });
        }, 1000);
      }
    },
    marksizeChange() {
      clearInterval(this.loadingMarksizesCounter);
      if (this.marksizeForSend.size.length) {
        this.cancelCatalogMarksizeSearch();
        this.loadingMarksizesCounter = setTimeout(() => {
          this.loadingMarksizes = true;
          this.fetchCatalogMarksize(this.marksizeForSend.size)
            .then((response) => {
              this.marksizes = response.data.data;
              this.loadingMarksizes = false;
            })
            .catch((e) => {
              if (!axios.isCancel(e)) {
                this.marksizes = [];
                this.loadingMarksizes = false;
                window.notificationError('Ошибка сервера');
              }
            });
        }, 1000);
      }
    },
    layerAdd() {
      this.markForSend.layers.push({
        layer: '',
        description: '',
      });
    },
    layerRemove(layer, index) {
      evt.preventDefault();
      this.markForSend.layers.splice(index, 1);
    },
    fileAdd(field) {
      const newItem = {};
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
    fileRemove(field, layer, index) {
      field.splice(index, 1);
    },
    sendForm(evt) {
      evt.preventDefault();
      this.$refs.form.validate().then((res) => {
        if (res) {
          window.openLoader();
          const fData = cloneDeep(this.type.id === 'mark' ? this.markForSend : this.marksizeForSend);
          for (let i = 0; i < fData.documents.technical_conditions.length; i += 1) {
            if (fData.documents.technical_conditions[i].file === null) {
              fData.documents.technical_conditions.splice(i, 1);
            }
          }
          for (let i = 0; i < fData.documents.certificates.length; i += 1) {
            if (fData.documents.certificates[i].file === null) {
              fData.documents.certificates.splice(i, 1);
            }
          }
          for (let i = 0; i < fData.documents.guarantee_letters.length; i += 1) {
            if (fData.documents.guarantee_letters[i].file === null) {
              fData.documents.guarantee_letters.splice(i, 1);
            }
          }
          for (const key in fData) {
            // удаляем ненужные для типа кабеля характеристики
            if (this.properties.length) {
              if (fData.hasOwnProperty(key) && key.indexOf('property_') === 0 && this.properties.indexOf(key) === -1) {
                delete fData[key];
              }
            }
          }
          const formDataObj = this.objectToFormData(fData);
          if (this.type.id === 'mark') {
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
          clearInterval(this.scrollToErrorInstance);
          this.scrollToErrorInstance = setTimeout(() => {
            this.scrollToError();
          }, 500);
        }
      });
    },
    validateFile() {
      return { on: ['blur', 'input', 'change'] };
    },
    importFile(file) {
      window.openLoader();
      const reader = new FileReader();
      console.log(file);
      FileReader.onerror = (e) => {
        window.notificationError('Ошибка импорта из файла');
        window.closeLoader();
      };
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // get array
        if (data.length < 2) {
          window.closeLoader();
          this.view = 'form';
          return;
        }
        const item = data[1]; // get item row
        data.splice(0, 2); // delete head & item rows
        data.splice(9); // delete all trash rows
        let fields = [];
        let importedFields = {};
        if (this.type.id === 'mark') {
          fields = ['mark', 'description', 'appointment', 'description_additional', 'layers|layer', 'layers|description', 'property_armor_options', 'property_screen_view', 'property_gost', 'property_voltage_allowable', 'property_filling', 'property_protective_cover', 'property_isolation', 'property_execution', 'property_caliber', 'property_material', 'property_material_fibers', 'property_material_shell', 'property_armor_availability', 'property_rated_operating_voltage', 'property_normative_document', 'property_use', 'property_insulation_resistance', 'property_fiber_type', 'property_veins_type', 'property_cable_type', 'property_laying_conditions', 'property_color_protective_hose_outer_sheath', 'property_central_element'];
          importedFields = this.markForSend;
          // чистим все масивы с объектами
          importedFields.layers = [{}];
        } else {
          fields = ['size', 'markname', 'description', 'appointment', 'description_additional', 'property_active_resistance_zero', 'property_active_resistance_main', 'property_active_resistance', 'property_active_resistance_plane', 'property_active_resistance_triangle', 'property_voltage_versions', 'property_outer_diameter', 'property_resistance_wave', 'property_diameter_cabel', 'property_diameter', 'property_voltage_allowable', 'property_capacitive_conductivity', 'property_capacity', 'property_inductive_resistance_cores_zero', 'property_inductive_resistance_cores_main', 'property_inductive_resistance_zero_sequence', 'property_inductive_resistance', 'property_inductive_resistance_plane', 'property_inductive_resistance_triangle', 'property_inductive_resistance_direct_sequence', 'property_class_flexibility_vein', 'property_fiber_count', 'property_veins_count', 'property_number_pairs', 'property_number_triples', 'property_number_fours', 'property_number_elements', 'property_material_vein', 'property_minimum_bending_radius', 'property_voltage', 'property_optical_module', 'property_crushing_force', 'property_fiber_size', 'property_fibers_size', 'property_tensile_force', 'property_section', 'property_cable_cross_section', 'property_lifetime', 'property_construction_length', 'property_application_type', 'property_electrical_resistance'];
          importedFields = this.marksizeForSend;
        }
        function getImportValue(field, value) {
          if (!value || !value.length) return value;
          let v = '';
          switch (field) {
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
              v = Inputmask.format(value, { mask: '(x9{0,2}[,(9[x])|(x)])|(x9{3}[,x])|(x[9{4}])|(0[,9[x]])' });
              v = value.replace(/[^,0-9]/g, '');
              break;
            case 'property_fiber_count':
            case 'property_veins_count':
            case 'property_number_pairs':
            case 'property_number_triples':
            case 'property_number_fours':
            case 'property_number_elements':
              // integer
              v = value.replace(/[^0-9]/g, '');
              break;
            default:
              // обычная строка
              v = value;
              break;
          }
          // console.log("getImportValue('"+field+"', '"+value+"') = '"+v+"';");
          return v.toString().trim();
        }
        for (let i = 0; i < fields.length; i += 1) {
          const field = fields[i].indexOf('|') === -1 ? fields[i] : fields[i].substr(0, fields[i].indexOf('|'));
          let fieldValue = getImportValue(field, item[i]);
          if (importedFields.hasOwnProperty(field)) {
            if (Array.isArray(importedFields[field])) {
              if (typeof importedFields[field][0] === 'object') {
                // проставляем значения для объектов
                const subfield = fields[i].substr(fields[i].indexOf('|') + 1);
                fieldValue = getImportValue(subfield, item[i]);
                // console.log(`Import field: ${field}, subfield: ${subfield} = ${fieldValue}`);
                if (importedFields[field][0]) {
                  // если элемент уже существует - ставим значение
                  importedFields[field][0][subfield] = fieldValue;
                  if (data.length) {
                    // перебираем все дополнительные поля
                    for (let r = 0; r < data.length; r += 1) {
                      if (field !== 'layers' && r > 4) continue;
                      fieldValue = getImportValue(field, data[r][i]);
                      if (fieldValue && fieldValue.toString().length) {
                        if (typeof importedFields[field][r + 1] === 'object') {
                          // если элемент для дополнительного поля существует - ставим значение
                          importedFields[field][r + 1][subfield] = fieldValue;
                        } else {
                          // если элемент для дополнительного поля НЕ существует - создаем и добавляем
                          const obj = {};
                          obj[subfield] = fieldValue;
                          importedFields[field].push(obj);
                        }
                      }
                    }
                  }
                } else {
                  // если элемент НЕ существует - создаём и добавляем
                  let obj = {};
                  obj[subfield] = fieldValue;
                  importedFields[field].push(obj);
                  if (data.length) {
                    // перебираем все дополнительные поля
                    for (let r = 0; r < data.length; r += 1) {
                      if (field !== 'layers' && r > 4) continue;
                      fieldValue = getImportValue(field, data[r][i]);
                      if (fieldValue && fieldValue.toString().length) {
                        // т.к. элемент для дополнительного поля гарантированно НЕ существует - создаем и добавляем
                        obj = {};
                        obj[subfield] = fieldValue;
                        importedFields[field].push(obj);
                      }
                    }
                  }
                }
              } else {
                // проставляем текстовые значения
                importedFields[field] = [];
                if (Array.isArray(this[field])) {
                  // console.log(`${field} is array: ${this[field].indexOf(fieldValue)}`);
                  // если поле выпадающий список то проверяем значение
                  if (this[field].indexOf(fieldValue) !== -1) {
                    importedFields[field].push(fieldValue);
                  } else {
                    importedFields[field].push('');
                  }
                  if (data.length) {
                    for (let r = 0; r < data.length; r += 1) {
                      fieldValue = getImportValue(field, data[r][i]);
                      if (fieldValue && fieldValue.toString().length) {
                        if (this[field].indexOf(fieldValue) !== -1) {
                          importedFields[field].push(fieldValue);
                        }
                      }
                    }
                  }
                } else {
                  // console.log(`Import field: ${field} = ${fieldValue}`);
                  importedFields[field].push(fieldValue);
                  if (data.length) {
                    for (let r = 0; r < data.length; r += 1) {
                      fieldValue = getImportValue(field, data[r][i]);
                      if (fieldValue && fieldValue.toString().length) {
                        importedFields[field].push(fieldValue);
                      }
                    }
                  }
                }
              }
            } else {
              importedFields[field] = fieldValue;
            }
          } else {
            // console.log('?field: '+field+' = '+item[i]);
          }
        }
        if (this.type.id === 'mark') {
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
          const newMark = item[1] || '';
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
                  const importedMark = this.marks.filter((item) => item.name === newMark)[0] || null;
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
  },
};
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
