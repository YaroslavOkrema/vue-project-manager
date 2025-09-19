import { ref } from "vue";

export function useFormProject() {
  const projectName = ref("");
  const status = ref("Active");
  const tasksCount = ref(0);
  const error = ref("");

  const validate = () => {
    if (!projectName.value.trim()) {
      error.value = "Назва проекту обов'язкова";
      return false;
    } else if (projectName.value.trim().length < 3) {
      error.value = "Мінімум 3 символи";
      return false;
    }
    error.value = "";
    return true;
  };

  return { projectName, status, tasksCount, error, validate };
}
