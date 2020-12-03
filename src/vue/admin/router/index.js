import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import testPageMain from '../../components/admin/test-pageMain.vue'
import testPage1 from '../../components/admin/test-page1.vue'
import testPage2 from '../../components/admin/test-page2.vue'

const routes = [
    { path: '/personal', component: testPageMain },
    { path: '/personal/page1', component: testPage1 },
    { path: '/personal/page2', component: testPage2 }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router