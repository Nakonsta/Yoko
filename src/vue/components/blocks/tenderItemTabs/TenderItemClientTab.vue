<template>
    <div class="tender-item__tab-inner">
        <div class="tender-item__tab-block">
            <div class="tender-item__tab-rows">
                <div class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name tender-item__tab-row-name--company">
                        {{ company.shortName ? company.shortName : company.name }}
                    </div>
                    <div v-if="company.rating" class="tender-item__tab-row-value tender-item__tab-row-value--flex">
                        <svg class="tender-item__tab-row-svg" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M11 21C8.34783 21 5.8043 19.9464 3.92893 18.0711C2.05357 16.1957 1 13.6522 1 11" stroke="#31ACB8" stroke-width="2" stroke-miterlimit="10"/>
                            <path d="M1 11C1 9.02219 1.58649 7.08879 2.6853 5.4443C3.78412 3.79981 5.3459 2.51809 7.17316 1.76121C9.00042 1.00433 11.0111 0.8063 12.9509 1.19215C14.8907 1.578 16.6725 2.53041 18.0711 3.92894C19.4696 5.32746 20.422 7.10929 20.8078 9.0491C21.1937 10.9889 20.9957 12.9996 20.2388 14.8268C19.4819 16.6541 18.2002 18.2159 16.5557 19.3147C14.9112 20.4135 12.9778 21 11 21" stroke="#31ACB8" stroke-width="2" stroke-miterlimit="10"/>
                            <path d="M11.9369 5.78221L12.9569 7.83456C13.0289 7.97858 13.1354 8.1026 13.2668 8.19562C13.3982 8.28864 13.5506 8.3478 13.7104 8.36783L15.6208 8.61245C15.808 8.63728 15.9841 8.71576 16.1277 8.83842C16.2713 8.96108 16.3763 9.12269 16.4301 9.30373C16.4839 9.48477 16.4842 9.6775 16.4309 9.85868C16.3775 10.0399 16.2729 10.2017 16.1296 10.3248L14.6448 11.5846C14.5099 11.6982 14.4083 11.8461 14.3506 12.0128C14.2929 12.1794 14.2813 12.3585 14.317 12.5312L14.7818 14.7719C14.8205 14.9576 14.8043 15.1505 14.7354 15.3272C14.6665 15.5038 14.5477 15.6567 14.3935 15.7671C14.2393 15.8775 14.0563 15.9407 13.8669 15.949C13.6774 15.9574 13.4896 15.9105 13.3263 15.814L11.4892 14.7352C11.3387 14.6466 11.1673 14.5999 10.9926 14.5999C10.818 14.5999 10.6465 14.6466 10.4961 14.7352L8.66387 15.814C8.50058 15.9105 8.31278 15.9574 8.12331 15.949C7.93385 15.9407 7.75089 15.8775 7.59669 15.7671C7.44249 15.6567 7.3237 15.5038 7.25476 15.3272C7.18583 15.1505 7.16972 14.9576 7.2084 14.7719L7.67317 12.5312C7.70891 12.3585 7.69732 12.1794 7.63962 12.0128C7.58192 11.8461 7.48026 11.6982 7.34538 11.5846L5.87767 10.3395C5.73421 10.2159 5.62966 10.0535 5.57669 9.87173C5.52372 9.68999 5.5246 9.49679 5.57923 9.31554C5.63387 9.13429 5.7399 8.97278 5.88449 8.85059C6.02907 8.7284 6.206 8.65078 6.39382 8.62712L8.53178 8.38251C8.70178 8.36242 8.86354 8.29808 9.0009 8.19592C9.13826 8.09376 9.24641 7.95735 9.31456 7.80031L10.1634 5.84337C10.2361 5.67169 10.3564 5.52437 10.51 5.41874C10.6637 5.31312 10.8443 5.25359 11.0306 5.24716C11.217 5.24074 11.4013 5.28768 11.5618 5.38248C11.7224 5.47727 11.8525 5.61595 11.9369 5.78221Z" stroke="#31ACB8" stroke-width="2" stroke-miterlimit="10"/>
                        </svg>
                        Рейтинг надежности: {{ company.rating }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="company.directorFio || company.phone || company.email" class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Общая информация
            </div>
            <div class="tender-item__tab-rows">
                <div v-if="company.directorFio" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Генеральный директор
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.directorFio }}
                    </div>
                </div>
                <div v-if="company.directorFio" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Контактное лицо
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.directorFio }}
                    </div>
                </div>
                <div v-if="company.phone" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Контактный телефон
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.phone }}
                    </div>
                </div>
                <div v-if="company.email" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        E-mail
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.email }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tender-item__tab-block">
            <div class="tender-item__tab-title">
                Юридическая информация
            </div>
            <div class="tender-item__tab-rows">
                <div class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Полное названии организации
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.name }}
                    </div>
                </div>
                <div v-if="company.shortName" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Краткое название
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.shortName }}
                    </div>
                </div>
                <div v-if="company.inn" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        ИНН
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.inn }}
                    </div>
                </div>
                <div v-if="company.ogrn" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        ОГРН/ОГРНИП
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.ogrn }}
                    </div>
                </div>
                <div v-if="company.kpp" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        КПП
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.kpp }}
                    </div>
                </div>
                <div v-if="company.country && company.country.name" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Страна
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.country.name }}
                    </div>
                </div>
                <div v-if="company.address" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Адрес
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.address }}
                    </div>
                </div>
                <div v-if="company.mailingAddress" class="tender-item__tab-row">
                    <div class="tender-item__tab-row-name">
                        Почтовый индекс
                    </div>
                    <div class="tender-item__tab-row-value">
                        {{ company.mailingAddress }}
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'TenderItemClientTab',

    props: {
        company: {
            type: Object,
            required: true,
        }
    },
}
</script>