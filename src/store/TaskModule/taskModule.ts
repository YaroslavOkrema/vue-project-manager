import { Module } from "vuex";
import { Task, TaskState } from "@/store/TaskModule/types";
import axios from "axios";
import { RootState } from "@/store/types";

export const taskModule: Module<TaskState, RootState> = {
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
    reorderTasks(state: TaskState, tasks: Task[]): void {
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

    async addTask({ commit, state }, newTask: Task): Promise<void> {
      try {
        const response = await axios.post<Task>(
          `http://localhost:3000/tasks`,
          newTask
        );
        commit("setTasks", [...state.tasks, response.data]);
      } catch (error) {
        console.error(error);
      }
    },
  },
  namespaced: true,
};
