import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Project } from "@/store/ProjectModule/types";

export function useProjectTablePage() {
  const store = useStore();
  const isModalOpen = ref(false);
  const selectedSort = ref("");

  const sortOptions = [
    { value: "id", name: "По ID" },
    { value: "projectName", name: "По назві проєкту" },
    { value: "tasksCount", name: "По кількості завдань" },
    { value: "status", name: "По статусу" },
  ];

  const projects = computed<Project[]>(
    () => store.getters["projects/allProject"]
  );

  const loadProjects = () => {
    return store.dispatch("projects/fetchProjects");
  };

  const addProject = (project: Project) => {
    return store.dispatch("projects/addProject", project);
  };

  const sortedProjects = computed(() =>
    selectedSort.value
      ? [...projects.value].sort((a: Project, b: Project) => {
          const valA = a[selectedSort.value as keyof typeof a];
          const valB = b[selectedSort.value as keyof typeof b];

          return typeof valA === "string" && typeof valB === "string"
            ? valA.localeCompare(valB)
            : (valA as number) - (valB as number);
        })
      : projects.value
  );

  return {
    loadProjects,
    addProject,
    isModalOpen,
    sortedProjects,
    sortOptions,
    selectedSort,
  };
}
