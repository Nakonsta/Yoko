<template>
  <div class="field__multiple">
    <div class="field__line" v-for="(item, index) in innerValue">
      <slot v-bind:index="index"/>
      <div class="field__clone" v-if="!index && max !== -1 && innerValue.length < max">
        <a href="javascript:{}" @click="add($event)">
          <svg class="sprite-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#add"></use></svg>
          {{ addText }}
        </a>
      </div>
      <div class="field__remove" v-if="index > min-1">
        <a href="javascript:{}" @click="remove($event, item, index)">
          <svg class="sprite-cancel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#cancel"></use></svg>
          {{ removeText }}
        </a>
      </div>
    </div>
<!--    <div class="field__add" v-if="max !== -1 && innerValue.length < max">-->
<!--      <a href="javascript:{}" @click="add($event)">-->
<!--        <svg class="sprite-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/sprite.svg#add"></use></svg>-->
<!--        {{ addText }}-->
<!--      </a>-->
<!--    </div>-->
  </div>
</template>

<script>

export default {
  name: 'Multiple',
  props: {
    min: {
      default: 1,
      type: Number,
    },
    max: {
      default: -1,
      type: Number,
    },
    addText: {
      default: '',
      type: String,
    },
    removeText: {
      default: '',
      type: String,
    },
    input: {
      type: Function,
      default: () => {}
    },
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: '',
  }),
  watch: {
    innerValue (newVal) {
      this.$emit('input', newVal);
    },
    value (newVal) {
      this.innerValue = newVal;
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
  methods: {
    add: function (evt) {
      evt.preventDefault();
      this.innerValue.push('');
    },
    remove: function (evt, index) {
      evt.preventDefault();
      this.innerValue.splice(index, 1);
    },
    set: function() {
      console.log('!set');
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/sass/variables/variables";
@import "../../../assets/sass/variables/fluid-variables";
@import "../../../assets/sass/mixins/fluid-mixin";
.field__line {
  display: flex;
  justify-content: space-between;
  .field__container,
  .input__container {
    margin-bottom: rem(10px);
    width: calc(100% - #{rem(40px)});
  }
  .field__clone,
  .field__remove {
    margin: rem(4px) 0;
    flex-shrink: 0;
  }
  .field__clone {
    svg {
      width: rem(16px);
      height: rem(16px);
    }
  }
}
</style>
