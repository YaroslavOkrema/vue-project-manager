export interface Task {
  id: number;
  projectId: number;
  title: string;
  assignee: string;
  status: string;
  dueDate: string;
}

export interface TaskState {
  tasks: Task[];
}
