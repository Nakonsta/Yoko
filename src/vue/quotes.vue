<template>
  <div class="quotes">
    <div class="quotes__header">
      <div class="btn-group btn-group-select" :class="{active: showSelect}">
        <a @click.prevent="setType('copper')" class="btn" :class="{ active: type === 'copper' }">
          Медь <span>copper</span>
        </a>
        <a @click.prevent="setType('alum')" class="btn" :class="{ active: type === 'alum' }">
          Алюминий <span>alum</span>
        </a>
      </div>
      <div class="switch-box-container">
        <span class="switch-box-false-name">
            Котировка, $
        </span>
        <label class="switch-box">
          <input class="switch-box" type="checkbox" v-model="currencyChecked" @change="setCurrency">
          <span class="switch-box__body">
            <span class="switch-box__switch"></span>
          </span>
        </label>
        <span class="switch-box-true-name">
            Спот, ₽
        </span>
      </div>
    </div>
    <quotes-chart
      :type="type"
      :range="range"
      :dates="dates"
      :picker="picker"
      :quotes="quotes"
      :currency="currency"
      :set-dates="setDates"
      :set-active="setActive"
      :chart-data="chartData"
      :active-item="activeItem"
      :latest-quote="latestQuote"
      :loading-quotes="loadingQuotes"
      :currency-checked="currencyChecked"
    ></quotes-chart>
    <quotes-list
      :currency="currency"
      :latest-quote="latestQuote"
      :latest-quotes="latestQuotes"
      :loading-latest-quotes="loadingLatestQuotes"
    ></quotes-list>
  </div>
</template>

