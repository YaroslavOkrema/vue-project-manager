import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { Task } from "@/store/TaskModule/types";

export function useTaskTablePage() {
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

  const addTask = (task: Task) => {
    return store.dispatch("tasks/addTask", task);
  };

  onMounted(() => {
    store.dispatch("tasks/fetchTasks", taskId);
  });

  const tasks = computed<Task[]>(() => store.getters["tasks/allTask"]);

  return { taskId, isModalOpen, sortOptions, addTask, tasks, route };
}
