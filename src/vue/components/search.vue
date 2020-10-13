<template>
    <div class="search">
        <div class="search__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4733 13.5267L11.9999 11.0733C12.96 9.87627 13.4249 8.35686 13.2991 6.82753C13.1733 5.2982 12.4664 3.87519 11.3236 2.85109C10.1808 1.827 8.68914 1.27967 7.15522 1.32164C5.62129 1.36362 4.16175 1.99171 3.0767 3.07676C1.99164 4.16181 1.36356 5.62136 1.32158 7.15528C1.27961 8.6892 1.82694 10.1809 2.85103 11.3237C3.87512 12.4664 5.29814 13.1734 6.82747 13.2992C8.3568 13.425 9.87621 12.9601 11.0733 12L13.5266 14.4533C13.5886 14.5158 13.6623 14.5654 13.7436 14.5993C13.8248 14.6331 13.9119 14.6505 13.9999 14.6505C14.0879 14.6505 14.1751 14.6331 14.2563 14.5993C14.3376 14.5654 14.4113 14.5158 14.4733 14.4533C14.5934 14.329 14.6606 14.1629 14.6606 13.99C14.6606 13.8171 14.5934 13.651 14.4733 13.5267ZM7.33327 12C6.41029 12 5.50804 11.7263 4.74061 11.2135C3.97318 10.7007 3.37504 9.97191 3.02183 9.11919C2.66862 8.26647 2.57621 7.32815 2.75627 6.42291C2.93634 5.51766 3.38079 4.68614 4.03344 4.0335C4.68608 3.38085 5.5176 2.9364 6.42285 2.75633C7.32809 2.57627 8.2664 2.66868 9.11913 3.02189C9.97185 3.3751 10.7007 3.97324 11.2135 4.74067C11.7262 5.5081 11.9999 6.41035 11.9999 7.33333C11.9999 8.57101 11.5083 9.75799 10.6331 10.6332C9.75793 11.5083 8.57095 12 7.33327 12Z" fill="#31ACB8"/>
            </svg>
        </div>
        <div class="search__input">
            <multiselect
                v-model="value"
                :options="options"
                placeholder="Найти кабель"
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
        <div class="search__button">
            <span>Найти</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.7104 20.2899L18.0004 16.6099C19.4405 14.8143 20.1379 12.5352 19.9492 10.2412C19.7605 7.94721 18.7001 5.81269 16.9859 4.27655C15.2718 2.74041 13.0342 1.91941 10.7333 1.98237C8.43243 2.04534 6.24311 2.98747 4.61553 4.61505C2.98795 6.24263 2.04582 8.43194 1.98286 10.7328C1.9199 13.0337 2.7409 15.2713 4.27704 16.9854C5.81318 18.6996 7.94769 19.76 10.2417 19.9487C12.5357 20.1374 14.8148 19.44 16.6104 17.9999L20.2904 21.6799C20.3834 21.7736 20.494 21.848 20.6158 21.8988C20.7377 21.9496 20.8684 21.9757 21.0004 21.9757C21.1324 21.9757 21.2631 21.9496 21.385 21.8988C21.5068 21.848 21.6174 21.7736 21.7104 21.6799C21.8906 21.4934 21.9914 21.2442 21.9914 20.9849C21.9914 20.7256 21.8906 20.4764 21.7104 20.2899ZM11.0004 17.9999C9.61592 17.9999 8.26255 17.5894 7.1114 16.8202C5.96026 16.051 5.06305 14.9578 4.53324 13.6787C4.00342 12.3996 3.8648 10.9921 4.1349 9.63427C4.40499 8.27641 5.07168 7.02913 6.05065 6.05016C7.02961 5.07119 8.27689 4.4045 9.63476 4.13441C10.9926 3.86431 12.4001 4.00293 13.6792 4.53275C14.9583 5.06256 16.0515 5.95977 16.8207 7.11091C17.5899 8.26206 18.0004 9.61544 18.0004 10.9999C18.0004 12.8564 17.2629 14.6369 15.9501 15.9497C14.6374 17.2624 12.8569 17.9999 11.0004 17.9999Z" fill="white"/>
            </svg>
        </div>
    </div>
</template>

<script>
    import api from '../helpers/api'
    export default {
        name: 'Search',
        mixins: [api],
        data() {
            return {
                value: '',
                options: [],
                isLoading: false,
                searchCounter: null
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
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/sass/variables/variables";
    @import "../../assets/sass/variables/fluid-variables";
    @import "../../assets/sass/mixins/fluid-mixin";

    .search {
        position: relative;
        display: flex;
        box-shadow: 5px 10px 15px rgba(55, 55, 53, 0.1);
        border-radius: 0 rem(6px) rem(6px) 0;
        &__input {
            width: 100%;
            .multiselect__option--highlight {
                background: #f7fbfb;
                color: $colorText;
            }
            .multiselect__single {
                margin-top: rem(2px);
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
            }
            .multiselect__tags {
                height: rem(52px);
                padding: rem(13px) rem(40px) 0 rem(52px);
                font-weight: 500;
                font-size: rem(14px);
                line-height: 160%;
                border-radius: rem(6px) 0 0 rem(6px);
                border: none;
                input {
                    margin-top: rem(2px);
                    font-weight: 500;
                    font-size: rem(14px);
                    line-height: 160%;
                    padding-left: 0;
                    &::placeholder {
                        color: #adadad;
                    }
                }
            }
        }
        &__button {
            position: absolute;
            z-index: 51;
            right: 0;
            transition: .3s background-color;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $colorTurquoise;
            color: #fff;
            font-weight: 500;
            font-size: rem(16px);
            border-radius: 0 rem(6px) rem(6px) 0;
            line-height: 160%;
            width: rem(200px);
            height: rem(52px);
            cursor: pointer;
            font-family: "Gilroy-SemiBold", sans-serif;
            @media(max-width: 600px) {
                width: rem(52px) !important;
            }
            svg {
                display: none;
                @media(max-width: 600px) {
                    display: block;
                }
            }
            span {
                @media(max-width: 600px) {
                    display: none;
                }
            }
            &:hover {
                background-color: $colorTurquoiseHover
            }
            @media(max-width: 1440px) {
                width: rem(136px);
            }
        }
        &__icon {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            z-index: 51;
            margin-left: rem(20px);
            svg {
                display: block;
            }
        }
    }
</style>
