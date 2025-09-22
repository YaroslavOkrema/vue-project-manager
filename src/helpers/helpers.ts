import { Status } from "@/types/enums";
import { PluginOptions, POSITION } from "vue-toastification";

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

export const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
};
