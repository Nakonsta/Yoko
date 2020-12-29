import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

import AccreditationsDetail from '../pages/accreditations/details.vue'
import Catalog from '../pages/catalog/items.vue'
import CatalogNew from '../pages/catalog/new.vue'
import Procedures from '../pages/procedures/items.vue'
import Procedure from '../pages/procedures/form/index.vue'
import Accreditations from '../pages/accreditations/accreditations.vue'
import User from '../pages/user/user.vue'
import page404 from '../pages/page404.vue'

const routes = [
  {
    path: "/personal",
    component: { template: '<div>Главная</div>' },
  },
  {
    path: "/personal/accreditations",
    component:  Accreditations,
  },
  {
    path: "/personal/accreditations/:id",
    component: AccreditationsDetail
  },
  {
    path: '/personal/procedures',
    component: Procedures,
  },
  {
    path: '/personal/procedures/drafts',
    component: Procedures,
    meta: { role: 'buyer' },
    props: { type: 'drafts' },
  },
  {
    path: '/personal/procedures/applications',
    component: Procedures,
    meta: { role: 'contractor' },
    props: { type: 'applications' },
  },
  {
    path: '/personal/procedures/:id',
    component: Procedure,
    meta: { role: 'buyer' },
  },
  {
    path: "/personal/catalog",
    component:  Catalog,
    meta: { role: 'contractor' },
  },
  {
    path: "/personal/catalog/new",
    component:  CatalogNew,
    meta: { role: 'contractor' },
  },
  {
    path: "/personal/user",
    component:  User,
  },
  {
    path: "*",
    component:  page404
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const userRole = store.getters.userRole
  const { role } = to.meta
  const companyBuyer = store.getters.companyBuyer
  const companyContractor = store.getters.companyContractor

  console.log(to)

  if (userRole !== 'guest') {
    if (role) {
      if (userRole === role) {
        switch (userRole) {
          case 'buyer':
            if (companyBuyer.length) {
              next()
            } else {
              next('/personal/accreditations/new')
            }
            break
          case 'contractor':
            if (companyContractor.length) {
              next()
            } else {
              next('/personal/accreditations/new')
            }
            break
        }

      } else {
        next('/personal')
      }
    } else {
      next()
    }
  } else {
    openPopupById('#singin')
    if (to.path === '/personal') {
      next()
    } else {
      next('/personal')
    }
  }
})

export default router;
