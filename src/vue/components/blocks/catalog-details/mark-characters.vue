<template>
  <div id="characters-mark">
    <div class="row row--null">
      <div class="col col-md-6 col-xs-12">
        <ul class="list--counter">
          <li v-for="(item, index) in items[0]" :key="index">
            <span class="key">{{ item.name }}</span>
            <span class="value">{{ item.desc }}</span>
          </li>
        </ul>
      </div>
      <div class="col col-md-6 col-xs-12">
        <ul class="list--counter">
          <li v-for="(item, index) in items[1]" :key="'0'+index">
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
    return {
      items: []
    }
  },
  created() {
    this.items[0] = this.root.slice(0, this.root.length / 1.6);
    this.items[1] = this.root.slice(this.root.length / 1.6);
  },
  props: {
    root: {
      default: null,
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
