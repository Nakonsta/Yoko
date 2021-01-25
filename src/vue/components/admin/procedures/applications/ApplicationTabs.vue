<template>
  <div class="application-tabs">
    <ul class="application-tabs__list">
      <li
        v-for="tab in tabs"
        :key="tab.index"
        :class="[
          'application-tabs__tab',
          { 'application-tabs__tab--active': currentTabIndex === tab.index }
          ]"
        @click="changeTab(tab.index)"
      >
        {{ tab.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ApplicationTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentTabIndex: 0,
    };
  },
  created() {
    if (this.tabs.length) {
      this.currentTabIndex = this.tabs[0].index;
    }
  },
  methods: {
    changeTab(index) {
      this.currentTabIndex = index;
      this.$emit('on-change', this.currentTabIndex);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/../assets/sass/variables/variables';
@import '@/../assets/sass/variables/fluid-variables';
@import '@/../assets/sass/mixins/fluid-mixin';
@import '@/../assets/sass/mixins/mq';

.application-tabs {
    width: 100%;
    position: relative;

    &::after {
        content: '';

        position: absolute;
        top: 98%;
        left: 0;

        display: block;
        height: 1px;
        width: 100%;
        background-color: $colorBdr;
    }

    &__list {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: hidden;
        overflow-x: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__tab {
        position: relative;

        padding: 0 rem(15px) rem(15px);
        cursor: pointer;
        transition: 0.3s;

        font-family: Gilroy;
        font-weight: 600;
        font-size: rem(14px);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        white-space: nowrap;
        color: $colorGray;

        &::after {
            content: '';

            position: absolute;
            top: 98%;
            left: 0;
            right: 0;
            z-index: 2;

            display: block;
            transition: transform 0.3s;
            transform: scaleX(0);
            border-bottom: 1px solid #31acb8;
        }

        &--active,
        &:hover {
            color: $colorTurquoise;

            &::after {
                transform: scaleX(1);
            }
        }
    }
}
</style>
