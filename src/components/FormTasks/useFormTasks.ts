import { ref, watch } from "vue";
import { Task } from "@/store/TaskModule/types";
import { useToast } from "vue-toastification";

export function useFormTasks(
  addTaskFn: (task: Task) => Promise<void>,
  projectId: number,
  task: Task | null,
  updateTask: (task: Task) => Promise<void>
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

  watch(
    () => task,
    (newTask) => {
      if (newTask) {
        taskName.value = newTask.title;
        assigned.value = newTask.assignee;
        status.value = newTask.status;
        dueDate.value = newTask.dueDate;
      } else {
        taskName.value = "";
        assigned.value = "";
        status.value = "Active";
        dueDate.value = "";
      }
    },
    { immediate: true }
  );

  const submitTask = async (): Promise<boolean> => {
    if (!validate()) return false;

    if (task) {
      await updateTask({
        ...task,
        title: taskName.value,
        assignee: assigned.value,
        status: status.value,
        dueDate: dueDate.value,
      });

      toast.success("Завдання успішно оновлено");
    } else {
      await addTaskFn({
        id: Date.now().toString(),
        projectId,
        title: taskName.value,
        assignee: assigned.value,
        status: status.value,
        dueDate: dueDate.value,
      });

      toast.success("Завдання успішно додано");
    }

    resetForm();
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
