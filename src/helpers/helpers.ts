import { Status } from "@/types/enums";

export const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case Status.Active:
      return Status.Active;
    case "in progress":
    case Status.InProgress:
      return Status.InProgress;
    case Status.Completed:
      return Status.Completed;
    default:
      return "";
  }
};
