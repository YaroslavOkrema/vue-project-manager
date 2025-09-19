import { createStore } from "vuex";
import { projectModule } from "@/store/ProjectModule/projectModule";

export default createStore({
  modules: {
    projects: projectModule,
  },
});
