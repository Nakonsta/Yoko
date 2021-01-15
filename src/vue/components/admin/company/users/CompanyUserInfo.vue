<template>
  <div class="company-user-info__container">
    <div class="row company-user-info__content">
      <div class="col col-xs-12 col-md-3 company-user-info__jobtitle">
        {{ user.position }}
      </div>
      <div class="col col-xs-12 col-md-3 company-user-info__text">
        {{ user.name }} {{ user.lastName }}
      </div>
      <div class="col col-xs-12 col-md-2 company-user-info__text">
        {{ user.phone }}
      </div>
      <div class="col col-xs-12 col-md-3 company-user-info__text">
        {{ user.email }}
      </div>
    </div>
    <div
      :class="[
        'company-user-info__action',
        opened && 'company-user-info__action_opened',
      ]"
      @click="toggleMenu"
    >
      <div class="dropdown">
        <div class="dropdown__value">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 3.99999C14 2.89545 13.1046 2 12 2C10.8955 2 10 2.89545 10
              3.99999C10 5.10456 10.8955 5.99999 12 5.99999C13.1046 5.99999 14
              5.10456 14 3.99999ZM14 12.2857C14 11.1811 13.1046 10.2857 12
              10.2857C10.8955 10.2857 10 11.1811 10 12.2857C10 13.3903 10.8955
              14.2857 12 14.2857C13.1046 14.2857 14 13.3903 14 12.2857ZM14
              20.5714C14 19.4668 13.1046 18.5714 12 18.5714C10.8955 18.5714
              10 19.4668 10 20.5714C10 21.6759 10.8955 22.5714 12 22.5714C13.1046
              22.5714 14 21.6759 14 20.5714Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="dropdown__list"
          @click.stop
        >
          <ul>
            <li
              class="dropdown__item"
              @click="edit"
            >
              Редактировать
            </li>
            <li
              class="dropdown__item"
              @click="remove"
            >
              Удалить
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyUserInfo',
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    opened: false,
  }),
  watch: {
    opened(value) {
      if (value) {
        setTimeout(() => {
          document.addEventListener('click', this.closeOutside);
        }, 10);
      } else {
        document.removeEventListener('click', this.closeOutside);
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeOutside);
  },
  methods: {
    closeOutside() {
      this.toggleMenu(false);
    },
    toggleMenu(flag) {
      if ([true, false].includes(flag)) {
        this.opened = flag;
        return;
      }

      this.opened = !this.opened;
    },
    edit() {
      this.toggleMenu(false);
      this.$emit('edit', this.user);
    },
    remove() {
      this.toggleMenu(false);
      this.$emit('remove', this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.company-user-info {
  &__container {
    display: flex;
    justify-content: space-between;

    & + .company-user-info__container {
      margin-top: 24px;
    }
  }

  &__content {
    flex: 1;
  }

  &__jobtitle {
    flex: 1;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #373735;
  }

  &__text {
    margin-top: 8px;

    & + .company-user-info__text {
      margin-top: 4px;
    }

    @media screen and (min-width: 700px) {
      margin-top: 0;
      margin-left: 28px;

      & + .company-user-info__text {
        margin-top: 0px;
      }
    }
  }

  &__action {
    margin-left: 28px;

    svg {
      color: #31ACB8;
    }

    .dropdown {
      &__list {
        width: 150px;
        padding: 12px 0;
        top: 0;
      }

      &__item {
        padding: 8px 20px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;

        cursor: pointer;
        transition: background-color .3s;

        &:hover {
          background-color: #f8f8f8;
        }
      }
    }

    &_opened {
      .dropdown__list {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
