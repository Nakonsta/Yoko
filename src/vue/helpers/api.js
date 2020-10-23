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
            return axios.get(`https://stage-content.ec.extyl.pro/api/catalog/filter/`);
        },
        fetchCatalog(filter, page = 1) {
            let body = {}
            body.page = page

            if (filter) {
                body.filter = filter
            }

            return axios.post(`https://stage-content.ec.extyl.pro/api/catalog/`,
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

            return axios.post(`https://stage-content.ec.extyl.pro/api/catalog/total/`,
                body,
                { cancelToken: this.CancelTokens.catalogCancelToken.token },
            );
        },
        fetchListSearchCatalog(string) {
            return axios.get(`https://stage-content.ec.extyl.pro/api/catalog/search/`, {
                params: {
                    q: string
                }
            });
        },
        authSignin(l, p) {
            return axios.post(`https://stage-auth.ec.extyl.pro/auth/signin`, {
                login: l,
                password: p,
            });
        },
    }
}
