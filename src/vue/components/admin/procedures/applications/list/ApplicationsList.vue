<template>
    <div class="applications-list">
        <applications-list-item
            v-for="application in applications"
            :key="application.id"
            :application="application"
        ></applications-list-item>
    </div>
</template>
<script>
import ApplicationsListItem from './ApplicationsListItem.vue'
export default {
    name: 'applications-list',
    components: { ApplicationsListItem },
    props: {
        applications: {
            type: Array,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.applications-list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    list-style: none;
    margin: 0;
    margin-top: rem(20px);
    padding: 0;
}
</style>
