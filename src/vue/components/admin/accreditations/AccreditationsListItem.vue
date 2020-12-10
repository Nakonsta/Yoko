<template>
  <li class="accreditatins__list-item accreditation">
    <accreditations-steps :status="accreditation.status"></accreditations-steps>
    <div class="accreditation__info">
      <router-link
        class="accreditation__title"
        :to="`accreditations/${accreditation.id}`"
      >
        Заявка на аккредитацию №{{ accreditation.id }}
      </router-link>
      <div class="accreditation__date">
        от
        <time>{{ accreditation.created_at }}</time>
      </div>
    </div>
  </li>
</template>
<script>
import AccreditationsSteps from "./AccreditationsSteps.vue";
export default {
  name: "accreditations-list-item",
  components: { AccreditationsSteps },
  props: {
    accreditation: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import "../../../../assets/sass/variables/variables";
@import "../../../../assets/sass/variables/fluid-variables";
@import "../../../../assets/sass/mixins/fluid-mixin";
@import "../../../../assets/sass/mixins/mq";

.accreditation {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  padding: rem(16px) rem(24px);
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: rem(24px);

  &:last-child {
    margin-bottom: 0;
  }

  &__info {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }

  &__title {
    margin-top: rem(6px);
    margin-right: rem(20px);
    transition: 0.3s;

    font-family: Roboto;
    font-weight: 500;
    font-size: rem(14px);
    color: $lightcolorText;

    &:hover {
      color: $colorTurquoise;
    }
  }

  &__date {
    margin-top: rem(4px);
    font-family: Roboto;
    font-size: rem(14px);
    color: $lightcolorText;
  }
}
</style>
