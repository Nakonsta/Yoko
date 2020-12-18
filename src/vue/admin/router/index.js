import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import AccreditationsDetail from '../pages/accreditations/details.vue'
import CatalogNew from '../pages/catalog/new.vue'
import Procedures from '../pages/procedures/procedures.vue'
import ProcedureNew from '../pages/procedures/form/index.vue'
import Accreditations from '../pages/accreditations/accreditations.vue'
import page404 from '../pages/page404.vue'

const routes = [
  { path: "/personal/accreditations", component:  Accreditations},
  { path: "/personal/accreditations/:id", component: AccreditationsDetail},
  { path: '/personal/procedures', component: Procedures},
  { path: '/personal/procedures/:id', component: ProcedureNew},
  { path: "/personal/catalog/new", component:  CatalogNew},
  { path: "*", component:  page404},
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
