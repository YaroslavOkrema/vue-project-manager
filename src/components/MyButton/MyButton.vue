<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  text: string;
}>();

const emit = defineEmits<{
  (e: MouseEvent): void;
}>();

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <button class="open-modal" @click="handleClick">{{ text }}</button>
</template>

<style scoped lang="scss">
.open-modal {
  padding: 10px 12px;
  margin-bottom: 20px;
  background-color: green;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0ed811;
  }
}
</style>
