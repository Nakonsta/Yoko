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
    }
}
