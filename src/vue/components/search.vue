<template>
    <div class="search">
        <div class="search__icon">

        </div>
        <div class="search__input">
            <multiselect
                v-model="value"
                :options="options"
                placeholder="Найти кабель"
                selectedLabel=""
                selectLabel=""
                deselectLabel=""
                @search-change="() => {}"
            >
                <template v-slot:caret>
                    <span></span>
                </template>
            </multiselect>
        </div>
        <div class="search__button">
            Найти
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                value: '',
                options: [
                    'sss',
                    'sss3'
                ]
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/sass/variables/variables";
    @import "../../assets/sass/variables/fluid-variables";
    @import "../../assets/sass/mixins/fluid-mixin";

    .search {
        display: flex;
        box-shadow: 5px 10px 15px rgba(55, 55, 53, 0.1);
        border-radius: 0 rem(6px) rem(6px) 0;
        &__input {
            width: calc(100% - #{rem(200px)});
            @media(max-width: 1440px) {
                width: calc(100% - #{rem(136px)});
            }
            .multiselect__option--highlight {
                background: #f7fbfb;
                color: $colorText;
            }
            .multiselect__tags {
                height: rem(52px);
                padding: rem(13px) rem(40px) 0 rem(8px);
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
                }
            }
        }
        &__button {
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
            @media(max-width: 1440px) {
                width: rem(136px);
            }
        }
    }
</style>
