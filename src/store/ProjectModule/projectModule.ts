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
    setProjects(state: ProjectState, projects: Project[]): void {
      state.projects = projects;
    },
    removeProject(state: ProjectState, id: string) {
      state.projects = state.projects.filter((project) => project.id !== id);
    },
    updateProject(state: ProjectState, updated: Project) {
      state.projects = state.projects.map((p) =>
        p.id === updated.id ? updated : p
      );
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

    async deleteProject({ commit }, id: number | string) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`);
        commit("removeProject", id);
      } catch (error) {
        console.error(error);
      }
    },

    async updateProject({ commit }, updated: Project) {
      try {
        const response = await axios.put<Project>(
          `http://localhost:3000/projects/${updated.id}`,
          updated
        );
        commit("updateProject", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  namespaced: true,
};
