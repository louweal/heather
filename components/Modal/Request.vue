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
            class="form-control w-100"
          ></date-picker>
        </div>
        <div class="form-group">
          <label class="fw-bold">Date: Until</label>

          <date-picker v-model="to" valueType="date" format="MM/DD/YYYY" class="form-control w-100"></date-picker>
        </div>

        <div class="btn btn-primary" @click="sendRequest()">Send request</div>

        <p v-if="error" class="text-center text-danger">Please provide both dates.</p>
      </template>

      <template v-if="rid">
        <p class="text-center">Your request was successfully created.</p>

        <button class="btn btn-primary" @click="goToRequest()">View request</button>
      </template>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
const { deployBorrow, getBorrowContract, computeTotalRent } = require("@/utils/borrow.js");

export default {
  components: { DatePicker },

  data() {
    return {
      request: { message: "", from: undefined, to: undefined },
      from: undefined,
      to: undefined,
      rid: undefined, // request ID retrieved after deploying borrow contract
      message: "",
      error: false,
    };
  },

  created() {},
  mounted() {
    this.from = new Date();
  },

  computed: {
    data() {
      return this.$store.state.modals.data;
    },
  },

  methods: {
    async sendRequest() {
      if (!this.to || !this.from) {
        this.error = true;
        return;
      }
      this.error = false;

      this.request["from"] = parseInt(this.from.getTime() / 1000);
      this.request["to"] = parseInt(this.to.getTime() / 1000);

      if (this.request.message === "") {
        this.request.message = `Hi ${this.data.name}, I would like to ${this.data.type} your ${this.data.title}. Kind regards, your neighbor ${this.$store.state.user.name}`;
      }

      let owner = this.data.owner;
      let details = { ...this.request, borrower: this.$store.state.user.id };
      let startdate = this.request.from;
      let enddate = this.request.to;
      let deposit = this.data.deposit;
      let totalRent = computeTotalRent(this.data.rent, startdate, enddate);

      await deployBorrow(owner, details, startdate, enddate, deposit, totalRent);
      this.rid = await getBorrowContract(this.$store.state.user.id);

      console.log(this.rid);
    },

    setMessage(value) {
      this.request["message"] = value;
    },

    goToRequest() {
      // reset data
      this.request = { message: "", from: undefined, to: undefined };
      this.from = undefined;
      this.to = undefined;
      this.message = undefined;
      this.$router.push(`/app/detail/${this.data.id}/${this.rid}`);
      this.$store.commit("modals/hide");
      this.rid = undefined;
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
