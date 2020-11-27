<template>
    <div class="products-filters">
        <ValidationObserver ref="form" tag="div" mode="eager">
            <form class="products-filters__form">
                <div class="products-filters__filters">
                    <div class="products-filters__filter products-filters__filter-search">
                        <span class="products-filters__label">Маркоразмер</span>
                        <div class="search">
                            <div class="search__icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4733 13.5267L11.9999 11.0733C12.96 9.87627 13.4249 8.35686 13.2991 6.82753C13.1733 5.2982 12.4664 3.87519 11.3236 2.85109C10.1808 1.827 8.68914 1.27967 7.15522 1.32164C5.62129 1.36362 4.16175 1.99171 3.0767 3.07676C1.99164 4.16181 1.36356 5.62136 1.32158 7.15528C1.27961 8.6892 1.82694 10.1809 2.85103 11.3237C3.87512 12.4664 5.29814 13.1734 6.82747 13.2992C8.3568 13.425 9.87621 12.9601 11.0733 12L13.5266 14.4533C13.5886 14.5158 13.6623 14.5654 13.7436 14.5993C13.8248 14.6331 13.9119 14.6505 13.9999 14.6505C14.0879 14.6505 14.1751 14.6331 14.2563 14.5993C14.3376 14.5654 14.4113 14.5158 14.4733 14.4533C14.5934 14.329 14.6606 14.1629 14.6606 13.99C14.6606 13.8171 14.5934 13.651 14.4733 13.5267ZM7.33327 12C6.41029 12 5.50804 11.7263 4.74061 11.2135C3.97318 10.7007 3.37504 9.97191 3.02183 9.11919C2.66862 8.26647 2.57621 7.32815 2.75627 6.42291C2.93634 5.51766 3.38079 4.68614 4.03344 4.0335C4.68608 3.38085 5.5176 2.9364 6.42285 2.75633C7.32809 2.57627 8.2664 2.66868 9.11913 3.02189C9.97185 3.3751 10.7007 3.97324 11.2135 4.74067C11.7262 5.5081 11.9999 6.41035 11.9999 7.33333C11.9999 8.57101 11.5083 9.75799 10.6331 10.6332C9.75793 11.5083 8.57095 12 7.33327 12Z" fill="#4E4F57"/>
                                </svg>
                            </div>
                            <div class="search__input">
                                <multiselect
                                    v-model="filtersData.cable"
                                    :options="options"
                                    placeholder=""
                                    selectedLabel=""
                                    selectLabel=""
                                    deselectLabel=""
                                    track-by="url"
                                    label="title"
                                    open-direction="bottom"
                                    :loading="isLoading"
                                    :internal-search="false"
                                    :preserveSearch="true"
                                    @select="selectValue"
                                    @search-change="getListSearchCatalog"
                                >
                                    <template v-slot:caret>
                                        <span></span>
                                    </template>
                                    <template v-slot:noOptions>
                                        <span>Начните поиск</span>
                                    </template>
                                    <template v-slot:noResult>
                                        <span>По вашему запросу ничего не найдено</span>
                                    </template>
                                </multiselect>
                            </div>
                            <!-- <div class="search__button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                                    <path d="M1 1L9 9L17 1" stroke="#373735" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div> -->
                        </div>
                    </div>
                    <div class="products-filters__filter">
                        <span class="products-filters__label">Остаток, м</span>
                        <div class="products-filters__filters-flex">
                            <ValidationProvider name="Остаток" v-slot="{ errors, failed }" :rules="{ numeric: true, max: 10 }" tag="label" class="field__container">
                                <input :class="{field: true, error: failed}" type="tel" name="fio" v-model="filtersData.metresFrom" placeholder="от">
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <ValidationProvider name="Остаток" v-slot="{ errors, failed }" :rules="{ numeric: true, max: 10 }" tag="label" class="field__container">
                                <input :class="{field: true, error: failed}" type="tel" name="fio" v-model="filtersData.metresTo" placeholder="до">
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>
                    <div class="products-filters__filter">
                        <span class="products-filters__label">Цена, &#8381;</span>
                        <div class="products-filters__filters-flex">
                            <ValidationProvider name="Цена" v-slot="{ errors, failed }" :rules="{ numeric: true, max: 10 }" tag="label" class="field__container">
                                <input :class="{field: true, error: failed}" type="tel" name="fio" v-model="filtersData.priceFrom" placeholder="от">
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <ValidationProvider name="Цена" v-slot="{ errors, failed }" :rules="{ numeric: true, max: 10 }" tag="label" class="field__container">
                                <input :class="{field: true, error: failed}" type="tel" name="fio" v-model="filtersData.priceTo" placeholder="до">
                                <span v-show="failed" class="field__error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>
                </div>
                <div class="products-filters__buttons">
                    <a href="#" class="products-filters__apply" @click="changeFilter">Применить</a>
                    <a href="#" class="products-filters__reset" @click="resetFilter">Сбросить</a>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import api from '../../helpers/api'

