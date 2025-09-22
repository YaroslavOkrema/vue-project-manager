<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { MyInputProps } from "@/components/MyInput/types";

const props = defineProps<MyInputProps>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    class="filters-input"
  />
</template>

<style scoped lang="scss">
.filters-input {
  flex: 3;
  padding: 10px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
}
</style>
