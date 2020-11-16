export default {
    customPhone: {
        validate: value => {
            let number = value.split('(')[1].replace(/[+()-\s]/g, '')
            return number.length === 10 ? true : 'Поле некорректно заполнено'
        }
    }
}