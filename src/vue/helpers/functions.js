export default {
    methods: {
        declOfNum(n, text_forms) {
            n = Math.abs(n) % 100;
            var n1 = n % 10;
            if (n > 10 && n < 20) {
                return text_forms[2];
            }
            if (n1 > 1 && n1 < 5) {
                return text_forms[1];
            }
            if (n1 == 1) {
                return text_forms[0];
            }
            return text_forms[2];
        },
        objectToFormData(data) {
            const fData = new FormData()

            function appendFormData(data, root, formDataObj) {
                root = root || ''
                if (data instanceof File) {
                    formDataObj.append(root, data)
                } else if (Array.isArray(data)) {
                    for (let i = 0; i < data.length; i++) {
                        appendFormData(data[i], root + '[' + i + ']', formDataObj)
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
        }
    }
}
