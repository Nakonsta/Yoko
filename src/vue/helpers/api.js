export default {
    fetchFilter(url, arrSelected) {
        console.log(arrSelected)
        return axios.get(`${url}/local/ajax/filterInteractiveRoom.php`, {
            params: {
                set_filter: 'Y',
                ...arrSelected
            }
        });
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