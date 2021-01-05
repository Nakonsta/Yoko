<template>
  <div id="characters-mark">
    <div class="row row--null">
      <div class="col col-md-6 col-xs-12">
        <ul class="list--counter">
          <li v-for="(item, index) in columnFirst" :key="index">
            <span class="key">{{ item.name }}</span>
            <span class="value">{{ item.desc }}</span>
          </li>
        </ul>
      </div>
      <div class="col col-md-6 col-xs-12">
        <ul class="list--counter">
          <li v-for="(item, index) in columnSecond" :key="'0'+index">
            <span class="key">{{ item.name }}</span>
            <span class="value">{{ item.desc }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkCharacters",
  data() {
    return {}
  },
  computed: {
    columnFirst() {
      return this.root.slice(0, this.root.length / 1.9);
    },
    columnSecond() {
      return this.root.slice(this.root.length / 1.9);
    }
  },
  props: {
    root: {
      default: () => [],
      type: Array,
    }
  }
}
</script>

<style lang="scss">
  #characters {
    &.tabs__content {
      padding-left: 1.7rem;
      padding-right: 1.7rem;
    }
  }
</style>
