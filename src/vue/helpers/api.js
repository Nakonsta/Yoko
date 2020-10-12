export default {
    methods: {
        fetchFilter() {
            return axios.get(`https://stage-content.ec.extyl.pro/api/catalog/filter/`);
        },
        fetchCatalog(group, filter, page = 1) {
            let body = {}
            body.page = page
            body.group = group

            if (filter) {
                body.filter = filter
            }

            return axios.post(`https://stage-content.ec.extyl.pro/api/catalog/`, body);
        },
        fetchTotalCatalog(filter) {
            let body = {}

            if (filter) {
                body.filter = filter
            }

            return axios.post(`https://stage-content.ec.extyl.pro/api/catalog/total/`, body);
        },
        fetchListSearchCatalog(string) {
            return axios.get(`https://stage-content.ec.extyl.pro/api/catalog/search/`, {
                params: {
                    q: string
                }
            });
        }
    }
}
