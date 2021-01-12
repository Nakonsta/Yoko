<template>
    <div class="section section--green section--customers-slider customers-slider">
        <div class="container">
            <div class="section__head">
                <div class="section__title">Выберите удостоверяющий центр</div>
            </div>
            <div class="info-slider__items js-slider">
                <template v-for="item in providers">
                    <a :href="$store.state.auth.loggedIn ? '/personal/' : '#singin'" :class="{'info-slider__item': true, 'popup-link': !$store.state.auth.loggedIn}">
                        <div class="info-slider__icon">
                            <template v-if="item.icon">
                                <div v-html="item.icon"></div>
                            </template>
                            <template v-else>
                                <svg :class="'sprite-info-slider-'+item.sprite"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'/img/sprite.svg#info-slider-'+item.sprite" /></svg>
                            </template>
                        </div>
                        <div class="typography typography--accent" v-html="item.title"></div>
                        <template v-if="Array.isArray(item.desc)">
                            <ul class="list--bullet">
                                <li v-for="desc in item.desc">{{ desc }}</li>
                            </ul>
                        </template>
                        <template v-else>
                            <p>{{ item.desc }}</p>
                        </template>
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import api from './helpers/api'
import {initSliderInfo} from '../assets/js/main/modules/slider-info.js'

export default {
    name: 'DigitalSignatureProviders',

    mixins: [api],

    data() {
        return {
            providers: [],
        }
    },

    created() {
        this.providers = [
            {
                sprite: 'token',
                title: 'CБИС',
                desc: [
                    'стабильная работа с 2010 года',
                    'любые типы закупочных процедур',
                    'более 500 000 поставщиков',
                ],
            },
            {
                sprite: 'token',
                title: 'КОНТУР',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            },
            {
                sprite: 'token',
                title: 'КОРУС',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            },
        ];
    },

    mounted() {
        initSliderInfo(this.$el);
    },

    methods: {}
}
</script>