<script>
  import moment from 'moment'
  import api from './helpers/api'
  import quotesChart from "./components/quotesChart.vue"
  import quotesList from "./components/quotesList.vue"
  import {ru} from "vuejs-datepicker/src/locale"

  export default {
    name: 'App',
    components: {
      quotesChart,
      quotesList,
    },
    mixins: [api],
    data() {
      return {
        picker: {
          start_date: moment().subtract(7, 'days').toDate(),
          end_date: moment().toDate(),
          format: "dd-MM-yyyy",
          locale: ru,
          disabledFrom: moment().toDate(),
          disabledTo: moment().subtract(1, 'year').add(1, 'days').toDate(),
        },
        activeItem: 'month',
        windowWidth: window.innerWidth,
        setDemoMode: location.search === '?mode=demo' ? 'demo' : null,
        type: 'copper',
        currency: 'quote',
        isFirstLoad: false,
        currencyChecked: false,
        loadingQuotes: true,
        showSelect: false,
        loadingLatestQuotes: true,
        dates: {
          now: moment().format('YYYY-MM-DD'),
          week: moment().subtract(7, 'days').format('YYYY-MM-DD'),
          month: moment().subtract(1, 'month').format('YYYY-MM-DD'),
          quarter: moment().subtract(3, 'month').format('YYYY-MM-DD'),
          halfYear: moment().subtract(6, 'month').format('YYYY-MM-DD'),
          year: moment().subtract(1, 'year').add(1, 'days').format('YYYY-MM-DD'),
        },
        total: {
          quote: {
            avg: null,
            max: null,
            min: null,
          },
          spot: {
            avg: null,
            max: null,
            min: null,
          },
        },
        range: null,
        quotes: {},
        latestQuotes: [],
        latestQuote: {},
        chartData: null,
      }
    },
    created() {
      this.getQuotesData(this.type, this.dates[this.activeItem], this.dates.now)
      this.getLatestQuotesData(this.type)
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      })
    },
    methods: {
      setCurrency(e) {
        this.chartData = {
          labels: [],
          datasets: [
            {
              label: '',
              lineTension: '0',
              backgroundColor: 'transparent',
              pointBackgroundColor: '#31ACB8',
              pointBorderColor: '#fff',
              borderColor: '#31ACB8',
              data: []
            }
          ]
        }
        this.currencyChecked = e.target.checked
        this.currency = e.target.checked ? 'spot' : 'quote'
        this.quotes.items.map((item) => {
          this.chartData.labels.push(moment(item.date).format('MM.DD.YYYY'))
          this.chartData.datasets[0].data.push(item[this.currency])
        })
      },
      setDates() {
        this.activeItem = 'custom'
        this.picker.disabledTo = moment(this.picker.end_date).subtract(1, 'year').add(1, 'days').toDate()
        if(moment().toDate() > moment(this.picker.start_date).add(1, 'year').toDate()) {
          this.picker.disabledFrom = moment(this.picker.start_date).add(1, 'year').subtract(1, 'days').toDate();
          this.picker.end_date = moment(this.picker.start_date).add(1, 'year').subtract(1, 'days').toDate();
        } else {
          this.picker.disabledFrom = moment().toDate()
        }
        this.getQuotesData(
          this.type,
          moment(this.picker.start_date).format('YYYY-MM-DD'),
          moment(this.picker.end_date).format('YYYY-MM-DD'),
        )
      },
      onResize() {
        this.windowWidth = window.innerWidth
      },
      setType(menuItem) {
        if (this.windowWidth > 767 || this.showSelect === true) {
          this.type = menuItem
          this.showSelect = false
          this.getQuotesData(menuItem, this.dates[this.activeItem], this.dates.now)
          this.getLatestQuotesData(menuItem)
        } else {
          this.showSelect = true
        }
      },
      setActive(menuItem) {
        this.activeItem = menuItem
        this.picker.start_date = moment(this.dates[menuItem]).toDate()
        this.picker.end_date = moment().toDate()
        this.picker.disabledFrom = moment().toDate()
        this.getQuotesData(this.type, this.dates[menuItem], this.dates.now)
      },
      getQuotesData(type, date_start, date_end) {
        this.chartData = {
          labels: [],
          datasets: [
            {
              label: '',
              lineTension: '0',
              backgroundColor: 'transparent',
              pointBackgroundColor: '#31ACB8',
              pointBorderColor: '#fff',
              borderColor: '#31ACB8',
              data: []
            }
          ]
        }
        this.loadingQuotes = true
        this.fetchQuotes(type, date_start, date_end, this.setDemoMode)
          .then(({data}) => {
            const response = data.data
            this.quotes = response
            this.quotes.items.reverse()
            response.items.map((item) => {
              this.chartData.labels.push(moment(item.date).format('MM.DD.YYYY'))
              this.chartData.datasets[0].data.push(item[this.currency])
            })
          })
          .then(() => {
            this.fetchQuotesDates(this.setDemoMode)
              .then(({data}) => {
                const response = data.data
                this.range = response
                Object.keys(this.range).forEach((key) => {
                  Object.keys(this.range[key]).forEach((nextKey) => {
                    this.range[key][nextKey] = moment(this.range[key][nextKey]).toDate()
                  })
                });
                this.loadingQuotes = false
              })
              .catch((e) => {
                console.log(e)
                this.loadingQuotes = false
              })
          })
          .catch((e) => {
            console.log(e)
            this.loadingQuotes = false
          })
      },
      getLatestQuotesData(type) {
        this.loadingLatestQuotes = true
        this.fetchLatestQuotes(type, this.setDemoMode)
          .then(({data}) => {
            const response = data.data
            this.latestQuotes = response
            this.latestQuote = response[0]
            if (this.latestQuote) {
              this.latestQuote = {
                ...this.latestQuote,
                date: moment(this.latestQuote.date).format('HH:mm UTC Z DD.MM.YYYY')
              }
              this.latestQuotes.map((item) => {
                item.date = moment(item.date).format('DD.MM.YYYY')
              })
            }
            this.loadingLatestQuotes = false
          })
          .catch((e) => {
            console.log(e)
            this.loadingLatestQuotes = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables/fluid-variables";
  @import "../assets/sass/variables/variables";
  @import "../assets/sass/mixins/fluid-mixin";

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .btn {
    background: transparent;
    border-color: $colorGray;
    color: $lightcolorText !important;
    font-size: rem(24px);
    font-weight: 600;
    margin-bottom: 1rem;

    span {
      font-weight: 500;
      text-transform: uppercase;
      font-size: rem(14px);
      margin-left: 0.6rem;
      margin-top: 0.5rem;
      color: $colorGray;
    }

    &.active {
      color: white !important;
      border-color: $colorTurquoise;
      background: $colorTurquoise;
      span {
        color: #98D5DB;
      }
    }

    &-group {
      &-select {
        @media(max-width: 767px) {
          margin-bottom: 1rem;
          max-height: rem(63px);
          transition: max-height .5s;
          overflow: hidden;
          .btn {
            margin-bottom: 0;
            order: 0;
            position: relative;
          }
          &.active {
            max-height: rem(200px);
            .btn {
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }
            .btn.active {
              border-radius: rem(6px) rem(6px) 0 0;

              &:after {
                content: '\e75f';
              }
            }
          }
          .btn.active {
            order: -1;
            &:after {
              content: '\e75c';
              font-family: 'fontello';
              color: white;
              position: absolute;
              right: rem(25px);
              top: rem(22px);
              font-size: rem(14px);
            }
          }
        }
      }
    }
  }

  .switch-box {
    display: block;
    margin: 0 1rem;

    input {
      display: none;

      &:checked ~ .switch-box__body {
        .switch-box__switch {
          &:after {
            content: " ";
            transform: translate(94%, -50%);
          }
        }
      }
    }

    &-container {
      display: flex;
      margin-left: rem(40px);
      align-items: center;
      @media(max-width: 767px) {
        margin-left: 0;
      }
    }

    &__switch {
      width: rem(50px);
      height: rem(28px);
      background-color: $colorLight;
      border-radius: rem(30px);
      position: relative;
      cursor: pointer;
      display: block;

      &:after {
        transition: .3s transform;
        content: " ";
        position: absolute;
        left: rem(2px);
        top: 50%;
        width: rem(24px);
        height: rem(24px);
        transform: translate(0, -50%);
        background-color: $colorTurquoise;
        border: 1px solid $colorTurquoise;
        border-radius: 50%;
        box-shadow: 0px 0px 10px rgba(55, 55, 53, 0.15);
      }
    }
  }

  .quotes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 2rem;
      width: 100%;
      @media(max-width: 767px) {
        > * {
          width: 100%;
        }
      }
    }
  }
</style>
