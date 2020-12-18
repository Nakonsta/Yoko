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
            role: localStorage.getItem('role') ? localStorage.getItem('role') : 'buyer',
        },
        token: null,
        env: {
            LK_SUPP: process.env.LK_SUPP
        }
    },
    getters: {
        userRole(state) {
            return state.auth.loggedIn ? state.auth.role : 'guest'
        },
        // todo: эти дела пока не работают
        companyBuyer(state) {
            return state.auth.user.companies
                ? state.auth.user.companies.filter(
                    (company) => {
                        return company.buyer
                    }
                ) : [];
        },
        companyContractor(state) {
            return state.auth.user.companies
                ? state.auth.user.companies.filter(
                    (company) => {
                        return company.contractor
                    }
                ) : [];
        }
    },
    mutations: {
        selectRoleBuyer(state) {
            window.openLoader()
            state.auth.role = 'buyer'
            localStorage.setItem('role', 'buyer')
            setTimeout(() => {
                document.location.reload()
            }, 1000)
        },
        selectRoleContractor(state) {
            window.openLoader()
            state.auth.role = 'contractor'
            localStorage.setItem('role', 'contractor')
            setTimeout(() => {
                document.location.reload()
            }, 1000)
        },
        authorization(state, options = {}) {
            const token = Cookies.get('auth._token.local')
            const storageUser = sessionStorage.getItem('user')
            const redirect = options.redirect ? options.redirect : null
            const role = options.role ? options.role : null

            if (role) {
                switch (role) {
                    case 'buyer':
                        localStorage.setItem('role', 'buyer')
                        break
                    case 'contractor':
                        localStorage.setItem('role', 'contractor')
                        break
                }
            }

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
                        state.token = token
                        state.auth.user = response.data.data
                        state.auth.loggedIn = true
                        sessionStorage.setItem('user', JSON.stringify(response.data.data))
                        window.closeLoader()
                        if (!storageUser) {
                            window.notificationSuccess('Вы вошли в систему')
                            // todo: перазагрузка страницы после авторизации
                            setTimeout(() => {
                                if(redirect) {
                                    document.location.href = redirect
                                } else {
                                    document.location.reload()
                                }
                            }, 1000)
                        }
                    })
                    .catch((e) => {
                        if (e.response.status === 403) {
                            store.commit('logout', {
                                reload: true,
                                mute: true,
                            })
                        } else {
                            console.log(e)
                            window.closeLoader()
                            state.auth.user = null
                            state.auth.loggedIn = false
                            window.notificationError('Ошибка сервера')
                        }
                    })
            } else {
                store.commit('logout', {
                    reload: false,
                    mute: true,
                })
            }
        },
        logout(state, {reload, mute}) {
            Cookies.remove('auth._token.local', { domain: process.env.AUTH_DOMAIN, path: '/' })
            state.auth.user = false
            state.auth.loggedIn = false
            sessionStorage.removeItem('user')
            if (!mute) {
                window.notificationSuccess('Вы вышли из системы')
            }
            if (reload) {
                window.openLoader()
                setTimeout(() => {
                    document.location.reload()
                }, 1000)
            }
        }
    }
})

console.log(store.state)
console.log(store.state.auth.token, axios.defaults.headers.common.Authorization)

store.commit('authorization')

export default store
