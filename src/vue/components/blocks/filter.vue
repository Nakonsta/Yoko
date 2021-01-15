<template>
    <div
        ref="filter"
        class="filter"
        :class="{
           'filter--mobile': mobileFilter
        }"
    >
        <template v-if="!loading">
            <transition-group name="fade-left">
                <spoiler
                    v-for="(item, index) in showFullFilter || full ? filter : filter.slice(0, 5)"
                    :key="item.id"
                >
                    <template v-slot:header>
                        <b>{{ item.value }}</b>
                    </template>
                    <template v-slot:body>
                        <div class="body-container body-container--scroll" v-if="item.type === 'checkbox'">
                            <div
                                v-for="value in item.values"
                                class="filter__checkbox"
                            >
                                <label class="checkbox">
                                    <input type="checkbox" @change="(e) => changeFilter(item.id, value.id, e.target.checked)" :checked="currentFilter[item.id] && currentFilter[item.id].indexOf(value.id) !== -1">
                                    <span class="checkbox__body"></span>
                                    <span class="checkbox__text">
                                        {{ value.name }}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div class="body-container" v-if="item.type === 'period'">
                            <div class="filter__period">
                                <div class="filter__period-from">
                                    <datepicker
                                        placeholder="c"
                                        :monday-first=true
                                        :format="picker.format"
                                        :language="picker.locale"
                                        input-class="field"
                                        v-model="picker.start_date"
                                        :disabled-dates="{ to: picker.disabledTo }"
                                        @input="changePeriod(item.id)"
                                        @cleared="changePeriod(item.id)"
                                        :clear-button="true"
                                    >
                                        <svg class="sprite-calendar" slot="afterDateInput"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#calendar"></use></svg>
                                    </datepicker>
                                </div>
                                <div class="filter__period-to">
                                    <datepicker
                                        placeholder="по"
                                        :monday-first=true
                                        :format="picker.format"
                                        :language="picker.locale"
                                        input-class="field"
                                        v-model="picker.end_date"
                                        :disabled-dates="{ from: picker.disabledFrom }"
                                        @input="changePeriod(item.id)"
                                        @cleared="changePeriod(item.id)"
                                        :clear-button="true"
                                    >
                                        <svg class="sprite-calendar" slot="afterDateInput"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#calendar"></use></svg>
                                    </datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="body-container" v-if="item.type === 'select'">
                            <multiselect
                                v-model="item.currentValues"
                                class="form-select"
                                track-by="id"
                                label="name"
                                :placeholder="item.placeholder"
                                selectedLabel=""
                                selectLabel=""
                                deselectLabel=""
                                tagPlaceholder=""
                                :options="item.values"
                                :allow-empty="true"
                                :multiple="true"
                                :taggable="true"
                                @input="multiselectChange($event, item.id)"
                                @addTag="multiselectAddTag"
                            >
                                <span slot="noOptions">Список пуст</span>
                                <span slot="noResult">Список пуст</span>
                            </multiselect>
                        </div>
                        <div class="body-container" v-if="item.type === 'search'">
                            <multiselect
                                v-model="item.currentValues"
                                class="form-select"
                                track-by="id"
                                label="name"
                                :placeholder="item.placeholder"
                                selectedLabel=""
                                selectLabel=""
                                deselectLabel=""
                                tagPlaceholder=""
                                :options="item.values"
                                :allow-empty="true"
                                :multiple="true"
                                :taggable="true"
                                :loading="item.loading"
                                @input="multiselectChange($event, item.id)"
                                @addTag="multiselectAddTag"
                                @search-change="callFilterSearch(item.search, index, $event)"
                            >
                                <span slot="noOptions">Список пуст</span>
                                <span slot="noResult">Список пуст</span>
                            </multiselect>
                        </div>
                    </template>
                </spoiler>
            </transition-group>
            <div
                class="filter__more"
                @click="showFullFilter = !showFullFilter"
                v-if="!full && filter.length > 5"
            >
                <b>{{showFullFilter ? 'Скрыть фильтры' : 'Все фильтры'}}</b>
            </div>
        </template>
        <template v-if="loading">
            <div class="filter__loader">
                <div class="preloader">
                    <div class="preloader__preloader">
                        <div class="preloader__loader"></div>
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
    import moment from 'moment';
    import spoiler from "./spoiler.vue";
    import {ru} from "vuejs-datepicker/src/locale";

    export default {
        name: 'filterList',
        components: {
            spoiler
        },
        props: {
            loading: {
                default: false,
                type: Boolean
            },
            filter: {
                default: () => [],
                type: Array
            },
            full: {
                default: false,
                type: Boolean,
            },
            filterContainer: {
                type: HTMLDivElement
            },
            currentFilter: {
                default: () => {},
                type: Object
            },
            mobileWidth: {
                default: 767,
                type: Number,
            },
        },
        data() {
            return {
                mobileFilter: false,
                showFullFilter: false,
                picker: {
                    start_date: '',
                    end_date: '',
                    format: "dd.MM.yyyy",
                    locale: ru,
                    disabledFrom: null,
                    disabledTo: null,
                },
                val: null,
                options: []
            }
        },
        mounted() {
            this.toggleMobileFilter()
            window.addEventListener('resize', this.toggleMobileFilter)
        },
        methods: {
            toggleMobileFilter() {
                let popupFilter = document.querySelector('#filter-modal .popup__content-container');
                if (window.innerWidth < this.mobileWidth) {
                    if (!this.mobileFilter) {
                        this.mobileFilter = true;
                        popupFilter.appendChild(this.$refs.filter);
                    }
                } else {
                    if (this.mobileFilter) {
                        this.mobileFilter = false;
                        this.filterContainer.appendChild(this.$refs.filter);
                    }
                }
            },
            multiselectChange(value, group) {
                this.currentFilter[group] = value.map((item)=>{return item.id});
                this.$emit('changeFilter');
            },
            multiselectAddTag(value) {
                return false;
            },
            changePeriod(group) {
                delete this.currentFilter[group];
                if( this.picker.start_date ) {
                    if (!this.currentFilter[group]) this.currentFilter[group] = {};
                    this.currentFilter[group].from = moment(this.picker.start_date).format('YYYY-MM-DD 00:00:00');
                }
                if( this.picker.end_date ) {
                    if (!this.currentFilter[group]) this.currentFilter[group] = {};
                    this.currentFilter[group].to = moment(this.picker.end_date).format('YYYY-MM-DD 23:59:59');
                }
                this.$emit('changeFilter');
            },
            changeFilter(group, value, isSelected) {
                if (isSelected) {
                    this.addValue(group, value)
                } else {
                    this.removeValue(group, value)
                }
                this.$emit('changeFilter');
            },
            addValue(group, value) {
                if (this.currentFilter[group]) {
                    this.currentFilter[group].push(value);
                } else {
                    this.addGroup(group, value);
                }
            },
            removeValue(group, value) {
                if (this.currentFilter[group]) {
                    let index = this.currentFilter[group].indexOf(value);
                    if (index > -1) {
                        this.currentFilter[group].splice(index, 1);
                        if (!this.currentFilter[group].length) {
                            this.removeGroup(group);
                        }
                    }
                }
            },
            addGroup(group, value) {
                this.currentFilter[group] = [value];
            },
            removeGroup(group) {
                delete this.currentFilter[group];
            },
            callFilterSearch(func, index, q) {
                this.$emit(func, index, q);
            },
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .filter {
        width: calc(100% - #{rem(68px)});
        @include mq($until: widescreen) {
            width: calc(100% - #{rem(38px)});
        }
        &--mobile {
            width: 100%
        }
        &__checkbox {
            margin: rem(18px) 0;
        }
        &__more {
            padding: rem(24px) 0;
            cursor: pointer;
            font-size: rem(14px);
            text-transform: uppercase;
            color: $colorTurquoise;
        }
        &__loader {
            position: relative;
            height: 400px;
        }
        &__period {
            &-to {
                margin-top: rem(16px);
            }
        }
        .vdp-datepicker {
            input.field {
                padding: rem(15px) rem(36px) rem(15px) rem(50px) !important;
                height: auto;
                background-color: transparent !important;
            }
            .vdp-datepicker__clear-button {
                margin-top: rem(-8px);
                width: rem(16px);
                height: rem(16px);
                font-style: normal;
                font-weight: normal;
                font-size: rem(20px);
                line-height: rem(16px);
                text-align: center;
                position: absolute;
                top: 50%;
                right: rem(10px);
                color: $colorTurquoise;
                &:hover {
                    color: $colorTurquoiseHover;
                }
                i,
                span {
                    font-style: normal;
                }
            }
            .sprite-calendar {
                margin-top: rem(-8px);
                width: rem(16px);
                height: rem(16px);
                position: absolute;
                top: 50%;
                left: rem(20px);
            }
        }
    }

    .body-container {
        &--scroll {
            max-height: rem(303px);
            overflow-x: hidden;
            overflow-y: auto;
            /* полоса прокрутки (скроллбар) */
            &::-webkit-scrollbar {
                width: 4px; /* ширина для вертикального скролла */
                height: 4px; /* высота для горизонтального скролла */
                background-color: rgba(155, 155, 154, 0.3);
            }

            /* ползунок скроллбара */
            &::-webkit-scrollbar-thumb {
                background-color: $colorTurquoise;
                border-radius: 9em;
            }

            &::-webkit-scrollbar-thumb:hover {
                background-color: $colorTurquoiseHover;
            }
        }
    }
</style>
