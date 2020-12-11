<template>
  <div class="accreditation-details">
    <accreditations-steps v-if="!loading && accreditation !== {}" :status="accreditation.status"></accreditations-steps>
    <accreditations-title
      :title="`Заявка на аккредитацию №${id}`"
			margin="32px 0 0 0"
    ></accreditations-title>
  </div>
</template>
<script>
import api from "../../../helpers/api";

import AccreditationsTitle from "../../../components/admin/accreditations/AccreditationsTitle.vue";
import AccreditationsSteps from "../../../components/admin/accreditations/AccreditationsSteps.vue";
export default {
  name: "accreditation-details",
  components: {
    AccreditationsSteps,
    AccreditationsTitle,
  },
  mixins: [api],
  data() {
    return {
      id: this.$route.params.id,
      loading: true,
      accreditation: {},
    };
  },
  methods: {
    getAccreditationDetails() {
      this.loading = true;
      this.fetchAccreditationDetails(this.id)
        .then((data) => {
          console.log(data);
          this.accreditation = data?.data?.data ?? {};
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.getAccreditationDetails();
  },
};
</script>
<style lang="scss">
.accreditation-details {
  border-radius: 6px;
}
</style>
