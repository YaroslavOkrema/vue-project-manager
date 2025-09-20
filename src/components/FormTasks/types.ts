import { Task } from "@/store/TaskModule/types";

export interface FormTasksProps {
  projectId: number;
  addTask: (task: Task) => Promise<void>;
}
