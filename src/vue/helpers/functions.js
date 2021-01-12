import moment from 'moment';

export default {
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
        convertFileSize({bytes, convertTo = 'bytes', round = 4, withPreffix = false}) {
            if (bytes === 0) {
                return 0;
            }

            convertTo = convertTo.toLowerCase()

            if (convertTo === 'bytes') {
                return bytes;
            }

            round = round <= 0 ? 0 : round;
            const convertTypes = {'kb': 1,'mb': 2,'gb': 3,'tb': 4,'pb': 5,'eb': 6,'zb': 7,'yb': 8};
            const result = parseFloat((bytes / Math.pow(1024,convertTypes[convertTo])).toFixed(round))

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
            for ( let i=0; i<length; i++ ) {
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
            function randomChannel(code, brightness){
                code = (code % 255) / 255;
                let r = 255-brightness,
                    n = 0|((code * r) + brightness),
                    s = n.toString(16);
                return s.length===1 ? '0'+s : s;
            }
            return '#' + randomChannel(str.charCodeAt(0)||120, brightness) + randomChannel(str.charCodeAt(1)||120, brightness) + randomChannel(120, brightness);
        },
        nl2br(str) {
            return str.replace(/([^>])\n+/g, '$1<br/>');
        },
    }
}
