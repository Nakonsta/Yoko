import App from './catalog.vue'

const interactiveMap = document.querySelector('#interactive-map');

if (interactiveMap) {
    let app = new Vue({
        el: interactiveMap,
        render: function(h) { return h(App); }
    })
}
