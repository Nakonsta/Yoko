import moment from 'moment'

export default {
    methods: {
        parseMarkSize(arr) {
            return arr.map((item) => {
                return {
                    id: item.id,
                    name: item.title,
                }
            })
        },
        parseOKPD2(arr) {
            return arr.map((item) => {
                return {
                    code: item.code,
                    id: item.id,
                    name: `${item.code} ${item.name}`,
                }
            })
        },
        parseBoolToNumber(data) {
            return data ? 1 : 0
        },
        parseDate(date) {
            return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null;
        },
    },
}
