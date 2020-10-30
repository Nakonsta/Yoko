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
        token: null
    },
    mutations: {
        authorization(state) {
            const token = Cookies.get('auth._token.local')

            if (token && !axios.defaults.headers.common.Authorization) {
                axios.defaults.headers.common.Authorization = `${token}`
            }

            api.methods.fetchUser()
                .then((response) => {
                    console.log(state)
                    state.token = token
                    state.auth.user = response.data.data
                    state.auth.loggedIn = true
                    closePopupById('#singin')
                })
                .catch((e) => {
                    console.log(e)
                    state.auth.user = null
                    state.auth.loggedIn = false
                })
        }
    }
})

console.log(store.state)
console.log(store.state.auth.token, axios.defaults.headers.common.Authorization)

store.commit('authorization')

export default store
