import moment from 'moment';
import api from "@/helpers/api";

export default {
    mixins: [api],
    methods: {
        declOfNum(num, expressions) {
            let result,
                count = num % 100;
            if (count >= 5 && count <= 20) {
                result = expressions['2'];
            } else {
                count = count % 10;
                if (count === 1) {
                    result = expressions['0'];
                } else if (count >= 2 && count <= 4) {
                    result = expressions['1'];
                } else {
                    result = expressions['2'];
                }
            }
            return result;
        },
        objectToFormDataJava(data) {
            const fData = new FormData()

            function appendFormData(data, root, formDataObj) {
                root = root || ''
                if (data instanceof File) {
                    formDataObj.append(root, data)
                } else if (Array.isArray(data)) {
                    for (let i = 0; i < data.length; i++) {
                        appendFormData(data[i], root, formDataObj)
                    }
                } else if (typeof data === 'object' && data) {
                    for (const key in data) {
                        // eslint-disable-next-line
                        if (data.hasOwnProperty(key)) {
                            if (root === '') {
                                appendFormData(data[key], key, formDataObj)
                            } else {
                                appendFormData(data[key], root + '.' + key, formDataObj)
                            }
                        }
                    }
                } else if (data !== null && typeof data !== 'undefined') {
                    formDataObj.append(root, data)
                }
            }

            appendFormData(data, '', fData)

            return fData
        },
        objectToFormData(data) {
            const fData = new FormData();

            function appendFormData(data, root, formDataObj) {
                root = root || ''
                if (data instanceof File) {
                    formDataObj.append(root, data);
                } else if (data instanceof Date) {
                    formDataObj.append(root, moment(data).format('YYYY-MM-DD'));
                } else if (Array.isArray(data)) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]) {
                            appendFormData(data[i], root + '[' + i + ']', formDataObj)
                        }
                    }
                } else if (typeof data === 'object' && data) {
                    for (const key in data) {
                        // eslint-disable-next-line
                        if (data.hasOwnProperty(key)) {
                            if (root === '') {
                                appendFormData(data[key], key, formDataObj)
                            } else {
                                appendFormData(data[key], root + '[' + key + ']', formDataObj)
                            }
                        }
                    }
                } else if (data !== null && typeof data !== 'undefined') {
                    formDataObj.append(root, data)
                }
            }

            appendFormData(data, '', fData)

            return fData
        },
        moveArrayElements(arr, index, toTheEnd) {
            const getSplicedElem = arr.splice(index, 1)
            if (toTheEnd) {
                arr.push(getSplicedElem[0])
            } else {
                arr.unshift(getSplicedElem[0])
            }
        },
        get(obj, path, defaultValue = undefined) {
            const travel = regexp =>
                String.prototype.split
                .call(path, regexp)
                .filter(Boolean)
                .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
            const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
            return result === undefined || result === obj ? defaultValue : result;
        },
        convertFileSize({ bytes, convertTo = 'bytes', round = 4, withPreffix = false }) {
            if (bytes === 0) {
                return 0;
            }

            convertTo = convertTo.toLowerCase()

            if (convertTo === 'bytes') {
                return bytes;
            }

            round = round <= 0 ? 0 : round;
            const convertTypes = { 'kb': 1, 'mb': 2, 'gb': 3, 'tb': 4, 'pb': 5, 'eb': 6, 'zb': 7, 'yb': 8 };
            const result = parseFloat((bytes / Math.pow(1024, convertTypes[convertTo])).toFixed(round))

            if (withPreffix) {
                return `${result} ${convertTo.toUpperCase()}`;
            } else {
                return result;
            }
        },
        scrollTo(el, offset = 0) {
            if (!el) return;
            window.scrollTo({
                top: window.scrollY + el.getBoundingClientRect().y - offset,
                behavior: "smooth"
            });
        },
        scrollToError() {
            const el = document.querySelector('.error');
            this.scrollTo(el, 60);
        },
        setWindowHash(hash) {
            if (history.pushState) {
                window.history.pushState(null, null, '#' + hash);
            } else {
                window.location.hash = '#' + hash;
            }
        },
        getStrRand(length = 32, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890') {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        },
        getAvatar(user = null) {
            let name = '';
            // user is string name OR object OR userID
            if (user) {
                if (user === parseInt(user, 10)) {
                    // user is userID
                    // todo получение пользователя
                    // this.fetchUserById(user)
                    //     .then((response) => {
                    //         console.log(response);
                    //         return response.data.data;
                    //     })
                    //     .catch((e) => {
                    //         console.log(e)
                    //     });
                }
                if (typeof user === 'string' && user.length) {
                    // если user строка - парсим её
                    user = user.split(' ');
                    if (user.length > 1) {
                        name = user[0].substring(0, 1) + user[1].substring(0, 1);
                    } else {
                        name = user[0].substring(0, 2);
                    }
                } else if (typeof user === 'object') {
                    // если user - объект
                    name = user.lastName.substring(0, 1) + user.name.substring(0, 1);
                }
            }
            if (!name.length) {
                // если не смогли получить пользователя - отдаём случайную строку ибо вообще не понятно что делать
                // name = this.getStrRand(2, 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЮЯ');
            }
            let color = this.getAvatarBackground(name, 120);
            return {
                name: name,
                color: color,
            };
        },
        getAvatarBackground(str, brightness) {
            function getChannel(code, brightness) {
                code = (code % 255) / 255;
                let r = 255 - brightness,
                    n = 0 | ((code * r) + brightness),
                    s = n.toString(16);
                return s.length === 1 ? '0' + s : s;
            }
            return '#' + getChannel(str.charCodeAt(0) || 120, brightness) + getChannel(str.charCodeAt(1) || 120, brightness) + getChannel(120, brightness);
        },
        nl2br(str) {
            return str.replace(/([^>])\n+/g, '$1<br/>');
        },
        printPage(url) {
            if (!url.length) return;
            window.openLoader();
            let frame = document.getElementById('print');
            if (!frame) {
                frame = document.createElement('frame');
                frame.setAttribute('name', 'print');
                frame.setAttribute('id', 'print');
                document.body.appendChild(frame);
                frame.onload = function() {
                    setTimeout(function() {
                        // todo печать страницы по url
                        // задержка нужна для того чтобы отработал vue.js
                        // решение так себе
                        // по хорошему надо передавать параметр печати и вызывать саму печать ВНУТРИ app
                        window.closeLoader();
                        frame.focus();
                        frame.contentWindow.print();
                    }, 5000);
                };
            }
            frame.setAttribute('src', url);
        },
        parseFilter(filter) {
            const newFilter = {};
            for (const keyC in filter) {
                if (!Array.isArray(filter[keyC])) {
                    newFilter[keyC] = filter[keyC];
                } else {
                    for (const key in filter[keyC]) {
                        if (
                            Array.isArray(filter[keyC][key]) ?
                            filter[keyC][key].length :
                            filter[keyC][key]
                        ) {
                            if (newFilter[keyC]) {
                                newFilter[keyC][key] = filter[keyC][key];
                            } else {
                                // newFilter[keyC] = {};
                                // newFilter[keyC][key] = filter[keyC][key];
                                newFilter[keyC] = [];
                                newFilter[keyC].push(filter[keyC][key]);
                            }
                        }
                    }
                }
            }
            // Форматирование дат
            if (newFilter.publication_date_from) {
                newFilter.publication_date_from = this.formatDateForFilter(
                    newFilter.publication_date_from,
                );
            }
            if (newFilter.publication_date_to) {
                newFilter.publication_date_to = this.formatDateForFilter(
                    newFilter.publication_date_to,
                );
            }
            return newFilter;
        },
        tradingFormatsList() {
            return [{
                    id: 'trading_223',
                    name: 'Торги по 223-ФЗ'
                },
                {
                    id: 'commercial_trading',
                    name: 'Коммерческие торги',
                },
            ];
        },
        getTradingFormat(format) {
            return this.tradingFormatsList().find((item) => { return item.id === format }).name || format;
        },
        tradingTypesList() {
            return [{
                    id: 'request_prices',
                    name: 'Запрос цен',
                },
                {
                    id: 'auction',
                    name: 'Аукцион',
                },
                {
                    id: 'request_offers',
                    name: 'Запрос предложений',
                },
                {
                    id: 'contest',
                    name: 'Конкурс',
                },
                {
                    id: 'purchase_from_supplier',
                    name: 'Закупка у единственного поставщика',
                },
                {
                    id: '',
                    name: 'Коммерческая закупка',
                }
            ];
        },
        getTradingType(type) {
            return this.tradingTypesList().find((item) => { return item.id === type }).name || type;
        },
        currenciesList() {
            return [{
                    id: 'rub',
                    name: 'Рубль',
                    symbol: '₽',
                },
                {
                    id: 'eur',
                    name: 'Евро',
                    symbol: '€',
                },
                {
                    id: 'usd',
                    name: 'Доллар',
                    symbol: '$',
                },
            ];
        },
        getCurrency(currency = 'rub') {
            currency = currency || 'rub';
            return this.currenciesList().find((item) => { return item.id === currency });
        },
        convertPrice(value, digits = 0) {
            let si = [
                    { value: 1, symbol: "" },
                    { value: 1E3, symbol: "тыс." },
                    { value: 1E6, symbol: "млн" },
                    { value: 1E9, symbol: "млрд." },
                ],
                rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
                i;
            for (i = si.length - 1; i > 0; i--) {
                if (value >= si[i].value) {
                    break;
                }
            }
            return (value / si[i].value).toFixed(digits).replace(rx, "$1") + "\u00A0" + si[i].symbol;
        },
        formatPrice(value = 0) {
            let decimalCount = 2,
                decimal = ".",
                thousands = " ";
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            const negativeSign = value < 0 ? "-" : "";
            let i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;
            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : "");
        },
        formatPriceWithCurrency(value = 0, currency = 'rub', convert = false) {
            const c = this.getCurrency(currency).symbol || currency;
<<<<<<< HEAD
            return (convert ? this.convertPrice(value) : this.formatPrice(value)) + ' ' + c;
=======
            return ((convert ? this.convertPrice(value) : this.formatPrice(value))+' '+c).replace(/\s/g, "\u00A0");
>>>>>>> e935567006122f3f50c09e017cefcca83c49db48
        },
        getMeasure(measure = 'm') {
            let result = '';
            switch (measure) {
                case 'unit':
                case 'item':
                    result = 'шт';
<<<<<<< HEAD
=======
                    break;
                case 'km':
                    result = 'км';
>>>>>>> e935567006122f3f50c09e017cefcca83c49db48
                    break;
                default:
                    result = 'м';
                    break;

            }
            return result;
        },
        formatDate(string) {
            var d = new Date(string),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear(),
                hour = '' + d.getHours(),
                minutes = '' + d.getMinutes();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            if (hour.length < 2)
                hour = '0' + hour;
            if (minutes.length < 2)
                minutes = '0' + minutes;

            var time = ' ' + hour + ':' + minutes;

            return [day, month, year].join('.') + time;
        },
    }
}