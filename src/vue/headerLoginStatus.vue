<template>
    <div>
        <div v-if="$store.state.auth.loggedIn" class="switch-box-container switch-box-container--mobile">
            <span class="switch-box-false-name">
                Заказчик
            </span>
            <label class="switch-box">
                <input class="switch-box" type="checkbox">
                <span class="switch-box__body">
                    <span class="switch-box__switch"></span>
                </span>
            </label>
            <span class="switch-box-true-name">
                Поставщик
            </span>
        </div>
        <div v-if="$store.state.auth.loggedIn" class="user-info">
            <div class="user-info__info">
                <div class="user-info__name">
                    {{ $store.state.auth.user.company.name }}
                </div>
                <div class="user-info__id">
                    № {{ $store.state.auth.user.company.id }}
                </div>
                <div class="user-info__time">
                    {{ hours }}<span class="user-info__time-dots">:</span>{{ minutes }} MSK
                </div>
            </div>
            <div class="user-info__menu">
                <div class="user-info__menu-item">
                    <a href="#">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 17.819H19.5714L22.8286 21.5904C23.0286 21.819 23.3143 21.9618 23.6286 21.9618C24.2 21.9618 24.6857 21.5047 24.6857 20.9047V17.819H25.4C26.8286 17.819 28 16.6475 28 15.219V4.93325C28 3.50468 26.8286 2.33325 25.4 2.33325H8C6.57143 2.33325 5.4 3.50468 5.4 4.93325V15.219C5.42857 16.6475 6.57143 17.819 8 17.819ZM6.85714 4.96182C6.85714 4.30468 7.37143 3.7904 8.02857 3.7904H25.4286C26.0857 3.7904 26.6 4.30468 26.6 4.96182V15.2475C26.6 15.9047 26.0857 16.419 25.4286 16.419H24C23.6 16.419 23.2857 16.7333 23.2857 17.1333V19.9047L20.4857 16.6475C20.3429 16.5047 20.1429 16.3904 19.9429 16.3904H8C7.34286 16.3904 6.82857 15.8761 6.82857 15.219V4.96182H6.85714ZM8.42857 22.0475L5.17143 25.819C4.97143 26.0475 4.68571 26.1904 4.37143 26.1904C4.25714 26.1904 4.11429 26.1618 4 26.1333C3.57143 25.9904 3.31429 25.5904 3.31429 25.1618V22.0475H2.6C1.17143 22.0475 0 20.8761 0 19.4475V9.16182C0 7.73325 1.17143 6.56182 2.6 6.56182C3 6.56182 3.31429 6.87611 3.31429 7.27611C3.31429 7.67611 3 7.9904 2.6 7.9904C1.94286 7.9904 1.42857 8.50468 1.42857 9.16182V19.4475C1.42857 20.1047 1.94286 20.619 2.6 20.619H4.02857C4.42857 20.619 4.74286 20.9333 4.74286 21.3333V24.1047L7.54286 20.8475C7.68571 20.7047 7.88571 20.5904 8.08571 20.5904H18.6C19 20.5904 19.3143 20.9047 19.3143 21.3047C19.3143 21.7047 19 22.019 18.6 22.019H8.42857V22.0475ZM15.7429 10.3333C15.7429 9.7904 16.1714 9.36182 16.7143 9.36182C17.2571 9.36182 17.6857 9.7904 17.6857 10.3333C17.6857 10.8761 17.2571 11.3047 16.7143 11.3047C16.1714 11.3047 15.7429 10.8761 15.7429 10.3333ZM12.5143 10.3333C12.5143 9.7904 12.9429 9.36182 13.4857 9.36182C14.0286 9.36182 14.4571 9.7904 14.4571 10.3333C14.4571 10.8761 14.0286 11.3047 13.4857 11.3047C12.9429 11.3047 12.5143 10.8761 12.5143 10.3333ZM18.9714 10.3333C18.9714 9.7904 19.4 9.36182 19.9429 9.36182C20.4857 9.36182 20.9143 9.7904 20.9143 10.3333C20.9143 10.8761 20.4857 11.3047 19.9429 11.3047C19.4 11.3047 18.9714 10.8761 18.9714 10.3333Z" fill="#31ACB8"/>
                        </svg>
                    </a>
                    <div class="user-info__menu-counter">
                        3
                    </div>
                </div>
                <div class="user-info__menu-item">
                    <a href="#">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.7045 25.9841C17.3605 25.9841 16.0725 25.6761 14.8685 25.0881H14.8405H14.8125C13.2725 25.6761 11.4805 25.9841 9.57655 25.9841C7.28055 25.9841 5.06855 25.5361 3.41655 24.6961C1.56855 23.7721 0.560547 22.4841 0.560547 21.0561V6.66411C0.728547 5.32011 1.82055 4.03211 3.41655 3.30411C5.06855 2.46411 7.28055 2.01611 9.57655 2.01611C11.9005 2.01611 14.0845 2.46411 15.7365 3.30411C16.7165 3.80811 18.3685 4.90011 18.5925 6.66411C18.5925 6.86011 18.5925 7.05611 18.5925 7.25211C18.5925 7.56011 18.5925 7.89611 18.5925 8.42811V8.51212H18.6765C23.5205 8.51212 27.4405 12.4321 27.4405 17.2481C27.4405 22.0641 23.5205 25.9841 18.7045 25.9841ZM18.7045 10.1081C14.7845 10.1081 11.5925 13.3001 11.5925 17.2201C11.5925 21.1401 14.7845 24.3321 18.7045 24.3321C22.6245 24.3321 25.8165 21.1401 25.8165 17.2201C25.8165 13.3281 22.6245 10.1081 18.7045 10.1081ZM2.18455 21.0561C2.18455 21.8121 2.91255 22.5961 4.14455 23.2401C5.57255 23.9681 7.56055 24.3601 9.60455 24.3601C10.7525 24.3601 11.9285 24.2201 12.9925 23.9681L13.1325 23.9401L13.0205 23.8561C12.4885 23.4081 12.0405 22.9041 11.6485 22.3721L11.6205 22.3441H11.5925C10.9205 22.4281 10.2765 22.4561 9.63255 22.4561C7.30855 22.4561 5.12455 22.0081 3.44455 21.1681C3.05255 20.9721 2.66055 20.7481 2.32455 20.4961L2.21255 20.4121V21.0561H2.18455ZM2.18455 17.5281C2.18455 18.2841 2.88455 19.0961 4.14455 19.7121C5.57255 20.4121 7.56055 20.8321 9.60455 20.8321C9.94055 20.8321 10.2765 20.8321 10.6405 20.8041H10.7525L10.7245 20.7201C10.5005 20.1881 10.3045 19.6001 10.1925 19.0121V18.9561H10.1365C9.96855 18.9561 9.80055 18.9561 9.66055 18.9561C7.36455 18.9561 5.15255 18.5081 3.50055 17.6681C3.08055 17.4721 2.68855 17.2201 2.38055 16.9961L2.26855 16.9121V17.5281H2.18455ZM2.18455 14.0001C2.18455 14.7561 2.88455 15.5681 4.14455 16.1841C5.57255 16.8841 7.56055 17.3041 9.60455 17.3041H9.80055C9.82855 17.3041 9.96855 17.3041 9.96855 17.3041V17.2481C9.96855 16.6601 10.0245 16.0721 10.1645 15.4841L10.1925 15.4001H10.0805C9.91255 15.4001 9.77255 15.4001 9.60455 15.4001C7.28055 15.4001 5.09655 14.9521 3.41655 14.1121C3.02455 13.9161 2.63255 13.6921 2.29655 13.4401L2.18455 13.3561V14.0001ZM2.18455 10.4721C2.18455 11.2281 2.88455 12.0401 4.14455 12.6561C5.57255 13.3561 7.56055 13.7761 9.60455 13.7761C9.96855 13.7761 10.3325 13.7761 10.6685 13.7481H10.7245L10.7525 13.7201C11.0605 13.0481 11.4245 12.4321 11.8725 11.8721L11.9845 11.7321H11.7605C11.0325 11.8161 10.3045 11.8721 9.60455 11.8721C7.28055 11.8721 5.09655 11.4241 3.44455 10.5841C3.02455 10.3881 2.63255 10.1361 2.29655 9.88411L2.18455 9.80011V10.4721ZM9.60455 3.66811C7.56055 3.66811 5.57255 4.08811 4.14455 4.78811C3.02455 5.34811 2.29655 6.07611 2.18455 6.77611C2.18455 7.92411 3.05255 8.45611 3.92055 8.98811L4.11655 9.12811C5.54455 9.85611 7.56055 10.2481 9.57655 10.2481C11.6205 10.2481 13.6085 9.82811 15.0365 9.12811C15.5405 8.87611 17.1085 7.98011 16.9685 6.72011C16.8285 6.04811 16.1005 5.34811 15.0365 4.78811C13.6365 4.06011 11.6485 3.66811 9.60455 3.66811Z" fill="#31ACB8"/>
                        </svg>
                    </a>
                </div>
                <div class="user-info__menu-item user-info__menu-item--sub">
                    <a :href="$store.state.env.LK_SUPP">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.1322 27.4401C11.0602 27.4401 6.94425 27.1041 2.66025 24.9201L2.18425 24.6681L2.12825 24.1641C1.68025 19.8521 2.88425 18.5641 3.13625 18.3401L3.16425 18.3121C3.75225 17.8641 4.56425 17.5281 4.84425 17.4721H4.87225H4.92825C7.05625 16.9121 9.35225 15.4561 9.54825 15.3161L9.57625 15.2881C9.74425 15.1761 9.91225 15.1201 10.1082 15.1201C10.4442 15.1201 10.7522 15.2881 10.9202 15.5681C11.2002 16.0161 11.0882 16.6041 10.6122 16.9121C10.6122 16.9121 10.5282 16.9681 10.4722 16.9961C8.06425 18.4521 6.35625 19.0961 5.34825 19.3481C5.06825 19.4601 4.64825 19.6001 4.39625 19.7961C4.22825 20.0481 3.78025 21.0281 3.92025 23.5201C7.67225 25.3121 11.2282 25.5921 13.0482 25.5921H14.8402C16.2962 25.5921 20.0482 25.3961 23.9682 23.5201C24.1642 20.8881 23.6322 19.9641 23.5202 19.7961C23.2402 19.6001 22.7922 19.4321 22.5402 19.3481C20.1322 18.7321 17.5282 17.0801 17.3042 16.9121C16.8562 16.6321 16.7442 16.0441 17.0242 15.5961C17.1922 15.3161 17.5002 15.1481 17.8362 15.1481C18.0322 15.1481 18.2002 15.2041 18.3682 15.3161L18.3962 15.3441C18.7322 15.5681 21.0002 16.9681 23.0162 17.5001H23.1002L23.2402 17.5561C23.5482 17.6681 24.3042 17.9481 24.8362 18.3681L24.8642 18.3961C25.0882 18.5641 26.3202 19.7961 25.9002 24.2201L25.8442 24.7241L25.3962 24.9201C21.4202 26.9361 17.5002 27.4121 14.8962 27.4401H13.1322ZM13.7762 15.3441C12.4602 15.3441 11.3122 14.8961 10.3602 13.9721C8.48425 12.0401 8.28825 8.76406 8.31625 7.44806V7.39206C8.28825 4.92806 8.93225 3.08006 10.2482 1.87606C11.5922 0.700059 13.1602 0.560059 13.7482 0.560059C13.8602 0.560059 13.9442 0.560059 14.0002 0.560059C14.0562 0.560059 14.1402 0.560059 14.2522 0.560059C14.8682 0.560059 16.4082 0.700059 17.7242 1.87606C19.0402 3.10806 19.6842 4.95606 19.6562 7.39206C19.6562 7.42006 19.8802 11.6761 17.6122 13.9721C16.7162 14.8961 15.5402 15.3721 14.1122 15.3721H14.0002C13.9162 15.3441 13.8602 15.3441 13.7762 15.3441ZM13.7762 2.49206C13.4682 2.49206 12.3762 2.54806 11.5362 3.33206C10.6402 4.17206 10.1922 5.54406 10.2202 7.42006V7.44806C10.2202 7.81206 10.1642 11.0321 11.6762 12.6281C12.2082 13.1881 12.9082 13.4681 13.8042 13.4681C13.8602 13.4681 13.8882 13.4681 13.9442 13.4681C14.9242 13.4681 15.6522 13.1881 16.2402 12.6281C17.7802 11.0601 17.7522 7.84006 17.7242 7.47606V7.42006C17.7522 5.51606 17.3042 4.14406 16.4082 3.33206C15.5682 2.54806 14.4762 2.49206 14.1682 2.49206C14.0842 2.49206 14.0562 2.49206 14.0562 2.49206H13.8882C13.8882 2.49206 13.8322 2.49206 13.7762 2.49206Z" fill="#31ACB8"/>
                        </svg>
                    </a>
                    <div class="user-info__submenu">
                        <div class="switch-box-container">
                            <span class="switch-box-false-name">
                                Заказчик
                            </span>
                            <label class="switch-box">
                                <input class="switch-box" type="checkbox">
                                <span class="switch-box__body">
                                <span class="switch-box__switch"></span>
                            </span>
                            </label>
                            <span class="switch-box-true-name">
                                Поставщик
                            </span>
                        </div>
                        <div class="user-info__submenu-menu">
                            <a href="#" class="user-info__submenu-item">Личные данные</a>
                            <a href="#" class="user-info__submenu-item">Уведомления</a>
                            <a href="#" class="user-info__submenu-item">Чат</a>
                            <a href="#" class="user-info__submenu-item">Подписки</a>
                            <a href="#" class="user-info__submenu-item">Журнал действий</a>
                            <a href="#" class="user-info__submenu-item">Журнал посещений</a>
                            <a href="#" class="user-info__submenu-item" @click="logout">Выход</a>
                        </div>
                    </div>
                </div>
              <div class="user-info__menu-item user-info__menu-item--logout">
                <a href="#" @click="logout">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.45193 27.4401C2.68793 27.4401 1.23193 25.9841 1.23193 24.2201V3.78006C1.23193 2.01606 2.68793 0.560059 4.45193 0.560059H13.6079C15.3999 0.560059 16.8279 2.01606 16.8279 3.78006V8.06406C16.8279 8.23206 16.7719 8.37206 16.6599 8.48406C16.5479 8.59606 16.4079 8.68006 16.2399 8.68006H15.5119C15.1759 8.68006 14.9239 8.42806 14.9239 8.09206V4.50806C14.9239 3.38806 13.9999 2.46406 12.8799 2.46406H5.17993C4.05993 2.46406 3.13593 3.38806 3.13593 4.50806V23.4921C3.13593 24.6121 4.05993 25.5361 5.17993 25.5361H12.8799C13.9999 25.5361 14.9239 24.6121 14.9239 23.4921V19.7681C14.9239 19.4321 15.1759 19.1801 15.5119 19.1801H16.2399C16.5759 19.1801 16.8279 19.4321 16.8279 19.7681V24.2201C16.8279 25.9841 15.3999 27.4401 13.6079 27.4401H4.45193Z" fill="#31ACB8"/>
                    <path d="M20.9158 19.9919C20.7478 19.9919 20.6078 19.9359 20.4958 19.8239L19.9918 19.3199C19.8798 19.2079 19.8238 19.0679 19.8238 18.8999C19.8238 18.7319 19.8798 18.5919 19.9918 18.4799L23.6038 14.8679H10.5558C10.2198 14.8679 9.96777 14.6159 9.96777 14.2799V13.5519C9.96777 13.2159 10.2198 12.9639 10.5558 12.9639H23.6038L19.9918 9.37992C19.7678 9.15592 19.7678 8.76392 19.9918 8.53992L20.4958 8.03592C20.6078 7.92392 20.7478 7.86792 20.9158 7.86792C21.0838 7.86792 21.2238 7.92392 21.3358 8.03592L26.2358 12.9359C26.5438 13.2439 26.7678 13.7199 26.7678 13.9439C26.7678 14.1679 26.5718 14.6159 26.2638 14.9239L21.3358 19.8239C21.2238 19.9359 21.0838 19.9919 20.9158 19.9919Z" fill="#31ACB8"/>
                  </svg>
                </a>
              </div>
            </div>
        </div>
        <div v-if="!$store.state.auth.loggedIn" class="header__login">
            <a class="header__singin popup-link" href="#singin">Войти</a>
            <a class="header__registration" :href="`${$store.state.env.LK_SUPP}/registration`">Регистрация</a>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: 'UserInfo',
        created() {
            this.startTime()
        },
        data() {
          return {
              hours: null,
              minutes: null,
          }
        },
        methods: {
            logout() {
                this.$store.commit('logout', {
                  reload: true,
                  mute: false,
                })
            },
            startTime() {
                const timestamp = document.body.getAttribute('data-timestamp')
                let time = moment()
                if (timestamp) {
                    time = moment.unix(timestamp)
                }
                setInterval(() => {
                    time.add(2, 'seconds')
                    this.hours = time.format('H')
                    this.minutes = time.format('mm')
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/sass/variables/variables";
    @import "../assets/sass/variables/fluid-variables";
    @import "../assets/sass/mixins/fluid-mixin";

    .user-info {
        display: flex;
        font-family: "Gilroy-SemiBold", sans-serif;
        align-items: center;
        @media(max-width: 1588px) {
            display: block;
        }
        @media(max-width: 1250px) {
            max-width: 20rem;
        }
        @media(max-width: 1000px) {
            max-width: 14rem;
        }
        &__time-dots {
            /*animation: blink 1s infinite;*/
        }
        &__info {
            display: flex;
            align-items: center;
            @media(max-width: 1250px) {
                flex-wrap: wrap;
                justify-content: flex-end;
            }
        }
        &__name {
            font-weight: 600;
            font-size: rem(18px);
            line-height: 160%;
            max-width: 25rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            @media(max-width: 1776px) {
                max-width: 15rem;
            }
            @media(max-width: 1588px) {

            }
            @media(max-width: 1250px) {
                max-width: none;
                width: 100%;
                text-align: right;
            }
        }
        &__id {
            font-weight: 600;
            font-size: rem(18px);
            line-height: 160%;
            margin-left: rem(24px);
        }
        &__time {
            font-weight: 600;
            font-size: rem(18px);
            line-height: 160%;
            margin-left: rem(24px);
        }
        &__menu {
            display: flex;
            align-items: center;
            @media(max-width: 1588px) {
                justify-content: flex-end;
                margin-top: rem(5px);
            }
        }
        &__menu-counter {
            transition: .3s background-color;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            right: 0;
            width: rem(16px);
            height: rem(16px);
            border-radius: rem(50px);
            background-color: $colorCrimson;
            color: #fff;
            transform: translate(50%, -25%);
            font-size: 10px;
            line-height: 12px;
            font-family: "Roboto", sans-serif;
            font-weight: 400;
            z-index: 3;
        }
        &__menu-item {
            position: relative;
            margin-left: rem(24px);
            &--logout {
              display: none;
            }
            & > a {
                display: block;
                position: relative;
                z-index: 3;
            }
            svg {
                display: block;
            }
            &:hover {
                .user-info__menu-counter {
                    background-color: $colorCrimsonLight;
                }
            }
        }
        &__menu-item--sub {
            &:hover {
                .user-info__submenu {
                    transform: translateY(0);
                    pointer-events: all;
                    opacity: 1;
                }
            }
        }
        &__submenu {
            transition: .5s transform, .5s opacity;
            position: absolute;
            top: 100%;
            right: 0;
            min-width: rem(285px);
            background-color: #fff;
            z-index: 2;
            box-shadow: 5px 10px 15px rgba(55, 55, 53, 0.1);
            transform: translateY(#{rem(-15px)});
            pointer-events: none;
            opacity: 0;
            &:after {
                content: " ";
                position: absolute;
                bottom: 100%;
                height: rem(25px);
                width: 100%;
            }
        }
        &__submenu-item {
            transition: .3s color, .3s background-color;
            display: block;
            padding: rem(12px) rem(20px);
            color: $colorText;
            background-color: transparent;
            &:hover {
                color: $colorTurquoiseHover;
                background-color: #f7fcfd;
            }
        }
    }
    .switch-box-container {
        display: flex;
        padding: rem(15px) rem(20px);
        border-bottom: 1px solid #f1f1f1;
        align-items: center;
        justify-content: space-between;
        &--mobile {
            max-width: 15rem;
            padding: 0;
            margin-bottom: rem(15px);
            font-weight: bold;
            @media(min-width: 769px) {
                display: none;
            }
        }
    }
    .switch-box {
        display: block;
        input {
            display: none;
            &:checked ~ .switch-box__body{
                .switch-box__switch {
                    &:after {
                        content: " ";
                        transform: translate(100%, -50%);
                    }
                }
            }
        }
        &__switch {
            width: rem(44px);
            height: rem(12px);
            background-color: $colorTurquoise;
            border-radius: 0.42857rem;
            position: relative;
            cursor: pointer;
            display: block;
            &:after {
                transition: .3s transform;
                content: " ";
                position: absolute;
                left: 0;
                top: 50%;
                width: rem(24px);
                height: rem(24px);
                transform: translate(0, -50%);
                background-color: #fff;
                border: 1px solid #f5f5f5;
                border-radius: 50%;
                box-shadow: 0px 0px 10px rgba(55, 55, 53, 0.15);
            }
        }
    }
    /*@keyframes blink {*/
    /*    0% {*/
    /*        opacity: 1;*/
    /*    }*/
    /*    50% {*/
    /*        opacity: .7;*/
    /*    }*/
    /*    100% {*/
    /*        opacity: 1;*/
    /*    }*/
    /*}*/
</style>
