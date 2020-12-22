<template>
    <div v-if="this.rootData">
        <mark-info :root="rootData"></mark-info>
        <div class="tabs tabs--line js-tabs company__nav js-more">
            <ul class="js-more__items">
                <li
                    v-for="item in tabLinks"
                    :key="item.url"
                    @click="handleTabLinkClick(item.url)"
                    class="js-more__item"
                    :class="item.url === '#' + currentTab ? 'active' : ''"
                >
                    <a :href="item.url">{{ item.name }}</a>
                </li>
                <li class="js-more__btn hidden">
                    <button type="button" aria-haspopup="true" aria-expanded="false">
                        <svg class="sprite-dropdown">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#dropdown"></use>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
        <div class="tabs__content company__content" id="description" style="display: block;">
            <mark-description :root="rootData"></mark-description>
        </div>
        <div class="tabs__content company__content" id="markosize">
            <mark-mark-size :root="rootData" :lists="lists" :data-form="dataForm"></mark-mark-size>
        </div>
        <div class="tabs__content company__content" id="characters">
            <mark-characters :root="rootData.characters"></mark-characters>
        </div>
        <div class="tabs__content company__content" id="appointment">
            <mark-appointment :root="rootData"></mark-appointment>
        </div>
        <div class="tabs__content company__content" id="documents">
            <mark-documents :root="rootData.links"></mark-documents>
        </div>
        <div class="tabs__content company__content" id="analogs">
            <mark-analog :root="rootData.analogs"></mark-analog>
        </div>
        <div class="tabs__content company__content" id="manufacturer">
            <mark-manufacturer :root="rootData.manufacturer"></mark-manufacturer>
        </div>
        <div class="tabs__content company__content" id="additional">
            <mark-additional :root="rootData.companies" :lists="lists.companies" :data-form="dataForm"></mark-additional>
        </div>
    </div>
</template>

<script>
import api from './helpers/api';
import MarkInfo from './components/blocks/catalog-details/mark-info.vue'
import MarkDescription from './components/blocks/catalog-details/mark-description.vue'
import MarkMarkSize from './components/blocks/catalog-details/mark-marksize.vue'
import MarkCharacters from './components/blocks/catalog-details/mark-characters.vue'
import MarkAppointment from './components/blocks/catalog-details/mark-appointment.vue'
import MarkDocuments from './components/blocks/catalog-details/mark-documents.vue'
import MarkAnalog from './components/blocks/catalog-details/mark-analogs.vue'
import MarkManufacturer from './components/blocks/catalog-details/mark-manufacturer.vue'
import MarkAdditional from './components/blocks/catalog-details/mark-additional.vue'
import { initTabs } from '../assets/js/main/modules/more.js'

