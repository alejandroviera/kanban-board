import { createStore } from "vuex";
import { loadState, saveStatePlugin } from "@/utils/LocalPersistence";
import UniqueID from "@/utils/UniqueID";

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
  userAssigned: string | null;
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
  mutations: {
    CREATE_TASK(
      state: BoardState,
      { tasks, name }: { tasks: TaskDescriptor[]; name: string }
    ) {
      const newTask: TaskDescriptor = {
        name: name,
        description: "",
        id: UniqueID().getID(),
        userAssigned: null,
      };
      tasks.push(newTask);
    },
    UPDATE_TASK(state: BoardState, task: TaskDescriptor) {
      // do nothing. Force plugin execution for persistence update
    },
  },
  actions: {},
  modules: {},
});
