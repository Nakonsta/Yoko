<template>
    <div class="qa">
        <div class="qa__person">
            <div class="qa__avatar"></div>
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
                    <div class="qa__item" v-for="(question, index) in tenderItemData.qa" :key="question.id">
                        <div class="qa__item-question">
                            <div class="qa__avatar"></div>
                            <p>{{ question.message }}</p>
                            <ul v-if="question.documents">
                                <li v-for="document in question.documents">
                                    <a :href="document.url"><svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg> {{ document.name }}</a>
                                </li>
                            </ul>
                            <div class="qa__item-meta">
                                <time>{{ formatDate(question.date) }}</time>
                                <a href="javascript:{}" @click="reply(index)" v-if="userCanReply">Ответить</a>
                            </div>
                        </div>
                        <template v-if="question.answers && question.answers.length">
                            <div class="qa__item-answer" v-for="answer in question.answers" :key="answer.id">
                                <div class="qa__avatar"></div>
                                <div class="qa__item-author"><a href="javascript:{}" @click="openCompanyContact()">{{ company.directorFio }}</a></div>
                                <p>{{ answer.message }}</p>
                                <ul v-if="answer.documents">
                                    <li v-for="document in answer.documents">
                                        <a :href="document.url"><svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg> {{ document.name }}</a>
                                    </li>
                                </ul>
                                <div class="qa__item-meta">
                                    <time>{{ formatDate(answer.date) }}</time>
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
        <div class="qa__form" v-if="$store.getters.userRole === 'contractor' || userCanReply">
            <ValidationObserver ref="form" tag="div" mode="eager">
                <form @submit.prevent="sendForm" slot-scope="{ valid }">
                    <div class="qa__item qa__item--reply" v-if="replyTo">
                        <div class="qa__item-question">
                            <div class="qa__avatar">У{{ replyTo.index }}</div>
                            <p>{{ replyTo.message }}</p>
                            <ul v-if="replyTo.documents">
                                <li v-for="document in replyTo.documents">
                                    <a :href="document.url"><svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg> {{ document.name }}</a>
                                </li>
                            </ul>
                            <div class="qa__item-meta">
                                <time>{{ formatDate(replyTo.date) }}</time>
                            </div>
                        </div>
                        <a href="javascript:{}" class="qa__item-cancel" @click="replyCancel"><svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg></a>
                    </div>
                    <div class="qa__form-field">
                        <label
                                :class="{'qa__form-upload': true, 'disabled': formForSend.documents.length >= documentsMax || (userCanReply && !replyTo)}"
                        >
                            <input
                                    type="file"
                                    multiple="multiple"
                                    @change="addFiles($event)"
                                    :disabled="formForSend.documents.length >= documentsMax || (userCanReply && !replyTo)"
                            />
                            <svg class="sprite-browse"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#browse"></use></svg>
                        </label>
                        <TextareaInput
                                v-model="formForSend.message"
                                placeholder="Введите вопрос"
                                validationName="вопрос"
                                rules="required"
                                counter="1000"
                                :autoheight="true"
                                :disabled="userCanReply && !replyTo"
                                ref="textarea"
                        />
                        <button class="btn" type="submit" :disabled="userCanReply && !replyTo">Оправить</button>
                    </div>
                </form>
            </ValidationObserver>
            <ul class="qa__form-files" v-if="formForSend.documents.length">
                <li v-for="(document, index) in formForSend.documents">
                    <span>{{ document.name }}</span>
                    <a href="javascript:{}" @click="removeFile(index)">&times;</a>
                </li>
            </ul>
            <div class="qa__form-count" v-if="!userCanReply">{{ count }}</div>
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
            const count = this.tenderItemData.qa.length; // todo должно быть не общее количество, а количество вопросов от компании пользователя!
            return [
                count,
                this.declOfNum(count, ['вопрос','вопроса','вопросов']),
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
        userCanReply() {
            // return this.$store.getters.userRole === 'buyer' && this.companies.filter((item) => {return item.inn === this.company.inn}).length;
            return this.$store.getters.userRole === 'buyer' && this.companies.filter((item) => {return item.inn === '3456778887'}).length;
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
    created() {
        this.tenderItemData.qa = [
            {
                "id": 9,
                "procedure_id": 18,
                "message": "Zagadka ot Zhaka Fresko: Scolko?",
                "documents": [
                    {
                        url: '#',
                        name: "string",
                    }
                ],
                "answers": [
                    {
                        "id": 9,
                        "procedure_id": 18,
                        "parent_id": 30,
                        "user_id": 18,
                        "inn": 1646733660,
                        "message": "Zagadka ot Zhaka Fresko: Scolko?",
                        "documents": [
                            {
                                url: '#',
                                name: "string",
                            },
                            {
                                url: '#',
                                name: "string",
                            }
                        ]
                    }
                ]
            }
        ];
    },

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
            this.replyTo = cloneDeep(this.tenderItemData.qa[index]);
            this.replyTo.index = index+1;
            let textarea = this.$refs['textarea'].$el.querySelector('textarea');
            textarea.focus();
            this.scrollTo(textarea);
        },
        replyCancel() {
            this.replyTo = null;
        },
        sendForm(evt) {
            evt.preventDefault();
            console.log('!1');
            this.$refs.form.validate().then((res) => {
                console.log('!2');
                if (res) {
                    console.log('!3');
                    window.openLoader();
                    let fData = cloneDeep(this.formForSend);
                    if( this.$store.getters.userRole === 'contractor' ) {
                        console.log('!4');
                        // если поставщик - добавляем компанию
                        let userCompanies = this.$store.getters.companyContractor; // todo выбор компании?
                        if (userCompanies.length) {
                            fData.inn = userCompanies[0].inn;
                        }
                        const formDataObj = this.objectToFormData(fData);
                        this.sendMarketplaceQuestion(this.tenderItemData.id, formDataObj)
                            .then(() => {
                                window.closeLoader();
                                window.notificationSuccess('Ваш вопрос отправлен');
                            })
                            .catch((response) => {
                                console.log(response.message);
                                window.closeLoader();
                                window.notificationError('Ошибка сервера');
                            });
                    } else if( this.$store.getters.userRole === 'buyer' ) {
                        // если заказчик:
                        const formDataObj = this.objectToFormData(fData);
                        this.sendMarketplaceAnswer(this.tenderItemData.id, 0, formDataObj)
                            .then(() => {
                                window.closeLoader();
                                window.notificationSuccess('Ваш ответ отправлен');
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
            display: block;
            border-radius: 50%;
            margin-right: rem(16px);
            width: rem(60px);
            height: rem(60px);
            text-transform: uppercase;
            font-weight: normal;
            font-size: rem(30px);
            line-height: (60/30);
            text-align: center;
            color: $colorGray3;
            background: $colorLight;

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
                display: block;
                border-radius: 50%;
                width: rem(60px);
                height: rem(60px);
                text-transform: uppercase;
                font-weight: normal;
                font-size: rem(30px);
                line-height: (60/30);
                text-align: center;
                color: $colorGray3;
                background: $colorLight;
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
                margin: rem(16px) 0 0 rem(86px);

                &::before {
                    content: '';
                    display: block;
                    border-left: 3px solid $colorTurquoise;
                    width: 0;
                    position: absolute;
                    top: rem(-4px);
                    left: rem(-10px);
                    bottom: rem(-4px);
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
                display: flex;
                justify-content: space-between;
                position: relative;

                ::v-deep .field__container {
                    margin-bottom: 0 !important;
                    width: calc(100% - 200px);
                }

                ::v-deep textarea.field {
                    border-radius: rem(6px) 0 0 rem(6px);
                    padding: rem(15px) rem(70px) rem(15px) rem(64px);
                    line-height: 20px;
                    min-height: rem(52px);
                    height: rem(52px);
                }

                ::v-deep .field__counter {
                    bottom: rem(16px);
                }

                ::v-deep .btn {
                    align-self: flex-start;
                    border-radius: 0 rem(6px) rem(6px) 0;
                    width: 200px;
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

                    ::v-deep svg {
                        fill: $colorGray3;
                    }
                }

                &:hover {
                    ::v-deep svg {
                        fill: $colorTurquoiseHover;
                    }
                }

                ::v-deep input {
                    position: absolute;
                    top: 0;
                    left: -9999px;
                }

                ::v-deep svg {
                    display: block;
                    width: rem(24px);
                    height: rem(24px);
                    fill: $lightcolorText;
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

                ::v-deep li {
                    + li {
                        margin-top: rem(6px);
                    }
                }

                ::v-deep span {
                    display: inline-block;
                    vertical-align: top;
                    max-width: calc(100% - 2em);
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                ::v-deep a {
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