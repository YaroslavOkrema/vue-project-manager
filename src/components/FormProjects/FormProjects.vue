<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useFormProject } from "@/components/FormProjects/useFormProject";
import { FormProjectProps } from "@/components/FormProjects/types";

const props = defineProps<FormProjectProps>();

const emit = defineEmits<{ (e: "update:isModalOpen", value: boolean): void }>();

const { projectName, status, tasksCount, error, validate } = useFormProject();

const submit = async () => {
  if (!validate()) return;

  await props.addProject({
    id: Date.now(),
    projectName: projectName.value,
    status: status.value,
    created: new Date().toLocaleDateString("uk-UA"),
    tasksCount: tasksCount.value,
  });

  projectName.value = "";
  tasksCount.value = 0;

  emit("update:isModalOpen", false);
};
</script>

<template>
  <form class="form-projects" @submit.prevent="submit">
    <input
      class="form-projects__input"
      v-model="projectName"
      type="text"
      placeholder="Назва проекту"
      @input="validate"
    />
    <p v-if="error" class="form-projects__validate">{{ error }}</p>
    <input
      class="form-projects__input"
      v-model.number="tasksCount"
      type="number"
      placeholder="Кількість завдань"
    />
    <select class="form-projects__select" v-model="status">
      <option>Active</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>
    <button class="form-projects__button" type="submit">Додати</button>
  </form>
</template>

<style scoped lang="scss">
.form-projects {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;

  &__input,
  &__select {
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

  &__button {
    padding: 10px 12px;
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

    &:active {
      background-color: #004080;
    }
  }

  &__validate {
    color: red;
    font-size: 16px;
  }
}
</style>
