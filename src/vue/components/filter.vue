<template>
    <div class="filter">
        <spoiler
            v-for="item in filter"
        >
            <template v-slot:header>
                <b>{{ item.value }}</b>
            </template>
            <template v-slot:body>
<!--                <input-->
<!--                    v-for="value in item.values"-->
<!--                    :name="value"-->
<!--                    type="checkbox"-->
<!--                />-->
                <div>
                    <div
                            v-for="value in item.values"
                            class="filter__checkbox"
                    >
                        <label class="checkbox">
                            <input type="checkbox" :name="value">
                            <span class="checkbox__body"></span>
                            <span class="checkbox__text">
                            {{ value }}
                        </span>
                        </label>
                    </div>
                </div>
            </template>
        </spoiler>
    </div>
</template>

<script>
    import spoiler from "./blocks/spoiler.vue";

    export default {
        name: 'FilterBlock',
        components: {
            spoiler
        },
        props: {
            filter: {
                default: () => [],
                type: Array
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/sass/variables/fluid-variables";
    @import "../../assets/sass/mixins/fluid-mixin";

    .filter {
        width: calc(100% - #{rem(68px)});
        &__checkbox {
            margin: rem(18px) 0;
        }
    }
</style>
