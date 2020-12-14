<template>
  <div class="quotes__body">
    <template v-if="!loadingQuotes">
      <div class="quotes__spot">
        <span>{{ currencyChecked ? 'Спот' : 'Котировка' }}, {{ dates.now }}:</span>
        {{ latestQuote && latestQuote[currency] }} {{ !currencyChecked ? '$' : '₽' }}
      </div>
      <div class="quotes__dates">
        <ul class="tabs-vue">
          <li class="tabs__item">
            <a class="tabs__link" @click.prevent="setActive('week')" :class="{ active: activeItem === 'week' }">
              Неделя
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" @click.prevent="setActive('month')" :class="{ active: activeItem === 'month' }">
              Месяц
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" @click.prevent="setActive('quarter')" :class="{ active: activeItem === 'quarter' }">
              3 месяца
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" @click.prevent="setActive('halfYear')" :class="{ active: activeItem === 'halfYear' }">
              6 месяцев
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" @click.prevent="setActive('year')" :class="{ active: activeItem === 'year' }">
              Год
            </a>
          </li>
        </ul>
        <div class="dates-vue">
          <datepicker
              placeholder="Дата начала"
              :monday-first=true
              input-class="field"
              :format="picker.format"
              :language="picker.locale"
              v-model="picker.start_date"
              @input="setDates"
              :disabled-dates="{ from: picker.end_date }"
          >
            <span slot="afterDateInput" class="icon-calendar-outlilne"></span>
          </datepicker>
          <span class="vdp-datepicker-dash">—</span>
          <datepicker
              placeholder="Дата окончания"
              :monday-first=true
              input-class="field"
              :format="picker.format"
              :language="picker.locale"
              v-model="picker.end_date"
              @input="setDates"
              :disabled-dates="{ to: picker.start_date, from: picker.disabledFrom }"
          >
            <span slot="afterDateInput" class="icon-calendar-outlilne"></span>
          </datepicker>
        </div>
      </div>
      <ul class="quotes__total">
        <li>Макс: <b>{{ quotes[`${[currency]}_max`] }}</b></li>
        <li>Мин: <b>{{ quotes[`${[currency]}_min`] }}</b></li>
        <li>Среднее: <b>{{ quotes[`${[currency]}_avg`] }}</b></li>
      </ul>
      <line-chart :chart-data="chartData" :options="chartOptions"/>
    </template>
    <div v-if="loadingQuotes" class="quotes__loader">
      <div class="filter__loader">
        <div class="preloader">
          <div class="preloader__preloader">
            <div class="preloader__loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import lineChart from "./lineChart.js"

