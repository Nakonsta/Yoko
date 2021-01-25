import moment from 'moment';

export default {
  methods: {
    formatDate(string) {
      return moment(string).format('DD.MM.YYYY, H:mm');
    },
    formatDateNoTime(string) {
      return moment(string).format('DD.MM.YYYY');
    },
    formatDateForFilter(string) {
      return moment(string).format('YYYY-MM-DD hh:mm:ss');
    },
    addWeekdays(date, days) {
      date = moment(date);
      while (days > 0) {
        date = date.add(1, 'days');
        // decrease "days" only if it's a weekday.
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
          days -= 1;
        }
      }
      return date;
    },
    calcDate(date, count, type = 'days') {
      return moment(date).add(count, type);
    },
  },
};
