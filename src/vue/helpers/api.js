export default {
    methods: {
        fetchFilter() {
            return axios.get(`https://stage-content.ec.extyl.pro/api/catalog/filter/`);
        },
        fetchCatalog(filterValues) {
            return axios.post(`https://stage-content.ec.extyl.pro/api/catalog/`, filterValues);
        }
    }
}
