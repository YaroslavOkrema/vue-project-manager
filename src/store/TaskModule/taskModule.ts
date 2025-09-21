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
    removeTask(state: TaskState, taskId: string): void {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
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

    async deleteTask({ commit }, taskId: number): Promise<void> {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        commit("removeTask", taskId);
      } catch (error) {
        console.error(error);
      }
    },
  },
  namespaced: true,
};
