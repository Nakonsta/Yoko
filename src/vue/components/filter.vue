<template>
    <div class="filter">
        <spoiler>
            <template v-slot:header>
                <b>Тип</b>
            </template>
            <template v-slot:body>
                <div>
                    Для корректной работы на электронной торговой площадке на вашем
                    рабочем столе должно быть установлено следующее програмное
                    обеспечение:
                </div>
            </template>
        </spoiler>
        <spoiler>
            <template v-slot:header>
                <b>Тип</b>
            </template>
            <template v-slot:body>
                <div>
                    Для корректной работы на электронной торговой площадке на вашем
                    рабочем столе должно быть установлено следующее програмное
                    обеспечение:
                </div>
            </template>
        </spoiler>
    </div>
</template>

<script>
    import spoiler from "./blocks/spoiler.vue";
    export default {
        name: 'FilterBlock',
        components: {
            spoiler
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/sass/variables/fluid-variables";
    @import "../../assets/sass/mixins/fluid-mixin";

    .filter {
        width: calc(100% - #{rem(68px)});
    }
</style>
