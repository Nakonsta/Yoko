<template>
  <div class="application-sort">
    <span>{{ label }}</span>
    <div class="application-sort__dropdown">
      <div
        class="application-sort__dropdown-value"
        @click="show = true"
      >
        <span>
          {{ sortList[sort] }}
        </span>
        <svg>
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="/img/sprite.svg#arrow-bottom"
          />
        </svg>
      </div>

      <ul
        :class="[
          'application-sort__dropdown-list',
          { 'application-sort__dropdown-list--show': show },
        ]"
      >
        <li
          v-for="(item, key) in sortList"
          :key="key"
          :class="{ active: key === sort }"
          @click="sortItems(key)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-restricted-syntax */
export default {
  name: 'ApplicationSort',
  props: {
    label: {
      type: String,
      required: true,
    },
    sortList: {
      type: Object,
      required: true,
    },
    defaultValue: {
      type: String,
    },
  },
  data() {
    return {
      sort: '',
      show: false,
      handleOutsideClick: null,
    };
  },
  created() {
    if (this.defaultValue) {
      this.sort = this.defaultValue;
    } else if (this.sortList) {
      this.sort = Object.keys(this.sortList)[0];
    }

    document.addEventListener('click', this.hideList);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideList);
  },
  methods: {
    sortItems(key) {
      this.sort = key;
      this.$emit('on-sort', this.sort);
      this.show = false;
    },
    hideList(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/../assets/sass/variables/variables";
@import "@/../assets/sass/variables/fluid-variables";
@import "@/../assets/sass/mixins/fluid-mixin";
@import "@/../assets/sass/mixins/mq";

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

    visibility: hidden;
    list-style: none;
    margin: 0;
    padding: rem(8px) rem(12px);
    opacity: 0;
    background-color: #fff;
    border-radius: 6px;
    transition: 0.3s;

    &--show {
      visibility: visible;
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
