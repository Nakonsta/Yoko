import moment from 'moment'
export default {
  methods: {
    formatDate(string) {
      return moment(string).format('DD.MM.YYYY, H:mm')
    },
    formatDateNoTime(string) {
      return moment(string).format('DD.MM.YYYY')
    },
    formatDateForFilter(string) {
      return moment(string).format('YYYY-MM-DD hh:mm:ss')
    },
  },
}
