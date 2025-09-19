export interface Project {
  id: number;
  projectName: string;
  tasksCount: number;
  status: string;
  created: string;
}

export interface ProjectState {
  projects: Project[];
}
