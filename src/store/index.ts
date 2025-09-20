import { createStore } from "vuex";
import { projectModule } from "@/store/ProjectModule/projectModule";
import { taskModule } from "@/store/TaskModule/taskModule";
import { localStoragePlugin } from "@/store/plugins/LocalStoragePlugin/localStoragePlugin";

export default createStore({
  modules: {
    projects: projectModule,
    tasks: taskModule,
  },
  plugins: [localStoragePlugin],
});
