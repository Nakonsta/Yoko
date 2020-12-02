export default {
    data() {
        return {
            CancelTokens: {
                catalogCancelToken: axios.CancelToken.source(),
                companyCancelToken: axios.CancelToken.source(),
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
        cancelCompanyRequest() {
            this.CancelTokens.companyCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.companyCancelToken = axios.CancelToken.source()
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
                {cancelToken: this.CancelTokens.catalogCancelToken.token},
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
                {cancelToken: this.CancelTokens.catalogCancelToken.token},
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
        forgotPass(email) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/restore_password_request`, {
                params: {
                    email
                }
            });
        },
        forgotPassChange(data) {
            return axios.post(
                `${process.env.API_URL_AUTH_SERVICE}/restore_password`,
                data,
            );
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
        fetchCountries() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/digests/countries`);
        },
        fetchCatalogAdd(data) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/`, data);
        },
        fetchCatalogImport(data, config) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}`, data, config); // todo url
        },
        fetchQuotes(quote, date_start, date_end, mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes`, {
                params: {
                    quote, date_start, date_end, mode
                }
            });
        },
        fetchLatestQuotes(quote, mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes/latest/`, {
                params: { quote, mode }
            });
        },
        fetchQuotesDates(mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes/dates/`, {
                params: { mode }
            });
        },
        // fetchCountries() {
        //     return this.$axios.$get(
        //       `${process.env.API_URL_CONTENT_SERVICE}/api/digests/countries/`,
        //     )
        // },
        fetchCompany(data) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/company`,
                data,
                {cancelToken: this.CancelTokens.companyCancelToken.token},
            );
        },
        fetchCompanyReportForm(data) {
            return axios.post(`${process.env.API_URL_NOTICE_SERVICE}/api/`, data); // todo поставить url "проверка компании"
        },
        fetchTenderItem(id) {
            return axios.get(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}`);
        },
        fetchCompanyById(id) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/data/companies/${id}`);
        },
    }
}
