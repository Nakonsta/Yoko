<template>
    <div class="filter">
        <spoiler>
            <template v-slot:header>
                <b>Тип</b>
            </template>
            <template v-slot:body>
                <p>
                    Для корректной работы на электронной торговой площадке на вашем
                    рабочем столе должно быть установлено следующее програмное
                    обеспечение:
                </p>
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

</style>
