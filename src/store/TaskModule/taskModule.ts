import { Module } from "vuex";
import { Task, TaskState } from "@/store/TaskModule/types";
import axios from "axios";

export const taskModule: Module<TaskState, unknown> = {
  state: () => ({
    tasks: [],
  }),
  getters: {
    allTask(state: TaskState): Task[] {
      return state.tasks;
    },
  },
  mutations: {
    setTasks(state: TaskState, tasks: Task[]): void {
      state.tasks = tasks;
    },
  },
  actions: {
    async fetchTasks({ commit }, projectId: number): Promise<void> {
      try {
        const response = await axios.get(
          `http://localhost:3000/tasks?projectId=${projectId}`
        );
        commit("setTasks", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  namespaced: true,
};
