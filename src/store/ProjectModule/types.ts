export interface Project {
  id: number;
  projectName: string;
  tasksCount: number;
  status: string;
  created: number;
}

export interface ProjectState {
  projects: Project[];
}
