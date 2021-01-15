<template>
  <div class="company-users__block">
    <div class="company-users__block-title">
      <slot>{{ title }}</slot>
    </div>
    <div class="company-users__block-content">
      <CompanyUserInfo
        v-for="(user, index) in users"
        :key="index"
        :user="user"
        class="company-users__user-info"

        @edit="editUser"
        @remove="removeUserPopup"
      />
    </div>
    <button
      class="btn company-users__block-action"
      @click="addUsers"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 22C15.4946 22 16.4484 21.6049 17.1517 20.9017C17.8549
          20.1984 18.25 19.2446 18.25 18.25V14.5H15.75V18.25C15.75 18.5815
          15.6183 18.8995 15.3839 19.1339C15.1495 19.3683 14.8315 19.5 14.5
          19.5H5.75C5.41848 19.5 5.10054 19.3683 4.86612 19.1339C4.6317 18.8995
          4.5 18.5815 4.5 18.25V9.5C4.5 9.16848 4.6317 8.85054 4.86612
          8.61612C5.10054 8.3817 5.41848 8.25 5.75 8.25H9.5V5.75H5.75C4.75544
          5.75 3.80161 6.14509 3.09835 6.84835C2.39509 7.55161 2 8.50544 2
          9.5V18.25C2 19.2446 2.39509 20.1984 3.09835 20.9017C3.80161 21.6049
          4.75544 22 5.75 22H14.5Z"
          fill="currentColor"
        />
        <path
          d="M18.25 2H15.75V5.75H12V8.25H15.75V12H18.25V8.25H22V5.75H18.25V2Z"
          fill="currentColor"
        />
      </svg>

      <span>Добавить пользователя</span>
    </button>

    <div
      id="company-users-remove"
      class="popup popup--alt"
    >
      <div class="popup__body">
        <div class="popup__content">
          <div
            class="popup__close"
            @click="closePopup('company-users-remove')"
          >
            <svg class="sprite-close">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.2929 17.7071C16.6834 18.0976 17.3166
                  18.0976 17.7071 17.7071C18.0976 17.3166
                  18.0976 16.6834 17.7071 16.2929L12.4142
                  11L17.7071 5.70712C18.0976 5.31659 18.0976
                  4.68343 17.7071 4.2929C17.3166 3.90238
                  16.6834 3.90238 16.2929 4.2929L11
                  9.5858L5.70711 4.29289C5.31658 3.90237
                  4.68342 3.90237 4.29289 4.29289C3.90237
                  4.68342 3.90237 5.31658 4.29289
                  5.70711L9.5858 11L4.29289 16.2929C3.90237
                  16.6834 3.90237 17.3166 4.29289
                  17.7071C4.68342 18.0977 5.31658 18.0977
                  5.70711 17.7071L11 12.4142L16.2929 17.7071Z"
                  fill="currentColor"
                />
              </svg>
            </svg>
          </div>
          <div class="popup__title">
            Удаление пользователя.<br>
            Вы уверены?
          </div>
          <div class="popup__content-container">
            <a class="btn">
              Да
            </a>
            <a class="btn btn--bdr">
              Нет
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyUserInfo from './CompanyUserInfo';

export default {
  name: 'CompanyUsersBlock',
  components: {
    CompanyUserInfo,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    editUser() {},
    removeUserPopup() {
      window.openPopupById('#company-users-remove');
    },
    addUsers() {},
    closePopup(id) {
      window.closePopupById(`#${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.company-users {
  &__block {
    & + .company-users__block {
      margin-top: 32px;
      border-top: 1px solid #cdcdcc;
      padding-top: 32px;
    }

    &-title {
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #31acb8;
    }

    &-content {
      margin-top: 20px;
    }

    &-action {
      margin-top: 24px;
      display: flex;
      align-items: center;
      color: #31acb8;

      &.btn {
        border: 0;
        padding: 0;
        background: none;
        color: #31acb8 !important;
        justify-content: flex-start;
        font-family: Roboto, sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        min-height: 0;
      }

      span {
        margin-left: 8px;
      }
    }
  }

  &__user-info {
    & + .company-users__user-info {
      margin-top: 20px;
    }
  }
}

#company-users-remove {
  .popup__content {
    border-radius: 6px;
    padding: 20px;
    width: 300px;
  }

  .popup__close {
    top: 0;
    right: 0;
    background-color: #31ACB8 !important;
    color: white;
    border-top-right-radius: 6px;
    cursor: pointer;
  }

  .popup__title {
    width: 100%;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 32px;
  }

  .popup__content-container {
    display: flex;
    align-items: center;

    .btn {
      flex: 1;
      min-width: 0;

      & + .btn {
        margin-left: 16px;
      }
    }
  }
}
</style>
