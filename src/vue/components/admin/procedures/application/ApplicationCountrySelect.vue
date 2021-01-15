<template>
    <div :class="classes">
        <multiselect
            v-model="value"
            label="name"
            selectedLabel=""
            selectLabel=""
            deselectLabel=""
            placeholder="Выбрать страну"
            :options="countries"
            :allow-empty="false"
            :show-labels="false"
            :disabled="disabled"
            open-direction="bottom"
            :option-height="250"
            @select="handleSelect"
        >
            <template v-if="countries.length === 0" slot="noOptions">
                Странн нет
            </template>
        </multiselect>
    </div>
</template>
<script>
export default {
    name: 'application-country-select',

    props: {
        defaultValue: {
            type: [Object, String]
        },
        disabled: {
            type: Boolean
        },
        hasError: {
            type: Boolean
        },
        countries: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            value: {
                code: 'RU',
                flag:
                    'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAa0lEQVR42u3QwQkAMAgAMfdf2hYc4yIc6NPM7k659PMAAAAAAAAAAAAAAFy1AQAAAAAAAAAAAAAAAIC/zF2VAAAAAAAAAAAAAAAAAODqCQAAAAAAAAAAAAAAAAAAgGwAAAAAAAAAAAAAAER72yqN3ef7lPIAAAAASUVORK5CYII=',
                id: 131,
                name: 'Россия',
                name_en: 'Russia',
                phone_code: 7
            }
        }
    },
    computed: {
        classes() {
            return ['application-country-select', { 'application-country-select--error': this.hasError }]
        }
    },
    methods: {
        handleSelect(value) {
            this.$emit('on-select', value)
        }
    },
    created() {
        if (this.defaultValue) {
            if (this.defaultValue instanceof Object) {
                this.value = this.defaultValue
            } else {
                this.value = this.countries.filter(country => country.code === this.defaultValue)[0]
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.application-country-select {
    width: 100%;
    max-width: 320px;

    &--error {
        ::v-deep .multiselect__tags {
            border: 1px solid rgba($color: $colorRed, $alpha: 0.8) !important;
        }

        .application-country-select-label {
            color: $colorRed;
        }
    }

    ::v-deep .multiselect {
        min-height: 0;
        cursor: pointer;

        &__tags {
            min-height: 0 !important;
            padding: 10px 40px 0 10px !important;
        }

        &__option {
            background-color: #fff !important;
            color: $colorTextLight !important;
        }
    }
}
</style>
