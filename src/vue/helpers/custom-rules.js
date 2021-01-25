import moment from 'moment';

const textError = {
  repeatPass: 'Пароли не совпадают',
  customPhone: 'Поле некорректно заполнено',
  checkValue: 'Выберите значение',
  maxDate: 'Дата должна быть не больше ',
  minDate: 'Дата должна быть не меньше ',
};

export default {
  customPhone: {
    validate: (value) => {
      const number = value.split('(')[1].replace(/[+()-\s]/g, '');
      return number.length === 10 ? true : textError.customPhone;
    },
  },
  repeatPass: {
    validate: (value, args) => {
      const pass = args[0];
      return pass === value ? true : textError.repeatPass;
    },
  },
  selectsValidation: {
    validate: (value) => {
      if (value === null) {
        return textError.checkValue;
      }
      return true;
    },
  },
  minMaxDateCheck: {
    validate: (value, min) => {
      if (!(min instanceof Date && !Number.isNaN(min))) {
        min = moment();
      }
      if (value) {
        const formatDate = moment(value.start || value).format('YYYY-MM-DD');
        if (
          (min && Date.parse(formatDate) >= Date.parse(min))
                    || (min === undefined)
        ) {
          return true;
        }
      }
      if (min !== undefined && min[0] !== undefined && min !== null) {
        return textError.minDate + moment(min, 'YYYY-MM-DD').format('DD.MM.YYYY');
      }
      return true;
    },
  },
};
