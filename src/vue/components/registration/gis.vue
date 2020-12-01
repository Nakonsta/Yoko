<template>
  <div class="gis">
    <div class="gis__item">
      <img src="/content/gis.png" alt="" />
    </div>
    <div class="gis__item">
      <div class="gis__title">
        Плагин ГИС "Независимый регистратор" на защите интересов участников
        контрактной системы
      </div>
      <div class="gis__body">
        Плагин необходим для защиты прав и законных интересов поставщиков и
        заказчиков в ФАС России, в том числе при обжаловании. Позволяет
        записывать в режиме реального времени все действия, совершаемые на
        электронной площадке
      </div>
      <div class="gis__link">
        <a href="#" target="_blank">
          СКАЧАТЬ ПЛАГИН ГИС НР
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7.11133" width="1.77778" height="12" fill="#014DA8" />
            <rect y="14" width="16" height="2" fill="#014DA8" />
            <path
              d="M1.33398 5.5L8.00065 13L14.6673 5.5"
              stroke="#014DA8"
              stroke-width="2"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Gis',
  }
</script>

<style lang="scss" scoped>
  .gis {
    display: flex;
    margin: 0 -15px;
    @media(max-width: 1250px) {
      flex-wrap: wrap;
    }
    &__title {
      font-size: 18px;
    }
    &__item {
      margin: 0 15px;
      @media(max-width: 1250px) {
        width: 100%;
        margin-bottom: 20px;
      }
    }
    &__body {
      font-weight: 500;
      color: #6F7C98;
      margin: 20px 0 30px;
    }
    &__link {
      font-weight: 500;
      a {
        color: #014da8;
        text-decoration: none;
        svg {
          margin-left: 5px;
          transform: translateY(1px);
        }
      }
    }
  }
</style>
