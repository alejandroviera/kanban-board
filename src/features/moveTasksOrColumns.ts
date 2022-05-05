import { BoardState } from '@/store'
import { Store } from 'vuex'
import store from '@/store/index'

export interface TransferData {
  dragType: string
  columnIndex: number
  taskIndex: number
}

export function moveItem(
  transferData: TransferData,
  columnIndex: number,
  taskIndex: number
) {
  if (transferData.dragType === 'task') {
    if (taskIndex == -1) {
      taskIndex = store.state.board.columns[columnIndex].tasks.length
    }
    moveTask(
      transferData.columnIndex,
      transferData.taskIndex,
      columnIndex,
      taskIndex
    )
  } else if (transferData.dragType === 'column') {
    moveColumn(transferData.columnIndex, columnIndex)
  }
}

function moveTask(
  fromColumnIndex: number,
  fromTaskIndex: number,
  toColumnIndex: number,
  toTaskIndex: number
) {
  store.commit('MOVE_TASK', {
    fromColumn: store.state.board.columns[fromColumnIndex],
    fromTaskIndex: fromTaskIndex,
    toColumn: store.state.board.columns[toColumnIndex],
    toTaskIndex: toTaskIndex,
  })
}

function moveColumn(fromColumnIndex: number, toColumnIndex: number) {
  store.commit('MOVE_COLUMN', {
    fromColumnIndex: fromColumnIndex,
    toColumnIndex: toColumnIndex,
  })
}
