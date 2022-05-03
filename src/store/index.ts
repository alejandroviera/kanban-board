import { createStore } from "vuex";
import { loadState, saveStatePlugin } from "@/utils/LocalPersistence";

export interface BoardState {
  board: any;
}

const loadedBoard = loadState();

export default createStore({
  plugins: [saveStatePlugin],
  state: {
    board: loadedBoard,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
