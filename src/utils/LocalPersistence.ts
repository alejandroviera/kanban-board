import { BoardState } from "@/store";
import defaultBoard from "@/default-board";

export function saveStatePlugin(store: any) {
  store.suscribe((mutation: any, state: BoardState) => {
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
