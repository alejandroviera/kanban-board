import { createStore } from "vuex";
import { loadState, saveStatePlugin } from "@/utils/LocalPersistence";

export interface BoardState {
  board: BoardDescriptor;
}

export interface BoardDescriptor {
  name: string;
  columns: ColumnDescriptor[];
}

export interface ColumnDescriptor {
  name: string;
  tasks: TaskDescriptor[];
}

export interface TaskDescriptor {
  name: string;
  description: string;
  id: number;
  userAssigned: string;
}

const loadedBoard = loadState();

export default createStore({
  plugins: [saveStatePlugin],
  state: {
    board: loadedBoard,
  },
  getters: {
    getTask: (state: BoardState) => (id: number) => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task;
          }
        }
      }
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
