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
                    v-for="item in showFullFilter ? filter : filter.slice(0, 5)"
                    :key="item.id"
                >
                    <template v-slot:header>
                        <b>{{ item.value }}</b>
                    </template>
                    <template v-slot:body>
                        <div>
                            <div
                                    v-for="value in item.values"
                                    class="filter__checkbox"
                            >
                                <label class="checkbox">
                                    <input type="checkbox" @change="(e) => changeFilter(item.id, value, e.target.checked)">
                                    <span class="checkbox__body"></span>
                                    <span class="checkbox__text">
                            {{ value }}
                        </span>
                                </label>
                            </div>
                        </div>
                    </template>
                </spoiler>
            </transition-group>
            <div
                class="filter__more"
                @click="showFullFilter = !showFullFilter"
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
    import spoiler from "./blocks/spoiler.vue";

    export default {
        name: 'FilterBlock',
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
            filterContainer: {
                type: HTMLDivElement
            },
            currentFilter: {
                default: () => {},
                type: Object
            },
        },
        data() {
            return {
                // currentFilter: {},
                mobileFilter: false,
                showFullFilter: false
            }
        },
        mounted() {
            this.toggleMobileFilter()
            window.addEventListener('resize', this.toggleMobileFilter)
        },
        methods: {
            toggleMobileFilter() {
                let popupFilter = document.querySelector('#filter-modal .popup__content-container')



                if (window.innerWidth < 768) {
                    if (!this.mobileFilter) {
                        this.mobileFilter = true
                        popupFilter.appendChild(this.$refs.filter)
                    }
                } else {
                    if (this.mobileFilter) {
                        this.mobileFilter = false
                        this.filterContainer.appendChild(this.$refs.filter)
                    }
                }
            },
            changeFilter(group, value, isSelected) {
                if (isSelected) {
                    this.addValue(group, value)
                } else {
                    this.removeValue(group, value)
                }
                this.$emit('changeFilter')
            },
            addValue(group, value) {
                if (this.currentFilter[group]) {
                    this.currentFilter[group].push(value)
                } else {
                    this.addGroup(group, value)
                }
            },
            removeValue(group, value) {
                if (this.currentFilter[group]) {
                    let index = this.currentFilter[group].indexOf(value);
                    if (index > -1) {
                        this.currentFilter[group].splice(index, 1);
                        if (!this.currentFilter[group].length) {
                            this.removeGroup(group)
                        }
                    }
                }
            },
            addGroup(group, value) {
                this.currentFilter[group] = [value]
            },
            removeGroup(group) {
                delete this.currentFilter[group]
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/sass/variables/variables";
    @import "../../assets/sass/variables/fluid-variables";
    @import "../../assets/sass/mixins/fluid-mixin";

    .filter {
        width: calc(100% - #{rem(68px)});
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
    }
</style>
