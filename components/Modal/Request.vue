<template>
  <div v-if="$store.state.modals.show === 'request'">
    <div class="d-grid gap-2">
      <div class="form-group">
        <label class="fw-bold">Message</label>

        <textarea
          rows="5"
          class="form-control"
          :value="`Hi ${data.name}, I would like to ${data.type} your ${data.title}. Kind regards, your neighbor [user.name]`"
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
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },

  data() {
    return {
      request: { message: "", from: undefined, to: undefined },
      from: undefined,
      to: undefined,
    };
  },

  computed: {
    data() {
      return this.$store.state.modals.data;
    },

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
    sendRequest() {
      console.log(this.from.getTime());
      console.log(this.to.getTime());
      // todo
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
    // padding: $input-btn-padding-x $input-btn-padding-y !important;
    // background-color: gold;
    // border: 3px solid gold !important;
  }

  .mx-icon-calendar {
    display: none;
  }
}
</style>
