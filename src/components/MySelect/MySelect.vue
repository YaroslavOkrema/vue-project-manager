<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

function changeOption(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Виберіть зі списку</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
