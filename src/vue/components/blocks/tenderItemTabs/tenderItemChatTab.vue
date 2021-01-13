<template>
    <div class="qa">
        <div class="qa__person no-print" v-if="company">
            <div class="qa__avatar avatar avatar--alt" :style="{backgroundColor: companyAvatar.color}">{{ companyAvatar.name }}</div>
            <div class="qa__person-wrap">
                <div><a href="#">{{ company.shortName ? company.shortName : company.name }}</a></div>
                <popupCompanyContact
                        :company="company"
                        ref="contact"
                />
            </div>
        </div>
        <div class="qa__content">
            <div class="qa__items">
                <template v-if="tenderItemData.qa && tenderItemData.qa.length">
                    <div class="qa__item" v-for="(question, index) in tenderItemData.qa" :key="question.id" :ref="'question-'+question.id">
                        <div class="qa__item-question">
                            <div class="qa__avatar avatar"></div>
                            <p v-html="nl2br(question.message)"></p>
                            <ul v-if="question.documents">
                                <li v-for="document in question.documents">
                                    <a :href="document.url"><svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg> {{ document.name }}</a>
                                </li>
                            </ul>
                            <div class="qa__item-meta">
                                <time>{{ formatDate(question.created_at) }}</time>
                                <a href="javascript:{}" @click="reply(index)" v-if="userCanReply">Ответить</a>
                            </div>
                        </div>
                        <template v-if="question.answers && question.answers.length">
                            <div class="qa__item-answer" v-for="answer in question.answers" :key="answer.id" :ref="'answer-'+answer.id">
                                <div class="qa__avatar avatar avatar--alt" :style="{backgroundColor: companyAvatar.color}">{{ companyAvatar.name }}</div>
                                <div class="qa__item-author"><a href="javascript:{}" @click="openCompanyContact()">{{ company.directorFio }}</a></div>
                                <p v-html="nl2br(answer.message)"></p>
                                <ul v-if="answer.documents">
                                    <li v-for="document in answer.documents">
                                        <a :href="document.url"><svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg> {{ document.name }}</a>
                                    </li>
                                </ul>
                                <div class="qa__item-meta">
                                    <time>{{ formatDate(answer.created_at) }}</time>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <div class="qa__item qa__item--empty">Сообщений нет</div>
                </template>
            </div>
        </div>
        <div class="qa__form no-print" v-if="$store.getters.userRole === 'contractor' || userCanReply">
            <ValidationObserver ref="form" tag="div" mode="eager">
                <form @submit.prevent="sendForm" slot-scope="{ valid }">
                    <div class="qa__item qa__item--reply" v-if="replyTo">
                        <div class="qa__item-question">
                            <div class="qa__avatar avatar">У{{ replyTo.index }}</div>
                            <p v-html="nl2br(replyTo.message)"></p>
                            <ul v-if="replyTo.documents">
                                <li v-for="document in replyTo.documents">
                                    <a :href="document.url"><svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg> {{ document.name }}</a>
                                </li>
                            </ul>
                            <div class="qa__item-meta">
                                <time>{{ formatDate(replyTo.created_at) }}</time>
                            </div>
                        </div>
                        <a href="javascript:{}" class="qa__item-cancel" @click="replyCancel"><svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg></a>
                    </div>
                    <div class="qa__form-field">
                        <label
                                :class="{'qa__form-upload': true, 'disabled': formForSend.documents.length >= documentsMax || formDisabled}"
                        >
                            <input
                                    type="file"
                                    multiple="multiple"
                                    @change="addFiles($event)"
                                    :disabled="formForSend.documents.length >= documentsMax || formDisabled"
                            />
                            <svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg>
                        </label>
                        <TextareaInput
                                v-model="formForSend.message"
                                :placeholder="userCanReply ? 'Введите ответ на вопрос' : 'Введите вопрос'"
                                :validationName="userCanReply ? 'ответ' : 'вопрос'"
                                rules="required"
                                counter="1000"
                                :autoheight="true"
                                :disabled="formDisabled"
                                ref="textarea"
                        />
                        <button class="btn" type="submit" :disabled="formDisabled">Оправить</button>
                    </div>
                </form>
            </ValidationObserver>
            <ul class="qa__form-files" v-if="formForSend.documents.length">
                <li v-for="(document, index) in formForSend.documents">
                    <span>{{ document.name }}</span>
                    <a href="javascript:{}" @click="removeFile(index)">&times;</a>
                </li>
            </ul>
            <div class="qa__form-count" v-if="$store.getters.userRole === 'contractor'">{{ countText }}</div>
        </div>
    </div>
