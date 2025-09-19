<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const closeWindow = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <div v-if="modelValue" @click.self="closeWindow" class="modal-window">
    <div class="modal">
      <h3>{{ title }}</h3>
      <slot></slot>
      <button class="close-btn" @click="closeWindow">Закрити</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  h3 {
    text-align: center;
    margin-bottom: 15px;
  }

  .close-btn {
    display: block;
    margin: 15px auto 0;
    padding: 8px 15px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>
