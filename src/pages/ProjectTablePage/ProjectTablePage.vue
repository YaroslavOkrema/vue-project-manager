<script setup lang="ts">
import { onMounted } from "vue";
import { useProjectTablePage } from "@/pages/ProjectTablePage/useProjectTablePage";
import ModalWindow from "@/components/ModalWindow/ModalWindow.vue";
import FormProjects from "@/components/FormProjects/FormProjects.vue";
import MySelect from "@/components/MySelect/MySelect.vue";
import MyButton from "@/components/MyButton/MyButton.vue";
import MyInput from "@/components/MyInput/MyInput.vue";
import { getStatusClass } from "@/helpers/helpers";
import { SquarePen, Trash } from "lucide-vue-next";

const {
  loadProjects,
  addProject,
  sortOptions,
  isModalOpen,
  selectedSort,
  sortedAndSearchedProjects,
  searchQuery,
  goToProject,
  onDelete,
  onEdit,
  updateProject,
  currentProject,
} = useProjectTablePage();

onMounted(() => {
  loadProjects();
});
</script>

<template>
  <div class="table-container">
    <h2>Проєкти</h2>
    <MyButton
      text="Додати проект"
      @click="
        currentProject = null;
        isModalOpen = true;
      "
    />
    <ModalWindow
      v-model="isModalOpen"
      :title="currentProject ? 'Редагувати проект' : 'Додати новий проект'"
    >
      <FormProjects
        :project="currentProject"
        :add-project="addProject"
        :update-project="updateProject"
        v-model:is-modal-open="isModalOpen"
      />
    </ModalWindow>
    <div class="table-filters">
      <MyInput
        v-model="searchQuery"
        type="text"
        placeholder="Введіть назву проекта..."
      />
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
    </div>

    <table class="projects-table">
      <thead>
        <tr>
          <th>ID проекту</th>
          <th>Назва проекту</th>
          <th>Кількість завдань</th>
          <th>Статус</th>
          <th>Дата створення</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="project in sortedAndSearchedProjects"
          :key="project.id"
          @click="goToProject(project.id)"
        >
          <td>{{ project.id }}</td>
          <td>{{ project.projectName }}</td>
          <td>{{ project.tasksCount }}</td>
          <td>
            <span class="status" :class="getStatusClass(project.status)">
              {{ project.status }}
            </span>
          </td>
          <td>{{ project.created }}</td>
          <td>
            <button class="edit-btn" @click.stop="onEdit(project)">
              <SquarePen />
            </button>
            <button class="delete-btn" @click.stop="onDelete(project.id)">
              <Trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!sortedAndSearchedProjects.length" class="no-projects">
      Додайте проекти
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  max-width: 1100px;
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

      .delete-btn {
        background: none;
        color: gray;
        border: none;
        padding: 2px 6px;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;

        &:hover {
          color: red;
          transform: scale(1.05);
        }

        &:active {
          transform: scale(0.95);
        }
      }

      .edit-btn {
        background: none;
        border: none;
        color: gray;
        padding: 2px 6px;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;

        &:hover {
          color: #2e52cf;
          transform: scale(1.05);
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  .table-filters {
    display: flex;
    gap: 8px;
    width: 100%;
    margin-bottom: 20px;
  }

  .no-projects {
    text-align: center;
    color: #555;
    font-weight: bold;
    padding: 15px 0;
  }
}
</style>
