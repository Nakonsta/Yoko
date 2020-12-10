export default {
    methods: {
        authorizationMethod(user, token, options = {}) {
            // todo: user пока не используется здесь, но возможно потом пригодится
            window.closeLoader()
            if (!options.rememberMe) {
                document.cookie = `auth._token.local=Bearer%20${token};domain=${process.env.AUTH_DOMAIN};path=/`
            } else {
                const now = new Date()
                now.setDate(now.getDate() + parseInt(process.env.AUTHORIZATION_COOKIE_LIFETIME))

                document.cookie = `auth._token.local=Bearer%20${token};domain=${process.env.AUTH_DOMAIN};expires=${now};path=/`
            }
            // window.location.href = `${process.env.LK_SUPP}`
            closePopupById('#singin')
            this.$store.commit('authorization', options)
        },
    },
}
