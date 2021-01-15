<template>
    <div class="tabs tabs--line tabs--companies" v-if="(!hideWithoutOptions && companies.length) || (hideWithoutOptions && companies.length > 1)">
        <ul>
            <li v-for="company in companies" :key="company.id" :class="{active: company.inn === innerValue.inn}">
                <a href="javascript:{}" @click="select($event, company)">{{ company.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'companiesTabs',
    props: {
        companies: {
            default: () => ([]),
            type: Array,
            required: true,
        },
        value: {
            default: null,
            type: Object,
            required: true,
        },
        hideWithoutOptions: { // прячем ли если только 1 компания
            default: false,
            type: Boolean,
        },
    },
    computed: {
        innerValue: {
            get() {
                return this.value;
            },
            set(value) {
                if (value.inn !== this.value.inn) {
                    this.$emit('change', value);
                }
            },
        },
    },
    methods: {
        select(evt, company) {
            evt.preventDefault();
            this.innerValue = company;
        }
    }
}
</script>