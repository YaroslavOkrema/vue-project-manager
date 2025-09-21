import { ref } from "vue";
import { Task } from "@/store/TaskModule/types";
import { useToast } from "vue-toastification";

export function useFormTasks(
  addTaskFn: (task: Task) => Promise<void>,
  projectId: number
) {
  const taskName = ref("");
  const assigned = ref("");
  const status = ref("Active");
  const dueDate = ref("");
  const error = ref("");

  const toast = useToast();

  const options = ["Active", "In Progress", "Completed"];

  const resetForm = (): void => {
    taskName.value = "";
    assigned.value = "";
    status.value = "Active";
    dueDate.value = "";
  };

  const submitTask = async (): Promise<boolean> => {
    if (!validate()) return false;

    await addTaskFn({
      id: Date.now(),
      projectId,
      title: taskName.value,
      assignee: assigned.value,
      status: status.value,
      dueDate: dueDate.value,
    });

    resetForm();
    toast.success("Завдання успішно додано");
    return true;
  };

  const validate = (): boolean => {
    if (!taskName.value.trim()) {
      error.value = "Заповніть всі поля";
      return false;
    }

    if (!assigned.value.trim()) {
      error.value = "Заповніть всі поля";
      return false;
    }

    if (!status.value.trim()) {
      error.value = "Заповніть всі поля";
      return false;
    }

    if (!dueDate.value.trim()) {
      error.value = "Заповніть всі поля";
      return false;
    }

    error.value = "";
    return true;
  };

  return {
    taskName,
    assigned,
    status,
    dueDate,
    options,
    submitTask,
    resetForm,
    validate,
    error,
    toast,
  };
}
