import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { Task } from "@/store/TaskModule/types";
import { useDraggable } from "@/hooks/useDraggable";

export function useTaskTablePage() {
  const route = useRoute();
  const store = useStore();
  const taskId = Number(route.params.id);
  const isModalOpen = ref(false);
  const selectedSort = ref("");
  const searchQuery = ref("");

  const sortOptions = [
    { value: "dueDate", name: "За терміном" },
    { value: "status", name: "За статусом" },
  ];

  const tasks = computed<Task[]>(() => store.getters["tasks/allTask"]);

  const addTask = (task: Task) => {
    return store.dispatch("tasks/addTask", task);
  };

  onMounted(() => {
    store.dispatch("tasks/fetchTasks", taskId);
  });

  const sortedTasks = computed(() =>
    selectedSort.value
      ? [...tasks.value].sort((a: Task, b: Task) => {
          const valA = a[selectedSort.value as keyof Task];
          const valB = b[selectedSort.value as keyof Task];

          return typeof valA === "string" && typeof valB === "string"
            ? valA.localeCompare(valB)
            : (valA as number) - (valB as number);
        })
      : tasks.value
  );

  const sortedAndSearchedTasks = computed(() =>
    sortedTasks.value.filter(
      (task) =>
        task.assignee.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.status.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  const draggableTasks = useDraggable(sortedAndSearchedTasks);

  return {
    taskId,
    isModalOpen,
    sortOptions,
    addTask,
    tasks,
    route,
    selectedSort,
    searchQuery,
    sortedAndSearchedTasks,
    draggableTasks,
  };
}
