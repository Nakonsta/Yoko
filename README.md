## Для работы авторизации на всех поддоменах небходимо добавить записи в файлы о домене, на котором находится проект

На момент проектирования домен был ec.extyl.pro  

**Файл .env**  
AUTH_DOMAIN=ec.extyl.pro  

**Для локальной работы**  
**Файл hosts windows**  
127.0.0.1 ec.extyl.pro
**Файл hosts mac os**  
sudo vi /etc/hosts, далее I, далее вставить строчку и сохранить через Esc:w

Домены должны одинаковые  
После этого работать с авторизацией на ec.extyl.pro

## Роли пользователей хранятся вo vuex 
Получить текущую роль пользователя можно тут this.$store.getters.userRole  

Роли:  
**buyer** - Заказчик  
**contractor** - Поставщик  
**guest** - Гость

Геттеры компании Заказчика/Поставщика:  
**this.$store.getters.companyBuyer** - компании Заказчика  
**this.$store.getters.companyContractor** - компании Поставщика

## Запуск и остановка глобального прелоадера
**openLoader** - Запуск  
**closeLoader** - Остановка

## Нотификации
**notificationSuccess(text)** - Нотификация успеха  
**notificationError(text)** - Нотификация ошибки

## Кастомная валидация для ValidationProvider
Кастомные роли валидации лежат в /src/vue/helpers/custom-rules.js

Образец применения: `:rules="{ customPhone: true }"`
    
    <ValidationProvider name="Телефон" v-slot="{ errors, failed }" :rules="{ required: true, customPhone: true }" tag="label" class="field__container">

## Вспомогательные функции в helpers/functions.js
**tradingFormatsList()** - Список объектов с описанием всех возможных форматов процедур  
**getTradingFormat(format)** - Получение объекта с описанием формата процедуры
**tradingTypesList()** - Список объектов с описанием всех возможных типов процедур (если что - дополняйте)  
**getTradingType(type)** - Получение объекта с описанием типа процедуры  
**currenciesList()** - Список объектов с описанием всех возможных валют  
**getCurrency(currency)** - Получение объекта с описанием валюты
**convertPrice(value, digits)** - Форматирование числа в текстовое млрд., млн, тыс.  
**formatPrice(value)** - Форматирование суммы  
**formatPriceWithCurrency(value, currency, convert = false)** - Форматирование суммы + добавление символа валюты  
**getMeasure(measure)** - получаем единицу измерения в нормальном виде
**scrollTo(element, offset = 0)** - плавная прокрутка страницы к элементу. offset - смещение  
**scrollToError()** - плавная прокрутка к первому элементку .error     
**setWindowHash(hash)** - установка hash у страницы  
**getAvatar()** - получаение объекта аватара пользователя: имя и фоновый цвет   

## Хлебные крошки в ЛК
Применять в хуке created
```
created() {
    this.$store.commit('setCrumbs', [
      {
        name: 'Пользователи',
        link: '/',
      },
    ]);
}
```