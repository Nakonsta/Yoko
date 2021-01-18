<template>
    <div class="application-sort">
        <span>{{ label }}</span>
        <div class="application-sort__dropdown">
            <div class="application-sort__dropdown-value" @click="show = !show">
                <span>
                    {{ sortList[sort] }}
                </span>
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#arrow-bottom"></use>
                </svg>
            </div>

            <ul :class="['application-sort__dropdown-list', { 'application-sort__dropdown-list--show': show }]">
                <li
                    v-for="(item, key) in sortList"
                    :key="key"
                    @click="sortItems(key)"
                    :class="{ active: key === sort }"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'application-sort',
    props: {
        label: {
            type: String,
            required: true
        },
        sortList: {
            type: Object,
            required: true
        },
        defaultValue: {
            type: String
        }
    },
    data() {
        return {
            sort: '',
            show: false,
            handleOutsideClick: null
        }
    },
    methods: {
        sortItems(key) {
            this.sort = key
            this.$emit('on-sort', this.sort)
            this.show = false
        }
    },
    created() {
        if (this.defaultValue) {
            this.sort = this.defaultValue
        } else {
            if (Object.entries(this.sortList).length) {
                for (const key in this.sortList) {
                    this.sort = key
                    break
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-sort {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    margin: 0;
    margin-right: rem(56px);

    font-family: Roboto;
    font-weight: 500;
    font-size: rem(14px);
    color: $colorGray;
    white-space: nowrap;

    @media screen and (max-width: 637px) {
        margin-bottom: rem(20px);
    }

    &:last-child {
        margin: 0;
    }

    &__dropdown {
        position: relative;
    }

    &__dropdown-list {
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 2;

        list-style: none;
        margin: 0;
        padding: rem(8px) rem(12px);
        opacity: 0;
        background-color: #fff;
        border-radius: 6px;

        &--show {
            opacity: 1;
        }

        li {
            padding: rem(6px) 0;
            transition: 0.3s;
            cursor: pointer;

            &:hover,
            &.active {
                color: $colorTurquoise;
            }
        }
    }

    &__dropdown-value {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        cursor: pointer;

        span {
            margin: 0 rem(10px);

            color: $colorTurquoise;
            white-space: nowrap;
        }

        svg {
            color: $colorGray;
            fill: $colorGray;
            width: 10px;
            height: 5px;
        }
    }
}
</style>
