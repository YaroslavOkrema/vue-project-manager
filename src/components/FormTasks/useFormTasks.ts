import { ref } from "vue";
import { Task } from "@/store/TaskModule/types";

export function useFormTasks(
  addTaskFn: (task: Task) => Promise<void>,
  projectId: number
) {
  const taskName = ref("");
  const assigned = ref("");
  const status = ref("Active");
  const dueDate = ref("");

  const options = ["Active", "In Progress", "Completed"];

  const resetForm = (): void => {
    taskName.value = "";
    assigned.value = "";
    status.value = "Active";
    dueDate.value = "";
  };

  const submitTask = async (): Promise<void> => {
    if (!taskName.value || !assigned.value || !dueDate.value) return;

    await addTaskFn({
      id: Date.now(),
      projectId,
      title: taskName.value,
      assignee: assigned.value,
      status: status.value,
      dueDate: dueDate.value,
    });

    resetForm();
  };

  return {
    taskName,
    assigned,
    status,
    dueDate,
    options,
    submitTask,
    resetForm,
  };
}
