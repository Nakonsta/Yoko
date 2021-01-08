<template>
  <ValidationProvider
      :tag="tag"
      :rules="rules"
      class="input__container"
      :class="parentClass"
      v-slot="{ errors, failed }"
      :name="$attrs.label && $attrs.label.toLowerCase() || validationName"
      :vid="vid"
  >
    <span v-if="$attrs.label" class="field__label">{{ $attrs.label }}</span>
    <div class="relative">
      <textarea
          :class="{field: true, error: failed}"
          v-model="innerValue"
          :rows="rows"
          :disabled="disabled"
          @input="input"
          :placeholder="placeholder"
          @keydown="countSymbols($event); calcAutoheight;"
          @keyup="calcAutoheight"
          @change="calcAutoheight"
          ref="field"
      ></textarea>
      <tooltip v-if="!!content" :content="content" />
      <span class="field__counter" v-if="counter !== false">{{ length }}/{{ counter }}</span>
    </div>
    <span v-if="failed" class="field__error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import Tooltip from "../tooltip";

export default {
  name: 'Textarea',
  components: {
    Tooltip
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'label'
    },
    rows: {
      type: Number,
      default: 3
    },
    parentClass: {
      type: String,
      default: 'field__container'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    vid: {
      type: String,
      default: ''
    },
    input: {
      type: Function,
      default: () => {}
    },
    validationName: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: 'required'
    },
    value: {
      type: null
    },
    counter: {
      default: false
    },
    autoheight: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    innerValue: '',
    length: 0,
    noMask: {
      mask: '*'.repeat(255),
      tokens: {
        '*': { pattern: /./ }
      }
    },
    pseudo: null,
  }),
  watch: {
    innerValue (newVal) {
      this.$emit('input', newVal);
      this.length = newVal.length;
    },
    value (newVal) {
      this.innerValue = newVal;
      this.length = this.innerValue.length;
    },
    autoheight (newVal) {
      this.initAutoheight();
    },
  },
  created () {
    if (this.value) {
      this.innerValue = this.value;
      this.length = this.innerValue.length;
    }
  },
  mounted () {
    this.initAutoheight();
  },
  methods: {
    countSymbols: function(evt) {
      if( this.counter === false ) return;
      if ( evt.target.value.length >= this.counter ) {
        evt.target.value = evt.target.value.substring(0,max);
        if (evt.keyCode >= 48 && evt.keyCode <= 90) {
          evt.preventDefault();
        }
      }
    },
    initAutoheight() {
      if (this.autoheight && !this.pseudo) {
        this.pseudo = document.createElement('div');
        this.pseudo.style.position = 'absolute';
        this.pseudo.style.top = '-9999px';
        this.pseudo.style.left = '-9999px';
        document.body.appendChild(this.pseudo);
        this.$refs['field'].style.resize = 'none';
        this.$refs['field'].style.overflow = 'hidden';
        window.addEventListener('resize', this.updateAutoheight);
        this.updateAutoheight();
      } else if (!this.autoheight && this.pseudo) {
        window.removeEventListener('resize', this.updateAutoheight);
        this.pseudo.parentNode.removeChild(this.pseudo);
        this.pseudo = null;
        this.$refs['field'].style.resize = '';
        this.$refs['field'].style.overflow = '';
      }
    },
    updateAutoheight() {
      let textarea = this.$refs['field'],
        pseudo = this.pseudo;
      pseudo.style.fontWeight = window.getComputedStyle(textarea).getPropertyValue('font-weight');
      pseudo.style.fontSize = window.getComputedStyle(textarea).getPropertyValue('font-size');
      pseudo.style.fontFamily = window.getComputedStyle(textarea).getPropertyValue('font-family');
      pseudo.style.lineHeight = window.getComputedStyle(textarea).getPropertyValue('line-height');
      pseudo.style.borderTop = window.getComputedStyle(textarea).getPropertyValue('border-top');
      pseudo.style.borderLeft = window.getComputedStyle(textarea).getPropertyValue('border-left');
      pseudo.style.borderRight = window.getComputedStyle(textarea).getPropertyValue('border-right');
      pseudo.style.borderBottom = window.getComputedStyle(textarea).getPropertyValue('border-bottom');
      pseudo.style.paddingTop = window.getComputedStyle(textarea).getPropertyValue('padding-top');
      pseudo.style.paddingLeft = window.getComputedStyle(textarea).getPropertyValue('padding-left');
      pseudo.style.paddingRight = window.getComputedStyle(textarea).getPropertyValue('padding-right');
      pseudo.style.paddingBottom = window.getComputedStyle(textarea).getPropertyValue('padding-bottom');
      pseudo.style.width = window.getComputedStyle(textarea).width;
      this.calcAutoheight();
    },
    calcAutoheight() {
      function times(string, number) {
        for (let i = 0, r = ''; i < number; i ++) r += string;
        return r;
      }
      if (!this.autoheight) return;
      if (!this.pseudo) {
        this.initAutoheight();
      }
      let textarea = this.$refs['field'],
        pseudo = this.pseudo,
        v = this.innerValue.replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/&/g, '&amp;')
          .replace(/\n$/, '<br/>&nbsp;')
          .replace(/\n/g, '<br/>')
          .replace(/ {2,}/g, function(space) { return times('&nbsp;', space.length -1) + ' ' });
      pseudo.innerHTML = v;
      setTimeout(function(){
        textarea.style.height = window.getComputedStyle(pseudo).height;
      }, 10);
    }
  }
};
</script>

<style lang="scss">
  .input__container {
    .field__counter {
      position: absolute;
      right: 10px;
      bottom: 7px;
    }
  }
</style>

