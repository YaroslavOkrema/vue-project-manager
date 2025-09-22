import { Project } from "@/store/ProjectModule/types";

export interface FormProjectProps {
  addProject: (project: Project) => Promise<void>;
  project?: Project | null;
  updateProject: (project: Project) => Promise<void>;
}
