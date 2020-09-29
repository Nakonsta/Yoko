export default {
    methods: {
        fetchFilter() {
            return axios.get(`https://stage-content.ec.extyl.pro/api/catalog/filter/`);
        },
        fetchCatalog(url, arrSelected, page = 1) {
            return axios.get(`${url}/local/ajax/filterInteractiveRoom.php`, {
                params: {
                    PAGEN_1: page,
                    set_filter: 'Y',
                    getList: 'Y',
                    ...arrSelected
                }
            });
        }
    }
}
