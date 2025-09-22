import { createStore } from "vuex";
import { projectModule } from "@/store/ProjectModule/projectModule";
import { taskModule } from "@/store/TaskModule/taskModule";

import { localStoragePlugin } from "@/store/plugins/LocalStoragePlugin/localStoragePlugin";
import { RootState } from "@/store/types";

export default createStore<RootState>({
  modules: {
    projects: projectModule,
    tasks: taskModule,
  },
  plugins: [localStoragePlugin],
});
