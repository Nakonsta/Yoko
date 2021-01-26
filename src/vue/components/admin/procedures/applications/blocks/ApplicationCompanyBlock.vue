<template>
  <div class="application__section">
    <application-title
      title="Сведения об участнике"
      subtitle
    />
    <div class="divider" />
    <div class="application__section-row">
      <div class="application__section-title">
        Название:
      </div>
      <application-company-select
        :default-i-n-n="application.inn"
        :disabled="disabled"
        :has-error="errors"
        @on-select="$emit('on-company-select', $event)"
      />
    </div>
    <div class="application__section-row">
      <div class="application__section-title">
        Полное название:
      </div>
      <div class="application__section-text">
        {{ procedure.selectedCompany.name }}
      </div>
    </div>
    <div class="application__section-row">
      <div class="application__section-title">
        ИНН:
      </div>
      <div class="application__section-text">
        {{ procedure.selectedCompany.inn }}
      </div>
    </div>
    <div class="application__section-row">
      <div class="application__section-title">
        Юридический адрес:
      </div>
      <div class="application__section-text">
        {{ procedure.selectedCompany.legalAddress }}
      </div>
    </div>
    <div class="application__section-row">
      <div class="application__section-title">
        Фактический адрес:
      </div>
      <div class="application__section-text">
        {{ procedure.selectedCompany.address }}
      </div>
    </div>
    <div class="application__section-row">
      <div class="application__section-title">
        Контактное лицо:
      </div>
      <div class="application__section-text">
        {{ procedure.selectedCompany.directorFio }}
      </div>
    </div>
    <div class="divider divider--no-margin" />
  </div>
</template>
<script>
import ApplicationCompanySelect from '../details/ApplicationCompanySelect';
import ApplicationTitle from '../ApplicationTitle';

export default {
  name: 'ApplicationPurchaseBlock',
  components: {
    ApplicationTitle,
    ApplicationCompanySelect,
  },
  props: {
    procedure: {
      type: Object,
      required: true,
    },
    application: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
