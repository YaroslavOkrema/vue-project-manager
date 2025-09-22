export interface Task {
  id: string;
  projectId: number;
  title: string;
  assignee: string;
  status: string;
  dueDate: string;
}

export interface TaskState {
  tasks: Task[];
}
