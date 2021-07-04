<template>
  <label class="label" for="input">
    <input
      :value="modelValue"
      @input="updateInput"
      class="input"
      type="text"
      id="input"
      :placeholder="$attrs.placeholder"
    />
  </label>
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  padding: 10px;
  border: 1px solid #718096;
  border-radius: 8px;
}
.label {}
</style>
