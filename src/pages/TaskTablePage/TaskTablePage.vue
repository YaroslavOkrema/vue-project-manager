<script setup lang="ts">
import ModalWindow from "@/components/ModalWindow/ModalWindow.vue";
import MyButton from "@/components/MyButton/MyButton.vue";
import MyInput from "@/components/MyInput/MyInput.vue";
import MySelect from "@/components/MySelect/MySelect.vue";
import FormTasks from "@/components/FormTasks/FormTasks.vue";
import { useTaskTablePage } from "@/pages/TaskTablePage/useTaskTablePage";
import draggable from "vuedraggable";

const {
  taskId,
  addTask,
  sortOptions,
  isModalOpen,
  route,
  selectedSort,
  searchQuery,
  draggableTasks,
} = useTaskTablePage();
</script>

<template>
  <div class="table-container">
    <h2>ID проекту: {{ route.params.id }}</h2>
    <MyButton text="Додати завдання" @click="isModalOpen = true" />
    <ModalWindow v-model="isModalOpen" title="Додати нове завдання">
      <FormTasks
        :project-id="taskId"
        :add-task="addTask"
        v-model:isModalOpen="isModalOpen"
      />
    </ModalWindow>
    <div class="table-filters">
      <MyInput v-model="searchQuery" placeholder="Введіть назву завдання..." />
      <MySelect v-model="selectedSort" :options="sortOptions" />
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
      <draggable
        tag="tbody"
        v-model="draggableTasks"
        item-key="id"
        @end="onUpdate"
      >
        <template #item="{ element }">
          <tr>
            <td>{{ element.id }}</td>
            <td>{{ element.title }}</td>
            <td>{{ element.assignee }}</td>
            <td>
              <span>{{ element.status }}</span>
            </td>
            <td>{{ element.dueDate }}</td>
          </tr>
        </template>
      </draggable>
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
