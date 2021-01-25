<template>
    <div :class="classes">
        <multiselect
            v-model="value"
            label="name"
            selectedLabel=""
            selectLabel=""
            deselectLabel=""
            placeholder="Выбрать компанию"
            :options="companies"
            :searchable="false"
            :allow-empty="false"
            :show-labels="false"
            :disabled="disabled"
            @select="handleSelect"
        >
            <template v-if="companies.length === 0" slot="noOptions">
                Компаний нет
            </template>
        </multiselect>
    </div>
</template>
<script>
import api from '@/helpers/api'
export default {
    name: 'application-company-select',
    mixins: [api],
    props: {
        defaultINN: {
            type: [Number, String]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hasError: {
            type: Boolean
        }
    },
    data() {
        return {
            value: null
        }
    },
    computed: {
        classes() {
            return ['application-company-select', { 'application-company-select--error': this.hasError }]
        },
        companies() {
            return this.$store.getters.companyContractor
        }
    },
    methods: {
        handleSelect(value) {
            if (!this.defaultINN) {
                window.openLoader()
            }

            this.fetchCompanyByInn(value.inn)
                .then(({ data }) => {
                    this.$emit('on-select', data.data)

                    if (!this.value) {
                        this.value = data.data
                    }
                })
                .finally(() => window.closeLoader())
        }
    },
    created() {
        if (this.defaultINN) {
            this.handleSelect({ inn: this.defaultINN })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-company-select {
    width: 100%;
    max-width: 320px;
    height: 32px;

    &--error {
        ::v-deep .multiselect__tags {
            border: 1px solid rgba($color: $colorRed, $alpha: 0.8);
        }

        .application-company-select-label {
            color: $colorRed;
        }
    }

    ::v-deep .multiselect {
        height: 32px;
        min-height: 0;
        cursor: pointer;

        &__tags {
            height: 32px;
            min-height: 0;
            padding: 6px 40px 0 10px;
        }

        &__placeholder {
            padding: 0;
            margin-top: -6px;
            margin-bottom: 0;
        }

        &__option {
            background-color: #fff;
            color: $colorTextLight;
        }
    }
}
</style>