export default {
    name: 'MarkSizeDetails',
    components: {
        MarkInfo,
        MarkAnalog,
        MarkMarkSize,
        MarkDocuments,
        MarkCharacters,
        MarkDescription,
        MarkAppointment,
        MarkManufacturer,
        MarkAdditional,
    },
    props: {
        marksizeId: {
            type: Number,
            default: 6
        }
    },
    mixins: [api],
    data() {
        return {
            companyId: null,
            rootData: null,
            lists: {
                quantity: [
                    {
                        name: '1',
                        id: 1,
                    },
                    {
                        name: '2',
                        id: 2,
                    },
                ],
                section: [
                    {
                        name: '1',
                        id: 1,
                    },
                    {
                        name: '2',
                        id: 2,
                    },
                ],
                voltage: [
                    {
                        name: '1',
                        id: 1,
                    },
                    {
                        name: '2',
                        id: 2,
                    },
                ],
                companies: [
                    {
                        name: 'ПАО "Группа Компаний ПИК"',
                        id: 0,
                    }
                ]
            },
            dataForm: {
                quantity: null,
                section: null,
                voltage: null,
                company: null,
            },
            currentTab: "description",
            tabLinks: [
                {
                    name: "Описание",
                    url: "#description"
                },
                {
                    name: "Маркоразмеры",
                    url: "#markosize"
                },
                {
                    name: "Характеристики",
                    url: "#characters"
                },
                {
                    name: "Назначение",
                    url: "#appointment"
                },
                {
                    name: "Документация",
                    url: "#documents"
                },
                {
                    name: "Аналоги",
                    url: "#analogs"
                },
                {
                    name: "Производители",
                    url: "#manufacturer"
                },
                {
                    name: "Дополнительная информация",
                    url: "#additional"
                }
            ]
        }
    },
    created() {
        this.fillUserData();
        this.getMarksizeDetailData(this.marksizeId);
    },
    mounted() {
        initTabs()
    },
    methods: {
        fillUserData() {
            this.companyId = document.querySelector('.section--mark').getAttribute('data-id');
            return false;
        },
        prepareMarksizeDetailData() {
            this.rootData = {
                items: [
                    {
                        title: 'Описание кабеля:',
                        desc: 'Силовые кабели с медными жилами, с изоляцией и оболочкой из ПВХ пластиката',
                    },
                    {
                        title: 'Токопроводящая жила:',
                        desc: 'Медная, однопроволочная (ок) или многопроволочная, круглой (мк) или секторной формы (мс), 1 или 2 класса по ГОСТ 22483',
                    },
                    {
                        title: 'Изоляция:',
                        desc: 'ПВХ пластикат',
                    },
                    {
                        title: 'Экран:',
                        desc: 'без экрана',
                    },
                    {
                        title: 'Броня:',
                        desc: 'без брони',
                    },
                    {
                        title: 'Наружная оболочка:',
                        desc: 'ПВХ пластикат',
                    },
                ],
                characters: [
                    {
                        name: 'Токопроводящая жила:',
                        desc: 'медная'
                    },
                    {
                        name: 'Материал изоляции:',
                        desc: 'ПВХ пластикат'
                    },
                    {
                        name: 'Огнестойкое исполнение (FR):',
                        desc: 'нет'
                    },
                    {
                        name: 'Хладостойкое исполнение (ХЛ):',
                        desc: 'нет'
                    },
                    {
                        name: 'Экран:',
                        desc: 'без экрана'
                    },
                    {
                        name: 'Тип брони:',
                        desc: 'без брони'
                    },
                    {
                        name: 'Материал изоляции:',
                        desc: 'ПВХ пластикат'
                    },
                    {
                        name: 'Класс пожарной опасности:',
                        desc: 'О1.8.2.5.4'
                    },
                    {
                        name: 'Вид климатического исполнения по ГОСТ 15150-69:',
                        desc: 'ПВХ пластикат'
                    },
                    {
                        name: 'Диапазон температур эксплуатации, °С:',
                        desc: 'ПВХ пластикат'
                    },
                    {
                        name: 'Прокладка и монтаж кабелей без предварительного подогрева производится при температуре\n' +
                            'не ниже, °С:',
                        desc: '-15'
                    },
                    {
                        name: 'Испытательное переменное напряжение частотой 50 Гц, на напряжение 0,66 кВ:',
                        desc: '3 кВ'
                    },
                    {
                        name: 'Испытательное переменное напряжение частотой 50 Гц, на напряжение 1 кВ:',
                        desc: '3,5 кВ'
                    },
                    {
                        name: 'Минимальный радиус изгиба при прокладке и монтаже, одножильный кабель:',
                        desc: '10 наружных диаметров кабеля'
                    },
                    {
                        name: 'Минимальный радиус изгиба при прокладке и монтаже, многожильный кабель:',
                        desc: '7,5 наружных диаметров кабеля'
                    },
                    {
                        name: 'Длительно допустимая температура нагрева жил при эксплуатации, не более, °С:',
                        desc: '70'
                    },
                    {
                        name: 'Допустимые усилия при тяжении кабелей по трассе прокладки, не более:',
                        desc: '50 Н/мм2'
                    },
                    {
                        name: 'Строительная длина кабелей для сечения основных жил: до 16 мм2:',
                        desc: '450'
                    },
                    {
                        name: 'Строительная длина кабелей для сечения основных жил, от 25 до 70 мм2:',
                        desc: '300'
                    },
                    {
                        name: 'Строительная длина кабелей для сечения основных жил, от 95 мм2:',
                        desc: '200'
                    },
                    {
                        name: 'Гарантийный срок эксплуатации, лет:',
                        desc: '5'
                    },
                    {
                        name: 'Срок службы, лет:',
                        desc: '30'
                    }
                ],
                markoSize: [
                    {
                        id: 1,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 2,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 3,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 4,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 5,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 6,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 7,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 8,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 9,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 10,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 11,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 12,
                        name: 'ВВГ 1х1,5',
                    },
                    {
                        id: 13,
                        name: 'ВВГ 1х1,5',
                    }
                ],
                links: [
                    {
                        name: 'ГО00.RU.1348.Н00393',
                        link: '#',
                    },
                    {
                        name: 'ГО00.RU.1348.Н00393',
                        link: '#',
                    },
                    {
                        name: 'ГО00.RU.1348.Н00393',
                        link: '#',
                    },
                    {
                        name: 'ГО00.RU.1348.Н00393',
                        link: '#',
                    },
                    {
                        name: 'ГО00.RU.1348.Н00393',
                        link: '#',
                    }
                ],
                analogs: [
                    {
                        mark: 'ПВГ',
                        desc: 'Изоляция токопроводящих жил выполнена из полиэтилена высокого давления. Замена осуществляется после согласования с проектной организацией'
                    },
                    {
                        mark: 'ПВГ-П',
                        desc: 'Изоляция токопроводящих жил выполнена из полиэтилена высокого давления. Токопроводящие жилы уложены параллельно друг другу (кабель плоского исполнения). Замена допускается для кабелей 2 и 3 жильного исполнения с сечением жил до 16мм² после согласования с проектной организацией'
                    }
                ],
                manufacturer: [
                    {
                        name: 'ПАО «Группа компаний ПИК»',
                        ico: './content/catalog/pik.svg',
                        tags: ['поставщик', 'крупный бизнес'],
                        rating: {
                            rate: 9,
                            time: 9,
                            fav: 9,
                        }
                    },
                    {
                        name: 'ОАО «Волжская ТГК»',
                        ico: './content/catalog/tgk.svg',
                        tags: ['поставщик', 'средний бизнес'],
                        rating: {
                            rate: 9,
                            time: 9,
                            fav: 9,
                        }
                    },
                    {
                        name: 'АО «Тандер»',
                        ico: './content/catalog/tander.svg',
                        tags: ['поставщик', 'крупный бизнес'],
                        rating: {
                            rate: 9,
                            time: 9,
                            fav: 9,
                        }
                    },
                    {
                        name: 'ПАО «Мегафон»',
                        ico: './content/catalog/megafon.svg',
                        tags: ['поставщик', 'средний бизнес'],
                        rating: {
                            rate: 9,
                            time: 9,
                            fav: 9,
                        }
                    },
                ],
                companies: [
                    {
                        id: 1,
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
                        images: ['./content/catalog/cat-1.jpg', './content/catalog/cat-2.jpg', './content/catalog/cat-3.jpg', './content/catalog/cat-4.jpg', './content/catalog/cat-5.jpg', './content/catalog/cat-6.jpg']
                    }
                ]
            }
        },
        handleTabLinkClick(link) {
            if (link) {
                this.currentTab = link.replace("#", "").trim();
                let elLink = document.getElementById(this.currentTab);
                /**
                 * На табы вешается какой-то js обработчик извне, который не дает показывать контент таба по клику.
                 * пришлось пока сдлеать через setTimout с нулевой задержкой.
                 */
                setTimeout(function () {
                    elLink.style.display = "block";
                }, 0);
            }
        },
        getMarksizeDetailData(id) {
            this.fetchMarksizeDetail(id).then((response) => {
                const marksizeDetailData = response.data.data;
                console.log("Response marksize detail", marksizeDetailData);
                this.prepareMarksizeDetailData();
                this.rootData.images = marksizeDetailData.images;
            })
        }
    }
}
</script>
<style scoped lang="scss">
.tabs.tabs--line {
    //overflow: hidden;
}
#manufacturer,
#documents {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    background: transparent;
}
</style>
