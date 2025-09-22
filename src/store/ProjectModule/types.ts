export interface Project {
  id: string;
  projectName: string;
  tasksCount: number;
  status: string;
  created: string;
}

export interface ProjectState {
  projects: Project[];
}
