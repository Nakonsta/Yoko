import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Details from '../pages/accreditations/details.vue'
import ProcedureNew from '../pages/procedures/form/index.vue'
import ProcedureDetails from '../pages/procedures/form/index.vue'
import Procedure from '../pages/procedures/index.vue'
import Accreditations from '../pages/accreditations/accreditations.vue'

const routes = [
  { path: "/personal/accreditations", component:  Accreditations},
  { path: "/personal/accreditations/:id", component: Details},
  { path: '/personal/procedures/:id', component: ProcedureDetails },
  { path: '/personal/procedures/new', component: ProcedureNew },
  { path: '/personal/procedures', component: Procedure },

];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
