<template>
  <vega-form ref="formRef">
    <vega-input required="true" data-vega-form="field_1"></vega-input>
  </vega-form>
  <vega-button @vegaClick="valid">Valid</vega-button>
  <vega-button @vegaClick="reset">Reset</vega-button>
</template>

<script>
import { VegaForm, VegaInput, VegaButton } from "@heartlandone/vega-vue";
export default {
  name: "SimpleComponent",
  components: {
    VegaButton,
    VegaInput,
    VegaForm,
  },
  data: function () {
    return {
      accordionTitle: "this is title",
      emailValue: "",
    };
  },
  created: function () {},
  methods: {
    valid() {
      return this.$refs.formRef.$el.valid();
    },
    reset() {
      return this.$refs.formRef.$el.reset();
    },
  },
};
</script>
