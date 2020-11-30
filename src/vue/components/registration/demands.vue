<template>
  <div class="demands">
    <div class="demands__text">
      Если у Вас уже есть учетная запись -
      <a class="demands__link popup-link" href="#singin">
        Войдите в личный кабинет
      </a>
    </div>
    <spoiler>
      <template v-slot:header>
        <div>Требования к программному обеспечению</div>
      </template>
      <template v-slot:body>
        <p>
          Для корректной работы на электронной торговой площадке на вашем
          рабочем столе должно быть установлено следующее програмное
          обеспечение:
        </p>
        <b>операционная система:</b>
        <ul class="dashed">
          <li>Microsoft Windows 7;</li>
          <li>Microsoft Windows 8 и 8.1;</li>
          <li>Microsoft Windows 10;</li>
        </ul>
        <br />
        <b>браузер:</b>
        <ul class="dashed">
          <li>Microsoft Internet Explorer версии 11;</li>
          <li>Firefox версии 52 или выше;</li>
          <li>Opera версии 36 или выше;</li>
          <li>Google Chrome 49 или выше;</li>
        </ul>
        <p>
          Необходимо убедиться, что в браузере включена поддержка файлов
          Cookies, JavaScript и ActiveX, активна опция показа всплывающих окон,
          а также отключен режим совместимости;
        </p>
        <ul class="dashed">
          <li>программное обеспечение для работы с Электронной подписью;</li>
          <li>персональный электронный почтовый ящик;</li>
          <li>
            программа-архиватор для сжатия и распаковки файлов в форматах zip,
            rar и 7z (например, 7-Zip);
          </li>
          <li>
            набор программ для работы с документами и таблицами (например,
            Microsoft Office, OpenOffice, LibreOffice);
          </li>
          <li>программа для чтения pdf-файлов (Adobe Acrobat Reader).</li>
          <li>
            отсутствие ограничений для вашего ПК на объём скачивания и отправки
            файлов на сервере вашего предприятия;
          </li>
          <li>
            отсутствие запрета для вашего ПК на скачивание и отправку файлов с
            расширениями txt, doc, docx, xls, xlsx, ppt, pptx, pdf, zip, rar,
            7z, jpg, jpeg, tif, png на сервере вашего предприятия.
          </li>
        </ul>
      </template>
    </spoiler>
    <spoiler>
      <template v-slot:header>
        <div>Уставные документы и шаблоны</div>
      </template>
      <template v-slot:body>
        <ul class="list-link">
          <li><a href="#" target="_blank">Анкета компании</a> (32КБ)</li>
          <li><a href="#" target="_blank">Уставной документ</a> (32КБ)</li>
          <li>
            <a href="#" target="_blank">Свидетельство о госрегистрации</a>
            (32КБ)
          </li>
          <li>
            <a href="#" target="_blank"
              >Свидетельство о постановке на учет АО Центр развития экономики</a
            >
            (32КБ)
          </li>
        </ul>
      </template>
    </spoiler>
  </div>
</template>

<script>
  import spoiler from './rspoiler.vue'

  export default {
    name: 'Demands',
    components: {
      spoiler,
    },
  }
</script>

<style lang="scss" scoped>
  .demands {
    &__text {
      margin-bottom: 2rem;
    }
  }
  .list-link {
    padding: 0;
    list-style-type: none;
    li {
      margin-bottom: 1.5rem;
      a {
        text-decoration: none;
      }
    }
  }
</style>
