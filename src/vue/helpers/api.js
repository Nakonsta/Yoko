export default {
    data() {
        return {
            CancelTokens: {
                catalogCancelToken: axios.CancelToken.source(),
            },
        }
    },
    methods: {
        cancelCatalogRequest() {
            this.CancelTokens.catalogCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.catalogCancelToken = axios.CancelToken.source()
        },

        fetchFilter() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/filter/`);
        },
        fetchCatalog(filter, page = 1) {
            let body = {}
            body.page = page

            if (filter) {
                body.filter = filter
            }

            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/`,
                body,
                { cancelToken: this.CancelTokens.catalogCancelToken.token },
            );
        },
        fetchTotalCatalog(group, filter) {
            let body = {}
            body.group = group

            if (filter) {
                body.filter = filter
            }

            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/total/`,
                body,
                { cancelToken: this.CancelTokens.catalogCancelToken.token },
            );
        },
        fetchListSearchCatalog(string) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/`, {
                params: {
                    q: string
                }
            });
        },
        authSignin(l, p) {
            return axios.post(`${process.env.API_URL_AUTH_SERVICE}/auth/signin`, {
                login: l,
                password: p,
            });
        },
        fetchUser() {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/auth/me`);
        },
        fetchSupportInfo() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/settings/feedback/`);
        },
        fetchSupportTopics() {
            return axios.get(`${process.env.API_URL_NOTICE_SERVICE}/api/email/feedback/properties`);
        },
        fetchContragentFeedbackForm(s, f, e, p, c) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/forms/call`, {
                subject: s,
                fio: f,
                email: e,
                phone: p,
                consent: c,
            });
        },
        fetchSupportForm(data) {
            return axios.post(`${process.env.API_URL_NOTICE_SERVICE}/api/email/feedback/send`, data);
        },
    }
}
