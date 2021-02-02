export default {
  methods: {
    setHeadTitle(text) {
      const title = document.querySelector('head title');
      title.innerHTML = text;
    },
  },
};
