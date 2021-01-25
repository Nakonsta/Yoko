<template>
    <div class="tender-item__protocols">
        <div class="tender-item__protocols-block">
            <div 
                v-if="$store.getters.userRole === 'buyer' && this.$store.getters.companyBuyer.find((firm) => firm.inn === company.inn)"
                class="tender-item__protocol-attach-block"
            >
                <span class="btn tender-item__protocol-attach" @click="openModal('#tender-item__protocols-modal')">Прикрепить протокол</span>
            </div>
            <div class="tender-item__protocols-rows">
                <div v-for="(group, index) in protocolGroups" :key="index" class="tender-item__protocol">
                    <div class="tender-item__protocol-title">
                        {{ group.name }}
                    </div>
                    <div v-if="filterProtocols(tenderItemData.protocols, group.id).length" class="tender-item__protocol-table">
                        <div class="tender-item__protocol-header-row">
                            <div class="tender-item__protocol-header tender-item__protocol-name">
                                Наименование
                            </div>
                            <!-- <div class="tender-item__protocol-header tender-item__protocol-edition">
                                Редакция
                            </div> -->
                            <div class="tender-item__protocol-header tender-item__protocol-created">
                                Создано
                            </div>
                        </div>
                        <div class="tender-item__protocol-block">
                            <div v-for="(protocol, key) in filterProtocols(tenderItemData.protocols, group.id)" :key="key" class="tender-item__protocol-item-row">
                                <div class="tender-item__protocol-item tender-item__protocol-name" :data-name="protocol.name ? 'Название' : ''">
                                    <a :href="protocol.url" class="tender-item__protocol-link" download>{{ protocol.name }}</a>
                                </div>
                                <!-- <div class="tender-item__protocol-item tender-item__protocol-edition">
                                    {{ protocol.quantity }}
                                </div> -->
                                <div class="tender-item__protocol-item tender-item__protocol-created" :data-name="protocol.created_at ? 'Создан' : ''">
                                    {{ formatDate(protocol.created_at) }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="tender-item__empty">
                        Протоколов процедуры пока нет.
                    </div>                    
                </div>
            </div>
        </div>
        <div id="tender-item__protocols-modal" class="popup popup--alt">
            <div class="popup__body">
                <div class="popup__content">
                    <a href="javascript:{}" class="popup__close" @click="closeModal('#tender-item__protocols-modal')"><svg class="sprite-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use></svg></a>
                    <div class="popup__title">Прикрепить протокол</div>
                    <div class="popup__content-container">
                         <ValidationObserver ref="form" tag="div" mode="eager">
                            <form class="popup__form" @submit.prevent="sendForm" slot-scope="{ valid }">
                                <SelectInput
                                    parentClass="field__container"
                                    label="Название раздела"
                                    rules="required"
                                    :isSingle="true"
                                    placeholder="Выберите из списка"
                                    :close="true"
                                    v-model="newProtocols.group"
                                    :options="protocolGroups"
                                />
                                <div class="support-form__item support-form__item--file">
                                    <input
                                        id="file-input"
                                        type="file"
                                        name="file"
                                        class="support-form__input-file"
                                        @change="attachApplication"
                                        accept="application/pdf, image/jpeg, image/png"
                                    >
                                    <label for="file-input" class="support-form__label-file">Загрузите протокол</label>
                                    <div class="file-listing__group">
                                        <div v-for="(file, key) in newProtocols.protocols" :key="key" class="file-listing">
                                            <div class="file-listing__info">
                                                <div class="file-listing__file">
                                                {{ file.name }}
                                                </div>
                                            </div>
                                            <a class="file-listing__delete" fab dark x-small @click="removeFile(key)">
                                                <svg width="12" height="12" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.4142 11L17.7071 5.70712C18.0976 5.31659 18.0976 4.68343 17.7071 4.2929C17.3166 3.90238 16.6834 3.90238 16.2929 4.2929L11 9.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L9.5858 11L4.29289 16.2929C3.90237 16.6834 3.90237 17.3166 4.29289 17.7071C4.68342 18.0977 5.31658 18.0977 5.70711 17.7071L11 12.4142L16.2929 17.7071Z" fill="#31ACB8"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn" :disabled="!valid">Отправить</button>
                            </form>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SelectInput from "../../forms/Select";
import api from '../../../helpers/api';
import functions from '../../../helpers/functions';
import cloneDeep from 'lodash.clonedeep';

export default {
    name: 'TenderItemProtocolsTab',

    components: {
        SelectInput
    },

    props: {
        tenderItemData: {
            type: Object,
            required: true,
        },
        company: {
            type: Object,
            required: true,
        }
    },

    mixins: [api, functions],

    data() {
        return {
            protocolGroups: [
                {name: 'Протокол вскрытия заявок', id: 'opening'},
                {name: 'Протокол рассмотрения заявок', id: 'consideration'},
                {name: 'Протокол выбора победителя', id: 'choosing'},
                {name: 'Протокол отмены процедуры', id: 'canceling'},
            ],
            newProtocols: {
                group: null,
                protocols: []
            }
        }
    },

    methods: {
        filterProtocols(protocols, protocolGroup) {
            let filteredProtocols = protocols.filter(protocol => protocol.properties.group == protocolGroup)
            return filteredProtocols
        },
        formatDate(string) {
            var d = new Date(string),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            minutes = '' + d.getMinutes();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            if (hour.length < 2) 
                hour = '0' + hour;
            if (minutes.length < 2) 
                minutes = '0' + minutes;

            var time = ' ' + hour + ':' + minutes;

            return [day, month, year].join('.') + time;
        },
        openModal(popupId) {
            openPopupById(popupId);
        },
        closeModal(popupId) {
            closePopupById(popupId);
        },
        attachApplication(evt) {
            var files = evt.target.files || evt.dataTransfer.files;
            if (!files.length)
                return;
            if (['application/pdf', 'image/jpeg', 'image/png'].includes(files[0].type)) {
              this.newProtocols.protocols = [];
              this.newProtocols.protocols.push(files[0]);
            } else {
              notificationError('Загружаемый файл должен быть форматов: pdf, jpeg, png')
            }
        },
        removeFile(key) {
            this.newProtocols.protocols.splice(key, 1)
        },
        sendForm(evt) {
            evt.preventDefault();
            let fData = {
                group: this.newProtocols.group.id,
                protocols: this.newProtocols.protocols
            };
            const formDataObj = this.objectToFormData(fData);
            this.sendProcedureProtocols(this.tenderItemData.id, formDataObj)
                .then(() => {
                    window.notificationSuccess('Ваша марка отправлена на модерацию');
                    closePopupById('#tender-item__protocols-modal');
                })
                .catch((response) => {
                    window.notificationError('Ошибка сервера');
                });
        }
    }
}
</script>