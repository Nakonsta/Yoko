<template>
    <div :class="$attrs.class">
        <span v-if="$attrs.label">{{ $attrs.label }}</span>
        <div class="dropdown">
            <div class="dropdown__value">{{ value }}</div>
            <div class="dropdown__list">
                <ul>
                    <li v-for="item in options">
                        <a href="javascript:{}" @click="select(item)" class="{active: item.id === innerValue}">{{ item.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dropdownList',
    props: {
        options: {
            default: () => [],
            type: Array,
            required: true,
        },
        current: {
            default: '',
            type: String,
            required: true,
        },
    },
    computed: {
        value() {
            return this.options.filter((item)=>{return item.id === this.innerValue})[0].name;
        }
    },
    watch: {
        innerValue(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$emit('change', newVal);
            }
        },
        current(newVal) {
            this.current = newVal;
        }
    },
    created() {
        this.innerValue = this.current;
    },
    data: function() {
        return {
            innerValue: '',
        }
    },
    methods: {
        select(item) {
            console.log(item);
            this.innerValue = item.id;
        }
    }
}
</script>