<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProjectTablePage } from "@/pages/ProjectTablePage/useProjectTablePage";
import ModalWindow from "@/components/ModalWindow/ModalWindow.vue";

const { projects, loadProjects, addProject } = useProjectTablePage();

const projectName = ref("");
const status = ref("Active");
const tasksCount = ref(0);

const isModalOpen = ref(false);

const submit = async () => {
  await addProject({
    id: Date.now(),
    projectName: projectName.value,
    status: status.value,
    created: new Date().toLocaleDateString("uk-UA"),
    tasksCount: tasksCount.value,
  });

  projectName.value = "";
  tasksCount.value = 0;
  isModalOpen.value = false;
};

onMounted(() => {
  loadProjects();
});
</script>

<template>
  <div class="table-container">
    <h2>Проєкти</h2>
    <button class="open-modal-btn" @click="isModalOpen = true">
      Додати проєкт
    </button>

    <ModalWindow v-model="isModalOpen" title="Додати новий проект">
      <form @submit.prevent="submit">
        <input v-model="projectName" type="text" placeholder="Назва проекту" />
        <input
          v-model.number="tasksCount"
          type="number"
          placeholder="Кількість завдань"
        />
        <select v-model="status">
          <option>Active</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit">Додати</button>
      </form>
    </ModalWindow>

    <table class="projects-table">
      <thead>
        <tr>
          <th>ID проекту</th>
          <th>Назва проекту</th>
          <th>Кількість завдань</th>
          <th>Статус</th>
          <th>Дата створення</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.projectName }}</td>
          <td>{{ project.tasksCount }}</td>
          <td>
            <span class="status active">{{ project.status }}</span>
          </td>
          <td>{{ project.created }}</td>
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
}
</style>
