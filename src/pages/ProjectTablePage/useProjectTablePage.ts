import { useStore } from "vuex";
import { computed } from "vue";
import { Project } from "@/store/ProjectModule/types";

export function useProjectTablePage() {
  const store = useStore();

  const projects = computed<Project[]>(
    () => store.getters["projects/allProject"]
  );

  const loadProjects = () => {
    return store.dispatch("projects/fetchProjects");
  };

  return { projects, loadProjects };
}
