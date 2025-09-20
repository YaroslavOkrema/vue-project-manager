<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { useFormTasks } from "@/components/FormTasks/useFormTasks";
import { FormTasksProps } from "@/components/FormTasks/types";
import MyInput from "@/components/MyInput/MyInput.vue";

const props = defineProps<FormTasksProps>();

const emit = defineEmits<{ (e: "update:isModalOpen", value: boolean): void }>();

const { taskName, assigned, status, dueDate, submitTask, options, error } =
  useFormTasks(props.addTask, props.projectId);

const submitAndClose = async () => {
  const success = await submitTask();
  if (success) {
    emit("update:isModalOpen", false);
  }
};
</script>

<template>
  <form class="form-task" @submit.prevent="submitAndClose">
    <MyInput v-model="taskName" placeholder="Назва завдання" />
    <MyInput v-model="assigned" placeholder="Виконавець" />
    <select v-model="status">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <MyInput v-model="dueDate" type="date" placeholder="Термін виконання" />
    <p v-if="error" class="error">{{ error }}</p>
    <button type="submit">Додати</button>
  </form>
</template>

<style scoped lang="scss">
.form-task {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;

  input,
  select,
  button {
    padding: 10px;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
  }

  button {
    background-color: green;
    color: #fff;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0ed811;
    }
  }

  .error {
    color: red;
    font-size: 16px;
  }
}
</style>
