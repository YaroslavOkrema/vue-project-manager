import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProjectTablePage from "@/pages/ProjectTablePage/ProjectTablePage.vue";
import TaskTablePage from "@/pages/TaskTablePage/TaskTablePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: ProjectTablePage,
  },
  {
    path: "/project/:id",
    component: TaskTablePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
