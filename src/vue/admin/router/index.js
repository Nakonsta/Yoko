import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Details from '../pages/accreditations/details.vue'
import CatalogAdd from '../pages/catalog/add.vue'
import Marketplace from '../pages/marketplace/list.vue'
import Procedure from '../pages/procedures/form/index.vue'
import Procedures from '../pages/procedures/index.vue'
import Accreditations from '../pages/accreditations/accreditations.vue'

const routes = [
  { path: "/personal/accreditations", component:  Accreditations},
  { path: "/personal/accreditations/:id", component: Details},
  { path: '/personal/procedures/:id', component: Procedure },
  { path: '/personal/procedures/new', component: Procedure },
  { path: '/personal/procedures', component: Procedures },
  { path: "/personal/catalog/add", component:  CatalogAdd},
  { path: "/personal/marketplace", component:  Marketplace},
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
