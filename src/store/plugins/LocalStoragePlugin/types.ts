import { Task } from "@/store/TaskModule/types";
import { Project } from "@/store/ProjectModule/types";

export interface ProjectsState {
  projects: Project[];
}

export interface TasksState {
  tasks: Task[];
}

export interface RootState {
  projects: ProjectsState;
  tasks: TasksState;
}
