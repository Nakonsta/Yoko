<template>
    <Uploader name="import" :submit="true" extensions=".csv, .xlsx" :metatypes="['text/csv','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']">
        <p>1. Скачайте <a href="./content/test.xlsx">шаблон</a> добавления продукции в каталог
            <br>
            2. Заполните необходимые поля.
            <br>
            3. Загрузите заполненный <a href="./content/test.xlsx">шаблон</a> в формате .csv или .xlsx
        </p>
    </Uploader>
</template>

<script>
    import Uploader from "./components/uploder.vue";

    export default {
        name: 'CatalogImport',
        components: {
            Uploader,
        },
    }
</script>