export default {
  name: 'QuotesChart',
  components: {
    lineChart,
  },
  props: {
    loadingQuotes: {
      default: false,
      type: Boolean
    },
    currencyChecked: {
      default: false,
      type: Boolean
    },
    chartData: {
      default: null,
      type: Object
    },
    latestQuote: {
      default: null,
      type: Object
    },
    range: {
      default: null,
      type: Object
    },
    picker: {
      default: null,
      type: Object
    },
    dates: {
      default: null,
      type: Object
    },
    quotes: {
      default: null,
      type: Object
    },
    currency: {
      default: '',
      type: String
    },
    type: {
      default: '',
      type: String
    },
    activeItem: {
      default: '',
      type: String
    },
    setDates: {
      default: () => {
      },
      type: Function
    },
    setActive: {
      default: () => {
      },
      type: Function
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              callback: function (value) {
                return moment(value, "MM-DD-YYYY").format('DD.MM');
              }
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: '#CBEAED'
            },
            ticks: {
              callback: function (value) {
                return parseFloat(value).toFixed(2);
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          },
          enabled: false,
          custom: function (tooltipModel) {
            let tooltipEl = document.getElementById('chartjs-tooltip');
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<div class="chartjs-tooltip"></div>';
              document.body.appendChild(tooltipEl);
            }
            let tooltipElLine = document.getElementById('chartjs-tooltip-line');
            if (!tooltipElLine) {
              tooltipElLine = document.createElement('div');
              tooltipElLine.id = 'chartjs-tooltip-line';
              document.body.appendChild(tooltipElLine);
            }

            if (tooltipModel.opacity === 0) {
              tooltipElLine.style.opacity = 0;
              tooltipEl.style.opacity = 0;
              tooltipElLine.style.zIndex = -1;
              tooltipEl.style.zIndex = -1;
              return;
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            if (tooltipModel.body) {
              const titleLines = tooltipModel.title || [];
              const bodyLines = tooltipModel.body.map(getBody);
              let innerHtml = '';
              titleLines.forEach(function (title) {
                innerHtml += '<span style="color: #9B9B9A" class="chartjs-tooltip__title">'
                    + moment(title, "MM.DD.YYYY").format('DD.MM.YYYY')
                    + ' </span>';
              });
              bodyLines.forEach(function (body) {
                innerHtml += ' <span class="chartjs-tooltip__body">' + body + '</span>';
              });
              const tableRoot = tooltipEl.querySelector('div');
              tableRoot.innerHTML = innerHtml;
            }
            const position = this._chart.canvas.getBoundingClientRect()

            tooltipElLine.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';

            if(window.innerWidth > 1230 || (window.innerWidth > 886 && window.innerWidth < 1024)) {
              tooltipElLine.style.height = position.height - tooltipModel.caretY - 35 + 'px';
            } else {
              tooltipElLine.style.height = position.height - tooltipModel.caretY - 40 + 'px';
            }
            tooltipElLine.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 5 + 'px';
            tooltipElLine.style.position = 'absolute';
            tooltipElLine.style.opacity = 1;
            tooltipElLine.style.zIndex = 1;

            tooltipEl.style.opacity = 1;
            tooltipEl.style.zIndex = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.offsetWidth / 2 + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.offsetHeight * 1.4 + 'px';
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/sass/variables/fluid-variables";
  @import "../../assets/sass/variables/variables";
  @import "../../assets/sass/mixins/fluid-mixin";


  .quotes__body .field {
    height: rem(52px) !important;
    background: transparent;
  }
  #chartjs-tooltip-line {
    border-left: 1px dashed $colorTurquoise;
    width: 1px;
  }
  .chartjs-tooltip {
    padding: 0.7rem;
    background-color: white;
    position: relative;
    font-size: rem(14px);
    border-radius: 6px;
    filter: drop-shadow(5px 10px 15px rgba(55, 55, 53, 0.1));
    &__title {
      color: $colorGray;
      margin-right: 0.4rem;
    }
    &__body {
      color: $colorText;
    }
    &:after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 7px 10px 0 10px;
      border-color: #fff transparent transparent transparent;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
</style>
<style lang="scss" scoped>
@import "../../assets/sass/variables/fluid-variables";
@import "../../assets/sass/variables/variables";
@import "../../assets/sass/mixins/fluid-mixin";

.field {
  height: rem(52px) !important;
  background: transparent;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.tabs-vue {
  display: flex;
  text-align: center;
  width: calc(100% - 25rem);
  max-width: rem(500px);
  margin-bottom: 2rem;
  @media(max-width: 1220px) {
    width: calc(100% - 20rem);
  }
  @media(max-width: 1000px) {
    width: 100%;
  }
}

.dates-vue {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  @media(max-width: 767px) {
    flex-wrap: wrap;
    > * {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
  @media(max-width: 425px) {
    width: 100%;
  }
}

.tabs {
  &__item {
    border: none;
    flex: 1;
  }

  &__link {
    border-bottom: .1rem solid $colorGray;
    padding-bottom: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: block;
    color: $colorGray;
    @media(max-width: 350px) {
      font-size: rem(12px);
    }

    &.active {
      color: $colorTurquoise;
      border-color: $colorTurquoise;
    }
  }
}


.vdp-datepicker {
  position: relative;

  input {
    background: transparent;
    height: rem(40px);
    border: 1px solid $colorGray;
  }

  span {
    position: absolute;
    top: rem(15px);
    right: rem(15px);
    color: $colorTurquoise;
  }

  &-dash {
    margin: 0 1rem;
    color: $colorGray;
    @media(max-width: 767px) {
      display: none;
    }
  }
}

.quotes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__loader {
    height: 400px;
    position: relative;
  }

  &__spot {
    margin-bottom: 2rem;
    font-size: rem(24px);
    font-weight: 700;

    span {
      font-style: normal;
      color: $colorGray;
      font-size: rem(14px);
      font-weight: 400;
      display: block;
    }
  }

  &__dates {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__total {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    color: $colorGray;
    font-size: rem(14px);
    @media(max-width: 550px) {
      //font-size: rem(12px);
    }
    @media(max-width: 425px) {
      justify-content: center;
    }

    li {
      margin-right: 1.1rem;
      @media(max-width: 350px) {
        margin-right: 0.4rem;
      }
    }

    b {
      color: $colorText;
      font-weight: 500;
    }
  }

  &__body {
    width: calc(100% - 22rem);
    position: relative;
    margin-bottom: 2rem;
    @media(max-width: 1024px) {
      width: 100%;
    }
  }
}
</style>
