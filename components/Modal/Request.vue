<template>
  <div v-if="$store.state.modals.show === 'request'">
    <div class="d-grid gap-2">
      <template v-if="!rid">
        <div class="form-group">
          <label class="fw-bold">Message</label>

          <textarea
            rows="5"
            class="form-control"
            :placeholder="`Hi ${this.data.name}, I would like to ${this.data.type} your ${this.data.title}. Kind regards, your neighbor ${this.$store.state.user.name}`"
            @input="(e) => setMessage(e.target.value)"
          />
        </div>

        <div class="form-group">
          <label class="fw-bold">Date: From</label>
          <date-picker
            v-model="from"
            valueType="date"
            format="MM/DD/YYYY"
            :default-value="new Date()"
            :placeholder="`${today} (today)`"
            class="form-control w-100"
          ></date-picker>
        </div>
        <div class="form-group">
          <label class="fw-bold">Date: Until</label>

          <date-picker v-model="to" valueType="date" format="MM/DD/YYYY" class="form-control w-100"></date-picker>
        </div>

        <div class="btn btn-primary" @click="sendRequest()">Send request</div>
      </template>

      <template v-if="rid">
        <p class="text-center">
          Your request with ID
          <nuxt-link
            class="border-bottom"
            :to="link"
            event=""
            @click.native="
              $router.push(link);
              $store.commit('modals/hide');
            "
            >{{ rid }}</nuxt-link
          >
          was successfully created.
        </p>

        <nuxt-link
          class="btn btn-primary"
          :to="link"
          event=""
          @click.native="
            $router.push(link);
            $store.commit('modals/hide');
          "
          >View request</nuxt-link
        >
      </template>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
const { deployBorrow, computeTotalRent } = require("@/utils/borrow.js");

export default {
  components: { DatePicker },

  data() {
    return {
      request: { message: "", from: undefined, to: undefined },
      from: undefined,
      to: undefined,
      rid: undefined, // request ID retrieved after deploying borrow contract
      message: "",
    };
  },

  created() {},
  mounted() {
    this.from = new Date();

    if (this.data) {
      this.message = `Hi ${this.data.name}, I would like to ${this.data.type} your ${this.data.title}. Kind regards, your neighbor ${this.$store.state.user.name}`;
    }
    this.request["message"] = this.message;
  },

  computed: {
    data() {
      return this.$store.state.modals.data;
    },

    link() {
      return `/app/detail/${this.data.id}/${this.rid}`;
    },

    // message() {

    // },

    today() {
      let locale = "us-EN";
      return new Date().toLocaleDateString(locale, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    },
  },

  methods: {
    async sendRequest() {
      // todo: validate from

      this.request["from"] = parseInt(this.from.getTime() / 1000);
      this.request["to"] = parseInt(this.to.getTime() / 1000);

      let owner = this.data.owner;
      let details = { ...this.request, borrower: this.$store.state.user.accountId };
      let startdate = this.request.from;
      let enddate = this.request.to;
      let deposit = this.data.deposit;
      let totalRent = computeTotalRent(this.data.rent, startdate, enddate);

      this.rid = await deployBorrow(owner, details, startdate, enddate, deposit, totalRent);
    },

    setMessage(value) {
      this.request["message"] = value;
    },
  },
};
</script>

<style lang="scss">
.mx-datepicker {
  .mx-input {
    all: initial;
    font-family: $font-family-base;
    width: auto !important;
    min-width: 0px !important;
    flex-grow: 0;
  }

  .mx-icon-calendar {
    display: none;
  }
}
</style>