</template>

<script>
import api from "@/helpers/api";
import functions from "@/helpers/functions";
import cloneDeep from 'lodash.clonedeep';
import formatDate from "@/helpers/formatDate";
import popupCompanyContact from "@/components/blocks/popupCompanyContact";
import TextareaInput from "@/components/forms/Textarea";

// v-if="$store.getters.userRole === 'buyer' || $store.getters.userRole === 'contractor'"
// v-if="$store.state.auth.loggedIn"

export default {
    name: 'TenderItemChatTab',
    mixins: [api, functions, formatDate],
    components: {
        popupCompanyContact,
        TextareaInput,
    },
    props: {
        tenderItemData: {
            type: Object,
            required: true,
        },
        company: {
            type: Object,
            required: true,
        },
    },
    computed: {
        count() {
            let inn = this.$store.getters.companyContractor[0].inn || '';
            if (!inn) return 0;
            return this.tenderItemData.q_counts.filter((item)=>{return item.inn === inn;})[0].count || 0;
        },
        countText() {
            return [
                this.count,
                this.declOfNum(this.count, ['вопрос','вопроса','вопросов']),
                'из',
                this.maxQuestions
            ].join(' ');
        },
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
        companyAvatar() {
            return this.company ? this.getAvatar(this.company.directorFio) : {name:'',color:''};
        },
        userCanReply() {
            return this.$store.getters.userRole === 'buyer' && this.companies.filter((item) => {return item.inn === this.company.inn}).length;
            // return this.$store.getters.userRole === 'buyer' && this.companies.filter((item) => {return item.inn === '3456778887'}).length;
        },
        userCanAsk() {
            return this.$store.getters.userRole === 'contractor' && this.count < this.maxQuestions;
        },
        formDisabled() {
            if (this.$store.getters.userRole === 'buyer') {
                return this.userCanReply && !this.replyTo;
            } else {
                return !this.userCanAsk;
            }
        },
    },
    data: function () {
        return {
            scrollToErrorInstance: null,
            formForSend: {
                message: '',
                documents: [],
            },
            documentsMax: 3,
            documentsMetatypes: ['application/pdf','image/jpeg','image/png','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            maxQuestions: 3,
            replyTo: null,
        }
    },
    created() {},
    methods: {
        openCompanyContact() {
            this.$refs['contact'].open();
        },
        addFiles(evt) {
            let self = this;
            Array.prototype.forEach.call(evt.target.files, function (file) {
                if (!self.documentsMetatypes.length || self.documentsMetatypes.indexOf(file.type) !== -1) {
                    self.formForSend.documents.push(file);
                }
            });
            this.formForSend.documents.splice(this.documentsMax);
            evt.target.value = '';
        },
        removeFile(index) {
            this.formForSend.documents.splice(index, 1);
        },
        reply(index) {
            this.replyTo = this.tenderItemData.qa[index];
            this.replyTo.index = index+1;
            let textarea = this.$refs['textarea'].$el.querySelector('textarea');
            this.scrollTo(textarea);
            //this.$nextTick(() => textarea.focus()); // если раскоментировать то нет плавной прокрутки...
        },
        replyCancel() {
            this.replyTo = null;
        },
        sendForm(evt) {
            evt.preventDefault();
            this.$refs.form.validate().then((res) => {
                if (res) {
                    window.openLoader();
                    let fData = cloneDeep(this.formForSend);
                    if( this.$store.getters.userRole === 'contractor' ) {
                        // если поставщик - добавляем компанию
                        let userCompanies = this.$store.getters.companyContractor; // todo выбор компании?
                        if (userCompanies.length) {
                            fData.inn = userCompanies[0].inn;
                        }
                        const formDataObj = this.objectToFormData(fData);
                        this.sendMarketplaceQuestion(this.tenderItemData.id, formDataObj)
                            .then((response) => {
                                window.closeLoader();
                                window.notificationSuccess('Ваш вопрос отправлен');
                                if (!this.tenderItemData.qa) {
                                    this.tenderItemData.qa = [];
                                }
                                this.tenderItemData.qa.push(response.data.data);
                                // увеличиваем счётчик вопросов на единицу (чтобы не дёргать базу)
                                let tmpCount = this.tenderItemData.q_counts.filter((item)=>{return item.inn === fData.inn;});
                                if (tmpCount.length) {
                                    tmpCount.count++;
                                } else {
                                    this.tenderItemData.q_counts.push({
                                        inn: fData.inn,
                                        count: 1
                                    });
                                }
                                this.clearForm();
                                this.$nextTick(() => this.scrollTo(this.$refs['question-'+response.data.data.id].$el));
                            })
                            .catch((response) => {
                                console.log(response.message);
                                window.closeLoader();
                                window.notificationError('Ошибка сервера');
                            });
                    } else if( this.$store.getters.userRole === 'buyer' ) {
                        // если заказчик:
                        const formDataObj = this.objectToFormData(fData);
                        this.sendMarketplaceAnswer(this.tenderItemData.id, this.replyTo.id, formDataObj)
                            .then((response) => {
                                window.closeLoader();
                                window.notificationSuccess('Ваш ответ отправлен');
                                if (!this.replyTo.answers) {
                                    this.replyTo.answers = [];
                                }
                                this.replyTo.answers.push(response.data.data);
                                this.clearForm();
                                this.$nextTick(() => this.scrollTo(this.$refs['answer-'+response.data.data.id].$el));
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
        clearForm() {
            this.replyCancel();
            this.formForSend.message = '';
            this.formForSend.documents = [];
            this.$nextTick(() => this.$refs.form.reset());
        },
    },
}
</script>

<style lang="scss" scoped>
    @import "../../../../assets/sass/variables/variables";
    @import "../../../../assets/sass/variables/fluid-variables";
    @import "../../../../assets/sass/mixins/fluid-mixin";
    @import "../../../../assets/sass/mixins/mq";

    .qa {
        border-radius: 6px;
        background: $colorWhite;

        &__person,
        &__content,
        &__form {
            padding: rem(40px) rem(64px);

            @include mq($until: widescreen) {
                padding: rem(40px)
            }

            @include mq($until: tablet) {
                padding: rem(32px) rem(20px);
            }

            @media print {
                padding: 0;
            }
        }

        &__person {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #d3d3d3;
            font-weight: 500;

            a {
                color: $colorTurquoise;

                &:hover {
                    color: $colorTurquoiseHover;
                }
            }

            &-wrap {
                flex-grow: 1;
                align-self: center;
            }
        }

        &__avatar {
            flex-shrink: 0;
            margin-right: rem(16px);

            .qa__item-question & {
                &::before {
                    content: 'У' counter(question);
                }
            }
        }

        &__items {
            counter-reset: question;
        }

        &__item {
            counter-increment: question;

            & + & {
                margin-top: rem(40px);
            }

            &--reply {
                display: flex;
                justify-content: space-between;
                margin: 0 0 rem(24px);
                width: calc(100% - 200px);

                .qa__avatar::before {
                    display: none;
                }
            }

            &-cancel {
                flex-shrink: 0;
                display: block;
                align-self: center;
                margin-left: rem(24px);
                width: rem(24px);
                height: rem(24px);

                &:hover {
                    svg {
                        fill: $colorTurquoiseHover
                    }
                }

                svg {
                    fill: $colorTurquoise;
                    width: 100%;
                    height: 100%;
                    transition: fill $animation;
                }
            }

            &-question,
            &-answer {
                padding-left: rem(76px);
                min-height: rem(60px);
                position: relative;

                .qa__avatar {
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                p {
                    margin: 0;
                }

                ul {
                    list-style: none;
                    margin: rem(6px) 0 0;
                    padding: 0;

                    li {
                        + li {
                            margin: rem(2px) 0 0;
                        }
                    }

                    svg {
                        display: inline-block;
                        vertical-align: middle;
                        width: rem(14px);
                        height: rem(14px);
                    }

                    a {
                        color: $colorTurquoise;

                        &:hover {
                            color: $colorTurquoiseHover;
                        }
                    }
                }
            }

            &-avatar {
                position: absolute;
                top: 0;
                left: 0;

                .qa__item-question & {
                    &::before {
                        content: 'У' counter(question);
                    }
                }
            }

            &-author {
                margin: 0 0 rem(6px);
                font-weight: 500;
                a {
                    color: $colorTurquoise;
                    &:hover {
                        color: $colorTurquoiseHover;
                    }
                }
            }

            &-question {
                flex-grow: 1;
            }

            &-answer {
                margin: rem(24px) 0 0 rem(86px);

                &::before {
                    content: '';
                    display: block;
                    border-left: 3px solid $colorTurquoise;
                    width: 0;
                    position: absolute;
                    //top: rem(-4px);
                    top: 0;
                    left: rem(-10px);
                    //bottom: rem(-4px);
                    bottom: 0;
                    @media print {
                        border-color: $colorGray;
                    }
                }
            }

            &-meta {
                margin: rem(6px) 0 0;

                time {
                    margin: 0 rem(16px) 0 0;
                    color: $colorGray;
                }

                a {
                    font-weight: 500;
                    color: $colorTurquoise;

                    &:hover {
                        color: $colorTurquoiseHover;
                    }
                }
            }
        }

        &__form {
            border-top: 1px solid #d3d3d3;

            &-field {
                position: relative;

                ::v-deep textarea.field {
                    padding: rem(15px) rem(70px) rem(15px) rem(64px);
                    line-height: 20px;
                    min-height: rem(52px);
                    height: rem(52px);
                }

                ::v-deep .field__counter {
                    bottom: rem(16px);
                }

                ::v-deep .btn {
                    width: 100%;
                }

                @include mq($from: tablet) {
                    display: flex;
                    justify-content: space-between;

                    ::v-deep .field__container {
                        margin-bottom: 0 !important;
                        width: calc(100% - 200px);
                    }

                    ::v-deep textarea.field {
                        border-radius: rem(6px) 0 0 rem(6px);
                    }

                    ::v-deep .btn {
                        align-self: flex-start;
                        border-radius: 0 rem(6px) rem(6px) 0;
                        width: 200px;
                    }
                }
            }

            &-upload {
                display: flex;
                justify-content: center;
                align-items: center;
                width: rem(54px);
                height: rem(52px);
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                overflow: hidden;
                cursor: pointer;

                &.disabled {
                    pointer-events: none;

                    svg {
                        fill: $colorGray3;
                    }
                }

                &:hover {
                    svg {
                        fill: $colorTurquoiseHover;
                    }
                }

                input {
                    position: absolute;
                    top: 0;
                    left: -9999px;
                }

                svg {
                    display: block;
                    width: rem(24px);
                    height: rem(24px);
                    fill: $colorTextLight;
                    transition: fill $animation;
                }
            }

            &-files {
                list-style: none;
                margin: rem(12px) 0 0;
                padding: 0;
                width: calc(100% - 200px);
                white-space: nowrap;
                font-weight: 500;
                color: $colorTurquoise;

                li {
                    + li {
                        margin-top: rem(6px);
                    }
                }

                span {
                    display: inline-block;
                    vertical-align: top;
                    max-width: calc(100% - 2em);
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                a {
                    display: inline-block;
                    vertical-align: top;
                    margin-left: rem(8px);
                    width: rem(20px);
                    font-size: rem(20px);
                    line-height: rem(20px);
                    color: $colorTurquoise;

                    &:hover {
                        color: $colorTurquoiseHover;
                    }
                }
            }

            &-count {
                margin: rem(12px) 0 0;
                font-weight: 500;
            }
        }
    }
</style>