import moment from 'moment';
import api from '@/helpers/api';

export default {
  mixins: [api],
  methods: {
    declOfNum(num, expressions) {
      let result;
      let count = num % 100;
      if (count >= 5 && count <= 20) {
        result = expressions['2'];
      } else {
        count %= 10;
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
      const fData = new FormData();

      function appendFormData(d, root = '', formDataObj) {
        if (d instanceof File) {
          formDataObj.append(root, d);
        } else if (Array.isArray(d)) {
          for (let i = 0; i < d.length; i += 1) {
            appendFormData(d[i], root, formDataObj);
          }
        } else if (typeof d === 'object' && d) {
          for (const key in d) {
            // eslint-disable-next-line
                        if (d.hasOwnProperty(key)) {
              if (root === '') {
                appendFormData(d[key], key, formDataObj);
              } else {
                appendFormData(d[key], `${root}.${key}`, formDataObj);
              }
            }
          }
        } else if (d !== null && typeof d !== 'undefined') {
          formDataObj.append(root, d);
        }
      }

      appendFormData(data, '', fData);

      return fData;
    },
    objectToFormData(data) {
      const fData = new FormData();

      function appendFormData(d, root = '', formDataObj) {
        if (d instanceof File) {
          formDataObj.append(root, d);
        } else if (d instanceof Date) {
          formDataObj.append(root, moment(d).format('YYYY-MM-DD'));
        } else if (Array.isArray(d)) {
          for (let i = 0; i < d.length; i += 1) {
            if (d[i]) {
              appendFormData(d[i], `${root}[${i}]`, formDataObj);
            }
          }
        } else if (typeof d === 'object' && d) {
          for (const key in d) {
            // eslint-disable-next-line
                        if (d.hasOwnProperty(key)) {
              if (root === '') {
                appendFormData(d[key], key, formDataObj);
              } else {
                appendFormData(d[key], `${root}[${key}]`, formDataObj);
              }
            }
          }
        } else if (d !== null && typeof d !== 'undefined') {
          formDataObj.append(root, d);
        }
      }

      appendFormData(data, '', fData);

      return fData;
    },
    moveArrayElements(arr, index, toTheEnd) {
      const getSplicedElem = arr.splice(index, 1);
      if (toTheEnd) {
        arr.push(getSplicedElem[0]);
      } else {
        arr.unshift(getSplicedElem[0]);
      }
    },
    get(obj, path, defaultValue = undefined) {
      const travel = (regexp) => String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
      const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
      return result === undefined || result === obj ? defaultValue : result;
    },
    convertFileSize({
      bytes,
      convertTo = 'bytes',
      round = 4,
      withPreffix = false,
    }) {
      if (bytes === 0) {
        return 0;
      }

      if (convertTo.toLowerCase() === 'bytes') {
        return bytes;
      }

      const convertTypes = {
        kb: 1,
        mb: 2,
        gb: 3,
        tb: 4,
        pb: 5,
        eb: 6,
        zb: 7,
        yb: 8,
      };
      const result = parseFloat((bytes / Math.pow(1024, convertTypes[convertTo.toLowerCase()]))
        .toFixed(round <= 0 ? 0 : round));

      if (withPreffix) {
        return `${result} ${convertTo.toUpperCase()}`;
      }
      return result;
    },
    scrollTo(el, offset = 0) {
      if (!el) return;
      window.scrollTo({
        top: window.scrollY + el.getBoundingClientRect().y - offset,
        behavior: 'smooth',
      });
    },
    scrollToError() {
      const el = document.querySelector('.error');
      this.scrollTo(el, 60);
    },
    setWindowHash(hash) {
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${hash}`);
      } else {
        window.location.hash = `#${hash}`;
      }
    },
    getStrRand(length = 32, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890') {
      let result = '';
      for (let i = 0; i < length; i += 1) {
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
          const userName = user.split(' ');
          if (userName.length > 1) {
            name = userName[0].substring(0, 1) + userName[1].substring(0, 1);
          } else {
            name = userName[0].substring(0, 2);
          }
        } else if (typeof user === 'object') {
          // если user - объект
          name = user.lastName.substring(0, 1) + user.name.substring(0, 1);
        }
      }
      if (!name.length) {
        // если не смогли получить пользователя - отдаём случайную строку
        // ибо вообще не понятно что делать
        name = this.getStrRand(2, 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЮЯ');
      }
      const color = this.getAvatarBackground(name, 120);
      return {
        name,
        color,
      };
    },
    getAvatarBackground(str, brightness) {
      function getChannel(code) {
        const c = (code % 255) / 255;
        const r = 255 - brightness;
        const n = ((c * r) + brightness) || 0;
        const s = n.toString(16);
        return s.length === 1 ? `0${s}` : s;
      }
      return `#${getChannel(str.charCodeAt(0) || 120)}${getChannel(str.charCodeAt(1) || 120)}${getChannel(120)}`;
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
        frame.onload = function () {
          setTimeout(() => {
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
              Array.isArray(filter[keyC][key])
                ? filter[keyC][key].length
                : filter[keyC][key]
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
        name: 'Торги по 223-ФЗ',
      },
      {
        id: 'commercial_trading',
        name: 'Коммерческие торги',
      },
      ];
    },
    getTradingFormat(format) {
      const f = this.tradingFormatsList().find((item) => item.id === format);
      return f && f.name ? f.name : format;
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
      },
      ];
    },
    getTradingType(type) {
      const t = this.tradingTypesList().find((item) => item.id === type);
      return t && t.name ? t.name : type;
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
      return this.currenciesList().find((item) => item.id === currency);
    },
    convertPrice(value, digits = 0) {
      const si = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'тыс.' },
        { value: 1E6, symbol: 'млн' },
        { value: 1E9, symbol: 'млрд.' },
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let i;
      for (i = si.length - 1; i > 0; i -= 1) {
        if (value >= si[i].value) {
          break;
        }
      }
      return `${(value / si[i].value).toFixed(digits).replace(rx, '$1')}\u00A0${si[i].symbol}`;
    },
    formatPrice(value = 0) {
      let decimalCount = 2;
      const decimal = '.';
      const thousands = ' ';
      decimalCount = Math.abs(decimalCount);
      decimalCount = Number.isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = value < 0 ? '-' : '';
      const i = parseInt(Math.abs(Number(value) || 0).toFixed(decimalCount), 10).toString();
      const j = (i.length > 3) ? i.length % 3 : 0;
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : '');
    },
    formatPriceWithCurrency(value = 0, currency = 'rub', convert = false) {
      const c = this.getCurrency(currency).symbol || currency;
      return (`${convert ? this.convertPrice(value) : this.formatPrice(value)} ${c}`).replace(/\s/g, '\u00A0');
    },
    getMeasure(measure = 'm') {
      let result = '';
      switch (measure) {
        case 'unit':
        case 'item':
          result = 'шт';
          break;
        case 'km':
          result = 'км';
          break;
        default:
          result = 'м';
          break;
      }
      return result;
    },
    getItemsCompanies(items) {
      console.log(items);
      if (!items || !items.length) return items;
      const companiesINN = [];
      items.forEach((item, index) => {
        if (items[index].participation_application
                    && items[index].participation_application.procedure
                    && items[index].participation_application.procedure.inn) {
          this.$set(items[index].participation_application.procedure, 'company', null);
          if (companiesINN.indexOf(items[index].participation_application.procedure.inn) === -1) {
            companiesINN.push(items[index].participation_application.procedure.inn);
          }
        }
      });
      if (companiesINN.length) {
        this.fetchCompaniesByINN(companiesINN)
          .then((response) => {
            const companies = response.data.data.elements;
            companies.forEach((company) => {
              items.forEach((item) => {
                if (parseInt(company.inn, 10) === parseInt(item.participation_application.procedure.inn, 10)) {
                  item.participation_application.procedure.company = company;
                }
              });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
      return items;
    },
    openPopupById(id) {
      window.openPopupById(id);
    },
    diffDays(startDate, endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      if (end <= start) {
        return 0;
      }
      return (end - start) / (60 * 60 * 24 * 1000) - 1;
    },
    diffDaysWorking(startDate, endDate, production_calendar = []) {
      if (startDate === undefined || endDate === undefined) {
        return 0;
      }
      const start = moment(startDate);
      const end = moment(endDate);
      if (end <= start) {
        return 0;
      }
      // разница между датами в днях
      let days = this.diffDays(start, end);
      // вычитаем субботы и воскресенья
      days -= Math.floor(days / 7) * 2;
      // дополнительная проверка на субботу и воскресение
      const startDay = start.isoWeekday();
      const endDay = end.isoWeekday();
      // убираем субботу и воскресение, которые, возможно, не убраны ДО этого
      // if (startDay - endDay > 1) {
      //   days -= 2;
      //   console.log(`days1=${days}`);
      // }
      // если начало - воскресение, а конец ДО субботы
      if (startDay === 7 && endDay !== 6) {
        days -= 1;
      }
      // если конец - суббота, а начало ПОСЛЕ воскресения
      if (endDay === 6 && startDay !== 7) {
        days -= 1;
      }
      if (production_calendar && production_calendar.length) {
        production_calendar.forEach((date) => {
          const day = moment(date);
          if ((day >= start) && (day <= end)) {
            if (day.isoWeekday() !== 6 && day.isoWeekday() !== 7) {
              // если не суббота и не воскесенье тогда вычитаем
              days -= 1;
            } else {
              // если суббота или воскесенье тогда добавляем (рабочий выходной)
              days += 1;
            }
          }
        });
      }
      return days;
    },
    addDaysWorking(startDate, add = 0, production_calendar = [], returnMoment = false) {
      if (!add) {
        return startDate;
      }
      const date = moment(startDate);
      let i = add;
      do {
        date.add(1, 'days');
        const endDate = date.format('YYYY-MM-DD 00:00:00');
        if (production_calendar.indexOf(endDate) !== -1) {
          // если дата есть в календаре
          if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
            // и это не суббота или воскресенье - добавляем ещё день
          } else {
            i -= 1;
          }
        } else if (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
          // и это суббота или воскресенье - добавляем ещё день
        } else {
          i -= 1;
        }
      } while (i > 0);
      if (returnMoment) {
        return date;
      }
      return date.format('YYYY-MM-DD 00:00:00');
    },
  },
};
