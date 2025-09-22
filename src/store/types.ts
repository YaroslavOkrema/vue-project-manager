import { ProjectState } from "@/store/ProjectModule/types";
import { TaskState } from "@/store/TaskModule/types";

export interface RootState {
  project: ProjectState;
  task: TaskState;
}
