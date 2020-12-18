import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import AccreditationsDetail from '../pages/accreditations/details.vue'
import CatalogNew from '../pages/catalog/new.vue'
import Procedures from '../pages/procedures/procedures.vue'
import ProcedureNew from '../pages/procedures/form/index.vue'
import Procedure from '../pages/procedures/index.vue'
import Accreditations from '../pages/accreditations/accreditations.vue'

const routes = [
  { path: "/personal/accreditations", component:  Accreditations},
  { path: "/personal/accreditations/:id", component: AccreditationsDetail},
  { path: '/personal/procedures', component: Procedures},
  { path: '/personal/procedures/:id', component: Procedure},
  { path: '/personal/procedures/new', component: ProcedureNew},
  { path: "/personal/catalog/new", component:  CatalogNew},
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
