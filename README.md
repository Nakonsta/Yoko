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
**buyer** - Заказчик  
**contractor** - Поставщик
**guest** - Гость

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