export default {
    name: 'ProductsFilters',
    mixins: [api],
    data() {
        return {
            value: '',
            options: [],
            isLoading: false,
            searchCounter: null,
            filtersData: {
                cable: null,
                metresFrom: null,
                metresTo: null,
                priceFrom: null,
                priceTo: null,
            }
        }
    },
    methods: {
        selectValue(value) {
            // window.location.href = value.url
        },
        getListSearchCatalog(string) {
            console.log(string)
            clearInterval(this.searchCounter)
            if (string) {
                this.searchCounter = setTimeout(() => {
                    this.isLoading = true
                    this.cleanSearch()
                    this.fetchListSearchCatalog(string)
                        .then((data) => {
                            // this.startValueSearch()
                            // this.groupingSearchList(data.data.data)
                            this.options = data.data.data
                            this.isLoading = false
                        })
                        .catch((e) => {
                            console.log(e)
                            this.isLoading = false
                        })
                }, 1000)
            } else {
                this.cleanSearch()
                this.isLoading = false
            }
        },
        startValueSearch() {
            this.options = [
                {
                    groupTitle: 'Марка',
                    items: []
                },
                {
                    groupTitle: 'Размер',
                    items: []
                }
            ]
        },
        cleanSearch() {
            this.options = []
        },
        groupingSearchList(arr) {
            arr.forEach((item) => {
                if (item.is_mark) {
                    this.options[0].items.push(item)
                }
                if (item.is_mark_size) {
                    this.options[1].items.push(item)
                }
            })
        },
        changeFilter(evt) {
            evt.preventDefault()
            this.$emit('changeFilter', this.filtersData)
        },
        resetFilter(evt) {
            evt.preventDefault()
            this.filtersData = {
                cable: null,
                metresFrom: null,
                metresTo: null,
                priceFrom: null,
                priceTo: null,
            }
            this.$emit('resetFilter')
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";
    
    .products-filters {
        padding-bottom: rem(36px);
        border-bottom: 1px solid $borderColor;
        margin-bottom: rem(32px);
        &__filters {
            display: flex;
            &-flex {
                display: flex;
                .field__container:first-child {
                    margin-right: rem(12px);
                }
            }
        }
        &__filter {
            margin-right: rem(48px);
            &:last-child {
                margin-right: 0;
            }
            &-search {
                width: 48%;
            }
            .field {
                height: rem(48px);
            }
        }
        &__label {
            display: inline-block;
            padding-bottom: rem(4px);
            font-weight: 500;
            font-size: rem(14px);
            color: $lightcolorText;
        }
        &__buttons {
            font-weight: 500;
            font-size: rem(14px);
        }
        &__apply {
            color: $colorTurquoise;
            margin-right: rem(24px);
            cursor: pointer;
            &:hover,
            &:focus {
                color: $colorTurquoiseHover;
            }
        }
        &__reset {
            color: $colorGray;
            cursor: pointer;
            &:hover,
            &:focus {
                color: $colorText;
            }
        }
    }
    .search {
        box-shadow: none;
    }
    .multiselect {
        border: 1px solid $borderColor;
        border-radius: 4px;
    }
    ::v-deep .search__input .multiselect__tags {
        padding: rem(12px) rem(21px) rem(12px) rem(48px);
        height: auto;
    }
    ::v-deep .search__input .multiselect__single {
        margin-bottom: 0;
    }

    @include mq($until: tablet) {
        .products-filters {
            &__filters {
                flex-wrap: wrap;
                &-flex {
                    .field__container {
                        width: 50%;
                        margin-bottom: 0;
                    }
                }
            }
            &__filter {
                margin-right: 0;
                margin-bottom: rem(24px);
                width: 100%;
            }
        }
    }
</style>