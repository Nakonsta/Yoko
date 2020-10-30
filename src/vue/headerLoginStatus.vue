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
                    12<span class="user-info__time-dots">:</span>00 MSK
                </div>
            </div>
            <div class="user-info__menu">
                <div class="user-info__menu-item">
                    <a href="#">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32427 23.1279C1.20427 23.1279 0.280273 22.2039 0.280273 21.0839V6.9439C0.280273 5.8239 1.20427 4.8999 2.32427 4.8999H25.6483C26.7683 4.8999 27.6923 5.8239 27.6923 6.9439V21.0559C27.6923 22.1759 26.7683 23.0999 25.6483 23.0999H2.32427V23.1279ZM24.7803 21.4759L17.7243 15.0639L15.5123 17.0239C15.0923 17.3879 14.5603 17.6119 14.0003 17.6119C13.4403 17.6119 12.9083 17.4159 12.4883 17.0239L10.2763 15.0639L3.22027 21.4759H24.7803ZM26.0683 20.3839V7.5879L18.9563 13.9439L26.0683 20.3839ZM1.93227 20.3839L9.04427 13.9439L1.93227 7.5879V20.3839ZM13.5803 15.7919C13.6643 15.8759 13.8323 15.9039 14.0003 15.9039C14.1683 15.9039 14.3363 15.8479 14.4203 15.7919L24.7803 6.5239H3.22027L13.5803 15.7919Z" fill="#31ACB8"/>
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
            </div>
        </div>
        <div v-if="!$store.state.auth.loggedIn" class="header__login">
            <a class="header__singin popup-link" href="#singin">Войти</a>
            <a class="header__registration" href="https://stage-fr-supp.ec.extyl.pro/registration">Регистрация</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserInfo',
        methods: {
            logout() {
                this.$store.commit('logout', true)
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
