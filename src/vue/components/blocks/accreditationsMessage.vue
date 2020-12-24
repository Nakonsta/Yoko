<template>
  <div>
    <div class="message" v-if="info.show">
      У Вас еще не аккредитована ни одна компания как <b>"{{ info.name }}"</b> <br>
      Отправьте заявку на аккредитацию
    </div>
  </div>
</template>

<script>
  export default {
    name: 'accreditationsMessage',
    computed: {
      info() {
        const role = this.$store.getters.userRole

        switch (role) {
          case 'buyer':
            return {
              name: 'Заказчик',
              show: !this.$store.getters.companyBuyer.length
            }
            break
          case 'contractor':
            return {
              name: 'Поставщик',
              show: !this.$store.getters.companyContractor.length
            }
            break
          default:
            return {
              name: '',
              show: false
            }
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/sass/variables/variables';
  @import '../../../assets/sass/variables/fluid-variables';
  @import '../../../assets/sass/mixins/fluid-mixin';
  @import '../../../assets/sass/mixins/mq';
  .message {
    font-size: rem(16px);
    margin-bottom: rem(16px);
  }
</style>