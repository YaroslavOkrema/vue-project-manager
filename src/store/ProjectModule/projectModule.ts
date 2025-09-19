import { Module } from "vuex";
import { Project, ProjectState } from "@/store/ProjectModule/types";
import axios from "axios";

export const projectModule: Module<ProjectState, unknown> = {
  state: () => ({
    projects: [],
  }),
  getters: {
    allProject(state) {
      return state.projects;
    },
  },
  mutations: {
    setProjects(state, projects: Project[]) {
      state.projects = projects;
    },
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/projects");
        commit("setProjects", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  namespaced: true,
};
