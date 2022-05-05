import { BoardState } from '@/store'
import { Store } from 'vuex'
import store from '@/store/index'

export function moveItem(e: DragEvent, columnIndex: number, taskIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer != null) {
    const dragType = dataTransfer.getData('drag-type')
    if (dragType === 'task') {
      if (taskIndex == -1) {
        taskIndex = store.state.board.columns[columnIndex].tasks.length
      }
      moveTask(e, columnIndex, taskIndex)
    } else if (dragType === 'column') {
      moveColumn(e, columnIndex)
    }
  }
}

function moveTask(e: DragEvent, columnIndex: number, taskIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer != null) {
    const fromColumnIndex = parseInt(dataTransfer.getData('column-index'))
    const fromTaskIndex = parseInt(dataTransfer.getData('task-index'))
    store.commit('MOVE_TASK', {
      fromColumn: store.state.board.columns[fromColumnIndex],
      fromTaskIndex: fromTaskIndex,
      toColumn: store.state.board.columns[columnIndex],
      toTaskIndex: taskIndex,
    })
  }
}

function moveColumn(e: DragEvent, columnIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer != null) {
    const fromColumnIndex = parseInt(dataTransfer.getData('column-index'))
    store.commit('MOVE_COLUMN', {
      fromColumnIndex: fromColumnIndex,
      toColumnIndex: columnIndex,
    })
  }
}
