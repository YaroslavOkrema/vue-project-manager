import { Project } from "@/store/ProjectModule/types";

export interface FormProjectProps {
  addProject: (project: Project) => Promise<void>;
}
