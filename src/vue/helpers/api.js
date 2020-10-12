export default {
    methods: {
        fetchFilter() {
            return axios.get(`https://stage-content.ec.extyl.pro/api/catalog/filter/`);
        },
        fetchCatalog(group, filter) {
            let body = {}
            body.page = 1
            body.group = group

            if (filter) {
                body.filter = filter
            }

            return axios.post(`https://stage-content.ec.extyl.pro/api/catalog/`, body);
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
