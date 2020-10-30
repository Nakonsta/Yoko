import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from "js-cookie";
import api from "../helpers/api";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        auth: {
            user: null,
            loggedIn: false,
        },
        token: null,
        env: {
            LK_SUPP: process.env.LK_SUPP
        }
    },
    mutations: {
        authorization(state) {
            const token = Cookies.get('auth._token.local')
            const storageUser = sessionStorage.getItem('user')

            if (token && token !== 'false' && !axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common.Authorization = `${token}`
                if (storageUser) {
                    state.auth.user = JSON.parse(storageUser)
                    state.auth.loggedIn = true
                } else {
                    window.openLoader()
                }
                api.methods.fetchUser()
                    .then((response) => {
                        console.log(state)
                        state.token = token
                        state.auth.user = response.data.data
                        state.auth.loggedIn = true
                        sessionStorage.setItem('user', JSON.stringify(response.data.data))
                        window.closeLoader()
                    })
                    .catch((e) => {
                        console.log(e)
                        window.closeLoader()
                        state.auth.user = null
                        state.auth.loggedIn = false
                    })
            } else {
                store.commit('logout')
            }
        },
        logout(state, reload) {
            Cookies.remove('auth._token.local', { domain: process.env.AUTH_DOMAIN, path: '/' })
            state.auth.user = false
            state.auth.loggedIn = false
            sessionStorage.removeItem('user')
            if (reload) {
                document.location.reload()
            }
        }
    }
})

console.log(store.state)
console.log(store.state.auth.token, axios.defaults.headers.common.Authorization)

store.commit('authorization')

export default store
