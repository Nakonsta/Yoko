import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Accreditations from '../pages/accreditations/accreditations.vue'
import Details from '../pages/accreditations/details.vue'

const routes = [
  { path: "/personal/accreditations", component:  Accreditations},
  { path: "/personal/accreditations/:id", component:  Details},

];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
