import { createStore } from "vuex";
import { projectModule } from "@/store/ProjectModule/projectModule";
import { taskModule } from "@/store/TaskModule/taskModule";

export default createStore({
  modules: {
    projects: projectModule,
    tasks: taskModule,
  },
});
