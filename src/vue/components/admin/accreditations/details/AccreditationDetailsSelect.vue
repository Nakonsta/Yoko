<template>
    <div :class="classes">
        <span class="accreditation-details__select-label">Юридическое лицо</span>
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
export default {
    name: 'accreditation-details-select',
    props: {
        defaultCompanyId: {
            type: [Number, String]
        },
        disabled: {
            type: Boolean
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
            return ['accreditation-details__select', { 'accreditation-details__select--error': this.hasError }]
        },
        companies() {
            return this.$store.state.auth.loggedIn ? this.$store.state.auth.user.companies : []
        }
    },
    methods: {
        handleSelect(value) {
            this.$emit('on-select', value)
        }
    },
    created() {
        if (this.defaultCompanyId && this.companies.length) {
            this.value = this.companies.filter(company => company.id == this.defaultCompanyId)[0]
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/sass/variables/variables';
@import '../../../../../assets/sass/variables/fluid-variables';
@import '../../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../../assets/sass/mixins/mq';

.accreditation-details {
    &__select {
        margin-bottom: rem(32px);

        &--error {
            ::v-deep .multiselect__tags {
                border: 1px solid rgba($color: $colorRed, $alpha: 0.8) !important;
            }

            .accreditation-details__select-label {
                color: $colorRed;
            }
        }

        .multiselect {
            cursor: pointer;

            &__option {
                background-color: #fff !important;
                color: $colorTextLight !important;
            }
        }
    }

    &__select-label {
        display: inline-block;
        margin-bottom: 4px;

        font-family: Roboto;
        font-weight: 500;
        font-size: rem(14px);
        color: #373735;
    }
}
</style>
