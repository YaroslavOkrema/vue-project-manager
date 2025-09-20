<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { Task } from "@/store/TaskModule/types";
import ModalWindow from "@/components/ModalWindow/ModalWindow.vue";
import MyButton from "@/components/MyButton/MyButton.vue";
import MyInput from "@/components/MyInput/MyInput.vue";
import MySelect from "@/components/MySelect/MySelect.vue";

const route = useRoute();
const store = useStore();
const taskId = Number(route.params.id);
const isModalOpen = ref(false);

const sortOptions = [
  { value: "id", name: "По ID" },
  { value: "projectName", name: "По назві проєкту" },
  { value: "tasksCount", name: "По кількості завдань" },
  { value: "status", name: "По статусу" },
];

onMounted(() => {
  store.dispatch("tasks/fetchTasks", taskId);
});

const tasks = computed<Task[]>(() => store.getters["tasks/allTask"]);
</script>

<template>
  <div class="table-container">
    <div>Project ID: {{ route.params.id }}</div>
    <MyButton text="Додати завдання" @click="isModalOpen = true" />
    <ModalWindow v-model="isModalOpen" title="Додати нове завдання">
      Hello
    </ModalWindow>
    <div class="table-filters">
      <MyInput model-value="" placeholder="Введіть назву завдання..." />
      <MySelect :options="sortOptions" />
    </div>
    <table class="projects-table">
      <thead>
        <tr>
          <th>ID завдання</th>
          <th>Назва завдання</th>
          <th>Виконавець</th>
          <th>Статус</th>
          <th>Термін виконання</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.assignee }}</td>
          <td>
            <span>{{ task.status }}</span>
          </td>
          <td>{{ task.dueDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;

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

  .table-filters {
    display: flex;
    gap: 8px;
    width: 100%;
    margin-bottom: 20px;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .projects-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
    }

    thead {
      background-color: #007bff;
      color: #fff;
      text-transform: uppercase;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #ddd;
      transition: background 0.3s;

      &:hover {
        background-color: #f1f1f1;
        cursor: pointer;
      }
    }

    .status {
      padding: 5px 10px;
      border-radius: 12px;
      color: #fff;
      font-weight: bold;
      font-size: 0.9rem;

      &.active {
        background-color: #28a745;
      }

      &.in-progress {
        background-color: #ffc107;
      }

      &.completed {
        background-color: #6c757d;
      }
    }
  }
}
</style>
