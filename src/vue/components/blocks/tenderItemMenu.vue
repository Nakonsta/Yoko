<template>
    <div class="tender-item__menu">
        <div class="tender-item__menu-inner">
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Общая информация</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Заказчик</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Список лотов</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Документы</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Разъяснения</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Протоколы</a>
            </div>
            <div class="tender-item__menu-item">
                <a href="#" class="tender-item__menu-link">Журнал событий</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TenderItemMenu',
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .tender-item__menu {
        width: 315px;
        flex-shrink: 0;
        padding: rem(20px) rem(32px);
        background-color: #fff;
        &-item {
            padding: rem(12px) 0;
            border-bottom: 1px solid $borderColor;
            &:last-child {
                border-bottom: none;
            }
        }
        &-link {
            font-size: rem(14px);
            line-height: 160%;
            color: $lightcolorText;
            &:hover,
            &:focus {
                color: $colorTurquoise;
            }
        }
    }
</style>