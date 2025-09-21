import { Module } from "vuex";
import { Project, ProjectState } from "@/store/ProjectModule/types";
import axios from "axios";
import { RootState } from "@/store/types";

export const projectModule: Module<ProjectState, RootState> = {
  state: () => ({
    projects: [],
  }),
  getters: {
    allProject(state) {
      return state.projects;
    },
  },
  mutations: {
    setProjects(state, projects: Project[]): void {
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

    async addProject({ commit, state }, newProject: Project) {
      try {
        const response = await axios.post<Project>(
          "http://localhost:3000/projects",
          newProject
        );
        commit("setProjects", [...state.projects, response.data]);
      } catch (error) {
        console.error(error);
      }
    },
  },
  namespaced: true,
};
