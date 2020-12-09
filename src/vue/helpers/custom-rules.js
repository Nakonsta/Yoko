import moment from "moment";

const textError = {
    requiredField: 'Поле обязательно для заполнения',
    numberField: 'Поле должно быть числом',
    checkValue: 'Выберите значение',
    rangeDates: 'Введите диапазон дат',
    rangeDatesStart: 'Начальная дата не должна быть позже конечной даты',
    emptyDate: 'Заполните предыдущие поля с датами',
    maxDate: 'Дата должна быть не больше ',
    minDate: 'Дата должна быть не меньше ',
}

export default {
    customPhone: {
        validate: value => {
            let number = value.split('(')[1].replace(/[+()-\s]/g, '')
            return number.length === 10 ? true : 'Поле некорректно заполнено'
        }
    },
    repeatPass: {
        validate: (value, args) => {
            let pass = args[0]
            return pass === value ? true : 'Пароли не совпадают'
        }
    },
    selectsValidation: {
        validate: (value) => {
            console.log(value)
            if (value === null) {
                return textError.checkValue
            }
            return true
        }
    },
    rangeDate(value) {
        if (value) {
            const datesArray = value.split(' - ')
            const setValueFirst = moment(datesArray[0], 'DD.MM.YYYY').format(
                'YYYY-MM-DD',
            )
            const setValueSec = moment(datesArray[1], 'DD.MM.YYYY').format(
                'YYYY-MM-DD',
            )
            if (Date.parse(setValueFirst) > Date.parse(setValueSec)) {
                return textError.rangeDatesStart
            }
            if (!!Date.parse(setValueFirst) && !!Date.parse(setValueSec)) {
                return true
            }
        }
        return textError.rangeDates
    },
    minMaxDateCheck: {
        validate: (value, min) => {
            console.log(moment(value).format('DD.MM.YYYY'), min)
            if (value) {
                const datesArray = moment(value).toDate().split(' - ')
                const setValue = moment(datesArray[0], 'DD.MM.YYYY').format(
                    'YYYY-MM-DD',
                )
                if (
                    (min && Date.parse(setValue) >= Date.parse(min)) ||
                    (min === undefined)
                ) {
                    return true
                }
            }
            if (min !== undefined && min !== null) {
                return textError.minDate + min
            }
            return true
        }
    },
}
