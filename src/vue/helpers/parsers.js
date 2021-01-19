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
        getMaxLot(array, lot) {
            const getLot = [];
            array.map((item) => {
                getLot.push(item[lot])
            });
            getLot.sort((a, b) => a - b)
            const max = getLot[getLot.length - 1]
            const lots = this.counterToTenSelect.find(x => x.id === max);
            console.log(lots, max)
            this.selectedData.count_lots = lots;
            for (let i = 1; i < this.selectedData.count_lots.id + 1; i++) {
                this.procedureIdData.lotsCounter.push({id: i, name: i})
            }
        }
    },
}
