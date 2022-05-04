import { BoardState } from "@/store";
import defaultBoard from "@/default-board";
import { Store } from "vuex";

export function saveStatePlugin(store: Store<BoardState>) {
  store.subscribe((mutation: any, state: BoardState) => {
    localStorage.setItem("board", JSON.stringify(state.board));
  });
}

export function loadState() {
  const persistedBoard = localStorage.getItem("board");
  if (persistedBoard) {
    return JSON.parse(persistedBoard);
  } else {
    return defaultBoard;
  }
}
